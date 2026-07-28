# File Upload & Assets

> Next.js | Full-Stack Next.js | Lesson 16

## Learning Objectives

- Upload files with Server Actions or Route Handlers
- Save files to cloud storage
- Optimize images with next/image
- Manage static assets

---

## Program: File Upload & Assets

```tsx
'use client';
import { useState } from 'react';
export default function Home() {
  const [preview, setPreview] = useState('');
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };
  return (<div><h1>File Upload Demo</h1><input type="file" onChange={handleFile} accept="image/*" style={{margin:'1rem 0'}} />{preview && <div><img src={preview} alt="preview" style={{maxWidth:300,borderRadius:8,border:'1px solid #ddd'}} /><p>Preview (client-side only)</p></div>}<p style={{marginTop:'1rem',fontSize:'.85em',color:'#666'}}>Server upload: Server Action menerima FormData dengan file, simpan ke cloud storage (S3, R2, Vercel Blob).</p></div>);
}
```

---

## Explanation

## Server Upload
Server Action receives FormData with file. Validate type and size. Upload to cloud: Vercel Blob, AWS S3, Cloudflare R2.

## next/image
Automatic image optimization: WebP/AVIF, responsive sizes, lazy loading, blur placeholder. `<Image src={url} width={400} height={300} alt="" />`.

## next/font
Load Google Fonts at build time, self-hosted. No external requests. `const inter = Inter({ subsets: ['latin'] })`. Add to className.

## Public Folder
Files in `public/` are directly accessible: `/image.png`. For build-time assets. Not for user uploads.

---

## Experiments

1. **Server Upload**
2. **next/image**
3. **next/font**
4. **Public Folder**

---

## Challenge

Build an avatar upload: form with file input, image preview before upload, Server Action to upload to Vercel Blob. Display avatar with next/image.

---

## Summary

Server Actions for file uploads. next/image for optimization. next/font for self-hosted fonts. Public folder for static assets.
