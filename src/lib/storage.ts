import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { supabaseAdmin } from './supabase';

export interface StorageResult {
  url: string; // Primarially local for now
  localUrl: string;
  supabaseUrl: string | null;
  fileName: string;
}

export async function saveFile(file: File, subDir: string = 'images'): Promise<StorageResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  
  // 1. Local Upload (Skip or fail gracefully in serverless/production)
  let localUrl = `/uploads/${subDir}/${fileName}`;
  const isVercel = process.env.VERCEL === '1';
  
  if (!isVercel) {
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', subDir);
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
    } catch (err) {
      console.warn('Local filesystem write failed (likely EROFS):', err);
    }
  }

  // 2. Supabase Upload (Primary for Vercel, Backup for local)
  let supabaseUrl = null;
  let supabaseError = null;

  if (supabaseAdmin) {
    try {
      const bucketName = 'images'; // Standard bucket for all assets
      const bucketPath = `${subDir}/${fileName}`;
      
      let uploadRes = await supabaseAdmin.storage
        .from(bucketName)
        .upload(bucketPath, buffer, {
          contentType: file.type,
          upsert: true,
        });

      let error = uploadRes.error;
      let data = uploadRes.data;

      // Automatically create bucket if not found
      if (error && (error.message.includes('bucket') || error.message.includes('not found') || (error as any).statusCode === '404' || (error as any).status === 404)) {
        console.log(`Bucket '${bucketName}' not found. Attempting to create it...`);
        const { error: createError } = await supabaseAdmin.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 52428800 // 50MB
        });
        
        if (!createError) {
          console.log(`Bucket '${bucketName}' created successfully. Retrying upload...`);
          const retryRes = await supabaseAdmin.storage
            .from(bucketName)
            .upload(bucketPath, buffer, {
              contentType: file.type,
              upsert: true,
            });
          data = retryRes.data;
          error = retryRes.error;
        } else {
          console.error(`Failed to create bucket '${bucketName}':`, createError.message);
          supabaseError = `Failed to create bucket: ${createError.message}`;
        }
      }

      if (error) {
        console.error('Supabase upload failed:', error.message);
        supabaseError = error.message;
      } else if (data) {
        const { data: publicData } = supabaseAdmin.storage
          .from(bucketName)
          .getPublicUrl(bucketPath);
        supabaseUrl = publicData.publicUrl;
      }
    } catch (err: any) {
      console.error('An unexpected error occurred during Supabase backup:', err);
      supabaseError = err?.message || String(err);
    }
  } else {
    supabaseError = 'Supabase admin client not initialized. Check your environment variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).';
    console.error(supabaseError);
  }

  // If hosting on Vercel (or production), fail loudly if cloud storage upload failed
  if (isVercel && !supabaseUrl) {
    throw new Error(`Cloud storage upload failed: ${supabaseError}`);
  }

  return {
    url: supabaseUrl || localUrl, // Use Supabase for optimization, fallback to local
    localUrl,
    supabaseUrl,
    fileName,
  };
}
