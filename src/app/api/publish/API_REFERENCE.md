# Oxiverse Publishing API Reference

Base URL: `https://oxiverse.com/api/publish`

All endpoints require authentication via the `x-api-key` header.

---

## Authentication

```http
x-api-key: <PUBLISH_API_KEY>
```

Set `PUBLISH_API_KEY` in your environment variables (local `.env` or Vercel project settings).

---

## Blog Posts

### Create a blog post

`POST /api/publish/blog`

```json
{
  "title": "string (required)",
  "content": "string (markdown)",
  "excerpt": "string (auto-truncated from content if omitted)",
  "published": "boolean (default: false)",
  "imageUrl": "string (URL from upload endpoint)",
  "category": "string (name, auto-created if new)",
  "tags": ["string"] (names, auto-created if new)
}
```

**Response** `201 Created`
```json
{
  "id": "cuid",
  "title": "...",
  "slug": "...",
  "content": "...",
  "excerpt": "...",
  "published": true,
  "publishedAt": "2026-06-26T...",
  "imageUrl": "...",
  "author": { "id": "...", "name": "...", "email": "..." },
  "category": { "id": "...", "name": "...", "slug": "..." },
  "tags": [{ "id": "...", "name": "...", "slug": "..." }],
  "createdAt": "...",
  "updatedAt": "..."
}
```

**Errors:** `400` (missing title), `409` (duplicate title)

---

### Update a blog post

`PUT /api/publish/blog`

Only send the fields you want to change.

```json
{
  "slug": "string (required — identifies which post)",
  "title": "string",
  "content": "string",
  "excerpt": "string",
  "published": "boolean",
  "imageUrl": "string (set null to clear)",
  "category": "string (set null to remove)",
  "tags": ["string"] (replaces all tags)
}
```

**Response** `200 OK` — returns full updated post object (same shape as create).

**Errors:** `400` (missing slug), `404` (slug not found), `409` (new title conflicts with existing post)

---

## Research Papers

### Create a research paper

`POST /api/publish/research`

```json
{
  "title": "string (required)",
  "content": "string (markdown body, optional if pdfUrl provided)",
  "abstract": "string",
  "pdfUrl": "string (URL from upload endpoint)",
  "published": "boolean (default: false)",
  "imageUrl": "string",
  "category": "string (name, auto-created if new)",
  "tags": ["string"]
}
```

**Response** `201 Created` — same shape as blog post with additional `abstract`, `pdfUrl` fields.

---

### Update a research paper

`PUT /api/publish/research`

```json
{
  "slug": "string (required)",
  "title": "string",
  "content": "string",
  "abstract": "string",
  "pdfUrl": "string",
  "published": "boolean",
  "imageUrl": "string",
  "category": "string",
  "tags": ["string"]
}
```

**Response** `200 OK`

---

## File Uploads

### Upload an image or PDF

`POST /api/publish/upload`

Request: `multipart/form-data`

| Field  | Type | Description |
|--------|------|-------------|
| `file` | File | The file to upload (image/* or application/pdf) |

**Response** `201 Created`
```json
{
  "url": "https://...",
  "fileName": "screenshot.png",
  "type": "image/png",
  "size": 12345
}
```

Images are stored under `images/`, PDFs under `pdfs/`. The returned `url` is usable directly as `imageUrl` or `pdfUrl` in blog/research endpoints.

---

## Tags

### List all tags

`GET /api/publish/tags`

**Response** `200 OK`
```json
[
  { "id": "...", "name": "Privacy", "slug": "privacy", "createdAt": "...", "updatedAt": "..." }
]
```

### Create a tag

`POST /api/publish/tags`

```json
{
  "name": "string (required)"
}
```

If the tag already exists, returns the existing tag (idempotent).

**Response** `201 Created` (or `200 OK` if already exists)

---

## Categories

### List all categories

`GET /api/publish/categories`

**Response** `200 OK`
```json
[
  { "id": "...", "name": "Technology", "slug": "technology", "description": null, "createdAt": "...", "updatedAt": "..." }
]
```

### Create a category

`POST /api/publish/categories`

```json
{
  "name": "string (required)",
  "description": "string (optional)"
}
```

Idempotent — returns existing category if slug already exists.

**Response** `201 Created` (or `200 OK` if already exists)

---

## Workflow Examples

### Publish a blog post with an image

```bash
# 1. Upload the image
UPLOAD=$(curl -s -X POST https://oxiverse.com/api/publish/upload \
  -H "x-api-key: $KEY" \
  -F "file=@hero.png")
IMAGE_URL=$(echo $UPLOAD | jq -r '.url')

# 2. Create the post
curl -X POST https://oxiverse.com/api/publish/blog \
  -H "Content-Type: application/json" \
  -H "x-api-key: $KEY" \
  -d "{
    \"title\": \"Introducing Oxiverse v2\",
    \"content\": \"# Welcome\n\nFull markdown body...\",
    \"excerpt\": \"What's new in v2\",
    \"published\": true,
    \"imageUrl\": \"$IMAGE_URL\",
    \"category\": \"Announcements\",
    \"tags\": [\"release\", \"privacy\"]
  }"
```

### Publish a research paper with a PDF

```bash
# 1. Upload PDF
PDF=$(curl -s -X POST https://oxiverse.com/api/publish/upload \
  -H "x-api-key: $KEY" \
  -F "file=@paper.pdf")
PDF_URL=$(echo $PDF | jq -r '.url')

# 2. Create paper
curl -X POST https://oxiverse.com/api/publish/research \
  -H "Content-Type: application/json" \
  -H "x-api-key: $KEY" \
  -d "{
    \"title\": \"Privacy-Preserving Search\",
    \"abstract\": \"This paper explores...\",
    \"pdfUrl\": \"$PDF_URL\",
    \"published\": true,
    \"tags\": [\"search\", \"privacy\", \"cryptography\"]
  }"
```

### Update a post to publish it

```bash
curl -X PUT https://oxiverse.com/api/publish/blog \
  -H "Content-Type: application/json" \
  -H "x-api-key: $KEY" \
  -d '{
    "slug": "introducing-oxiverse-v2",
    "published": true
  }'
```

### Update tags on a research paper

```bash
curl -X PUT https://oxiverse.com/api/publish/research \
  -H "Content-Type: application/json" \
  -H "x-api-key: $KEY" \
  -d '{
    "slug": "privacy-preserving-search",
    "tags": ["search", "privacy", "cryptography", "2026"]
  }'
```

---

## Error Codes

| Status | Meaning |
|--------|---------|
| `400` | Bad request — missing required fields |
| `401` | Missing or invalid `x-api-key` |
| `404` | Resource not found (slug doesn't exist) |
| `409` | Conflict — duplicate title/slug |
| `500` | Server error — check server logs |
