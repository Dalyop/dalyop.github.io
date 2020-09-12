const cacheName = 'v1';

const cacheAssets = [
	'index.html',
	'../assets/css/style.css',
	'../assets/css/main.css',
	'../assets/js/app.js',
	'../assets/js/main.js',
	'../assets/img/icons/',
	'../assets/vendor/'
	
];

//call install event
self.addEventListener('install', event => {
	console.log('Service worker is installed')
	
	event.waitUntil(
		caches.open(cacheName)
		.then(cache => {
			console.log('Service worker is caching files');
			cache.addAll(cacheAssets);
		})
		.then(() => self.skipWaiting())
	);
});

//call activate event
self.addEventListener('activate', event => {
	console.log('Service worker is activated')
	//Remove caching
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
			cacheNames.map(cache => {
				if(cache !== cacheName) {
					console.log('Service worker is clearing old cache');
					return caches.delete(cache);
				}
			})
			);
		})
	);
});

//call fetch event

self.addEventListener('fetch', event => {
	console.log('Service worker is fetching');
	event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});

