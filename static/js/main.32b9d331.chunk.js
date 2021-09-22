(this["webpackJsonpsolar-system"]=this["webpackJsonpsolar-system"]||[]).push([[0],{111:function(e,t,i){},116:function(e,t,i){},118:function(e,t,i){},350:function(e,t,i){"use strict";i.r(t);i(110),i(111);var a,n=i(15),o=i.n(n),s=i(103),r=i.n(s),l=i(23),c=(i(116),i(8)),h=["annihilating","balancing","brewing","charging","dispatching","exciting","generating","initialising","isolating ","letting loose","manifesting","mining","randomising","scintilating","televising"],u=["asynchronous","correlating","crystaline","high-energy","isomorphic","molecular","multi-valent ","resonant","vibrational"],d=["astral fields","astral planes","bose-einstein condensate","consciousness","design elements","gravity wells","harmonics","lightening fields","meson clouds","neutron masses","physics","plasma","relativistic speeds","singularities","space-time fragmentation","string theory","warp fields"],p=function(e){return e[(t=0,i=e.length-1,Math.floor(Math.random()*(i-t+1)+t))];var t,i},m=function(e){return e.show?Object(c.jsx)("div",{className:"loading-indicator",children:"".concat(p(h)," ").concat(p(u)," ").concat(p(d),"...")}):null},b=(i(118),function(e){var t=e.planet;if(!t)return null;var i=[["Name",t.name],["Diameter (km)",(2*t.radius).toLocaleString()],["Moons",t.moons.length],["Orbit Distance (km)",t.orbitRadius.toLocaleString()],["Orbital Speed (km/h)",Math.floor(t.orbitSpeed).toLocaleString()],["Orbital Inclanation (\xb0)",t.orbitInclanation]];return Object(c.jsxs)("div",{className:"planet-datasheet",children:[Object(c.jsx)("h2",{children:"Planet Info"}),Object(c.jsx)("ul",{className:"planet-datasheet__property-list",children:i.map((function(e){return Object(c.jsxs)("li",{className:"planet-datasheet__property",children:[Object(c.jsx)("strong",{children:e[0]}),Object(c.jsx)("p",{children:e[1]})]},e[0])}))})]})}),g=function(e){var t=e.solarSystemApp,i=Object(n.useState)(!0),a=Object(l.a)(i,2),o=a[0],s=a[1],r=Object(n.useState)(void 0),h=Object(l.a)(r,2),u=h[0],d=h[1];Object(n.useEffect)((function(){t.init(),t.onInitialising=p,t.onInitialised=g,t.onSelectPlanet=y}),[t]);var p=function(){s(!0)},g=function(){s(!1)},y=function(e){d(e)};return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(m,{show:o}),Object(c.jsx)(b,{planet:u})]})},y=i(16),v=i(11),f=i(7),S=i.n(f),w=i(6),x=i(12),P=i(0),k=i(5),O=i(104),j=i.n(O),A=i(1),C=i(105),R=function(){function e(t){Object(P.a)(this,e),this.noiseGenerator=void 0,this.noiseGenerator=new C.a(t)}return Object(A.a)(e,[{key:"generateNoiseMap",value:function(e,t){for(var i=[],a=0;a<e;a++){i[a]=[];for(var n=0;n<t;n++){var o=this.getMixedFrequencyNoise(a,n,[.01,.02,.04,.08,.16,.32,.64,1.28]);o=Math.pow(o,2.3),i[a][n]=o}}return this.makeSeamlessVertically(i,.2*t),this.makeSeamlessHorizontally(i,.05*e),i}},{key:"getNoise",value:function(e,t,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=i*e+a,s=i*t+n,r=1/i,l=this.noiseGenerator.noise2D(o,s)/2+.5,c=r*l;return c}},{key:"getMixedFrequencyNoise",value:function(e,t,i){var a=this,n=0;return i.reduce((function(i,o,s){n+=1/o;var r=10*s,l=100*s;return i+a.getNoise(e,t,o,r,l)}),0)/n}},{key:"makeSeamlessHorizontally",value:function(e,t){for(var i=e.length,a=e[0].length,n=0;n<t;n++)for(var o=n/t,s=0;s<a;s++){var r=~~(i-t+n);e[r][s]=k.o.lerp(e[r][s],e[~~(t-n)][s],o)}}},{key:"makeSeamlessVertically",value:function(e,t){for(var i=e.length,a=e[0].length,n=0;n<t;n++)for(var o=Math.ceil(t-n),s=0;s<i;s++){for(var r=0,l=0,c=0,h=s-o;h<s+o;h++)h<0||h>=i||(r+=e[h][n],l+=e[h][a-n-1],c++);e[s][n]=r/c,e[s][a-n-1]=l/c}}}]),e}();!function(e){e[e.Star=0]="Star",e[e.Planet=1]="Planet",e[e.Moon=2]="Moon"}(a||(a={}));var M=function(){function e(t,i,a,n,o){Object(P.a)(this,e),this.id=void 0,this.name=void 0,this.entityType=void 0,this.entity=void 0,this.params=void 0,this.radius=void 0,this.sphere=void 0,this.orbit=void 0,this.textureWidth=void 0,this.textureHeight=void 0,this.maxTerrainHeight=void 0,this.loader=new k.C,this.sphereGeometry=void 0,this.orbitGeometry=void 0,this.material=void 0,this.heightMapTexture=void 0,this.colourMapTexture=void 0,this.texture=void 0,this.labelContext=void 0,this.labelTexture=void 0,this.labelSprite=void 0,this.labelScaleVector=new k.E,this.labelAspectRatio=void 0,this.id=t,this.name=i,this.entityType=a,this.radius=n,this.params=o,this.entity=new k.k,this.textureWidth=512,this.textureHeight=256}return Object(A.a)(e,[{key:"create",value:function(){var e=Object(x.a)(S.a.mark((function e(){var t,i,a,n,o;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(this.params.terrainHeight&&this.params.terrainHeight>0)){e.next=10;break}t=this.generateTerrainMaps(),this.heightMapTexture=new k.e(t.heightMap.canvas),this.colourMapTexture=new k.e(t.map.canvas),this.heightMapTexture.mapping=k.i,this.colourMapTexture.mapping=k.i,i=Math.ceil(this.params.terrainHeight*this.maxTerrainHeight),this.material=new k.r({bumpMap:this.heightMapTexture,bumpScale:i,map:this.colourMapTexture,displacementMap:this.heightMapTexture,displacementScale:i}),e.next=18;break;case 10:if(!this.params.texturePath){e.next=17;break}return e.next=13,this.loader.loadAsync(this.params.texturePath);case 13:this.texture=e.sent,this.material=new k.q({map:this.texture,color:this.params.colour}),e.next=18;break;case 17:this.material=new k.q({color:this.params.colour});case 18:return this.sphereGeometry=new k.w(this.radius,64,48),this.sphere=new k.p(this.sphereGeometry,this.material),this.sphere.castShadow=!!this.params.castShadow,this.sphere.receiveShadow=!!this.params.receiveShadow,this.params.hasLabel&&this.addLabel(),this.entity.add(this.sphere),this.params.orbitEntity&&(a=this.params.orbitEntity.sphere.position,n=this.params.orbitRadius||400,o=this.createOrbitCircle(n),this.entity.add(o),this.sphere.position.set(n,0,0),this.entity.position.set(a.x,a.y,a.z),this.entity.rotation.x=k.o.degToRad(this.params.orbitInclanation),this.entity.rotation.y=k.o.degToRad(360*this.params.orbitStartPosition)),e.abrupt("return",this);case 26:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"animate",value:function(e,t,i,a){if(e.getElapsedTime(),this.params.orbitEntity){var n=this.params.orbitSpeed/60/60/60*t,o=this.params.orbitDirection;this.entity.rotation.y+=n*o}if(this.params.spinSpeed){var s=this.params.spinSpeed/60/60/60;this.sphere.rotation.y+=s*t*this.params.spinDirection}if(this.params.hasLabel&&(this.labelSprite.visible=a,a)){var r=this.labelScaleVector.subVectors(this.sphere.position,i.position).length()/24;this.labelSprite.scale.set(r,r*this.labelAspectRatio,1),this.labelSprite.position.y=this.radius}}},{key:"show",value:function(){this.params.onShow&&this.params.onShow(this.id)}},{key:"dispose",value:function(){var e,t,i,a,n,o,s,r;null===(e=this.sphereGeometry)||void 0===e||e.dispose(),null===(t=this.orbitGeometry)||void 0===t||t.dispose(),null===(i=this.orbit)||void 0===i||i.dispose(),null===(a=this.material)||void 0===a||a.dispose(),null===(n=this.heightMapTexture)||void 0===n||n.dispose(),null===(o=this.colourMapTexture)||void 0===o||o.dispose(),null===(s=this.texture)||void 0===s||s.dispose(),null===(r=this.labelTexture)||void 0===r||r.dispose(),this._dispose()}},{key:"generateTerrainMaps",value:function(){for(var e=this.getCanvasContext(),t=e.createImageData(this.textureWidth,this.textureHeight),i=t.data,a=this.getCanvasContext(),n=a.createImageData(this.textureWidth,this.textureHeight),o=n.data,s=[].concat(Object(w.a)(this.params.baseSeed),[99999]).reduce((function(e,t){return e+t})),r=new R(s).generateNoiseMap(this.textureWidth,this.textureHeight),l=0;l<i.length;l+=4){for(var c=l/4%this.textureWidth,h=~~(l/4/this.textureWidth),u=255*r[c][h],d=[u,u,u,255],p=0;p<d.length;p++)i[l+p]=d[p];for(var m=this.getMapColour(u,h),b=0;b<m.length;b++)o[l+b]=m[b]}return e.putImageData(t,0,0),a.putImageData(n,0,0),{heightMap:e,map:a}}},{key:"getRangeColour",value:function(e,t){return this.lerpColour(e.dark,e.light,(t-e.min)/(e.max-e.min))}},{key:"lerpColour",value:function(e,t,i){var a=this.convertToColor(e).lerp(this.convertToColor(t),i);return[].concat(Object(w.a)(a.toArray()),[255])}},{key:"convertToColor",value:function(e){return(new k.g).setRGB(e[0],e[1],e[2])}},{key:"getCanvasContext",value:function(){var e=document.createElement("canvas").getContext("2d");return e.canvas.width=this.textureWidth,e.canvas.height=this.textureHeight,e.fillStyle="#fff",e.fillRect(0,0,e.canvas.width,e.canvas.height),e}},{key:"createOrbitCircle",value:function(e){this.orbitGeometry=new k.c;var t=[];this.orbit=new k.m({color:16777215,opacity:.5,transparent:!0});for(var i=0;i<=128;i++){var a=i/128*Math.PI*2;t.push(Math.cos(a)*e,0,Math.sin(a)*e)}var n=new Float32Array(t);return this.orbitGeometry.setAttribute("position",new k.b(n,3)),new k.l(this.orbitGeometry,this.orbit)}},{key:"addLabel",value:function(){this.labelContext=document.createElement("canvas").getContext("2d");this.labelContext.canvas.width=384,this.labelContext.canvas.height=384,this.labelContext.font="".concat(44,"pt 'Lucida Grande', sans-serif"),this.labelAspectRatio=this.labelContext.canvas.height/this.labelContext.canvas.width,this.labelContext.fillStyle="white",this.labelContext.textAlign="center",this.labelContext.fillText(this.name,this.labelContext.canvas.width/2,45),this.labelTexture=new k.B(this.labelContext.canvas),this.labelTexture.needsUpdate=!0;var e=new k.z({map:this.labelTexture,transparent:!0});this.labelSprite=new k.y(e),this.sphere.add(this.labelSprite)}}]),e}(),I=i(106),D=i(107),H=i(108),L=["Acanthis","Achelous","Acheron","Achilles","Achilles","Achlys","Actaeon","Admetus","Adoni","Aeacus","A\xebdon","Ae\xebtes","Aegisthus","Aegyptus","Aella","Aello","Aeneas","Aeolus","Aeternae","Aethon","Agamemnon","Aglaia","Agreus","Agriopas","Agrius","Ajax","Alcestis","Alcyone","Alcyoneus","Alecto","Alectryon","Alkyonides","Almops","Aloadae","Althaea","Amazon","Amazons","Ampelos","Amphion","Amphisbaena","Amphithemis","Amphitrite","Amphitryon","Amycus","Anchises","Andromache","Andromeda","Anteros","Antigone","Antino\xfcs","Antiphates","Aphrodit","Aphrodite","Apollo","Aquilo","Arachne","Arae","Ares","Arges","Argo","Argos","Argus","Argus","Ariadne","Arion","Arion","Artemi","Artemis","Asbolus","Ascalaphus","Asclepiu","Asclepius","Astarte","Asterius","Astraea","Atalanta","Atalanta","Athen","Athena","Athos","Atlas","Atreus","Atropos","Aurora","Auster","Autonous","Avernus","Bacchus","Balius","Bellerophon","Bellona","Bienor","Boreas","Briareus","Cadmus","Calliope","Calypso","Carduelis","Cassandra","Castor","Catoblepas","Celaeno","Centaur","Centauride","Centauromachy","Centaurs","Centaurus","Cephalus","Cepheus","Ceramici","Cerastes","Cerberus","Cercopes","Ceres","Cetus","Ceuthonymus","Ceyx","Chaos","Charon","Charybdis","Chimera","Chiron","Chiron","Chryseis","Chthonius","Circe","Clio","Clotho","Clytemnestra","Cornix","Coronis","Corvus","Crocotta","Crommyon","Cronu","Cronus","Cyclopes","Cycnus","Cyllarus","Cyprus","Daedalus","Daemons","Damarchus","Damysus","Danae","Dana\xefdes","Dana\xfcs","Daphne","Demete","Dictys","Dido","Diomedes","Dione","Dionysu","Dionysus","Dioscuri","Dryad","Dryads","Echion","Echo","Eidolon","Elatus","Electra","Empousa","Empusa","Enceladus","Endymion","Enyo","Eo","Eos","Erato","Erebus","Eridanos","Erigone","Erinyes","Eris","Ero","Eros","Eteocles","Euphrosyne","Europa","Eurus","Euryale","Eurydice","Eurynomos","Eurystheus","Eurytion","Eurytus","Euterpe","Fates","Fauns","Faunus","Favonius","Flora","Fortuna","Furie","Furies","Gadflies","Gaea","Gaia","Galatea","Ganymede","Gegenees","Gello","Gerana","Geryon","giant","Giantess","Gigantes","Golden Fleece","Gorgons","Graces","Graeae","Graeae","Griffin","Hade","Hades","Hades","halcyons","Hamadryads","Harpies","Heb","Hecate","Hecate","Hecatonchires","Hector","Hecuba","Helen","Helio","Helios","Helle","Hellhound","Hephaestu","Hephaestus","Hera","Hera","Heracles","Hercules","Herme","Hero","heroes","Hesperus","Hesti","Hestia","Hieracosphinx","Hippalectryon","Hippocampus","Hippodamia","Hippolyte","Hippolytus","Hippomenes","Hoopoe","Hyacinthus","Hydra","Hylaeus","Hylonome","Hyperion","Hypno","Hypnos","Iapetus","Icarus","Ichthyocentaurs","Io","Iobates","Ionia","Iphigenia","Ipotane","Iris","Ismene","Ixion","Janus","Jocasta","Juno","Jupiter","Juventas","Keres","Kobaloi","Labour","Ladon","Laelaps","Laestrygonians","Laius","Lamia","Lamiai","Lamos","Laoco\xf6n","Lapiths","Lares","Lark","Latona","Lavinia","Leda","Lerna","Lernaean Hydra","Let","Lethe","Leto","Lycaon","Lykaia","Maera","Maia","Manes","Manticore","Marsyas","Medea","Medea","Medusa","Megaera","Meleager","Melpomene","Memnon","Menelaus","Menoetes","Menoetius","Mentor","Merope","Midas","Mimas","Minerva","Minos","Minotaur","Mnemosyne","Momus","Monocerata","Mormo","Mormolykeia","Morpheus","Mors","Muse","Muses","Myrmekes","Mysia","Naiads","Napaeae","Narcissus","Nemea","Nemesis","Neoptolemus","nereid","Nessus","Nestor","Nestor","Nike","Niobe","Nomios","Notus","Ny","Nyctimene","Nyctimus","Nymphs","Nyx","Oceanids","Oceanu","Oceanus","Ocypete","Odontotyrannos","Odysseu","Odysseus","Oedipus","Oenoe","Oenone","Onocentaur","Ophiotaurus","Ops","Orestes","Orion","Orpheus","Orthrus","Ouroboros","Pa","Pallas","Pan","Pan","Pandora","Panes","panthers","Parcae","Paris","Parrhasia","Pasipha\xeb","Patroclus","Pegasus","Pegasus","Pelias","Pelops","Penates","Penelope","Periboea","Perimedes","Persephon","Persephone ","Perseus","Phaedra","Phaethon","Phaethon","Philoctetes","Philomela","Phineus","Phlegethon","Phoenix","Ph\xf3los","Pirithous","Pleiades","Plut","Pollux","Polybotes","Polyhymnia","Polymnia","Polynices","Polyphemus","Polyphemus","Polyxena","Pontus","Porphyrion","Poseido","Poseidon","Priam","Priapus","Procne","Procrustes","Prometheus","Proserpine","Proteus","Psyche","Pygmalion","Pyramus","Python","Quirinus","Rhadamanthus","Rhaecus","Rhe","Rhea","Romulus","Sarpedon","Saturn","Satyresses","Satyrs","Scylla","Selene","Semele","Sileni","Silenus","Silvanus","Siren","Sirens","Sisyphus","Sol","Somnus","Sphinx","Sterop","Stheno","Strix","Styx","Symplegades","Syrinx","Talos","Tantalus","Taras","Taraxippi","Tartarus","Telemachus","Tellus","Tereus","Terminus","Terpsichore","Thalia","Thanato","Thanatos","Thaumas","Themis","Theseus","Thisbe","Thoon","Thrace","Thyestes","Tiresias","Tisiphone","Titans","Tithonus","Tityos","Triton","Trojan","Turnus","Typhon","Ulysses","Urania","Uranus","Venus","Vesta","Virgil","Vulcan","Xanthus","Zephyrus","Zeu","Zeus"],T=i(109),E=i.n(T),F=function(){function e(){Object(P.a)(this,e)}return Object(A.a)(e,null,[{key:"getRandom",value:function(e){return E.a.factory({seed:e})()/4294967295}},{key:"getRandomInt",value:function(t,i,a){return Math.floor(e.getRandom(a)*(i-t+1)+t)}},{key:"getRandomFloat",value:function(t,i,a){return e.getRandom(a)*(i-t)+t}},{key:"coinToss",value:function(t){return e.getRandom(t)<=.5}},{key:"getRandomFromArray",value:function(e,t){return e[this.getRandomInt(0,e.length-1,t)]}},{key:"getRandomPointInSphere",value:function(e,t,i,a){t||(t=0),i||(i=0),a||(a=0);var n=Math.random(),o=Math.random(),s=2*Math.PI*n,r=Math.acos(1-2*o);return[t+e*Math.sin(r)*Math.cos(s),i+e*Math.sin(r)*Math.sin(s),a+e*Math.cos(r)]}}]),e}(),N=2440,V=69911,G=59223859,_=4498438348,W=172331,B=384400,z=1882709,J=62400,q=414e5,U=0,Z=1,K=2,Y=4,Q=6,X=7,$=8,ee=9,te=10,ie=11,ae=12,ne=function(){function e(t){Object(P.a)(this,e),this.entityId=0,this.seed=void 0,this.solarSystem={stars:[],planets:[]},this.seed=t}return Object(A.a)(e,[{key:"getNextId",value:function(){return this.entityId++,this.entityId}},{key:"generate",value:function(){for(var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:695508,i=[{id:this.getNextId(),name:"Star ".concat(this.entityId),seed:[this.seed,0],position:[0,0,0],radius:t,terrainHeight:0,moons:[],orbitEntityId:0,orbitRadius:0,orbitSpeed:0,orbitDirection:0,orbitInclanation:0,orbitStartPosition:0,spinSpeed:F.getRandomFloat(1e-4,3e-4,[this.seed,0].concat([Q])),spinDirection:F.coinToss([this.seed,0].concat([te]))?1:-1}],a=0;a<i.length;a++){for(var n=i[a],o=[this.seed,a],s=F.getRandomInt(1,9,[].concat(o,[X])),r=this.createPlanetOrbitRadiuses(s,o),l=function(t){for(var i=[e.seed,a,t],o=F.getRandomInt(N,2*V,[].concat(i,[U])),l=e.createPlanet(t,i,o,s,r[t],n),c=F.getRandomInt(1,10,[].concat(i,[X])),h=new Array(c).fill(null).map((function(e,t){return F.getRandomInt(B,z,[].concat(i,[$,t]))})).sort((function(e,t){return e-t})),u=0;u<c;u++){var d=[e.seed,a,t,u],p=F.getRandomInt(o/12,o/3,[].concat(d,[U])),m=e.createMoon(u,d,p,h[u],c);l.moons.push(m)}var b,g=Object(v.a)(l.moons);try{for(g.s();!(b=g.n()).done;){var y=b.value,f=1.5-y.orbitRadius/l.moons[l.moons.length-1].orbitRadius;y.orbitSpeed=f*J}}catch(S){g.e(S)}finally{g.f()}e.solarSystem.planets.push(l)},c=0;c<s;c++)l(c);var h,u=Object(v.a)(this.solarSystem.planets);try{for(u.s();!(h=u.n()).done;){var d=h.value,p=d.orbitRadius,m=this.solarSystem.planets[this.solarSystem.planets.length-1].orbitRadius,b=1.5-p/m;d.orbitSpeed=b*W}}catch(g){u.e(g)}finally{u.f()}this.solarSystem.stars.push(n)}return this.solarSystem}},{key:"createPlanetOrbitRadiuses",value:function(e,t){for(var i=new Array(e).fill(null).map((function(e,i){return F.getRandomInt(G,_,[].concat(Object(w.a)(t),[$,i]))})).sort((function(e,t){return e-t})),a=0;a<i.length-1;a++){var n=i[a],o=i[a+1]-n;if(o<q)for(var s=a+1;s<i.length;s++)i[s]+=q-o}return i}},{key:"createMoon",value:function(e,t,i,a,n){var o=F.coinToss([].concat(Object(w.a)(t),[Y]))?1:-1,s=F.getRandomFloat(.001,.005,[].concat(Object(w.a)(t),[Q]));return{id:this.getNextId(),name:"Moon ".concat(e+1),seed:t,radius:i,terrainHeight:F.getRandom([].concat(Object(w.a)(t),[Z])),orbitEntityId:-1,orbitRadius:a,orbitDirection:o,orbitSpeed:(n-e)/n,orbitInclanation:F.getRandomInt(0,45,[].concat(Object(w.a)(t),[ee])),orbitStartPosition:F.getRandom([].concat(Object(w.a)(t),[ie])),spinSpeed:s,spinDirection:F.coinToss([].concat(Object(w.a)(t),[te]))?1:-1,rgb:oe([].concat(Object(w.a)(t),[K])),moons:[]}}},{key:"createPlanet",value:function(e,t,i,a,n,o){var s=F.coinToss([].concat(Object(w.a)(t),[Y]))?1:-1,r=F.getRandomFloat(.002,.006,[].concat(Object(w.a)(t),[Q])),l=F.getRandomFromArray(L,[].concat(Object(w.a)(t),[ae]));return{id:this.getNextId(),name:l,seed:t,radius:i,terrainHeight:1,orbitEntityId:o.id,orbitRadius:n,orbitDirection:s,orbitSpeed:(a-e)/a,orbitInclanation:F.getRandomInt(0,15,[].concat(Object(w.a)(t),[ee])),orbitStartPosition:F.getRandom([].concat(Object(w.a)(t),[ie])),spinSpeed:r,spinDirection:F.coinToss([].concat(Object(w.a)(t),[te]))?1:-1,moons:[]}}}]),e}(),oe=function(e){return[F.getRandomFloat(.6,1,[].concat(Object(w.a)(e),[0])),F.getRandomFloat(.6,1,[].concat(Object(w.a)(e),[1])),F.getRandomFloat(.6,1,[].concat(Object(w.a)(e),[2]))]},se=i(2),re=i(3),le=function(e){Object(se.a)(i,e);var t=Object(re.a)(i);function i(){var e;Object(P.a)(this,i);for(var a=arguments.length,n=new Array(a),o=0;o<a;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))).maxTerrainHeight=5,e}return Object(A.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(e,t){var i=e/128,a=this.params.colour,n=a.r,o=a.g,s=a.b,r=[Math.floor(255*n),Math.floor(255*o),Math.floor(255*s),255];return[r[0]*i,r[1]*i,r[2]*i,r[3]]}}]),i}(M),ce=function(e){Object(se.a)(i,e);var t=Object(re.a)(i);function i(){var e;Object(P.a)(this,i);for(var a=arguments.length,n=new Array(a),o=0;o<a;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))).maxTerrainHeight=e.radius/16,e.colours={oceanDark:e.getRandomColour(0),oceanLight:e.getRandomColour(1),beachDark:e.getRandomColour(2),beachLight:e.getRandomColour(3),forestDark:e.getRandomColour(4),forestLight:e.getRandomColour(5),jungleDark:e.getRandomColour(6),jungleLight:e.getRandomColour(7),savannahDark:e.getRandomColour(8),savannahLight:e.getRandomColour(9),desertDark:e.getRandomColour(10),desertLight:e.getRandomColour(11),snowDark:e.getRandomColour(12),snowLight:e.getRandomColour(13)},e}return Object(A.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(e,t){return this.getColourForHeight(e)}},{key:"getColourForHeight",value:function(e){for(var t=0,i=[{min:0,max:60,dark:this.colours.oceanDark,light:this.colours.oceanLight},{min:60,max:70,dark:this.colours.oceanLight,light:this.colours.beachLight},{min:70,max:110,dark:this.colours.forestDark,light:this.colours.forestLight},{min:110,max:120,dark:this.colours.jungleDark,light:this.colours.jungleLight},{min:120,max:140,dark:this.colours.savannahDark,light:this.colours.savannahLight},{min:120,max:150,dark:this.colours.desertDark,light:this.colours.desertLight}];t<i.length;t++){var a=i[t];if(e<a.max)return this.getRangeColour(a,e)}return this.colours.snowLight}},{key:"getRandomColour",value:function(e){var t=[].concat(Object(w.a)(this.params.baseSeed),[e]);return[255*F.getRandomFloat(.2,1,[].concat(Object(w.a)(t),[0])),255*F.getRandomFloat(.2,1,[].concat(Object(w.a)(t),[1])),255*F.getRandomFloat(.2,1,[].concat(Object(w.a)(t),[2])),255]}}]),i}(M),he=function(e){Object(se.a)(i,e);var t=Object(re.a)(i);function i(e,a,n,o,s){var r;return Object(P.a)(this,i),(r=t.call(this,e,a,n,o,s)).maxTerrainHeight=0,r.params.terrainHeight=0,r.params.texturePath="assets/sun.jpg",r}return Object(A.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(e,t){var i=this.params.colour,a=i.r,n=i.g,o=i.b,s=[Math.floor(255*a),Math.floor(255*n),Math.floor(255*o),255];return[s[0],s[1],s[2],s[3]]}}]),i}(M),ue={oceanDark:[0,24,168,255],oceanLight:[0,105,148,255],beachDark:[140,129,95,255],beachLight:[221,202,146,255],forestDark:[0,66,37,255],forestLight:[0,127,72,255],jungleDark:[48,102,79,255],jungleLight:[57,122,94,255],savannahDark:[136,155,105,255],savannahLight:[165,189,126,255],desertDark:[175,175,144,255],desertLight:[198,198,167,255],snowDark:[200,200,200,255],snowLight:[255,255,255,255]},de=function(e){Object(se.a)(i,e);var t=Object(re.a)(i);function i(){var e;Object(P.a)(this,i);for(var a=arguments.length,n=new Array(a),o=0;o<a;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))).maxTerrainHeight=e.radius/16,e}return Object(A.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(e,t){return this.getColourForHeight(e)}},{key:"getColourForHeight",value:function(e){for(var t=0,i=[{min:0,max:60,dark:ue.oceanDark,light:ue.oceanLight},{min:60,max:70,dark:ue.oceanLight,light:ue.beachLight},{min:70,max:110,dark:ue.forestDark,light:ue.forestLight},{min:110,max:120,dark:ue.jungleDark,light:ue.jungleLight},{min:120,max:140,dark:ue.savannahDark,light:ue.savannahLight},{min:120,max:150,dark:ue.desertDark,light:ue.desertLight}];t<i.length;t++){var a=i[t];if(e<a.max)return this.getRangeColour(a,e)}return ue.snowLight}}]),i}(M);r.a.render(Object(c.jsx)(o.a.StrictMode,{children:Object(c.jsx)(g,{solarSystemApp:new function e(){var t,i=this;Object(P.a)(this,e),this.solarSystem=void 0,this.isRunning=!1,this.scene=void 0,this.camera=void 0,this.clock=new k.f,this.bodies=[],this.renderer=void 0,this.orbitControls=void 0,this.stats=void 0,this.showPlanetId=void 0,this.cameraInitialPosition=void 0,this.spaceTexture=void 0,this.gui=void 0,this.guiViewActionsFolder=void 0,this.guiPlanetsFolder=void 0,this.planetPositionVector=new k.E,this.ambientLight=void 0,this.pointLight=void 0,this.onInitialising=void 0,this.onInitialised=void 0,this.onSelectPlanet=void 0,this.options={seed:982174,simulationSpeed:3,showOrbits:!0,followPlanetName:"Star 1",trueScale:!1,showPlanetLabels:!1,showStats:!0},this.buttonHandlers={resetView:function(){i.resetView()},newSeed:function(){i.options.seed=k.o.randInt(1e5,999999),i.init()},changeSeed:function(){i.init()}},this.init=function(){i.onInitialising&&i.onInitialising(),i.gui.updateDisplay(),i.clearScene(),i.solarSystem=new ne(i.options.seed).generate(),i.options.showPlanetLabels=i.options.trueScale,i._init().then((function(){i.resetView(),i.animate(),i.onInitialised&&i.onInitialised()}))},this._init=Object(x.a)(S.a.mark((function e(){var t,n,o,s,r,l;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i.showPlanetId=-1,i.ambientLight=new k.a(16777215,.15),i.scene.add(i.ambientLight),i.pointLight=new k.t(16244886,1),i.pointLight.position.set(0,0,0),i.scene.add(i.pointLight),!i.options.trueScale){e.next=12;break}return e.next=9,i.renderRealisticSolarSystem();case 9:(t=i.camera.position).set.apply(t,Object(w.a)(i.cameraInitialPosition)),e.next=15;break;case 12:return e.next=14,i.renderSolarSystem();case 14:(n=i.camera.position).set.apply(n,Object(w.a)(i.cameraInitialPosition)).divideScalar(500);case 15:for(o=i.bodies.filter((function(e){return e.entityType===a.Planet})),s=i.bodies.filter((function(e){return e.entityType===a.Star}))[0],i.guiViewActionsFolder=i.gui.addFolder("View Options"),i.guiViewActionsFolder.open(),i.guiViewActionsFolder.add(i.options,"followPlanetName",[s.name].concat(Object(w.a)(o.map((function(e){return e.name}))))).name("Centre of View").onChange(i.onFollowPlanetNameChange),i.guiViewActionsFolder.add(i.buttonHandlers,"resetView").name("Reset View"),i.guiViewActionsFolder.add(i.options,"trueScale").name("True Scale").onChange(i.init),i.guiViewActionsFolder.add(i.options,"showOrbits").name("Orbits").onChange(i.toggleOrbits),i.guiViewActionsFolder.add(i.options,"showPlanetLabels").name("Labels"),i.guiViewActionsFolder.add(i.options,"showStats").name("Stats"),i.guiPlanetsFolder=i.gui.addFolder("Planets"),r=0;r<o.length;r++)l=o[r],i.guiPlanetsFolder.add(l,"show").name("#".concat(r+1,": ").concat(l.name));i.isRunning=!0;case 28:case"end":return e.stop()}}),e)}))),this.animate=function(){if(i.isRunning){if(requestAnimationFrame(i.animate),i.bodies.forEach((function(e){e.animate(i.clock,i.options.simulationSpeed/2,i.camera,i.options.showPlanetLabels&&-1===i.showPlanetId)})),i.options.showStats?(i.stats.dom.style.display="initial",i.stats.update()):i.stats.dom.style.display="none",i.showPlanetId>-1){var e=i.bodies.find((function(e){return e.id===i.showPlanetId}));if(e){e.sphere.getWorldPosition(i.planetPositionVector);var t=i.planetPositionVector,a=t.x,n=t.y,o=t.z;i.camera.position.set(a+2*e.radius,n+2*e.radius,o+10*e.radius),i.camera.lookAt(a,n,o)}}else if("Star 1"!==i.options.followPlanetName){var s=i.bodies.find((function(e){return e.name===i.options.followPlanetName}));if(s){s.sphere.getWorldPosition(i.planetPositionVector);var r=i.planetPositionVector,l=r.x,c=r.y,h=r.z;i.orbitControls.target.set(l,c,h),i.orbitControls.update()}}i.renderer.render(i.scene,i.camera)}},this.clearScene=function(){var e,t;i.isRunning=!1;try{i.gui.removeFolder(i.guiViewActionsFolder),i.gui.removeFolder(i.guiPlanetsFolder),i.guiViewActionsFolder.destroy()}catch(o){}null===(e=i.ambientLight)||void 0===e||e.dispose(),null===(t=i.pointLight)||void 0===t||t.dispose();var a,n=Object(v.a)(i.bodies);try{for(n.s();!(a=n.n()).done;){a.value.dispose()}}catch(s){n.e(s)}finally{n.f()}i.bodies=[],i.scene.clear(),i.renderer.render(i.scene,i.camera)},this.resetView=function(){var e,t;(i.showPlanetId=-1,i.options.trueScale)?(e=i.camera.position).set.apply(e,Object(w.a)(i.cameraInitialPosition)):(t=i.camera.position).set.apply(t,Object(w.a)(i.cameraInitialPosition)).divideScalar(500);i.onSelectPlanet&&i.onSelectPlanet(void 0)},this.handleShowPlanet=function(e){if(i.showPlanetId=e,i.onSelectPlanet){var t=i.solarSystem.planets.find((function(t){return t.id===e}));i.onSelectPlanet(t)}},this.toggleOrbits=function(){var e,t=Object(v.a)(i.bodies);try{for(t.s();!(e=t.n()).done;){var a=e.value;a.orbit&&(a.orbit.opacity=0===a.orbit.opacity?.5:0)}}catch(n){t.e(n)}finally{t.f()}},this.onFollowPlanetNameChange=function(){"Star 1"===i.options.followPlanetName&&(i.orbitControls.target.set(0,0,0),i.orbitControls.update())},this.renderRealisticSolarSystem=Object(x.a)(S.a.mark((function e(){var t,n,o,s,r,l,c,h,u,d;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=.001,n=Object(v.a)(i.solarSystem.stars),e.prev=2,n.s();case 4:if((o=n.n()).done){e.next=23;break}return s=o.value,r=s.radius*t,l=s.orbitRadius*t,c=s.orbitSpeed*t,h=new he(s.id,s.name,a.Star,r,{baseSeed:s.seed,position:s.position?Object(y.a)(k.E,Object(w.a)(s.position)):new k.E(0,0,0),colour:new k.g(16763424),orbitEntity:!1,orbitRadius:l,orbitDirection:s.orbitDirection,orbitSpeed:c,orbitInclanation:s.orbitInclanation,orbitStartPosition:s.orbitStartPosition,spinSpeed:s.spinSpeed,spinDirection:s.spinDirection}),e.next=12,h.create();case 12:i.bodies.push(h),i.scene.add(h.entity),u=S.a.mark((function e(n){var o,s,r,l,c,h,u,d,p,m,b,g,f,x,P;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=i.solarSystem.planets[n],s=o.radius*t,r=o.orbitRadius*t,l=o.orbitSpeed*t,c=i.bodies.find((function(e){return e.id===o.orbitEntityId})),h={baseSeed:o.seed,position:o.position?Object(y.a)(k.E,Object(w.a)(o.position)):c.entity.position,terrainHeight:o.terrainHeight,orbitEntity:c,orbitRadius:r,orbitDirection:o.orbitDirection,orbitSpeed:l,orbitInclanation:o.orbitInclanation,orbitStartPosition:o.orbitStartPosition,spinSpeed:o.spinSpeed,spinDirection:o.spinDirection,hasLabel:!0,onShow:i.handleShowPlanet},u=2===n?new de(o.id,o.name,a.Planet,s,h):new ce(o.id,o.name,a.Planet,s,h),e.next=9,u.create();case 9:d=Object(v.a)(o.moons),e.prev=10,d.s();case 12:if((p=d.n()).done){e.next=25;break}return m=p.value,b=m.radius*t,g=m.orbitRadius*t,f=m.orbitSpeed*t,x=u,P=new le(m.id,m.name,a.Moon,b,{baseSeed:m.seed,position:m.position?Object(y.a)(k.E,Object(w.a)(m.position)):x.entity.position,colour:m.rgb?Object(y.a)(k.g,Object(w.a)(m.rgb)):new k.g(1,1,1),terrainHeight:m.terrainHeight,orbitEntity:x,orbitRadius:g,orbitDirection:m.orbitDirection,orbitSpeed:f,orbitInclanation:m.orbitInclanation,orbitStartPosition:m.orbitStartPosition,spinSpeed:m.spinSpeed,spinDirection:o.spinDirection}),e.next=21,P.create();case 21:i.bodies.push(P),u.entity.add(P.entity);case 23:e.next=12;break;case 25:e.next=30;break;case 27:e.prev=27,e.t0=e.catch(10),d.e(e.t0);case 30:return e.prev=30,d.f(),e.finish(30);case 33:i.bodies.push(u),i.scene.add(u.entity);case 35:case"end":return e.stop()}}),e,null,[[10,27,30,33]])})),d=0;case 16:if(!(d<i.solarSystem.planets.length)){e.next=21;break}return e.delegateYield(u(d),"t0",18);case 18:d++,e.next=16;break;case 21:e.next=4;break;case 23:e.next=28;break;case 25:e.prev=25,e.t1=e.catch(2),n.e(e.t1);case 28:return e.prev=28,n.f(),e.finish(28);case 31:case"end":return e.stop()}}),e,null,[[2,25,28,31]])}))),this.renderSolarSystem=Object(x.a)(S.a.mark((function e(){var t,n,o,s,r,l,c,h,u,d,p,m,b,g,f,x,P,O,A,C,R,M,I;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=.001,n=Object(v.a)(i.solarSystem.stars),e.prev=2,n.s();case 4:if((o=n.n()).done){e.next=27;break}return s=o.value,r=s.radius*t*4,l=s.orbitRadius*t,c=s.orbitSpeed*t,h=new he(s.id,s.name,a.Star,r,{baseSeed:s.seed,position:s.position?Object(y.a)(k.E,Object(w.a)(s.position)):new k.E(0,0,0),colour:new k.g(16763424),orbitEntity:!1,orbitRadius:l,orbitDirection:s.orbitDirection,orbitSpeed:c,orbitInclanation:s.orbitInclanation,orbitStartPosition:s.orbitStartPosition,spinSpeed:s.spinSpeed,spinDirection:s.spinDirection}),e.next=12,h.create();case 12:i.bodies.push(h),i.scene.add(h.entity),u=j()(i.solarSystem.planets),d=Object(v.a)(u);try{for(d.s();!(p=d.n()).done;){m=p.value,4,m.radius*=4,b=Object(v.a)(m.moons);try{for(b.s();!(g=b.n()).done;)(f=g.value).radius*=4,f.orbitSpeed*=4}catch(D){b.e(D)}finally{b.f()}}}catch(D){d.e(D)}finally{d.f()}for(x=0;x<u.length;x++)P=u[x],O=P.moons[P.moons.length-1].orbitRadius,0===x?P.orbitRadius=2*s.radius+2*O:(A=u[x-1],C=A.moons[A.moons.length-1].orbitRadius,P.orbitRadius=A.orbitRadius+C+O,R=(i.solarSystem.planets[x].orbitRadius-i.solarSystem.planets[x-1].orbitRadius)/i.solarSystem.planets[i.solarSystem.planets.length-1].orbitRadius,P.orbitRadius+=R*P.orbitRadius*.5);M=S.a.mark((function e(n){var o,s,r,l,c,h,d,p,m,b,g,f,x,P,O;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=u[n],s=o.radius*t,r=o.orbitRadius*t,l=o.orbitSpeed*t,c=i.bodies.find((function(e){return e.id===o.orbitEntityId})),h={baseSeed:o.seed,position:o.position?Object(y.a)(k.E,Object(w.a)(o.position)):c.entity.position,terrainHeight:o.terrainHeight,orbitEntity:c,orbitRadius:r,orbitDirection:o.orbitDirection,orbitSpeed:l,orbitInclanation:o.orbitInclanation,orbitStartPosition:o.orbitStartPosition,spinSpeed:o.spinSpeed,spinDirection:o.spinDirection,hasLabel:!0,onShow:i.handleShowPlanet},d=2===n?new de(o.id,o.name,a.Planet,s,h):new ce(o.id,o.name,a.Planet,s,h),e.next=9,d.create();case 9:p=Object(v.a)(o.moons),e.prev=10,p.s();case 12:if((m=p.n()).done){e.next=25;break}return b=m.value,g=b.radius*t,f=b.orbitRadius*t,x=b.orbitSpeed*t*4,P=d,O=new le(b.id,b.name,a.Moon,g,{baseSeed:b.seed,position:b.position?Object(y.a)(k.E,Object(w.a)(b.position)):P.entity.position,colour:b.rgb?Object(y.a)(k.g,Object(w.a)(b.rgb)):new k.g(1,1,1),terrainHeight:b.terrainHeight,orbitEntity:P,orbitRadius:f,orbitDirection:b.orbitDirection,orbitSpeed:x,orbitInclanation:b.orbitInclanation,orbitStartPosition:b.orbitStartPosition,spinSpeed:b.spinSpeed,spinDirection:o.spinDirection}),e.next=21,O.create();case 21:i.bodies.push(O),d.entity.add(O.entity);case 23:e.next=12;break;case 25:e.next=30;break;case 27:e.prev=27,e.t0=e.catch(10),p.e(e.t0);case 30:return e.prev=30,p.f(),e.finish(30);case 33:i.bodies.push(d),i.scene.add(d.entity);case 35:case"end":return e.stop()}}),e,null,[[10,27,30,33]])})),I=0;case 20:if(!(I<u.length)){e.next=25;break}return e.delegateYield(M(I),"t0",22);case 22:I++,e.next=20;break;case 25:e.next=4;break;case 27:e.next=32;break;case 29:e.prev=29,e.t1=e.catch(2),n.e(e.t1);case 32:return e.prev=32,n.f(),e.finish(32);case 35:case"end":return e.stop()}}),e,null,[[2,29,32,35]])}))),this.solarSystem=new ne(this.options.seed).generate(),this.scene=new k.v,this.scene.background=(new k.g).setHex(0);var n=new k.h;this.spaceTexture=n.load(["assets/kurt/space_ft.png","assets/kurt/space_bk.png","assets/kurt/space_up.png","assets/kurt/space_dn.png","assets/kurt/space_rt.png","assets/kurt/space_lf.png"]),this.scene.background=this.spaceTexture,this.camera=new k.d,this.camera=new k.s(25,window.innerWidth/window.innerHeight,50,1e10),this.cameraInitialPosition=[0,6*this.solarSystem.stars[0].radius,20*this.solarSystem.stars[0].radius],(t=this.camera.position).set.apply(t,Object(w.a)(this.cameraInitialPosition)),this.camera.lookAt(0,0,0),this.renderer=new k.F({powerPreference:"high-performance",antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.shadowMap.enabled=!0,document.body.appendChild(this.renderer.domElement),this.orbitControls=new I.a(this.camera,this.renderer.domElement),this.orbitControls.enableDamping=!0,this.orbitControls.update(),this.stats=new D.a,document.body.appendChild(this.stats.dom),this.gui=new H.a,this.gui.width=300,this.gui.add(this.buttonHandlers,"newSeed").name("New Seed"),this.gui.add(this.options,"seed").name("Seed").onFinishChange(this.buttonHandlers.changeSeed),this.gui.add(this.options,"simulationSpeed",0,20,.1).name("Simulation Speed")}})}),document.getElementById("root"))}},[[350,1,2]]]);
//# sourceMappingURL=main.32b9d331.chunk.js.map