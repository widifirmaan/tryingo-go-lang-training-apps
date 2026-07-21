# Advanced Datalist Patterns

## Overview

Beyond basic autocomplete, `<datalist>` can be combined with other modern elements for rich input experiences.

## Dynamic Datalist with Fetch

```html
<search aria-label="Search countries">
  <label for="countrySearch">Country:</label>
  <input type="text" id="countrySearch" name="country"
         list="countryList" placeholder="Type a country..."
         autocomplete="off">
  <datalist id="countryList"></datalist>
</search>
```

```js
const countryInput = document.getElementById('countrySearch');
const countryList = document.getElementById('countryList');

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus',
  'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
  'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
  // ... more countries
];

countryInput.addEventListener('input', () => {
  const query = countryInput.value.toLowerCase();
  countryList.innerHTML = '';

  if (query.length < 1) return;

  const filtered = countries.filter(c =>
    c.toLowerCase().startsWith(query)
  ).slice(0, 10);

  filtered.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    countryList.appendChild(option);
  });
});

// Ensure valid selection
countryInput.addEventListener('blur', () => {
  const value = countryInput.value;
  if (value && !countries.includes(value)) {
    countryInput.setCustomValidity('Please select a valid country');
  } else {
    countryInput.setCustomValidity('');
  }
});
```

## Datalist with Grouped Options

```html
<label for="framework">Choose a Framework:</label>
<input type="text" id="framework" name="framework" list="frameworks">
<datalist id="frameworks">
  <!-- Frontend -->
  <option value="React" label="Frontend">
  <option value="Vue" label="Frontend">
  <option value="Angular" label="Frontend">
  <option value="Svelte" label="Frontend">

  <!-- Backend -->
  <option value="Express" label="Backend">
  <option value="Django" label="Backend">
  <option value="Laravel" label="Backend">
  <option value="Spring" label="Backend">

  <!-- Full Stack -->
  <option value="Next.js" label="Full Stack">
  <option value="Nuxt" label="Full Stack">
  <option value="Remix" label="Full Stack">
</datalist>
```

## Multi-Field Datalist

```html
<form id="addressForm">
  <label for="street">Street:</label>
  <input type="text" id="street" name="street">

  <label for="city">City:</label>
  <input type="text" id="city" name="city" list="cities">

  <label for="zip">ZIP Code:</label>
  <input type="text" id="zip" name="zip" list="zipCodes">

  <datalist id="cities"></datalist>
  <datalist id="zipCodes"></datalist>
</form>
```

```js
const addressData = {
  'San Francisco': { zip: '94102', cities: ['San Francisco', 'Daly City', 'South San Francisco'] },
  'New York': { zip: '10001', cities: ['New York', 'Brooklyn', 'Queens'] },
  'Chicago': { zip: '60601', cities: ['Chicago', 'Evanston', 'Oak Park'] },
  'Los Angeles': { zip: '90001', cities: ['Los Angeles', 'Santa Monica', 'Glendale'] }
};

const cityInput = document.getElementById('city');
const zipInput = document.getElementById('zip');
const cityList = document.getElementById('cities');
const zipList = document.getElementById('zipCodes');

cityInput.addEventListener('input', () => {
  const query = cityInput.value.toLowerCase();
  cityList.innerHTML = '';

  Object.keys(addressData).filter(city => {
    const match = city.toLowerCase().includes(query);
    const altCities = addressData[city].cities.some(c => c.toLowerCase().includes(query));
    return match || altCities;
  }).slice(0, 8).forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    cityList.appendChild(option);
  });
});

cityInput.addEventListener('change', () => {
  const data = addressData[cityInput.value];
  if (data) {
    zipInput.value = data.zip;
  }
});
```

## Datalist with Images and Icons

```html
<label for="emoji">Search emoji:</label>
<input type="text" id="emoji" name="emoji" list="emojiList"
       placeholder="Type emoji name...">
<datalist id="emojiList">
  <option value="😊 Smiling Face">
  <option value="❤️ Red Heart">
  <option value="👍 Thumbs Up">
  <option value="🎉 Party Popper">
  <option value="🔥 Fire">
  <option value="⭐ Star">
  <option value="✅ Check Mark">
  <option value="👋 Waving Hand">
</datalist>
```

```js
const emojiInput = document.getElementById('emoji');
const emojiList = document.getElementById('emojiList');

emojiInput.addEventListener('input', () => {
  const query = emojiInput.value.toLowerCase();
  emojiList.innerHTML = '';

  const emojis = [
    { emoji: '😊', name: 'Smiling Face' },
    { emoji: '❤️', name: 'Red Heart' },
    { emoji: '👍', name: 'Thumbs Up' },
    { emoji: '🎉', name: 'Party Popper' },
    { emoji: '🔥', name: 'Fire' },
    { emoji: '⭐', name: 'Star' },
    { emoji: '✅', name: 'Check Mark' },
    { emoji: '👋', name: 'Waving Hand' }
  ];

  emojis.filter(e => e.name.toLowerCase().includes(query)).forEach(e => {
    const option = document.createElement('option');
    option.value = `${e.emoji} ${e.name}`;
    emojiList.appendChild(option);
  });
});
```

## Form Integration

```html
<form id="productForm">
  <label for="product">Product:</label>
  <input type="text" id="product" name="product" list="products">

  <label for="quantity">Quantity:</label>
  <input type="number" id="quantity" name="quantity" min="1" list="quantities">

  <datalist id="products">
    <option value="Laptop - $999">
    <option value="Mouse - $29">
    <option value="Keyboard - $79">
    <option value="Monitor - $399">
  </datalist>

  <datalist id="quantities">
    <option value="1">
    <option value="5">
    <option value="10">
    <option value="25">
    <option value="50">
    <option value="100">
  </datalist>
</form>
```

```js
// Parse selected product value
document.getElementById('productForm').addEventListener('submit', (e) => {
  const productInput = document.getElementById('product');
  const match = productInput.value.match(/^(.+?) - \$(\d+)$/);

  if (match) {
    const [, productName, price] = match;
    console.log('Product:', productName, 'Price:', price);
  }
});
```

## Practice

1. Build a car make/model/year selector using three datalist inputs where the model options change based on the selected make.
2. Create a currency converter with a datalist of currencies including codes, symbols, and names.
3. Build a time zone selector with a datalist that includes UTC offset and region information.
4. Create a form that validates that the user's input matches one of the datalist options.
