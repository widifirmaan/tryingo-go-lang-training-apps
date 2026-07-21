# Search Element

## Overview

The `<search>` element represents a set of controls for search functionality, providing semantic meaning to search sections.

### Basic Search Form

```html
<search>
  <form action="/search" method="get" role="search">
    <label for="searchInput" class="sr-only">Search the site</label>
    <input type="search" id="searchInput" name="q"
           placeholder="Search..." required
           autocomplete="off">
    <button type="submit">🔍 Search</button>
  </form>
</search>
```

### Search with Datalist

```html
<search aria-label="Site search">
  <form action="/search" method="get">
    <label for="siteSearch">Search:</label>
    <input type="search" id="siteSearch" name="q"
           list="suggestions" placeholder="Search..."
           autocomplete="off">
    <datalist id="suggestions">
      <option value="HTML5 Forms">
      <option value="CSS Grid Layout">
      <option value="JavaScript Basics">
      <option value="Web Accessibility">
      <option value="React Tutorial">
    </datalist>
    <button type="submit">Search</button>
  </form>
</search>
```

## Live Search with Results

```html
<search aria-label="Search users">
  <form role="search" onsubmit="return false;">
    <label for="userSearch">Search users:</label>
    <div class="search-wrapper">
      <input type="search" id="userSearch" name="q"
             placeholder="Type to search..." autocomplete="off">
      <div class="search-spinner" id="searchSpinner" hidden></div>
    </div>
  </form>
</search>

<div id="searchResults" class="search-results" role="listbox"
     aria-label="Search results"></div>
<div id="searchStatus" role="status" aria-live="polite"></div>
```

```css
.search-wrapper { position: relative; }
.search-spinner {
  position: absolute; right: 12px; top: 50%;
  transform: translateY(-50%);
  width: 20px; height: 20px;
  border: 2px solid #eee;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }

.search-results {
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-height: 400px;
  overflow-y: auto;
  display: none;
}

.search-results.active { display: block; }

.search-result-item {
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}

.search-result-item:last-child { border-bottom: none; }
.search-result-item:hover,
.search-result-item[aria-selected="true"] { background: #e8f0fe; }

.search-result-item .highlight { background: #fff3cd; }

.no-results { padding: 16px; text-align: center; color: #999; }
```

```js
const searchInput = document.getElementById('userSearch');
const resultsContainer = document.getElementById('searchResults');
const statusContainer = document.getElementById('searchStatus');
const spinner = document.getElementById('searchSpinner');

let debounceTimer;
let selectedIndex = -1;

searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);

  const query = searchInput.value.trim();

  if (query.length < 2) {
    resultsContainer.classList.remove('active');
    resultsContainer.innerHTML = '';
    statusContainer.textContent = '';
    selectedIndex = -1;
    return;
  }

  spinner.hidden = false;
  statusContainer.textContent = 'Searching...';

  debounceTimer = setTimeout(async () => {
    try {
      // Simulated search
      const results = await simulateSearch(query);
      displayResults(results, query);
      statusContainer.textContent = `${results.length} results found`;
    } catch (err) {
      resultsContainer.innerHTML =
        '<div class="no-results">Error performing search</div>';
    } finally {
      spinner.hidden = true;
    }
  }, 300);
});

function displayResults(results, query) {
  resultsContainer.classList.add('active');

  if (results.length === 0) {
    resultsContainer.innerHTML =
      '<div class="no-results">No results found</div>';
    return;
  }

  resultsContainer.innerHTML = results.map((result, index) => `
    <div class="search-result-item" role="option"
         data-index="${index}"
         onclick="selectResult('${result.url}')">
      <strong>${highlightText(result.title, query)}</strong>
      <br>
      <small>${highlightText(result.description, query)}</small>
    </div>
  `).join('');
}

function highlightText(text, query) {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

function selectResult(url) {
  window.location.href = url;
}

// Keyboard navigation
searchInput.addEventListener('keydown', (e) => {
  const items = resultsContainer.querySelectorAll('.search-result-item');

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
      updateSelection(items);
      break;
    case 'ArrowUp':
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, -1);
      updateSelection(items);
      break;
    case 'Enter':
      e.preventDefault();
      if (selectedIndex >= 0 && items[selectedIndex]) {
        items[selectedIndex].click();
      }
      break;
    case 'Escape':
      resultsContainer.classList.remove('active');
      searchInput.blur();
      break;
  }
});

function updateSelection(items) {
  items.forEach((item, index) => {
    item.setAttribute('aria-selected', index === selectedIndex);
    item.style.background = index === selectedIndex ? '#e8f0fe' : '';
  });

  if (items[selectedIndex]) {
    items[selectedIndex].scrollIntoView({ block: 'nearest' });
  }
}

// Simulated search
async function simulateSearch(query) {
  const data = [
    { title: 'HTML5 Forms Guide', description: 'Learn form validation and attributes', url: '/guides/html5-forms' },
    { title: 'CSS Grid Layout', description: 'Modern 2D layout with CSS Grid', url: '/guides/css-grid' },
    { title: 'JavaScript Fundamentals', description: 'Core JS concepts for beginners', url: '/guides/js-fundamentals' },
    { title: 'Web Accessibility', description: 'Making websites accessible for all', url: '/guides/a11y' },
    { title: 'React Tutorial', description: 'Build UIs with React library', url: '/tutorials/react' },
    { title: 'Node.js Backend', description: 'Server-side JavaScript with Node', url: '/guides/nodejs' },
    { title: 'CSS Animations', description: 'Create engaging animations', url: '/guides/css-animations' },
    { title: 'Web Performance', description: 'Optimize page load times', url: '/guides/performance' }
  ];

  await new Promise(r => setTimeout(r, 200)); // Simulate network

  return data.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );
}
```

## Search in Navigation

```html
<header>
  <nav aria-label="Main">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/products">Products</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>

  <search aria-label="Search products">
    <form action="/products" method="get">
      <input type="search" name="q" placeholder="Search products..."
             aria-label="Search products">
    </form>
  </search>
</header>
```

## Practice

1. Build a search interface with live results, keyboard navigation, and proper ARIA roles.
2. Create a search filter for a product catalog that filters results as the user types and displays count.
3. Build an advanced search form with filters (category, price range, date) using the `<search>` element.
4. Create a global site search that searches across multiple content types (pages, products, blog posts) with tabs.
