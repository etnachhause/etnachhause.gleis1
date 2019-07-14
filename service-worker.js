var filesToCache = [
  '.',
  '/',
  'index.html',
  'manifest.json',
  'service-worker.js',
  'javascript/chui-3.9.2.js',
  'javascript/chui-3.9.2.min.js',
  'javascript/jquery.min.js',
  'javascript/jquery-2.2.0.min.js',
  'javascript/leaflet.js',
  'javascript/ol.js',
  'styles/chui-android-3.9.2.css',
  'styles/chui-android-3.9.2.min.css',
  'styles/chui-ios-3.9.2.css',
  'styles/chui-ios-3.9.2.min.css',
  'styles/chui-win-3.9.2.css',
  'styles/chui-win-3.9.2.min.css',
  'styles/geopp-android.css',
  'styles/geopp-ios.css',
  'styles/geopp-win.css',
  'styles/leaflet.css',
  'styles/reset.css',
  'styles/styles.css',
  'styles/images/layers.png',
  'styles/images/layers-2x.png',
  'styles/images/marker-icon.png',
  'styles/images/marker-icon-2x.png',
  'styles/images/marker-shadow.png',
  'bilder/favicon.ico',
  'bilder/pin_48.png',
  'bilder/touch-icon-iphone.png',
  'bilder/touch-icon-iphone_144.png'
];

	latestCacheName = 'App-Shell-v1';
	self.addEventListener('install', function (event) {
	  event.waitUntil(
		caches.open(latestCacheName)
		  .then(function (cache) {
			return cache.addAll(filesToCache)
			.then(() => self.skipWaiting());
		  })
	  );
	});

	self.addEventListener('activate', event => {
	  event.waitUntil(
		caches.keys().then(allCaches => {
			allCaches.forEach(cache => {
			  if (cache !== latestCacheName) {
				  caches.delete(cache);
			  }
			})
		})
	  );
	});

	self.addEventListener('fetch', function (event) {
	  event.respondWith(
		caches.match(event.request)
		.then(function (response) {
		  if (response) {
			return response;
		  } else {
			return fetch(event.request);
		  }
		})
	  );
   });

