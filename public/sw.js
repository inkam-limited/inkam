if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>a(e,n),u={module:{uri:n},exports:t,require:r};s[n]=Promise.all(i.map((e=>u[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-3c9d0171"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/W75IFUCuvmi2IFBdxObMc/_buildManifest.js",revision:"3fdb58c9d2d29d9bdb62b61baa5d2af9"},{url:"/_next/static/W75IFUCuvmi2IFBdxObMc/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1406-dd8c262ee72975c7.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/2078-11fca2bb6093429f.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/3231-985db75ab34c83d7.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/3499-19a6ddc46511f0f1.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/3f621323-8ea4b5d939ceb68b.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/4155-9458a5741dea8aff.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/4311-1f2fbef4fae8247b.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/5750-fe48a69eee367098.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/59453ef0-5aefda065cc140f3.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/6492-6913f697c6b28355.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/6932-2385cf14167e9e0a.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/7158-3c694691f03a82d6.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/8142-7944c6a67935fd89.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/8313-fd61195c5619d928.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/84fbfe7f-96b4b79804e3105e.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/850-1697be113d3728bb.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/8728-1d489b82c9039970.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/9442-1d8cb571f9b24d87.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/9920-6f815b116978f117.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/9f8fe0c5-e51edde326ae6603.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/_not-found/page-0861ee89fc55b0a0.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/auth-callback/page-4d4cf3eff5704135.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/(mods)/agents/page-9c559fdb665e345d.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/(mods)/invoices/%5BinvoiceId%5D/page-f945c7e82fd8abe1.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/(mods)/invoices/page-ec690ea98ccaaf54.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/(mods)/lab-test/page-5d152baf2156f6a8.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/(mods)/layout-f1fefa5a72efd9ad.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/layout-5cb027beddc76102.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/maps/page-8cbdfac4e00b5a08.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/page-1016cecbc6d60a6e.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/payments/layout-920b8dddbee5e1cc.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/payments/loading-ef9d6906471c73bb.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/payments/page-f6f509ea9cf13144.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/pharmacies/add/page-5df61e2abc140bba.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/pharmacies/loading-6cf90f7c1729e3a2.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/pharmacies/page-9fe886a43f6e141c.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/settings/page-d6b9bb374796473c.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/transactions/loading-3b69584bc80114e6.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/dashboard/transactions/page-aae35aeeaf28f80a.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/email/page-811dc57dca564bc9.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/find/%5BagentNumber%5D/page-70bbf621f7d8b105.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/find/page-a1cc8de7c9cfc910.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/home/page-ba3cb13dd508029a.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/layout-089527daa6a8e8f3.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/onboard/layout-41ea021f14643ef9.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/onboard/page-e50d6ba22c9ff053.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/onboard/success/page-09d087dd3b216d6d.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/order/page-099c1a5b297ac406.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/page-069e00199c4bbf2c.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/pharmacy/%5Bslug%5D/edit/page-bf1c2eac29e26a0e.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/pharmacy/%5Bslug%5D/page-a5210ee4b05ebbdf.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/pharmacy/dashboard/page-299c2c12ae555f42.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/pharmacy/layout-2914eca263399c1d.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/testprice/page-3d6e96071e09c511.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/transaction/layout-7c16660c8fa34897.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/transaction/lead/%5Bslug%5D/page-0dbf6f1c429abc11.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/transaction/page-b6dac0f4da9234b7.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/app/transaction/success/page-090628774b9f94e4.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/cacb533c-151c904cb2c4c953.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/f2eb1761-bda6b35d8bb14db3.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/framework-20afca218c33ed8b.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/main-952572633efbbd49.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/main-app-5d426a58d5ef8393.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/pages/_app-b99d4a26d932078b.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/pages/_error-91ea6eaabdb8719c.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-9c4400aa6c07c24b.js",revision:"W75IFUCuvmi2IFBdxObMc"},{url:"/_next/static/css/943f8601b8711a91.css",revision:"943f8601b8711a91"},{url:"/_next/static/media/c25915a061a39427-s.p.ttf",revision:"26f321c7058084dd241993d6b6a7650e"},{url:"/amarlab-logo.png",revision:"4e075faf9fde170c1a513c3b3da274b6"},{url:"/icons/icon-128x128.png",revision:"1718f9724b007969df774280fc58343d"},{url:"/icons/icon-144x144.png",revision:"cac917739fd706ae398743322a9ae92c"},{url:"/icons/icon-152x152.png",revision:"4eb3f32b8c86c7036e14989b84850675"},{url:"/icons/icon-192x192.png",revision:"feff461440e6a6c49abd94bfc8ef7e66"},{url:"/icons/icon-36x36.png",revision:"73ba7eb0353b77fbb77fc448e8014726"},{url:"/icons/icon-384x384.png",revision:"b31be3879c3a4ee86dfb2b6e1f98dd55"},{url:"/icons/icon-48x48.png",revision:"602c1d507c90b532173d9275d9b77e7e"},{url:"/icons/icon-512x512.png",revision:"371b7058f349b6634548ab19cdb436ee"},{url:"/icons/icon-72x72.png",revision:"5440902b8c3daf2ecf3273910baa7475"},{url:"/icons/icon-96x96.png",revision:"85409d8f1c56d1f8b964b200fddf203b"},{url:"/inkam-cover.png",revision:"2009c7cc3b2a651b00fe9c84159fef64"},{url:"/logo.png",revision:"d03eec575593b6d519256f1ebe834e24"},{url:"/manifest.json",revision:"d04f9974933152c07e6db218b00f2624"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/telegram_logo.svg",revision:"73f9a0ede528882146ea4bfe2ae935b5"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
