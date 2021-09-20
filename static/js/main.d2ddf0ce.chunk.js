(this["webpackJsonpsolar-system"]=this["webpackJsonpsolar-system"]||[]).push([[0],{241:function(e,t,a){"use strict";a.r(t);a(70),a(71);var i,n=a(13),o=a.n(n),r=a(65),s=a.n(r),h=a(18),c=(a(76),a(7)),u=function(e){return e.show?Object(c.jsx)("div",{className:"loading-indicator",children:"Generating Solar System..."}):null},l=(a(78),function(e){var t=e.planet;if(!t)return null;var a=[["Name",t.name],["Moons",t.moons.length],["Orbital Inclanation","".concat(t.orbitInclanation,"\xb0")]];return Object(c.jsxs)("div",{className:"planet-datasheet",children:[Object(c.jsx)("h2",{children:"Planet Info"}),Object(c.jsx)("ul",{className:"planet-datasheet__property-list",children:a.map((function(e){return Object(c.jsxs)("li",{className:"planet-datasheet__property",children:[Object(c.jsx)("strong",{children:e[0]}),Object(c.jsx)("p",{children:e[1]})]},e[0])}))})]})}),d=function(e){var t=e.solarSystemApp,a=Object(n.useState)(!0),i=Object(h.a)(a,2),o=i[0],r=i[1],s=Object(n.useState)(void 0),d=Object(h.a)(s,2),p=d[0],m=d[1];Object(n.useEffect)((function(){t.init(),t.onInitialising=g,t.onInitialised=b,t.onSelectPlanet=y}),[t]);var g=function(){r(!0)},b=function(){r(!1)},y=function(e){m(e)};return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(u,{show:o}),Object(c.jsx)(l,{planet:p})]})},p=a(19),m=a(14),g=a(6),b=a.n(g),y=a(8),v=a(11),f=a(0),w=a(5),S=a(1),x=a(66),k=function(){function e(t){Object(f.a)(this,e),this.noiseGenerator=void 0,this.noiseGenerator=new x.a(t)}return Object(S.a)(e,[{key:"generateNoiseMap",value:function(e,t){for(var a=[],i=0;i<e;i++){a[i]=[];for(var n=0;n<t;n++){var o=this.getMixedFrequencyNoise(i,n,[.01,.02,.04,.08,.16,.32,.64,1.28]);o=Math.pow(o,2.3),a[i][n]=o}}return this.makeSeamlessVertically(a,.2*t),this.makeSeamlessHorizontally(a,.05*e),a}},{key:"getNoise",value:function(e,t,a){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=a*e+i,r=a*t+n,s=1/a,h=this.noiseGenerator.noise2D(o,r)/2+.5,c=s*h;return c}},{key:"getMixedFrequencyNoise",value:function(e,t,a){var i=this,n=0;return a.reduce((function(a,o,r){n+=1/o;var s=10*r,h=100*r;return a+i.getNoise(e,t,o,s,h)}),0)/n}},{key:"makeSeamlessHorizontally",value:function(e,t){for(var a=e.length,i=e[0].length,n=0;n<t;n++)for(var o=n/t,r=0;r<i;r++){var s=~~(a-t+n);e[s][r]=w.o.lerp(e[s][r],e[~~(t-n)][r],o)}}},{key:"makeSeamlessVertically",value:function(e,t){for(var a=e.length,i=e[0].length,n=0;n<t;n++)for(var o=Math.ceil(t-n),r=0;r<a;r++){for(var s=0,h=0,c=0,u=r-o;u<r+o;u++)u<0||u>=a||(s+=e[u][n],h+=e[u][i-n-1],c++);e[r][n]=s/c,e[r][i-n-1]=h/c}}}]),e}();!function(e){e[e.Star=0]="Star",e[e.Planet=1]="Planet",e[e.Moon=2]="Moon"}(i||(i={}));var A=function(){function e(t,a,i,n,o){Object(f.a)(this,e),this.id=void 0,this.name=void 0,this.entityType=void 0,this.entity=void 0,this.params=void 0,this.radius=void 0,this.sphere=void 0,this.orbit=void 0,this.textureWidth=void 0,this.textureHeight=void 0,this.maxTerrainHeight=void 0,this.loader=new w.z,this.sphereGeometry=void 0,this.orbitGeometry=void 0,this.material=void 0,this.heightMapTexture=void 0,this.colourMapTexture=void 0,this.texture=void 0,this.id=t,this.name=a,this.entityType=i,this.radius=n,this.params=o,this.entity=new w.k,this.textureWidth=512,this.textureHeight=256}return Object(S.a)(e,[{key:"create",value:function(){var e=Object(v.a)(b.a.mark((function e(){var t,a,i,n,o;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(this.params.terrainHeight&&this.params.terrainHeight>0)){e.next=10;break}t=this.generateTerrainMaps(),this.heightMapTexture=new w.e(t.heightMap.canvas),this.colourMapTexture=new w.e(t.map.canvas),this.heightMapTexture.mapping=w.i,this.colourMapTexture.mapping=w.i,a=Math.ceil(this.params.terrainHeight*this.maxTerrainHeight),this.material=new w.r({bumpMap:this.heightMapTexture,bumpScale:a,map:this.colourMapTexture,displacementMap:this.heightMapTexture,displacementScale:a}),e.next=18;break;case 10:if(!this.params.texturePath){e.next=17;break}return e.next=13,this.loader.loadAsync(this.params.texturePath);case 13:this.texture=e.sent,this.material=new w.q({map:this.texture,color:this.params.colour}),e.next=18;break;case 17:this.material=new w.q({color:this.params.colour});case 18:return this.sphereGeometry=new w.w(this.radius,64,48),this.sphere=new w.p(this.sphereGeometry,this.material),this.sphere.castShadow=!!this.params.castShadow,this.sphere.receiveShadow=!!this.params.receiveShadow,this.params.orbitEntity&&(i=this.params.orbitEntity.sphere.position,n=this.params.orbitRadius||400,o=this.createOrbitCircle(n),this.entity.add(o),this.sphere.position.set(n,0,0),this.entity.position.set(i.x,i.y,i.z),this.entity.rotation.x=w.o.degToRad(this.params.orbitInclanation),this.entity.rotation.y=w.o.degToRad(360*this.params.orbitStartPosition)),this.entity.add(this.sphere),e.abrupt("return",this);case 25:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"animate",value:function(e,t){if(e.getElapsedTime(),this.params.orbitEntity){var a=this.params.orbitSpeed*t,i=this.params.orbitDirection;this.entity.rotation.y+=a*i}this.params.spinSpeed&&(this.sphere.rotation.y+=this.params.spinSpeed*t*this.params.spinDirection)}},{key:"show",value:function(){this.params.onShow&&this.params.onShow(this.id)}},{key:"dispose",value:function(){var e,t,a,i,n,o,r;null===(e=this.sphereGeometry)||void 0===e||e.dispose(),null===(t=this.orbitGeometry)||void 0===t||t.dispose(),null===(a=this.orbit)||void 0===a||a.dispose(),null===(i=this.material)||void 0===i||i.dispose(),null===(n=this.heightMapTexture)||void 0===n||n.dispose(),null===(o=this.colourMapTexture)||void 0===o||o.dispose(),null===(r=this.texture)||void 0===r||r.dispose(),this._dispose()}},{key:"generateTerrainMaps",value:function(){for(var e=this.getCanvasContext(),t=e.createImageData(this.textureWidth,this.textureHeight),a=t.data,i=this.getCanvasContext(),n=i.createImageData(this.textureWidth,this.textureHeight),o=n.data,r=[].concat(Object(y.a)(this.params.baseSeed),[99999]).reduce((function(e,t){return e+t})),s=new k(r).generateNoiseMap(this.textureWidth,this.textureHeight),h=0;h<a.length;h+=4){for(var c=h/4%this.textureWidth,u=~~(h/4/this.textureWidth),l=255*s[c][u],d=[l,l,l,255],p=0;p<d.length;p++)a[h+p]=d[p];for(var m=this.getMapColour(l,u),g=0;g<m.length;g++)o[h+g]=m[g]}return e.putImageData(t,0,0),i.putImageData(n,0,0),{heightMap:e,map:i}}},{key:"getRangeColour",value:function(e,t){return this.lerpColour(e.dark,e.light,(t-e.min)/(e.max-e.min))}},{key:"lerpColour",value:function(e,t,a){var i=this.convertToColor(e).lerp(this.convertToColor(t),a);return[].concat(Object(y.a)(i.toArray()),[255])}},{key:"convertToColor",value:function(e){return(new w.g).setRGB(e[0],e[1],e[2])}},{key:"getCanvasContext",value:function(){var e=document.createElement("canvas").getContext("2d");return e.canvas.width=this.textureWidth,e.canvas.height=this.textureHeight,e.fillStyle="#fff",e.fillRect(0,0,e.canvas.width,e.canvas.height),e}},{key:"createOrbitCircle",value:function(e){this.orbitGeometry=new w.c;var t=[];this.orbit=new w.m({color:16777215,opacity:.5,transparent:!0});for(var a=0;a<=128;a++){var i=a/128*Math.PI*2;t.push(Math.cos(i)*e,0,Math.sin(i)*e)}var n=new Float32Array(t);return this.orbitGeometry.setAttribute("position",new w.b(n,3)),new w.l(this.orbitGeometry,this.orbit)}}]),e}(),P=a(34),C=a(67),O=a(68),j=["Acanthis","Achelous","Acheron","Achilles","Achilles","Achlys","Actaeon","Admetus","Adoni","Aeacus","A\xebdon","Ae\xebtes","Aegisthus","Aegyptus","Aella","Aello","Aeneas","Aeolus","Aeternae","Aethon","Agamemnon","Aglaia","Agreus","Agriopas","Agrius","Ajax","Alcestis","Alcyone","Alcyoneus","Alecto","Alectryon","Alkyonides","Almops","Aloadae","Althaea","Amazon","Amazons","Ampelos","Amphion","Amphisbaena","Amphithemis","Amphitrite","Amphitryon","Amycus","Anchises","Andromache","Andromeda","Anteros","Antigone","Antino\xfcs","Antiphates","Aphrodit","Aphrodite","Apollo","Aquilo","Arachne","Arae","Ares","Arges","Argo","Argos","Argus","Argus","Ariadne","Arion","Arion","Artemi","Artemis","Asbolus","Ascalaphus","Asclepiu","Asclepius","Astarte","Asterius","Astraea","Atalanta","Atalanta","Athen","Athena","Athos","Atlas","Atreus","Atropos","Aurora","Auster","Autonous","Avernus","Bacchus","Balius","Bellerophon","Bellona","Bienor","Boreas","Briareus","Cadmus","Calliope","Calypso","Carduelis","Cassandra","Castor","Catoblepas","Celaeno","Centaur","Centauride","Centauromachy","Centaurs","Centaurus","Cephalus","Cepheus","Ceramici","Cerastes","Cerberus","Cercopes","Ceres","Cetus","Ceuthonymus","Ceyx","Chaos","Charon","Charybdis","Chimera","Chiron","Chiron","Chryseis","Chthonius","Circe","Clio","Clotho","Clytemnestra","Cornix","Coronis","Corvus","Crocotta","Crommyon","Cronu","Cronus","Cyclopes","Cycnus","Cyllarus","Cyprus","Daedalus","Daemons","Damarchus","Damysus","Danae","Dana\xefdes","Dana\xfcs","Daphne","Demete","Dictys","Dido","Diomedes","Dione","Dionysu","Dionysus","Dioscuri","Dryad","Dryads","Echion","Echo","Eidolon","Elatus","Electra","Empousa","Empusa","Enceladus","Endymion","Enyo","Eo","Eos","Erato","Erebus","Eridanos","Erigone","Erinyes","Eris","Ero","Eros","Eteocles","Euphrosyne","Europa","Eurus","Euryale","Eurydice","Eurynomos","Eurystheus","Eurytion","Eurytus","Euterpe","Fates","Fauns","Faunus","Favonius","Flora","Fortuna","Furie","Furies","Gadflies","Gaea","Gaia","Galatea","Ganymede","Gegenees","Gello","Gerana","Geryon","giant","Giantess","Gigantes","Golden Fleece","Gorgons","Graces","Graeae","Graeae","Griffin","Hade","Hades","Hades","halcyons","Hamadryads","Harpies","Heb","Hecate","Hecate","Hecatonchires","Hector","Hecuba","Helen","Helio","Helios","Helle","Hellhound","Hephaestu","Hephaestus","Hera","Hera","Heracles","Hercules","Herme","Hero","heroes","Hesperus","Hesti","Hestia","Hieracosphinx","Hippalectryon","Hippocampus","Hippodamia","Hippolyte","Hippolytus","Hippomenes","Hoopoe","Hyacinthus","Hydra","Hylaeus","Hylonome","Hyperion","Hypno","Hypnos","Iapetus","Icarus","Ichthyocentaurs","Io","Iobates","Ionia","Iphigenia","Ipotane","Iris","Ismene","Ixion","Janus","Jocasta","Juno","Jupiter","Juventas","Keres","Kobaloi","Labour","Ladon","Laelaps","Laestrygonians","Laius","Lamia","Lamiai","Lamos","Laoco\xf6n","Lapiths","Lares","Lark","Latona","Lavinia","Leda","Lerna","Lernaean Hydra","Let","Lethe","Leto","Lycaon","Lykaia","Maera","Maia","Manes","Manticore","Marsyas","Medea","Medea","Medusa","Megaera","Meleager","Melpomene","Memnon","Menelaus","Menoetes","Menoetius","Mentor","Merope","Midas","Mimas","Minerva","Minos","Minotaur","Mnemosyne","Momus","Monocerata","Mormo","Mormolykeia","Morpheus","Mors","Muse","Muses","Myrmekes","Mysia","Naiads","Napaeae","Narcissus","Nemea","Nemesis","Neoptolemus","nereid","Nessus","Nestor","Nestor","Nike","Niobe","Nomios","Notus","Ny","Nyctimene","Nyctimus","Nymphs","Nyx","Oceanids","Oceanu","Oceanus","Ocypete","Odontotyrannos","Odysseu","Odysseus","Oedipus","Oenoe","Oenone","Onocentaur","Ophiotaurus","Ops","Orestes","Orion","Orpheus","Orthrus","Ouroboros","Pa","Pallas","Pan","Pan","Pandora","Panes","panthers","Parcae","Paris","Parrhasia","Pasipha\xeb","Patroclus","Pegasus","Pegasus","Pelias","Pelops","Penates","Penelope","Periboea","Perimedes","Persephon","Persephone ","Perseus","Phaedra","Phaethon","Phaethon","Philoctetes","Philomela","Phineus","Phlegethon","Phoenix","Ph\xf3los","Pirithous","Pleiades","Plut","Pollux","Polybotes","Polyhymnia","Polymnia","Polynices","Polyphemus","Polyphemus","Polyxena","Pontus","Porphyrion","Poseido","Poseidon","Priam","Priapus","Procne","Procrustes","Prometheus","Proserpine","Proteus","Psyche","Pygmalion","Pyramus","Python","Quirinus","Rhadamanthus","Rhaecus","Rhe","Rhea","Romulus","Sarpedon","Saturn","Satyresses","Satyrs","Scylla","Selene","Semele","Sileni","Silenus","Silvanus","Siren","Sirens","Sisyphus","Sol","Somnus","Sphinx","Sterop","Stheno","Strix","Styx","Symplegades","Syrinx","Talos","Tantalus","Taras","Taraxippi","Tartarus","Telemachus","Tellus","Tereus","Terminus","Terpsichore","Thalia","Thanato","Thanatos","Thaumas","Themis","Theseus","Thisbe","Thoon","Thrace","Thyestes","Tiresias","Tisiphone","Titans","Tithonus","Tityos","Triton","Trojan","Turnus","Typhon","Ulysses","Urania","Uranus","Venus","Vesta","Virgil","Vulcan","Xanthus","Zephyrus","Zeu","Zeus"],M=a(69),H=a.n(M),R=function(){function e(){Object(f.a)(this,e)}return Object(S.a)(e,null,[{key:"getRandom",value:function(e){return H.a.factory({seed:e})()/4294967295}},{key:"getRandomInt",value:function(t,a,i){return Math.floor(e.getRandom(i)*(a-t+1)+t)}},{key:"getRandomFloat",value:function(t,a,i){return e.getRandom(i)*(a-t)+t}},{key:"coinToss",value:function(t){return e.getRandom(t)<=.5}},{key:"getRandomFromArray",value:function(e,t){return e[this.getRandomInt(0,e.length-1,t)]}},{key:"getRandomPointInSphere",value:function(e,t,a,i){t||(t=0),a||(a=0),i||(i=0);var n=Math.random(),o=Math.random(),r=2*Math.PI*n,s=Math.acos(1-2*o);return[t+e*Math.sin(s)*Math.cos(r),a+e*Math.sin(s)*Math.sin(r),i+e*Math.cos(s)]}}]),e}(),I=0,D=1,T=2,L=4,E=6,F=7,N=8,G=9,V=10,_=11,B=12,W=function(){function e(){Object(f.a)(this,e),this.EntityId=0}return Object(S.a)(e,[{key:"getNextId",value:function(){return this.EntityId++,this.EntityId}},{key:"generate",value:function(e){for(var t={stars:[],planets:[]},a=[{id:this.getNextId(),name:"Star ".concat(this.EntityId),seed:[e,0],position:[0,0,0],radius:1280,terrainHeight:0,moons:[],orbitEntityId:0,orbitRadius:0,orbitSpeed:0,orbitDirection:0,orbitInclanation:0,orbitStartPosition:0,spinSpeed:R.getRandomFloat(1e-4,3e-4,[e,0].concat([E])),spinDirection:R.coinToss([e,0].concat([V]))?1:-1}],i=0;i<a.length;i++){for(var n=a[i],o=R.getRandomInt(1,9,[e,i,F]),r=0;r<o;r++){for(var s=[e,i,r],h=n.radius/10,c=n.radius/327,u=R.getRandomInt(c,2*h,[].concat(s,[I])),l=R.getRandomInt(1,10,[].concat(s,[F])),d=[],p=0;p<l;p++){var m=[e,i,r,p],g=R.coinToss([].concat(m,[L]))?1:-1,b=R.getRandomFloat(.001,.005,[].concat(m,[E])),y=R.getRandomInt(3*u*.5,4*u,[].concat(m,[N,0])),v=0===p?y:d[p-1].orbitRadius+R.getRandomInt(.2*y,y,[].concat(m,[N,1])),f=R.getRandomInt(u/12,u/4,[].concat(m,[I])),w={id:this.getNextId(),name:"Moon ".concat(p+1),seed:m,radius:f,terrainHeight:R.getRandom([].concat(m,[D])),orbitEntityId:-1,orbitRadius:v,orbitDirection:g,orbitSpeed:(l-p)/l,orbitInclanation:R.getRandomInt(0,45,[].concat(m,[G])),orbitStartPosition:R.getRandom([].concat(m,[_])),spinSpeed:b,spinDirection:R.coinToss([].concat(m,[V]))?1:-1,rgb:z([].concat(m,[T])),moons:[]};d.push(w)}var S=R.coinToss([].concat(s,[L]))?1:-1,x=R.getRandomFloat(.002,.006,[].concat(s,[E])),k=t.planets.length>0?t.planets[t.planets.length-1]:void 0,A=d[d.length-1].orbitRadius,P=R.getRandomInt(1.5*A,3*A,[].concat(s,[N,0])),C=0===r?P:k.orbitRadius,O=0===r?0:k.moons[k.moons.length-1].orbitRadius,M=u,H=R.getRandomFromArray(j,[].concat(s,[B])),W={id:this.getNextId(),name:H,seed:s,radius:u,terrainHeight:1,orbitEntityId:n.id,orbitRadius:C+O+A+M,orbitDirection:S,orbitSpeed:(o-r)/o,orbitInclanation:R.getRandomInt(0,15,[].concat(s,[G])),orbitStartPosition:R.getRandom([].concat(s,[_])),spinSpeed:x,spinDirection:R.coinToss([].concat(s,[V]))?1:-1,moons:d};t.planets.push(W)}t.stars.push(n)}return t}}]),e}(),z=function(e){return[R.getRandomFloat(.6,1,[].concat(Object(y.a)(e),[0])),R.getRandomFloat(.6,1,[].concat(Object(y.a)(e),[1])),R.getRandomFloat(.6,1,[].concat(Object(y.a)(e),[2]))]},J=a(2),q=a(3),U=function(e){Object(J.a)(a,e);var t=Object(q.a)(a);function a(){var e;Object(f.a)(this,a);for(var i=arguments.length,n=new Array(i),o=0;o<i;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))).maxTerrainHeight=5,e}return Object(S.a)(a,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(e,t){var a=e/64,i=this.params.colour,n=i.r,o=i.g,r=i.b,s=[Math.floor(255*n),Math.floor(255*o),Math.floor(255*r),255];return[s[0]*a,s[1]*a,s[2]*a,s[3]]}}]),a}(A),Z=function(e){Object(J.a)(a,e);var t=Object(q.a)(a);function a(){var e;Object(f.a)(this,a);for(var i=arguments.length,n=new Array(i),o=0;o<i;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))).maxTerrainHeight=e.radius/16,e.colours={oceanDark:e.getRandomColour(0),oceanLight:e.getRandomColour(1),beachDark:e.getRandomColour(2),beachLight:e.getRandomColour(3),forestDark:e.getRandomColour(4),forestLight:e.getRandomColour(5),jungleDark:e.getRandomColour(6),jungleLight:e.getRandomColour(7),savannahDark:e.getRandomColour(8),savannahLight:e.getRandomColour(9),desertDark:e.getRandomColour(10),desertLight:e.getRandomColour(11),snowDark:e.getRandomColour(12),snowLight:e.getRandomColour(13)},e}return Object(S.a)(a,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(e,t){return this.getColourForHeight(e)}},{key:"getColourForHeight",value:function(e){for(var t=0,a=[{min:0,max:60,dark:this.colours.oceanDark,light:this.colours.oceanLight},{min:60,max:70,dark:this.colours.oceanLight,light:this.colours.beachLight},{min:70,max:110,dark:this.colours.forestDark,light:this.colours.forestLight},{min:110,max:120,dark:this.colours.jungleDark,light:this.colours.jungleLight},{min:120,max:140,dark:this.colours.savannahDark,light:this.colours.savannahLight},{min:120,max:150,dark:this.colours.desertDark,light:this.colours.desertLight}];t<a.length;t++){var i=a[t];if(e<i.max)return this.getRangeColour(i,e)}return this.colours.snowLight}},{key:"getRandomColour",value:function(e){var t=[].concat(Object(y.a)(this.params.baseSeed),[e]);return[255*R.getRandomFloat(.2,1,[].concat(Object(y.a)(t),[0])),255*R.getRandomFloat(.2,1,[].concat(Object(y.a)(t),[1])),255*R.getRandomFloat(.2,1,[].concat(Object(y.a)(t),[2])),255]}}]),a}(A),K=function(e){Object(J.a)(a,e);var t=Object(q.a)(a);function a(e,i,n,o,r){var s;return Object(f.a)(this,a),(s=t.call(this,e,i,n,o,r)).maxTerrainHeight=0,s.params.terrainHeight=0,s.params.texturePath="assets/sun.jpg",s}return Object(S.a)(a,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(e,t){var a=this.params.colour,i=a.r,n=a.g,o=a.b,r=[Math.floor(255*i),Math.floor(255*n),Math.floor(255*o),255];return[r[0],r[1],r[2],r[3]]}}]),a}(A),Q={oceanDark:[0,24,168,255],oceanLight:[0,105,148,255],beachDark:[140,129,95,255],beachLight:[221,202,146,255],forestDark:[0,66,37,255],forestLight:[0,127,72,255],jungleDark:[48,102,79,255],jungleLight:[57,122,94,255],savannahDark:[136,155,105,255],savannahLight:[165,189,126,255],desertDark:[175,175,144,255],desertLight:[198,198,167,255],snowDark:[200,200,200,255],snowLight:[255,255,255,255]},X=function(e){Object(J.a)(a,e);var t=Object(q.a)(a);function a(){var e;Object(f.a)(this,a);for(var i=arguments.length,n=new Array(i),o=0;o<i;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))).maxTerrainHeight=e.radius/16,e}return Object(S.a)(a,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(e,t){return this.getColourForHeight(e)}},{key:"getColourForHeight",value:function(e){for(var t=0,a=[{min:0,max:60,dark:Q.oceanDark,light:Q.oceanLight},{min:60,max:70,dark:Q.oceanLight,light:Q.beachLight},{min:70,max:110,dark:Q.forestDark,light:Q.forestLight},{min:110,max:120,dark:Q.jungleDark,light:Q.jungleLight},{min:120,max:140,dark:Q.savannahDark,light:Q.savannahLight},{min:120,max:150,dark:Q.desertDark,light:Q.desertLight}];t<a.length;t++){var i=a[t];if(e<i.max)return this.getRangeColour(i,e)}return Q.snowLight}}]),a}(A);s.a.render(Object(c.jsx)(o.a.StrictMode,{children:Object(c.jsx)(d,{solarSystemApp:new function e(){var t,a=this;Object(f.a)(this,e),this.solarSystem=void 0,this.isRunning=!1,this.scene=void 0,this.camera=void 0,this.clock=new w.f,this.bodies=[],this.renderer=void 0,this.orbitControls=void 0,this.stats=void 0,this.showPlanetId=void 0,this.cameraInitialPosition=void 0,this.spaceTexture=void 0,this.gui=void 0,this.guiViewActionsFolder=void 0,this.guiPlanetsFolder=void 0,this.ambientLight=void 0,this.pointLight=void 0,this.onInitialising=void 0,this.onInitialised=void 0,this.onSelectPlanet=void 0,this.options={seed:2,simulationSpeed:3,showOrbits:!0,followPlanetName:"Star 1"},this.buttonHandlers={resetView:function(){a.resetView()},newSeed:function(){a.options.seed=w.o.randInt(1e5,999999),a.init()},changeSeed:function(){a.init()}},this.init=function(){a.onInitialising&&a.onInitialising(),a.gui.updateDisplay(),a.clearScene(),a.solarSystem=(new W).generate(a.options.seed),a.resetView(),a._init().then((function(){a.animate(),a.onInitialised&&a.onInitialised()}))},this._init=Object(v.a)(b.a.mark((function e(){var t,n,o,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.showPlanetId=-1,a.ambientLight=new w.a(16777215,.15),a.scene.add(a.ambientLight),a.pointLight=new w.t(16244886,1),a.pointLight.position.set(0,0,0),a.scene.add(a.pointLight),e.next=8,a.createSolarSystem();case 8:for(t=a.bodies.filter((function(e){return e.entityType===i.Planet})),n=a.bodies.filter((function(e){return e.entityType===i.Star}))[0],a.guiViewActionsFolder=a.gui.addFolder("View Actions"),a.guiViewActionsFolder.open(),a.guiViewActionsFolder.add(a.options,"showOrbits").name("Show Orbits").onChange(a.toggleOrbits),a.guiViewActionsFolder.add(a.options,"followPlanetName",[n.name].concat(Object(y.a)(t.map((function(e){return e.name}))))).name("Centre of View"),a.guiViewActionsFolder.add(a.buttonHandlers,"resetView").name("Reset View"),a.guiPlanetsFolder=a.gui.addFolder("Planets"),o=0;o<t.length;o++)r=t[o],a.guiPlanetsFolder.add(r,"show").name("#".concat(o+1,": ").concat(r.name));a.isRunning=!0;case 18:case"end":return e.stop()}}),e)}))),this.animate=function(){if(a.isRunning){if(requestAnimationFrame(a.animate),a.bodies.forEach((function(e){e.animate(a.clock,a.options.simulationSpeed/5)})),a.orbitControls.update(),a.stats.update(),a.showPlanetId>-1){var e=a.bodies.find((function(e){return e.id===a.showPlanetId}));if(e){var t=new w.B;e.sphere.getWorldPosition(t),a.camera.position.set(t.x+2*e.radius,t.y+2*e.radius,t.z+8*e.radius),a.camera.lookAt(t.x,t.y,t.z)}}else{var i=a.bodies.find((function(e){return e.name===a.options.followPlanetName}));if(i){var n=new w.B;i.sphere.getWorldPosition(n),a.orbitControls.target.set(n.x,n.y,n.z)}}a.renderer.render(a.scene,a.camera)}},this.clearScene=function(){var e,t;a.isRunning=!1;try{a.gui.removeFolder(a.guiViewActionsFolder),a.gui.removeFolder(a.guiPlanetsFolder),a.guiViewActionsFolder.destroy()}catch(o){}null===(e=a.ambientLight)||void 0===e||e.dispose(),null===(t=a.pointLight)||void 0===t||t.dispose();var i,n=Object(m.a)(a.bodies);try{for(n.s();!(i=n.n()).done;){i.value.dispose()}}catch(r){n.e(r)}finally{n.f()}a.bodies=[],a.scene.clear(),a.renderer.render(a.scene,a.camera)},this.resetView=function(){var e;a.showPlanetId=-1,(e=a.camera.position).set.apply(e,Object(y.a)(a.cameraInitialPosition)),a.orbitControls=new P.a(a.camera,a.renderer.domElement),a.onSelectPlanet&&a.onSelectPlanet(void 0)},this.handleShowPlanet=function(e){if(a.showPlanetId=e,a.onSelectPlanet){var t=a.solarSystem.planets.find((function(t){return t.id===e}));a.onSelectPlanet(t)}},this.toggleOrbits=function(){var e,t=Object(m.a)(a.bodies);try{for(t.s();!(e=t.n()).done;){var i=e.value;i.orbit&&(i.orbit.opacity=0===i.orbit.opacity?.5:0)}}catch(n){t.e(n)}finally{t.f()}},this.createSolarSystem=Object(v.a)(b.a.mark((function e(){var t,n,o,r,s,h,c,u;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=.005,n=.005,o=Object(m.a)(a.solarSystem.stars),e.prev=3,o.s();case 5:if((r=o.n()).done){e.next=21;break}return s=r.value,h=new K(s.id,s.name,i.Star,s.radius,{baseSeed:s.seed,position:s.position?Object(p.a)(w.B,Object(y.a)(s.position)):new w.B(0,0,0),colour:new w.g(16763424),orbitEntity:!1,orbitRadius:s.orbitRadius,orbitDirection:s.orbitDirection,orbitSpeed:s.orbitSpeed,orbitInclanation:s.orbitInclanation,orbitStartPosition:s.orbitStartPosition,spinSpeed:s.spinSpeed,spinDirection:s.spinDirection}),e.next=10,h.create();case 10:a.bodies.push(h),a.scene.add(h.entity),c=b.a.mark((function e(o){var r,s,h,c,u,l,d,g,v;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.solarSystem.planets[o],s=a.bodies.find((function(e){return e.id===r.orbitEntityId})),h={baseSeed:r.seed,position:r.position?Object(p.a)(w.B,Object(y.a)(r.position)):s.entity.position,terrainHeight:r.terrainHeight,orbitEntity:s,orbitRadius:r.orbitRadius,orbitDirection:r.orbitDirection,orbitSpeed:r.orbitSpeed*t,orbitInclanation:r.orbitInclanation,orbitStartPosition:r.orbitStartPosition,spinSpeed:r.spinSpeed,spinDirection:r.spinDirection,onShow:a.handleShowPlanet},c=2===o?new X(r.id,r.name,i.Planet,r.radius,h):new Z(r.id,r.name,i.Planet,r.radius,h),e.next=6,c.create();case 6:u=Object(m.a)(r.moons),e.prev=7,u.s();case 9:if((l=u.n()).done){e.next=19;break}return d=l.value,g=c,v=new U(d.id,d.name,i.Moon,d.radius,{baseSeed:d.seed,position:d.position?Object(p.a)(w.B,Object(y.a)(d.position)):g.entity.position,colour:d.rgb?Object(p.a)(w.g,Object(y.a)(d.rgb)):new w.g(1,1,1),terrainHeight:d.terrainHeight,orbitEntity:g,orbitRadius:d.orbitRadius,orbitDirection:d.orbitDirection,orbitSpeed:d.orbitSpeed*n,orbitInclanation:d.orbitInclanation,orbitStartPosition:d.orbitStartPosition,spinSpeed:d.spinSpeed,spinDirection:r.spinDirection}),e.next=15,v.create();case 15:a.bodies.push(v),c.entity.add(v.entity);case 17:e.next=9;break;case 19:e.next=24;break;case 21:e.prev=21,e.t0=e.catch(7),u.e(e.t0);case 24:return e.prev=24,u.f(),e.finish(24);case 27:a.bodies.push(c),a.scene.add(c.entity);case 29:case"end":return e.stop()}}),e,null,[[7,21,24,27]])})),u=0;case 14:if(!(u<a.solarSystem.planets.length)){e.next=19;break}return e.delegateYield(c(u),"t0",16);case 16:u++,e.next=14;break;case 19:e.next=5;break;case 21:e.next=26;break;case 23:e.prev=23,e.t1=e.catch(3),o.e(e.t1);case 26:return e.prev=26,o.f(),e.finish(26);case 29:case"end":return e.stop()}}),e,null,[[3,23,26,29]])}))),this.solarSystem=(new W).generate(this.options.seed),this.scene=new w.v,this.scene.background=(new w.g).setHex(0);var n=new w.h;this.spaceTexture=n.load(["assets/kurt/space_ft.png","assets/kurt/space_bk.png","assets/kurt/space_up.png","assets/kurt/space_dn.png","assets/kurt/space_rt.png","assets/kurt/space_lf.png"]),this.scene.background=this.spaceTexture,this.camera=new w.d,this.camera=new w.s(25,window.innerWidth/window.innerHeight,50,1e7),this.cameraInitialPosition=[0,6*this.solarSystem.stars[0].radius,20*this.solarSystem.stars[0].radius],(t=this.camera.position).set.apply(t,Object(y.a)(this.cameraInitialPosition)),this.camera.lookAt(0,0,0),this.renderer=new w.C({powerPreference:"high-performance",antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.shadowMap.enabled=!0,document.body.appendChild(this.renderer.domElement),this.orbitControls=new P.a(this.camera,this.renderer.domElement),this.orbitControls.enableDamping=!0,this.stats=new C.a,document.body.appendChild(this.stats.dom),this.gui=new O.a,this.gui.width=300,this.gui.add(this.buttonHandlers,"newSeed").name("New Seed"),this.gui.add(this.options,"seed").name("Seed").onFinishChange(this.buttonHandlers.changeSeed),this.gui.add(this.options,"simulationSpeed",0,20,.1).name("Simulation Speed")}})}),document.getElementById("root"))},71:function(e,t,a){},76:function(e,t,a){},78:function(e,t,a){}},[[241,1,2]]]);
//# sourceMappingURL=main.d2ddf0ce.chunk.js.map