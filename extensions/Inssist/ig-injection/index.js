!function(){function t(t,e,n){Object.defineProperty(t,e,{get:n,enumerable:!0})}var e={get:function(t,e){const n=localStorage.getItem(t);if(null==n)return e;if("true"===n)return!0;if("false"===n)return!1;if(n.startsWith("[")||n.startsWith("{"))return JSON.parse(n);const o=Number(n);if(!Number.isNaN(o))return o;return n},set:function(t,e){try{"string"==typeof e?localStorage.setItem(t,e):localStorage.setItem(t,JSON.stringify(e))}catch(n){console.error("local-storage-json: failed to set",{key:t,value:e,details:n})}},has:function(t){return t in localStorage},remove:function(t){localStorage.removeItem(t)}};function n(t){try{return JSON.parse(t)}catch(t){return null}}var o={createName:function(t,e){return`${t}|${JSON.stringify(e)}`},getName:i,getParams:function(){return n(window.self.name.split("|")[1])||{}},isIframe:function(t=null){return window.self!==parent&&(!t||i()===t)}};function i(){return window.self.name.split("|")[0]||null}async function r(){a()||await new Promise((t=>{document.addEventListener("readystatechange",(function e(){a()&&(document.removeEventListener("readystatechange",e),t())}))}))}function a(){return"interactive"===document.readyState||"complete"===document.readyState}var s=document.documentElement;async function l(t,e=null){let n,o;return"number"==typeof e?(n=e,o=100):e?(n=e.timeout||3e4,o=e.frequency||100):(n=3e4,o=100),new Promise(((e,i)=>{const r=t();if(r)return void e(r);const a=setInterval((()=>{const n=t();n&&(clearInterval(a),e(n))}),o);setTimeout((()=>{clearInterval(a),e(null)}),n)}))}function d(t){return Array.isArray(t)?t:[t]}function c(...t){const e=function(t,...e){let n=0;return t.join("###").split(",").join("\n,\n").split("{").join("\n{").split("\n").map((t=>{if(!t.includes("###"))return t;const o=d(e[n]).map((e=>t.split("###").join(e))).join(",\n");return n+=1,o})).join("\n")}(...t);document.head.insertAdjacentHTML("afterbegin",e)}var p=Object.assign((function(t,e=!1){0===u.length&&(g=new MutationObserver((t=>{for(const e of u){if(g.disconnect(),e(t),!g)return;g.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0})}})),g.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0}));u.push(t),e&&t()}),{off:function(t){const e=u.indexOf(t);if(-1===e)return;u.splice(e,1),0===u.length&&(g.disconnect(),g=null)}});const u=[];let g;function f(t,e=document){t=d(t);for(const n of t){const t=e.querySelector(n);if(t)return t}return null}function h(t,e=document){t=d(t);for(const n of t){const t=e.querySelectorAll(n);if(t.length)return Array.from(t)}return[]}var m={},b={},v={},y={},x=1;y={nextValue:function(){return(x=(9301*x+49297)%233280)/233280},seed:function(t){x=t}};var w,_,k,P="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function S(){k=!1}function C(t){if(t){if(t!==w){if(t.length!==P.length)throw new Error("Custom alphabet for shortid must be "+P.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter((function(t,e,n){return e!==n.lastIndexOf(t)}));if(e.length)throw new Error("Custom alphabet for shortid must be "+P.length+" unique characters. These characters were not unique: "+e.join(", "));w=t,S()}}else w!==P&&(w=P,S())}function E(){return k||(k=function(){w||C(P);for(var t,e=w.split(""),n=[],o=y.nextValue();e.length>0;)o=y.nextValue(),t=Math.floor(o*e.length),n.push(e.splice(t,1)[0]);return n.join("")}())}v={get:function(){return w||P},characters:function(t){return C(t),w},seed:function(t){y.seed(t),_!==t&&(S(),_=t)},lookup:function(t){return E()[t]},shuffled:E};var T="object"==typeof window&&(window.crypto||window.msCrypto),A=T&&T.getRandomValues?function(t){return T.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],n=0;n<t;n++)e.push(Math.floor(256*Math.random()));return e},$=function(t,e,n){for(var o=(2<<Math.log(e.length-1)/Math.LN2)-1,i=-~(1.6*o*n/e.length),r="";;)for(var a=t(i),s=i;s--;)if((r+=e[a[s]&o]||"").length===+n)return r};var L,R,F=function(t){for(var e,n=0,o="";!e;)o+=$(A,v.get(),1),e=t<Math.pow(16,n+1),n++;return o};var M=function(t){var e="",n=Math.floor(.001*(Date.now()-1567752802062));return n===R?L++:(L=0,R=n),e+=F(7),e+=F(t),L>0&&(e+=F(L)),e+=F(n)};var z,I=function(t){return!(!t||"string"!=typeof t||t.length<6)&&!new RegExp("[^"+v.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t)},D=!1;var B=(D||(D=!0,z={},z=0),z||0);function O(){return M(B)}var H=O;(b=O).generate=H;var j=function(t){return v.seed(t),b};b.seed=j;var N=function(t){return B=t,b};b.worker=N;var V=function(t){return void 0!==t&&v.characters(t),v.shuffled()};b.characters=V;var W=I;b.isValid=W,m=b;var U={on:function(t,e){J();(Y[t]||(Y[t]=[])).push(e)},off:function(t,e){const n=Y[t];if(!n)return;for(;;){const t=n.findIndex((t=>t===e));if(-1===t)break;n.splice(t,1)}},send:function(t,...e){let n;const o=e[e.length-1];"function"==typeof o?(n=o,e=e.slice(0,-1)):n=null;return new Promise((o=>{chrome.runtime.sendMessage({[X]:t,[G]:e},(t=>{chrome.runtime.lastError||t!==q&&(n&&n(t),o(t))}))}))}};const q="__chromeBus.EMPTY_RESPONSE",Y={},X="__chromeBus.name",G="__chromeBus.args";function J(){const t=J;t.init||(t.init=!0,chrome.runtime.onMessage.addListener(((t,e,n)=>{const o=t["__chromeBus.name"];if(!o)return!1;const i=t["__chromeBus.args"]||[],r=Y[o]||[];return 0===r.length?(n(q),!0):((async()=>{const t=await Promise.all(r.map((t=>t(...i)))),e=t[t.length-1];n(e)})(),!!n)})))}var K={init:function(){U.on("iframe-bus",((t,...e)=>rt(t,...e))),nt("chrome-bus",((t,...e)=>U.send(t,...e)))},on:nt,once:ot,off:it,send:rt,wait:async function(t){return await new Promise((e=>{ot(t,e)}))}};const Z="__iframeBus.name",Q="__iframeBus.args",tt="__iframeBus.callbackId",et=parent!==window;function nt(t,e){const n=at(t),o=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});o[t]=async o=>{if(o.data["__iframeBus.name"]===n){const n=o.data["__iframeBus.args"]||[],i=o.data["__iframeBus.callbackId"]||null,r=await e(...n);i&&rt(`${t}:response-${i}`,r)}},window.addEventListener("message",o[t])}function ot(t,e){nt(t,(function n(...o){return it(t,n),e(...o)}))}function it(t,e){const n=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});window.removeEventListener("message",n[t])}async function rt(t,...e){let n;const o=e[e.length-1];"function"==typeof o?(n=o,e=e.slice(0,-1)):n=null;const i=t.includes(":response-"),r=at(t),a=i?null:m.generate();if(et?parent.postMessage({[Z]:r,[Q]:e,[tt]:a},"*"):h("iframe").forEach((t=>{t.contentWindow.postMessage({[Z]:r,[Q]:e,[tt]:a},"*")})),!i)return new Promise((e=>{const o=i=>{n&&n(i),it(`${t}:response-${a}`,o),e(i)};nt(`${t}:response-${a}`,o)}))}function at(t){return`iframe-bus.${t}`}var st={getConfig:function t(){const e=t;if(!e.config){const t=o.getParams();e.config=t.fusionConfig}return e.config}};async function lt(t){await r();const e=window.inssist.moduleInterceptor,n=await async function(t){return await l(t,3e3)}((()=>e.getModule(t)));return n||console.error(`ig: failed to require ${t}`),n}function dt(t,e=null){try{const n=t();return n instanceof Promise?new Promise(((t,o)=>{n.then(t).catch((n=>{n&&console.error(n),t(e)}))})):n}catch(t){return console.error(t),e}}var ct={init:async function(){(async function(){pt=await K.send("dm.ghost-mode:is-enabled"),K.on("dm.ghost-mode:toggled",(t=>{pt=t}))})(),async function(){const t=await lt("store"),e=await lt("dm-state-proxy"),n=await lt("dm-thread-actions"),o=dt((()=>n.markSeen),null);if(!(t&&e&&n&&o))return void K.send("dm.ghost-mode:failed",{store:!!t,stateProxy:!!e,threadActions:!!n,markSeen:!!o});n.markSeen=(...i)=>{var r;const a=null===(r=i[2])||void 0===r?void 0:r.ignoreGhostMode;if(pt&&!a){const n=i[0],o=t.getState();return!e.getThreadSeenByViewer(o,n)&&K.send("dm.ghost-mode:increment-trial-usage",2),()=>{}}return o.call(n,...i)}}()}};let pt=!1;var ut={init:async function(){const t=st.getConfig().dmSelectors,e=await lt("store");if(!e)return;const n=Symbol("handled");p((()=>{const o=h('[id^="message-"]').filter((t=>!t[n]));if(0===o.length)return;const i=JSON.parse(JSON.stringify(e.getState()));o.forEach((e=>{var o;e[n]=!0;const r=f(t.general.messageBody,e);if(!r)return;const a=e.id.replace("message-",""),s=i.direct.messages[a];if("raven_media"!==s.item_type)return;localStorage.logRavenMessages&&console.warn({ravenMessage:s});const l=(null==s?void 0:s.raven_media)||(null==s||null===(o=s.visual_media)||void 0===o?void 0:o.media);if(l)if(l.video_versions){const t=l.video_versions[0].url;r.outerHTML=`\n          <a class="raven-media-link" href="${t}" target="_blank">\n            PEEK AT VIDEO\n          </a>\n        `}else if(l.image_versions2){const t=l.image_versions2.candidates[0].url;r.outerHTML=`\n          <a class="raven-media-link" href="${t}" target="_blank">\n            PEEK AT PHOTO\n          </a>\n        `}else{var d;const t=null==s||null===(d=s.visual_media)||void 0===d?void 0:d.replay_expiring_at_us;t&&new Date(t/1e3).getTime()<Date.now()?r.innerHTML='\n            <div class="raven-media-unavailable">\n              This message has expired or has been viewed already.\n            </div>\n          ':r.innerHTML='\n            <div class="raven-media-unavailable">\n              This message can not be viewed or is no longer available.\n            </div>\n          '}}))})),c`
    <style>
      .raven-media-link {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 600;
        font-size: 13px;
        color: #1BA2F9 !important;
      }

      .raven-media-link::before {
        content: '';
        width: 0;
        height: 0;
        flex-shrink: 0;
        margin-right: 3px;
        border: 5px solid transparent;
        border-radius: 1px;
        border-left-width: 7px;
        border-left-color: currentColor;
      }

      .raven-media-unavailable {
        line-height: 1.4;
      }
    </style>
  `}};var gt={init:function(){(function(){ht=e.get(ft,{});for(const t in ht){for(const e in ht[t])0===ht[t][e].trim().length&&delete ht[t][e];0===Object.keys(ht[t]).length&&delete ht[t]}})(),async function(){const t=st.getConfig().dmSelectors,n=await lt("store"),o=await lt("add-dispatch-listener");if(!n||!o)return;let i;try{i=n.getState().users.viewerId}catch(t){return void console.error("dm injection input restore controller:","failed to get viewerId")}if(!i)return;const r=ht[i]||(ht[i]={});o((e=>{if("NAVIGATION_LOCATION_CHANGED"!==e.type)return;if(!e.nextPath.startsWith("/direct/t/"))return;const n=e.nextPath.replace("/direct/t/","");if(!n)return;const o=r[n];o&&setTimeout((()=>{const e=f(t.general.textarea);e&&(e.focus(),document.execCommand("insertText",!1,o))}))}));let a=null;p((()=>{const o=f(t.general.textarea);if(!o)return;const i=n.getState().navigation.route.split("/direct/t/")[1];(r[i]||"")!==o.value&&(r[i]=o.value,clearTimeout(a),a=setTimeout((()=>{e.set(ft,ht)}),300))}))}()}};const ft="inssist.dm.input-restore-texts";let ht={};async function mt(t,...e){return new Promise((n=>{t(...e,n)}))}var bt={unique:function(t){return Array.from(new Set(t))},gaussian:yt,gaussianInt:function(t,e){return Math.round(t+yt()*(e-t))},forceLayout:function(){document.body.getBoundingClientRect()},hashCode:xt,pseudorandom:function(t){return 16807*Math.max(Math.abs(xt(t)),1)%2147483647/2147483646},rotate:function(t,e=1){const n="slashed.io";let o="";return Array.from(t).forEach(((t,i)=>{const r=n[i%n.length].charCodeAt(),a=(t.charCodeAt()+e*r+65536)%65536;o+=String.fromCharCode(a)})),o},getUnixTime:function(){return Math.round(Date.now()/1e3)},saveFile:function(t,e){let n;n=e instanceof Blob?e:new Blob([e]);const o=document.createElement("a");o.setAttribute("download",t),o.setAttribute("href",URL.createObjectURL(n)),document.body.appendChild(o),o.click(),o.remove()},takeBetween:function(t,e,n){const o=t.split(e)[1];if(!o)return null;return o.split(n)[0]||null},takeAllBetween:function(t,e,n){return t.split(e).slice(1).map((t=>t.split(n)[0]))},capitalize:function(t){return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()},createWindow:async function(t,{width:e=600,height:n=700,name:o="utils-window"}={}){const i=Math.round(screen.width/2-e/2),r=`status,scrollbars,toolbar,top=${Math.round(screen.height/2-n/2)},left=${i},width=${e},height=${n}`,a=await mt(chrome.windows.getAll),s=window.open(t,o,r);await wt(500);const l=(await mt(chrome.windows.getAll)).find((t=>!a.find((e=>t.id===e.id))));l&&await mt(chrome.windows.update,l.id,{focused:!0});return vt.push(s),s},waitForWindowClose:async function(t){return new Promise((e=>{const n=setInterval((()=>{t.closed&&(clearInterval(n),e())}),100)}))},closeCreatedWindows:function(){vt.forEach((t=>{t.close()})),vt.length=0},getIntegralNumberPart:function(t){const e=Math.abs(t);return t>0?Math.floor(e):-Math.floor(e)},getFractalNumberPart:function(t){const e=Math.abs(t);return Number((e-Math.floor(e)).toFixed(12))}};const vt=[];function yt(){let t=0;for(let e=0;e<6;e+=1)t+=Math.random();return t/6}function xt(t){if(!t)return 0;let e,n,o=0;if(0===t.length)return o;for(e=0;e<t.length;e++)n=t.charCodeAt(e),o=(o<<5)-o+n,o|=0;return o}async function wt(t){if("number"==typeof t&&Number.isFinite(t)){const e=t;await new Promise((t=>setTimeout(t,e)))}else{if(!t||"object"!=typeof t||t.constructor!==Object)throw new Error("unexpected sleep function argument: number or object expected, got",t);{const{min:e,max:n}=t.longBreak&&Math.random()<1-Math.pow(.5,1/t.longBreak.every)?{min:0,max:0,...t.longBreak}:{min:0,max:0,...t},o=n-e,i=e+bt.gaussianInt(0,o);if(0===i)return;await new Promise((t=>setTimeout(t,i)))}}}function _t(t,e){return kt(e)||(e=JSON.stringify(e)),`${encodeURIComponent(t)}=${encodeURIComponent(e)}`}function kt(t){return"string"==typeof t||"number"==typeof t||"boolean"==typeof t}function Pt(t,e={}){const n=function(t){return Object.keys(t).map((e=>{const n=t[e];return kt(n)?_t(e,n):Array.isArray(n)?n.map((t=>_t(e,t))).join("&"):null})).filter(Boolean).join("&").replace(/%5B/g,"[").replace(/%5D/g,"]")}(e);return n?`${t}?${n}`:t}var St={};const Ct=1e3,Et=36e5,Tt=864e5;t(St,"MONTH",(function(){return 26784e5})),t(St,"WEEK",(function(){return 6048e5})),t(St,"DAY",(function(){return Tt})),t(St,"HOUR",(function(){return Et})),t(St,"MINUTE",(function(){return 6e4})),t(St,"SECOND",(function(){return Ct}));var At={fetch:zt,fetchText:async function(...t){const e=await zt(...t);return await e.text()},fetchJson:async function(...t){const e=await zt(...t);return await e.json()},getCache:function(){return $t},cleanCache:function(){It("cleaning fetcher cache"),$t=[]},ignoreCache:function(t=1){Lt+=t},isIgnoreCache:function(){return Lt>0}};let $t=[],Lt=0;const Rt=2e4,Ft=864e5,Mt=!1;async function zt(t,e={},n=Rt){return new Promise(((o,i)=>{(async()=>{let r=setTimeout((()=>{r&&(r=null,i({message:"Timed out"}))}),n);try{const n=await async function(t,e){if(It(`fetching ${t}`),(e=e||{}).method=e.method||"GET",e.method&&"GET"!==e.method)return fetch(t,e);if(Lt<=0){const e=Date.now();$t=$t.filter((t=>e-t.on<Ft));const n=$t.find((e=>e.url===t));if(n)return It("  fetch cache hit"),n.res.clone()}else It("  ignoring fetch cache");Lt>0&&Lt--;const n=await fetch(t,e);return $t.push({url:t,on:Date.now(),res:n.clone()}),n}(t,{credentials:"include",...e});if(!r)return;if(clearTimeout(r),r=null,n.ok)return void o(n);if(400!==n.status)return void i({message:String(n.status)});try{const t=await n.text();i({message:String(n.status),body:t})}catch(t){i({message:String(n.status),body:null})}}catch(t){if(!r)return;clearTimeout(r),r=null,i(t)}})()}))}function It(t){Mt&&console.log(`%c${t}`,"color: #00ec91")}function Dt(){const t=Dt;return t.init||(t.init=!0,c`
      <style>
        .spinner-icon {
          width: 32px;
          height: 32px;
          animation: spinner-icon--spin 1.2s steps(12) infinite;
        }

        @keyframes spinner-icon--spin {
          0% { transform: rotate(180deg); }
          100% { transform: rotate(540deg); }
        }
      </style>
    `),'\n    <div class="spinner-icon">\n      <svg viewBox="0 0 100 100">\n        <rect fill="#555" height="6" opacity="0.083" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.166" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.25" rx="3" ry="3" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.33" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.41" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.58" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.66" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.83" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.91" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"/>\n      </svg>\n    </div>\n  '}var Bt={init:async function(){Ot=st.getConfig().dmSelectors,K.on("dm.set-filters",jt),p((()=>{const t=f(Ot.leftPanel.threadList);if(!t)return;const e=""!==t.innerText;Ht.classList.toggle("dm--no-threads",!e)})),function(){const t=Symbol("handled");p((()=>{const e=f(Ot.leftPanel.threadListWrap);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("beforeend",'\n      <div class="dm-filters-nothing-found">\n        NOTHING FOUND\n      </div>\n    ')))})),c`
    <style>
      .dm-filters-nothing-found {
        display: none;
        margin-top: 26px;
        margin-bottom: -13px;
        color: #8E8E8E;
        font-weight: 400;
        text-align: center;
      }

      .dm--has-filters.dm--no-threads .dm-filters-nothing-found {
        display: block;
      }
    </style>
  `}(),async function(){const t=await lt("store");if(!t)return;const e=()=>{const e=f(".dm-filters-load-more__counter");if(!e)return;const n=t.getState().direct.threads.size;e.innerText=n;const o=f(".dm-filters-load-more__counter-row");o&&(o.style.display=n>1?null:"none")};t.subscribe(e);let n=Promise.resolve();const o=async()=>{Ht.classList.add("dm--loading-next-pages"),await n;await Nt()&&(n=wt(25e3)),Ht.classList.remove("dm--loading-next-pages")},i=Symbol("handled");p((()=>{const t=f(".dm-filters-nothing-found");if(!t)return;if(t[i])return;t[i]=!0,t.insertAdjacentHTML("afterend",`\n      <div class="dm-filters-load-more">\n        <div class="dm-filters-load-more__counter-row">\n          searched\n          <span class="dm-filters-load-more__counter"></span>\n          chats\n        </div>\n        <button class="dm-filters-load-more__button">\n          Search older chats\n        </button>\n        <div class="dm-filters-load-more__spinner">\n          ${Dt()}\n        </div>\n      </div>\n    `);f(".dm-filters-load-more__button").addEventListener("click",o),e()})),c`
    <style>
      .dm-filters-load-more {
        margin-top: 30px;
      }
      html:not(.dm--has-older) .dm-filters-load-more {
        display: none;
      }
      html:not(.dm--has-filters) .dm-filters-load-more {
        display: none;
      }

      .dm-filters-load-more__button {
        display: block;
        height: 30px;
        margin: 0 50px;
        padding: 0 12px;
        font-weight: 600;
        color: #00376B;
        background: transparent;
        border: 1px solid currentColor;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
      }
      .dm-filters-load-more__button:active {
        background: rgba(0, 0, 0, 0.03);
      }
      html.dm--loading-next-pages .dm-filters-load-more__button {
        display: none;
      }

      .dm-filters-load-more__spinner {
        display: flex;
        justify-content: center;
        flex-direction: row;
      }
      html:not(.dm--loading-next-pages) .dm-filters-load-more__spinner {
        display: none;
      }

      .dm-filters-load-more__counter-row {
        display: block;
        text-align: center;
        margin-top: -10px;
        margin-bottom: 26px;
        color: #8E8E8E;
        font-weight: 400;
      }

      .dm-filters-load-more__counter {
        font-weight: 600;
      }

      ${Ot.leftPanel.threadListWrap} {
        padding-bottom: 40px;
      }
      .dm--has-filters ${Ot.leftPanel.threadListWrap} {
        padding-bottom: 70px;
      }

      .dm--has-filters ${Ot.leftPanel.threadListSpinner} {
        display: none;
      }
    </style>
  `}()}};let Ot;const Ht=document.documentElement;async function jt({string:t,unread:e,flagged:n}){const o=jt,i=await lt("store");if(!i)return;i.dispatch({type:"inssist.dm.apply-filters",string:t,unread:e,flagged:n});const r=!!(t||e||n);Ht.classList.toggle("dm--has-filters",r),o.called||(o.called=!0,Ht.classList.add("dm--loading-next-pages"),await Nt(),Ht.classList.remove("dm--loading-next-pages"))}async function Nt(){let t=await Vt();return t&&(await wt(500),t=await Vt()),t&&(await wt(500),t=await Vt()),t&&(await wt(500),t=await Vt()),t&&(await wt(500),t=await Vt()),t}async function Vt(){const t=Vt;t.initialized||(t.initialized=!0,t.hasOlder=!0,t.cursor=null);const e=await lt("store"),n=await lt("constants"),o=await lt("dm-threads-normalizer");if(!e||!n||!o)return!1;const i=n.instagramWebDesktopFBAppId;if(!i)return console.error("failed to get x-ig-app-id"),!1;if(!t.hasOlder)return!1;let r;try{const e=Pt("https://i.instagram.com/api/v1/direct_v2/inbox/",{cursor:t.cursor||null});r=await At.fetchJson(e,{headers:{"x-ig-app-id":i},credentials:"include"})}catch(t){return console.error(t),!1}const{entities:a}=o(r.inbox.threads);return e.dispatch({type:"DIRECT_THREAD_LOADED",messages:a.items,threads:a.threads,users:a.users}),t.cursor=r.inbox.oldest_cursor,t.hasOlder=r.inbox.has_older,Ht.classList.toggle("dm--has-older",t.hasOlder),t.hasOlder}var Wt={init:async function(){if(qt=await lt("store"),Yt=await lt("dm-thread-actions"),!qt||!Yt)return;Ut=st.getConfig().dmSelectors,function(){const t=Symbol("handled");p((()=>{h(Ut.leftPanel.conversationUnreadDot).forEach((e=>{if(e[t])return;e[t]=!0;const n=e.closest(Ut.leftPanel.conversationItem);if(!n)return;n.classList.add("mark-seen--unread-thread"),e.insertAdjacentHTML("afterbegin",'\n        <svg class="mark-seen" fresh xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">\n          <path fill="none" d="M0 0h30v30H0z"/>\n          <path d="M14.389 21.257l-1.688-1.725 1.846-2 .793.812 9.878-10.187a.291.291 0 01.226-.1.3.3 0 01.227.1l1.425 1.5a.359.359 0 01.008.473L16.278 21.272h-.008a1.488 1.488 0 01-.939.456 1.42 1.42 0 01-.942-.471zm-6.564 0l-4.536-4.644a.337.337 0 010-.473l1.438-1.475a.308.308 0 01.454 0l3.6 3.681 9.873-10.189a.292.292 0 01.227-.1.3.3 0 01.226.1l1.426 1.5a.362.362 0 01.008.473L9.715 21.272h-.008a1.485 1.485 0 01-.939.456 1.42 1.42 0 01-.948-.471z" fill="currentColor"/>\n        </svg>\n      ');const o=f(".mark-seen[fresh]");o.removeAttribute("fresh"),o.addEventListener("mousedown",(t=>{t.stopPropagation(),t.preventDefault()})),o.addEventListener("click",(t=>{t.stopPropagation(),t.preventDefault();const e=qt.getState();let o;if("A"===n.tagName)o=n.href.split("/").pop();else{o=(e.navigation.route||e.navigation.displayedRoute).split("/").pop()}const i=e.direct.threads.get(o).newest_cursor,r=Yt.markSeen(o,i,{ignoreGhostMode:!0});qt.dispatch(r)}))}))})),c`
    <style>
      .mark-seen {
        width: 25px;
        position: absolute;
        top: -10px;
        left: -9px;
        color: #738398;
        cursor: pointer;
        transition: color 0.15s;
        display: none;
      }
      .mark-seen:hover {
        color: #1BA2F9;
      }
      .mark-seen--unread-thread:hover .mark-seen {
        display: block;
      }

      .mark-seen--unread-thread:hover ${Ut.leftPanel.conversationUnreadDot} {
        background: transparent;
      }
    </style>
  `}()}};let Ut,qt,Yt;var Xt={init:async function(){Gt=st.getConfig().dmSelectors,K.on("dm.start-conversation",Kt),K.on("dm.go-to-inbox",Zt),K.on("dm.refresh",Qt),history.pushState=history.replaceState,async function(t){const e=await lt("store");if(!e)return void console.error("dm injection controller →","initConversationCreator:","failed to require store");await l((()=>{const t=e.getState().direct.realtimeState;return"subscribed"===t.irisConnectivity.toLowerCase()&&"connected"===t.mqttConnectivity.toLowerCase()&&"message"===t.subscriptionType.toLowerCase()}))||console.error("dm injection controller →","initConversationCreator:","failed to wait for webscoket to be ready");(await l((()=>f(Gt.leftPanel.newMessageButton)))).click();const n=f(Gt.dialog.window);h("button",n)[0].click(),Jt=await lt("dm-conversation-creator")}(),function(){const t=Symbol("prevText");p((()=>{const e=f(Gt.general.dmTopButton);if(!e)return;const n=e.innerText;e[t]!==n&&(e[t]=n,K.send("dm.update-badge",n))}))}(),async function(){const t=await lt("nav"),e=t.push;t.push=t=>{if(t.startsWith("/direct/"))return e(t);K.send("dm.ig-go",t)}}(),async function(){const t=await lt("dm-delta-parser");if(!t)return;const e=t.parseDeltaItem;t.parseDeltaItem=(...o)=>{const i=n(o[0]);return i&&12e3===i.ttl&&(i.ttl=5e3,o[0]=JSON.stringify(i)),e.call(t,...o)}}(),function(){const t=Symbol("handled");p((()=>{h("a").forEach((e=>{if(e[t])return;e[t]=!0;e.getAttribute("href").includes("instagram.com")||e.setAttribute("target","_blank")}))}))}(),function(){const t=Symbol("handled");p((()=>{const e=f(Gt.general.mediaViewerImage)||f(Gt.general.mediaViewerVideo);if(s.classList.toggle("media-viewer--open",!!e),!e)return;const n=e.closest(Gt.dialog.root);if(!n)return;if(n[t])return;n[t]=!0;const o=e.getAttribute("src")||e.querySelector("source").getAttribute("src");n.insertAdjacentHTML("beforeend",`\n      <div class="media-viewer-controls">\n        <a class="media-viewer-controls__button" href="${o}" target="_blank">\n          <svg\n            class="media-viewer-controls__button-icon"\n            xmlns="http://www.w3.org/2000/svg"\n            width="32"\n            height="32"\n            viewBox="0 0 32 32">\n            <defs>\n              <clipPath id="a">\n                <path fill="none" d="M0 0h32v32H0z"/>\n              </clipPath>\n            </defs>\n            <g clip-path="url(#a)">\n              <path fill="none" d="M0 0h32v32H0z"/>\n              <path d="M10.493 22V12h6l-2 2h-2v6h6v-2l2-2v6zm4.149-5.847L19.793 11h-3.3V9.5h6.508v6.453h-1.508V12.7l-5.151 5.152z" fill="currentColor"/>\n            </g>\n          </svg>\n        </a>\n        <div class="media-viewer-controls__button media-viewer-controls__button_close">\n          <svg\n            class="media-viewer-controls__button-icon"\n            xmlns="http://www.w3.org/2000/svg"\n            width="34"\n            height="34"\n            viewBox="0 0 40 40">\n            <path d="M0 0h40v40H0z" fill="transparent"/>\n            <path d="M12.626 25.797l6.062-6.061-6.062-6.061 1.313-1.313L20 18.424l6.061-6.062 1.313 1.313-6.06 6.062 6.06 6.06-1.313 1.313-6.062-6.06-6.06 6.06z" fill="currentColor"/>\n          </svg>\n        </div>\n      </div>\n    `);f(".media-viewer-controls__button_close").addEventListener("click",(()=>{const t=document.createEvent("MouseEvents");t.initMouseEvent("mousedown",!0),n.dispatchEvent(t)}))})),c`
    <style>
      .media-viewer--open ${Gt.dialog.window} {
        max-width: none !important;
        max-height: none !important;
        box-shadow: none !important;
        border-radius: 0 !important;
      }

      .media-viewer--open ${Gt.dialog.window} * {
        border-radius: 0 !important;
        background-color: transparent !important;
      }

      ${Gt.general.mediaViewerContainer} {
        width: calc(100vw - 100px) !important;
        height: calc(100vh - 100px) !important;
      }

      ${Gt.general.mediaViewerImage},
      ${Gt.general.mediaViewerVideo} {
        object-fit: contain;
      }

      .media-viewer-controls {
        position: absolute;
        top: 16px;
        right: 16px;
        display: flex;
        flex-direction: row;
        transition: transform 0.3s, opacity 0.3s;
      }
      body:not(:hover) .media-viewer-controls {
        transform: translateX(5px);
        opacity: 0;
        transition-delay: 0.2s;
      }

      .media-viewer-controls__button {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-left: 16px;
        background: #FFF;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 50%;
        box-sizing: border-box;
      }
      .media-viewer-controls__button:active {
        opacity: 1; /* override ig style */
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
        margin-top: 1px;
      }
      .theme-night .media-viewer-controls__button {
        border: 1px solid #bbb;
        box-shadow: none;
      }

      .media-viewer-controls__button-icon {
        color: #555;
      }
    </style>
  `}(),function(){const t=Symbol("handled"),e=document.documentElement;p((()=>{const e=f(Gt.dialog.searchRow);e&&(e[t]||(e.scrollLeft=0))})),p((()=>{h(Gt.general.iconButton).forEach((e=>{if(e[t])return;e[t]=!0;"0px"===getComputedStyle(e).padding&&e.classList.add("icon-button-with-hitbox")}))})),p((()=>{const e=f(Gt.leftPanel.requestsTabText);if(!e)return;if(e[t])return;e[t]=!0;const n=Number(e.innerText.replace(/\D/g,""));e.innerHTML=`\n      <span class="requests-tab-plus">+</span>\n      ${n||""}\n    `})),p((()=>{const t=!!f(Gt.leftPanel.requestsDescription);e.classList.toggle("is-requests-page",t)})),p((()=>{const t=!!f(Gt.leftPanel.folderTab);e.classList.toggle("has-folder-tabs",t)})),c`
    <style>
      * {
        font-family: montserrat !important;
        outline: none;
      }

      ::-webkit-scrollbar {
        display: none;
      }

      body {
        /* prevents content jumping on page initialization */
        width: 100%;
        min-width: 730px;
      }

      ${Gt.general.header} {
        display: none;
      }

      ${Gt.general.content} {
        padding-top: 0 !important;
      }

      .theme-night ${Gt.general.blueButton} {
        color: #000;
      }

      ${Gt.general.postActionsTooltipMe} {
        transform: translateX(20%) scale(0.65);
        transform-origin: right bottom;
      }

      ${Gt.general.postActionsTooltipPeer} {
        transform: translateX(-20%) scale(0.65);
        transform-origin: left bottom;
      }

      ${Gt.general.postActionsTooltipTail} {
        display: none;
      }

      ${Gt.general.replyText} {
        max-width: 350px !important;
      }

      html.has-folder-tabs:not(.is-requests-page) ${Gt.leftPanel.header} {
        height: 0 !important;
        border-bottom: none !important;
      }

      html.has-folder-tabs:not(.is-requests-page) ${Gt.leftPanel.header} * {
        color: transparent !important;
        user-select: none;
      }

      html.has-folder-tabs ${Gt.leftPanel.newMessageButton} {
        top: 31px;
      }

      ${Gt.leftPanel.tabsContainer} {
        margin-right: 64px;
      }

      ${Gt.leftPanel.folderTab} {
        font-size: 12px;
        padding: 27px 4px 14px 4px !important;
        position: relative;
        flex-grow: 0 !important;
        margin-right: 12px;
      }
      ${Gt.leftPanel.folderTab}:last-child {
        margin-right: 0;
      }

      ${Gt.leftPanel.folderTab}:first-child {
        margin-left: 17px;
      }

      /* hitbox for folder tabs */
      ${Gt.leftPanel.folderTab}::before {
        content: '';
        position: absolute;
        top: 0;
        left: -6px;
        right: -6px;
        bottom: 0;
      }

      ${Gt.leftPanel.folderTabsContainer} {
        width: auto !important;
        overflow: hidden;
        flex: initial;
      }

      ${Gt.leftPanel.folderTabGeneral} {
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1 !important;
        display: block;
      }

      ${Gt.leftPanel.requestsTab} {
        margin-left: 12px;
        padding: 0 !important;
      }

      ${Gt.leftPanel.requestsTabText} {
        display: flex;
        font-size: 14px;
        font-weight: 600;
        padding: 26px 4px 15px 4px;
        position: relative;
      }

      /* hitbox for requests tab */
      ${Gt.leftPanel.requestsTabText}::before {
        content: '';
        position: absolute;
        top: 0;
        left: -6px;
        right: -6px;
        bottom: 0;
      }

      ${Gt.leftPanel.requestsTabContainer} {
        width: auto !important;
      }

      ${Gt.leftPanel.conversationItemWrap} {
        padding: 0 !important;
        margin: 0 8px 2px !important;
      }

      ${Gt.leftPanel.conversationItemWrapActive} {
        border-radius: 5px;
        padding: 8px 12px !important;
        margin: 0 8px 2px !important;
        background: #efefef8a !important;
      }

      ${Gt.leftPanel.conversationItem} {
        border-radius: 5px;
        padding: 8px 12px !important;
      }
      ${Gt.leftPanel.conversationItemActive} {
        border-radius: 5px;
        padding: 0 !important;
        background: none !important;
      }

      ${Gt.dialog.root} {
        background: rgba(255, 255, 255, 0.96) !important;
      }

      ${Gt.dialog.window} {
        width: auto;
        min-width: 370px;
        max-width: 450px;
        box-shadow: 0 0px 12px rgba(0, 0, 0, 0.1);
        flex-grow: 0;
        align-self: auto;
        border-radius: 12px;
      }

      ${Gt.dialog.searchRow} {
        overflow-x: hidden;
      }

      ${Gt.dialog.searchRowLabel} {
        justify-content: center;
      }

      .icon-button-with-hitbox {
        position: relative;
      }
      .icon-button-with-hitbox::before {
        content: '';
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
      }

      .requests-tab-plus {
        font-size: 18px;
        margin-right: 4px;
      }
    </style>
  `}(),Object.defineProperty(Object.prototype,"maxRows",{get:()=>20,set:()=>!0}),document.addEventListener("keydown",(t=>{if("Enter"!==t.key)return;const e=f(Gt.dialog.submitButton);e&&e.click()})),c`
    <style>
      ${Gt.leftPanel.switchAccountButton} {
        display: none;
      }
    </style>
  `,async function(){const t=await lt("add-dispatch-listener");if(!t)return;t((t=>{"DIRECT_MESSAGE_UPDATED"===t.type&&(t.mutationToken||K.send("dm.message-sent"))}))}(),ct.init(),ut.init(),gt.init(),Bt.init(),Wt.init()}};let Gt,Jt;async function Kt(t){if(!Jt)return;const e=new Map;e.set(t,!0),Jt.forwardAction(e)}async function Zt(){(await lt("nav")).push("/direct/inbox/")}function Qt(){location.reload()}var te={init:function(){ee=st.getConfig().igSelectors,c`
    <style>
      * {
        font-family: montserrat !important;
      }

      .theme-night main {
        background-color: #d4d5d9 !important;
      }

      .theme-night form {
        padding: 16px 16px 30px 16px !important;
      }

      /* right column */
      .KaKt3 {
        padding-right: 84px !important;
      }

      /* cover description text */
      .cVwHB {
        max-width: 500px;
      }

      nav {
        display: none !important; }
      main > div {
        margin: 0 auto 0 !important; }
      main {
        background-color: white !important; }
      h2 {
        display: none !important; }
      body label:nth-child(2) {
        margin-top: 0px !important; }
      div.xJ4T9 {
        margin: 0 !important; }
      button.sqdOP.yWX7d.y3zKF {
        display: none !important; }
      a.dMgUz {
        display: none !important; }
      div.oUHgX {
        display: none !important; }
      footer {
        display: none !important; }
      header.vtbgv, div.SRori, div.fx7hk {
        display: none !important; }
    </style>
  `,function(){const t=Symbol("handled");p((()=>{const e=f(ee["igtv_post-button"]);e&&(e[t]||(e[t]=!0,e.addEventListener("click",(async()=>{await l((()=>!f(ee["igtv_post-button"]))),K.send("ig.post-igtv"),async function(){await l((()=>f(ee["igtv_post-card"]))),K.send("ig.igtv-posted")}()}))))}))}()}};let ee;function ne(t,e){document.cookie=`${t}=${e}; path=/`}var oe={init:async function(){if((await l((()=>document.documentElement))).classList.contains("touch"))return;if(window.opener&&location.pathname.startsWith("/accounts/login/"))return;(await l((()=>document.body))).insertAdjacentHTML("beforeend",`\n    <button class="open-in-inssist open-in-inssist_below">\n      <div class="open-in-inssist__main">\n        <img class="open-in-inssist__icon" src="${window.inssist.url}img/icon-128.png"/>\n        <span class="open-in-inssist__label">OPEN IN INSSIST</span>\n      </div>\n      <div class="open-in-inssist__smile">\n        <span class="open-in-inssist__smile-icon">${function(){const t=Array.from(ie).filter((t=>t.trim().length>0)),e=Math.floor(Date.now()/Tt)%t.length;return t[e]}()}</span>\n        <span class="open-in-inssist__smile-text">smile of the day</span>\n      </div>\n    </button>\n  `);const t=f(".open-in-inssist");setTimeout((()=>{t.classList.remove("open-in-inssist_below")}),300),t.addEventListener("click",(t=>{t.preventDefault(),t.stopPropagation(),ne("open-in-inssist",location.pathname)}),!0),p((()=>{t.classList.toggle("open-in-inssist_hidden",!("www.instagram.com"===location.host||"instagram.com"===location.host))})),c`
    <style>
      .open-in-inssist {
        position: fixed;
        right: 26px;
        bottom: 0;
        padding: 0;
        background: #F7F7F9;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 4px 4px 0 0;
        cursor: pointer;
        border: none;
        transform: translateY(128px);
        transition: transform 350ms;
        z-index: 99999;
      }
      .open-in-inssist:hover {
        transform: none;
      }
      .open-in-inssist_below {
        transform: translateY(100%);
      }
      .open-in-inssist_hidden {
        display: none;
      }

      .open-in-inssist__main {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 17px 7px 12px;
      }

      .open-in-inssist__icon {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }

      .open-in-inssist__label {
        font-family: 'Montserrat';
        color: #556180;
        font-size: 12px;
        font-weight: 600;
      }

      .open-in-inssist__smile {
        padding: 16px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .open-in-inssist__smile-icon {
        font-size: 64px;
        line-height: 78px;
        height: 78px;
      }

      .open-in-inssist__smile-text {
        font-family: 'Nunito Sans';
        font-size: 9px;
        color: #000000;
        opacity: 0.6;
      }
    </style>
  `}};const ie="\n  🤯🤗🧐🙃😝🤒🤓😑😊😯🙂🤧🥳\n  😬🥰🤪🤨😘🥴🤣😄😀😶😚😖😋\n  😛😵😜😷😴🤔😐😗😃😁🥶🤑😎\n  😉🤫😳😡😱😤😍🤩🤐🤭😇😅😲\n  😂😏😙😆🙄😌😮🥺😈🤤\n";var re={init:async function(){if(ae=st.getConfig().igSelectors,se=await lt("store"),le=await lt("add-dispatch-listener"),!se||!le)return;K.on("tag-assist.ig-set-caption",de),K.on("tag-assist.save-collections-to-ls",ce),K.on("tag-assist.read-collections-from-ls",pe),function(){let t=null;se.subscribe((()=>{var e;const n=null===(e=se.getState().creation)||void 0===e?void 0:e.sessionId;n&&n!==t?(t=n,K.send("tag-assist.ig-creation-session-start")):!n&&t&&(t=null,K.send("tag-assist.ig-creation-session-end"))}))}(),async function(){le((t=>{"CREATION_CAPTION_CHANGED"===t.type&&K.send("tag-assist.ig-caption-change",t.caption)}))}()}};let ae,se,le;async function de(t){se.dispatch({type:"CREATION_CAPTION_CHANGED",caption:t});const e=f(ae.postCreation.captionTextarea);e&&(e.scrollTop=e.scrollHeight)}function ce(t){e.set("inssist.tagAssist.collections",t)}function pe(){return e.get("inssist.tagAssist.collections",[])}async function ue(){return!(await l((()=>document.body))).querySelector("#react-root")}var ge={init:function(){!async function(){if(await ue())return;const t=await lt("config"),e=await lt("cookies-controller");if(!t||!e)return;e.setCookie=(e,n,o={})=>{if(t.needsToConfirmCookies()&&"ig_cb"!==e)return;const i={path:"/",...o};null===n&&(i.maxage=-1);let r=`${fe(e)}=${fe(n)}`;i.maxage&&(i.expires=new Date(Date.now()+i.maxage)),i.path&&(r+=`; path=${i.path}`),i.domain&&(r+=`; domain=${i.domain}`),i.expires&&(r+=`; expires=${i.expires.toUTCString()}`),document.cookie=`${r}; SameSite=none; secure`}}()}};function fe(t){try{return encodeURIComponent(t)}catch(e){throw new Error(`failed to encode ${t}`)}}function he(t,{isCreatingReels:e=(()=>!1),isSharingToFeed:n=(()=>!1),onSuccess:o=(()=>{})}){const i=t.post;t.post=async(...r)=>{if(!e())return i.call(t,...r);if(r[0].includes("/rupload_igvideo/")){const e=r[2].headers,n=JSON.parse(e["X-Instagram-Rupload-Params"]);return n.is_igtv_video=!1,n.is_clips_video=!0,n.is_unified_video=!1,n.uses_original_audio=!0,n.audio_type="original_sounds",e["X-Instagram-Rupload-Params"]=JSON.stringify(n),i.call(t,...r)}if(r[0].includes("/create/configure/")||r[0].includes("/media/configure/")||r[0].includes("/igtv/configure_to_igtv/")){r[0]="https://i.instagram.com/api/v1/media/configure_to_clips/",r[1].clips_uses_original_audio=1,r[1].uses_original_audio=1,r[1].original_audio=1,r[1].audio=1,r[1].clips_audio=1,r[1].clips_with_audio=1,r[1].with_audio=1,r[1].enable_audio=1,r[1].clips_enable_audio=1,r[1].clips_audio_enable=1,r[1].audio_enable=1,r[1].audio_type="original_sounds",n()&&(r[1].clips_share_preview_to_feed=1);const e=await i.call(t,...r);return"ok"===(null==e?void 0:e.status)&&o(),e}return i.call(t,...r)}}const me=Symbol("anchor");function be({class:t,style:e,text:n,anchor:o,atCenter:i=!1}){const r=be;r.initialized||(r.initialized=!0,p((()=>{h(".tooltip").forEach((t=>{const e=t[me];document.body.contains(e)||t.remove()}))})),c`
    <style>
      .tooltip {
        display: block;
        position: absolute;
        margin-top: 12px;
        margin-left: 4px;
        padding: 8px 10px;
        color: #FFF;
        background: #1BA2F9;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        opacity: 0;
        pointer-events: none;
        transform: translateY(2px);
        transition: transform 0.2s, opacity 0.2s;
        z-index: 99999;
      }
      .tooltip_shown {
        opacity: 1;
        transform: none;
      }
      .theme-night .tooltip {
        filter: url(#theme-reverse-filter);
        background: #33ABF8;
      }

      /* triangle */
      .tooltip::before {
        content: '';
        position: absolute;
        right: 6px;
        bottom: 100%;
        border: 3px solid transparent;
        border-left-width: 4px;
        border-right-width: 4px;
        border-bottom-color: #1BA2F9;
      }
      .theme-night .tooltip::before {
        border-bottom-color: #1BA2F9;
      }
      .tooltip_at-center::before {
        right: calc(50% - 4px);
      }

      .tooltip b {
        font-weight: 700;
      }
      .tooltip code {
        white-space: nowrap;
        padding: 1px 5px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.25);
      }
    </style>
  `);const a=document.createElement("div");a.innerHTML=`\n    <div\n      class="${t||""} tooltip ${i?"tooltip_at-center":""}"\n      ${e?`style="${e}"`:""}>\n      ${n}\n    </div>\n  `;const s=a.firstElementChild;document.body.appendChild(s),s[me]=o,o.addEventListener("mouseenter",(()=>{let t,e;const n=o.getBoundingClientRect();i?(t=Math.round(n.left+n.width/2-s.offsetWidth/2-4),e=Math.round(n.top+n.height)):(t=Math.round(n.left+n.width-s.offsetWidth),e=Math.round(n.top+n.height)),s.style.left=`${t}px`,s.style.top=`${e}px`,s.classList.add("tooltip_shown")})),o.addEventListener("mouseleave",(()=>{s.classList.remove("tooltip_shown")}))}var ve={init:async function(){if(ye=st.getConfig().igSelectors,xe=await lt("http"),we=await lt("store"),_e=await lt("gatekeeper"),!xe||!we||!_e)return;he(xe,{isCreatingReels:()=>ke.creatingReels,isSharingToFeed:()=>ke.shareToFeed,onSuccess:()=>{K.send("reels.submit-success")}}),function(){const t=Symbol("handled");p((async()=>{if(!ke.creatingReels)return;const e=f(ye.postCreation.submitPostButton);if(!e)return;if(e[t])return;e[t]=!0;const n=await K.send("reels.is-pro");e.addEventListener("click",(t=>{n||(t.preventDefault(),t.stopPropagation(),K.send("reels.open-billing"))}),{useCapture:!0}),n||(e.style.opacity=.5,be({style:"width: 100%; max-width: 280px;",anchor:e,text:"\n          Posting Reels is a PRO feature, please consider\n          upgrading to publish Reels from the Desktop.\n        "}))}))}(),function(){const t=Symbol("handled");p((()=>{if(!ke.creatingReels)return;const e=s.dataset.page;if(!("CreationStylePage"===e||"CreationDetailsPage"===e))return;const n=f(ye.general.headerTitle);n&&(n[t]||(n[t]=!0,n.innerText="New Reel"))})),c`
    <style>
      /* hide "Add Location" and "Tag People" buttons */
      .reels--creating-reels ${ye.postCreation.buttonContainer} {
        display: none;
      }

      /* hide "Advanced Posting Options" section */
      .reels--creating-reels .extended-post-creation {
        display: none;
      }
    </style>
  `}(),function(){let t=!1;K.on("reels.auth-performed",(e=>{if(f(".reels-auth").remove(),!e)return;t=!0;const n=f(ye.postCreation.submitPostButton);n&&n.click()}));const e=Symbol("handled");p((async()=>{if(!ke.creatingReels)return;const n=f(ye.postCreation.submitPostButton);if(!n)return;if(n[e])return;n[e]=!0;const o=await K.send("reels.is-pro");t=await K.send("reels.is-mobile-session"),n.addEventListener("click",(e=>{if(!o)return;if(t)return;e.preventDefault(),e.stopPropagation(),document.body.insertAdjacentHTML("beforeend",'\n        <div class="reels-auth modal">\n          <div class="modal__window">\n            <div class="modal__title reels-auth__title">\n              Authorize Reels API\n              <span class="reels-auth__info-circle info-circle">?</span>\n            </div>\n            <div class="modal__content">\n              <div>\n                Please authorize Inssist App to use Instagram\n                Reels API for posting Reels.\n              </div>\n              <div class="reels-auth__buttons">\n                <button class="reels-auth__button-auth button">\n                  Authorize\n                </button>\n                <button class="reels-auth__button-cancel button button_cancel">\n                  Cancel\n                </button>\n              </div>\n              <div class="reels-auth__warning">\n                You will be asked to relogin as a part of authorization.\n                Once authorized, your Reels will post immediately.\n              </div>\n            </div>\n          </div>\n        </div>\n      '),be({style:"width: 100%; max-width: 220px;",atCenter:!0,anchor:f(".reels-auth__info-circle"),text:"\n          Login credentials required. Your credentials never\n          sent away from your PC. This action is done once.\n        "});f(".reels-auth__button-auth").addEventListener("click",(()=>{K.send("reels.authorize")}));f(".reels-auth__button-cancel").addEventListener("click",(()=>{f(".reels-auth").remove()}))}),{useCapture:!0})})),c`
    <style>
      .reels-auth {}

      .reels-auth__title {}

      .reels-auth__info-circle {
        margin-left: 8px;
      }

      .reels-auth__buttons {
        display: flex;
        flex-direction: row;
        margin-top: 12px;
      }

      .reels-auth__warning {
        margin-top: 24px;
        font-size: 13px;
        color: #A5AAAF;
      }
    </style>
  `}(),function(){const t=Symbol("handled");p((async()=>{if(!ke.creatingReels)return;const e=f(ye.postCreation.captionContainer);if(!e)return;if(e[t])return;e[t]=!0;const n=await K.send("reels.get-trial-data");if(n.hasPro)return;e.insertAdjacentHTML("beforebegin",`\n      <div class="ReelsUpgradeToProBar">\n        <div class="ReelsUpgradeToProBar__text">\n          Free Reels Remaining: ${n.freeReels} / ${n.maxFreeReels}\n        </div>\n        <button class="ReelsUpgradeToProBar__button">\n          Get Unlimited Reels\n        </button>\n      </div>\n    `);f(".ReelsUpgradeToProBar__button").addEventListener("click",(()=>{K.send("reels.open-billing")}))})),c`
    <style>
      .ReelsUpgradeToProBar {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 16px;
        font-size: 14px;
        border-bottom: 1px solid #ddd;
      }

      .ReelsUpgradeToProBar__text {
        margin-right: 24px;
      }

      .ReelsUpgradeToProBar__button {
        font-size: inherit;
        color: #0095F6;
        border: none;
        cursor: pointer;
        padding: 0;
        font-weight: 500;
        background: transparent;
      }
    </style>
  `}(),function(){const t=Symbol("handled");p((()=>{if(!ke.creatingReels)return;const e=f(ye.postCreation.body);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("beforeend",`\n      <div class="reels-share-to-feed ${ke.shareToFeed?"reels-share-to-feed_on":""}">\n        <button class="reels-share-to-feed__button clickable">\n          <div class="reels-share-to-feed__checkbox">\n            <svg class="reels-share-to-feed__checkbox-icon-empty" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M19 5v14H5V5zm0-2H5a2.006 2.006 0 00-2 2v14a2.006 2.006 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2z" fill="#1ba2f9" fill-rule="evenodd"/>\n            </svg>\n            <svg class="reels-share-to-feed__checkbox-icon-checked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M19 3H5a2.006 2.006 0 00-2 2v14a2.006 2.006 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2zm-9 14l-5-5 1-1 4 3 8-7 1 1-9 9z" fill="#1ba2f9" fill-rule="evenodd"/>\n            </svg>\n          </div>\n          <div class="reels-share-to-feed__label">\n            Also Share to Feed\n          </div>\n        </button>\n        <div class="reels-share-to-feed__preview">\n          <div class="reels-share-to-feed__preview-image"></div>\n          <div class="reels-share-to-feed__preview-caption">Feed Post Preview</div>\n        </div>\n      </div>\n    `);const n=f(".reels-share-to-feed");f(".reels-share-to-feed__button").addEventListener("click",(()=>{ke.shareToFeed=!ke.shareToFeed,n.classList.toggle("reels-share-to-feed_on")}))}));const e=()=>{var t,e;if(!ke.creatingReels)return;const n=null===(t=we.getState().creation)||void 0===t||null===(e=t.coverPhoto)||void 0===e?void 0:e.dataURL;if(!n)return;const o=f(".reels-share-to-feed__preview-image");o&&(o.style.backgroundImage=`url('${n}')`)};p(e),we.subscribe(e),c`
    <style>
      .reels-share-to-feed {
        margin-top: 12px;
        padding: 5px 0;
        background: #FFF;
        border-top: 1px solid #DBDBDB;
        border-bottom: 1px solid #DBDBDB;
      }

      .reels-share-to-feed__title {
        padding: 12px 16px 0px;
        font-size: 14px;
        line-height: 20px;
        font-weight: 600;
        font-family: Montserrat;
      }

      .reels-share-to-feed__warning {
        padding: 8px 16px 4px;
        max-width: 380px;
        font-family: Montserrat;
        line-height: 1.4;
      }

      .reels-share-to-feed__button {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 14px;
        cursor: pointer;
        border: none;
        outline: none;
        background: transparent;
        user-select: none;
      }

      .reels-share-to-feed__checkbox {
        margin-right: 12px;
      }

      .reels-share-to-feed_on .reels-share-to-feed__checkbox-icon-empty {
        display: none;
      }

      .reels-share-to-feed:not(.reels-share-to-feed_on) .reels-share-to-feed__checkbox-icon-checked {
        display: none;
      }

      .reels-share-to-feed__label {
        font-family: Montserrat;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
      }

      .reels-share-to-feed__preview {
        display: block;
        margin: 4px 0 4px 17px;
      }
      .reels-share-to-feed:not(.reels-share-to-feed_on) .reels-share-to-feed__preview {
        display: none;
      }

      .reels-share-to-feed__preview-image {
        width: 100px;
        height: 100px;
        background-size: cover;
        background-position: center;
        border-radius: 4px;
      }

      .reels-share-to-feed__preview-caption {
        font-family: Montserrat;
        font-size: 11px;
        font-weight: 500;
        margin-top: 4px;
        color: #8e8e8e;
      }
    </style>
  `}(),function(){const t=Symbol("handled");p((()=>{if(!ke.creatingReels)return;const e=f(ye.postCreation.imageContainer),n=f(ye.postCreation.videoContainer),o=e||n;o&&(o[t]||(o[t]=!0,o.insertAdjacentHTML("beforeend",'\n      <div class="reels-tik-tok-watermark-info">\n        Find more info about posting Instagram Reels in our\n        <a href="https://inssist.com/knowledge-base" target="_blank">Knowledge Base</a> and\n        <a href="https://inssist.com/knowledge-base/sharing-tiktok-to-instagram-reels" target="_blank">Guide</a>.\n      </div>\n    ')))})),c`
    <style>
      .reels-tik-tok-watermark-info {
        display: block;
        padding: 16px 20px 20px 20px;
        font-family: Montserrat;
        font-size: 12px;
        font-weight: 500;
        line-height: 1.6;
      }

      .reels-tik-tok-watermark-info ul {
        margin-top: 7px;
        list-style: disc;
      }

      .reels-tik-tok-watermark-info li {
        margin-left: 16px;
        margin-bottom: 4px;
      }
      .reels-tik-tok-watermark-info li:last-child {
        margin-bottom: 0;
      }

      .reels-tik-tok-watermark-info a {
        color: #1BA2F9 !important;
      }
      .theme-nigh .reels-tik-tok-watermark-info a {
        filter: url(#theme-reverse-filter);
        color: #33ABF8 !important;
      }
    </style>
  `}()},isCreatingReels:function(){return ke.creatingReels},startReelsCreationSession:function(){const t=we.getState().creation.sessionId;ke.creatingReels=!0,ke.shareToFeed=!1,s.classList.add("reels--creating-reels"),K.send("reels.creation-session-start"),ke.stopSessionWatcher=we.subscribe((()=>{const e=we.getState();t!==e.creation.sessionId&&Pe()}))},stopReelsCreationSession:Pe};let ye,xe,we,_e;const ke={shareToFeed:!1,creatingReels:!1,stopSessionWatcher:null};function Pe(){ke.creatingReels=!1,s.classList.remove("reels--creating-reels"),K.send("reels.creation-session-end"),ke.stopSessionWatcher&&ke.stopSessionWatcher()}var Se={init:function(){Ce=st.getConfig().igSelectors,K.on("feature-encourage.start-story-creation",Ae),K.on("feature-encourage.start-post-creation",$e),K.on("feature-encourage.start-reels-creation",Le),function(){const t=Symbol("handled");p((()=>{const e=f(Ce.general.tabBarCreatePostButton);e&&(e[t]||(e[t]=!0,e.addEventListener("click",(t=>{Te||(t.preventDefault(),t.stopPropagation(),Ee?Re():(Ee=!0,K.send("feature-encourage.toggle-creation-card",!0),K.on("feature-encourage.app-click",Re),document.addEventListener("click",Re),document.addEventListener("keydown",Fe)))}),{capture:!0})))}))}()}};let Ce,Ee=!1,Te=!1;async function Ae(){ve.stopReelsCreationSession();const t=await lt("nav");"feedPage"!==(await lt("store")).getState().navigation.pageIdentifier&&t.push("/"),p((async function t(){const e=f(Ce.general.createStoryHeaderButton);e&&(p.off(t),await l((()=>window.innerWidth<window.innerHeight)),e.click())}),!0)}function $e(){ve.stopReelsCreationSession(),Te=!0;f(Ce.general.tabBarCreatePostButton).click(),Te=!1}function Le(){Te=!0;const t=f(Ce.general.tabBarInput),e=t.getAttribute("accept"),n=e.split(", ").filter((t=>t.startsWith("video"))).join(", ");t.setAttribute("accept",n);f(Ce.general.tabBarCreatePostButton).click(),t.setAttribute("accept",e),ve.startReelsCreationSession(),Te=!1}function Re(){Ee=!1,K.send("feature-encourage.toggle-creation-card",!1),K.off("feature-encourage.app-click",Re),document.removeEventListener("click",Re),document.removeEventListener("keydown",Fe)}function Fe(t){"Escape"===t.key&&Re()}var Me={create:function t({show:e=!1,onClick:n=null,removeOnClick:o=!1}={}){const i=t;i.init||(i.init=!0,c`
      <style>
        .spinner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .spinner:not(.spinner_visible) {
          display: none;
        }

        .spinner__inner {
          width: 100px;
          height: 100px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
      </style>
    `);const r=document.createElement("div");r.innerHTML=`\n    <div class="spinner ${e?"spinner_visible":""}">\n      <div class="spinner__inner">\n        ${Dt()}\n      </div>\n    </div>\n  `;const a=r.firstElementChild;document.body.appendChild(a),o&&!n&&(n=()=>{a.remove()});if(n){f(".spinner__inner",a).addEventListener("click",n)}return a},toggle:function(t,e){t.classList.toggle("spinner_visible",e)}};var ze={init:async function(){if(Ie=st.getConfig().igSelectors,De=await lt("nav"),Be=await lt("store"),!Be||!De)return;!function(){const t=Symbol("handled");p((()=>{const e=f(Ie.postCreation.imageContainer),n=f(Ie.postCreation.videoContainer),o=e||n;if(!o)return;if(o[t])return;o[t]=!0,o.insertAdjacentHTML("beforeend",'\n      <div class="extended-post-creation">\n        <div class="extended-post-creation__title">\n          Advanced Posting Options\n        </div>\n        <div class="extended-post-creation__content">\n          <button class="extended-post-creation__button" data-action="carousel">\n            <svg class="extended-post-creation__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M10.03 22a4.283 4.283 0 01-2.605-.876 4.363 4.363 0 01-1.539-2.212h2a2.483 2.483 0 002.14 1.235h8.647a2.474 2.474 0 002.471-2.471V9.03a2.483 2.483 0 00-1.235-2.14v-2a4.365 4.365 0 012.212 1.539A4.283 4.283 0 0123 9.03v8.647A4.329 4.329 0 0118.677 22zm-3.706-3.706A4.328 4.328 0 012 13.97V5.324A4.328 4.328 0 016.324 1h8.646a4.328 4.328 0 014.324 4.324v8.646a4.328 4.328 0 01-4.324 4.324zM3.853 5.324v8.646a2.474 2.474 0 002.471 2.471h8.646a2.474 2.474 0 002.471-2.471V5.324a2.474 2.474 0 00-2.471-2.471H6.324a2.474 2.474 0 00-2.471 2.471z" fill="currentColor"/>\n            </svg>\n            <div class="extended-post-creation__label">\n              ADD FILES AND CREATE CAROUSEL\n            </div>\n          </button>\n          <button class="extended-post-creation__button" data-action="schedule">\n            <svg class="extended-post-creation__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M13.841 1.565A9.936 9.936 0 003.906 11.5H.594l4.372 4.449 4.46-4.449H6.114a7.765 7.765 0 112.274 5.453L6.82 18.522a9.933 9.933 0 107.021-16.957zm-1.1 5.52v5.52l4.725 2.8.795-1.336-3.864-2.3V7.085z" fill="currentColor"/>\n            </svg>\n            <div class="extended-post-creation__label">\n              SCHEDULE POST\n            </div>\n          </button>\n        </div>\n      </div>\n    ');f('.extended-post-creation__button[data-action="carousel"]').addEventListener("click",(async()=>{const t=Oe();if(!t)return;const e=Me.create({show:!0,removeOnClick:!0}),n=He();await K.send("feature-encourage.post-creation-carousel-click",{file:t,caption:n}),e.remove(),De.push("/")}));f('.extended-post-creation__button[data-action="schedule"]').addEventListener("click",(async()=>{const t=Oe();if(!t)return;const e=Me.create({show:!0,removeOnClick:!0}),n=He();await K.send("feature-encourage.post-creation-schedule-click",{file:t,caption:n}),e.remove(),De.push("/")}))})),c`
    <style>
      .extended-post-creation {
        padding-top: 20px;
        padding-bottom: 40px;
        background: #FFF;
      }

      .extended-post-creation__title {
        font-family: Montserrat;
        font-size: 12px;
        font-weight: 500;
        line-height: 1.25;
        color: #A5AAAF;
        margin-left: 20px;
      }

      .extended-post-creation__content {
        margin-top: 10px;
      }

      .extended-post-creation__button {
        display: flex;
        align-items: center;
        padding: 5px 16px;
        background: transparent;
        outline: none;
        border: none;
        color: #415B72;
        font-weight: 600;
        cursor: pointer;
        transition: filter 0.3s;
      }
      .extended-post-creation__button:hover {
        filter: brightness(120%);
      }
      .extended-post-creation__button:active {
        filter: brightness(90%);
      }

      .extended-post-creation__icon {}

      .extended-post-creation__label {
        margin-left: 12px;
        font-family: Montserrat;
        font-size: 11px;
        line-height: 14px;
        font-weight: 700;
      }
    </style>
  `}()}};let Ie,De,Be;function Oe(){var t,e;const n=Be.getState(),o=(null===(t=n.creation)||void 0===t?void 0:t.sourceImage.file)||(null===(e=n.creation)||void 0===e?void 0:e.sourceVideo.file);if(!o)return null;const i=m.generate(),r=o.type.split("/").pop();return new File([o],`${i}.${r}`,{type:o.type})}function He(){var t,e;return(null===(t=Be.getState().creation)||void 0===t||null===(e=t.finalizedMedia)||void 0===e?void 0:e.caption)||""}var je={init:function(){Se.init(),ze.init()}};var Ne=Object.assign((function(t,e={}){document.addEventListener("click",t,e)}),{off:function(t,e={}){document.removeEventListener("click",t,e)}});var Ve={init:function(t){if(!t)return;if(t[We])return;t[We]=!0;let e=!1;t.addEventListener("mouseleave",(()=>{e=!1})),t.addEventListener("mousewheel",(n=>{n.deltaX&&(e=!0),e||(n.preventDefault(),t.scrollLeft+=n.deltaY)}))}};const We=Symbol("handled");const Ue=window.storyMentionsContentScript;var qe={init:async function(){Ye=st.getConfig().igSelectors,Xe=await lt("http"),Ge=await lt("store"),Ue.onStoryCreationReduce((t=>{"STORY_CREATION_SESSION_STARTED"===t.type&&(Je={mentions:[],inputSize:{width:0,height:0},activeMention:null})})),function(){const t=Symbol("handled");p((()=>{const e=f(Ye.storyCreation.topRightButtonsContainer);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("afterbegin",'\n      <button class="story-add-mention-button">\n        @\n      </button>\n    ');f(".story-add-mention-button").addEventListener("click",(()=>{Ge.dispatch({type:"STORY_CREATION_ENTER_ADD_TEXT"}),Ge.dispatch({type:"STORY_CREATION_CHANGE_TEXT",rawText:"@",width:21.71875,height:22}),Ge.dispatch({type:"SEARCH_QUERY_CLEARED"});const t=f(Ye.storyCreation.textInput);t.textContent="@";const e=document.getSelection(),n=document.createRange();n.setStart(t,1),n.setEnd(t,1),e.removeAllRanges(),e.addRange(n)}))})),c`
    <style>
      .story-add-mention-button {
        height: 44px;
        position: relative;
        top: -1px;
        margin-right: 7px;
        font-size: 27px;
        font-weight: 500;
        font-family: montserrat;
        color: #FFF;
        background: transparent;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
        border: none;
        outline: none;
        cursor: pointer;
        pointer-events: all;
      }
    </style>
  `}(),function(){const t=Symbol("listenerAdded");p((()=>{const e=f(Ye.storyCreation.textInput);e&&(Je.inputSize.width=e.offsetWidth,Je.inputSize.height=e.offsetHeight,e[t]||(e[t]=!0,e.addEventListener("input",(()=>{Je.inputSize.width=e.offsetWidth,Je.inputSize.height=e.offsetHeight}))))}))}(),function(){const t=Symbol("handled");p((()=>{const e=f(Ye.storyCreation.mentionReel);e&&(e[t]||(e[t]=!0,Ve.init(e)))})),Ne((t=>{const e=t.target.closest(Ye.storyCreation.mentionReelItem);if(!e)return;const n=f(Ye.storyCreation.textInput);if(!n)return;const o=`@${e.innerText}`;n.textContent=o;const i=n.getBoundingClientRect();Ge.dispatch({type:"STORY_CREATION_CHANGE_TEXT",width:i.width,height:i.height,rawText:o}),Ge.dispatch({type:"STORY_CREATION_SAVE_TEXT",renderText:[o],timeSpent:5e3})})),c`
    <style>
      ${Ye.storyCreation.mentionReelItem} {
        cursor: pointer;
      }

      .theme-night ${Ye.storyCreation.mentionReelItemName} {
        filter: url(#theme-reverse-filter);
      }

      ${Ye.storyCreation.textInput} {
        position: relative;
        top: 20px;
      }
    </style>
  `}(),Ue.onStoryCreationReduce(((t,e)=>{if("STORY_CREATION_SAVE_TEXT"!==t.type)return;if(1!==t.renderText.length)return;if(!t.renderText[0].startsWith("@"))return;const n=t.renderText[0].replace("@","");if(Je.activeMention)Object.assign(Je.activeMention,{username:n,width:Je.inputSize.width,height:Je.inputSize.height});else{const t=e.canvasStickers.find((t=>t.rawText===`@${n}`));if(!t)return;Je.mentions.push({username:n,x:t.x,y:t.y,width:Je.inputSize.width,height:Je.inputSize.height})}})),Ue.onStoryCreationReduce(((t,e)=>{if("STORY_CREATION_CHANGE_STICKER_ORDER"!==t.type)return;const n=t.bumpIndex,o=e.canvasStickers[n];if(o&&o.rawText&&o.rawText.startsWith("@")){const t=o.rawText.replace("@",""),e=Je.mentions.find((e=>e.username===t));Je.activeMention=e||null}else Je.activeMention=null})),Ue.onStoryCreationReduce((t=>{"STORY_CREATION_ENTER_ADD_TEXT"===t.type&&(Je.activeMention=null)})),Ue.onStoryCreationReduce((t=>{"STORY_CREATION_MOVE_CANVAS_STICKER"===t.type&&Je.activeMention&&(Je.activeMention.x+=t.deltaX,Je.activeMention.y+=t.deltaY)})),Ue.onStoryCreationReduce((t=>{"STORY_CREATION_DELETE_CANVAS_STICKER"===t.type&&Je.activeMention&&function(t,e){let n;n="function"==typeof e?t.findIndex(e):t.indexOf(e),-1!==n&&t.splice(n,1)}(Je.mentions,Je.activeMention)})),function(){if(!Xe)return;const t=Xe.post;Xe.post=(...e)=>{if("/create/configure_to_story/"===e[0]&&Je.mentions.length>0){const t=JSON.parse(JSON.stringify(Ge.getState()));e[1]={...e[1],reel_mentions:JSON.stringify(Je.mentions.map((e=>{const n=t.users.usernameToId[e.username];if(!n)return null;const o=f(Ye.storyCreation.root)||document.body;return{user_id:n,x:Math.max(0,e.x/o.offsetWidth),y:Math.max(0,e.y/o.offsetHeight),width:e.width/o.offsetWidth,height:e.height/o.offsetHeight,rotation:0}})).filter(Boolean))}}return t.call(Xe,...e)}}()}};let Ye,Xe,Ge,Je={mentions:[],inputSize:{width:0,height:0},activeMention:null};var Ke={init:function(){return}};var Ze={initForIg:function(){Qe()},initForFcs:function(){Qe(),function(){const t=st.getConfig().fcsSelectors;p((function t(e){const o=f("body");if(!o)return;p.off(t);new MutationObserver(n).observe(o,{childList:!0,subtree:!0}),n(e)}));let e=!1;function n(n){if(e)return;const o=n.map((t=>Array.from(t.addedNodes))).flat();if(0===o.length)return;const i=window.inssist.theme.emojiRegex,r=(f("body").innerText.match(i)||[]).filter((t=>!"0123456789#*↪".includes(t)));if(0===r.length)return;const a=[],s=Array.from(new Set(r)),l=["input","textarea","[contenteditable]",t.sidePanel.postPreviewCaption].map((t=>h(t))).flat();o.forEach((t=>{let e;if(e=t.nodeType===Node.ELEMENT_NODE?t:t.parentElement,!e)return;const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(;;){const t=n.nextNode();if(!t)break;const e=t.textContent;if(!s.some((t=>e.includes(t))))continue;if(l.some((e=>e.contains(t))))continue;const o=t.parentElement;o.classList.contains("emoji")||(a.includes(o)||a.push(o))}})),requestAnimationFrame((()=>{e=!0,a.forEach((t=>{if(!document.body.contains(t))return;let e=t.innerHTML;s.forEach((t=>{const n=`<span class="emoji">${t}</span>`;e=e.split(n).join("__$%#^__").split(t).join(n).split("__$%#^__").join(n)})),t.innerHTML=e})),e=!1}))}}()}};function Qe(){c`
    <style>
      .theme-night .emoji {
        filter: url(#theme-reverse-filter);
      }

      .theme-night input,
      .theme-night textarea,
      .theme-night [contenteditable] {
        filter: url(#theme-filter);
        color: #a0a0a0 !important;
        background: transparent !important;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .theme-night input::placeholder,
      .theme-night textarea::placeholder {
        color: rgba(255, 255, 255, 0.33);
      }
    </style>
  `}var tn={initForIg:function(){en(),Ze.initForIg()},initForFcs:function(){en(),Ze.initForFcs()}};function en(){!async function(){nn(await K.send("theme.get-theme"))}(),async function(){K.on("theme.switch-theme",(t=>{nn(t)}))}()}function nn(t){t&&(s.classList.remove("theme-day"),s.classList.remove("theme-night"),s.classList.add(`theme-${t}`))}var on={init:function(){rn=st.getConfig().igSelectors,async function(){const t=document.documentElement,e=await K.send("zen.is-enabled");t.classList.toggle("zen--enabled",e),K.on("zen.toggled",(e=>{t.classList.toggle("zen--enabled",e)}))}(),function(){const t=Symbol("handled");p((()=>{h(rn.feedPage.postHeader).forEach((e=>{if(e[t])return;e[t]=!0;const n=e.closest(rn.feedPage.post);if(!n)return;const o=f(rn.feedPage.postActions,n);if(!o)return;const i=f(rn.feedPage.postThreeDotsButton,n);if(!i)return;const r=()=>{n.classList.add("zen--post-with-hovered-header")},a=()=>{n.classList.remove("zen--post-with-hovered-header")};e.addEventListener("mouseenter",r),o.addEventListener("mouseenter",r),i.addEventListener("mouseenter",r),e.addEventListener("mouseleave",a),o.addEventListener("mouseleave",a),i.addEventListener("mouseleave",a)}))}))}(),async function(){const t=await lt("nav");if(!t)return;K.on("zen.toggled",(e=>{e&&"/"!==location.pathname&&t.push("/")}))}(),function(){const t=Symbol("handled");p((()=>{h(rn.feedPage.post).forEach((e=>{e[t]||(e[t]=!0,h("[alt]",e).forEach((t=>{t.removeAttribute("alt")})))}))}))}(),c`
    <style>
      .zen--enabled[data-page="feedPage"] ${rn.feedPage.followSuggestions} {
        margin: 10px 14px;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postPhoto},
      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postVideo},
      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postVideoContainer},
      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postPhotoContainer},
      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postMediaContainer},
      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postCarouselContainer} {
        max-height: 70vh;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postMediaContainer} {
        background: #FFF !important;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.post} {
        background: #1b1b1b;
        overflow: hidden;
        margin: 8px 16px 5px 16px;
        border-radius: 8px;
      }
      .zen--enabled[data-page="feedPage"] ${rn.feedPage.post}:first-child {
        margin-top: 0;
      }

      /* semitransparent border */
      .zen--enabled[data-page="feedPage"] ${rn.feedPage.post}::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid rgba(0, 0, 0, 0.1);
        z-index: 1;
        pointer-events: none;
        border-radius: inherit;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postHeader} {
        position: absolute;
        top: 0;
        left: 0;
        height: 56px;
        z-index: 1;
        border-color: transparent;
        background: rgba(0, 0, 0, 0.4);
        padding: 0 18px 0 14px;
        border-radius: 8px 0 16px 0;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${rn.feedPage.postHeader} {
        background: rgba(255, 255, 255, 0.2);
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${rn.feedPage.postHeader} {
        height: 96px;
        right: 0;
        border-radius: 8px 8px 0 0;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postHeaderItem} {
        position: relative;
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${rn.feedPage.postHeaderItem} {
        top: -20px;
      }

      /* hitbox when header is hovered */
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${rn.feedPage.postHeader}::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: -20px;
      }

      /* divider between actions */
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${rn.feedPage.postHeader}::after {
        content: "";
        position: absolute;
        top: 56px;
        left: 12px;
        right: 12px;
        height: 1px;
        border-top: 1px solid #fff;
        transform: scaleY(0.5);
        opacity: 0.25;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${rn.feedPage.postHeader}::after {
        filter: url(#theme-reverse-filter);
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postHeader} * {
        color: #FFF !important;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${rn.feedPage.postHeader} * {
        color: #000 !important;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postLocationRow} {
        display: flex;
        flex-direction: row;
        align-items: baseline;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postHashtagLocation} {
        margin-left: 12px;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postHashtagLocation}::before {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        top: 6px;
        left: -8px;
        background: #fff;
        border-radius: 50%;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${rn.feedPage.postHashtagLocation}::before {
        background: #000;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postThreeDotsButton} {
        z-index: 1;
        opacity: 0;
        pointer-events: none;
        top: -1px;
        right: 8px;
      }

      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${rn.feedPage.postThreeDotsButton} {
        opacity: 1;
        pointer-events: all;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postThreeDotsButton} svg {
        fill: #FFF;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${rn.feedPage.postThreeDotsButton} svg {
        fill: #000;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postFooter} {
        position: absolute;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postActions} {
        display: none;
        position: absolute;
        top: 57px;
        left: 17px;
        z-index: 1;
        margin: 0 !important;
        transform: scale(0.73);
        transform-origin: left center;
        pointer-events: none;
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${rn.feedPage.postActions} {
        display: inherit;
        pointer-events: all;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postAction} {
        margin-right: 7px;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postAction} svg {
        fill: #FFF;
        stroke: #FFF;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${rn.feedPage.postAction} svg {
        fill: #000;
        stroke: #000;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postUnderActionsContent} {
        display: none;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.carouselDots} {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.carouselDot} {
        background: #FFF;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${rn.feedPage.carouselDot} {
        filter: url(#theme-reverse-filter);
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.carouselActiveDot} {
        background: #97D6FF;
      }

      .zen--enabled[data-page="feedPage"] ${rn.feedPage.postMentionsButton} {
        display: none;
      }

      @media (max-width: 500px) {
        .zen--enabled[data-page="feedPage"] ${rn.feedPage.post}:first-child {
          margin-top: 16px !important;
        }
      }

      @media (max-width: 350px) {
        .zen--enabled[data-page="feedPage"] ${rn.feedPage.followSuggestions} {
          margin-left: 0;
          margin-right: 0;
        }
      }
    </style>
  `}};let rn;var an={init:function(){sn=st.getConfig().igSelectors,ln=document.documentElement,function(){const t=window.inssist.url,e=Symbol("handled");p((()=>{const n=f(sn.postCreation.captionContainer);n&&(n[e]||(n[e]=!0,n.insertAdjacentHTML("afterend",`\n      <div class="new-post-extra">\n        <button class="new-post-extra__button" data-option="cover-assist">\n          <img\n            class="new-post-extra__button-icon"\n            src="${t}img/new-post-extra-cover-assist.png">\n          <div class="new-post-extra__button-text">\n            Custom Cover\n          </div>\n          <svg\n            class="new-post-extra__button-chevron-icon"\n            xmlns="http://www.w3.org/2000/svg"\n            width="7.5"\n            height="12.357"\n            viewBox="0 0 7.5 12.357">\n            <path d="M7.301 6.659l-5.5 5.5a.679.679 0 01-.961 0l-.641-.641a.679.679 0 010-.959l4.358-4.38L.198 1.8a.679.679 0 010-.959L.839.2A.679.679 0 011.8.2l5.5 5.5a.679.679 0 01.001.959z" fill="currentColor"/>\n          </svg>\n        </button>\n        <button class="new-post-extra__button" data-option="tag-assist">\n          <img\n            class="new-post-extra__button-icon"\n            src="${t}img/new-post-extra-tag-assist.png">\n          <div class="new-post-extra__button-text">\n            Hashtag Assistant\n          </div>\n          <svg\n            class="new-post-extra__button-chevron-icon"\n            xmlns="http://www.w3.org/2000/svg"\n            width="7.5"\n            height="12.357"\n            viewBox="0 0 7.5 12.357">\n            <path d="M7.301 6.659l-5.5 5.5a.679.679 0 01-.961 0l-.641-.641a.679.679 0 010-.959l4.358-4.38L.198 1.8a.679.679 0 010-.959L.839.2A.679.679 0 011.8.2l5.5 5.5a.679.679 0 01.001.959z" fill="currentColor"/>\n          </svg>\n          </div>\n        </button>\n      </div>\n    `)))})),ln.addEventListener("click",(t=>{const e=t.target.closest(".new-post-extra__button");if(!e)return;const n=e.dataset.option;K.send("new-post-extra.click-option",n)})),c`
    <style>
      .new-post-extra {
        background: #FFF;
        border-bottom: 1px solid #DBDBDB;
        padding: 5px 0;
      }

      .new-post-extra__button {
        display: flex;
        align-items: center;
        border: none;
        outline: none;
        background: transparent;
        padding: 6px 18px 6px 14px;
        cursor: pointer;
      }
      html:not(.new-post-extra--video) .new-post-extra__button[data-option="cover-assist"] {
        display: none;
      }

      .new-post-extra__button-icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }

      .new-post-extra__button-text {
        font-family: Montserrat;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
      }

      .new-post-extra__pro-badge {
        padding: 2px 8px 3px;
        border-radius: 3px;
        background: linear-gradient(183deg, #fd7726 -14%, #ef1834 60%, #c70bc0 128%);
        font-size: 9px;
        line-height: 11px;
        font-weight: 600;
        color: #FFF;
        margin-left: 16px;
      }

      .new-post-extra__button-chevron-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 21px;
        height: 21px;
        border-radius: 50%;
        box-sizing: border-box;
        padding: 4px 6px;
        margin-left: auto;
        color: #A5A7AA;
        position: relative;
        right: -5px;
      }
      .new-post-extra__button_selected .new-post-extra__button-chevron-icon {
        color: #FFF;
        background: #1BA2F9;
      }
    </style>
  `}(),K.on("new-post-extra.synch-selected-option",(t=>{h(".new-post-extra__button").forEach((t=>t.classList.remove("new-post-extra__button_selected"))),t&&f(`.new-post-extra__button[data-option="${t}"]`).classList.add("new-post-extra__button_selected")})),async function(){const t=await lt("store");if(!t)return;let e=!1;p((()=>{const n=!!f(sn["new-post_textarea"]);if(e!==n)if(e=n,e){const e=t.getState(),n=!!dt((()=>e.creation.coverPhoto.file));K.send("new-post-extra.enter-page",{isVideo:n})}else K.send("new-post-extra.exit-page")}))}(),async function(){const t=await lt("store");if(!t)return;let e=null;t.subscribe((()=>{var n;const o=null===(n=t.getState().creation)||void 0===n?void 0:n.sourceVideo,i=o&&o.file||null;if(e===i)return;const r=i?URL.createObjectURL(i):null;ln.classList.toggle("new-post-extra--video",!!r),K.send("new-post-extra.creation-video-change",r),e=i}))}()}};let sn,ln;var dn={init:function(){cn=st.getConfig().igSelectors,async function(){let t=null;const e=await lt("store");if(!e)return;K.on("cover-assist.synch-cover",(n=>{const o=f(cn.postCreation.previewPostImage);if(!o)return;const i=e.getState();n?(i.creation.sessionId!==t&&(t=i.creation.sessionId,pn={url:i.creation.coverPhoto.dataURL,blob:i.creation.coverPhoto.file}),i.creation.coverPhoto.dataURL=URL.createObjectURL(n),i.creation.coverPhoto.file=n):i.creation.sessionId===t&&(i.creation.coverPhoto.dataURL=pn.url,i.creation.coverPhoto.file=pn.blob),o.src=i.creation.coverPhoto.dataURL}))}(),K.on("cover-assist.get-default-ig-cover-url",un)}};let cn,pn=null;async function un(){var t,e;const n=await lt("store");return n?pn?pn.url:null===(t=n.getState().creation)||void 0===t||null===(e=t.coverPhoto)||void 0===e?void 0:e.dataURL:null}var gn={init:async function(){if(hn=await lt("http"),!hn)return;fn=st.getConfig().igSelectors,function(){const t=Symbol("handled");p((()=>{requestAnimationFrame((()=>{const e=f(fn.storyCreation.videoHeader),n=f(".story-add-mention-button"),o=e||n;if(!o)return;if(o[t])return;o[t]=!0;const i='\n        <button class="story-add-link-button">\n          <svg class="story-add-link-button__svg" xmlns="http://www.w3.org/2000/svg" width="23.438" height="23.443" viewBox="0 0 23.438 23.443">\n            <defs>\n              <filter id="a" x="0" y="0" width="23.438" height="23.443" filterUnits="userSpaceOnUse">\n                <feOffset dy="1"/>\n                <feGaussianBlur stdDeviation=".5" result="blur"/>\n                <feFlood flood-opacity=".2"/>\n                <feComposite operator="in" in2="blur"/>\n                <feComposite in="SourceGraphic"/>\n              </filter>\n            </defs>\n            <g filter="url(#a)">\n              <path d="M10.248 13.251a1.06 1.06 0 01-.752-.311 4.994 4.994 0 010-7.054l3.925-3.925a4.988 4.988 0 117.054 7.049l-1.794 1.8a1.063 1.063 0 11-1.5-1.5l1.791-1.8a2.862 2.862 0 00-4.048-4.047l-3.925 3.926a2.865 2.865 0 000 4.048 1.063 1.063 0 01-.752 1.815zm-3.767 7.691a4.988 4.988 0 01-3.527-8.515l1.794-1.794a1.063 1.063 0 111.5 1.5L4.46 13.931a2.862 2.862 0 004.048 4.047l3.925-3.925a2.865 2.865 0 000-4.048 1.063 1.063 0 111.5-1.5 4.994 4.994 0 010 7.054l-3.925 3.925a4.956 4.956 0 01-3.527 1.461z" fill="currentColor"/>\n            </g>\n          </svg>\n        </button>\n      ';e?e.insertAdjacentHTML("beforeend",i):n.insertAdjacentHTML("beforebegin",i)}))})),c`
    <style>
      ${fn.storyCreation.videoHeader} {
        align-items: center;
      }

      .story-add-link-button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        margin-right: 10px;
        color: #FFF;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        pointer-events: all;
        position: relative;
      }
      .story-add-link-button--locked .story-add-link-button {
        opacity: 0.5;
        cursor: default;
      }

      /* dot when link is attached */
      .story-add-link-button_has-link::before {
        content: '';
        position: absolute;
        top: 26px;
        right: 3px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
        border-radius: 50%;
        width: 10px;
        height: 10px;
        background: #1BA2F9;
      }

      .story-add-link-button__svg {
        width: 26px;
        height: 26px;
        position: relative;
        top: 3px;
      }

      .story-add-link-button__tooltip {
        margin-top: 6px;
        margin-left: -5px;
        white-space: nowrap;
      }
    </style>
  `}(),function(){const t=Symbol("handled");p((()=>{const e=f(fn.storyCreation.root);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("beforeend",'\n      <div class="story-add-link-modal">\n        <div class="story-add-link-modal__window">\n          <div class="story-add-link-modal__header">\n            <div class="story-add-link-modal__title">Add Swipe Up Link</div>\n            <div class="story-add-link-modal__remove-button">Remove</div>\n          </div>\n          <input class="story-add-link-modal__input" placeholder="https://website.com"/>\n          <div class="story-add-link-modal__info story-add-link-modal__info_default">\n            Viewers will be able to swipe up to visit this website.\n            <span class="story-add-link-modal__trial-message">\n              Custom links left on free plan:\n              <span class="story-add-link-modal__trial-left-count"></span>\n            </span>\n          </div>\n          <div class="story-add-link-modal__info story-add-link-modal__info_pro">\n            <div class="story-add-link-modal__info-pro-badge">PRO</div>\n            Please consider upgrading to use this feature and support development.\n          </div>\n          <div class="story-add-link-modal__buttons">\n            <button class="story-add-link-modal__button story-add-link-modal__button_pro">\n              Upgrade to PRO\n            </button>\n            <button class="story-add-link-modal__button story-add-link-modal__button_save">\n              Save Link\n            </button>\n            <button class="story-add-link-modal__button story-add-link-modal__button_cancel">\n              Cancel\n            </button>\n          </div>\n        </div>\n      </div>\n    ')))})),c`
    <style>
      .story-add-link-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        transition: opacity 150ms, transform 150ms;
      }
      .story-add-link-modal:not(.story-add-link-modal_shown) {
        opacity: 0;
        transform: scale(1.1);
        pointer-events: none;
      }
      .theme-night .story-add-link-modal {
        background: rgba(234, 234, 234, 0.95);
      }

      .story-add-link-modal__window {
        border-radius: 8px;
        width: calc(100% - 16px);
        max-width: 310px;
        padding: 20px 16px;
        background: #FFF;
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.16);
      }
      .theme-night .story-add-link-modal__window {
        box-shadow: 0 3px 12px rgba(255, 255, 255, 0.16);
      }

      .story-add-link-modal__header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .story-add-link-modal__title {
        font-size: 14px;
        font-weight: 700;
      }

      .story-add-link-modal__remove-button {
        font-size: 12px;
        font-weight: 700;
        color: #C47581;
        user-select: none;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0s;
      }
      .story-add-link-modal_has-link .story-add-link-modal__remove-button {
        opacity: 1;
        pointer-events: all;
        transition-delay: 2000ms;
      }

      .story-add-link-modal__input {
        margin-top: 16px;
        background: #F7F7F9;
        border: 1px solid #EFEFEF;
        border-radius: 3px;
        padding: 10px 8px;
        color: #262626;
        font-size: 14px;
      }
      .story-add-link-modal__input::placeholder {
        color: #262626;
        opacity: 0.3;
      }
      .theme-night .story-add-link-modal__input {
        border-color: #1F1F1F;
        background: #080808 !important;
      }
      .theme-night .story-add-link-modal__input::placeholder {
        color: #B3B2B2;
      }

      .story-add-link-modal__info {
        margin-top: 8px;
        color: #B6B6B6;
        font-size: 12px;
        line-height: 16px;
        display: block;
      }
      .story-add-link-modal__info_default {}
      .story-add-link-modal__info_pro {
        display: flex;
        flex-direction: row;
      }
      .story-add-link-modal_need-pro .story-add-link-modal__info_default,
      .story-add-link-modal:not(.story-add-link-modal_need-pro) .story-add-link-modal__info_pro {
        display: none;
      }

      .story-add-link-modal__info-pro-badge {
        flex-shrink: 0;
        margin-right: 12px;
        padding: 2px 8px 3px;
        border-radius: 3px;
        background: linear-gradient(183deg, #fd7726 -14%, #ef1834 60%, #c70bc0 128%);
        font-size: 9px;
        line-height: 11px;
        font-weight: 600;
        color: #FFF;
        align-self: flex-start;
        position: relative;
        top: 2px;
      }
      .theme-night .story-add-link-modal__info-pro-badge {
        filter: url(#theme-reverse-filter);
      }

      .story-add-link-modal_has-pro .story-add-link-modal__trial-message {
        display: none;
      }

      .story-add-link-modal__buttons {
        display: flex;
        flex-direction: row;
        margin-top: 16px;
      }

      .story-add-link-modal__button {
        color: #FFF;
        background: #1BA2F9;
        border: none;
        margin-right: 12px;
        cursor: pointer;
        padding: 5px 12px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 4px;
        font-weight: 600;
        user-select: none;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .story-add-link-modal__button:last-child {
        margin-right: 0;
      }
      .story-add-link-modal__button_pro {
        background: #FFCC24;
      }
      .story-add-link-modal__button_save {}
      .story-add-link-modal__button_cancel {
        color: #262626;
        border: 1px solid #dbdbdb;
        background: transparent;
      }
      .story-add-link-modal_saving .story-add-link-modal__button_save {
        pointer-events: none;
        opacity: 0.3;
      }
      .story-add-link-modal_need-pro .story-add-link-modal__button_save,
      .story-add-link-modal:not(.story-add-link-modal_need-pro) .story-add-link-modal__button_pro {
        display: none;
      }
      .theme-night .story-add-link-modal__button_save {
        color: #000;
      }
      .theme-night .story-add-link-modal__button_pro {
        color: #000;
        filter: url(#theme-reverse-filter);
      }
    </style>
  `}(),function(){const t=Symbol("handled");p((()=>{requestAnimationFrame((async()=>{const e=f(".story-add-link-modal");if(!e)return;if(e[t])return;e[t]=!0,mn="";const{hasEnoughFollowers:n,needProUpgrade:o,hasProPaid:i,trialLeftCount:r}=await K.send("story-link.get-user-data");bn.hasEnoughFollowers=n,s.classList.toggle("story-add-link-button--locked",!n),e.classList.toggle("story-add-link-modal_need-pro",o),e.classList.toggle("story-add-link-modal_has-pro",i),f(".story-add-link-modal__trial-left-count").innerText=r,be({class:"story-add-link-button__tooltip",anchor:f(".story-add-link-button"),text:n?"Add Swipe Up Link":"Swipe Up Links available for<br>accounts of 10k+ followers"})}))}))}(),function(){const t=t=>{f(".story-add-link-modal").classList.toggle("story-add-link-modal_shown",t)},e=t=>{const e=f(".story-add-link-modal"),n=f(".story-add-link-button"),o=f(".story-add-link-modal__input");let i;i=t?/^https?:\/\//.test(t)?t:`https://${t}`:"",mn=i,o.value=i,e.classList.toggle("story-add-link-modal_has-link",!!i),n.classList.toggle("story-add-link-button_has-link",!!i)};document.addEventListener("keydown",(t=>{if("Escape"===t.key){const t=f(".story-add-link-modal__button_cancel");if(!t)return;t.click()}else if("Enter"===t.key){if(!t.target.closest(".story-add-link-modal__input"))return;if(t.target.closest(".story-add-link-modal_need-pro"))return;f(".story-add-link-modal__button_save").click()}})),document.addEventListener("click",(n=>{const o=f(".story-add-link-modal__input");if(n.target.closest(".story-add-link-button")){if(!bn.hasEnoughFollowers)return;t(!0),o.focus()}else if(n.target.closest(".story-add-link-modal__button_save")){e(o.value),f(".story-add-link-modal"),K.send("story-link.save-click");const n=f(".story-add-link-modal"),i=f(".story-add-link-modal__button_save"),r=i.innerText;n.classList.add("story-add-link-modal_saving"),i.innerText="Saving...",setTimeout((()=>{t(!1),n.classList.remove("story-add-link-modal_saving"),i.innerText=r}),2e3)}else n.target.closest(".story-add-link-modal__button_cancel")?(o.value=mn,t(!1)):n.target.closest(".story-add-link-modal__button_pro")?K.send("story-link.upgrade-to-pro-click"):n.target.closest(".story-add-link-modal__remove-button")?(e(""),t(!1)):n.target.closest(".story-add-link-modal")&&!n.target.closest(".story-add-link-modal__window")&&(o.value=mn,t(!1))}))}(),function(){const t=hn.post.bind(hn);hn.post=(...e)=>("/create/configure_to_story/"===e[0]&&mn&&(K.send("story-link.story-with-link-submit"),e[1]={...e[1],story_cta:JSON.stringify([{links:[{webUri:mn}]}])}),t(...e))}()}};let fn,hn,mn;const bn={hasEnoughFollowers:!1};var vn={init:function(){!async function(){const t=st.getConfig(),e=await lt("gatekeeper");if(!e)return;const n=e.passesGatekeeper.bind(e);e.originalPassesGatekeeper=n,e.passesGatekeeper=(...e)=>{const o=String(e[0]);return t.ig.gatekeeperIds.includes(o)||n(...e)}}()}};var yn=".XrOey:nth-child(3)",xn=".ctQZg button",wn=".Yx5HN h1",_n=".uYzeu",kn=".IJeHu > div > div",Pn=".Dh40d",Sn=".Yx5HN .Dh40d h2",Cn=".Yx5HN .Dh40d svg",En='[data-visualcompletion="loading-state"]',Tn=".czW__ > div:first-child .RJJyf > button",An=".YAPUk button:nth-child(5)",$n=".brfp7 div:not([class])",Ln=".PxObI",Rn=":not(.n6uTB) + .n6uTB",Fn=".n6uTB + .n6uTB",Mn=".W4P49",zn=".WaOAr .yWX7d",In='img[src*="creation/spinner"]',Dn=".czW__ > .Xf6Yq",Bn={init:function(t){On=t,function(){if(On.isMobileSession)return;const t=Symbol("handled");p((()=>{if(On.isMobileSession)return;if(!On.creatingReels)return;if(!!!f(Ln))return;const e=f(zn);if(!e)return;if(e[t])return;e[t]=!0,e.textContent="Authorize Reels API →",e.style.marginLeft="-90px",e.style.whiteSpace="nowrap",e.addEventListener("click",(t=>{On.isMobileSession||(t.preventDefault(),t.stopPropagation(),async function(){const t=Hn();ne("desktop-reels.drop-session"),await wt(300);const e=600,n=700,o=Math.round(screen.width/2-e/2),i=`status,scrollbars,toolbar,top=${Math.round(screen.height/2-n/2)},left=${o},width=${e},height=${n}`,r="https://www.instagram.com/accounts/login/",a="desktop-reels.auth-window",s=window.open(r,a,i);await new Promise((t=>{const e=setInterval((()=>{s.closed&&(clearInterval(e),t())}),100)}));const l=Hn();if(t!==l)return void location.reload();On.isMobileSession=!0;const d=f(zn);d&&d.click()}())}),{useCapture:!0});const n=f(kn);n&&n.insertAdjacentHTML("afterbegin",'\n      <div class="ReelsAuthDisclaimer">\n        <div class="ReelsAuthDisclaimer__title">\n          Authorize Reels API\n        </div>\n        <div class="ReelsAuthDisclaimer__text">\n          You will be asked to relogin as a part of authorization.\n          Once authorized, you can post Reels.\n        </div>\n      </div>\n    ')})),c`
    <style>
      .ReelsAuthDisclaimer {
        margin-top: 16px;
        margin-bottom: 16px;
        padding-left: 13px;
        border-left: 2px solid #0095f6;
      }

      .ReelsAuthDisclaimer__title {
        margin-bottom: 10px;
        font-weight: 600;
        font-size: 16px;
      }

      .ReelsAuthDisclaimer__text {
        color: #676767;
      }
    </style>
  `}()}};let On;function Hn(){return document.cookie.match(/ds_user_id=([^;]+)/)[1]||null}var jn={init:async function(){if(Nn=await lt("http"),Vn=await lt("gatekeeper"),Wn=await lt("add-dispatch-listener"),!Nn||!Vn||!Wn)return;const t=await l((()=>window.inssist.desktopReelsData));Object.assign(Un,t),function(){const t=Symbol("handled");p((()=>{if(!Un.creatingReels)return;const e=f(wn);if(e){if(e[t])return;e[t]=!0,e.innerText="New Reel / Powered by INSSIST"}const n=f(Sn);if(n){if(n[t])return;n[t]=!0,n.innerText="Drag video for your Reel here."}const o=f(Cn);if(o){if(o[t])return;o.setAttribute("width","77"),o.setAttribute("height","77"),o.setAttribute("viewBox","0 0 24 24"),o.innerHTML='\n        <path\n          d="M15.548 14.007l-.006-.005-.006-.004-4.696-2.73s0 0 0 0a.736.736 0 00-.381-.113.73.73 0 00-.373.108c-.262.11-.407.371-.407.662v5.464c0 .262.155.511.398.658h0l.009.004a.899.899 0 00.352.098.88.88 0 00.314-.069l.063-.022.012-.004.012-.006 4.697-2.732h0l.001-.001a.743.743 0 00.357-.658c0-.259-.152-.505-.346-.65zM20.764 3.85h0l-.003-.004c-.534-.513-1.125-.945-1.943-1.247-.816-.301-1.85-.47-3.264-.47h-6.5c-1.394 0-2.417.169-3.233.476-.818.307-1.42.75-1.974 1.283h0l-.003.004C3.33 4.428 2.9 5.02 2.599 5.834c-.3.812-.469 1.837-.469 3.234v6.514c0 1.396.169 2.432.475 3.255.306.824.748 1.428 1.282 1.964l.002.002c.534.513 1.126.945 1.943 1.246.816.302 1.85.47 3.264.47h6.5c1.394 0 2.428-.168 3.249-.475.823-.307 1.425-.75 1.96-1.285l.001-.002c.513-.535.944-1.128 1.245-1.947.3-.817.469-1.853.469-3.27V9.068c0-1.397-.169-2.422-.475-3.24-.306-.819-.748-1.422-1.28-1.977zm-5.168-.2c1.31 0 2.174.166 2.788.41.612.244.985.567 1.314.896.466.468.897 1.045 1.149 2.216h-3.665L15.19 3.65h.406zm-6.948 0h4.734l1.991 3.522H10.64L8.648 3.65zM4.952 4.957c.435-.436.982-.87 2.065-1.12l1.897 3.336h-5.11c.25-1.17.682-1.748 1.148-2.216zm16.05 10.667c0 1.313-.167 2.178-.41 2.794-.243.613-.565.987-.894 1.316-.328.33-.712.652-1.33.896-.62.244-1.482.411-2.772.411H9.054c-1.31 0-2.174-.167-2.788-.411-.612-.243-.985-.566-1.314-.896a3.699 3.699 0 01-.893-1.332c-.244-.62-.41-1.486-.41-2.778v-6.93h17.353v6.93z"\n          fill="currentColor"\n          stroke="#FFF"\n          stroke-width=".8"\n        />\n      '}})),c`
    <style>
      .reels--creating ${Dn},
      .reels--creating ${$n},
      .reels--creating ${Rn},
      .reels--creating ${Fn},
      .reels--creating ${Mn} {
        display: none !important;
      }
    </style>
  `}(),he(Nn,{isCreatingReels:()=>Un.creatingReels,isSharingToFeed:()=>Un.shareToFeed,onSuccess:()=>{Un.hasPro||(Un.freeReels-=1),ne("desktop-reels.submit-success",1)}}),function(){const t=Symbol("handled");p((()=>{if(!Un.creatingReels)return;const e=f(Tn);if(!e)return;if(e[t])return;e[t]=!0,e.click();f(An).click(),e.click()}))}(),function(){const t=Symbol("handled");p((()=>{if(!Un.creatingReels)return;const e=f(Rn);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("beforebegin",'\n      <div class="ShareToFeed">\n        <div class="ShareToFeed__switch">\n          <div class="ShareToFeed__switchLabel">\n            Also Share to Feed\n          </div>\n          <div class="ShareToFeed__switchControl"></div>\n        </div>\n      </div>\n    ');const n=f(".ShareToFeed");n.addEventListener("click",(()=>{Un.shareToFeed=!Un.shareToFeed,n.classList.toggle("ShareToFeed_on",Un.shareToFeed)}))})),c`
    <style>
      .ShareToFeed {
        padding:  14px 16px 14px 17px;
        border-top: 1px solid #DBDBDB;
      }

      .ShareToFeed__noSupport {
        margin-bottom: 12px;
      }

      .ShareToFeed__noSupportTitle {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .ShareToFeed__noSupportText {
        max-width: 320px;
        color: #676767;
      }

      .ShareToFeed__switch {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        user-select: none;
      }

      .ShareToFeed__switchLabel {
        font-size: 16px;
        color: #262626;
      }

      .ShareToFeed__switchControl {
        width: 44px;
        height: 28px;
        position: relative;
        background: #8E8E8E;
        border-radius: 28px;
      }
      .ShareToFeed__switchControl::before { /* thumb */
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #FFF;
        transition: transform 0.3s;
      }
      .ShareToFeed_on .ShareToFeed__switchControl {
        background: #0095F6;
      }
      .ShareToFeed_on .ShareToFeed__switchControl::before {
        transform: translateX(16px);
      }
    </style>
  `}(),function(){if(Un.hasPro)return;const t=Symbol("handled");p((()=>{if(!Un.creatingReels)return;if(!f(zn))return;const e=f(_n);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("beforebegin",`\n      <div class="ReelsUpgradeToProBar">\n        <div class="ReelsUpgradeToProBar__text">\n          Free Reels Remaining: ${Un.freeReels} / ${Un.maxFreeReels}\n        </div>\n        <button class="ReelsUpgradeToProBar__button">\n          Get Unlimited Reels\n        </button>\n      </div>\n    `);f(".ReelsUpgradeToProBar__button").addEventListener("click",(()=>{ne("desktop-reels.open-billing","keep-ig-tab")}))})),c`
    <style>
      .ReelsUpgradeToProBar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 8px 16px;
        border-bottom: 1px solid #ddd;
        font-size: 15px;
      }

      .ReelsUpgradeToProBar__text {
        font-size: 15px;
        margin-right: 24px;
      }

      .ReelsUpgradeToProBar__button {
        color: #0095F6;
        border: none;
        cursor: pointer;
        padding: 0;
        font-weight: 500;
        font-size: inherit;
        background: transparent;
      }
    </style>
  `}(),function(){if(Un.hasPro)return;const t=Symbol("handled");p((()=>{if(Un.freeReels>0)return;if(!Un.creatingReels)return;const e=f(Pn);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("beforeend",`\n      <div class="ReelsUpgradeScreen">\n        <img\n          class="ReelsUpgradeScreen__icon"\n          src="${window.inssist.url}img/rocket.png"/>\n        <div class="ReelsUpgradeScreen__text">\n          Reels posting is a PRO feature powered by Inssist.<br/>\n          Please consider upgrading to continue posting Reels.\n        </div>\n        <button class="ReelsUpgradeScreen__button">\n          UPGRADE TO PRO\n        </button>\n      </div>\n    `);f(".ReelsUpgradeScreen__button").addEventListener("click",(()=>{ne("desktop-reels.open-billing",1)}))})),c`
    <style>
      .ReelsUpgradeScreen {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ReelsUpgradeScreen__icon {
        width: 64px;
        height: 64px;
        margin-bottom: 24px;
      }

      .ReelsUpgradeScreen__text {
        font-size: 16px;
        line-height: 1.5;
        text-align: center;
        margin-bottom: 24px;
      }

      .ReelsUpgradeScreen__button {
        color: #000;
        border: none;
        background: #FFCC24;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 24px;
        cursor: pointer;
        user-select: none;
      }
    </style>
  `}(),function(){const t=Symbol("handled");p((()=>{if(!Un.creatingReels)return;const e=f('[accept*="video/mp4"]');e&&(e[t]||(e[t]=!0,e.setAttribute("accept","video/mp4,video/quicktime")))}))}(),Wn((t=>{"NAVIGATION_FEED_CREATION_CLOSE"===t.type&&(s.classList.remove("reels--creating"),Un.shareToFeed=!1,Un.creatingReels=!1)})),Bn.init(Un)},startReelsCreationSession:function(){if(s.classList.add("reels--creating"),Un.creatingReels=!0,!window.cookieStore)return;ne("desktop-reels.get-initial-data"),window.cookieStore.addEventListener("change",(function t(e){const n=e.changed.find((t=>"desktop-reels.initial-data"===t.name));if(!n)return;window.cookieStore.removeEventListener("change",t);const o=JSON.parse(n.value);Object.assign(Un,o)}))}};let Nn,Vn,Wn;const Un={shareToFeed:!1,creatingReels:!1,hasPro:!0,freeReels:0,maxFreeReels:0,isMobileSession:!1};var qn={init:async function(){if(Yn=await lt("nav"),Xn=await lt("http"),Gn=await lt("store"),!Yn||!Xn||!Gn)return;c`
    <style>
      ${En} {
        position: absolute;
        top: 0;
      }
    </style>
  `,function(){const t=Symbol("handled");p((()=>{const e=f(xn);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("afterend",'\n    <div class="CreationPopup">\n      <div class="CreationPopup__option" data-id="post">\n        <svg class="CreationPopup__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n          <path\n            d="M7.164 22.654A5.17 5.17 0 012 17.49V7.164A5.17 5.17 0 017.164 2H17.49a5.17 5.17 0 015.164 5.164V17.49a5.17 5.17 0 01-5.164 5.164zm0-1.757H17.49a3.794 3.794 0 003.41-3.407V14.8l-3.68-3.661-4.394 5.934L8 14.866 3.766 17.7a3.832 3.832 0 003.398 3.2zM3.757 7.164v8.4L7.8 12.785l4.5 2.081 4.681-6.525 3.919 3.922v-5.1a3.794 3.794 0 00-3.41-3.406H7.164a3.794 3.794 0 00-3.407 3.407zm3.943.874a1.709 1.709 0 111.7 1.708 1.709 1.709 0 01-1.7-1.708z"\n            fill="currentColor"\n            stroke="#fff"\n            stroke-width=".4"\n          />\n        </svg>\n        New Post\n      </div>\n      <div class="CreationPopup__option" data-id="reel">\n        <svg class="CreationPopup__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n          <path\n            d="M15.548 14.007l-.006-.005-.006-.004-4.696-2.73s0 0 0 0a.736.736 0 00-.381-.113.73.73 0 00-.373.108c-.262.11-.407.371-.407.662v5.464c0 .262.155.511.398.658h0l.009.004a.899.899 0 00.352.098.88.88 0 00.314-.069l.063-.022.012-.004.012-.006 4.697-2.732h0l.001-.001a.743.743 0 00.357-.658c0-.259-.152-.505-.346-.65zM20.764 3.85h0l-.003-.004c-.534-.513-1.125-.945-1.943-1.247-.816-.301-1.85-.47-3.264-.47h-6.5c-1.394 0-2.417.169-3.233.476-.818.307-1.42.75-1.974 1.283h0l-.003.004C3.33 4.428 2.9 5.02 2.599 5.834c-.3.812-.469 1.837-.469 3.234v6.514c0 1.396.169 2.432.475 3.255.306.824.748 1.428 1.282 1.964l.002.002c.534.513 1.126.945 1.943 1.246.816.302 1.85.47 3.264.47h6.5c1.394 0 2.428-.168 3.249-.475.823-.307 1.425-.75 1.96-1.285l.001-.002c.513-.535.944-1.128 1.245-1.947.3-.817.469-1.853.469-3.27V9.068c0-1.397-.169-2.422-.475-3.24-.306-.819-.748-1.422-1.28-1.977zm-5.168-.2c1.31 0 2.174.166 2.788.41.612.244.985.567 1.314.896.466.468.897 1.045 1.149 2.216h-3.665L15.19 3.65h.406zm-6.948 0h4.734l1.991 3.522H10.64L8.648 3.65zM4.952 4.957c.435-.436.982-.87 2.065-1.12l1.897 3.336h-5.11c.25-1.17.682-1.748 1.148-2.216zm16.05 10.667c0 1.313-.167 2.178-.41 2.794-.243.613-.565.987-.894 1.316-.328.33-.712.652-1.33.896-.62.244-1.482.411-2.772.411H9.054c-1.31 0-2.174-.167-2.788-.411-.612-.243-.985-.566-1.314-.896a3.699 3.699 0 01-.893-1.332c-.244-.62-.41-1.486-.41-2.778v-6.93h17.353v6.93z"\n            fill="currentColor"\n            stroke="#fff"\n            stroke-width=".25"\n          />\n        </svg>\n        New Reel\n      </div>\n      <div class="CreationPopup__option" data-id="igtv">\n        <svg class="CreationPopup__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n          <path\n            d="M22.643 10.555c-.007-.53-.023-.874-.045-1.35v-.109a7.646 7.646 0 00-.478-2.512 5.3 5.3 0 00-3.039-3.04 7.729 7.729 0 00-2.509-.48 47.27 47.27 0 00-2.311-.057l1.3-1.412a.941.941 0 00-.07-1.347.966.966 0 00-1.358.064l-1.806 1.96L10.529.314a.973.973 0 00-1.36-.066.944.944 0 00-.317.659.921.921 0 00.253.686L10.4 3.009c-1.088.005-1.5.017-2.311.055a7.771 7.771 0 00-2.512.48 5.1 5.1 0 00-1.838 1.2 5.147 5.147 0 00-1.2 1.841 7.74 7.74 0 00-.477 2.516C2.012 10.186 2 10.548 2 13.332s.012 3.146.062 4.236a7.673 7.673 0 00.481 2.509 5.322 5.322 0 003.037 3.04 7.62 7.62 0 002.512.483c1.088.047 1.415.057 4.238.057s3.151-.01 4.236-.057a7.565 7.565 0 002.509-.483 5.3 5.3 0 003.039-3.04 7.578 7.578 0 00.478-2.509c.052-1.061.062-1.382.062-4.236 0-1.34 0-2.177-.012-2.777m-1.959 2.777c0 1.432 0 2.165-.01 2.7-.01.555-.025.9-.047 1.434v.007a5.654 5.654 0 01-.352 1.89 3.326 3.326 0 01-1.915 1.91 5.463 5.463 0 01-1.885.349c-1.058.05-1.38.06-4.145.06s-3.087-.01-4.147-.06a5.538 5.538 0 01-1.882-.345 3.139 3.139 0 01-1.157-.753 3.128 3.128 0 01-.756-1.157 5.691 5.691 0 01-.347-1.89c-.047-1.045-.062-1.325-.062-4.144s.015-3.1.062-4.147a5.6 5.6 0 01.343-1.885 3.072 3.072 0 01.756-1.16A3.137 3.137 0 016.3 5.385a5.679 5.679 0 011.888-.349c1.07-.047 1.392-.057 4.147-.057s3.077.01 4.145.057a5.617 5.617 0 011.885.349 3.16 3.16 0 011.162.756 3.049 3.049 0 01.748 1.16 5.53 5.53 0 01.352 1.885c.047 1.07.057 1.395.057 4.147"\n            fill="currentColor"\n            stroke="#fff"\n            stroke-width=".55"/>\n          <path d="M11.475 14.88v-1.45a.124.124 0 00-.158-.119l-4.012 1.155a.93.93 0 01-1.185-.827.945.945 0 01.694-.966l5.57-1.6a.743.743 0 01.949.714v1.449a.124.124 0 00.158.119l3.859-1.112a.93.93 0 011.185.827.943.943 0 01-.694.965l-5.417 1.561a.743.743 0 01-.949-.714"\n            fill="currentColor"\n            stroke="#fff"\n            stroke-width=".55"/>\n        </svg>\n        New IGTV\n      </div>\n      <div class="CreationPopup__poweredBy">\n        Powered by INSSIST\n      </div>\n    </div>\n  '),e.addEventListener("click",(t=>{t.preventDefault(),t.stopPropagation(),Jn()}))))})),document.addEventListener("click",(()=>{Jn(!1)})),document.addEventListener("click",(t=>{const e=t.target.closest(".CreationPopup__option");if(!e)return;!function(t){"post"===t?Gn.dispatch({type:"NAVIGATION_FEED_CREATION_OPEN"}):"reel"===t?(jn.startReelsCreationSession(),Gn.dispatch({type:"NAVIGATION_FEED_CREATION_OPEN"})):"igtv"===t&&Yn.push("/tv/upload")}(e.dataset.id)}))}(),c`
    <style>
      /* show new post menu item when creation injection is ready */
      ${yn} {
        display: flex;
      }

      .CreationPopup {
        position: absolute;
        width: 170px;
        top: calc(100% + 15px);
        padding-top: 8px;
        background: #fff;
        transform: translateX(calc(-50% + 11px));
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        transition: transform 0.3s, opacity 0.3s;
        user-select: none;
      }
      .CreationPopup:not(.CreationPopup_show) {
        pointer-events: none;
        transform: translateX(calc(-50% + 11px)) translateY(-8px);
        opacity: 0;
      }

      /* triangle  */
      .CreationPopup::before {
        content: '';
        width: 14px;
        height: 14px;
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        background: inherit;
        box-shadow: inherit;
      }

      .CreationPopup::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: inherit;
        border-radius: inherit;
      }

      .CreationPopup__option {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 16px;
        cursor: pointer;
        position: relative;
        z-index: 1;
      }
      .CreationPopup__option:hover {
        background: #fafafa;
      }

      .CreationPopup__icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }

      .CreationPopup__poweredBy {
        position: relative;
        z-index: 1;
        padding-top: 3px;
        padding-bottom: 2px;
        margin-top: 8px;
        font-size: 9px;
        text-align: center;
        color: #415B72;
        background: #F7F7F9;
        border-radius: 0 0 4px 4px;
      }
    </style>
  `,function(){const t=Symbol("handled");p((()=>{const e=f(In);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("afterend",'\n      <div class="PublishingTitle">\n        Publishing Post...\n      </div>\n      <div class="PublishingDisclaimer">\n        Waiting for Instagram to publish the post, this\n        might take a&nbsp;few minutes. Please keep this\n        tab open until Inssist confirms the publish is complete.\n      </div>\n    '),p((function t(){if(f(In))return;p.off(t);const e=f(".PublishingTitle"),n=f(".PublishingDisclaimer");e&&e.remove(),n&&n.remove()}))))})),c`
    <style>
      .PublishingTitle {
        margin-top: 16px;
        margin-bottom: 16px;
        font-size: 22px;
        font-weight: 300;
        line-height: 17px;
        color: #262626;
        text-align: center;
      }

      .PublishingDisclaimer {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        width: 400px;
        color: #A0A0A0;
        text-align: center;
        line-height: 1.45;
      }
    </style>
  `}()}};let Yn,Xn,Gn;function Jn(t){const e=f(".CreationPopup");e&&e.classList.toggle("CreationPopup_show",t)}var Kn={init:function(){if(Zn=!!window.electron,Qn=o.isIframe()&&o.getParams().isElectron,!Zn&&!Qn)return;Zn&&K.on("electron-links.open-url",to);document.addEventListener("click",(t=>{const e=t.target.closest("a");if(!e)return;if("_blank"!==e.getAttribute("target"))return;const n=e.getAttribute("href");n.startsWith("/")||(t.preventDefault(),t.stopPropagation(),Qn?K.send("electron-links.open-url",n):to(n))}),{capture:!0})}};let Zn,Qn;function to(t){chrome.tabs.create({url:t,active:!0})}var eo={init:function(){K.on("cdn-proxy.fetch-url",no)}};async function no(t){var e;if(!t)return null;let n;try{n=await fetch(t)}catch(t){}if(null===(e=n)||void 0===e?void 0:e.ok){const t=await n.blob();return URL.createObjectURL(t)}return null}function oo(){const t=[];return Object.assign(e,{handle:function(t){if("function"!=typeof t)return void console.error("function is expected");e(t)},clear:function(){t.length=0},off:function(e){const n=t.indexOf(e);-1!==n&&t.splice(n,1)},isEmpty:function(){return 0===t.length}});function e(...e){"function"==typeof e[0]?t.push(e[0]):t.forEach((t=>t(...e)))}}var io={getState:async function(){const t=await lt("store"),e=await l((()=>t.getState()));return JSON.parse(JSON.stringify(e))},ensureElems:function(t){for(const e of Object.values(t)){if(!e)return null;if(Array.isArray(e)&&0===e.length)return null}return t},requireIgModule:lt,require:lt,docElem:document.documentElement,onDomReady:oo(),onDocClick:oo(),onPathChange:oo(),onBeforePostCreation:oo(),onBeforeStoryCreation:oo(),onMediaProcessingError:oo()};function ro(t){let e="";if(t<0&&(e="-",t=-t),t<1)return e+String(Number.isInteger(t)?t:t.toFixed(3));if(t<10)return e+String(Number.isInteger(t)?t:t.toFixed(2));if(t<100)return e+String(Number.isInteger(t)?t:t.toFixed(1));if(t<1e3)return e+String(Number.isInteger(t)?t:t.toFixed(1));const n=["k","m","b","t"];let o=null,i=null;for(let e=0;e<n.length;e++)if(t<Math.pow(1e3,e+2)){if(i=n[e],o=t/Math.pow(1e3,e+1),o=o<10?Math.round(100*o)/100:o<100?Math.round(10*o)/10:Math.round(o),o>=1e3)continue;break}return o?e+String(o)+i:e+"999t+"}let ao,so,lo=!1,co=!1,po=!1,uo=!1;var go={on:function(t={}){po=!0,void 0!==t.mouseEventsAllowed&&(uo=t.mouseEventsAllowed);if(co)return;co=!0,function(){const t=[window,document.documentElement],e=["ontouchstart","ontouchmove","ontouchcancel","ontouchend"];for(let n=0;n<t.length;n++)for(let o=0;o<e.length;o++)t[n]&&void 0===t[n][e[o]]&&(t[n][e[o]]=null)}(),function(){const t=350;let e=!1,n=null;const o=()=>{n=Date.now()},i=()=>{e=Date.now()-n>t},r=t=>{e&&(e=!1,mo(t))};document.addEventListener("touchstart",o,!0),document.addEventListener("touchend",i,!0),document.addEventListener("click",r,!0)}(),window.addEventListener("mousedown",bo("touchstart"),!0),window.addEventListener("mousemove",bo("touchmove"),!0),window.addEventListener("mouseup",bo("touchend"),!0)},off:function(){po=!1}};function fo(t,e,n,o,i){o=o||0,i=i||0,this.identifier=e,this.target=t,this.clientX=n.clientX+o,this.clientY=n.clientY+i,this.screenX=n.screenX+o,this.screenY=n.screenY+i,this.pageX=n.pageX+o,this.pageY=n.pageY+i}function ho(){const t=[];return t.item=function(t){return this[t]||null},t.identifiedTouch=function(t){return this[t+1]||null},t}function mo(t){uo||(t.preventDefault(),t.stopPropagation())}function bo(t){return function(e){po&&(e.target.closest("textarea")||e.target.closest("input")||e.target.closest("select")||mo(e),1===e.which&&(("mousedown"===e.type||!so||so&&!so.dispatchEvent)&&(so=e.target),lo&&!e.shiftKey&&(vo("touchend",e),lo=!1),vo(t,e),!lo&&e.shiftKey&&(lo=!0,ao={pageX:e.pageX,pageY:e.pageY,clientX:e.clientX,clientY:e.clientY,screenX:e.screenX,screenY:e.screenY},vo("touchstart",e)),"mouseup"===e.type&&(ao=null,lo=!1,so=null)))}}function vo(t,e){const n=document.createEvent("Event");n.initEvent(t,!0,!0),n.altKey=e.altKey,n.ctrlKey=e.ctrlKey,n.metaKey=e.metaKey,n.shiftKey=e.shiftKey,n.touches=xo(e,t),n.targetTouches=xo(e,t),n.changedTouches=function(t,e){const n=yo(t);!lo||"mouseup"===t.type||"touchstart"!==e&&"touchend"!==e||n.splice(0,1);return n}(e,t),so.dispatchEvent(n)}function yo(t){const e=new ho;if(lo){const n=75,o=ao.pageX-t.pageX,i=ao.pageY-t.pageY;e.push(new fo(so,1,ao,-1*o-n,-1*i+n)),e.push(new fo(so,2,ao,o+n,i-n))}else e.push(new fo(so,1,t,0,0));return e}function xo(t,e){if("mouseup"===t.type)return new ho;const n=yo(t);return lo&&"mouseup"!==t.type&&"touchend"===e&&n.splice(1,1),n}var wo={init:function(){ko=st.getConfig(),_o=ko.igSelectors,function(){const t=XMLHttpRequest.prototype.open,e=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.open=function(e,n){return this.method=e,this.url=n,this.addEventListener("readystatechange",(()=>{if(429!==this.status)return;const[t,e]=n.split("?"),o=(e||"").split("&"),i=o.indexOf("__a=1");-1!==i&&(o.splice(i,1),location.href=`${t}?${o.join("&")}`)})),t.apply(this,arguments)},XMLHttpRequest.prototype.send=function(t){return"POST"===this.method&&"/create/configure/"===this.url&&(t=function(t,e){if(!t||0===t.length)return t;let n=t.split("&");return n=n.map((t=>{if(0!==t.indexOf("caption="))return t;let n="";return t.split("%23").forEach(((t,o)=>{n+=0===o?t:o<=e?"%23"+t:t})),n})),n.join("&")}(t,30)),e.call(this,t)}}(),c`
    <style>
      * {
        outline: none;
      }

      ${_o.general.main} {
        margin-bottom: 0 !important;
      }

      ${_o.general.mainContent} {
        margin-bottom: 0 !important;
      }

      ${_o.general.nextPageLoaderProfile},
      ${_o.general.nextPageLoaderFeedAndExplore} {
        margin-top: 30px !important;
        margin-bottom: 30px;
      }

      ${_o.general.settingsRectangle} {
        margin-top: 25px !important;
      }

      ${_o.general.bottomNotification} {
        left: 8px !important;
        right: 8px !important;
        margin-bottom: 66px !important;
        border-radius: 4px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      }
      ${_o.general.bottomNotification} * {
        color: #333 !important;
        background: #FFF !important;
      }

      ${_o.dragPanel.root} {
        user-select: none;
      }

      ${_o.commentsPage.comment} {
        user-select: initial !important;
      }
    </style>
  `,c`
    <style>
      .theme-night {
        background: #fff !important;
      }

      .theme-night [aria-label*="Carousel"],              /* user page post type carousel */
      .theme-night [aria-label*="Video"],                 /* user page post type video */
      .theme-night [aria-label*="IGTV"],                  /* user page post type igtv */
      .theme-night .mediaActions,                         /* post download and go to actions */
      .theme-night div._5cOAs,                            /* igtv video card */
      .theme-night canvas,                                /* new story and post filter canvases */
      .theme-night div.rMz8x,                             /* new story marker controls */
      .theme-night div.C3Vzn,                             /* new story text controls */
      .theme-night button.videoSpritePlayButton,          /* new story play video button */
      .theme-night div#react-root > section > header,     /* new story header */
      .theme-night span.videoSpritePlayButton,            /* post like animation image */
      .theme-night div.coreSpriteRightChevron,            /* carousel post next button */
      .theme-night div.coreSpriteLeftChevron,             /* carousel post previous button */
      .theme-night li.-V_eO,                              /* igtv hover plays and comments count */
      .theme-night header.kj03O div._6ZEdQ,               /* story view header paginator */
      .theme-night header.kj03O div._g3zU,                /* story view header buttons */
      .theme-night header.kj03O a.notranslate,            /* story view header username */
      .theme-night footer.mLi3m,                          /* story view footer */
      .theme-night header.iuGAs,                          /* new story header */
      .theme-night footer._Z29A,                          /* new story footer */
      .theme-night div.m1lpM {                            /* new story marker controls */
        -webkit-filter: url(#theme-reverse-filter) !important;
        filter: url(#theme-reverse-filter) !important;
      }
      .theme-night div.RnEpo.Yx5HN,
      .theme-night div.cDEf6 {                            /* new post edit caption overlay */
        background-color: rgba(255, 255, 255, 0.65) !important;
      }
      .theme-night div.RnEpo.xpORG._9Mt7n {               /* new story stickers overlay */
        background-color: rgba(255, 255, 255, 0.3) !important;
      }
      .theme-night [role="dialog"]:not(.xr65t),           /* remove post dialog (but not story dialog) */
      .theme-night section.IyyUN,                         /* story view background */
      .theme-night div#react-root > section >             /* new story video background */
        div[role="button"][tabindex="0"] {
        background-color: white !important;
      }
      .theme-night header.kj03O {                         /* story view header */
        background: linear-gradient(to bottom,white,transparent) !important;
      }
      .theme-night h1 > a > img {                         /* instagram logo */
        filter: brightness(3) !important;
      }
      .theme-night .y3zKF:not(.yWX7d) {                   /* follow activity buttons */
        color: black !important;
      }
      .theme-night footer.mLi3m img._6q-tv {              /* story footer user avatars */
        filter: brightness(1) !important;
      }


      /* dm badge counter */
      .theme-night .TKi86 {
        filter: url(#theme-reverse-filter);
      }

      /* activity badge counter */
      .theme-night .nHGTw .WKY0a {
        filter: url(#theme-reverse-filter);
      }

      /* activity badge icon */
      .theme-night .nHGTw [class^="glyphsSprite"] {
        filter: url(#theme-reverse-filter);
      }

      /* "follow" button */
      .theme-night .jIbKX {
        color: #000 !important;
      }

      /* dropdown icon */
      .theme-night .coreSpriteDropdownArrowWhite {
        filter: url(#theme-reverse-filter);
      }

      /* modal window */
      .theme-night .RnEpo [role="dialog"] {
        box-shadow: 0 0px 12px rgba(0, 0, 0, 0.1) !important;
      }

      /* media type icons in profile grid */
      .theme-night .u7YqG svg {
        filter: url(#theme-reverse-filter);
      }

      /* explore post type icon */
      .theme-night .BcNgP svg {
        filter: url(#theme-reverse-filter);
      }

      /* story creator's contenteditable */
      .theme-night .m1lpM [contenteditable] {
        filter: none !important;
        color: #FFF !important;
      }

      .theme-night ${_o.postCreation.previewPostTypeIcon} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${_o.general.igLogo} {
        filter: url(#theme-reverse-filter);
        opacity: 0.9;
      }

      .theme-night ${_o.general.storyQuickReactionsBackground} {
        background: linear-gradient(to bottom, transparent, #000);
      }

      .theme-night ${_o.general.storyFooter} textarea {
        filter: none !important;
      }

      .theme-night ${_o.general.storyFooter} .emoji {
        filter: none !important;
      }

      .theme-night ${_o.general.tabBarTopWrap} {
        background: #FFF !important;
      }

      .theme-night ${_o.storyViewer.time} {
        color: #000 !important;
      }

      .theme-night ${_o.general.postVideoContainer} {
        background: #fff;
      }

      .theme-night ${_o.profilePage.reelPreviewStats} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night video {
        background: #000;
      }
    </style>
  `,c`
    <style>
      ${_o["general_use-application-bar"]} {
        display: none !important;
      }

      ${_o["general_use-application-bar2"]} {
        display: none !important;
      }

      ${_o.general.useAppGradientBar} {
        display: none !important;
      }
    </style>
  `,function(){const t=Symbol("handled");p((()=>{const e=f(_o.dragPanel.igIcon);if(!e)return;if(e[t])return;e[t]=!0;h("button",f(_o.dragPanel.root)).pop().click()}))}(),function(){const t=HTMLVideoElement.prototype.play,e=HTMLVideoElement.prototype.pause,n=HTMLVideoElement.prototype.load,o=(t,e)=>{t._playCallbacks?t._playCallbacks.push(e):e()};HTMLVideoElement.prototype.play=async function(){this._playCallbacks=[];try{await t.call(this)}catch(t){}this._playCallbacks&&this._playCallbacks.forEach((t=>t())),this._playCallbacks=null},HTMLVideoElement.prototype.pause=function(){o(this,(()=>e.call(this)))},HTMLVideoElement.prototype.load=function(){o(this,(()=>n.call(this)))},Object.defineProperty(HTMLVideoElement.prototype,"src",{get:function(){return this.getAttribute("src")},set:function(t){return o(this,(()=>this.setAttribute("src",t))),!0}})}(),c`
    <style>
      ::-webkit-scrollbar {
        display: none;
      }
    </style>
  `,function(){const t=(e,n)=>{0!==e?requestAnimationFrame((()=>{t(e-1,n)})):n()};io.onDomReady((()=>{t(5,(()=>{io.docElem.scrollTop=0}))}))}(),c`
    <style>
      /* spinners for profile tabs */
      ._2z6nI > .jmJva,
      ._2z6nI > .vlh0C {
        margin-bottom: 100vh;
      }
    </style>
  `,c`
    <style>
      /* header top-left button */
      ${_o["header-top-level-button"]} button {
        cursor: pointer;
      }

      /* hitbox for header top-left button */
      ${_o["header-top-level-button"]} a,
      ${_o["header-top-level-button"]} button {
        position: relative;
      }
      ${_o["header-top-level-button"]} a::before,
      ${_o["header-top-level-button"]} button::before {
        content: '';
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
      }

      ${_o.general.tabBarCreatePostButton} {
        cursor: pointer;
      }
    </style>
  `,c`
    <style>
      /* text of "your story" button */
      ${_o["your-story-button-text"]} {
        width: 64px;
      }
    </style>
  `,c`
    <style>
      ${_o["profile-send-message-button"]} {
        white-space: nowrap;
        overflow: hidden;
      }
    </style>
  `,function(){const t="_enhanceProfileStats_",e=t=>{t.forEach((t=>{t.style.height=""}));const e=Array.from(t).map((t=>t.offsetHeight)),n=Math.max(...e);t.forEach((t=>{t.style.height=`${n}px`}))};p((()=>{const n=io.ensureElems({statContainers:h(_o["profile-page-stat-container"]),statItems:h(_o["profile-page-stat-item"])});io.docElem.classList.toggle("enhance-stats",!!n),n&&(n.statItems[0][t]||(n.statItems[0][t]=!0,n.statItems.forEach((t=>{t.innerHTML=t.innerHTML.replace("(","").replace(")",""),t.firstChild.nodeType===Node.TEXT_NODE&&t.appendChild(t.firstChild);const e=t.lastChild;e.textContent=e.textContent.toLowerCase().replace(":","")})),e(n.statContainers)))})),window.addEventListener("resize",(()=>{const t=h(_o["profile-page-stat-container"]);e(t)})),c`
    <style>
      /* stat container */
      .enhance-stats .LH36I {
        padding: 0 6px;
      }

      /* stat item */
      .enhance-stats ._81NM2 {
        hyphens: auto;
      }
    </style>
  `}(),p((()=>{const t=io.ensureElems({activity:f(_o["activity-card"]),activityRight:f(_o["activity-card-right-part"])});io.docElem.classList.toggle("enhance-activities",!!t)})),c`
    <style>
      @media (max-width: 400px) {
        /* activity */
        .enhance-activities ${_o["activity-card"]} {
          flex-wrap: wrap;
        }

        /* activity's right part */
        .enhance-activities ${_o["activity-card-right-part"]} {
          width: 100%;
          margin-top: 8px;
          margin-left: 45px;
        }
      }
    </style>
  `,p((()=>{const t=io.ensureElems({commentForm:f(_o["comment-form"]),avatar:f(_o["comment-form-avatar"]),form:f(_o["comment-form-form"]),textarea:f(_o["comment-form-textarea"]),submit:f(_o["comment-form-submit-button"])});io.docElem.classList.toggle("enhance-comment-form",!!t)})),c`
    <style>
      /* comment form */
      .enhance-comment-form ${_o["comment-form"]} {
        align-items: flex-start !important;
      }

      /* avatar */
      .enhance-comment-form ${_o["comment-form-avatar"]} {
        top: 5px;
      }

      /* form */
      .enhance-comment-form ${_o["comment-form-form"]} {
        padding: 0;
        border-radius: 11px;
        margin-bottom: 30px;
        position: relative;
      }

      /* textarea */
      .enhance-comment-form ${_o["comment-form-textarea"]} {
        padding: 12px 16px;
        max-height: 50vh;
        min-height: 42px;
        box-sizing: border-box;
      }

      /* submit */
      .enhance-comment-form ${_o["comment-form-submit-button"]} {
        position: absolute;
        top: 100%;
        margin-top: 10px;
      }
    </style>
  `,c`
    <style>
      ${_o["profile-page-grid-stretch-element"]} {
        display: none;
      }
    </style>
  `,function(){const t=Symbol("handled");p((()=>{if(f(_o.dragPanel.handle))return void go.on({mouseEventsAllowed:!0});if(location.pathname.startsWith("/create/"))return void go.on({mouseEventsAllowed:!1});if(location.pathname.startsWith("/stories/")&&!location.pathname.startsWith("/stories/direct/"))return void go.on({mouseEventsAllowed:!1});const e=f(_o["highlights-container"]);if(e){if(e[t])return;return e[t]=!0,go.off(),e.addEventListener("mouseenter",(()=>{go.on({mouseEventsAllowed:!0})})),void e.addEventListener("mouseleave",(()=>{go.off()}))}go.off()}))}(),function(){const t=150;let e=null,n=!0;const o=async()=>{const o=h(_o["post-video"]);if(0===o.length)return;const i=o.find((e=>{const n=e.getBoundingClientRect();return n.left<=20&&n.top>-1*t&&n.top+n.height<window.innerHeight+t}));i?e&&i===e||(e&&e.pause(),e=i,n&&(i.muted=!0),await i.play(),i.addEventListener("volumechange",(()=>{n=!1})),i.addEventListener("click",(t=>{i.muted&&!i.paused&&i.webkitAudioDecodedByteCount>0&&n&&(t.preventDefault(),t.stopPropagation(),i.muted=!1,n=!1)}),{capture:!0})):e&&(e.pause(),e=null)};p(o),window.addEventListener("scroll",o)}(),function(){const t=Array.prototype.some;Array.prototype.some=function(...e){let n;return n=2===this.length&&"instagram.com"===this[0]&&"facebook.com"===this[1]?["instagram.com"]:this,t.call(n,...e)}}(),c`
    <style>
      ${_o["post-tagged-people-button"]} {
        top: 0 !important;
        bottom: auto !important;
      }
    </style>
  `,p((t=>{t.forEach((t=>{t.removedNodes.forEach((t=>{t.nodeType===HTMLElement.ELEMENT_NODE&&("VIDEO"===t.tagName?[t]:t.querySelectorAll("video")).forEach((t=>{t.src="",t.load()}))}))}))})),c`
    <style>
      video::-webkit-media-controls-fullscreen-button {
        display: none;
      }
    </style>
  `,function(){const t="__disablePictureInPictureForVideos",e=e=>{e[t]||(e[t]=!0,e.disablePictureInPicture=!0)};p((()=>{const t=h("video");t.length&&t.forEach(e)}))}(),function(){const t="__managePostVideoClickAndDoubleClick",e=e=>{if(e[t])return;let n;e[t]=!0,e.addEventListener("click",(t=>{if(t.preventDefault(),n)return clearTimeout(n),n=null,K.send("ig.media-fullscreen-enter",{url:e.src,currentTime:e.currentTime,volume:e.volume,muted:e.muted,paused:e.paused}),void e.pause();n=setTimeout((()=>{n=null,e.paused?e.play():e.pause()}),200)}))};p((()=>{const t=h(_o["post-video"]);t.length&&t.forEach(e)}))}(),function(){const t="__manageNativeControlsForPostVideos",e=e=>{e[t]||(e[t]=!0,e.setAttribute("controls",""),e.setAttribute("controlslist","nodownload"),e.setAttribute("preload","auto"))};p((()=>{const t=h(_o["post-video"]);t.length&&t.forEach(e)})),c`
    <style>
      ${_o["post-video"]} {
        cursor: pointer;
      }

      ${_o["post-video-poster"]},
      ${_o["post-video-overlay-play"]},
      ${_o["post-video-overlay-control"]} {
        display: none;
      }

      /* tricky way to move volume control */
      @media (min-width: 450px) {
        ${_o["post-video"]}::-webkit-media-controls-panel {
          padding-right: 86px;
        }
        ${_o["post-video"]}::-webkit-media-controls-timeline {
          margin-right: -86px;
        }
      }
    </style>
  `}(),function(){const t="__syncVolumeAcrossPostVideos";let e,n,o=[];const i=i=>{i[t]||(i[t]=!0,void 0===e?(e=i.volume,n=i.muted):(i.volume=e,i.muted=n),i.addEventListener("volumechange",(()=>{o.forEach((t=>{t.volume=i.volume,t.muted=i.muted})),e=i.volume,n=i.muted})))};p((()=>{o=h(_o["post-video"]),o.forEach(i)}))}(),c`
    <style>
      video::-webkit-media-controls-panel {
        transition: all 0.25s linear;
      }
    </style>
  `,c`
    <style>
      /* expand timeline hitbox at top */
      video::-webkit-media-controls-timeline {
        margin-top: -5px;
        padding-top: 5px;
      }
    </style>
  `,c`
    <style>
      ${_o["new-post_black-layer-when-textarea-focused"]} {
        top: 225px !important;
      }

      ${_o.postCreation.captionContainer} {
        height: 180px !important;
      }

      ${_o["new-post_textarea"]} {
        height: 160px !important;
      }
    </style>
  `,c`
    <style>
      ${_o["new-post_tag-people-image-container"]} {
        width: 100%;
      }

      ${_o["new-post_tag-people-image-container"]} img {
        width: 100%;
      }
    </style>
  `,c`
    <style>
      @media ${["(max-height: 622px)","(min-height: 624px)","(max-width: 313px)","(min-width: 315px)"].join(",")} {
        ${_o.general.tabBarWrap} {
          height: 58px !important;
        }

        ${_o.general.tabBar} {
          height: 58px !important;
        }
      }
    </style>
  `,async function(){if(await ue())return;const t=await l((()=>document.body));if(!t)return;t.insertAdjacentHTML("beforeend",`\n    <div class="navigation-spinner">\n      ${Dt()}\n    </div>\n  `),c`
    <style>
      #react-root:not(:empty) ~ .navigation-spinner,
      .dialog-404 .navigation-spinner {
        display: none;
      }

      .navigation-spinner {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 32px;
        height: 32px;
        margin-left: -16px;
        margin-top: -16px;
        pointer-events: none;
        z-index: 0;
      }
    </style>
  `}(),p((()=>{if(!document.body)return;const t=!!f(_o.general.modalWindow);document.body.style.overflow=t?"hidden":null})),c`
    <style>
      ${_o.general.modal} {
        background: rgba(255, 255, 255, 0.96) !important;
      }

      ${_o.general.modalWindow} {
        justify-content: flex-start;
        box-shadow: 0 5px 27px rgba(0, 0, 0, 0.13);
        background: #FFF;
      }

      ${_o.general.modalWindowHashtagContent} {
        margin-top: 6px;
      }
    </style>
  `,function(){let t;p((()=>{const e=location.pathname+location.search;e!==t&&(K.send("ig.url-change",e),t=e)}))}(),function(){const t=Symbol("handled");p((()=>{const e=f(_o.general.storiesBar);e&&(e[t]||(e[t]=!0,Ve.init(e)))}))}(),c`
    <style>
      ${_o.profilePage.tab}:empty {
        display: none;
      }
    </style>
  `,c`
    <style>
      ${_o.general.modalWindow} {
        overflow: scroll;
        border-radius: 8px;
      }
    </style>
  `,function(){const t=Symbol("handled");p((()=>{const e=f(_o.postCreation.nextButton);e&&(e[t]||(e[t]=!0,e.addEventListener("click",(()=>{const t=Me.create({show:!0});io.onPathChange((function e(){io.onPathChange.off(e),t.remove()}))}),{once:!0})))}))}(),c`
    <style>
      ${_o.general.blueLinkButton} {
        cursor: pointer;
        position: relative;
      }

      ${_o.general.blueLinkButton}::before {
        content: '';
        position: absolute;
        top: -7px;
        left: -7px;
        right: -7px;
        bottom: -7px;
      }
    </style>
  `,c`
    <style>
      ${_o.profilePage.postRow} {
        margin-bottom: 2px;
      }

      ${_o.profilePage.postContainer} {
        margin-right: 2px;
      }

      ${_o.profilePage.reelRow} {
        margin-bottom: 2px;
      }

      ${_o.profilePage.reelContainer} {
        margin-right: 2px;
      }
    </style>
  `,c`
    <style>
      ${_o.general.actionSheet} {
        width: 96% !important;
      }
    </style>
  `,function(){const t=Symbol("handled");p((()=>{const e=f(_o.postCreation.filtersReel);e&&(e[t]||(e[t]=!0,Ve.init(e)))}))}(),c`
    <style>
      ${_o.authScreen.username} {
        margin-right: 24px;
      }

      /* hide alt text of missing avatar */
      ${_o.authScreen.avatar} {
        color: transparent;
        overflow: hidden;
      }

      ${_o.authScreen.footer} {
        display: none;
      }

      ${_o.authScreen.fromFacebookBar} {
        display: none;
      }

      @media (max-width: 400px) {
        ${_o.authScreen.loginContainer} {
          padding-left: 20px;
          padding-right: 20px;
        }

        ${_o.authScreen.loginContainerParagraph} {
          text-align: center;
        }

        ${_o.authScreen.loginFormParagraph} {
          text-align: center;
          padding-left: 20px;
          padding-right: 20px;
        }
      }
    </style>
  `,c`
    <style>
      ${_o.loginBar.root} {
        top: 6px !important;
        padding: 8px;
        border-radius: 5px;
        max-width: 400px;
        box-shadow: 0 2px 7px rgba(0, 0, 0, 0.18);
      }

      ${_o.loginBar.content} {
        height: 100%;
        align-items: center;
      }

      ${_o.loginBar.openAppButton} {
        display: none !important;
      }

      @media (max-width: 500px) {
        ${_o.loginBar.root} {
          top: 0 !important;
          padding: 8px;
          border-radius: 0;
          max-width: 100%;
          box-shadow: none;
        }
      }
    </style>
  `,function(){const t=Symbol("handled");p((()=>{if(!!f('[data-page="StoriesPage"]'))return;h("img[srcset]").forEach((e=>{if(e[t])return;e[t]=!0;e.getAttribute("srcset").endsWith("w")&&e.removeAttribute("srcset")}))}))}(),function(){let t=null;p((()=>{t=f(_o.commentsPage.scrollContainer)})),K.on("ig.broadcast-scroll",(e=>{t&&(t.scrollTop+=e)}))}(),function(){const t=window.IntersectionObserver;if(!t)return;const e=Symbol("handled");p((()=>{const n=f(_o.commentsPage.showMoreButton);if(!n)return;if(n[e])return;n[e]=!0;const o=f(_o.commentsPage.scrollContainer);if(!o)return;const i=new t((t=>{t[0].isIntersecting&&(document.body.contains(n)&&n.click(),setTimeout((()=>i.disconnect())))}),{root:o,rootMargin:"200px",threshold:0});i.observe(n)}))}(),async function(){const t=await lt("store");if(!t)return;const e=Symbol("handled");p((()=>{let n;if(n=h(_o.profilePage.post),n=n.filter((t=>!t[e])),0===n.length)return;const o=t.getState(),i=Object.values(o.posts.byId.toJS());n.forEach((t=>{t[e]=!0;const n=t.getAttribute("href").split("/")[2];if(!n)return;const o=i.find((t=>t.code===n));if(!o)return;const r=ro(o.numPreviewLikes||0),a=ro(o.numComments||0);t.insertAdjacentHTML("beforeend",`\n        <div class="post-stats">\n          <div class="post-stats__stat">\n            <div class="post-stats__icon coreSpriteHeartSmall"></div>\n            <div class="post-stats__count">${r}</div>\n          </div>\n          <div class="post-stats__stat">\n            <div class="post-stats__icon coreSpriteSpeechBubbleSmall"></div>\n            <div class="post-stats__count">${a}</div>\n          </div>\n        </div>\n      `)}))})),c`
    <style>
      .post-stats {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 5px 10px;
        pointer-events: none;
        transition: opacity 0.1s;
      }
      ${_o.profilePage.post}:not(:hover) .post-stats {
        opacity: 0;
      }
      .theme-night .post-stats {
        filter: url(#theme-reverse-filter);
      }

      .post-stats::before {
        content: '';
        opacity: 0.5;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          to top,
          hsl(0, 0%, 0%) 0%,
          hsla(0, 0%, 0%, 0.738) 19%,
          hsla(0, 0%, 0%, 0.541) 34%,
          hsla(0, 0%, 0%, 0.382) 47%,
          hsla(0, 0%, 0%, 0.278) 56.5%,
          hsla(0, 0%, 0%, 0.194) 65%,
          hsla(0, 0%, 0%, 0.126) 73%,
          hsla(0, 0%, 0%, 0.075) 80.2%,
          hsla(0, 0%, 0%, 0.042) 86.1%,
          hsla(0, 0%, 0%, 0.021) 91%,
          hsla(0, 0%, 0%, 0.008) 95.2%,
          hsla(0, 0%, 0%, 0.002) 98.2%,
          hsla(0, 0%, 0%, 0) 100%
        );
      }

      .post-stats__stat {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 12px;
      }
      .post-stats__stat:first-child {
        margin-left: 0;
      }

      .post-stats__icon {
        margin-right: 4px;
        transform: scale(0.8);
        position: relative;
        top: -0.5px;
      }

      .post-stats__count {
        color: #FFF;
        font-weight: 600;
        font-size: 12px;
      }

      @media (max-width: 500px) {
        .post-stats {
          padding: 2px 8px;
        }

        .post-stats::before {
          opacity: 0.4;
          top: -100%;
          background: #000;
        }

        .post-stats__stat {
          margin-left: 6px;
        }

        .post-stats__icon {
          top: 0.5px;
          margin-right: 1px;
          transform: scale(0.6);
        }

        .post-stats__count {
          font-size: 10px;
        }
      }
    </style>
  `}(),async function(){const t=await lt("store");if(!t)return;const e=()=>{var e;const n=null===(e=t.getState().navigation)||void 0===e?void 0:e.pageIdentifier;n&&document.documentElement.setAttribute("data-page",n)};e(),t.subscribe(e)}(),c`
    <style>
      html[data-page="CreationDetailsPage"] ${_o.postCreation.previewContainer} {
        width: 110px !important;
        height: 110px !important;
      }
      html.reels--creating-reels[data-page="CreationDetailsPage"] ${_o.postCreation.previewContainer} {
        width: 62px !important;
      }

      @media (max-width: 440px) {
        html[data-page="CreationDetailsPage"] ${_o.postCreation.previewContainer} {
          width: 60px !important;
          height: 60px !important;
        }
        html.reels--creating-reels[data-page="CreationDetailsPage"] ${_o.postCreation.previewContainer} {
          width: 45px !important;
          min-width: 45px !important;
          height: 80px !important;
        }
      }

      html[data-page="CreationDetailsPage"] ${_o.postCreation.previewPostImage} {
        border-radius: 4px;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover;
        object-position: center;
      }

      html[data-page="CreationDetailsPage"] ${_o.postCreation.previewPostTypeIcon} {
        width: auto !important;
        height: auto !important;
        right: 0;
        top: -1px;
        transform: scale(0.8);
        transform-origin: top right;
      }
    </style>
  `,async function(){if(!await lt("lang"))return;document.addEventListener("click",(async t=>{const e=t.target.closest(_o.general.iconButton);if(!e)return;if(!!!f(_o.general.planeIcon,e))return;const n=e.closest(_o.general.post);if(!n)return;const o=f(_o.general.postThreeDotsButton,n);if(!o)return;t.preventDefault(),t.stopPropagation();const i=new Promise((t=>{p((function e(){f(_o.general.actionDialog)&&(setTimeout((()=>{p.off(e)})),t())}))}));o.click(),await i;const r=h(_o.general.actionDialogItem).find((t=>t.innerText.toLowerCase().includes("share")||t.innerText.endsWith("...")||t.innerText.endsWith("…")));r&&r.click()}),!0)}(),async function(){const t=await lt("store");if(!t)return;let e=null;p((()=>{const n=f(_o.postCreation.expandImageButton);if(!n)return;const o=t.getState().creation.sessionId;o!==e&&(e=o,n.click())}))}(),async function(){const t=(t,e)=>window.innerWidth>320?Math.min(125,e/t*100):Math.min(180,e/t*100);Object.defineProperty(Object.prototype,"getHeightPercent",{get:function(){return({width:e,height:n})=>t(e,n)},set:function(){return!0}}),Object.defineProperty(Object.prototype,"getWrapperHeightStyle",{get:function(){return(e,n)=>({paddingBottom:`calc(${t(n,e)}% - 1px)`})},set:function(){return!0}}),c`
    <style>
      ${_o.postCreation.video} {
        width: 100%;
        height: 100%;
        background-color: #000;
      }

      ${_o.postCreation.videoPoster} {
        object-fit: contain;
      }
    </style>
  `}(),c`
    <style>
      ${_o.postCreation.captionContainer} {
        flex-direction: row-reverse !important;
      }

      ${_o.postCreation.captionTextarea} {
        margin-left: 8px;
      }

      ${_o.postCreation.userAvatar} {
        display: none;
      }
    </style>
  `,c`
    <style>
      .clickable {
        cursor: pointer;
        transition: filter 300ms;
      }
      .clickable:hover {
        filter: brightness(110%);
      }
      .clickable:active {
        filter: brightness(90%);
      }
    </style>
  `,c`
    <style>
      .info-circle {
        width: 12px;
        height: 12px;
        color: #FFF;
        background: #1BA2F9;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        position: relative;
        font-size: 9px;
        font-weight: 700;
        font-family: Montserrat !important;
      }
      .info-circle::before { /* hitbox */
        content: '';
        position: absolute;
        top: -7px;
        left: -7px;
        right: -7px;
        bottom: -7px;
      }
      .theme-night .info-circle {
        filter: url(#theme-reverse-filter);
        background: #33ABF8;
      }
    </style>
  `,c`
    <style>
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.96);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }

      .modal__window {
        width: 290px;
        padding: 16px 20px;
        background: #FFF;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        font-size: 14px;
        line-height: 20px;
        border-radius: 12px;
      }

      .modal__title {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 600;
      }

      .modal__content {
        margin-top: 12px;
        display: block;
        color: #3F3E3F;
      }
      .modal__content b {
        font-weight: 600;
      }
      .modal__content a {
        color: #1BA2F9 !important;
      }
      .theme-nigh .modal__content a {
        filter: url(#theme-reverse-filter);
        color: #33ABF8 !important;
      }
      .modal__content ul {
        list-style: disc;
        padding: 8px 0 8px 24px;
      }
    </style>
  `,c`
    <style>
      .button {
        color: #FFF;
        background: #1BA2F9;
        border: none;
        margin-right: 12px;
        cursor: pointer;
        padding: 5px 12px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 4px;
        font-weight: 600;
      }
      .button:last-child {
        margin-right: 0;
      }
      .button:disabled {
        opacity: 0.5;
        pointer-events: none;
      }
      .button_cancel {
        color: #262626;
        border: 1px solid #DBDBDB;
        background: transparent;
      }
      .theme-night .button:not(.button_cancel) {
        filter: url(#theme-reverse-filter);
        background: #33ABF8;
      }
    </style>
  `}};let _o,ko;var Po={init:function(){So=st.getConfig().igSelectors,function(){const t=()=>{clearInterval(e),io.onDomReady()},e=setInterval((()=>{f(So.general.tabBar)&&t()}),300);"complete"===document.readyState||"loaded"===document.readyState||"interactive"===document.readyState?t():document.addEventListener("DOMContentLoaded",t)}(),document.addEventListener("click",(t=>{io.onDocClick(t)}),!0),function(){let t=location.pathname;io.onPathChange(t),p((()=>{const e=location.pathname;t!==e&&(io.onPathChange(e),t=e)}))}()}};let So;var Co={init:function(){(async function(){var t,e,n,o,i,r,a;const s=await l((()=>window._sharedData)),d=await l((()=>window.__additionalData)),c=(null==s||null===(t=s.entry_data)||void 0===t||null===(e=t.ProfilePage)||void 0===e||null===(n=e[0])||void 0===n||null===(o=n.graphql)||void 0===o?void 0:o.user)||(null===(i=Object.values(d)[0])||void 0===i||null===(r=i.data)||void 0===r||null===(a=r.graphql)||void 0===a?void 0:a.user);if(!c)return;Ao(c)})(),function(){const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(...e){return this.addEventListener("readystatechange",(()=>{if(4!==this.readyState)return;const t=n(this.responseText),e=t&&t.graphql&&t.graphql.user;e&&Ao(e)})),t.call(this,...e)}}()},getUserDetails:To};window.getUserDetails=To;const Eo={};function To(t){return Eo[t]}function Ao(t){Eo[t.username]=t}var $o={init:function(){K.on("ig.publish-story",Lo)}};async function Lo({imageUrl:t,mentions:e=[]}){const n=await lt("http"),o=await async function(t){const e=await fetch(t),n=await e.blob();return await async function(t){return new Promise(((e,n)=>{const o=new FileReader;o.onerror=()=>{n()},o.onload=()=>{e(o.result)},o.readAsDataURL(t)}))}(n)}(t),i=document.createElement("img");i.src=o,document.body.appendChild(i),await new Promise((t=>{i.onload=t}));const r=i.clientWidth,a=i.clientHeight,s=document.createElement("canvas");s.width=r,s.height=a;s.getContext("2d").drawImage(i,0,0),i.remove();const l=await new Promise((t=>{s.toBlob(t,"image/jpeg")})),d=Date.now().toString(),c=`fb_uploader_${d}`;let p=null;try{await n.post(`/rupload_igphoto/${c}`,l,{headers:{"X-Instagram-Rupload-Params":JSON.stringify({media_type:1,upload_id:d,upload_media_width:r,upload_media_height:a}),"X-Entity-Name":c,"X-Entity-Length":String(l.size),Offset:"0"},timeout:Number.POSITIVE_INFINITY})}catch(t){p=t}if(!p)try{await n.post("/create/configure_to_story/",{upload_id:d,caption:"",reel_mentions:JSON.stringify(e.map((t=>({user_id:t.userId,x:t.cx,y:t.cy,width:t.width,height:t.height,rotation:0}))))})}catch(t){p=t}return{error:p}}var Ro={init:function(){Fo=st.getConfig().igSelectors,async function(){const t=await lt("store");p((()=>{const e=h(Fo["post-photo-item"]),n=h(Fo["post-video-item"]),o=h(Fo["story-container"]);[...e,...n,...o].forEach((e=>{if(e.withActions)return;const n=o.includes(e),i=!!e.querySelector("video");let r=!1,a=!1;const s=e.closest("[data-post-id]");if(s){const e=s.dataset.postId,n=t.getState().posts.byId.get(e);a="clips"===(null==n?void 0:n.productType),r="igtv"===(null==n?void 0:n.productType),r&&s.setAttribute("data-media-actions-post-type","igtv"),a&&s.setAttribute("data-media-actions-post-type","reels")}const l=function({isIgtv:t=!1,isStory:e=!1,isVideo:n=!1,isReels:o=!1}={}){return`\n    <div class="\n      mediaActions\n      ${t?"mediaActions_igtv":""}\n      ${o?"mediaActions_reels":""}\n      ${e?"mediaActions_story":"mediaActions_post"}\n      ${n?"mediaActions_video":"mediaActions_photo"}">\n      <button class="mediaActions__button" data-action="fullscreen" title="fullscreen">\n        <svg style="transform: translateX(-0.5px)" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">\n          <path d="M10,12H7V10h3V7h2v5ZM0,12V7H2v3H5v2ZM10,5V2H7V0h5V5ZM0,5V0H5V2H2V5Z" fill="currentColor"/>\n        </svg>\n      </button>\n      <button class="mediaActions__button" data-action="open" title="open in new tab">\n        <svg xmlns="http://www.w3.org/2000/svg" width="12.507" height="12.501" viewBox="0 0 12.507 12.501">\n          <path d="M179.372-.5V1h3.3l-5.148,5.148,1.7,1.7L184.371,2.7V5.948h1.51V-.5Z" transform="translate(-173.374 0.504)" fill="currentColor"/>\n          <path d="M8,93.55H2v-6H4l2-2H0v10H10v-6l-2,2Z" transform="translate(0 -83.049)" fill="currentColor"/>\n        </svg>\n      </button>\n    </div>\n  `}({isStory:n,isVideo:i,isIgtv:r,isReels:a});e.insertAdjacentHTML("afterbegin",l),e.withActions=!0}))}))}(),K.on("ig.media-fullscreen-exit",(({url:t,currentTime:e,volume:n,muted:o})=>{let i=f(`video[src="${t}"]`);if(!i){const e=f(`source[src="${t}"]`);e&&(i=e.closest("video"))}i&&(i.currentTime=e,i.volume=n,i.muted=o)})),io.onDocClick((async t=>{const e=t.target.closest(".mediaActions__button");if(!e)return;t.preventDefault(),t.stopPropagation();const n=e.closest("li")||e.closest(".kPFhm")||e.closest(".qbCDp"),o=n.querySelector("img"),i=n.querySelector("video");if(!o&&!i)return void K.send("ig.error","unable to find media for button");const r=(await lt("store")).getState();let a;const s=t.target.closest("[data-post-id]");a=s?s.dataset.postId:r.stories.reels.get(r.stories.currentReelId).itemIds[r.stories.currentReelItemIndex];const l=r.posts.byId.get(a),d=e.getAttribute("data-action");let c;if(i)c=i.getAttribute("src")||i.querySelector("source").getAttribute("src");else if(o){var p,u;!l.isSidecar&&(null===(p=l.displayResources)||void 0===p?void 0:p.length)>0&&(c=l.displayResources.slice().sort(((t,e)=>e.configWidth-t.configWidth))[0].src),c||(c=null===(u=o.getAttribute("srcset"))||void 0===u?void 0:u.split(",").map((t=>({src:t.split(" ")[0],configWidth:t.split(" ")[1]}))).sort(((t,e)=>e.configWidth-t.configWidth))[0].src),c||(c=o.getAttribute("src"))}if("open"===d){const t=i&&i.outerHTML||o&&o.outerHTML;K.send("ig.media-open",{url:c,html:t})}else"fullscreen"===d&&i&&(K.send("ig.media-fullscreen-enter",{url:c,currentTime:i.currentTime,volume:i.volume,muted:i.muted,paused:i.paused}),i.pause())})),c`
    <style>
      .mediaActions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s;
      }
      .mediaActions_story {
        padding-right: 5px;
        padding-bottom: 70px;
        height: 150px;
        z-index: 1;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
      }
      .mediaActions_post.mediaActions_photo {
        padding-right: 2px;
        padding-bottom: 12px;
        align-items: flex-end;
      }
      .mediaActions_post.mediaActions_video {
        right: 5px;
        bottom: 72px;
        transition-duration: 0s;
      }
      @media (min-width: 450px) {
        .mediaActions_post.mediaActions_video {
          bottom: 31px;
        }
      }
      ${Fo["post-item"]}:hover .mediaActions,
      body:hover .mediaActions_story {
        opacity: 1;
      }
      .v1Nh3 .mediaActions, /* preview in profile */
      .PUHRj .mediaActions { /* preview in activity */
        display: none;
      }

      ${Fo["post-item"]} video::-webkit-media-controls-panel {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 140px;
        background: linear-gradient(
          to top,
          hsl(0, 0%, 0%, 0.541) 0%,
          hsla(0, 0%, 0%, 0.382) 19%,
          hsla(0, 0%, 0%, 0.278) 34%,
          hsla(0, 0%, 0%, 0.194) 47%,
          hsla(0, 0%, 0%, 0.126) 56.5%,
          hsla(0, 0%, 0%, 0.075) 65%,
          hsla(0, 0%, 0%, 0.042) 73%,
          hsla(0, 0%, 0%, 0.021) 80.2%,
          hsla(0, 0%, 0%, 0.008) 86.1%,
          hsla(0, 0%, 0%, 0.002) 91%,
          hsla(0, 0%, 0%, 0.001) 95.2%,
          hsla(0, 0%, 0%, 0) 100%
        );
      }

      /* show video controls only when hovering video */
      ${Fo["post-item"]}:not(:hover) video::-webkit-media-controls-panel {
        display: none;
      }

      .mediaActions__button {
        width: 34px;
        height: 34px;
        margin-right: 6px;
        border-radius: 50%;
        padding: 0;
        border: none;
        cursor: pointer;
        position: relative;
        transform-origin: center;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: all;
        color: #FFF;
        background: transparent;
        transition: all 0.16s linear;
      }
      .mediaActions__button:not(:hover) {
        transition-duration: 0s;
      }
      .mediaActions_post.mediaActions_video .mediaActions__button {
        margin-right: 4px;
      }
      .mediaActions_post.mediaActions_photo .mediaActions__button,
      .mediaActions_story .mediaActions__button {
        color: #3F3E3F;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
        width: 27px;
        height: 27px;
        margin-right: 14px;
      }
      .mediaActions_post.mediaActions_video .mediaActions__button:hover {
        background: rgba(36, 36, 40, 0.7);
      }
      /* hitbox */
      .mediaActions__button::before {
        content: '';
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
      }
      .mediaActions_photo .mediaActions__button[data-action="fullscreen"] {
        display: none;
      }

      .mediaActions_post.mediaActions_video .mediaActions__button svg {
        filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
      }
    </style>
  `}};let Fo;var Mo={init:function(){zo=st.getConfig().igSelectors,io.onDomReady((()=>{K.send("ig.ready")})),io.onPathChange((t=>{K.send("ig.path-change",t)})),async function(){const t=await lt("store");if(!t)return;io.onDocClick((e=>{var n,o;if(!e.target.closest(zo.postCreation.submitPostButton))return;if(ve.isCreatingReels())return;const i=!!(null===(n=t.getState().creation)||void 0===n||null===(o=n.sourceVideo)||void 0===o?void 0:o.file);K.send("ig.submit-post",i?"video":"photo")}))}(),io.onDocClick((t=>{if(!t.target.closest(".LEJ26 button"))return;const e=!!f("video");K.send("ig.submit-story",e?"video":"photo")})),io.onDocClick((t=>{t.target.closest(".xWeGp")&&K.send("ig.open-dm")})),K.on("ig.back",(async()=>{await ue()?location.href="/":history.state&&history.state.key&&history.back()})),K.on("ig.refresh",(()=>{location.reload()})),K.on("ig.broadcast-scroll",(t=>{io.docElem.scrollTop+=t})),K.on("ig.go-to-igtv-tab",(()=>{const t=h("a",f(zo.general.tabBar)).pop().getAttribute("href")+"channel/",e=document.createElement("a");e.setAttribute("href",t),document.body.appendChild(e),e.click()})),function(){let t;(async()=>{t=await lt("nav")})(),K.on("ig.ajax-go",(e=>{t?t.push(e):location.href=e}))}(),async function(t){K.on("ig.hard-go",(t=>{location.href=t}))}(),K.on("ig.get-url",(()=>location.pathname+location.search)),K.on("ig.clear-and-show-spinner",(()=>{f("#react-root").innerHTML=""}))}};let zo;var Io={init:function(){Bo=st.getConfig().igSelectors,function(){const t=Symbol("getCroppedCanvasDimensions");Object.defineProperty(Object.prototype,"getCroppedCanvasDimensions",{get:function(){return this[t]},set:function(e){if(!(t in this)){const t=this.default;this.default=function(e){if(Vo.onCall(e),!Vo.prevented){if(Vo.result){const t=Vo.result;return Vo.result=null,t}return t.call(this,...arguments)}Vo.prevented=!1}}return this[t]=e,!0}})}(),io.onDomReady((()=>{Ho=Me.create({onClick:qo})})),io.onBeforeStoryCreation((()=>{Oo="story",Wo()})),io.onBeforePostCreation((()=>{Oo=ve.isCreatingReels()?"reels":"post",Wo()})),io.onMediaProcessingError((()=>{setTimeout(Uo,1e3)})),p((()=>{const t=f(Bo["post-creation"]),e=f(Bo["story-video-creation"]),n=f(Bo["story-image-creation"]);(t||e||n)&&Uo()})),io.onMediaProcessingError((t=>{"invalid_media_duration_too_long"===t&&K.send("ig.show-igtv-popup")})),p((()=>{h('input[accept="image/jpeg"]').forEach((t=>{t.setAttribute("accept","image/jpeg, image/png, video/quicktime, video/mp4, video/webm")}))})),Vo.onCall((t=>{const{error:e,...n}=function(t){const e=t.videoWidth,n=t.videoHeight;if(!e||!n)return{error:"wrong-format"};if(ve.isCreatingReels()&&e===n)return{error:"square-reel-video"};const o=e/n,i=Do[Oo].minRatio,r=Do[Oo].maxRatio;if(o<i||o>r)return{error:"wrong-ratio",ratio:o};if("story"===Oo||"reels"===Oo){if(t.duration<Do[Oo].minVideoDuration)return{error:"video-too-short"};if(t.duration>Do[Oo].maxVideoDuration)return{error:"video-too-long"}}return{error:null}}(t);e&&(async()=>{Vo.prevented=!0;const o=await fetch(t.src),i=await o.blob();await Yo(i.type,e,n),io.onMediaProcessingError()})()})),Vo.onCall((t=>{"story"===Oo&&(Vo.result=new Promise((e=>{const n=document.createElement("canvas");t.currentTime=0,t.addEventListener("timeupdate",(()=>{n.width=t.videoWidth,n.height=t.videoHeight,n.getContext("2d").drawImage(t,0,0),n.toBlob((n=>{e({file:n,dataURL:URL.createObjectURL(n),uploadMediaWidth:t.videoWidth,uploadMediaHeight:t.videoHeight,videoTransform:null})}),"image/jpeg")}))})))}))}};const Do={clickShowErrorTimeout:1e4,forceShowErrorTimeout:3e4,story:{minRatio:.5621,maxRatio:1.91,minRatioPrettyStr:"9:16",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.5625",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:15.9,minVideoDurationStr:"1 second",maxVideoDurationStr:"15 seconds",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 to 15 seconds long and the size ratio is from 1.91:1 to 9:16."},post:{minRatio:.8,maxRatio:1.91,minRatioPrettyStr:"4:5",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.8",maxRatioValueStr:"1.91",alertErrorMessage:"Uploading video ca ncelled. Please ensure that the video is 3 to 60 seconds long and the size ratio is from 1.91:1 to 4:5."},reels:{minRatio:.5621,maxRatio:1.91,minRatioPrettyStr:"9:16",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.5625",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:60,minVideoDurationStr:"1 second",maxVideoDurationStr:"60 seconds",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 to 30 seconds long and the size ratio is from 1.91:1 to 9:16."}};let Bo,Oo,Ho,jo,No;const Vo={onCall:oo(),result:null,prevented:!1};function Wo(){Ho&&(jo=Date.now(),Me.toggle(Ho,!0),No=setTimeout((()=>{alert(Do[Oo].alertErrorMessage),Uo()}),Do.forceShowErrorTimeout))}function Uo(){Ho&&(Me.toggle(Ho,!1),clearTimeout(No))}function qo(){Date.now()-jo>Do.clickShowErrorTimeout&&alert(Do[Oo].alertErrorMessage),Uo()}async function Yo(t,e,n={}){const o=Yo;if(o.shown)return;o.shown=!0;const i=Do[Oo];if("wrong-ratio"===e){const t=n.ratio.toFixed(3);document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNSUPPORTED ASPECT RATIO\n          </div>\n          <div class="modal__content">\n            ${n.ratio<i.minRatio?`\n              Uploaded Video Aspect Ratio is <b>${t}</b>\n              which is <b>below ${i.minRatioPrettyStr} (${i.minRatioValueStr})</b>.\n            `:`\n              Uploaded Video Aspect Ratio is <b>${t}</b>\n              which is <b>above ${i.maxRatioPrettyStr} (${i.maxRatioValueStr})</b>.\n            `}\n            <div class="video-error__convert-section">\n              You can resize the video with one of these free tools:\n              <ul>\n                <li><a href="https://ezgif.com/resize-video" target="_blank">ezgif.com</a></li>\n                <li><a href="https://clideo.com/resize-video" target="_blank">clideo.com</a></li>\n                <li><a href="https://cloudconvert.com/mp4-converter" target="_blank">cloudconvert.com</a></li>\n              </ul>\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `)}else if("wrong-format"===e){let e;e="video/quicktime"===t?"https://www.zamzar.com/convert/mov-to-webm":"video/mp4"===t?"https://www.zamzar.com/convert/mp4-to-webm":"https://www.zamzar.com",document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNABLE TO UPLOAD VIDEO\n          </div>\n          <div class="modal__content">\n            Instagram server rejected this video for upload.\n            Please ensure uploaded video uses supported format and codec (e.g. MP4/h264 or WEBM).\n            <div class="video-error__convert-section">\n              You can convert video format with one of these tools:\n              <ul>\n                <li><a href="https://video.online-convert.com/convert-to-mp4" target="_blank">video.online-convert.com</a></li>\n                <li><a href="https://cloudconvert.com/mp4-converter" target="_blank">cloudconvert.com</a></li>\n                <li><a href="https://ezgif.com/resize-video" target="_blank">ezgif.com</a></li>\n                <li><a href="${e}" target="_blank">zamzar.com</a></li>\n              </ul>\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `)}else"video-too-short"===e?document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> VIDEO IS TOO SHORT\n          </div>\n          <div class="modal__content">\n            <div style="display: block">\n              Instagram server did not accept this video,\n              because it is less than <b>${i.minVideoDurationStr}</b> long.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `):"video-too-long"===e?document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> VIDEO IS TOO LONG\n          </div>\n          <div class="modal__content">\n            Instagram server did not accept this video,\n            because it is over <b>${i.maxVideoDurationStr}</b>\n            long.\n            <div class="video-error__convert-section">\n              You can cut video short with this free\n              <a href="https://online-video-cutter.com/" target="_blank">online video cutter tool</a>.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `):"square-reel-video"===e&&document.body.insertAdjacentHTML("beforeend",'\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNSUPPORTED ASPECT RATIO\n          </div>\n          <div class="modal__content">\n            <div style="display: block">\n              Instagram API does not support posting square 1:1 videos to Reels.\n            </div>\n            <div style="height: 8px"></div>\n            <div style="display: block">\n              • Supported ratios are 4:5 to 1.91:1.<br>\n              • Optimal is 9:16 or 1080x1920px <span class="emoji">🚀</span>\n            </div>\n            <div style="height: 8px"></div>\n            <div style="display: block">\n              You can crop your video online with a&nbsp;free\n              <a href="https://ezgif.com/crop-video" target="_blank">ezgif video cropper tool</a>.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    ');o.init||(o.init=!0,io.onDocClick((t=>{if(!t.target.closest(".video-error__got-it-button"))return;f(".video-error").remove(),o.shown=!1})),c`
    <style>
      .video-error__title .emoji {
        margin-right: 8px;
      }

      .video-error__convert-section {
        margin-top: 8px;
        display: block;
      }

      .video-error__got-it-button {
        outline: none;
        border: none;
        padding: 0;
        margin: 16px 0 0 0;
        background: transparent;
        font-size: inherit;
        font-family: inherit;
        text-align: left;
        font-weight: 600;
        color: #1BA2F9;
        cursor: pointer;
      }
    </style>
  `)}var Xo={init:function(){Go=st.getConfig().igSelectors,function({minWidth:t}){c`
    <style>
      @media (min-width: ${t}px) {
        ${Go.general.tabBarWrap} {
          height: 0;
          margin-top: 12px;
        }

        ${Go.general.tabBar} {
          width: 490px;
          height: 58px !important;
          margin: 0 auto;
          box-shadow: 0 0px 12px rgba(0, 0, 0, 0.14);
          border-radius: 15px 15px 0 0;
        }
        .theme-night ${Go.general.tabBar} {
          background: #E7E8EA;
          border: 1px solid #FFF;
          border-bottom: none;
          box-shadow: none;
          box-sizing: content-box;
        }

        ${Go.general.tabBar}::before {
          display: none !important;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:t}){c`
    <style>
      @media (min-width: ${t}px) {
        ${Go.general.header}::before {
          width: 600px;
          margin-left: -300px;
          left: 50% !important;
          right: auto !important;
          background: linear-gradient(
            to right,
            transparent,
            #DBDBDB,
            #DBDBDB,
            transparent
          ) !important;
        }

        ${Go.general.headerContent} {
          width: 490px !important;
          margin-left: auto;
          margin-right: auto;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:t}){const e=document.documentElement;let n=e.scrollTop;const o=()=>{const o=f(Go.general.header);if(!o)return;if(window.innerWidth<t)return void(o.style.transform=null);const i=e.scrollTop,r=i-n,a=r>6;n=i,r<-6||i<=45?o.style.transform=null:a&&(o.style.transform="translateY(-45px)")};window.addEventListener("resize",o),document.addEventListener("scroll",o),c`
    <style>
      @media (min-width: ${t}px) {
        ${Go.general.header} {
          transition: transform 0.3s;
        }
      }
    </style>
  `}({minWidth:460}),function({minWidth:t}){c`
    <style>
      @media (min-width: ${t}px) {
        ${Go.general.storyPreviewContainer} {
          border: 1px solid #EDEDED !important;
          border-radius: 3px;
          margin-top: 18px;
          margin-bottom: 14px;
        }

        html[data-page="feedPage"] ${Go.general.recommendationsContainer} {
          border: 1px solid #EDEDED !important;
          border-radius: 3px;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:t}){c`
    <style>
      @media (min-width: ${t}px) {
        ${Go.explorePage.content} {
          padding-top: 25px !important;
        }

        ${Go.explorePage.contentInner} {
          margin-left: -20px !important;
          margin-right: -48px !important;
        }

        ${Go.explorePage.searchResults} {
          width: 100%;
          max-width: 460px;
          margin: -16px auto 0;
        }

        /* thin border for posts */
        ${Go.explorePage.post} {
          position: relative;
        }
        ${Go.explorePage.post}::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
          box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
        }
      }
    </style>
  `}({minWidth:736}),function({minWidth:t}){Ne((async e=>{if(window.innerWidth<t)return;const n=e.target.closest(Go.profilePage.post);if(!n)return;e.preventDefault(),e.stopPropagation();const o=n.getAttribute("href");(await lt("nav")).push(o)}),{capture:!0}),c`
    <style>
      @media (max-width: ${t-1}px) {
        ${Go.profilePage.header} {
          margin-top: 20px !important;
        }
      }

      @media (min-width: ${t}px) {
        ${Go.profilePage.content} {
          padding-top: 0 !important;
        }

        ${Go.profilePage.header} {
          padding-top: 30px;
        }

        ${Go.profilePage.headerFirstRow} {
          min-height: 40px;
        }

        ${Go.profilePage.avatarWithStoryWrap} {
          margin-top: 6px;
        }

        ${Go.profilePage.username} {
          position: relative;
          top: -3px;
        }

        ${Go.profilePage.writeButton} {
          margin-left: 10px;
        }

        ${Go.profilePage.settingsMenuWrap} {
          background: #FFF !important;
        }

        ${Go.profilePage.settingsMenu} {
          background: #FAFAFA;
          width: 100%;
          max-width: 490px;
          margin: 0 auto;
          border-left: 1px solid #EDEDED;
          border-right: 1px solid #EDEDED;
        }
      }
    </style>
  `}({minWidth:736}),async function({minWidth:t}){if(await ue())return void await K.send("ig.update-ig-view",{fullscreenWidth:550,withBorder:!0});const e=await lt("store"),n=document.documentElement,o={};let i,r=!1;const a=await lt("scroll-controller"),s=a.restoreScrollPosition;a.restoreScrollPosition=(...e)=>{if(!(window.innerWidth>=t))return s.call(a,...e)};const l=await lt("nav"),d=l.push;async function c(){const t=f(Go.general.root);if(!t)return;if(i===t)return;let a;i=t;const s=location.pathname,l=e.getState().navigation.pageIdentifier,d="/create/story/"!==s&&s.startsWith("/create/");a=s.startsWith("/accounts/signup/")||"loginPage"===l||"unifiedHome"===l?{width:460,borders:!0}:d?{width:490,borders:!0}:"StoriesPage"===l?{width:460,borders:!1}:"exploreLandingPage"===l||"profilePage"===l?{width:900,borders:!1}:{width:550,borders:!1};const c=f(Go.general.tabBar),p=f(Go.general.header),u=f(Go.general.content);if(c&&(c.style.opacity=0),p&&(p.style.opacity=0),u&&(u.style.transition=null,u.style.transform="translateY(3px)",u.style.opacity=0),await K.send("ig.update-ig-view",{fullscreenWidth:a.width,withBorder:a.borders}),c&&(c.style.opacity=null),p&&(p.style.opacity=null),u&&(u.style.transition="transform 0.2s, opacity 0.2s",u.style.transform=null,u.style.opacity=null),!r)return void(n.scrollTop=0);r=!1;const g=o[location.href];g?(n.scrollTop=g.scrollTop,requestAnimationFrame((()=>{const t=g.anchor;if(!t)return;const e=f(t.selector);if(!e)return;const o=e.getBoundingClientRect().top;n.scrollTop+=o-t.top}))):n.scrollTop=0}l.push=(...t)=>(o[location.href]={scrollTop:n.scrollTop,anchor:Jo()},d.call(l,...t)),window.addEventListener("popstate",(()=>{r=!0})),K.on("ig.widescreen-toggled",c),p((()=>{window.innerWidth<t||c()}),!0)}({minWidth:460})}};let Go;function Jo(){try{const t=f(Go.general.content);if(!t)return null;const e=h("*",t);for(const t of e){const e=t.getBoundingClientRect().top;if(e<0)continue;const n=Ko(t);if(!n)return;if(!(h(n).length>1))return{top:e,selector:n}}return null}catch(t){return console.error("unable to find scroll anchor",{details:t}),null}}function Ko(t){try{const e=t.tagName.toLowerCase(),n=Array.from(t.classList).map((t=>`.${t}`)).join("");return`${e}${n}${t.getAttributeNames().map((e=>"class"===e||"style"===e?"":`[${e}="${t.getAttribute(e)}"]`)).join("")}`}catch(e){return console.error("unable to get selector for an element",{details:e,elem:t}),""}}var Zo={init:function(){Qo=st.getConfig().igSelectors,io.onDocClick((t=>{const e=t.target.closest(".-wt5I");e&&setTimeout((()=>{document.body.contains(e)&&e.click()}),300)})),function(){const t=HTMLElement.prototype.getBoundingClientRect;HTMLElement.prototype.getBoundingClientRect=function(...e){const n=t.call(this,...e);return 0===n.height&&(n.height=1),n}}(),c`
    <style>
      /* story spinner */
      .u6s6p {
        display: none !important;
      }
    </style>
  `,c`
    <style>
      ${Qo["story-container"]} {
        width: 100% !important;
        height: 100% !important;
      }

      ${Qo["story-image"]},
      ${Qo["story-video"]},
      ${Qo["story-loading-preview"]} {
        object-fit: contain;
      }
    </style>
  `,c`
    <style>
      .theme-night ${Qo.storyViewer.pollContainer} {
        filter: url(#theme-reverse-filter);
        color: transparent;
      }

      ${Qo.storyViewer.pollButtons} {
        font-family: inherit !important;
      }

      ${Qo.storyViewer.pollAnswerDigitOrEmoji} {
        -webkit-text-fill-color: inherit !important;
      }

      ${Qo.storyViewer.pollAnswerDigitOrEmoji} .emoji {
        filter: none !important;
        color: initial !important;
        -webkit-text-fill-color: initial !important;
      }
    </style>
  `,document.addEventListener("keyup",(t=>{if("Escape"===t.key){const t=f(Qo.storyViewer.closeButton);if(!t)return;t.click()}else if("ArrowLeft"===t.key){const t=f(Qo.storyViewer.prevButton);if(!t)return;t.click()}else if("ArrowRight"===t.key){const t=f(Qo.storyViewer.nextButton);if(!t)return;t.click()}})),function(){const t="__manageStoriesAutoplay";let e=null,n=!1;p((()=>{const o=f(Qo["stories-viewer"]);e&&!o&&(n=!1,io.docElem.classList.remove("enable-stories-autoplay")),e=o;const i=f(Qo["story-video-play-button"]);n&&i&&!i[t]&&setTimeout((()=>{i[t]=!0,i.click()}),200)})),io.onDocClick((e=>{const o=e.target.closest(Qo["story-video-play-button"]);o&&!n&&(o[t]=!0,n=!0,io.docElem.classList.add("enable-stories-autoplay"))})),c`
    <style>
      .enable-stories-autoplay ${Qo["story-video-play-button"]} {
        opacity: 0;
      }
    </style>
  `}(),function(){const t=window.addEventListener;window.addEventListener=(...e)=>{if("blur"!==e[0])return t.call(window,...e)}}()}};let Qo;var ti={storySharingPost:!1},ei={init:function(){ni=st.getConfig().igSelectors,c`
    <style>
      ${ni.storyCreation.topRightButton} {
        cursor: pointer;
      }
    </style>
  `,async function(){const t=await lt("store");if(!t)return;const e=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(...n){if(!(9===n.length&&n[0]instanceof HTMLImageElement&&"/create/story/"===location.pathname))return e.call(this,...n);const o=f(ni.storyCreation.root);if(!o)return e.call(this,...n);const i=JSON.parse(JSON.stringify(t.getState())).displayProperties.pixelRatio;let r,a;o.offsetWidth/o.offsetHeight>9/16?(r=o.offsetHeight*(9/16),a=o.offsetHeight):(r=o.offsetWidth,a=o.offsetWidth/(9/16)),o.style.width=`${r}px`,o.style.height=`${a}px`,h("canvas").forEach((t=>{t.style.width=`${r}px`,t.style.height=`${a}px`,t.setAttribute("width",r*i),t.setAttribute("height",a*i)}));const s=n[0],l=.04,d=s.width/s.height,c=d>9/16*(1-l)&&d<(1+l)*(9/16)?"cover":"contain";this.restore();const p=r*i,u=a*i;"contain"===c&&(this.filter="blur(170px)",e.call(this,s,-300,-300,p+600,u+600),this.filter="none");const g=function({type:t,width:e,height:n,containerWidth:o,containerHeight:i,offset:r=0}){const a=e/n,s=o/i;return a>s&&"contain"===t||a<s&&"cover"===t?{dx:0+r,dy:(i-o/a)/2+r,width:o-2*r,height:o/a-2*r}:{dx:(o-i*a)/2+r,dy:0+r,width:i*a-2*r,height:i-2*r}}({type:c,width:s.width,height:s.height,containerWidth:p,containerHeight:u,offset:ti.storySharingPost?60:0});if(e.call(this,s,g.dx,g.dy,g.width,g.height),ti.storySharingPost){const e=f("canvas").getContext("2d"),n=t.getState().displayProperties.pixelRatio,o=ti.storySharingPost.owner.username,i=60/n,r=(g.dy+g.height+40)/n;e.save(),e.scale(n,n),e.fillStyle="white",e.shadowColor="rgba(150, 150, 150, 0.3)",e.shadowOffsetX=0,e.shadowOffsetY=1,e.shadowBlur=2,e.font="600 22px sans-serif",e.textAlign="left",e.textBaseline="top",e.fillText(`@${o}`,i,r),e.restore()}}}(),p((()=>{const t=f(ni.storyCreation.root);document.documentElement.classList.toggle("story-creation-small-button",t&&t.offsetWidth<360)})),c`
    <style>
      .story-creation-small-button${ni.storyCreation.headerButton} {
        transform: scale(0.8);
        margin: 0;
      }
    </style>
  `,function(){const t=Symbol("handled");p((async()=>{const e=f(ni.storyCreation.root);if(!e)return;if(e[t])return;e[t]=!0;if(await K.send("ig.is-fullscreen"))return;const n=document.documentElement;n.classList.add("story-creation-dark-background"),p((function t(){f(ni.storyCreation.root)||(p.off(t),n.classList.remove("story-creation-dark-background"))}))})),c`
    <style>
      .story-creation-dark-background body {
        background: #0d0d0d;
      }
      .theme-night.story-creation-dark-background body {
        background: #fdfdfd;
      }
    </style>
  `}(),async function(){const t=await lt("http");if(!t)return;const e=t.post.bind(t),n=async(t,o=1)=>{console.log(`trying to post a story, attempt no.${o}`);const i=await e(...t);return"fail"===i.status&&"Transcode not finished yet."===i.message&&o<5?(await wt(3e3),n(t,o)):i};t.post=(...t)=>"/create/configure_to_story/"!==t[0]?e(...t):n(t)}(),p((()=>{const t=f(ni.storyCreation.downloadButton);t&&t.remove()})),c`
    <style>
      ${ni.storyCreation.mentionBarContainer} {
        width: calc(100% - 100px) !important;
        height: 94px !important;
        top: 0 !important;
        margin-left: -100px !important;
      }

      ${ni.storyCreation.mentionBar} {
        height: 100% !important;
        border-radius: 0 0 8px 0;
        position: static;
      }

      ${ni.storyCreation.mentionReel} {
        height: 100% !important;
        position: static;
      }

      ${ni.storyCreation.mentionReelRow} {
        height: 100% !important;
        align-items: center !important;
        position: static;
      }
      ${ni.storyCreation.mentionReelRow}:not(:empty)::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 0 8px 8px 0 !important;
        background: rgba(0 , 0 , 0 , 0.2) !important;
      }

      ${ni.storyCreation.mentionReelItem} {
        margin: 0 10px 0 0 !important;
      }
      ${ni.storyCreation.mentionReelItem}:last-child {
        margin-right: 0 !important;
      }
    </style>
  `}};let ni;var oi={init:async function(){if(ii=st.getConfig().igSelectors,ri=await lt("store"),!ri)return;Ne((function(t){t.target.closest('[href="/direct/inbox/"]')&&(t.preventDefault(),K.send("ig.open-sidebar-dm"))}),{capture:!0}),function(){const t=Symbol("handled");p((async()=>{const o=f(ii.profilePage.threeDots);if(!o)return;let i=f(".write-button");if(i&&i!==o.previousElementSibling)return i.remove(),void(o[t]=!1);if(o[t])return;o[t]=!0;const r=f(ii.profilePage.writeButton);if(r)return void r.addEventListener("click",(t=>{t.stopPropagation(),e()}),{capture:!0});await n()&&(o.insertAdjacentHTML("beforebegin",'\n      <button class="write-button">\n        <svg xmlns="http://www.w3.org/2000/svg" width="19.998" height="17.224" viewBox="0 0 19.998 17.224">\n          <path d="M2.079.75h16.57L9.818 15.071l-1.3-9zm6.508 5.315l9.68-5.127" fill="none" stroke="currentColor" stroke-width="1.5"/>\n        </svg>\n      </button>\n    '),i=f(".write-button"),i.addEventListener("click",e))})),c`
    <style>
      .write-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 17px;
        margin-left: 8px;
        border: none;
        border-radius: 4px;
        color: #000;
        background: transparent;
        cursor: pointer;
        user-select: none;
      }

      ${ii.profilePage.followButton} {
        width: auto !important;
      }

      ${ii.profilePage.buttonsRow} {
        flex-grow: 0;
        flex-direction: row;
      }

      ${ii.profilePage.blueButtonsWrap} {
        flex-grow: 0;
        flex-shrink: 0;
      }

      ${ii.profilePage.subscribeButtonWrap} {
        flex-shrink: 1 !important;
        overflow: hidden !important;
      }

      @media (max-width: 320px) {
        ${ii.profilePage.writeButton} {
          max-width: 85px;
        }
      }
    </style>
  `;const e=async()=>{const t=await n();t&&K.send("ig.start-conversation-in-sidebar-dm",t.id)},n=async()=>{const t=location.pathname.split("/")[1];return await l((()=>{const e=ri.getState(),n=e.users.usernameToId.get(t);return e.users.users.get(n)||null}))}}(),function(){const t=Symbol("handled");p((()=>{const e=f(ii.dm.textarea);e&&(e[t]||(e[t]=!0,e.addEventListener("keydown",(t=>{if(13===t.keyCode&&!t.shiftKey&&!t.ctrlKey){const e=f(ii.dm.sendButton);if(!e)return;t.preventDefault(),e.click()}}))))}))}(),function(){const t=Symbol("handled");p((()=>{const e=f(ii.dm.textarea);e&&(e[t]||(e[t]=!0,e.focus()))}))}()}};let ii,ri;var ai={init:async function(){if(li=await lt("store"),!li)return;si=st.getConfig().igSelectors,function(){const t=Symbol("handled");p((()=>{const e=f(si.profilePage.content);if(!e)return;if(e[t])return;e[t]=!0;const n=ci({empty:!0});e.insertAdjacentHTML("afterbegin",n),(async()=>{try{const t=location.pathname.split("/")[1],n=await l((()=>Co.getUserDetails(t)));if(!document.body.contains(e))return;if(di.grade=await K.send("chrome-bus","insights.get-credibility-grade",n),!document.body.contains(e))return;const o=n.edge_owner_to_timeline_media.edges.map((t=>t.node));di.engagement=function({user:t,posts:e}){const n=li.getState().users.viewerId===t.id;if(t.isPrivate&&!n||0===e.length)return{value:"N/A",color:"#D8DADD",label:""};const o=e.map((t=>t.comments+t.likes)).reduce(((t,e)=>t+e),0),i=e.length>0?o/e.length:0,r=t.followerCount>0?i/t.followerCount*100:0,a=`${r<5?(Math.round(10*r)/10).toFixed(1):Math.round(r).toString()}%`,s={value:a,color:"#797979",label:"average"},l={value:a,color:"#74BE86",label:"above avg"},d={value:a,color:"#74BE86",label:"high"},c={value:a,color:"#74BE86",label:"v. high"},p={value:a,color:"#74BE86",label:"extreme"},u=r/(64.18845*Math.pow(t.followerCount,-.2251755));if(u<.4)return s;if(u<.8)return l;if(u<1.2)return d;if(u<1.8)return c;return p}({user:{id:n.id,isPrivate:n.is_private,followerCount:n.edge_followed_by.count},posts:o.map((t=>({likes:t.edge_liked_by.count,comments:t.edge_media_to_comment.count})))});const i=JSON.parse(JSON.stringify(li.getState())).users.viewerId;di.followStatus={show:String(i)!==String(n.id),value:n.follows_viewer};f(".profile-bar").outerHTML=ci();be({anchor:f(".profile-bar__info-circle"),class:"profile-bar__info-tooltip",text:"\n            <b>Account Grade</b>\n            <br/>\n            This estimates if Instagram account is<br/>\n            spam / inactive or a real person / business.\n            Inssist relies on Machine Learning to identify\n            the grade.\n            <br/><br/>\n\n            <b>Engagement Rate</b>\n            <br/>\n            Profile engagement rate is calculated as\n            <code>(likes + comments) / followers</code>, for the last<br/>\n            12 posts. The higher account engagement,<br/>\n            the more active the followers are.\n            <br/><br/>\n\n            <b>Follow Status</b>\n            <br/>\n            Shows if this account is following you or not.\n            <br/><br/>\n\n            Account Grade and Engagement Rate are<br/>\n            not available for private accounts.\n          "})}catch(t){console.error("ig profile bar controller → manageBarCreation:",t);const e=f(".profile-bar");e&&e.remove()}})()}))}(),c`
    <style>
      .profile-bar {
        height: 48px;
        border-bottom: 1px solid #DBDBDB;
        background: #FCFCFD;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 12px;
      }
      .profile-bar::before,
      .profile-bar::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: -1px;
        width: calc(calc(100% - 400px) / 2);
      }
      .profile-bar::before {
        left: 0;
        background: linear-gradient(to right, white 40%, transparent);
      }
      .profile-bar::after {
        right: 0;
        background: linear-gradient(to left, white 40%, transparent);
      }

      .profile-bar__items {
        display: flex;
        flex-direction: row;
      }

      .profile-bar__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 40px;
      }
      .profile-bar__item:last-child {
        margin-right: 0;
      }

      .profile-bar__value {
        color: #262626;
        font-weight: 600;
        flex-direction: row;
      }

      .profile-bar__label {
        color: #999;
        font-weight: 500;
      }

      .profile-bar__info-circle {
        position: absolute !important;
        top: 50%;
        left: 50%;
        margin-top: -6px;
        margin-left: 200px;
        z-index: 1;
        transition: opacity 0.2s;
      }
      .profile-bar:not(:hover) .profile-bar__info-circle {
        opacity: 0;
      }

      .profile-bar__info-tooltip {
        width: 306px;
      }

      @media (max-width: 400px) {
        .profile-bar::before,
        .profile-bar::after {
          display: none;
        }

        .profile-bar__item {
          margin-right: 24px;
        }
      }

      @media (max-width: 440px) {
        .profile-bar__info-circle {
          top: 5px;
          left: auto;
          right: 8px;
          margin-left: auto;
          margin-top: auto;
        }
      }
    </style>
  `}};let si,li;const di={grade:null,engagement:null,followStatus:null};function ci({empty:t=!1}={}){return t?'\n      <div class="profile-bar"></div>\n    ':`\n    <div class="profile-bar">\n      <div class="profile-bar__items">\n        <div class="profile-bar__item">\n          <div class="profile-bar__value">\n            ${di.grade?`\n              <span style="color: ${di.grade.color}">${di.grade.value}</span>,\n              ${di.grade.label}\n            `:""}\n          </div>\n          <div class="profile-bar__label">\n            Account grade\n          </div>\n        </div>\n        <div class="profile-bar__item">\n          <div class="profile-bar__value">\n            <span style="color: ${di.engagement.color}">${di.engagement.value}</span>\n            ${di.engagement.label?`, ${di.engagement.label}`:""}\n          </div>\n          <div class="profile-bar__label">\n            Engagement\n          </div>\n        </div>\n        ${di.followStatus.show?`\n          <div class="profile-bar__item">\n            <div class="profile-bar__value">\n              ${di.followStatus.value?"Yes":"No"}\n            </div>\n            <div class="profile-bar__label">\n              Follows me\n            </div>\n          </div>\n        `:""}\n      </div>\n      <div class="profile-bar__info-circle info-circle">?</div>\n    </div>\n  `}var pi={init:async function(){if(ui=st.getConfig().igSelectors,gi=await lt("nav"),fi=await lt("http"),hi=await lt("store"),mi=await lt("add-dispatch-listener"),!(gi&&fi&&hi&&mi))return void console.error("failed to require",{nav:gi,http:fi,store:hi,addDispatchListener:mi});mi((t=>{"STORY_CREATION_EXIT"===t.type&&(ti.storySharingPost=null)})),function(){let t;mi((e=>{"POST_SHARE_IDS_LOADED"===e.type&&(t=e.postId)}));const e=Symbol("handled");p((()=>{if(!f(ui.dragPanel.copyLinkIcon))return;const n=f(ui.dragPanel.shareMenuItem);if(!n)return;if(n[e])return;n[e]=!0,n.insertAdjacentHTML("beforebegin",'\n      <div class="share-to-story">\n        <div class="share-to-story__icon">\n          <svg class="share-to-story__icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12.474 22.779a11.28 11.28 0 01-5.294-1.32.777.777 0 11.732-1.37 9.741 9.741 0 006.775.884.777.777 0 01.353 1.513 11.326 11.326 0 01-2.566.293zm-7.205-2.871a.773.773 0 01-.534-.213 11.218 11.218 0 01-3.2-5.509.777.777 0 011.51-.366 9.667 9.667 0 002.757 4.748.777.777 0 01-.534 1.34zm-3.221-8.651h-.077a.776.776 0 01-.7-.849 11.174 11.174 0 01.995-3.632.777.777 0 011.408.656 9.618 9.618 0 00-.854 3.122.777.777 0 01-.772.703zm3.258-6.58a.777.777 0 01-.6-1.269q.1-.127.211-.25a.777.777 0 111.171 1.02c-.062.071-.122.143-.182.215a.776.776 0 01-.6.284zm12.543 16.62a.777.777 0 01-.4-1.443 9.7 9.7 0 00-4.975-18.03.777.777 0 110-1.554 11.255 11.255 0 015.773 20.917.77.77 0 01-.398.11z" fill="currentColor"/><path d="M17.723 10.788h-4.45v-4.45H11.72v4.45H7.27v1.553h4.45v4.45h1.553v-4.45h4.45z" fill="currentColor"/></svg>\n        </div>\n        <div class="share-to-story__text">\n          Share to Story\n        </div>\n      </div>\n    ');f(".share-to-story").addEventListener("click",(e=>{e.stopPropagation(),async function(t){const e=hi.getState().posts.byId.get(t);if(!e)return;const n=await fetch(e.src,{credentials:"omit"}),o=await n.blob(),i=URL.createObjectURL(o),{width:r,height:a}=await new Promise((t=>{const e=new Image;e.src=i,e.addEventListener("load",(()=>{t({width:e.width,height:e.height})}))}));ti.storySharingPost=e,hi.dispatch({type:"STORY_CREATION_SESSION_STARTED",entryPoint:"quick_cam_button",sessionId:Math.random().toString().slice(2),startTime:Date.now()}),hi.dispatch({type:"STORY_CREATION_IMAGE_PROCESSED",flash:!1,location:null,orientation:0,sourceImage:o,sourceDataURL:i,width:r,height:a}),gi.push("/create/story/")}(t),K.send("ga.send-event","user","ig:share-to-story-click")}))})),c`
    <style>
      .share-to-story {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 16px;
        cursor: pointer;
      }
      .share-to-story:hover {
        background: #FAFAFA;
      }

      .share-to-story__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        margin-right: 12px;
      }

      .share-to-story__icon-svg {
        width: 24px;
        height: 24px;
        position: relative;
        left: 1px;
      }

      .share-to-story__text {
        font-weight: 600;
      }
    </style>
  `}(),function(){const t=fi.post.bind(fi);fi.post=(...e)=>("/create/configure_to_story/"===e[0]&&ti.storySharingPost&&(e[1]={...e[1],reshared_media_id:ti.storySharingPost.id,story_sticker_ids:`media_simple_${ti.storySharingPost.id}`,attached_media:JSON.stringify([{x:.5,y:.5,width:.5,height:.5,rotation:0,media_id:ti.storySharingPost.id,media_owner_id:ti.storySharingPost.owner.id,is_sticker:!0}])}),t(...e))}()}};let ui,gi,fi,hi,mi;var bi={init:function(){!async function(){const t=await lt("store");if(!t)return;const e=Symbol("handled");p((()=>{const n=f(".get-insights-button-row");if(!n)return;if(n[e])return;n[e]=!0;const o=t.getState(),i=o.navigation.displayedRoute.split("/")[1],r=o.users.usernameToId.get(i);if(!r)return;const a=o.users.users.get(r);if(!a)return;const s=a.businessEmail;s&&n.insertAdjacentHTML("afterbegin",`\n      <a class="profile-email-button" href="mailto:${s}">\n        Email\n      </a>\n    `)})),c`
    <style>
      .profile-email-button {
        display: block;
        margin-right: 8px;
        margin-bottom: 12px;
        height: 30px;
        line-height: 28px;
        padding: 0 9px;
        font-weight: 600;
        color: #262626;
        background: transparent;
        border: 1px solid #dbdbdb;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
        box-sizing: border-box;
      }
    </style>
  `}()}};var vi={init:function(){yi=st.getConfig().igSelectors,async function(){const t=await lt("store"),e=await lt("http");if(!t||!e)return;const n=Symbol("handled");p((()=>{const o=f(yi.general.actionDialogWithoutHeader);if(!o)return;if(o[n])return;o[n]=!0;const i=t.getState();if("postPage"!==i.navigation.pageIdentifier)return;const r=location.pathname.split("/")[2],a=i.posts.byId.toJS(),s=Object.values(a).find((t=>t.code===r));if(!s)return;if(s.owner.id!==i.users.viewerId)return;const l=f(yi.general.modalWindow);if(!l)return;o.firstChild.insertAdjacentHTML("afterend",'\n      <button class="edit-post-action-button">\n        Edit Caption\n      </button>\n    ');f(".edit-post-action-button").addEventListener("click",(()=>{l.classList.add("post-editor"),o.innerHTML=`\n        <form class="post-editor__form">\n          <div class="post-editor__title">\n            Edit Caption\n          </div>\n          <textarea\n            class="post-editor__textarea"\n            placeholder="Write a caption..."\n            maxlength="2200"\n            spellcheck="false"\n            required\n          >${s.caption||""}</textarea>\n          <div class="post-editor__buttons">\n            <button class="post-editor__button-save button" type="submit">\n              Save Caption\n            </button>\n            <button class="post-editor__button-cancel button button_cancel">\n              Cancel\n            </button>\n          </div>\n          <div class="post-editor__error"></div>\n        </form>\n      `;const t=f(".post-editor"),n=f(".post-editor__textarea"),i=f(".post-editor__button-save"),r=f(".post-editor__button-cancel"),a=f(".post-editor__error");setTimeout((()=>{n.focus(),n.setSelectionRange(n.value.length,n.value.length)}),300),n.addEventListener("input",(()=>{t.classList.remove("post-editor_with-error")})),t.addEventListener("submit",(async o=>{var l;let d;o.preventDefault(),n.disabled=!0,i.disabled=!0,r.disabled=!0,i.innerText="Saving...";try{d=await e.post(`https://i.instagram.com/api/v1/media/${s.id}/edit_media/`,{media_id:s.id,_csrftoken:window._sharedData.config.csrf_token,_uid:window._sharedData.config.viewerId,_uuid:window._sharedData.config.viewerId,caption_text:f(".post-editor__textarea").value})}catch(o){d={error:o}}var c,p,u,g,h,m,b;"ok"===(null===(l=d)||void 0===l?void 0:l.status)?location.reload():(n.disabled=!1,i.disabled=!1,r.disabled=!1,i.innerText="Save Caption",t.classList.add("post-editor_with-error"),"igtv"===s.productType?a.innerHTML="\n              Instagram refused to edit caption.\n              Please use Instagram Mobile App to edit IGTV captions.\n            ":a.innerText=(null===(c=d)||void 0===c||null===(p=c.error)||void 0===p?void 0:p.message)||(null===(u=d)||void 0===u||null===(g=u.error)||void 0===g||null===(h=g.responseObject)||void 0===h?void 0:h.message)||(null===(m=d)||void 0===m||null===(b=m.error)||void 0===b?void 0:b.responseText)||"Unknown error")})),r.addEventListener("click",(()=>{const t=f(yi.general.modal);if(!t)return;const e=new MouseEvent("mousedown",{bubbles:!0});t.dispatchEvent(e)}))}))})),c`
    <style>
      .edit-post-action-button {
        height: 48px;
        padding: 4px 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        background: transparent;
        border: none;
        border-top: 1px solid #dbdbdb;
        cursor: pointer;
      }
      .edit-post-action-button:active {
        background: rgba(0, 0, 0, 0.1);
      }

      .post-editor {
        width: 380px !important;
        max-width: calc(100% - 26px) !important;
      }

      .post-editor__form {
        display: flex;
        flex-direction: column;
        margin: 16px;
        height: 330px;
        max-height: calc(100vh - 26px);
      }

      .post-editor__title {
        font-weight: 500;
        margin-left: 9px;
        margin-bottom: 12px;
      }

      .post-editor__textarea {
        color: #3F3E3F;
        border: 1px solid #EFEFEF;
        background: #F7F7F9;
        border-radius: 4px;
        resize: none;
        padding: 6px 8px;
        flex-grow: 1;
      }
      .post-editor__textarea::placeholder {
        color: #3F3E3F;
        opacity: 0.5;
      }
      .post-editor__textarea:disabled {
        opacity: 0.5;
      }
      .theme-night .post-editor__textarea {
        border-color: #101010;
        background: #060606 !important;
      }

      .post-editor__buttons {
        display: flex;
        flex-direction: row;
        margin-top: 12px;
      }

      .post-editor__error {
        display: none;
        color: #E34E21;
        margin-top: 12px;
        line-height: 19px;
      }
      .post-editor_with-error .post-editor__error {
        display: block;
      }
    </style>
  `}()}};let yi;var xi={init:async function(){if(wi=st.getConfig().igSelectors,_i=await lt("add-dispatch-listener"),!_i)return;(function(){const t=Symbol("handled");p((()=>{const e=f(wi.postCreation.captionContainer);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("beforeend",`\n      <div class="post-caption-limits">\n        <svg class="post-caption-limits__icon" xmlns="http://www.w3.org/2000/svg" width="28.824" height="26.006" viewBox="0 0 28.824 26.006">\n          <path d="M10.948 1.999a4 4 0 016.926 0l10.407 18.007a4 4 0 01-3.463 6H4.006a4 4 0 01-3.463-6z" fill="currentColor"/>\n          <path class="exclamation" d="M13.622 17.079l-.748-9.537 2.972.019-.753 9.518zm-.613 1.428h2.7v2.663h-2.7z" fill="#fff"/>\n        </svg>\n        <div class="post-caption-limits__text">${ki}</div>\n      </div>\n    `)))}))})(),c`
    <style>
      .post-caption-limits--show ${wi.postCreation.captionContainer} {
        padding-bottom: 32px;
      }

      .post-caption-limits--show ${wi.postCreation.submitPostButton} {
        opacity: 0.3;
        pointer-events: none;
      }

      .post-caption-limits {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0 18px 8px;
        color: #E34E21;
      }
      html:not(.post-caption-limits--show) .post-caption-limits {
        display: none;
      }
      .theme-night .post-caption-limits {
        filter: url(#theme-reverse-filter);
        color: #E94351;
      }

      .post-caption-limits__icon {
        width: 14px;
        height: 14px;
        margin-right: 8px;
      }

      .post-caption-limits__text {
        font-size: 14px;
      }
    </style>
  `,_i((t=>{if("CREATION_CAPTION_CHANGED"!==t.type)return;const e=t.caption,n=(e.match(/@[\p{L}\d_]+/gu)||[]).length,o=(e.match(/#[\p{L}\d_]+/gu)||[]).length;ki=e.length>Pi?`Caption length exceeded: ${e.length} / ${Pi}`:n>Si?`Mention limit exceeded: ${n} / ${Si}`:o>Ci?`Hashtag limit exceeded: ${o} / ${Ci}`:"",s.classList.toggle("post-caption-limits--show",!!ki);const i=f(".post-caption-limits__text");i&&(i.innerText=ki)}))}};let wi,_i,ki="";const Pi=2200,Si=30,Ci=30;var Ei={init:async function(){if(Ti=st.getConfig().igSelectors,Ai=await lt("http"),$i=await lt("store"),Li=await lt("add-dispatch-listener"),!Ai||!$i||!Li)return;!function(){let t=0;const e=Ai.post;Ai.post=async(...i)=>{const r=i[0],a=r.includes("/create/configure/"),s=r.includes("/media/configure_to_clips/"),l=a||s;let d;try{d=await e.call(Ai,...i)}catch(t){if(!s||"AjaxError"!==t.name||""!==t.message||0!==t.statusCode||""!==t.networkError)throw t;d={status:"fail"}}if(!l)return d;return"fail"===d.status?t<20?(t+=1,requestAnimationFrame((()=>{$i.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Publishing Post..."}),n()})),setTimeout((()=>{Ai.post(...i)}),5e3),d):(t=0,requestAnimationFrame((()=>{$i.dispatch({type:"UPDATE_UPLOAD_TEXT",text:d.message?`Error: ${d.message}`:"Unknown error."}),o();const t=f(Ti.general.uploadPanel);if(!t)return;t.insertAdjacentHTML("beforeend",'\n        <button class="retry-upload-button clickable">\n          Retry\n        </button>\n      ');const e=f(".retry-upload-button");e.addEventListener("click",(()=>{$i.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Publishing Post..."}),n(),Ai.post(...i),e.remove()}))})),d):(t=0,requestAnimationFrame((()=>{$i.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Done."}),o()})),d)};const n=()=>{if(f(".PublishingDisclaimer"))return;const t=f(Ti.general.publishingBarText);t&&t.insertAdjacentHTML("beforeend",'\n      <div class="PublishingDisclaimer">\n        This might take a&nbsp;few minutes.\n        Please keep this tab open.\n      </div>\n    ')},o=()=>{const t=f(".PublishingDisclaimer");t&&t.remove()};c`
    <style>
      .PublishingDisclaimer {
        color: #A0A0A0;
        font-weight: 400;
        margin-top: 3px;
      }

      .retry-upload-button {
        font-weight: 600;
        color: #0095f6;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
      }
    </style>
  `}()}};let Ti,Ai,$i,Li;var Ri={init:async function(){window.ig=io,Kn.init(),o.isIframe()&&async function(){if(!e.get("inssist.isDevelopment"))return;window.store=await io.require("store"),Object.defineProperty(window,"state",{get:function(){const t=window.store.getState();return JSON.parse(JSON.stringify(t))}});const t=await io.require("add-dispatch-listener");let n=!1;window.showActions=()=>{n=!0},window.hideActions=()=>{n=!1},t((t=>{n&&console.warn(t)}))}();if(!o.isIframe())return oe.init(),qn.init(),void jn.init();const t=o.isIframe("inssist-ig"),n=o.isIframe("inssist-dm"),i=o.isIframe("inssist-igtv");(t||n||i)&&(tn.initForIg(),Ke.init());if(t)return re.init(),ge.init(),je.init(),qe.init(),wo.init(),Co.init(),$o.init(),Ro.init(),Mo.init(),Io.init(),Xo.init(),Zo.init(),ei.init(),oi.init(),ai.init(),pi.init(),on.init(),an.init(),dn.init(),bi.init(),vi.init(),gn.init(),xi.init(),Ei.init(),ve.init(),vn.init(),eo.init(),void Po.init();if(n)return await r(),void Xt.init();i&&(await r(),te.init())}};({init:function(){Ri.init()}}).init()}();