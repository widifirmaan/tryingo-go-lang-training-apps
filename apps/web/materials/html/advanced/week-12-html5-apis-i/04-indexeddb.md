# IndexedDB

## Overview

IndexedDB is a low-level API for storing large amounts of structured data client-side. It's an object-oriented database that supports indexes, transactions, and versioning.

### Key Concepts

- **Database**: Contains object stores
- **Object Store**: Like a table in SQL
- **Index**: For fast lookups
- **Transaction**: Atomic operations
- **Cursor**: Iterating over records
- **Key Path**: Property used as primary key

## Basic CRUD Operations

### Opening a Database

```js
const request = indexedDB.open('NotesDB', 1);

request.onerror = (event) => {
  console.error('Database error:', event.target.error);
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Create object store
  if (!db.objectStoreNames.contains('notes')) {
    const store = db.createObjectStore('notes', {
      keyPath: 'id',
      autoIncrement: true
    });

    // Create indexes
    store.createIndex('title', 'title', { unique: false });
    store.createIndex('category', 'category', { unique: false });
    store.createIndex('created', 'created', { unique: false });
  }

  if (!db.objectStoreNames.contains('categories')) {
    const catStore = db.createObjectStore('categories', {
      keyPath: 'id',
      autoIncrement: true
    });
    catStore.createIndex('name', 'name', { unique: true });
  }
};

request.onsuccess = (event) => {
  const db = event.target.result;
  console.log('Database opened successfully');
};
```

### Adding Data

```js
function addNote(db, note) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['notes'], 'readwrite');
    const store = transaction.objectStore('notes');
    const request = store.add(note);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Usage
const note = {
  title: 'Meeting Notes',
  content: 'Discussed Q3 roadmap...',
  category: 'work',
  tags: ['meeting', 'roadmap'],
  created: new Date().toISOString(),
  updated: new Date().toISOString()
};

addNote(db, note).then(id => {
  console.log('Note added with ID:', id);
});
```

### Reading Data

```js
function getNote(db, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['notes'], 'readonly');
    const store = transaction.objectStore('notes');
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getAllNotes(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['notes'], 'readonly');
    const store = transaction.objectStore('notes');
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Get by index
function getNotesByCategory(db, category) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['notes'], 'readonly');
    const store = transaction.objectStore('notes');
    const index = store.index('category');
    const request = index.getAll(category);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
```

### Updating Data

```js
function updateNote(db, note) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['notes'], 'readwrite');
    const store = transaction.objectStore('notes');
    const request = store.put(note);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Update with merge
async function updateNoteTitle(db, id, newTitle) {
  const note = await getNote(db, id);
  if (note) {
    note.title = newTitle;
    note.updated = new Date().toISOString();
    return updateNote(db, note);
  }
}
```

### Deleting Data

```js
function deleteNote(db, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['notes'], 'readwrite');
    const store = transaction.objectStore('notes');
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function clearAllNotes(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['notes'], 'readwrite');
    const store = transaction.objectStore('notes');
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
```

## Practical Application: Notes Manager

```html
<div class="notes-app">
  <header>
    <h1>My Notes</h1>
    <button id="addNoteBtn">+ New Note</button>
  </header>

  <aside>
    <h2>Categories</h2>
    <ul id="categoryList">
      <li data-category="all" class="active">All</li>
      <li data-category="work">Work</li>
      <li data-category="personal">Personal</li>
      <li data-category="ideas">Ideas</li>
    </ul>
  </aside>

  <main>
    <div id="notesGrid" class="notes-grid"></div>
  </main>

  <dialog id="noteDialog">
    <form method="dialog">
      <h2 id="dialogTitle">New Note</h2>
      <input type="text" id="noteTitle" placeholder="Note title" required>
      <select id="noteCategory">
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="ideas">Ideas</option>
      </select>
      <textarea id="noteContent" placeholder="Write your note..." rows="8"></textarea>
      <div class="dialog-actions">
        <button type="button" id="cancelBtn">Cancel</button>
        <button type="submit" id="saveBtn">Save</button>
      </div>
    </form>
  </dialog>
</div>
```

```css
.notes-app {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.note-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.note-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.note-card h3 { margin: 0 0 8px; font-size: 1.1em; }
.note-card .category {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  background: #e8f0fe;
  color: #4a90d9;
}
.note-card .date {
  font-size: 0.8em;
  color: #666;
  margin-top: 8px;
}
.note-card .delete-btn {
  float: right;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 1.2em;
}
```

```js
let db = null;
let currentCategory = 'all';

// Initialize database
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('NotesApp', 1);

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains('notes')) {
        const store = database.createObjectStore('notes', {
          keyPath: 'id',
          autoIncrement: true
        });
        store.createIndex('category', 'category', { unique: false });
        store.createIndex('created', 'created', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = () => reject(request.error);
  });
}

// CRUD wrapper
async function getAllNotes() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['notes'], 'readonly');
    const store = transaction.objectStore('notes');
    const index = store.index('created');
    const request = index.openCursor(null, 'prev');
    const notes = [];

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        notes.push(cursor.value);
        cursor.continue();
      } else {
        resolve(notes);
      }
    };
    request.onerror = () => reject(request.error);
  });
}

async function getNotesByCategory(category) {
  const all = await getAllNotes();
  return all.filter(note => note.category === category);
}

async function addNote(note) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['notes'], 'readwrite');
    const store = transaction.objectStore('notes');
    note.created = new Date().toISOString();
    note.updated = note.created;
    const request = store.add(note);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function deleteNoteById(id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['notes'], 'readwrite');
    const store = transaction.objectStore('notes');
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// UI Rendering
async function renderNotes() {
  const grid = document.getElementById('notesGrid');
  let notes;

  if (currentCategory === 'all') {
    notes = await getAllNotes();
  } else {
    notes = await getNotesByCategory(currentCategory);
  }

  grid.innerHTML = notes.map(note => `
    <div class="note-card" data-id="${note.id}">
      <button class="delete-btn" data-id="${note.id}">✕</button>
      <h3>${escapeHtml(note.title)}</h3>
      <span class="category">${note.category}</span>
      <p>${escapeHtml(note.content.substring(0, 100))}${note.content.length > 100 ? '...' : ''}</p>
      <div class="date">${new Date(note.created).toLocaleDateString()}</div>
    </div>
  `).join('');

  // Attach delete handlers
  grid.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      await deleteNoteById(id);
      renderNotes();
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Event handlers
document.addEventListener('DOMContentLoaded', async () => {
  await initDB();
  await renderNotes();
});

document.getElementById('addNoteBtn').addEventListener('click', () => {
  document.getElementById('dialogTitle').textContent = 'New Note';
  document.getElementById('noteTitle').value = '';
  document.getElementById('noteContent').value = '';
  document.getElementById('noteCategory').value = 'work';
  document.getElementById('noteDialog').showModal();
});

document.getElementById('noteDialog').addEventListener('submit', async (e) => {
  e.preventDefault();
  await addNote({
    title: document.getElementById('noteTitle').value,
    content: document.getElementById('noteContent').value,
    category: document.getElementById('noteCategory').value
  });
  document.getElementById('noteDialog').close();
  renderNotes();
});

document.getElementById('cancelBtn').addEventListener('click', () => {
  document.getElementById('noteDialog').close();
});

document.querySelectorAll('#categoryList li').forEach(li => {
  li.addEventListener('click', async () => {
    document.querySelectorAll('#categoryList li').forEach(l => l.classList.remove('active'));
    li.classList.add('active');
    currentCategory = li.dataset.category;
    renderNotes();
  });
});
```

## Cursors and Pagination

```js
function getNotesPaginated(db, pageSize = 10, lastKey = null) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['notes'], 'readonly');
    const store = transaction.objectStore('notes');
    const index = store.index('created');
    const range = lastKey ? IDBKeyRange.upperBound(lastKey, true) : null;
    const request = index.openCursor(range, 'prev');
    const notes = [];
    let count = 0;

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor && count < pageSize) {
        notes.push(cursor.value);
        count++;
        cursor.continue();
      } else {
        resolve({
          notes,
          hasMore: !!cursor,
          lastKey: notes.length > 0 ? notes[notes.length - 1].created : null
        });
      }
    };
    request.onerror = () => reject(request.error);
  });
}
```

## Practice

1. Build a contact manager with IndexedDB that supports CRUD operations, search by name, and filter by group.
2. Create a simple blog engine where posts are stored in IndexedDB with fields: title, content, author, tags, created, published.
3. Implement an offline-capable todo list that syncs with a server when online (use IndexedDB as local cache).
4. Build a product catalog browser that stores product data in IndexedDB with pagination, search by name, and filter by category.
