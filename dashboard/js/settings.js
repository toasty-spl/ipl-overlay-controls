(()=>{var e,t={1459:(e,t)=>{"use strict";t.DF={prefix:"fas",iconName:"bars",icon:[448,512,[],"f0c9","M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"]},t.xi=t.DF},176:(e,t,a)=>{"use strict";a.d(t,{Z:()=>o});var n=a(2609),l=a.n(n)()((function(e){return e[1]}));l.push([e.id,".obs-status_CONNECTING{background-color:#ffc700 !important;color:#222}.obs-status_NOT_CONNECTED{background-color:#e74e36 !important}.obs-status_CONNECTED{background-color:#00a651 !important}",""]);const o=l},2602:(e,t,a)=>{var n=a(3759),l=a(5041);e.exports=function(e,t){return n(e,t,(function(t,a){return l(e,a)}))}},3759:(e,t,a)=>{var n=a(3324),l=a(2857),o=a(7297);e.exports=function(e,t,a){for(var r=-1,s=t.length,i={};++r<s;){var u=t[r],c=n(e,u);a(c,u)&&l(i,o(u,e),c)}return i}},5809:e=>{var t=Math.floor,a=Math.random;e.exports=function(e,n){return e+t(a()*(n-e+1))}},2857:(e,t,a)=>{var n=a(91),l=a(7297),o=a(9045),r=a(9259),s=a(3812);e.exports=function(e,t,a,i){if(!r(e))return e;for(var u=-1,c=(t=l(t,e)).length,d=c-1,p=e;null!=p&&++u<c;){var m=s(t[u]),g=a;if("__proto__"===m||"constructor"===m||"prototype"===m)return e;if(u!=d){var v=p[m];void 0===(g=i?i(v,m,p):void 0)&&(g=r(v)?v:o(t[u+1])?[]:{})}n(p,m,g),p=p[m]}return e}},1704:(e,t,a)=>{var n=a(2153),l=/^\s+/;e.exports=function(e){return e?e.slice(0,n(e)+1).replace(l,""):e}},9097:(e,t,a)=>{var n=a(5676),l=a(3114),o=a(5251);e.exports=function(e){return o(l(e,void 0,n),e+"")}},2406:(e,t,a)=>{var n=a(1225),l=a(7878),o=a(9045),r=a(9259);e.exports=function(e,t,a){if(!r(a))return!1;var s=typeof t;return!!("number"==s?l(a)&&o(t,a.length):"string"==s&&t in a)&&n(a[t],e)}},2153:e=>{var t=/\s/;e.exports=function(e){for(var a=e.length;a--&&t.test(e.charAt(a)););return a}},5676:(e,t,a)=>{var n=a(2034);e.exports=function(e){return null!=e&&e.length?n(e,1):[]}},3888:(e,t,a)=>{var n=a(2602),l=a(9097)((function(e,t){return null==e?{}:n(e,t)}));e.exports=l},2349:(e,t,a)=>{var n=a(5809),l=a(2406),o=a(5707),r=parseFloat,s=Math.min,i=Math.random;e.exports=function(e,t,a){if(a&&"boolean"!=typeof a&&l(e,t,a)&&(t=a=void 0),void 0===a&&("boolean"==typeof t?(a=t,t=void 0):"boolean"==typeof e&&(a=e,e=void 0)),void 0===e&&void 0===t?(e=0,t=1):(e=o(e),void 0===t?(t=e,e=0):t=o(t)),e>t){var u=e;e=t,t=u}if(a||e%1||t%1){var c=i();return s(e+c*(t-e+r("1e-"+((c+"").length-1))),t)}return n(e,t)}},5707:(e,t,a)=>{var n=a(7642);e.exports=function(e){return e?Infinity===(e=n(e))||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},7642:(e,t,a)=>{var n=a(1704),l=a(9259),o=a(4795),r=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,i=/^0o[0-7]+$/i,u=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(o(e))return NaN;if(l(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=l(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=n(e);var a=s.test(e);return a||i.test(e)?u(e.slice(2),a?2:8):r.test(e)?NaN:+e}},9363:(e,t,a)=>{"use strict";a(223);var n,l=a(225),o=a(9745);!function(e){e.SPLATOON_2="SPLATOON_2",e.SPLATOON_3="SPLATOON_3"}(n||(n={}));class r{static toPrettyString(e){return{[n.SPLATOON_2]:"Splatoon 2",[n.SPLATOON_3]:"Splatoon 3"}[e]}}var s,i=a(9850),u=a.n(i);!function(e){e.EN="EN",e.DE="DE"}(s||(s={}));class c{static toPrettyString(e){return{[s.EN]:"English",[s.DE]:"Deutsch"}[e]}}const d={[s.EN]:{"Unknown Stage":"Unknown Stage",Counterpick:"Counterpick"},[s.DE]:{"Unknown Stage":"Unbekannte Arena",Counterpick:"Counterpick"}},p={[s.EN]:{"Unknown Mode":"Unknown Mode"},[s.DE]:{"Unknown Mode":"Unbekannte Kampfart"}};function m(e){const t=u()(e);return t.stages=Object.entries(t.stages).reduce(((e,[t,a])=>(e[t]=Object.assign(Object.assign({},a),d[t]),e)),{}),t.modes=Object.entries(t.modes).reduce(((e,[t,a])=>(e[t]=Object.assign(Object.assign({},a),p[t]),e)),{}),t.colors.push({meta:{name:"Custom Color"},colors:[{index:0,title:"Custom Color",clrA:"#000000",clrB:"#FFFFFF",clrNeutral:"#818181",isCustom:!0}]}),t}const g=m({stages:{[s.EN]:{"Ancho-V Games":"Ancho-V Games","Arowana Mall":"Arowana Mall","Blackbelly Skatepark":"Blackbelly Skatepark","Camp Triggerfish":"Camp Triggerfish","Goby Arena":"Goby Arena","Humpback Pump Track":"Humpback Pump Track","Inkblot Art Academy":"Inkblot Art Academy","Kelp Dome":"Kelp Dome",MakoMart:"MakoMart","Manta Maria":"Manta Maria","Moray Towers":"Moray Towers","Musselforge Fitness":"Musselforge Fitness","New Albacore Hotel":"New Albacore Hotel","Piranha Pit":"Piranha Pit","Port Mackerel":"Port Mackerel","Shellendorf Institute":"Shellendorf Institute","Shifty Station":"Shifty Station","Snapper Canal":"Snapper Canal","Starfish Mainstage":"Starfish Mainstage","Sturgeon Shipyard":"Sturgeon Shipyard","The Reef":"The Reef","Wahoo World":"Wahoo World","Walleye Warehouse":"Walleye Warehouse","Skipper Pavilion":"Skipper Pavilion"},[s.DE]:{"Ancho-V Games":"Anchobit Games HQ","Arowana Mall":"Arowana Center","Blackbelly Skatepark":"Punkasius-Skatepark","Camp Triggerfish":"Camp Schützenfisch","Goby Arena":"Backfisch-Stadion","Humpback Pump Track":"Buckelwal-Piste","Inkblot Art Academy":"Perlmutt-Akademie","Kelp Dome":"Tümmlerkuppel",MakoMart:"Cetacea-Markt","Manta Maria":"Manta Maria","Moray Towers":"Muränentürme","Musselforge Fitness":"Molluskelbude","New Albacore Hotel":"Hotel Neothun","Piranha Pit":"Steinköhler-Grube","Port Mackerel":"Heilbutt-Hafen","Shellendorf Institute":"Abyssal-Museum","Shifty Station":"Wandelzone","Snapper Canal":"Grätenkanal","Starfish Mainstage":"Seeigel-Rockbühne","Sturgeon Shipyard":"Störwerft","The Reef":"Korallenviertel","Wahoo World":"Flunder-Funpark","Walleye Warehouse":"Kofferfisch-Lager","Skipper Pavilion":"Grundel-Pavillon"}},modes:{[s.EN]:{"Clam Blitz":"Clam Blitz","Tower Control":"Tower Control",Rainmaker:"Rainmaker","Splat Zones":"Splat Zones","Turf War":"Turf War"},[s.DE]:{"Clam Blitz":"Muschelchaos","Tower Control":"Turmkommando",Rainmaker:"Operation Goldfisch","Splat Zones":"Herrschaft","Turf War":"Revierkampf"}},colors:[{meta:{name:"Ranked Modes"},colors:[{index:0,title:"Green vs Grape",clrA:"#37FC00",clrB:"#7D28FC",clrNeutral:"#F4067E",isCustom:!1},{index:1,title:"Green vs Magenta",clrA:"#04D976",clrB:"#D600AB",clrNeutral:"#D2E500",isCustom:!1},{index:2,title:"Turquoise vs Orange",clrA:"#10E38F",clrB:"#FB7B08",clrNeutral:"#6912CD",isCustom:!1},{index:3,title:"Mustard vs Purple",clrA:"#FF9E03",clrB:"#B909E0",clrNeutral:"#08C66B",isCustom:!1},{index:4,title:"Dark Blue vs Green",clrA:"#2F27CC",clrB:"#37FC00",clrNeutral:"#EA01B7",isCustom:!1},{index:5,title:"Purple vs Green",clrA:"#B909E0",clrB:"#37FC00",clrNeutral:"#F87604",isCustom:!1},{index:6,title:"Yellow vs Blue",clrA:"#FEF232",clrB:"#2ED2FE",clrNeutral:"#FD5600",isCustom:!1}]},{meta:{name:"Turf War"},colors:[{index:0,title:"Yellow vs Purple",clrA:"#D1E004",clrB:"#960CB2",clrNeutral:"#0EB962",isCustom:!1},{index:1,title:"Pink vs Blue",clrA:"#E61077",clrB:"#361CB8",clrNeutral:"#24C133",isCustom:!1},{index:2,title:"Pink vs Yellow",clrA:"#ED0C6A",clrB:"#D5E802",clrNeutral:"#08C24D",isCustom:!1},{index:3,title:"Purple vs Turquoise",clrA:"#6B10CC",clrB:"#08CC81",clrNeutral:"#EB246D",isCustom:!1},{index:4,title:"Pink vs Light Blue",clrA:"#E30960",clrB:"#02ADCF",clrNeutral:"#DDE713",isCustom:!1},{index:5,title:"Purple vs Orange",clrA:"#5617C2",clrB:"#FF5F03",clrNeutral:"#ACE81E",isCustom:!1},{index:6,title:"Pink vs Green",clrA:"#E60572",clrB:"#1BBF0F",clrNeutral:"#CCE50C",isCustom:!1},{index:7,title:"Yellow vs Blue",clrA:"#F1CE33",clrB:"#4B12BE",clrNeutral:"#E62E96",isCustom:!1}]},{meta:{name:"Color Lock"},colors:[{index:0,title:"Yellow vs Blue (Color Lock)",clrA:"#FEF232",clrB:"#2F27CC",clrNeutral:"#DC1589",isCustom:!1}]}]}),v=m({stages:{[s.EN]:{"Museum d'Alfonsino":"Museum d'Alfonsino","Scorch Gorge":"Scorch Gorge","Eeltail Alley":"Eeltail Alley","Hagglefish Market":"Hagglefish Market","Undertow Spillway":"Undertow Spillway","Mincemeat Metalworks":"Mincemeat Metalworks","Hammerhead Bridge":"Hammerhead Bridge","Mahi-Mahi Resort":"Mahi-Mahi Resort","Inkblot Art Academy":"Inkblot Art Academy","Sturgeon Shipyard":"Sturgeon Shipyard",MakoMart:"MakoMart","Wahoo World":"Wahoo World"},[s.DE]:{"Museum d'Alfonsino":"Pinakoithek","Scorch Gorge":"Sengkluft","Eeltail Alley":"Streifenaal-Straße","Hagglefish Market":"Schnapperchen-Basar","Undertow Spillway":"Schwertmuschel-Reservoir","Mincemeat Metalworks":"Aalstahl-Metallwerk","Hammerhead Bridge":"Makrelenbrücke","Mahi-Mahi Resort":"Mahi-Mahi-Resort","Inkblot Art Academy":"Perlmutt-Akademie","Sturgeon Shipyard":"Störwerft",MakoMart:"Cetacea-Markt","Wahoo World":"Flunder-Funpark"}},modes:{[s.EN]:{"Clam Blitz":"Clam Blitz","Tower Control":"Tower Control",Rainmaker:"Rainmaker","Splat Zones":"Splat Zones","Turf War":"Turf War"},[s.DE]:{"Clam Blitz":"Muschelchaos","Tower Control":"Turmkommando",Rainmaker:"Operation Goldfisch","Splat Zones":"Herrschaft","Turf War":"Revierkampf"}},colors:[{meta:{name:"Ranked Modes"},colors:[{index:0,title:"Turquoise vs Orange",clrA:"#2ADBC6",clrB:"#FA5A41",clrNeutral:"#4445FF",isCustom:!1},{index:1,title:"Orange vs Purple",clrA:"#F56522",clrB:"#821CD6",clrNeutral:"#CDFF45",isCustom:!1},{index:2,title:"Pink vs Green",clrA:"#F753A1",clrB:"#35CC2D",clrNeutral:"#4A36FF",isCustom:!1},{index:3,title:"Green vs Pink",clrA:"#B3DE45",clrB:"#D43BCA",clrNeutral:"#FFC042",isCustom:!1},{index:4,title:"Turquoise vs Pink",clrA:"#2ADBC3",clrB:"#E34984",clrNeutral:"#7577FF",isCustom:!1},{index:5,title:"Gold vs Purple",clrA:"#EBCC31",clrB:"#A032DB",clrNeutral:"#73DE35",isCustom:!1},{index:6,title:"Yellow vs Dark Blue",clrA:"#EDD921",clrB:"#461EE6",clrNeutral:"#4445FF",isCustom:!1},{index:7,title:"Dark Blue vs Orange",clrA:"#2C2CDB",clrB:"#F29C33",clrNeutral:"#FF67EE",isCustom:!1},{index:8,title:"Yellow vs Purple",clrA:"#EEFC58",clrB:"#7635F0",clrNeutral:"#54FDE8",isCustom:!1},{index:9,title:"Orange vs Dark Blue",clrA:"#FC7735",clrB:"#4048DB",clrNeutral:"#F8F755",isCustom:!1}]}]}),C={[n.SPLATOON_2]:g,[n.SPLATOON_3]:v};const f=nodecg.Replicant("lastFmSettings"),h=nodecg.Replicant("radiaSettings"),b=nodecg.Replicant("runtimeConfig"),k=[f,h,b],S=(0,o.Q_)("settings",{state:()=>({lastFmSettings:{},radiaSettings:{guildID:null,enabled:null,updateOnImport:null},runtimeConfig:null}),getters:{translatedModeName:e=>t=>C[e.runtimeConfig.gameVersion].modes[e.runtimeConfig.locale][t],translatedStageName:e=>t=>C[e.runtimeConfig.gameVersion].stages[e.runtimeConfig.locale][t]},actions:{setLastFmSettings({newValue:e}){f.value=e},setRadiaSettings({newValue:e}){h.value=e},setUpdateOnImport(e){h.value.updateOnImport=e},attemptRadiaConnection(){return e=this,t=void 0,n=function*(){return nodecg.sendMessage("retryRadiaAvailabilityCheck")},new((a=void 0)||(a=Promise))((function(l,o){function r(e){try{i(n.next(e))}catch(e){o(e)}}function s(e){try{i(n.throw(e))}catch(e){o(e)}}function i(e){var t;e.done?l(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(r,s)}i((n=n.apply(e,t||[])).next())}));var e,t,a,n},setGameVersion:e=>nodecg.sendMessage("setGameVersion",{version:e}),setLocale:e=>nodecg.sendMessage("setLocale",e)}});var w=a(7875),y=a(349);const E=(0,w.Uk)(" All Settings ");var I=a(641);const D=(0,w._)("div",{class:"title"},"Last.fm",-1);var M=a(8127),O=a(8149),A=a.n(O),F=a(9546);const B=(0,w.aZ)({name:"LastfmSettings",components:{IplButton:M.IplButton,IplInput:M.IplInput,IplSpace:M.IplSpace},setup(){const e=(0,I.iH)(!1),t=(0,I.Fl)((()=>!A()(n.value,a.lastFmSettings))),a=S(),n=(0,I.iH)(u()(a.lastFmSettings));return(0,w.YP)((()=>a.lastFmSettings),(t=>{e.value||(n.value=u()(t))}),{deep:!0}),{RIGHT_CLICK_UNDO_MESSAGE:F.m,focused:e,handleFocusEvent(t){e.value=t},isChanged:t,buttonColor:(0,I.Fl)((()=>t.value?"red":"blue")),settings:n,handleUpdate(){t.value&&a.setLastFmSettings({newValue:n.value})},undoChanges(e){e.preventDefault(),n.value=u()(a.lastFmSettings)}}}});var N=a(4407);const P=(0,N.Z)(B,[["render",function(e,t,a,n,l,o){const r=(0,w.up)("ipl-input"),s=(0,w.up)("ipl-button"),i=(0,w.up)("ipl-space");return(0,w.wg)(),(0,w.j4)(i,null,{default:(0,w.w5)((()=>[D,(0,w.Wm)(r,{modelValue:e.settings.username,"onUpdate:modelValue":t[0]||(t[0]=t=>e.settings.username=t),name:"username",label:"Username",onFocuschange:e.handleFocusEvent},null,8,["modelValue","onFocuschange"]),(0,w.Wm)(s,{label:"Update",class:"m-t-8",color:e.buttonColor,title:e.RIGHT_CLICK_UNDO_MESSAGE,"data-test":"update-button",onClick:e.handleUpdate,onRightClick:e.undoChanges},null,8,["color","title","onClick","onRightClick"])])),_:1})}]]),T=(0,w.Uk)(" Radia integration is disabled. "),_=(0,w._)("div",{class:"title"},"Radia",-1);var x=a(3888),G=a.n(x);const V=(0,w.aZ)({name:"RadiaSettings",components:{IplCheckbox:M.IplCheckbox,IplButton:M.IplButton,IplInput:M.IplInput,IplSpace:M.IplSpace,IplMessage:M.IplMessage},setup(){const e=S(),t=(0,I.iH)(!1),a=(0,I.Fl)((()=>!A()(G()(n.value,["guildID"]),G()(e.radiaSettings,["guildID"])))),n=(0,I.iH)(u()(e.radiaSettings)),l={"guild-id":(0,M.validator)((()=>n.value.guildID),!0,(0,M.minLength)(17),M.numeric)};return(0,M.provideValidators)(l),(0,w.YP)((()=>e.radiaSettings.guildID),(e=>{t.value||(n.value.guildID=e)})),(0,w.YP)((()=>e.radiaSettings.updateOnImport),(e=>{n.value.updateOnImport=e})),{RIGHT_CLICK_UNDO_MESSAGE:F.m,radiaEnabled:(0,I.Fl)((()=>e.radiaSettings.enabled)),focused:t,handleFocusEvent(e){t.value=e},isChanged:a,isValid:(0,I.Fl)((()=>(0,M.allValid)(l))),buttonColor:(0,I.Fl)((()=>a.value?"red":"blue")),settings:n,handleUpdate(){a.value&&e.setRadiaSettings({newValue:n.value})},setUpdateOnImport(t){e.setUpdateOnImport(t)},attemptRadiaReconnect(){return t=this,a=void 0,l=function*(){return e.attemptRadiaConnection()},new((n=void 0)||(n=Promise))((function(e,o){function r(e){try{i(l.next(e))}catch(e){o(e)}}function s(e){try{i(l.throw(e))}catch(e){o(e)}}function i(t){var a;t.done?e(t.value):(a=t.value,a instanceof n?a:new n((function(e){e(a)}))).then(r,s)}i((l=l.apply(t,a||[])).next())}));var t,a,n,l},undoChanges(t){t.preventDefault(),n.value.guildID=e.radiaSettings.guildID}}}}),U=(0,N.Z)(V,[["render",function(e,t,a,n,l,o){const r=(0,w.up)("ipl-button"),s=(0,w.up)("ipl-message"),i=(0,w.up)("ipl-input"),u=(0,w.up)("ipl-checkbox"),c=(0,w.up)("ipl-space");return(0,w.wg)(),(0,w.j4)(c,null,{default:(0,w.w5)((()=>[e.radiaEnabled?(0,w.kq)("",!0):((0,w.wg)(),(0,w.j4)(s,{key:0,type:"warning",class:"m-b-8","data-test":"radia-disabled-warning"},{default:(0,w.w5)((()=>[T,(0,w.Wm)(r,{small:"",label:"Attempt to connect",class:"m-t-6",color:"yellow","data-test":"radia-connect-button",async:"",onClick:e.attemptRadiaReconnect},null,8,["onClick"])])),_:1})),_,(0,w.Wm)(i,{modelValue:e.settings.guildID,"onUpdate:modelValue":t[0]||(t[0]=t=>e.settings.guildID=t),name:"guild-id",label:"Guild ID",onFocuschange:e.handleFocusEvent},null,8,["modelValue","onFocuschange"]),(0,w.Wm)(r,{label:"Update","data-test":"update-button",class:"m-t-8",color:e.buttonColor,disabled:!e.isValid,title:e.RIGHT_CLICK_UNDO_MESSAGE,onClick:e.handleUpdate,onRightClick:e.undoChanges},null,8,["color","disabled","title","onClick","onRightClick"]),(0,w.Wm)(u,{modelValue:e.settings.updateOnImport,"onUpdate:modelValue":[t[1]||(t[1]=t=>e.settings.updateOnImport=t),e.setUpdateOnImport],class:"m-t-8",label:"Update tournament data on import","data-test":"update-on-import-checkbox"},null,8,["modelValue","onUpdate:modelValue"])])),_:1})}]]);var R=a(6349);const W=(0,w.Uk)(" Changing game versions will reset round and match data! ");function H(e){return e.reduce(((t,a,n)=>(t+=a,n===e.length-2?t+=" and ":n!==e.length-1&&(t+=", "),t)),"")}function L(e,t,a){return 1===t?e:a?`${a}`:`${e}s`}a(2349);const j=(0,w.aZ)({name:"RuntimeConfig",components:{IplMessage:M.IplMessage,IplButton:M.IplButton,IplSelect:M.IplSelect,IplSpace:M.IplSpace},setup(){const e=S(),t=(0,I.iH)(n.SPLATOON_2),a=(0,I.iH)(!1),l=(0,I.iH)([]),o=(0,I.Fl)((()=>t.value!==e.runtimeConfig.gameVersion)),i=(0,I.iH)(null);return(0,w.YP)((()=>e.runtimeConfig.gameVersion),(e=>t.value=e),{immediate:!0}),(0,w.YP)((()=>e.runtimeConfig.locale),(e=>i.value=e),{immediate:!0}),{RIGHT_CLICK_UNDO_MESSAGE:F.m,prettyPrintList:H,GameVersionHelper:r,gameVersion:t,pluralizeWithoutCount:L,gameVersionOptions:Object.values(n).map((e=>({value:e,name:r.toPrettyString(e)}))),isGameVersionChanged:o,isChanged:(0,I.Fl)((()=>o.value||i.value!==e.runtimeConfig.locale)),currentGameVersion:(0,I.Fl)((()=>e.runtimeConfig.gameVersion)),showIncompatibleBundlesMessage:a,incompatibleBundles:l,localeOptions:Object.values(s).map((e=>({value:e,name:c.toPrettyString(e)}))),locale:i,doUpdate(){return n=this,r=void 0,u=function*(){if(o.value){const n=yield e.setGameVersion(t.value);n.incompatibleBundles.length>0?(a.value=!0,l.value=n.incompatibleBundles):a.value=!1}i.value!==e.runtimeConfig.locale&&(yield e.setLocale(i.value))},new((s=void 0)||(s=Promise))((function(e,t){function a(e){try{o(u.next(e))}catch(e){t(e)}}function l(e){try{o(u.throw(e))}catch(e){t(e)}}function o(t){var n;t.done?e(t.value):(n=t.value,n instanceof s?n:new s((function(e){e(n)}))).then(a,l)}o((u=u.apply(n,r||[])).next())}));var n,r,s,u},undoChanges(a){a.preventDefault(),t.value=e.runtimeConfig.gameVersion,i.value=e.runtimeConfig.locale}}}}),z=(0,N.Z)(j,[["render",function(e,t,a,n,l,o){const r=(0,w.up)("ipl-message"),s=(0,w.up)("ipl-select"),i=(0,w.up)("ipl-button"),u=(0,w.up)("ipl-space");return(0,w.wg)(),(0,w.j4)(u,null,{default:(0,w.w5)((()=>[e.showIncompatibleBundlesMessage?((0,w.wg)(),(0,w.j4)(r,{key:0,type:"warning","data-test":"incompatible-bundle-warning",class:"m-b-8",closeable:"",onClose:t[0]||(t[0]=t=>e.showIncompatibleBundlesMessage=!1)},{default:(0,w.w5)((()=>[(0,w.Uk)((0,y.zw)(e.pluralizeWithoutCount("Bundle",e.incompatibleBundles.length))+" "+(0,y.zw)(e.prettyPrintList(e.incompatibleBundles))+" "+(0,y.zw)(e.pluralizeWithoutCount("is",e.incompatibleBundles.length,"are"))+" incompatible with "+(0,y.zw)(e.GameVersionHelper.toPrettyString(e.currentGameVersion))+". ",1)])),_:1})):(0,w.kq)("",!0),e.isGameVersionChanged?((0,w.wg)(),(0,w.j4)(r,{key:1,type:"warning","data-test":"version-change-warning",class:"m-b-8"},{default:(0,w.w5)((()=>[W])),_:1})):(0,w.kq)("",!0),(0,w.Wm)(s,{modelValue:e.gameVersion,"onUpdate:modelValue":t[1]||(t[1]=t=>e.gameVersion=t),label:"Game version","data-test":"game-version-select",options:e.gameVersionOptions},null,8,["modelValue","options"]),(0,w.Wm)(s,{modelValue:e.locale,"onUpdate:modelValue":t[2]||(t[2]=t=>e.locale=t),label:"Language","data-test":"locale-select",options:e.localeOptions,class:"m-t-6"},null,8,["modelValue","options"]),(0,w.Wm)(i,{class:"m-t-8",label:"Update",color:e.isChanged?"red":"blue",title:e.RIGHT_CLICK_UNDO_MESSAGE,"data-test":"update-button",onClick:e.doUpdate,onRightClick:e.undoChanges},null,8,["color","title","onClick","onRightClick"])])),_:1})}]]);var Z=a(8751),Y=a(1459),K=a(1901);const q=(0,w._)("div",{class:"title"},"OBS Socket",-1),$=(0,w.Uk)(" OBS websocket is disabled. ");var Q=function(e,t,a,n){return new(a||(a=Promise))((function(l,o){function r(e){try{i(n.next(e))}catch(e){o(e)}}function s(e){try{i(n.throw(e))}catch(e){o(e)}}function i(e){var t;e.done?l(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(r,s)}i((n=n.apply(e,t||[])).next())}))};const J=[nodecg.Replicant("obsData"),nodecg.Replicant("obsCredentials"),nodecg.Replicant("gameAutomationData")],X=(0,o.Q_)("obs",{state:()=>({obsData:null,obsCredentials:null,gameAutomationData:null}),actions:{connect({address:e,password:t}){return Q(this,void 0,void 0,(function*(){return nodecg.sendMessage("connectToObs",{address:e,password:t})}))},setData(e){return Q(this,void 0,void 0,(function*(){return nodecg.sendMessage("setObsData",e)}))},startGame(){return Q(this,void 0,void 0,(function*(){return nodecg.sendMessage("startGame")}))},endGame(){return Q(this,void 0,void 0,(function*(){return nodecg.sendMessage("endGame")}))},fastForwardToNextGameAutomationTask(){return Q(this,void 0,void 0,(function*(){return nodecg.sendMessage("fastForwardToNextGameAutomationTask")}))},setEnabled:e=>nodecg.sendMessage("setObsSocketEnabled",e)}});var ee;!function(e){e.CONNECTED="CONNECTED",e.CONNECTING="CONNECTING",e.NOT_CONNECTED="NOT_CONNECTED"}(ee||(ee={}));var te=a(4928);const ae=(0,w.aZ)({name:"ObsSocketSettings",components:{IplMessage:M.IplMessage,IplToggle:M.IplToggle,IplButton:M.IplButton,IplSpace:M.IplSpace,IplInput:M.IplInput},setup(){const e=X(),t=(0,te.z)(),a=(0,I.Fl)({get:()=>e.obsData.enabled,set(a){return n=this,l=void 0,r=function*(){try{yield e.setEnabled(a)}catch(e){t.handleError({err:e})}},new((o=void 0)||(o=Promise))((function(e,t){function a(e){try{i(r.next(e))}catch(e){t(e)}}function s(e){try{i(r.throw(e))}catch(e){t(e)}}function i(t){var n;t.done?e(t.value):(n=t.value,n instanceof o?n:new o((function(e){e(n)}))).then(a,s)}i((r=r.apply(n,l||[])).next())}));var n,l,o,r}}),n=(0,I.iH)(""),l=(0,I.iH)("");(0,w.YP)((()=>e.obsCredentials.address),(e=>n.value=e),{immediate:!0}),(0,w.YP)((()=>e.obsCredentials.password),(e=>l.value=e),{immediate:!0});const o={socketUrl:(0,M.validator)(n,!0,M.notBlank)};return(0,M.provideValidators)(o),{RIGHT_CLICK_UNDO_MESSAGE:F.m,socketEnabled:a,socketUrl:n,socketPassword:l,isChanged:(0,I.Fl)((()=>n.value!==e.obsCredentials.address||l.value!==e.obsCredentials.password)),allValid:(0,I.Fl)((()=>(0,M.allValid)(o))),statusText:(0,I.Fl)((()=>class{static toPrettyString(e){return{[ee.CONNECTING]:"Connecting",[ee.CONNECTED]:"Connected",[ee.NOT_CONNECTED]:"Not connected"}[e]}}.toPrettyString(e.obsData.status))),status:(0,I.Fl)((()=>e.obsData.status)),connect:()=>e.connect({address:n.value,password:l.value}),undoChanges(t){t.preventDefault(),n.value=e.obsCredentials.address,l.value=e.obsCredentials.password}}}});var ne=a(6062),le=a.n(ne),oe=a(176);le()(oe.Z,{insert:"head",singleton:!1}),oe.Z.locals;const re=(0,N.Z)(ae,[["render",function(e,t,a,n,l,o){const r=(0,w.up)("ipl-toggle"),s=(0,w.up)("ipl-space"),i=(0,w.up)("ipl-input"),u=(0,w.up)("ipl-button"),c=(0,w.up)("ipl-message");return(0,w.wg)(),(0,w.iD)("div",null,[(0,w.Wm)(s,null,{default:(0,w.w5)((()=>[q,(0,w.Wm)(r,{modelValue:e.socketEnabled,"onUpdate:modelValue":t[0]||(t[0]=t=>e.socketEnabled=t),"true-label":"Enable","false-label":"Disable"},null,8,["modelValue"])])),_:1}),e.socketEnabled?((0,w.wg)(),(0,w.j4)(s,{key:0,class:"m-t-8"},{default:(0,w.w5)((()=>[(0,w.Wm)(i,{modelValue:e.socketUrl,"onUpdate:modelValue":t[1]||(t[1]=t=>e.socketUrl=t),name:"socketUrl",label:"Socket address"},null,8,["modelValue"]),(0,w.Wm)(i,{modelValue:e.socketPassword,"onUpdate:modelValue":t[2]||(t[2]=t=>e.socketPassword=t),name:"password",label:"Password (Optional)",type:"password",class:"m-t-4"},null,8,["modelValue"]),(0,w.Wm)(u,{label:"Connect",class:"m-t-8",color:e.isChanged?"red":"blue",disabled:!e.allValid,"data-test":"socket-connect-button",async:"","progress-message":"Connecting...","success-message":"Connected!",title:e.RIGHT_CLICK_UNDO_MESSAGE,onClick:e.connect,onRightClick:e.undoChanges},null,8,["color","disabled","title","onClick","onRightClick"]),(0,w.Wm)(s,{class:(0,y.C_)(["text-center m-t-8 text-semibold rounded-inner",`obs-status_${e.status}`])},{default:(0,w.w5)((()=>[(0,w.Uk)((0,y.zw)(e.statusText),1)])),_:1},8,["class"])])),_:1})):((0,w.wg)(),(0,w.j4)(c,{key:1,type:"info",class:"m-t-8"},{default:(0,w.w5)((()=>[$])),_:1}))])}]]),se=(0,w.Uk)(" OBS data is missing. Please connect to an OBS websocket to continue. "),ie=(0,w.aZ)({name:"ObsDataPicker",components:{IplButton:M.IplButton,IplMessage:M.IplMessage,IplSelect:M.IplSelect,IplSpace:M.IplSpace},setup(){const e=X(),t=(0,I.iH)(""),a=(0,I.iH)("");return(0,w.YP)((()=>e.obsData.gameplayScene),(e=>t.value=e),{immediate:!0}),(0,w.YP)((()=>e.obsData.intermissionScene),(e=>a.value=e),{immediate:!0}),{RIGHT_CLICK_UNDO_MESSAGE:F.m,gameplayScene:t,intermissionScene:a,hasObsData:(0,I.Fl)((()=>null!=e.obsData.scenes)),sceneOptions:(0,I.Fl)((()=>{var t,a;return null!==(a=null===(t=e.obsData.scenes)||void 0===t?void 0:t.map((e=>({value:e,name:e}))))&&void 0!==a?a:[]})),isChanged:(0,I.Fl)((()=>t.value!==e.obsData.gameplayScene||a.value!==e.obsData.intermissionScene)),update(){e.setData({gameplayScene:t.value,intermissionScene:a.value})},undoChanges(n){n.preventDefault(),t.value=e.obsData.gameplayScene,a.value=e.obsData.intermissionScene}}}}),ue=(0,N.Z)(ie,[["render",function(e,t,a,n,l,o){const r=(0,w.up)("ipl-message"),s=(0,w.up)("ipl-select"),i=(0,w.up)("ipl-button"),u=(0,w.up)("ipl-space");return e.hasObsData?((0,w.wg)(),(0,w.j4)(u,{key:1},{default:(0,w.w5)((()=>[(0,w.Wm)(s,{modelValue:e.gameplayScene,"onUpdate:modelValue":t[0]||(t[0]=t=>e.gameplayScene=t),options:e.sceneOptions,label:"Gameplay scene","data-test":"gameplay-scene-select"},null,8,["modelValue","options"]),(0,w.Wm)(s,{modelValue:e.intermissionScene,"onUpdate:modelValue":t[1]||(t[1]=t=>e.intermissionScene=t),options:e.sceneOptions,label:"Intermission scene","data-test":"intermission-scene-select",class:"m-t-8"},null,8,["modelValue","options"]),(0,w.Wm)(i,{label:"Update",class:"m-t-8",color:e.isChanged?"red":"blue",title:e.RIGHT_CLICK_UNDO_MESSAGE,"data-test":"update-button",onClick:e.update,onRightClick:e.undoChanges},null,8,["color","title","onClick","onRightClick"])])),_:1})):((0,w.wg)(),(0,w.j4)(r,{key:0,type:"info"},{default:(0,w.w5)((()=>[se])),_:1}))}]]);Z.vI.add(Y.xi);const ce={general:"General",lastfm:"Last.fm",radia:"Radia","obs-socket":"OBS Socket"},de=(0,w.aZ)({name:"Settings",components:{ObsDataPicker:ue,ObsSocketSettings:re,FontAwesomeIcon:K.GN,IplSidebar:M.IplSidebar,IplSpace:M.IplSpace,RuntimeConfig:z,IplErrorDisplay:R.Z,RadiaSettings:U,LastfmSettings:P},setup(){const e=X();return{obsSocketEnabled:(0,I.Fl)((()=>e.obsData.enabled)),visibleSection:(0,I.iH)("general"),showSidebar:(0,I.iH)(!1),settingsSections:ce}}}),pe=(0,N.Z)(de,[["render",function(e,t,a,n,l,o){const r=(0,w.up)("ipl-error-display"),s=(0,w.up)("ipl-space"),i=(0,w.up)("ipl-sidebar"),u=(0,w.up)("font-awesome-icon"),c=(0,w.up)("lastfm-settings"),d=(0,w.up)("radia-settings"),p=(0,w.up)("runtime-config"),m=(0,w.up)("obs-socket-settings"),g=(0,w.up)("obs-data-picker");return(0,w.wg)(),(0,w.iD)(w.HY,null,[(0,w.Wm)(r,{class:"m-b-8"}),(0,w.Wm)(i,{"is-open":e.showSidebar,"onUpdate:is-open":t[0]||(t[0]=t=>e.showSidebar=t)},{default:(0,w.w5)((()=>[((0,w.wg)(!0),(0,w.iD)(w.HY,null,(0,w.Ko)(e.settingsSections,((t,a)=>((0,w.wg)(),(0,w.j4)(s,{key:a,"data-test":`section-selector_${a}`,clickable:"",color:e.visibleSection===a?"blue":"light",class:"m-b-8",onClick:t=>{e.visibleSection=a,e.showSidebar=!1}},{default:(0,w.w5)((()=>[(0,w.Uk)((0,y.zw)(t),1)])),_:2},1032,["data-test","color","onClick"])))),128))])),_:1},8,["is-open"]),(0,w.Wm)(s,{class:"layout horizontal m-t-8","data-test":"open-sidebar-button",clickable:"",onClick:t[1]||(t[1]=t=>e.showSidebar=!0)},{default:(0,w.w5)((()=>[(0,w.Wm)(u,{icon:"bars",class:"large-icon m-r-8"}),E])),_:1}),"lastfm"===e.visibleSection?((0,w.wg)(),(0,w.j4)(c,{key:0,class:"m-t-8"})):"radia"===e.visibleSection?((0,w.wg)(),(0,w.j4)(d,{key:1,class:"m-t-8"})):"general"===e.visibleSection?((0,w.wg)(),(0,w.j4)(p,{key:2,class:"m-t-8"})):"obs-socket"===e.visibleSection?((0,w.wg)(),(0,w.iD)(w.HY,{key:3},[(0,w.Wm)(m,{class:"m-t-8"}),e.obsSocketEnabled?((0,w.wg)(),(0,w.j4)(g,{key:0,class:"m-t-8"})):(0,w.kq)("",!0)],64)):(0,w.kq)("",!0)],64)}]]);var me,ge,ve=a(4825);ge=function*(){const e=(0,ve.ri)(pe);e.use((0,o.WB)()),yield(0,l._)(k,S()),yield(0,l._)(J,X()),(0,te.E)(e),e.mount("#app")},new((me=void 0)||(me=Promise))((function(e,t){function a(e){try{l(ge.next(e))}catch(e){t(e)}}function n(e){try{l(ge.throw(e))}catch(e){t(e)}}function l(t){var l;t.done?e(t.value):(l=t.value,l instanceof me?l:new me((function(e){e(l)}))).then(a,n)}l((ge=ge.apply(void 0,[])).next())}))}},a={};function n(e){var l=a[e];if(void 0!==l)return l.exports;var o=a[e]={id:e,loaded:!1,exports:{}};return t[e](o,o.exports,n),o.loaded=!0,o.exports}n.m=t,e=[],n.O=(t,a,l,o)=>{if(!a){var r=1/0;for(c=0;c<e.length;c++){for(var[a,l,o]=e[c],s=!0,i=0;i<a.length;i++)(!1&o||r>=o)&&Object.keys(n.O).every((e=>n.O[e](a[i])))?a.splice(i--,1):(s=!1,o<r&&(r=o));if(s){e.splice(c--,1);var u=l();void 0!==u&&(t=u)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[a,l,o]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={571:0};n.O.j=t=>0===e[t];var t=(t,a)=>{var l,o,[r,s,i]=a,u=0;if(r.some((t=>0!==e[t]))){for(l in s)n.o(s,l)&&(n.m[l]=s[l]);if(i)var c=i(n)}for(t&&t(a);u<r.length;u++)o=r[u],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(c)},a=self.webpackChunk=self.webpackChunk||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})(),n.nc=void 0;var l=n.O(void 0,[141,745,901,48],(()=>n(9363)));l=n.O(l)})();