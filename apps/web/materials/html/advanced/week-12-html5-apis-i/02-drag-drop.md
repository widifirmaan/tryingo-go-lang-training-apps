# Drag and Drop API

## Overview

The HTML5 Drag and Drop API enables elements to be dragged and dropped within a page.

## Making Elements Draggable

```html
<div id="container">
  <div class="draggable" draggable="true" id="item1">
    Item 1
  </div>
  <div class="draggable" draggable="true" id="item2">
    Item 2
  </div>
  <div class="draggable" draggable="true" id="item3">
    Item 3
  </div>
</div>

<div class="drop-zone" id="dropZone">
  Drop items here
</div>
```

```css
.draggable {
  display: inline-block;
  padding: 12px 24px;
  margin: 4px;
  background: #4a90d9;
  color: #fff;
  border-radius: 6px;
  cursor: grab;
  user-select: none;
}

.draggable:active {
  cursor: grabbing;
}

.draggable.dragging {
  opacity: 0.5;
}

.drop-zone {
  width: 300px;
  min-height: 200px;
  border: 3px dashed #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 8px;
  transition: border-color 0.3s, background 0.3s;
}

.drop-zone.drag-over {
  border-color: #4a90d9;
  background: #e8f0fe;
}
```

```js
const draggables = document.querySelectorAll('.draggable');
const dropZone = document.getElementById('dropZone');

// Drag Start
draggables.forEach(item => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', item.id);
    item.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });

  item.addEventListener('dragend', (e) => {
    item.classList.remove('dragging');
  });
});

// Drag Over drop zone
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', (e) => {
  dropZone.classList.remove('drag-over');
});

// Drop
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');

  const id = e.dataTransfer.getData('text/plain');
  const draggable = document.getElementById(id);

  if (draggable && draggable.parentElement !== dropZone) {
    dropZone.appendChild(draggable);
  }
});
```

## Drag Events

| Event | Description |
|-------|-------------|
| `dragstart` | Fired when drag begins |
| `drag` | Fired continuously during drag |
| `dragend` | Fired when drag ends (release or cancel) |
| `dragenter` | Fired when entering a drop target |
| `dragover` | Fired when hovering over a drop target |
| `dragleave` | Fired when leaving a drop target |
| `drop` | Fired when element is dropped |

## Custom Drag Data

```js
item.addEventListener('dragstart', (e) => {
  // Text
  e.dataTransfer.setData('text/plain', item.textContent);

  // HTML
  e.dataTransfer.setData('text/html', item.outerHTML);

  // URL
  e.dataTransfer.setData('text/uri-list', 'https://example.com');

  // Custom data type
  e.dataTransfer.setData('application/json', JSON.stringify({
    id: item.id,
    text: item.textContent,
    color: item.dataset.color
  }));

  // Files
  e.dataTransfer.setData('Files', fileList);

  // Drag image
  const img = new Image();
  img.src = 'drag-cursor.png';
  e.dataTransfer.setDragImage(img, 0, 0);
});
```

## Sortable List

```html
<ul class="sortable-list" id="sortableList">
  <li draggable="true" data-id="1">Item One</li>
  <li draggable="true" data-id="2">Item Two</li>
  <li draggable="true" data-id="3">Item Three</li>
  <li draggable="true" data-id="4">Item Four</li>
</ul>
```

```css
.sortable-list {
  list-style: none;
  padding: 0;
  max-width: 400px;
}

.sortable-list li {
  padding: 12px 16px;
  margin-bottom: 4px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: grab;
  transition: transform 0.2s, opacity 0.2s;
}

.sortable-list li:active {
  cursor: grabbing;
}

.sortable-list li.dragging {
  opacity: 0.3;
}

.sortable-list li.drag-over {
  border-top: 2px solid #4a90d9;
}
```

```js
const list = document.getElementById('sortableList');

list.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
  }
});

list.addEventListener('dragend', (e) => {
  e.target.classList.remove('dragging');
  // Remove all drag-over indicators
  list.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
});

list.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';

  const draggingItem = list.querySelector('.dragging');
  const target = e.target.closest('li');
  if (!target || target === draggingItem) return;

  // Determine insert position
  const rect = target.getBoundingClientRect();
  const midpoint = rect.top + rect.height / 2;
  const insertAfter = e.clientY > midpoint;

  if (insertAfter) {
    target.classList.remove('drag-over');
    target.nextElementSibling?.classList.add('drag-over');
  } else {
    target.classList.add('drag-over');
  }
});

list.addEventListener('drop', (e) => {
  e.preventDefault();
  const draggingId = e.dataTransfer.getData('text/plain');
  const draggingItem = list.querySelector(`[data-id="${draggingId}"]`);
  const target = e.target.closest('li');

  if (!draggingItem || !target || draggingItem === target) return;

  const rect = target.getBoundingClientRect();
  const insertAfter = e.clientY > rect.top + rect.height / 2;

  if (insertAfter) {
    target.after(draggingItem);
  } else {
    target.before(draggingItem);
  }

  list.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
});
```

## File Drag and Drop

```html
<div id="fileDropZone" class="file-drop-zone">
  <p>Drag and drop files here</p>
  <p>or <a href="#" id="filePicker">browse files</a></p>
  <input type="file" id="fileInput" multiple hidden>
</div>

<div id="fileList" class="file-list"></div>
```

```css
.file-drop-zone {
  border: 3px dashed #4a90d9;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  background: #f8faff;
  transition: background 0.3s;
  cursor: pointer;
}

.file-drop-zone.dragover {
  background: #e0ecff;
  border-color: #1a5a99;
}

.file-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.file-item {
  padding: 8px 12px;
  background: #f0f0f0;
  border-radius: 6px;
  font-size: 0.875em;
  display: flex;
  align-items: center;
  gap: 8px;
}
```

```js
const fileDropZone = document.getElementById('fileDropZone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
  fileDropZone.addEventListener(event, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

['dragenter', 'dragover'].forEach(event => {
  fileDropZone.addEventListener(event, () => {
    fileDropZone.classList.add('dragover');
  });
});

['dragleave', 'drop'].forEach(event => {
  fileDropZone.addEventListener(event, () => {
    fileDropZone.classList.remove('dragover');
  });
});

fileDropZone.addEventListener('drop', (e) => {
  const files = e.dataTransfer.files;
  handleFiles(files);
});

fileDropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => handleFiles(fileInput.files));

function handleFiles(files) {
  Array.from(files).forEach(file => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `
      <span>${file.name}</span>
      <small>(${(file.size / 1024).toFixed(1)} KB)</small>
    `;
    fileList.appendChild(item);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.cssText = 'width: 80px; height: 80px; object-fit: cover; border-radius: 4px;';
        item.prepend(img);
      };
      reader.readAsDataURL(file);
    }
  });
}
```

## Practice

1. Build a kanban board with three columns (To Do, In Progress, Done) where cards can be dragged between columns.
2. Create a file upload area that accepts images, shows thumbnails, and validates file types and sizes.
3. Implement a draggable todo list where items can be reordered by dragging. Save the order to localStorage.
4. Build a shopping cart where products can be dragged into a cart area. Show quantity and total price.
