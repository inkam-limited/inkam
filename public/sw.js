if(!self.define){let e,t={};const a=(a,s)=>(a=new URL(a+".js",s).href,t[a]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=t,document.head.appendChild(e)}else e=a,importScripts(a),t()})).then((()=>{let e=t[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(s,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(t[c])return;let i={};const r=e=>a(e,c),o={module:{uri:c},exports:i,require:r};t[c]=Promise.all(s.map((e=>o[e]||r(e)))).then((e=>(n(...e),i)))}}define(["./workbox-3c9d0171"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/VXvG8Pf0Ewtt3m6tHaCX1/_buildManifest.js",revision:"abe4324ccfce55fa1f934ee200491acc"},{url:"/_next/static/VXvG8Pf0Ewtt3m6tHaCX1/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1406-1fabddf154d270b7.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/2078-c0d107905953ef0a.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/3231-2e792461ca9fed9f.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/3349-91eeb324451294fc.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/3499-8e9cb53c44c956c4.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/3f621323-f0b8b050ab8b9e3b.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/4520-6c6a62d2819919a6.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/471-b5471ad12b4629a3.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/5750-0cb90d90cde8b61e.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/5997-87ce3cba3a0ec755.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/6492-c953aa54e519f6e9.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/6943-aa4596ff3b4e8f24.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/8142-b42ba2e7e1110c60.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/8313-452d0c9d16dda5ad.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/84fbfe7f-f546bb29cd31cb45.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/9442-3e68de4bf8f4817f.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/9920-105ffbc4993671d9.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/_not-found/page-54c402bd72d440be.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/auth-callback/page-1d8cc7a3dcee48d2.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/dashboard/(mods)/agents/page-76685afe9f16f434.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/dashboard/(mods)/invoices/%5BinvoiceId%5D/page-92527410b855c1b0.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/dashboard/(mods)/invoices/page-b7cd8b9dcabe56ea.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/dashboard/(mods)/layout-ceb2e3bd6e50af6c.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/dashboard/layout-07f956e4fa042998.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/dashboard/maps/page-984e836fa9896e55.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/dashboard/page-18645ac825d9de2a.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/dashboard/payments/layout-3ff546ebcf23a704.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/dashboard/payments/page-508d2c62ff1c92f4.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/dashboard/pharmacies/add/page-4c38ed552488ce94.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/dashboard/pharmacies/page-f9e4bcbe504637b1.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/dashboard/settings/page-65f84007928a7dbc.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/dashboard/transactions/page-9306b21bf2f53ead.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/email/page-31f614d05d0b7aaf.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/find/%5BagentNumber%5D/page-8738b8c658cfb521.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/find/page-fcf6c970b53ac1a2.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/home/page-93bcf402f443c35c.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/layout-2c0b6bec07ddca3e.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/onboard/layout-32e67c19778c7ce8.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/onboard/page-8be874c4a950b354.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/onboard/success/page-33506294ee7379aa.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/page-9f147f1af71c2abb.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/pharmacy/%5Bslug%5D/page-eb18315214bd075b.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/pharmacy/dashboard/page-c5534117213cdcdc.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/pharmacy/layout-d8abe8138dad6bb6.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/transaction/layout-2504055babceaa86.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/transaction/lead/%5Bslug%5D/page-66b289d629bc5bf6.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/transaction/page-c5f360122254cb55.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/app/transaction/success/page-c7f76cffcd96a4de.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/cacb533c-091b8c81a6f8999c.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/framework-63a5d844a3662ade.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/main-734b969bcc03d978.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/main-app-f4aecac8fa7a2dba.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/pages/_app-36848a942c0aad0d.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/pages/_error-12c3c733710c5d52.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-a3aff8b008f2d928.js",revision:"VXvG8Pf0Ewtt3m6tHaCX1"},{url:"/_next/static/css/2297f6e104c5b182.css",revision:"2297f6e104c5b182"},{url:"/_next/static/media/c25915a061a39427-s.p.ttf",revision:"26f321c7058084dd241993d6b6a7650e"},{url:"/amarlab-logo.png",revision:"03f9b6c899cec4890c851ba64601b753"},{url:"/icons/icon-128x128.png",revision:"1718f9724b007969df774280fc58343d"},{url:"/icons/icon-144x144.png",revision:"cac917739fd706ae398743322a9ae92c"},{url:"/icons/icon-152x152.png",revision:"4eb3f32b8c86c7036e14989b84850675"},{url:"/icons/icon-192x192.png",revision:"feff461440e6a6c49abd94bfc8ef7e66"},{url:"/icons/icon-36x36.png",revision:"73ba7eb0353b77fbb77fc448e8014726"},{url:"/icons/icon-384x384.png",revision:"b31be3879c3a4ee86dfb2b6e1f98dd55"},{url:"/icons/icon-48x48.png",revision:"602c1d507c90b532173d9275d9b77e7e"},{url:"/icons/icon-512x512.png",revision:"371b7058f349b6634548ab19cdb436ee"},{url:"/icons/icon-72x72.png",revision:"5440902b8c3daf2ecf3273910baa7475"},{url:"/icons/icon-96x96.png",revision:"85409d8f1c56d1f8b964b200fddf203b"},{url:"/inkam-cover.png",revision:"2009c7cc3b2a651b00fe9c84159fef64"},{url:"/logo.png",revision:"d03eec575593b6d519256f1ebe834e24"},{url:"/manifest.json",revision:"fd5bb6cbfc08d9479765ef4d1e62b694"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/telegram_logo.svg",revision:"73f9a0ede528882146ea4bfe2ae935b5"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:t}})=>!(!e||t.startsWith("/api/auth/callback")||!t.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:t},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!t.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:t},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!t.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:t})=>t&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
