(()=>{var n={452:n=>{"use strict";n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t=n(e);return e[2]?"@media ".concat(e[2]," {").concat(t,"}"):t})).join("")},e.i=function(n,t,o){"string"==typeof n&&(n=[[null,n,""]]);var r={};if(o)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(r[i]=!0)}for(var l=0;l<n.length;l++){var c=[].concat(n[l]);o&&r[c[0]]||(t&&(c[2]?c[2]="".concat(t," and ").concat(c[2]):c[2]=t),e.push(c))}},e}},210:(n,e,t)=>{var o=t(452)((function(n){return n[1]}));o.push([n.id,".separator {\n    width: 100%;\n    text-align: center;\n    border-bottom: 1px solid #fff;\n    line-height: 0.1em;\n    margin: 10px 0 20px;\n}\n\n.separator span {\n    background: #262f40;\n    padding: 0 10px;\n}\n\n.control-space {\n    display: flex;\n    justify-content: center;\n}\n\n.round-grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    gap: 5px;\n}\n",""]),n.exports=o},66:(n,e,t)=>{var o=t(452)((function(n){return n[1]}));o.push([n.id,"body {\n    font-family: 'Roboto', 'Noto', sans-serif;\n}\n\n:root {\n    --blue: rgb(63, 81, 181);\n    --info-blue: rgb(62, 98, 240);\n    --info-blue-a-10: rgba(62, 98, 240, 0.1);\n    --red: #c9513e;\n    --green: #5ba664;\n    --yellow: rgb(253, 216, 53);\n    --yellow-a-10: rgba(253, 216, 53, 0.1);\n}\n\n/* Layout classes */\n\n.layout {\n    display: flex;\n}\n\n.layout.horizontal {\n    flex-direction: row;\n}\n\n.layout.horizontal.center-horizontal {\n    justify-content: center;\n}\n\n.layout.horizontal.center-vertical {\n    align-items: center;\n}\n\n.layout.vertical {\n    flex-direction: column;\n}\n\n.layout.message {\n    flex-direction: row;\n    align-items: center;\n}\n\n.layout.message > .icon {\n    display: block;\n    margin-right: 10px;\n    font-size: 25px;\n}\n\n.layout.message > .content {\n    margin: 0;\n}\n\n/* \"Space\" class for creating sections of elements + related styles */\n\n.space {\n    background-color: #262f40;\n    border-radius: 8px;\n    padding: 10px;\n    margin-bottom: 5px;\n}\n\n.space.warning {\n    background-color: var(--yellow-a-10);\n    border: 2px solid var(--yellow);\n}\n\n.space.info {\n    background-color: var(--info-blue-a-10);\n    border: 2px solid var(--info-blue);\n}\n\n.show-hide-space {\n    display: flex;\n    justify-content: center;\n}\n\n.title {\n    font-weight: bold;\n    margin-bottom: 5px;\n    text-align: center;\n    display: block;\n}\n\n.subtitle {\n    font-weight: 400;\n    margin-top: 5px;\n    margin-bottom: 5px;\n    text-align: center;\n    display: block;\n    word-break: break-word;\n}\n\n/* Buttons */\n\nbutton {\n    background-color: var(--blue);\n    margin: 5px 2px 2px;\n    text-decoration: none;\n    border: none;\n    border-radius: 2px;\n    color: white;\n    text-transform: uppercase;\n    padding: 9px 9px;\n    box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.2);\n    transition-duration: 100ms;\n    font-family: 'Roboto', sans-serif;\n}\n\nbutton.blue {\n    background-color: var(--blue);\n}\n\nbutton.red {\n    background-color: var(--red);\n}\n\nbutton.green {\n    background-color: var(--green);\n}\n\nbutton:hover {\n    box-shadow: inset 0 0 0 9999px rgba(0, 0, 0, 0.2);\n}\n\nbutton[disabled],\nbutton[disabled]:hover {\n    color: #a9aaa9 !important;\n    background-color: #181e29 !important;\n    box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.2) !important;\n}\n\nbutton.max-width {\n    box-sizing: border-box;\n    /* an ugly hack: 100% - button margin\n    prevents button from getting too wide */\n    width: calc(100% - 4px);\n}\n\n/* Text input & select */\n\nselect,\ninput:not([type]),\ninput[type='text'],\ninput[type='number'],\ninput[type='color'] {\n    background-color: transparent;\n    border: 0;\n    border-bottom: 1px solid #737373;\n    width: 100%;\n    color: white;\n    font-size: 16px;\n    font-family: 'Roboto', sans-serif;\n}\n\nselect {\n    margin-bottom: 5px;\n    outline: 0;\n    padding: 4px 20px 4px 2px;\n    background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e\");\n    background-size: 16px 12px;\n    background-repeat: no-repeat;\n    background-position: right 3px center;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n}\n\ninput:not([type]),\ninput[type='text'],\ninput[type='number'],\ninput[type='color'] {\n    display: block;\n    box-sizing: border-box;\n    margin-top: 3px;\n}\n\ninput[type='color'] {\n    border-bottom: unset;\n    background-color: #2f3a4f;\n    margin: 5px 2px;\n    padding: 5px;\n    height: 32px;\n}\n\ninput[type='number'] {\n    -moz-appearance: textfield;\n}\n\ninput[type='number']::-webkit-outer-spin-button,\ninput[type='number']::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n}\n\n.input-label,\nlabel {\n    color: #737373;\n    font-size: 0.75em;\n    user-select: none;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    margin-top: 3px;\n}\n\nlabel.white-label {\n    color: white;\n}\n\nlabel.big-label {\n    font-size: 1em;\n    margin-top: 0;\n}\n\noption,\noptgroup {\n    color: black;\n}\n\noption[disabled] {\n    color: darkgray;\n    font-style: italic;\n}\n\n/* Misc. */\n\n.max-width > * {\n    flex-grow: 1;\n}\n\n.text-center {\n    text-align: center;\n}\n\n.text-small {\n    font-size: 0.75em;\n}\n",""]),n.exports=o},62:(n,e,t)=>{"use strict";var o,r=function(){var n={};return function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}n[e]=t}return n[e]}}(),a=[];function i(n){for(var e=-1,t=0;t<a.length;t++)if(a[t].identifier===n){e=t;break}return e}function l(n,e){for(var t={},o=[],r=0;r<n.length;r++){var l=n[r],c=e.base?l[0]+e.base:l[0],s=t[c]||0,d="".concat(c," ").concat(s);t[c]=s+1;var u=i(d),p={css:l[1],media:l[2],sourceMap:l[3]};-1!==u?(a[u].references++,a[u].updater(p)):a.push({identifier:d,updater:f(p,e),references:1}),o.push(d)}return o}function c(n){var e=document.createElement("style"),o=n.attributes||{};if(void 0===o.nonce){var a=t.nc;a&&(o.nonce=a)}if(Object.keys(o).forEach((function(n){e.setAttribute(n,o[n])})),"function"==typeof n.insert)n.insert(e);else{var i=r(n.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(e)}return e}var s,d=(s=[],function(n,e){return s[n]=e,s.filter(Boolean).join("\n")});function u(n,e,t,o){var r=t?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(n.styleSheet)n.styleSheet.cssText=d(e,r);else{var a=document.createTextNode(r),i=n.childNodes;i[e]&&n.removeChild(i[e]),i.length?n.insertBefore(a,i[e]):n.appendChild(a)}}function p(n,e,t){var o=t.css,r=t.media,a=t.sourceMap;if(r?n.setAttribute("media",r):n.removeAttribute("media"),a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleSheet)n.styleSheet.cssText=o;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(o))}}var m=null,g=0;function f(n,e){var t,o,r;if(e.singleton){var a=g++;t=m||(m=c(e)),o=u.bind(null,t,a,!1),r=u.bind(null,t,a,!0)}else t=c(e),o=p.bind(null,t,e),r=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)};return o(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;o(n=e)}else r()}}n.exports=function(n,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=(void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o));var t=l(n=n||[],e);return function(n){if(n=n||[],"[object Array]"===Object.prototype.toString.call(n)){for(var o=0;o<t.length;o++){var r=i(t[o]);a[r].references--}for(var c=l(n,e),s=0;s<t.length;s++){var d=i(t[s]);0===a[d].references&&(a[d].updater(),a.splice(d,1))}t=c}}}}},e={};function t(o){var r=e[o];if(void 0!==r)return r.exports;var a=e[o]={id:o,exports:{}};return n[o](a,a.exports,t),a.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{"use strict";function n(n,e){for(let t=0;t<e.length;t++){const o=e[t],r=document.createElement("option");r.value=o,r.text=o,n.add(r)}}var e=t(62),o=t.n(e),r=t(66),a=t.n(r);o()(a(),{insert:"head",singleton:!1}),a().locals;var i=t(210),l=t.n(i);function c(){return String(Math.random().toString(36).substr(2,9))}o()(l(),{insert:"head",singleton:!1}),l().locals;const s=["Ancho-V Games","Arowana Mall","Blackbelly Skatepark","Camp Triggerfish","Goby Arena","Humpback Pump Track","Inkblot Art Academy","Kelp Dome","MakoMart","Manta Maria","Moray Towers","Musselforge Fitness","New Albacore Hotel","Piranha Pit","Port Mackerel","Shellendorf Institute","Shifty Station","Snapper Canal","Starfish Mainstage","Sturgeon Shipyard","The Reef","Wahoo World","Walleye Warehouse","Skipper Pavilion","Unknown Stage"];s.sort();const d=["Clam Blitz","Tower Control","Rainmaker","Splat Zones","Turf War","Unknown Mode"];d.sort();const u=nodecg.Replicant("rounds"),p=nodecg.Replicant("activeRoundId");function m(e,t,o){if("number"!=typeof e||e>=8||e<=0)throw new Error("Rounds with only up to 7 stages are supported.");const r=[],a=document.createElement("div");a.classList.add("space"),a.classList.add("round"),a.id=`round_${t}`;const i=document.createElement("input");i.id=`name-input_${t}`,i.value=`Round ${t}`,i.type="text";const l=document.createElement("div");l.innerText="Round name",l.classList.add("input-label"),r.push(i),a.appendChild(l),a.appendChild(i);for(let o=0;o<e;o++){const e=document.createElement("div");e.classList.add("separator");const i=document.createElement("span");i.innerText=String(o+1),e.appendChild(i),a.appendChild(e);const l=document.createElement("select");l.id=`stage-selector_${t}_${o}`,l.classList.add("stage-selector"),n(l,s),l.value="Unknown Stage",a.appendChild(l),r.push(l);const c=document.createElement("select");c.id=`mode-selector_${t}_${o}`,c.classList.add("mode-selector"),n(c,d),c.value="Unknown Mode",a.appendChild(c),r.push(c)}const c=document.createElement("button");c.innerText="update",c.id=`update-round_${t}`,o&&(c.style.backgroundColor="var(--red)"),c.onclick=n=>{const e=n.target.id.split("_")[1],t=document.getElementById(`round_${e}`).querySelectorAll("select").length/2,o=document.getElementById("name-input_"+e),r=[];for(let n=0;n<t;n++){const t={stage:"",mode:""},o=e+"_"+n,a=document.getElementById(`stage-selector_${o}`);t.stage=a.value;const i=document.getElementById(`mode-selector_${o}`);t.mode=i.value,r.push(t)}u.value[e]={meta:{name:o.value},games:r}},c.classList.add("max-width"),function(n,e){n.forEach((n=>{if(!n.tagName)return;let t;if("input"===n.tagName.toLowerCase())t="input";else{if("select"!==n.tagName.toLowerCase())return;t="change"}n.addEventListener(t,(()=>{e.style.backgroundColor="var(--red)"}))})),e.addEventListener("click",(()=>{e.style.backgroundColor="var(--blue)"}))}(r,c);const m=document.createElement("button");m.style.backgroundColor="var(--red)",m.id="removeButton_"+t,m.innerText="REMOVE",m.classList.add("max-width"),m.onclick=n=>{const e=n.target.id.split("_")[1];if(p.value===e&&(p.value=Object.keys(u.value)[0]),u.value[e])try{delete u.value[e]}catch{}else g(e)};const f=document.createElement("div");f.classList.add("layout"),f.classList.add("horizontal"),f.appendChild(c),f.appendChild(m),a.appendChild(f),document.getElementById("round-grid").prepend(a)}function g(n){const e=document.getElementById(`round_${n}`);e&&e.parentNode.removeChild(e)}function f(n,e){document.getElementById(`round_${n}`)||m(e.games.length,n,!1),function(n,e){document.getElementById(`name-input_${n}`).value=e.meta.name;const t=document.getElementById(`round_${n}`).querySelectorAll("select").length/2;for(let o=0;o<t;o++){const t=document.getElementById(`stage-selector_${n}_${o}`),r=document.getElementById(`mode-selector_${n}_${o}`);t.value=e.games[o].stage,r.value=e.games[o].mode}}(n,e)}function b(n,e){if(!n||!e)return!1;if(n.meta.name!==e.meta.name)return!1;if(n.games.length!==e.games.length)return!1;for(let t=0;t<n.games.length;t++){const o=n.games[t],r=e.games[t];if(o.stage!==r.stage)return!1;if(o.mode!==r.mode)return!1}return!0}document.getElementById("create-3-game-round").onclick=()=>{m(3,c(),!0)},document.getElementById("create-5-game-round").onclick=()=>{m(5,c(),!0)},document.getElementById("create-7-game-round").onclick=()=>{m(7,c(),!0)},document.getElementById("reset-rounds").onclick=()=>(u.value={0:{meta:{name:"Default round"},games:[{stage:"MakoMart",mode:"Clam Blitz"},{stage:"Ancho-V Games",mode:"Tower Control"},{stage:"Wahoo World",mode:"Rainmaker"}]}},void(p.value="0")),u.on("change",((n,e)=>{for(const t in n){if(!Object.prototype.hasOwnProperty.call(n,t))continue;const o=n[t];e&&b(o,e[t])||f(t,o)}if(e)for(const t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]||g(t))}))})()})();