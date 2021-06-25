(()=>{"use strict";var e={59:(e,t,a)=>{var n,r=a(19),o=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=l(t);if(a&&a.has(e))return a.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=r?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(n,o,s):n[o]=e[o]}return n.default=e,a&&a.set(e,n),n}(a(798)),s=(n=a(118))&&n.__esModule?n:{default:n},i=a(575);function l(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(l=function(e){return e?a:t})(e)}const u=o.get(),c=u.Router();c.post("/upload-tournament-json",(0,s.default)({limits:{fileSize:52428800}}),((e,t)=>{if(!e.files||!e.files.file||!e.body.jsonType||"application/json"!==e.files.file.mimetype)return t.sendStatus(400);const a=e.files.file,n=JSON.parse(a.data.toString());switch(e.body.jsonType){case"rounds":{const e=(0,r.handleRoundData)(n),t=u.Replicant("rounds");t.value={...t.value,...e};break}case"teams":{const e=(0,i.handleRawData)(n,a.name);(0,i.updateTeamDataReplicants)(e);break}default:return t.sendStatus(400)}t.sendStatus(200)})),u.mount("/ipl-overlay-controls",c)},57:(e,t,a)=>{function n(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(n=function(e){return e?a:t})(e)}const r=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=n(t);if(a&&a.has(e))return a.get(e);var r={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&Object.prototype.hasOwnProperty.call(e,s)){var i=o?Object.getOwnPropertyDescriptor(e,s):null;i&&(i.get||i.set)?Object.defineProperty(r,s,i):r[s]=e[s]}return r.default=e,a&&a.set(e,r),r}(a(798)).get(),o=r.Replicant("gameWinners"),s=r.Replicant("teamScores"),i=r.Replicant("setWinnersAutomatically"),l=r.Replicant("activeRoundId");s.on("change",((e,t)=>{if(!i.value||!t)return;const a=e.teamA+e.teamB;1===a&&(1===e.teamA?o.value[0]=1:o.value[0]=2),a>=2&&0!==o.value[0]&&(e.teamA===t.teamA?o.value[a-1]=2:o.value[a-1]=1)})),l.on("change",((e,t)=>{t&&(o.value=[0,0,0,0,0,0,0])}))},251:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.updateMatchReplicant=d;var n,r=(n=a(376))&&n.__esModule?n:{default:n},o=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=i(t);if(a&&a.has(e))return a.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=r?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(n,o,s):n[o]=e[o]}return n.default=e,a&&a.set(e,n),n}(a(798)),s=a(117);function i(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(i=function(e){return e?a:t})(e)}const l=o.get(),u=l.Replicant("highlightedMatches"),c=l.Replicant("tournamentData");function d(e){e.sort(((e,t)=>{const a=`${e.meta.stageName} ${e.meta.name}`,n=`${t.meta.stageName} ${t.meta.name}`;return a<n?-1:a>n?1:0})),e.length>0&&(u.value=e)}function f(e){const t={id:e.team._id,name:e.team.name,logoUrl:e.team.persistentTeam.logoUrl,players:[]};for(let a=0;a<e.team.players.length;a++){const n={name:e.team.players[a].inGameName};t.players.push(n)}return t}l.listenFor("getHighlightedMatches",(async(e,t)=>{if(e.stages||e.getAllStages)switch(c.value.meta.source){case"Battlefy":(async function(e,t){const a=`https://api.battlefy.com/tournaments/${c.value.meta.id}?extend[stages][$query][deletedAt][$exists]=false&extend[stages][matches]=1&extend[stages][$opts][name]=1&extend[stages][$opts][matches][$elemMatch][isMarkedLive]=true&extend[stages.matches.top.team]=1&extend[stages.matches.bottom.team]=1&extend[stages][$opts][bracket]=1&extend[stages.matches.top.team.persistentTeam]=1&extend[stages.matches.bottom.team.persistentTeam]=1&extend[stages.matches.top.team.players]=1&extend[stages.matches.bottom.team.players]=1`,n=await r.default.get(a),{data:o}=n;if(o.error)throw new Error(`Got error from Battlefy: ${o.error}`);if(!o[0])throw new Error("Couldn't get tournament data from Battlefy.");const s=o[0];return function(e){const t=[],a=e.filter((e=>["swiss","elimination","roundrobin"].includes(e.bracket.type)));for(let e=0;e<a.length;e++){const n=a[e],r=n.matches.filter((e=>!0===e.isMarkedLive));for(let e=0;e<r.length;e++){const a=r[e],o=f(a.top),s=f(a.bottom);let i=`Round ${a.roundNumber} Match `;a.matchType&&["loser","winner"].includes(a.matchType)?"loser"===a.matchType?i+=`L${a.matchNumber}`:"winner"===a.matchType&&(i+=`C${a.matchNumber}`):i+=a.matchNumber;const l={id:a._id,stageName:n.name,round:a.roundNumber,match:a.matchNumber,name:i,completionTime:"None"};void 0!==a.completedAt&&(l.completionTime=a.completedAt),t.push({meta:l,teamA:o,teamB:s})}}return t}(t?s.stages:s.stages.filter((t=>e.includes(t._id))))})(e.stages,e.getAllStages).then((e=>{e.length>0?(d(e),t(null,{status:s.ImportStatus.Success,data:e})):t(null,{status:s.ImportStatus.NoData,data:e})})).catch((e=>{t(e)}));break;default:t(new Error("Invalid method given."))}else t(new Error("Missing arguments."),null)}))},715:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=r(t);if(a&&a.has(e))return a.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&Object.prototype.hasOwnProperty.call(e,s)){var i=o?Object.getOwnPropertyDescriptor(e,s):null;i&&(i.get||i.set)?Object.defineProperty(n,s,i):n[s]=e[s]}return n.default=e,a&&a.set(e,n),n}(a(798));function r(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(r=function(e){return e?a:t})(e)}t.default=e=>{n.set(e),a(550),a(57),a(575),a(19),a(59),a(251);const t=e.Replicant("radiaSettings");e.bundleConfig&&void 0!==e.bundleConfig.radia?(t.value.enabled=!0,a(708)):(e.log.warn(`"radia" is not defined in cfg/${e.bundleName}.json! The ability to import data via the Radia\n            Production API won't be possible.`),t.value.enabled=!1)},e.exports=t.default},550:(e,t,a)=>{var n,r=a(172),o=(n=a(198))&&n.__esModule?n:{default:n};function s(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(s=function(e){return e?a:t})(e)}const i=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=s(t);if(a&&a.has(e))return a.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var i=r?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o]}return n.default=e,a&&a.set(e,n),n}(a(798)).get();!function(){if(!i.bundleConfig||void 0===i.bundleConfig.lastfm)return void i.log.warn(`"lastfm" is not defined in cfg/${i.bundleName}.json! Getting music information automatically will not function.`);const e=new r.LastFmNode({api_key:i.bundleConfig.lastfm.apiKey,secret:i.bundleConfig.lastfm.secret}),t=i.Replicant("lastFmNowPlaying",{persistent:!1});let a;i.Replicant("lastFmSettings").on("change",(n=>{a&&a.stop(),a=e.stream(n.username),a.on("nowPlaying",(e=>{t.value={artist:e.artist["#text"],song:e.name,album:e.album["#text"],cover:e.image[2]["#text"],artistSong:`${e.artist["#text"]} - ${e.name}`}})),a.on("error",(e=>{6===e.error&&(i.log.info(`Last.fm couldn't find user "${n.username}" - error message: "${e.message}"`),a.stop())})),a.start()}))}(),function(){const e=i.Replicant("lastFmNowPlaying"),t=i.Replicant("manualNowPlaying"),a=i.Replicant("nowPlayingSource"),n=i.Replicant("nowPlaying"),r={lastfm:e,manual:t};a.on("change",(a=>{switch(a){case"manual":n.value=(0,o.default)(t.value);break;case"lastfm":n.value=(0,o.default)(e.value);break;default:throw new Error("Invalid value for nowPlayingSource.")}}));for(const[e,t]of Object.entries(r))t.on("change",(t=>{a.value===e&&(n.value=(0,o.default)(t))}))}()},708:(e,t,a)=>{var n,r=(n=a(376))&&n.__esModule?n:{default:n};function o(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(o=function(e){return e?a:t})(e)}const s=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=o(t);if(a&&a.has(e))return a.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&Object.prototype.hasOwnProperty.call(e,s)){var i=r?Object.getOwnPropertyDescriptor(e,s):null;i&&(i.get||i.set)?Object.defineProperty(n,s,i):n[s]=e[s]}return n.default=e,a&&a.set(e,n),n}(a(798)).get(),i=s.Replicant("casters"),l=s.Replicant("radiaSettings"),u=s.bundleConfig.radia;s.listenFor("getLiveCommentators",(async(e,t)=>{(async function(e,t,a){return new Promise(((n,o)=>{r.default.get(`${e}/live/guild/${a}`,{headers:{Authorization:t}}).then((e=>{200===e.status?n(e.data):o(`Radia API call failed with response ${e.status.toString()}`)})).catch((e=>{o(e)}))}))})(u.url,u.authentication,l.value.guildID).then((e=>{if(e.length<=0)return t("Got no commentators from API.");const a=e.slice(0,3),n=e.slice(3);i.value=a.reduce(((e,t)=>{const a=t.discord_user_id;return delete t.discord_user_id,e[a]=t,e}),{}),t(null,{add:a,extra:n})})).catch((e=>{404===e.response.status&&t(null,null),t(e)}))}))},19:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.handleRoundData=p;var n,r=(n=a(376))&&n.__esModule?n:{default:n},o=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=l(t);if(a&&a.has(e))return a.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=r?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(n,o,s):n[o]=e[o]}return n.default=e,a&&a.set(e,n),n}(a(798)),s=a(279),i=a(367);function l(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(l=function(e){return e?a:t})(e)}const u=o.get(),c=u.Replicant("rounds");u.listenFor("getRounds",(async(e,t)=>{e.url?async function(e){return new Promise(((t,a)=>{r.default.get(e,{responseType:"json"}).then((a=>{const n=p(a.data);t({rounds:n,url:e})})).catch((e=>{a(e)}))}))}(e.url).then((e=>{c.value={...c.value,...e.rounds},t(null,e.url)})).catch((e=>{t(e)})):t(new Error("Missing arguments."),null)}));const d=s.splatStages.map((e=>e.toLowerCase())),f=s.splatModes.map((e=>e.toLowerCase()));function p(e){const t={};for(let n=0;n<e.length;n++){const r=e[n],o=[],l=null==r.games?r.maps:r.games;if(l){for(let e=0;e<l.length;e++){const t=l[e],n=null==t.stage?t.map:t.stage;o.push({stage:(a=n,a=a.toLowerCase(),d.includes(a)?s.splatStages[d.indexOf(a)]:"Unknown Stage"),mode:m(t.mode)})}t[(0,i.generateId)()]={meta:{name:r.name},games:o}}}var a;return t}function m(e){return e=e.toLowerCase(),f.includes(e)?s.splatModes[f.indexOf(e)]:"Unknown Mode"}},575:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.updateTeamDataReplicants=g,t.handleRawData=y;var n=l(a(376)),r=function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=i(t);if(a&&a.has(e))return a.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=r?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(n,o,s):n[o]=e[o]}return n.default=e,a&&a.set(e,n),n}(a(798)),o=a(367),s=l(a(198));function i(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(i=function(e){return e?a:t})(e)}function l(e){return e&&e.__esModule?e:{default:e}}const u=r.get(),c=u.Replicant("tournamentData"),d=u.Replicant("scoreboardData"),f=u.Replicant("nextTeams"),p=u.Replicant("highlightedMatches");let m;function g(e){if(e.data.length<=0)throw new Error("Tournament has no teams.");e.data.sort(((e,t)=>{const a=e.name.toUpperCase(),n=t.name.toUpperCase();return a<n?-1:a>n?1:0})),c.value=e,p.value=[];const t=e.data[0],a=e.data[1]||e.data[0];d.value.teamAInfo=(0,s.default)(t),d.value.teamBInfo=(0,s.default)(a),f.value.teamAInfo=(0,s.default)(e.data[2]||t),f.value.teamBInfo=(0,s.default)(e.data[3]||a)}async function h(e,t,a,r=!1){return new Promise(((s,i)=>{n.default.post("https://api.smash.gg/gql/alpha",JSON.stringify({query:"query Entrants($slug: String!, $page: Int!, $perPage: Int!) {\n\t\ttournament(slug: $slug) {\n\t\tid\n\t\tname\n\t\tteams(query: {\n\t\t\tpage: $page\n\t\t\tperPage: $perPage\n\t\t}) {\n\t\t\tpageInfo {\n\t\t\ttotal\n\t\t\ttotalPages\n\t\t\t}\n\t\t\tnodes {\n\t\t\tid\n\t\t\tname\n\t\t\tentrant {\n\t\t\t\tid\n\t\t\t\tparticipants {\n\t\t\t\tid\n\t\t\t\tgamerTag\n\t\t\t\t}\n\t\t\t}\n\t\t\t}\n\t\t}\n\t\t}\n\t}",variables:{slug:t,page:e,perPage:"50"}}),{headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:`Bearer ${a}`}}).then((e=>{const{data:t}=e,a=[];for(let e=0;e<t.data.tournament.teams.nodes.length;e++){const n=[],r=t.data.tournament.teams.nodes[e];if(!r.entrant)continue;for(let e=0;e<r.entrant.participants.length;e++){const t=r.entrant.participants[e].gamerTag;n.push({name:t})}const s=r.name;a.push({id:(0,o.generateId)(),name:s,players:n})}s(r?{pageInfo:a,raw:t}:{pageInfo:a})})).catch((e=>{i(e)}))}))}function y(e,t){for(let t=0;t<e.length;t++)e[t].id=(0,o.generateId)();return{meta:{id:t,source:"Uploaded file"},data:e}}u.bundleConfig&&void 0!==u.bundleConfig.smashgg?m=u.bundleConfig.smashgg.apiKey:u.log.warn(`"smashgg" is not defined in cfg/${u.bundleName}.json! Importing tournament data from smash.gg will not be possible.`),u.listenFor("getTournamentData",(async(e,t)=>{if(e.id&&e.method)switch(e.method){case"battlefy":(async function(e){const t=await async function(e){const t=`https://api.battlefy.com/tournaments/${e}?extend%5Bcampaign%5D%5Bsponsor%5D=true&extend%5Bstages%5D%5B%24query%5D%5BdeletedAt%5D%5B%24exists%5D=false&extend%5Bstages%5D%5B%24opts%5D%5Bname%5D=1&extend%5Bstages%5D%5B%24opts%5D%5Bbracket%5D=1&extend%5Bstages%5D%5B%24opts%5D%5BstartTime%5D=1&extend%5Bstages%5D%5B%24opts%5D%5BendTime%5D=1&extend%5Bstages%5D%5B%24opts%5D%5Bschedule%5D=1&extend%5Bstages%5D%5B%24opts%5D%5BmatchCheckinDuration%5D=1&extend%5Bstages%5D%5B%24opts%5D%5BhasCheckinTimer%5D=1&extend%5Bstages%5D%5B%24opts%5D%5BhasStarted%5D=1&extend%5Bstages%5D%5B%24opts%5D%5BhasMatchCheckin%5D=1&extend%5Borganization%5D%5Bowner%5D%5B%24opts%5D%5Btimezone%5D=1&extend%5Borganization%5D%5B%24opts%5D%5Bname%5D=1&extend%5Borganization%5D%5B%24opts%5D%5Bslug%5D=1&extend%5Borganization%5D%5B%24opts%5D%5BownerID%5D=1&extend%5Borganization%5D%5B%24opts%5D%5BlogoUrl%5D=1&extend%5Borganization%5D%5B%24opts%5D%5BbannerUrl%5D=1&extend%5Borganization%5D%5B%24opts%5D%5Bfeatures%5D=1&extend%5Borganization%5D%5B%24opts%5D%5Bfollowers%5D=1&extend%5Bgame%5D=true&extend%5Bstreams%5D%5B%24query%5D%5BdeletedAt%5D%5B%24exists%5D=false`;return(await n.default.get(t)).data[0]}(e),a="https://dtmwra1jsgyb0.cloudfront.net/tournaments/"+e+"/teams";return new Promise(((r,o)=>{n.default.get(a).then((a=>{const{data:n}=a;if(n.error)return void o(n.error);const s=[];t.stages.forEach((function(e){s.push({name:e.name,id:e._id,bracketType:e.bracket.type})}));const i={meta:{id:e,source:"Battlefy",name:t.name,stages:s},data:[]};for(let e=0;e<n.length;e++){const t=n[e],a={id:t._id,name:t.name,logoUrl:t.persistentTeam.logoUrl,players:[]};for(let e=0;e<t.players.length;e++){const n=t.players[e],r={name:n.inGameName,username:n.username};a.players.push(r)}i.data.push(a)}r(i)})).catch((e=>{o(e)}))}))})(e.id).then((e=>{g(e),t(null,e.meta.id)})).catch((e=>{t(e)}));break;case"smashgg":if(!m){t(new Error("No smash.gg token provided."));break}(async function(e,t){return new Promise(((a,n)=>{h(1,e,t,!0).then((async n=>{const r={meta:{id:e,source:"Smash.gg",name:n.raw.data.tournament.name},data:[]};if(r.data=r.data.concat(n.pageInfo),n.raw.data.tournament.teams.pageInfo.totalPages>1){const a=[];for(let r=2;r<=n.raw.data.tournament.teams.pageInfo.totalPages;r++)a.push(h(r,e,t));const o=await Promise.all(a);for(let e=0;e<o.length;e++)r.data=r.data.concat(o[e].pageInfo)}a(r)})).catch((e=>{n(e)}))}))})(e.id,m).then((e=>{g(e),t(null,e.meta.id)})).catch((e=>{t(e)}));break;case"raw":(async function(e){return new Promise(((t,a)=>{n.default.get(e).then((a=>{const n=y(a.data,e);t(n)})).catch((e=>{a(e)}))}))})(e.id).then((e=>{g(e),t(null,e.id)})).catch((e=>{t(e)}));break;default:t(new Error("Invalid method given."))}else t(new Error("Missing arguments."),null)}))},798:(e,t)=>{let a;Object.defineProperty(t,"__esModule",{value:!0}),t.set=function(e){a=e},t.get=function(){return a}},367:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.generateId=function(){return String(Math.random().toString(36).substr(2,9))}},279:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.splatModes=t.splatStages=void 0;const a=["Ancho-V Games","Arowana Mall","Blackbelly Skatepark","Camp Triggerfish","Goby Arena","Humpback Pump Track","Inkblot Art Academy","Kelp Dome","MakoMart","Manta Maria","Moray Towers","Musselforge Fitness","New Albacore Hotel","Piranha Pit","Port Mackerel","Shellendorf Institute","Shifty Station","Snapper Canal","Starfish Mainstage","Sturgeon Shipyard","The Reef","Wahoo World","Walleye Warehouse","Skipper Pavilion","Unknown Stage"];t.splatStages=a,a.sort();const n=["Clam Blitz","Tower Control","Rainmaker","Splat Zones","Turf War","Unknown Mode"];t.splatModes=n,n.sort()},117:(e,t)=>{let a;Object.defineProperty(t,"__esModule",{value:!0}),t.ImportStatus=void 0,t.ImportStatus=a,function(e){e[e.Success=0]="Success",e[e.Loading=1]="Loading",e[e.Failure=2]="Failure",e[e.NoData=3]="NoData",e[e.NoStatus=4]="NoStatus"}(a||(t.ImportStatus=a={}))},376:e=>{e.exports=require("axios")},198:e=>{e.exports=require("clone")},118:e=>{e.exports=require("express-fileupload")},172:e=>{e.exports=require("lastfm")}},t={},a=function a(n){var r=t[n];if(void 0!==r)return r.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,a),o.exports}(715);module.exports=a})();