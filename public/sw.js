// Service Worker placeholder
// This file prevents 404 errors for browsers that automatically request service workers

self.addEventListener('install', function(event) {
  console.log('Service Worker installed');
});

self.addEventListener('activate', function(event) {
  console.log('Service Worker activated');
});