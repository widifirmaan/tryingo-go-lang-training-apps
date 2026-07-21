# File Handling and Uploads

## Overview

Modern HTML5 file handling APIs enable rich file upload experiences with previews, progress tracking, and client-side processing.

### File Input Basics

```html
<form id="uploadForm">
  <div class="file-upload-zone" id="dropZone">
    <p>Drag & drop files here or click to browse</p>
    <input type="file" id="fileInput" name="files[]"
           multiple accept="image/*,.pdf,.doc,.docx"
           hidden>
    <button type="button" id="browseBtn">Browse Files</button>
  </div>

  <div id="fileList" class="file-list"></div>
  <div id="uploadProgress" class="upload-progress" hidden>
    <div class="progress-bar" id="progressBar"></div>
    <span id="progressText">0%</span>
  </div>

  <button type="submit">Upload Files</button>
</form>
```

## File Validation

```js
class FileValidator {
  static validateFiles(files, options = {}) {
    const {
      maxSize = 10 * 1024 * 1024, // 10MB default
      allowedTypes = [],
      minFiles = 0,
      maxFiles = Infinity,
      allowedExtensions = []
    } = options;

    const errors = [];

    if (files.length < minFiles) {
      errors.push(`Minimum ${minFiles} file(s) required`);
    }

    if (files.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed`);
    }

    Array.from(files).forEach(file => {
      // Check size
      if (file.size > maxSize) {
        errors.push(`${file.name} exceeds ${formatSize(maxSize)} limit`);
      }

      // Check MIME type
      if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: type ${file.type} is not allowed`);
      }

      // Check extension
      if (allowedExtensions.length > 0) {
        const ext = '.' + file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(ext)) {
          errors.push(`${file.name}: extension ${ext} is not allowed`);
        }
      }
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }

  static formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}

// Usage
const validation = FileValidator.validateFiles(fileInput.files, {
  maxSize: 5 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxFiles: 5,
  minFiles: 1
});
```

## File Preview

```js
class FilePreview {
  static previewFile(file, container) {
    const fileType = file.type.split('/')[0];

    switch (fileType) {
      case 'image':
        return this.previewImage(file, container);
      case 'video':
        return this.previewVideo(file, container);
      case 'audio':
        return this.previewAudio(file, container);
      default:
        return this.previewGeneric(file, container);
    }
  }

  static previewImage(file, container) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const card = document.createElement('div');
        card.className = 'file-preview-card';
        card.innerHTML = `
          <img src="${e.target.result}" alt="${file.name}"
               class="file-preview-image">
          <div class="file-preview-info">
            <span class="file-name">${file.name}</span>
            <span class="file-size">${FileValidator.formatSize(file.size)}</span>
          </div>
          <button type="button" class="file-remove" data-file="${file.name}">✕</button>
        `;
        container.appendChild(card);
        resolve(card);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  static previewVideo(file, container) {
    const url = URL.createObjectURL(file);
    const card = document.createElement('div');
    card.className = 'file-preview-card';
    card.innerHTML = `
      <video src="${url}" controls class="file-preview-video"
             onloadedmetadata="URL.revokeObjectURL('${url}')">
      </video>
      <div class="file-preview-info">
        <span class="file-name">${file.name}</span>
        <span class="file-size">${FileValidator.formatSize(file.size)}</span>
      </div>
      <button type="button" class="file-remove" data-file="${file.name}">✕</button>
    `;
    container.appendChild(card);
  }

  static previewGeneric(file, container) {
    const card = document.createElement('div');
    card.className = 'file-preview-card';
    card.innerHTML = `
      <div class="file-icon">${this.getFileIcon(file.name)}</div>
      <div class="file-preview-info">
        <span class="file-name">${file.name}</span>
        <span class="file-size">${FileValidator.formatSize(file.size)}</span>
      </div>
      <button type="button" class="file-remove" data-file="${file.name}">✕</button>
    `;
    container.appendChild(card);
  }

  static getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
      pdf: '📄', doc: '📝', docx: '📝',
      xls: '📊', xlsx: '📊',
      zip: '📦', rar: '📦',
      js: '⚙️', py: '🐍', html: '🌐',
      txt: '📃'
    };
    return icons[ext] || '📁';
  }
}
```

## Upload with Progress

```js
class FileUploader {
  constructor(options = {}) {
    this.url = options.url || '/upload';
    this.maxConcurrent = options.maxConcurrent || 3;
    this.queue = [];
    this.active = 0;
    this.completed = 0;
    this.total = 0;
    this.onProgress = options.onProgress || (() => {});
    this.onComplete = options.onComplete || (() => {});
    this.onError = options.onError || (() => {});
  }

  addFiles(files) {
    Array.from(files).forEach(file => {
      this.queue.push({
        file,
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        progress: 0,
        status: 'queued'
      });
    });

    this.total += files.length;
    this.processQueue();
  }

  processQueue() {
    while (this.active < this.maxConcurrent && this.queue.length > 0) {
      const item = this.queue.shift();
      if (item) {
        this.active++;
        this.uploadFile(item);
      }
    }
  }

  uploadFile(item) {
    const formData = new FormData();
    formData.append('file', item.file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        item.progress = Math.round((e.loaded / e.total) * 100);
        item.status = 'uploading';
        this.onProgress(this.getStats());
        this.updateFileUI(item);
      }
    });

    xhr.addEventListener('load', () => {
      this.active--;
      this.completed++;

      if (xhr.status >= 200 && xhr.status < 300) {
        item.status = 'completed';
        item.progress = 100;
      } else {
        item.status = 'error';
        item.error = xhr.statusText;
        this.onError(item);
      }

      this.updateFileUI(item);
      this.onProgress(this.getStats());

      if (this.completed === this.total) {
        this.onComplete(this.getStats());
      }

      this.processQueue();
    });

    xhr.addEventListener('error', () => {
      this.active--;
      item.status = 'error';
      item.error = 'Network error';
      this.updateFileUI(item);
      this.onError(item);
      this.processQueue();
    });

    xhr.open('POST', this.url, true);
    xhr.send(formData);
  }

  getStats() {
    const uploading = this.active;
    const queued = this.queue.length;
    const completed = this.completed;
    const total = this.total;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { uploading, queued, completed, total, percent };
  }

  updateFileUI(item) {
    const card = document.querySelector(`[data-file-id="${item.id}"]`);
    if (!card) return;

    const progressBar = card.querySelector('.file-progress-bar');
    const statusEl = card.querySelector('.file-status');

    if (progressBar) progressBar.style.width = `${item.progress}%`;
    if (statusEl) statusEl.textContent = item.status;
  }
}

// Usage
const uploader = new FileUploader({
  url: '/api/upload',
  onProgress: (stats) => {
    document.getElementById('progressBar').style.width = `${stats.percent}%`;
    document.getElementById('progressText').textContent = `${stats.completed}/${stats.total} files`;
  },
  onComplete: () => alert('All files uploaded!'),
  onError: (item) => console.error('Upload failed:', item.file.name, item.error)
});
```

```css
.file-upload-zone {
  border: 3px dashed #ccc;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s, background 0.3s;
}

.file-upload-zone.dragover {
  border-color: #3498db;
  background: #f0f7ff;
}

.file-preview-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  margin-top: 8px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.file-preview-image {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
}

.file-preview-video {
  width: 120px;
  height: 68px;
  object-fit: cover;
  border-radius: 4px;
}

.file-preview-info {
  flex: 1;
}

.file-name {
  display: block;
  font-weight: 500;
  font-size: 0.9em;
}

.file-size {
  display: block;
  font-size: 0.8em;
  color: #666;
}

.file-remove {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  color: #e74c3c;
  padding: 4px;
}

.file-progress-bar {
  height: 3px;
  background: #3498db;
  border-radius: 2px;
  transition: width 0.3s;
}

.file-status {
  font-size: 0.8em;
  color: #666;
}
```

## Practice

1. Build a complete file upload system with drag-and-drop, file type/size validation, and progress bars.
2. Create an image uploader that generates client-side thumbnails before uploading.
3. Implement a multi-file uploader with a queue, parallel uploads (max 3 concurrent), and retry on failure.
4. Build a file manager interface that lists uploaded files with preview, download, and delete functionality.
