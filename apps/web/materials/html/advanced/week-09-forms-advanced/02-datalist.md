# Datalist and Autocomplete

## The Datalist Element

The `<datalist>` element provides a list of predefined options for `<input>` fields, offering autocomplete suggestions without blocking free text entry.

### Basic Usage

```html
<label for="country">Country:</label>
<input type="text" id="country" name="country" list="countries">
<datalist id="countries">
  <option value="United States">
  <option value="Canada">
  <option value="United Kingdom">
  <option value="Australia">
  <option value="Germany">
  <option value="France">
  <option value="Japan">
  <option value="Brazil">
  <option value="India">
  <option value="Nigeria">
</datalist>
```

### Datalist with Input Types

```html
<!-- Browser autocomplete for colors -->
<label for="color">Favorite Color:</label>
<input type="color" id="color" name="color" list="colors">
<datalist id="colors">
  <option value="#ff0000">
  <option value="#00ff00">
  <option value="#0000ff">
  <option value="#ffff00">
  <option value="#ff00ff">
</datalist>

<!-- Date suggestions -->
<label for="date">Preferred Date:</label>
<input type="date" id="date" name="date" list="dates">
<datalist id="dates">
  <option value="2026-01-01">
  <option value="2026-07-04">
  <option value="2026-12-25">
</datalist>

<!-- Range with labeled stops -->
<label for="volume">Volume:</label>
<input type="range" id="volume" name="volume" min="0" max="10"
       list="volumes" step="1">
<datalist id="volumes">
  <option value="0" label="Off">
  <option value="5" label="Medium">
  <option value="10" label="Max">
</datalist>
```

### Styling Datalist

Datalist dropdown styling is limited. You can style the input:

```css
input[list] {
  background-image: url('dropdown-arrow.svg');
  background-repeat: no-repeat;
  background-position: right 8px center;
  padding-right: 30px;
}

/* Style the wrapper, not the native datalist popup */
.datalist-wrapper {
  position: relative;
  display: inline-block;
}
```

### Dynamic Datalist with JavaScript

```html
<label for="search">Search Users:</label>
<input type="text" id="search" name="search" list="users">
<datalist id="users"></datalist>
```

```js
const searchInput = document.getElementById('search');
const usersDatalist = document.getElementById('users');

const users = [
  'Alice Johnson', 'Bob Smith', 'Charlie Brown',
  'Diana Prince', 'Eve Adams', 'Frank Castle'
];

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  usersDatalist.innerHTML = '';

  const filtered = users.filter(user =>
    user.toLowerCase().includes(query)
  );

  filtered.forEach(user => {
    const option = document.createElement('option');
    option.value = user;
    usersDatalist.appendChild(option);
  });
});
```

### Datalist with Fetch (AJAX)

```html
<label for="city">City:</label>
<input type="text" id="city" name="city" list="cities" autocomplete="off">
<datalist id="cities"></datalist>
```

```js
const cityInput = document.getElementById('city');
const citiesDatalist = document.getElementById('cities');
let debounceTimer;

cityInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  const query = cityInput.value.trim();

  if (query.length < 2) {
    citiesDatalist.innerHTML = '';
    return;
  }

  debounceTimer = setTimeout(async () => {
    try {
      const response = await fetch(
        `https://api.example.com/cities?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      citiesDatalist.innerHTML = '';
      data.cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.name;
        citiesDatalist.appendChild(option);
      });
    } catch (err) {
      console.error('Failed to fetch cities:', err);
    }
  }, 300);
});
```

### Autocomplete Attribute

```html
<form autocomplete="on">
  <label for="name">Full Name:</label>
  <input type="text" id="name" name="name" autocomplete="name">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" autocomplete="email">

  <label for="tel">Phone:</label>
  <input type="tel" id="tel" name="tel" autocomplete="tel">

  <label for="street">Street Address:</label>
  <input type="text" id="street" name="street" autocomplete="street-address">

  <label for="country2">Country:</label>
  <input type="text" id="country2" name="country2"
         autocomplete="country-name" list="countries">

  <label for="cc">Credit Card:</label>
  <input type="text" id="cc" name="cc"
         autocomplete="cc-number" pattern="[0-9]{13,16}">
</form>
```

### Autocomplete Token Values

| Token | Meaning |
|-------|---------|
| `on`/`off` | Enable/disable autocomplete |
| `name` | Full name |
| `email` | Email address |
| `tel` | Phone number |
| `street-address` | Full street address |
| `country-name` | Country name |
| `postal-code` | Postal/ZIP code |
| `cc-number` | Credit card number |
| `cc-exp` | Credit card expiration |
| `username` | Username |
| `current-password` | Current password |
| `new-password` | New password |
| `one-time-code` | One-time code (SMS) |

## Practice

1. Create a programming language selector using `<datalist>` with 20+ language options. Filter the list dynamically as the user types.
2. Build a car make/model selector with two inputs — make uses a static datalist, model updates dynamically via JavaScript when a make is selected.
3. Use the `autocomplete` attribute to create a checkout form with fields for name, email, address, credit card, and CVV. Use proper tokens.
4. Create a range slider with labeled datalist ticks showing temperature: Cold, Cool, Warm, Hot, Very Hot.
