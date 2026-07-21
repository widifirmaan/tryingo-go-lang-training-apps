# Geolocation API

## Overview

The Geolocation API allows web applications to access the user's geographical location with their permission.

### Browser Support

```html
<!-- Check for support -->
<p id="geo-support"></p>
```

```js
if ('geolocation' in navigator) {
  document.getElementById('geo-support').textContent =
    'Geolocation is supported ✓';
} else {
  document.getElementById('geo-support').textContent =
    'Geolocation is NOT supported ✗';
}
```

## Methods

### getCurrentPosition()

```js
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude, accuracy, altitude,
            altitudeAccuracy, heading, speed } = position.coords;
    const timestamp = position.timestamp;

    console.log('Position:', { latitude, longitude, accuracy });
    console.log('Timestamp:', new Date(timestamp).toISOString());
  },
  (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied geolocation request');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Position information unavailable');
        break;
      case error.TIMEOUT:
        alert('Geolocation request timed out');
        break;
      default:
        alert('Unknown error occurred');
    }
  },
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  }
);
```

### watchPosition()

Continuously tracks position changes:

```js
let watchId = null;

function startTracking() {
  if (!('geolocation' in navigator)) return;

  watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude, heading, speed } = position.coords;
      updateUI({ latitude, longitude, heading, speed });
      updateMap({ latitude, longitude });
    },
    (error) => console.error('Tracking error:', error),
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  );
}

function stopTracking() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
}
```

## Practical Example: Location Display

```html
<div class="geo-demo">
  <p>Status: <span id="geoStatus">Checking...</span></p>
  <p>Latitude: <span id="latitude">--</span></p>
  <p>Longitude: <span id="longitude">--</span></p>
  <p>Accuracy: <span id="accuracy">--</span> meters</p>
  <p>Address: <span id="address">--</span></p>
  <button id="getLocationBtn">Get My Location</button>
</div>
```

```js
const statusEl = document.getElementById('geoStatus');
const latEl = document.getElementById('latitude');
const lngEl = document.getElementById('longitude');
const accEl = document.getElementById('accuracy');
const addrEl = document.getElementById('address');

document.getElementById('getLocationBtn').addEventListener('click', () => {
  if (!navigator.geolocation) {
    statusEl.textContent = 'Geolocation not supported';
    return;
  }

  statusEl.textContent = 'Getting location...';

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      latEl.textContent = latitude.toFixed(6);
      lngEl.textContent = longitude.toFixed(6);
      accEl.textContent = accuracy.toFixed(0);
      statusEl.textContent = 'Location found ✓';

      // Reverse geocoding
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?` +
          `lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();
        addrEl.textContent = data.display_name;
      } catch {
        addrEl.textContent = 'Could not get address';
      }
    },
    (error) => {
      statusEl.textContent = `Error: ${error.message}`;
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});
```

## Location-Based Features

### Distance Calculator

```js
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

// Find nearby places
function findNearbyPlaces(userLat, userLng, places, radiusKm = 5) {
  return places.filter(place => {
    const dist = calculateDistance(
      userLat, userLng,
      place.latitude, place.longitude
    );
    place.distance = (dist / 1000).toFixed(1);
    return dist <= radiusKm * 1000;
  }).sort((a, b) => a.distance - b.distance);
}
```

### Display on Map (using Leaflet)

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<div id="map" style="height: 400px;"></div>
<button id="locateBtn">Find My Location</button>
```

```js
const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let userMarker = null;

document.getElementById('locateBtn').addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    map.setView([latitude, longitude], 13);

    if (userMarker) {
      userMarker.setLatLng([latitude, longitude]);
    } else {
      userMarker = L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup('You are here');
    }
  });
});
```

## Privacy & Best Practices

```js
// Always request permission explicitly (user gesture)
document.getElementById('requestBtn').addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(success, error);
});

// Provide a fallback
function getLocationFallback() {
  // Use IP-based geolocation as fallback
  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
      console.log('IP-based location:', data.city, data.country);
    });
}

// Handle permission changes
navigator.permissions.query({ name: 'geolocation' }).then(result => {
  if (result.state === 'granted') {
    // Start tracking
  } else if (result.state === 'prompt') {
    // Will prompt on next request
  } else if (result.state === 'denied') {
    // Show manual location input
  }

  result.addEventListener('change', () => {
    console.log('Permission changed to:', result.state);
  });
});
```

## Practice

1. Build a "Where Am I?" page that shows the user's current location on a map with their address via reverse geocoding.
2. Create a fitness tracker that uses `watchPosition` to track distance traveled with start/stop controls.
3. Build a "Find Nearby" app that lists predefined points of interest within a user-specified radius.
4. Implement a geolocation-based weather app that fetches the user's location and displays local weather.
