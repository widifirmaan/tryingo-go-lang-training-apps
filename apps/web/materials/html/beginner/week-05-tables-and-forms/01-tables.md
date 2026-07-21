# HTML Tables

The `<table>` element displays data in rows and columns. Use tables for tabular data only — never for page layout.

## Basic Table Structure

```html
<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
    <th>City</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>28</td>
    <td>New York</td>
  </tr>
  <tr>
    <td>Bob</td>
    <td>34</td>
    <td>London</td>
  </tr>
</table>
```

## Table Sections

Use `<thead>`, `<tbody>`, and `<tfoot>` to group rows semantically.

```html
<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Qty</th>
      <th>Price</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Widget</td>
      <td>2</td>
      <td>$10.00</td>
      <td>$20.00</td>
    </tr>
    <tr>
      <td>Gadget</td>
      <td>1</td>
      <td>$25.00</td>
      <td>$25.00</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Subtotal</td>
      <td>$45.00</td>
    </tr>
  </tfoot>
</table>
```

| Element | Purpose |
|---------|---------|
| `<thead>` | Column headers (one or more rows) |
| `<tbody>` | Main data rows (can have multiple) |
| `<tfoot>` | Summary rows — footer |

## Table Cells

| Element | Meaning |
|---------|---------|
| `<th>` | Header cell (bold, centered by default) |
| `<td>` | Data cell |

### `scope` Attribute

Helps screen readers associate headers with data.

```html
<tr>
  <th scope="col">Name</th>
  <th scope="col">Email</th>
</tr>
<tr>
  <th scope="row">Alice</th>
  <td>alice@example.com</td>
</tr>
```

| Value | When to Use |
|-------|-------------|
| `col` | Header for a column |
| `row` | Header for a row |
| `colgroup` | Header for a group of columns |
| `rowgroup` | Header for a group of rows |

## `colspan` and `rowspan`

Merge cells across multiple columns or rows.

```html
<table>
  <thead>
    <tr>
      <th colspan="2">Full Name</th>
      <th colspan="2">Contact</th>
    </tr>
    <tr>
      <th>First</th>
      <th>Last</th>
      <th>Email</th>
      <th>Phone</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>Doe</td>
      <td>john@example.com</td>
      <td>555-0100</td>
    </tr>
    <tr>
      <td rowspan="2">Jane</td>
      <td>Smith</td>
      <td>jane@example.com</td>
      <td>555-0200</td>
    </tr>
    <tr>
      <!-- rowspan from Jane fills this -->
      <td>Johnson</td>
      <td>j.johnson@example.com</td>
      <td>555-0300</td>
    </tr>
  </tbody>
</table>
```

## Table Caption

```html
<table>
  <caption>Employee Directory</caption>
  <thead>...</thead>
  <tbody>...</tbody>
</table>
```

## Accessibility with `scope` and Caption

```html
<table>
  <caption>Quarterly Sales Report 2026</caption>
  <thead>
    <tr>
      <th scope="col">Quarter</th>
      <th scope="col">Revenue</th>
      <th scope="col">Expenses</th>
      <th scope="col">Profit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Q1</th>
      <td>$50,000</td>
      <td>$35,000</td>
      <td>$15,000</td>
    </tr>
  </tbody>
</table>
```

## Practice

1. Create a timetable showing class sessions across weekdays
2. Build a product inventory table with `colspan` in headers
3. Add a `rowspan` cell for a person with multiple entries
4. Use `scope` attributes and a `<caption>`
5. Style the table with zebra stripes using CSS (`tr:nth-child(even)`)
