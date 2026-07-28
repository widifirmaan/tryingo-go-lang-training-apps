# File Upload & Assets

> Next.js | Full-Stack Next.js | Pelajaran 16

## Tujuan Pembelajaran

- Upload file dengan Server Actions atau Route Handlers
- Menyimpan file ke cloud storage
- Optimasi gambar dengan next/image
- Mengelola aset statis

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

## Penjelasan

## Server Upload
Server Action terima FormData dengan file. Validasi type dan ukuran. Upload ke cloud: Vercel Blob, AWS S3, Cloudflare R2.

## next/image
Optimasi gambar otomatis: WebP/AVIF, responsive sizes, lazy loading, blur placeholder. `<Image src={url} width={400} height={300} alt="" />`.

## next/font
Load Google Fonts di build time, self-host. Tidak ada external request. `const inter = Inter({ subsets: ['latin'] })`. Tambahkan ke className.

## Public Folder
File di `public/` bisa diakses langsung: `/image.png`. Untuk aset build-time. Jangan untuk user uploads.

---

## Eksperimen

1. **Server Upload**
2. **next/image**
3. **next/font**
4. **Public Folder**

---

## Tantangan

Buat avatar upload: form dengan file input, preview gambar sebelum upload, Server Action untuk upload ke Vercel Blob. Tampilkan avatar dengan next/image.

---

## Ringkasan

Server Actions untuk upload file. next/image untuk optimasi. next/font untuk font self-hosted. Public folder untuk aset statis.
