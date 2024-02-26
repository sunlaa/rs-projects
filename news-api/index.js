(()=>{"use strict";var n={96:(n,e,t)=>{t.d(e,{c:()=>a});var r=t(500),o=t.n(r),s=t(312),i=t.n(s)()(o());i.push([n.id,".news__item {\n    display: flex;\n    flex-direction: column;\n    margin: 1rem auto;\n    margin-bottom: 1.6%;\n    background: #fff;\n    color: #333;\n    line-height: 1.4;\n    font-family: Arial, sans-serif;\n    border-radius: 15px;\n    overflow: hidden;\n}\n\n.news__item:hover .news__meta-photo {\n    transform: scale(1.3) rotate(3deg);\n}\n\n.news__item .news__meta {\n    position: relative;\n    height: 200px;\n}\n\n.news__item .news__meta-photo {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background-size: cover;\n    background-position: center;\n    transition: transform 0.2s;\n}\n\n.news__item .news__meta-details,\n.news__item .news__meta-details ul {\n    margin: auto;\n    padding: 0;\n    list-style: none;\n}\n\n.news__item .news__meta-details {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: -120%;\n    margin: auto;\n    transition: left 0.2s;\n    background: rgba(0, 0, 0, 0.6);\n    color: #fff;\n    padding: 10px;\n    width: 100%;\n    font-size: 0.9rem;\n}\n\n.news__item .news__description {\n    padding: 1rem;\n    background: #fff;\n    position: relative;\n    z-index: 1;\n}\n\n.news__item .news__description h2 {\n    line-height: 1;\n    margin: 0;\n    font-size: 1.7rem;\n}\n\n.news__item .news__description h3 {\n    font-size: 1rem;\n    font-weight: 300;\n    text-transform: uppercase;\n    color: #a2a2a2;\n    margin-top: 5px;\n}\n\n.news__item .news__description .news__read-more {\n    text-align: right;\n}\n\n.news__item .news__description .news__read-more a {\n    color: #add765;\n    display: inline-block;\n    position: relative;\n    text-decoration: none;\n    font-weight: 800;\n}\n\n.news__item .news__description .news__read-more a:after {\n    content: '→';\n    margin-left: -10px;\n    opacity: 0;\n    vertical-align: middle;\n    transition:\n        margin 0.3s,\n        opacity 0.3s;\n}\n\n.news__item .news__description .news__read-more a:hover:after {\n    margin-left: 5px;\n    opacity: 1;\n}\n\n.news__item p {\n    margin: 1rem 0 0;\n}\n\n.news__item p:first-of-type {\n    margin-top: 1.25rem;\n    position: relative;\n}\n\n.news__item p:first-of-type:before {\n    content: '';\n    position: absolute;\n    height: 5px;\n    background: #add765;\n    width: 35px;\n    top: -0.75rem;\n    border-radius: 3px;\n}\n\n.news__item:hover .news__meta-details {\n    left: 0%;\n}\n\n.no-news-report {\n    width: 50%;\n    padding: 5rem;\n    margin: 1rem auto;\n    text-align: center;\n    font-size: 1.5rem;\n    font-weight: 700;\n    color: #000000;\n    background-color: #ffffff;\n    border-radius: 20px;\n    text-wrap: wrap;\n}\n\n@media (min-width: 640px) {\n    .news__item {\n        flex-direction: row;\n        max-width: 700px;\n    }\n\n    .news__item .news__meta {\n        flex-basis: 40%;\n        height: auto;\n    }\n\n    .news__item .news__description {\n        flex-basis: 60%;\n    }\n\n    .news__item .news__description:before {\n        -webkit-transform: skewX(-3deg);\n        transform: skewX(-3deg);\n        content: '';\n        background: #fff;\n        width: 30px;\n        position: absolute;\n        left: -10px;\n        top: 0;\n        bottom: 0;\n        z-index: -1;\n    }\n\n    .news__item.alt {\n        flex-direction: row-reverse;\n    }\n\n    .news__item.alt .news__description:before {\n        left: inherit;\n        right: -10px;\n        -webkit-transform: skew(3deg);\n        transform: skew(3deg);\n    }\n\n    .news__item.alt .news__meta-details {\n        padding-left: 25px;\n    }\n}\n",""]);const a=i},376:(n,e,t)=>{t.d(e,{c:()=>a});var r=t(500),o=t.n(r),s=t(312),i=t.n(s)()(o());i.push([n.id,".sources {\n    display: flex;\n    flex-wrap: wrap;\n    width: 100%;\n    height: auto;\n    align-items: center;\n    justify-content: center;\n    font:\n        300 1em 'Fira Sans',\n        sans-serif;\n}\n\n.source__item {\n    background: none;\n    border: 2px solid #17181c;\n    border-radius: 15px;\n    font: inherit;\n    line-height: 1;\n    margin: 0.5em;\n    padding: 1em 2em;\n    color: #17181c;\n    transition: 0.25s;\n    cursor: pointer;\n}\n\n.source__item:hover,\n.source__item:focus {\n    border-color: #24281e;\n    color: #e7f0d7;\n    box-shadow: 0 0.5em 0.5em -0.4em #e7f0d7;\n    transform: translateY(-0.25em);\n}\n\n.source__item-name {\n    font-weight: 400;\n    white-space: nowrap;\n}\n",""]);const a=i},152:(n,e,t)=>{t.d(e,{c:()=>a});var r=t(500),o=t.n(r),s=t(312),i=t.n(s)()(o());i.push([n.id,".choose-lang {\n    display: none;\n}\n.filter-menu {\n    display: none;\n}\n\n.filter {\n    padding: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n}\n\n.lang__btn {\n    cursor: pointer;\n    user-select: none;\n    padding: 1rem 2rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: #000000;\n    box-shadow: 0.1em 0.1em 0.2em #000000;\n    color: #e7f0d7;\n    border-radius: 20px;\n    font-size: 0.8rem;\n    transition: all 150ms linear;\n}\n\n.lang__btn:hover {\n    background-color: #272727;\n}\n\n.lang__btn.active {\n    background-color: #e7f0d7;\n    box-shadow: 0.1em 0.1em 0.5em #e7f0d7;\n\n    color: #17181c;\n}\n\n.lang__btn-name {\n    pointer-events: none;\n}\n\n@media (max-width: 640px) {\n    .filter {\n        display: none;\n    }\n\n    .backdrop {\n        z-index: 1;\n        position: fixed;\n        inset: 0;\n        background-color: #00000058;\n    }\n    .filter-menu {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-wrap: wrap;\n        gap: 0.5rem;\n        z-index: 2;\n        height: 50dvh;\n        padding: 10px;\n        background-color: #9198e56c;\n        backdrop-filter: blur(3px);\n        position: fixed;\n        inset: 0;\n        border: solid 1px black;\n        border-bottom-left-radius: 30px;\n        border-bottom-right-radius: 30px;\n        transform: translateY(-110lvh);\n        transition: all 300ms linear;\n    }\n\n    .choose-lang {\n        user-select: none;\n        cursor: pointer;\n        display: block;\n        height: fit-content;\n        padding: 1rem;\n        color: #e7f0d7;\n        text-align: center;\n        font-weight: 500;\n        font-size: 1.2rem;\n        background-color: #000000;\n        border-radius: 20px;\n    }\n}\n\n@media (max-width: 350px) {\n    .filter-menu {\n        height: 70dvh;\n    }\n}\n",""]);const a=i},308:(n,e,t)=>{t.d(e,{c:()=>a});var r=t(500),o=t.n(r),s=t(312),i=t.n(s)()(o());i.push([n.id,"body {\n    color: #fff;\n    background: linear-gradient(#9198e5, #d5e8b1);\n    font-family: sans-serif;\n    min-height: 100vh;\n}\n\nheader {\n    padding: 10px 30px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\nheader h1 {\n    font-size: 40px;\n    font-weight: 800;\n    color: #17181c;\n}\n\nfooter {\n    height: 100px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 20px;\n}\nfooter .copyright {\n    font-size: 14px;\n    color: #333;\n    text-align: center;\n}\nfooter .copyright a {\n    color: #444;\n}\nfooter .copyright a:hover {\n    color: #555;\n}\nfooter .copyright:before {\n    content: '©';\n}\n",""]);const a=i},312:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",r=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),r&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),r&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,r,o,s){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(r)for(var a=0;a<this.length;a++){var c=this[a][0];null!=c&&(i[c]=!0)}for(var l=0;l<n.length;l++){var d=[].concat(n[l]);r&&i[d[0]]||(void 0!==s&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=s),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),e.push(d))}},e}},500:n=>{n.exports=function(n){return n[1]}},596:n=>{var e=[];function t(n){for(var t=-1,r=0;r<e.length;r++)if(e[r].identifier===n){t=r;break}return t}function r(n,r){for(var s={},i=[],a=0;a<n.length;a++){var c=n[a],l=r.base?c[0]+r.base:c[0],d=s[l]||0,u="".concat(l," ").concat(d);s[l]=d+1;var p=t(u),m={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)e[p].references++,e[p].updater(m);else{var f=o(m,r);r.byIndex=a,e.splice(a,0,{identifier:u,updater:f,references:1})}i.push(u)}return i}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var s=r(n=n||[],o=o||{});return function(n){n=n||[];for(var i=0;i<s.length;i++){var a=t(s[i]);e[a].references--}for(var c=r(n,o),l=0;l<s.length;l++){var d=t(s[l]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}s=c}}},176:n=>{var e={};n.exports=function(n,t){var r=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},808:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},120:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},520:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var s=t.sourceMap;s&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleTagTransform(r,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},936:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var s=e[r]={id:r,exports:{}};return n[r](s,s.exports,t),s.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.nc=void 0;var r={};(()=>{function n(n){if(null==n)throw new Error(`${n} is not defined!`)}var e;t.d(r,{y:()=>M}),function(n){n.ok="ok",n.error="error"}(e||(e={}));const o=class{constructor(n,e){this.baseLink=n,this.options=e}getResp(n,e=(()=>console.error("No callback for GET response"))){n.options||(n.options={}),this.load("GET",n,e)}errorHandler(n){if(!n.ok)throw 401!==n.status&&404!==n.status||console.log(`Sorry, but there is ${n.status} error: ${n.statusText}`),Error(n.statusText);return n}makeUrl(n){const e=Object.assign(Object.assign({},this.options),n.options);let t=`${this.baseLink}${n.endpoint}?`;return Object.keys(e).forEach((n=>{t+=`${n}=${e[n]}&`})),t.slice(0,-1)}load(n,e,t){fetch(this.makeUrl(e),{method:n}).then(this.errorHandler).then((n=>n.json())).then((n=>t(n))).catch((n=>console.error(n)))}};n("https://rss-news-api.onrender.com/"),n("8da9d50f786b4b00b7be76334113b7ac");const s=class extends o{constructor(){super("https://rss-news-api.onrender.com/",{apiKey:"8da9d50f786b4b00b7be76334113b7ac"})}},i=class extends s{getSources(n,e){super.getResp({endpoint:"sources",options:e},n)}assertInstance(n){if(!(n instanceof Element))throw new Error(`${n} is no defined!`)}getNews(e,t,r){let o=e.target;const s=e.currentTarget;for(n(s),this.assertInstance(s);o!==s;){if(n(o),this.assertInstance(o),o.classList.contains("source__item")){const e=o.getAttribute("data-source-id");return n(e),void(s.getAttribute("data-source")!==e&&(s.setAttribute("data-source",e),super.getResp({endpoint:"everything",options:Object.assign({sources:e},r)},t)))}o=o.parentNode}}};var a=t(596),c=t.n(a),l=t(520),d=t.n(l),u=t(176),p=t.n(u),m=t(120),f=t.n(m),h=t(808),g=t.n(h),w=t(936),_=t.n(w),b=t(96),v={};v.styleTagTransform=_(),v.setAttributes=f(),v.insert=p().bind(null,"head"),v.domAPI=d(),v.insertStyleElement=g(),c()(b.c,v),b.c&&b.c.locals&&b.c.locals;const x=class{getElement(e,t){const r=e.querySelector(t);return n(r),r}draw(e){const t=e.length>=10?e.filter(((n,e)=>e<10)):e,r=document.createDocumentFragment(),o=document.querySelector("#newsItemTemp");if(n(o),0===t.length){const n=document.createElement("div");n.textContent="Sorry, no news in your language from this source!",n.classList.add("no-news-report"),r.append(n),console.log("hello")}t.forEach(((n,e)=>{const t=o.content.cloneNode(!0);if(!(t instanceof DocumentFragment))throw Error("error");e%2&&this.getElement(t,".news__item").classList.add("alt"),this.getElement(t,".news__meta-photo").style.backgroundImage=`url(${n.urlToImage||"./assets/placeholder.png"})`,this.getElement(t,".news__meta-author").textContent=n.author||n.source.name,this.getElement(t,".news__meta-date").textContent=n.publishedAt.slice(0,10).split("-").reverse().join("-"),this.getElement(t,".news__description-title").textContent=n.title,this.getElement(t,".news__description-source").textContent=n.source.name,this.getElement(t,".news__description-content").textContent=n.description,this.getElement(t,".news__read-more a").setAttribute("href",n.url),r.append(t)})),this.getElement(document,".news").innerHTML="",this.getElement(document,".news").appendChild(r)}};var y=t(376),E={};E.styleTagTransform=_(),E.setAttributes=f(),E.insert=p().bind(null,"head"),E.domAPI=d(),E.insertStyleElement=g(),c()(y.c,E),y.c&&y.c.locals&&y.c.locals;const k=class{getElement(e,t){const r=e.querySelector(t);return n(r),r}draw(e){const t=document.createDocumentFragment(),r=document.querySelector("#sourceItemTemp");n(r),e.forEach((n=>{const e=r.content.cloneNode(!0);if(!(e instanceof DocumentFragment))throw new Error("sourceClone is not defined");this.getElement(e,".source__item-name").textContent=n.name,this.getElement(e,".source__item").setAttribute("data-source-id",n.id),t.append(e)})),this.getElement(document,".sources").append(t)}};class T{constructor(){this.news=new x,this.sources=new k}drawNews(n){const e=(null==n?void 0:n.articles)?null==n?void 0:n.articles:[];this.news.draw(e)}drawSources(n){const e=(null==n?void 0:n.sources)?null==n?void 0:n.sources:[];this.sources.draw(e)}}var S=t(152),C={};C.styleTagTransform=_(),C.setAttributes=f(),C.insert=p().bind(null,"head"),C.domAPI=d(),C.insertStyleElement=g(),c()(S.c,C),S.c&&S.c.locals&&S.c.locals;var A=t(308),L={};L.styleTagTransform=_(),L.setAttributes=f(),L.insert=p().bind(null,"head"),L.domAPI=d(),L.insertStyleElement=g(),c()(A.c,L),A.c&&A.c.locals&&A.c.locals;const M=new class{constructor(){this.controller=new i,this.view=new T}start(e,t){const r=document.querySelector(".sources");n(r),r.addEventListener("click",(e=>this.controller.getNews(e,(e=>{n(e),this.view.drawNews(e)}),t))),this.controller.getSources((e=>{n(e),this.view.drawSources(e)}),e)}};M.start({},{});const I=new class{constructor(){this.languages=["🇦🇷 ar","🇩🇪 de","🇺🇸 en","🇪🇸 es","🇫🇷 fr","🇮🇱 he","🇮🇹 it","🇳🇱 nl","🇳🇴 no","🇵🇹 pt","🇷🇺 ru","🇸🇪 sv"],this.filter=this.getElement(document,".filter"),this.langMenuBtn=this.getElement(document,".choose-lang"),this.langMenu=this.getElement(document,".filter-menu"),this.backdrop=document.createElement("div"),this.backdrop.classList.add("backdrop"),this.body=this.getElement(document,"body")}getElement(e,t){const r=e.querySelector(t);return n(r),r}addLanguages(){const e=document.createDocumentFragment(),t=document.querySelector("#langItemTemplate");return n(t),this.languages.forEach((r=>{const o=t.content.cloneNode(!0);if(!(o instanceof DocumentFragment))throw new Error("sourceClone is not defined");const s=this.getElement(o,".lang__btn");s.addEventListener("click",(n=>{document.querySelectorAll(".lang__btn").forEach((n=>n.classList.remove("active")));const e=n.target;if(!(e instanceof Element))throw new Error("EventTarget not defined");e.classList.add("active"),this.langMenu.style.transform="translateY(-110lvh)",this.backdrop.style.display="none",this.getElement(document,".sources").innerHTML="",M.start({language:r.slice(-2)},{})}));const i=s.querySelector(".lang__btn-name");n(i),i.textContent=r.toUpperCase(),e.append(o)})),this.langMenuBtn.addEventListener("click",(()=>{this.langMenu.style.transform="translateY(0)",this.backdrop.style.display="block",this.body.append(this.backdrop)})),e}fillFilter(){const n=this.addLanguages();this.filter.append(n)}fillTopMenu(){const n=this.addLanguages();this.langMenu.append(n)}};I.fillFilter(),I.fillTopMenu()})()})();