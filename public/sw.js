if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let n={};const r=e=>a(e,t),d={module:{uri:t},exports:n,require:r};s[t]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(i(...e),n)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts("fallback-UgoxLBe3FhJbcAY1HSGyo.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/UgoxLBe3FhJbcAY1HSGyo/_buildManifest.js",revision:"748de9a9bd5588b3e07cdef1d70fd6f9"},{url:"/_next/static/UgoxLBe3FhJbcAY1HSGyo/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/10-db0ecc2d70855d1d.js",revision:"db0ecc2d70855d1d"},{url:"/_next/static/chunks/110-35a0ec6e334ac8f5.js",revision:"35a0ec6e334ac8f5"},{url:"/_next/static/chunks/1785-44bbd82c41b7844c.js",revision:"44bbd82c41b7844c"},{url:"/_next/static/chunks/1903-bf856f33458b0943.js",revision:"bf856f33458b0943"},{url:"/_next/static/chunks/269-5051754ea19010b4.js",revision:"5051754ea19010b4"},{url:"/_next/static/chunks/2744-cd92753e7ee863e0.js",revision:"cd92753e7ee863e0"},{url:"/_next/static/chunks/3722-5ef026f7b19fb611.js",revision:"5ef026f7b19fb611"},{url:"/_next/static/chunks/3738-01e07c9b3531b583.js",revision:"01e07c9b3531b583"},{url:"/_next/static/chunks/4364-fd738b9f42fc290b.js",revision:"fd738b9f42fc290b"},{url:"/_next/static/chunks/5558-56210118f28f3c43.js",revision:"56210118f28f3c43"},{url:"/_next/static/chunks/5585-8b88fa758c89f827.js",revision:"8b88fa758c89f827"},{url:"/_next/static/chunks/6154-07dd5eaf2687b9df.js",revision:"07dd5eaf2687b9df"},{url:"/_next/static/chunks/6279-649fb48b61ea52ea.js",revision:"649fb48b61ea52ea"},{url:"/_next/static/chunks/6455-7c1fe6a797ad20ff.js",revision:"7c1fe6a797ad20ff"},{url:"/_next/static/chunks/6886-236d7d78da7854e7.js",revision:"236d7d78da7854e7"},{url:"/_next/static/chunks/6c44d60f.70d1827823237c03.js",revision:"70d1827823237c03"},{url:"/_next/static/chunks/7097-627e4514b6786f2a.js",revision:"627e4514b6786f2a"},{url:"/_next/static/chunks/7229.4bf2c7aa2511fd50.js",revision:"4bf2c7aa2511fd50"},{url:"/_next/static/chunks/7918-7d2454d7800790c8.js",revision:"7d2454d7800790c8"},{url:"/_next/static/chunks/7945-d0ff3328500ac1ed.js",revision:"d0ff3328500ac1ed"},{url:"/_next/static/chunks/framework-c525a6bc1d165c2b.js",revision:"c525a6bc1d165c2b"},{url:"/_next/static/chunks/main-32f720e1a8336cac.js",revision:"32f720e1a8336cac"},{url:"/_next/static/chunks/pages/404-c8b8097d5c326ef9.js",revision:"c8b8097d5c326ef9"},{url:"/_next/static/chunks/pages/_app-2d962f4026aafecc.js",revision:"2d962f4026aafecc"},{url:"/_next/static/chunks/pages/_error-bd1da5a6907513b5.js",revision:"bd1da5a6907513b5"},{url:"/_next/static/chunks/pages/_offline-71d0706cf1b689b8.js",revision:"71d0706cf1b689b8"},{url:"/_next/static/chunks/pages/about-9f901002fce214bd.js",revision:"9f901002fce214bd"},{url:"/_next/static/chunks/pages/account-493e78a67b9cf235.js",revision:"493e78a67b9cf235"},{url:"/_next/static/chunks/pages/askforhelp-84f19b7e4911cfcf.js",revision:"84f19b7e4911cfcf"},{url:"/_next/static/chunks/pages/buttons-791b528639464680.js",revision:"791b528639464680"},{url:"/_next/static/chunks/pages/changePassword-02e54591ffabcea9.js",revision:"02e54591ffabcea9"},{url:"/_next/static/chunks/pages/forms-646794ab5d2fab54.js",revision:"646794ab5d2fab54"},{url:"/_next/static/chunks/pages/index-189a4d0c83cdca0e.js",revision:"189a4d0c83cdca0e"},{url:"/_next/static/chunks/pages/login-cbf318f8036c6dca.js",revision:"cbf318f8036c6dca"},{url:"/_next/static/chunks/pages/notices-22cf8edb041dbea3.js",revision:"22cf8edb041dbea3"},{url:"/_next/static/chunks/pages/notices/%5Bnotice_id%5D-0b00f6ea160278ea.js",revision:"0b00f6ea160278ea"},{url:"/_next/static/chunks/pages/notices/addNotice-4230c486860bb41d.js",revision:"4230c486860bb41d"},{url:"/_next/static/chunks/pages/session-94ce388676e09a4b.js",revision:"94ce388676e09a4b"},{url:"/_next/static/chunks/pages/session/studentsessionassign-35cc7909d5adbac0.js",revision:"35cc7909d5adbac0"},{url:"/_next/static/chunks/pages/session/updatesessionstudents-689bfd06ccc715aa.js",revision:"689bfd06ccc715aa"},{url:"/_next/static/chunks/pages/student-13d50f088ea61d7b.js",revision:"13d50f088ea61d7b"},{url:"/_next/static/chunks/pages/student/%5Bid%5D-0d20faef8e1ff76d.js",revision:"0d20faef8e1ff76d"},{url:"/_next/static/chunks/pages/student/pendingStudent-be3cdc7199297b4d.js",revision:"be3cdc7199297b4d"},{url:"/_next/static/chunks/pages/student/studentSignup-87ed9a6bd68fbf44.js",revision:"87ed9a6bd68fbf44"},{url:"/_next/static/chunks/pages/subject-8c280ff90fc51995.js",revision:"8c280ff90fc51995"},{url:"/_next/static/chunks/pages/subject/addSubject-101202b3b796ba18.js",revision:"101202b3b796ba18"},{url:"/_next/static/chunks/pages/subject/studentSubjectRegistration-28d62e01cd03b372.js",revision:"28d62e01cd03b372"},{url:"/_next/static/chunks/pages/table-d3384a7963d2771b.js",revision:"d3384a7963d2771b"},{url:"/_next/static/chunks/pages/teacher-7fe202db7d33ce30.js",revision:"7fe202db7d33ce30"},{url:"/_next/static/chunks/pages/teacher/Attendance-dda7aef546bea4db.js",revision:"dda7aef546bea4db"},{url:"/_next/static/chunks/pages/teacher/classRoom-7c4a8c21ce2f17b1.js",revision:"7c4a8c21ce2f17b1"},{url:"/_next/static/chunks/pages/teacher/routine-051df7949dc89b71.js",revision:"051df7949dc89b71"},{url:"/_next/static/chunks/pages/teacher/syllabus-e19906072c565081.js",revision:"e19906072c565081"},{url:"/_next/static/chunks/pages/user/Components/ClassScheduleModal-dae76aa9fcc3712a.js",revision:"dae76aa9fcc3712a"},{url:"/_next/static/chunks/pages/user/Components/Classes-62070f74193ea7c1.js",revision:"62070f74193ea7c1"},{url:"/_next/static/chunks/pages/user/Components/CreateClassModal-ecf12964b2c60947.js",revision:"ecf12964b2c60947"},{url:"/_next/static/chunks/pages/user/Components/TimePicker-7a973c6cc0a0452a.js",revision:"7a973c6cc0a0452a"},{url:"/_next/static/chunks/pages/user/Components/UpdateClassModal-415b7edf6cfed435.js",revision:"415b7edf6cfed435"},{url:"/_next/static/chunks/pages/user/student/classhistory-0e3527a80911d9bc.js",revision:"0e3527a80911d9bc"},{url:"/_next/static/chunks/pages/user/student/dashboard-eea173ad50dd6904.js",revision:"eea173ad50dd6904"},{url:"/_next/static/chunks/pages/user/student/studentClass-745457b75658fa1a.js",revision:"745457b75658fa1a"},{url:"/_next/static/chunks/pages/user/student/syllabus-735bc9b9256b7fcf.js",revision:"735bc9b9256b7fcf"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-cadda5937f376743.js",revision:"cadda5937f376743"},{url:"/_next/static/css/ad82bff5afa278dc.css",revision:"ad82bff5afa278dc"},{url:"/_next/static/css/e3e2d3af5f709a5a.css",revision:"e3e2d3af5f709a5a"},{url:"/_next/static/media/avatr.49bd42c6.png",revision:"a7a0ebf99f09f62daf1064fbfa7e37e6"},{url:"/_next/static/media/error_404.c7f545a2.png",revision:"6251a699b875e9071784a600b2cf5700"},{url:"/_next/static/media/logo_makaut.21e6796f.png",revision:"ee826b2589344f354bbd6aa8947f65f9"},{url:"/_next/static/media/offline.af5269e3.png",revision:"378db4f27c3f1b502532c2997b3cf99a"},{url:"/_next/static/media/sidebar-buynow-bg.7462d083.svg",revision:"b4d2299d7b4748836db9d45b36d98eb1"},{url:"/_next/static/media/u2.40484a79.jpg",revision:"25c857135a01f2180e2e36b929b376dc"},{url:"/_next/static/media/u3.505a0f97.jpg",revision:"b402b1fd7f0532c7968c986282643080"},{url:"/_next/static/media/u4.3612d7b6.jpg",revision:"096db945f7e311b792968846ac5230cc"},{url:"/_offline",revision:"UgoxLBe3FhJbcAY1HSGyo"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icon-192x192.png",revision:"f326ee7d81ee87205eaed76cd35d0f56"},{url:"/icon-256x256.png",revision:"2f5a2125413259b83d16be07a30f3592"},{url:"/icon-384x384.png",revision:"1f232eb88147b7efcef342040dfe70da"},{url:"/icon-512x512.png",revision:"142e4339418873ec145dbb9c3f10c4f8"},{url:"/manifest.json",revision:"b62fe1fc7b23c8d6e943d107ba5960b7"},{url:"/static/images/backgrounds/blog-bg-2x.jpg",revision:"7d9331783c0f1eb1d4864f581f25481a"},{url:"/static/images/backgrounds/blog-bg.jpg",revision:"0b0607236e665d714bd8e61625129e62"},{url:"/static/images/backgrounds/error_404.png",revision:"6251a699b875e9071784a600b2cf5700"},{url:"/static/images/backgrounds/login-bg.svg",revision:"32dbc377dcb9098e1f96b93c1eb2c90d"},{url:"/static/images/backgrounds/login-bg1.png",revision:"4751620f741b30c156c952a65963ba90"},{url:"/static/images/backgrounds/offline.png",revision:"378db4f27c3f1b502532c2997b3cf99a"},{url:"/static/images/backgrounds/post-img.jpg",revision:"578189842495afd8bc341196edf77db2"},{url:"/static/images/backgrounds/profilebg.jpg",revision:"cb9f30c7befbc4ffec13d2c048ef51fb"},{url:"/static/images/backgrounds/sidebar-buynow-bg.svg",revision:"b4d2299d7b4748836db9d45b36d98eb1"},{url:"/static/images/backgrounds/welcome-bg-2x-svg.svg",revision:"516e07c3276b7b4b39afb2fde03e50b8"},{url:"/static/images/backgrounds/welcome-bg-2x.svg",revision:"35ecc419445b89abf87baf266d938006"},{url:"/static/images/backgrounds/welcome-bg.png",revision:"30faeeef6d1a1785ef44b09c3030ab61"},{url:"/static/images/big/img5.jpg",revision:"8bb8262770a410a121ed954da4869459"},{url:"/static/images/big/img6.jpg",revision:"5623d9c279cd5ea79a12ccba01ecf73b"},{url:"/static/images/big/img7.jpg",revision:"fb3af0002e05d873e811b7fc42cccaa4"},{url:"/static/images/big/img8.jpg",revision:"cd39b3d15975a139f821be8f72bd5c9c"},{url:"/static/images/browser/chrome-logo.svg",revision:"358c009837d5a4c6016ca0c6d0925088"},{url:"/static/images/browser/edge-logo.svg",revision:"32a232ccec5852becfd0cb3a5112a1c3"},{url:"/static/images/browser/firefox-logo.svg",revision:"c5d05e7c1cff19eeb242f3836c89747a"},{url:"/static/images/browser/opera-logo.svg",revision:"07a77d0712a7da917ee0bb7b3ee69f89"},{url:"/static/images/browser/safari-logo.svg",revision:"18cbba7905cc9ea98678831c990dc5e8"},{url:"/static/images/browser/uc-logo.svg",revision:"b6d5df53efa5463850aa898d5e2ec016"},{url:"/static/images/logos/logo-dark.svg",revision:"e00808435cde9bab13f5dbd9875369b0"},{url:"/static/images/logos/logo-white.svg",revision:"b30a97aa445e44ae8af4028adcb961ea"},{url:"/static/images/products/product-detail-1.jpg",revision:"8f2a20eb2ce9ae9722822faaf4ea8950"},{url:"/static/images/products/product-detail-2.jpg",revision:"3c03d35bc2b14288ecc71e8a23f797db"},{url:"/static/images/products/product-detail-3.jpg",revision:"8aab025255411239339fc18d9f400e12"},{url:"/static/images/products/product-detail-4.jpg",revision:"7492507ff537bb21502b9aa757621f29"},{url:"/static/images/products/s1.jpg",revision:"a2285501c5c6c66be7298cb281b85c84"},{url:"/static/images/products/s10.jpg",revision:"d64d61464848061b2129d4ba0aa9d95e"},{url:"/static/images/products/s11.jpg",revision:"b587265a78c8bd4de4e435a79eb194e0"},{url:"/static/images/products/s12.jpg",revision:"a263750bd44755393a659db110f8f360"},{url:"/static/images/products/s2.jpg",revision:"d90017142f8de5b0ffbd0d6b63627031"},{url:"/static/images/products/s3.jpg",revision:"ad576f7f908ec6819581643f64249fcb"},{url:"/static/images/products/s4.jpg",revision:"395f7a511ecde338c48b0c0528b2240c"},{url:"/static/images/products/s5.jpg",revision:"2367744a5ee39180072c5184d5e88ad5"},{url:"/static/images/products/s6.jpg",revision:"84494e11b337d6883239aab3a33bc8e8"},{url:"/static/images/products/s7.jpg",revision:"e886835f0c3abcede8c3806c5978cae7"},{url:"/static/images/products/s8.jpg",revision:"54800ad1ce30714eadd53a3eeadc4df3"},{url:"/static/images/products/s9.jpg",revision:"c4084a7c78c7f37f0d307af47b26f53e"},{url:"/static/images/users/1.jpg",revision:"6fcf2e799b7303a7cd6424f5cb92ab5f"},{url:"/static/images/users/2.jpg",revision:"dfd3adba3caf6340cf0158b8c69bce60"},{url:"/static/images/users/3.jpg",revision:"9e422db71bc9c018baf9419e74bbc9d7"},{url:"/static/images/users/4.jpg",revision:"26cc9c9116ca5aee73575614c3c7a309"},{url:"/static/images/users/5.jpg",revision:"1f9d62635df4b116d403676bb1736f83"},{url:"/static/images/users/6.jpg",revision:"6ace561d5ba6ca1c5b1c750fdbbc7a31"},{url:"/static/images/users/7.jpg",revision:"ee55ebabee7665d963c09ac18f89993b"},{url:"/static/images/users/8.jpg",revision:"912ffc1cc373c1cc15da051ab0665b85"},{url:"/static/images/users/avatr.png",revision:"a7a0ebf99f09f62daf1064fbfa7e37e6"},{url:"/static/images/users/user.jpg",revision:"8aa9f23c3a496e73ae72aef32b4e9fbc"},{url:"/static/images/users/user2.jpg",revision:"483b424abbda54f14d63a4ec47559890"},{url:"/static/images/users/userAvtar2.png",revision:"e11cb8672eca2f58deff7538d989265b"},{url:"/static/images/users/user_avtar.png",revision:"34c3332cb8eb6c448bb4544cd7df4bcd"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
