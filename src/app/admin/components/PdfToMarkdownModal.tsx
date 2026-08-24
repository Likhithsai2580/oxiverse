'use client'

import React, { useState } from 'react'
import { Dialog, Button, Badge } from '@/components/admin/ui'
import { FileUp, FileText, Check, AlertCircle, Copy, ArrowRight, RefreshCw } from 'lucide-react'
import { useToastContext } from '@/lib/providers/ToastProvider'

interface PdfToMarkdownModalProps {
  isOpen: boolean
  onClose: () => void
  onImport: (result: { title?: string; abstract?: string; markdown: string }) => void
}

export default function PdfToMarkdownModal({ isOpen, onClose, onImport }: PdfToMarkdownModalProps) {
  const { success, error } = useToastContext()
  const [file, setFile] = useState<File | null>(null)
  const [isParsing, setIsParsing] = useState(false)
  const [parsedData, setParsedData] = useState<{
    title: string
    abstract: string
    markdown: string
    pageCount: number
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
        error('Please select a valid PDF file.')
        return
      }
      setFile(selectedFile)
      setParsedData(null)
    }
  }

  const handleParse = async () => {
    if (!file) return

    setIsParsing(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/admin/parse-pdf', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setParsedData({
          title: data.title,
          abstract: data.abstract,
          markdown: data.markdown,
          pageCount: data.pageCount,
        })
        success(`Parsed ${data.pageCount} page${data.pageCount > 1 ? 's' : ''} into Markdown!`)
      } else {
        error(data.error || 'Failed to parse PDF')
      }
    } catch (err) {
      error('An error occurred while uploading and parsing the PDF')
    } finally {
      setIsParsing(false)
    }
  }

  const handleApply = (mode: 'replace' | 'append') => {
    if (!parsedData) return
    onImport({
      title: parsedData.title,
      abstract: parsedData.abstract,
      markdown: parsedData.markdown,
    })
    onClose()
    setFile(null)
    setParsedData(null)
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="PDF to Markdown Parser"
      description="Upload research papers or whitepapers to automatically convert them into structured Markdown."
      size="xl"
    >
      <div className="space-y-6">
        {!parsedData ? (
          <div className="space-y-4">
            <label
              htmlFor="pdf-file-upload"
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer ${
                file
                  ? 'border-sky-500/50 bg-sky-500/5'
                  : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900/60'
              }`}
            >
              <input
                id="pdf-file-upload"
                type="file"
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="w-12 h-12 rounded-xl bg-zinc-800/80 flex items-center justify-center text-zinc-300 mb-3 shadow-inner">
                {file ? <FileText className="w-6 h-6 text-sky-400" /> : <FileUp className="w-6 h-6 text-zinc-400" />}
              </div>
              {file ? (
                <div className="text-center">
                  <p className="text-sm font-bold text-white">{file.name}</p>
                  <p className="text-xs text-zinc-400 mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-xs font-semibold text-zinc-200">Click to upload or drag and drop a PDF</p>
                  <p className="text-[11px] text-zinc-500 mt-1">PDFs up to 15MB are converted into clean Markdown</p>
                </div>
              )}
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="accent"
                disabled={!file || isParsing}
                isLoading={isParsing}
                onClick={handleParse}
              >
                Parse to Markdown
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-md text-emerald-400 border border-emerald-500/20">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white truncate max-w-sm">{parsedData.title || file?.name}</p>
                  <p className="text-[10px] text-zinc-400">
                    {parsedData.pageCount} page{parsedData.pageCount > 1 ? 's' : ''} converted · {parsedData.markdown.length} characters
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setParsedData(null)
                  setFile(null)
                }}
              >
                <RefreshCw className="w-3 h-3 mr-1.5" />
                New PDF
              </Button>
            </div>

            {parsedData.abstract && (
              <div className="space-y-1 bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/60">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                  Detected Abstract / Summary
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed italic">{parsedData.abstract}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                Extracted Markdown Preview
              </span>
              <pre className="max-h-60 overflow-y-auto bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 font-mono text-[11px] text-zinc-300 leading-relaxed whitespace-pre-wrap select-all">
                {parsedData.markdown}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(parsedData.markdown)
                  success('Markdown copied to clipboard!')
                }}
              >
                <Copy className="w-3.5 h-3.5 mr-1.5" />
                Copy Raw Markdown
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Discard
                </Button>
                <Button variant="accent" onClick={() => handleApply('replace')}>
                  Insert into Editor
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  )
}
