# Canvas API

## Overview

The `<canvas>` element provides a bitmap drawing area that can be manipulated with JavaScript.

### Basic Setup

```html
<canvas id="myCanvas" width="800" height="600">
  Your browser does not support the canvas element.
</canvas>
```

```css
canvas {
  border: 1px solid #ccc;
  display: block;
  margin: 0 auto;
}
```

```js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
```

## Drawing Shapes

### Rectangles

```js
// Fill rectangle
ctx.fillStyle = '#4a90d9';
ctx.fillRect(50, 50, 200, 100);

// Stroke rectangle
ctx.strokeStyle = '#2c3e50';
ctx.lineWidth = 4;
ctx.strokeRect(50, 200, 200, 100);

// Clear rectangle
ctx.clearRect(75, 75, 150, 50);

// Rounded rectangle (custom)
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

roundRect(ctx, 300, 50, 200, 100, 16);
ctx.fillStyle = '#e74c3c';
ctx.fill();
```

### Paths and Lines

```js
// Line
ctx.beginPath();
ctx.moveTo(50, 350);
ctx.lineTo(250, 350);
ctx.strokeStyle = '#3498db';
ctx.lineWidth = 6;
ctx.lineCap = 'round';
ctx.stroke();

// Multiple lines
ctx.beginPath();
ctx.moveTo(50, 400);
ctx.lineTo(150, 350);
ctx.lineTo(250, 400);
ctx.lineTo(350, 350);
ctx.strokeStyle = '#2ecc71';
ctx.lineWidth = 4;
ctx.stroke();

// Dashed line
ctx.beginPath();
ctx.setLineDash([10, 5]);
ctx.moveTo(50, 450);
ctx.lineTo(350, 450);
ctx.strokeStyle = '#e67e22';
ctx.lineWidth = 3;
ctx.stroke();
ctx.setLineDash([]); // Reset
```

### Arcs and Circles

```js
// Full circle
ctx.beginPath();
ctx.arc(100, 500, 40, 0, Math.PI * 2);
ctx.fillStyle = '#9b59b6';
ctx.fill();

// Arc (semicircle)
ctx.beginPath();
ctx.arc(220, 500, 40, 0, Math.PI);
ctx.fillStyle = '#1abc9c';
ctx.fill();

// Arc with stroke
ctx.beginPath();
ctx.arc(340, 500, 40, 0, Math.PI * 1.5);
ctx.strokeStyle = '#e74c3c';
ctx.lineWidth = 4;
ctx.stroke();
```

### Quadratic and Bezier Curves

```js
// Quadratic curve
ctx.beginPath();
ctx.moveTo(50, 550);
ctx.quadraticCurveTo(150, 500, 250, 550);
ctx.strokeStyle = '#3498db';
ctx.lineWidth = 3;
ctx.stroke();

// Bezier curve
ctx.beginPath();
ctx.moveTo(300, 550);
ctx.bezierCurveTo(350, 500, 450, 600, 500, 550);
ctx.strokeStyle = '#e74c3c';
ctx.lineWidth = 3;
ctx.stroke();
```

## Text

```js
// Fill text
ctx.font = 'bold 48px Arial';
ctx.fillStyle = '#2c3e50';
ctx.textAlign = 'center';
ctx.fillText('Canvas Text', 400, 200);

// Stroke text
ctx.font = '36px Georgia';
ctx.strokeStyle = '#e74c3c';
ctx.lineWidth = 2;
ctx.strokeText('Outline Text', 400, 280);

// Measure text
const metrics = ctx.measureText('Canvas Text');
console.log('Width:', metrics.width);
console.log('Height:', metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);

// Multi-line text
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

ctx.font = '16px Arial';
ctx.fillStyle = '#333';
wrapText(ctx, 'This is a long text that will wrap across multiple lines within the canvas element.', 50, 320, 300, 24);
```

## Images

```js
// Draw image
const img = new Image();
img.src = 'photo.jpg';
img.onload = () => {
  ctx.drawImage(img, 50, 50);

  // Scaled
  ctx.drawImage(img, 50, 200, 200, 150);

  // Cropped
  ctx.drawImage(img, sx, sy, sw, sh, 300, 50, 200, 150);
};

// Image with onerror handling
img.onerror = () => {
  ctx.fillStyle = '#999';
  ctx.fillRect(50, 50, 200, 150);
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.fillText('Image not found', 150, 125);
};
```

## Gradients

```js
// Linear gradient
const gradient = ctx.createLinearGradient(50, 50, 250, 150);
gradient.addColorStop(0, '#3498db');
gradient.addColorStop(0.5, '#2ecc71');
gradient.addColorStop(1, '#e74c3c');
ctx.fillStyle = gradient;
ctx.fillRect(50, 50, 200, 100);

// Radial gradient
const radial = ctx.createRadialGradient(400, 100, 20, 400, 100, 80);
radial.addColorStop(0, '#f1c40f');
radial.addColorStop(0.5, '#e67e22');
radial.addColorStop(1, '#e74c3c');
ctx.fillStyle = radial;
ctx.beginPath();
ctx.arc(400, 100, 80, 0, Math.PI * 2);
ctx.fill();
```

## Transformations

```js
// Save and restore state
ctx.save(); // Save current state

ctx.translate(200, 200);
ctx.rotate(Math.PI / 4); // 45 degrees
ctx.scale(1.5, 1.5);

ctx.fillStyle = '#9b59b6';
ctx.fillRect(-25, -25, 50, 50);

ctx.restore(); // Restore state

// Rotated text
ctx.save();
ctx.translate(400, 350);
ctx.rotate(-Math.PI / 6);
ctx.font = '24px Arial';
ctx.fillStyle = '#2c3e50';
ctx.textAlign = 'center';
ctx.fillText('Rotated Text', 0, 0);
ctx.restore();
```

## Bar Chart Example

```js
function drawBarChart(data, labels, canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const padding = { top: 20, right: 20, bottom: 50, left: 60 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...data);

  // Clear
  ctx.clearRect(0, 0, width, height);

  // Background
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.font = 'bold 18px Arial';
  ctx.fillStyle = '#333';
  ctx.textAlign = 'center';
  ctx.fillText('Monthly Sales', width / 2, 30);

  // Y-axis grid lines
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + chartHeight - (chartHeight * i / 4);
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    // Y-axis labels
    ctx.fillStyle = '#666';
    ctx.textAlign = 'right';
    ctx.font = '12px Arial';
    ctx.fillText(Math.round(maxValue * i / 4), padding.left - 8, y + 4);
  }

  // Bars
  const barWidth = chartWidth / data.length * 0.7;
  const gap = chartWidth / data.length * 0.3;

  data.forEach((value, index) => {
    const x = padding.left + index * (barWidth + gap) + gap / 2;
    const barHeight = (value / maxValue) * chartHeight;
    const y = padding.top + chartHeight - barHeight;

    // Bar
    const gradient = ctx.createLinearGradient(x, y, x, padding.top + chartHeight);
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, '#2980b9');
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth, barHeight);

    // Value on top
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.font = 'bold 12px Arial';
    ctx.fillText(value, x + barWidth / 2, y - 8);

    // Label below
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.fillText(labels[index], x + barWidth / 2, padding.top + chartHeight + 20);
  });
}

// Usage
const data = [450, 820, 630, 940, 780, 1100];
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
drawBarChart(data, labels, 'myCanvas');
```

## Animation Loop

```js
let x = 0;
let direction = 1;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw moving circle
  ctx.beginPath();
  ctx.arc(x, 300, 30, 0, Math.PI * 2);
  ctx.fillStyle = '#3498db';
  ctx.fill();

  // Update position
  x += 2 * direction;
  if (x > canvas.width - 30 || x < 30) {
    direction *= -1;
  }

  requestAnimationFrame(animate);
}

animate();
```

## Practice

1. Draw a pie chart showing market share percentages. Include labels and a legend.
2. Create an animated particle system with 100+ particles that move and fade.
3. Build a simple drawing app where users can draw with the mouse (mousedown starts path, mousemove draws, mouseup stops).
4. Create a clock face with hour, minute, and second hands that updates in real-time.
