if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let r={};const n=e=>a(e,t),d={module:{uri:t},exports:r,require:n};s[t]=Promise.all(i.map((e=>d[e]||n(e)))).then((e=>(c(...e),r)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts("fallback-7K6is9XkgIXqRzmeyfilr.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/7K6is9XkgIXqRzmeyfilr/_buildManifest.js",revision:"06b7ad8aea5edafbc5354e308928f308"},{url:"/_next/static/7K6is9XkgIXqRzmeyfilr/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/154-e3bd46b5ca34f199.js",revision:"e3bd46b5ca34f199"},{url:"/_next/static/chunks/229.0bb936a67a48d471.js",revision:"0bb936a67a48d471"},{url:"/_next/static/chunks/46-1ae8b7bcb23a1c8b.js",revision:"1ae8b7bcb23a1c8b"},{url:"/_next/static/chunks/474-8f5ae81b2832b337.js",revision:"8f5ae81b2832b337"},{url:"/_next/static/chunks/484-96151d1686194c71.js",revision:"96151d1686194c71"},{url:"/_next/static/chunks/540-9327a636ff8a35d3.js",revision:"9327a636ff8a35d3"},{url:"/_next/static/chunks/550-751d5dfb4a1cd559.js",revision:"751d5dfb4a1cd559"},{url:"/_next/static/chunks/6c44d60f.f407d592ccbf64d1.js",revision:"f407d592ccbf64d1"},{url:"/_next/static/chunks/822-8202dea8d61baf47.js",revision:"8202dea8d61baf47"},{url:"/_next/static/chunks/886-19b73fa63cb7bbb7.js",revision:"19b73fa63cb7bbb7"},{url:"/_next/static/chunks/890-0f9f1bcf32f31f3e.js",revision:"0f9f1bcf32f31f3e"},{url:"/_next/static/chunks/903-ffe54a08f5945d4d.js",revision:"ffe54a08f5945d4d"},{url:"/_next/static/chunks/framework-6514bde62ca490d2.js",revision:"6514bde62ca490d2"},{url:"/_next/static/chunks/main-b5a6e41db414a42b.js",revision:"b5a6e41db414a42b"},{url:"/_next/static/chunks/pages/404-49ed7bcec0109665.js",revision:"49ed7bcec0109665"},{url:"/_next/static/chunks/pages/_app-0216db33bc13360c.js",revision:"0216db33bc13360c"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/_offline-a6a7c5f61146772b.js",revision:"a6a7c5f61146772b"},{url:"/_next/static/chunks/pages/about-5d00062535a50787.js",revision:"5d00062535a50787"},{url:"/_next/static/chunks/pages/account-db122c6e9f1e972a.js",revision:"db122c6e9f1e972a"},{url:"/_next/static/chunks/pages/buttons-842f15336499ed11.js",revision:"842f15336499ed11"},{url:"/_next/static/chunks/pages/changePassword-fee85043c98ca862.js",revision:"fee85043c98ca862"},{url:"/_next/static/chunks/pages/forms-c8d96de6cff4ce83.js",revision:"c8d96de6cff4ce83"},{url:"/_next/static/chunks/pages/index-23ea35ee6306df0c.js",revision:"23ea35ee6306df0c"},{url:"/_next/static/chunks/pages/login-a34a9436ae25858b.js",revision:"a34a9436ae25858b"},{url:"/_next/static/chunks/pages/notices-43c31b145f7f77fd.js",revision:"43c31b145f7f77fd"},{url:"/_next/static/chunks/pages/notices/%5Bnotice_id%5D-6b4e9d9c87b5c544.js",revision:"6b4e9d9c87b5c544"},{url:"/_next/static/chunks/pages/notices/addNotice-f4a8382673ee60ca.js",revision:"f4a8382673ee60ca"},{url:"/_next/static/chunks/pages/student-c196e7a76b83ee59.js",revision:"c196e7a76b83ee59"},{url:"/_next/static/chunks/pages/student/%5Bid%5D-a35ba7ea4ab7a416.js",revision:"a35ba7ea4ab7a416"},{url:"/_next/static/chunks/pages/student/pendingStudent-b4b11b5f6f41555e.js",revision:"b4b11b5f6f41555e"},{url:"/_next/static/chunks/pages/student/studentSignup-c80ef2c691c85c61.js",revision:"c80ef2c691c85c61"},{url:"/_next/static/chunks/pages/subject-71a04bfd731410ca.js",revision:"71a04bfd731410ca"},{url:"/_next/static/chunks/pages/subject/addSubject-3ca5d37698ce20ae.js",revision:"3ca5d37698ce20ae"},{url:"/_next/static/chunks/pages/table-eb2d03bd49c327e0.js",revision:"eb2d03bd49c327e0"},{url:"/_next/static/chunks/pages/teacher-b8e7f74941acb847.js",revision:"b8e7f74941acb847"},{url:"/_next/static/chunks/pages/teacher/subject-90a5b04d2fe3b41d.js",revision:"90a5b04d2fe3b41d"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-aeff8b4554afa969.js",revision:"aeff8b4554afa969"},{url:"/_next/static/css/79f335ddee460a1e.css",revision:"79f335ddee460a1e"},{url:"/_next/static/media/avatr.49bd42c6.png",revision:"a7a0ebf99f09f62daf1064fbfa7e37e6"},{url:"/_next/static/media/error_404.c7f545a2.png",revision:"6251a699b875e9071784a600b2cf5700"},{url:"/_next/static/media/logo_makaut.21e6796f.png",revision:"ee826b2589344f354bbd6aa8947f65f9"},{url:"/_next/static/media/offline.af5269e3.png",revision:"378db4f27c3f1b502532c2997b3cf99a"},{url:"/_next/static/media/sidebar-buynow-bg.7462d083.svg",revision:"b4d2299d7b4748836db9d45b36d98eb1"},{url:"/_next/static/media/u2.40484a79.jpg",revision:"25c857135a01f2180e2e36b929b376dc"},{url:"/_next/static/media/u3.505a0f97.jpg",revision:"b402b1fd7f0532c7968c986282643080"},{url:"/_next/static/media/u4.3612d7b6.jpg",revision:"096db945f7e311b792968846ac5230cc"},{url:"/_offline",revision:"7K6is9XkgIXqRzmeyfilr"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icon-192x192.png",revision:"f326ee7d81ee87205eaed76cd35d0f56"},{url:"/icon-256x256.png",revision:"2f5a2125413259b83d16be07a30f3592"},{url:"/icon-384x384.png",revision:"1f232eb88147b7efcef342040dfe70da"},{url:"/icon-512x512.png",revision:"142e4339418873ec145dbb9c3f10c4f8"},{url:"/manifest.json",revision:"d167dfb1ee4d01c0bd62a0b7dc200bb4"},{url:"/static/images/backgrounds/blog-bg-2x.jpg",revision:"7d9331783c0f1eb1d4864f581f25481a"},{url:"/static/images/backgrounds/blog-bg.jpg",revision:"0b0607236e665d714bd8e61625129e62"},{url:"/static/images/backgrounds/login-bg.svg",revision:"32dbc377dcb9098e1f96b93c1eb2c90d"},{url:"/static/images/backgrounds/login-bg1.png",revision:"4751620f741b30c156c952a65963ba90"},{url:"/static/images/backgrounds/post-img.jpg",revision:"578189842495afd8bc341196edf77db2"},{url:"/static/images/backgrounds/profilebg.jpg",revision:"cb9f30c7befbc4ffec13d2c048ef51fb"},{url:"/static/images/backgrounds/sidebar-buynow-bg.svg",revision:"b4d2299d7b4748836db9d45b36d98eb1"},{url:"/static/images/backgrounds/welcome-bg-2x-svg.svg",revision:"516e07c3276b7b4b39afb2fde03e50b8"},{url:"/static/images/backgrounds/welcome-bg-2x.svg",revision:"35ecc419445b89abf87baf266d938006"},{url:"/static/images/backgrounds/welcome-bg.png",revision:"30faeeef6d1a1785ef44b09c3030ab61"},{url:"/static/images/big/img5.jpg",revision:"8bb8262770a410a121ed954da4869459"},{url:"/static/images/big/img6.jpg",revision:"5623d9c279cd5ea79a12ccba01ecf73b"},{url:"/static/images/big/img7.jpg",revision:"fb3af0002e05d873e811b7fc42cccaa4"},{url:"/static/images/big/img8.jpg",revision:"cd39b3d15975a139f821be8f72bd5c9c"},{url:"/static/images/browser/chrome-logo.svg",revision:"358c009837d5a4c6016ca0c6d0925088"},{url:"/static/images/browser/edge-logo.svg",revision:"32a232ccec5852becfd0cb3a5112a1c3"},{url:"/static/images/browser/firefox-logo.svg",revision:"c5d05e7c1cff19eeb242f3836c89747a"},{url:"/static/images/browser/opera-logo.svg",revision:"07a77d0712a7da917ee0bb7b3ee69f89"},{url:"/static/images/browser/safari-logo.svg",revision:"18cbba7905cc9ea98678831c990dc5e8"},{url:"/static/images/browser/uc-logo.svg",revision:"b6d5df53efa5463850aa898d5e2ec016"},{url:"/static/images/logos/logo-dark.svg",revision:"e00808435cde9bab13f5dbd9875369b0"},{url:"/static/images/logos/logo-white.svg",revision:"b30a97aa445e44ae8af4028adcb961ea"},{url:"/static/images/products/product-detail-1.jpg",revision:"8f2a20eb2ce9ae9722822faaf4ea8950"},{url:"/static/images/products/product-detail-2.jpg",revision:"3c03d35bc2b14288ecc71e8a23f797db"},{url:"/static/images/products/product-detail-3.jpg",revision:"8aab025255411239339fc18d9f400e12"},{url:"/static/images/products/product-detail-4.jpg",revision:"7492507ff537bb21502b9aa757621f29"},{url:"/static/images/products/s1.jpg",revision:"a2285501c5c6c66be7298cb281b85c84"},{url:"/static/images/products/s10.jpg",revision:"d64d61464848061b2129d4ba0aa9d95e"},{url:"/static/images/products/s11.jpg",revision:"b587265a78c8bd4de4e435a79eb194e0"},{url:"/static/images/products/s12.jpg",revision:"a263750bd44755393a659db110f8f360"},{url:"/static/images/products/s2.jpg",revision:"d90017142f8de5b0ffbd0d6b63627031"},{url:"/static/images/products/s3.jpg",revision:"ad576f7f908ec6819581643f64249fcb"},{url:"/static/images/products/s4.jpg",revision:"395f7a511ecde338c48b0c0528b2240c"},{url:"/static/images/products/s5.jpg",revision:"2367744a5ee39180072c5184d5e88ad5"},{url:"/static/images/products/s6.jpg",revision:"84494e11b337d6883239aab3a33bc8e8"},{url:"/static/images/products/s7.jpg",revision:"e886835f0c3abcede8c3806c5978cae7"},{url:"/static/images/products/s8.jpg",revision:"54800ad1ce30714eadd53a3eeadc4df3"},{url:"/static/images/products/s9.jpg",revision:"c4084a7c78c7f37f0d307af47b26f53e"},{url:"/static/images/users/1.jpg",revision:"6fcf2e799b7303a7cd6424f5cb92ab5f"},{url:"/static/images/users/2.jpg",revision:"dfd3adba3caf6340cf0158b8c69bce60"},{url:"/static/images/users/3.jpg",revision:"9e422db71bc9c018baf9419e74bbc9d7"},{url:"/static/images/users/4.jpg",revision:"26cc9c9116ca5aee73575614c3c7a309"},{url:"/static/images/users/5.jpg",revision:"1f9d62635df4b116d403676bb1736f83"},{url:"/static/images/users/6.jpg",revision:"6ace561d5ba6ca1c5b1c750fdbbc7a31"},{url:"/static/images/users/7.jpg",revision:"ee55ebabee7665d963c09ac18f89993b"},{url:"/static/images/users/8.jpg",revision:"912ffc1cc373c1cc15da051ab0665b85"},{url:"/static/images/users/user.jpg",revision:"8aa9f23c3a496e73ae72aef32b4e9fbc"},{url:"/static/images/users/user2.jpg",revision:"483b424abbda54f14d63a4ec47559890"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
