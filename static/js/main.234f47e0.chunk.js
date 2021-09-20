(this["webpackJsonpsolar-system"]=this["webpackJsonpsolar-system"]||[]).push([[0],{240:function(t,e,i){"use strict";i.r(e);i(70),i(71);var n,a=i(12),o=i.n(a),r=i(65),s=i.n(r),c=i(23),h=(i(76),i(14)),u=function(t){return t.show?Object(h.jsx)("div",{className:"loading-indicator",children:"Generating Solar System..."}):null},d=function(t){var e=t.solarSystemApp,i=Object(a.useState)(!0),n=Object(c.a)(i,2),o=n[0],r=n[1];Object(a.useEffect)((function(){e.init(),e.onInitialising=s,e.onInitialised=d}),[e]);var s=function(){r(!0)},d=function(){r(!1)};return Object(h.jsx)(u,{show:o})},l=i(18),p=i(6),g=i.n(p),m=i(13),b=i(7),v=i(10),f=i(0),y=i(5),w=i(1),k=i(66),x=function(){function t(e){Object(f.a)(this,t),this.noiseGenerator=void 0,this.noiseGenerator=new k.a(e)}return Object(w.a)(t,[{key:"generateNoiseMap",value:function(t,e){for(var i=[],n=0;n<t;n++){i[n]=[];for(var a=0;a<e;a++){var o=this.getMixedFrequencyNoise(n,a,[.01,.02,.04,.08,.16,.32,.64,1.28]);o=Math.pow(o,2.3),i[n][a]=o}}return this.makeSeamlessVertically(i,.2*e),this.makeSeamlessHorizontally(i,.05*t),i}},{key:"getNoise",value:function(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=i*t+n,r=i*e+a,s=1/i,c=this.noiseGenerator.noise2D(o,r)/2+.5,h=s*c;return h}},{key:"getMixedFrequencyNoise",value:function(t,e,i){var n=this,a=0;return i.reduce((function(i,o,r){a+=1/o;var s=10*r,c=100*r;return i+n.getNoise(t,e,o,s,c)}),0)/a}},{key:"makeSeamlessHorizontally",value:function(t,e){for(var i=t.length,n=t[0].length,a=0;a<e;a++)for(var o=a/e,r=0;r<n;r++){var s=~~(i-e+a);t[s][r]=y.o.lerp(t[s][r],t[~~(e-a)][r],o)}}},{key:"makeSeamlessVertically",value:function(t,e){for(var i=t.length,n=t[0].length,a=0;a<e;a++)for(var o=Math.ceil(e-a),r=0;r<i;r++){for(var s=0,c=0,h=0,u=r-o;u<r+o;u++)u<0||u>=i||(s+=t[u][a],c+=t[u][n-a-1],h++);t[r][a]=s/h,t[r][n-a-1]=c/h}}}]),t}();!function(t){t[t.Sun=0]="Sun",t[t.Planet=1]="Planet",t[t.Moon=2]="Moon"}(n||(n={}));var S=function(){function t(e,i,n,a,o){Object(f.a)(this,t),this.id=void 0,this.name=void 0,this.entityType=void 0,this.entity=void 0,this.params=void 0,this.radius=void 0,this.sphere=void 0,this.orbit=void 0,this.textureWidth=void 0,this.textureHeight=void 0,this.maxTerrainHeight=void 0,this.loader=new y.z,this.sphereGeometry=void 0,this.orbitGeometry=void 0,this.material=void 0,this.heightMapTexture=void 0,this.colourMapTexture=void 0,this.texture=void 0,this.id=e,this.name=i,this.entityType=n,this.radius=a,this.params=o,this.entity=new y.k,this.textureWidth=512,this.textureHeight=256}return Object(w.a)(t,[{key:"create",value:function(){var t=Object(v.a)(g.a.mark((function t(){var e,i,n,a,o;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(this.params.terrainHeight&&this.params.terrainHeight>0)){t.next=10;break}e=this.generateTerrainMaps(),this.heightMapTexture=new y.e(e.heightMap.canvas),this.colourMapTexture=new y.e(e.map.canvas),this.heightMapTexture.mapping=y.i,this.colourMapTexture.mapping=y.i,i=Math.ceil(this.params.terrainHeight*this.maxTerrainHeight),this.material=new y.r({bumpMap:this.heightMapTexture,bumpScale:i,map:this.colourMapTexture,displacementMap:this.heightMapTexture,displacementScale:i}),t.next=18;break;case 10:if(!this.params.texturePath){t.next=17;break}return t.next=13,this.loader.loadAsync(this.params.texturePath);case 13:this.texture=t.sent,this.material=new y.q({map:this.texture,color:this.params.colour}),t.next=18;break;case 17:this.material=new y.q({color:this.params.colour});case 18:return this.sphereGeometry=new y.w(this.radius,64,48),this.sphere=new y.p(this.sphereGeometry,this.material),this.sphere.castShadow=!!this.params.castShadow,this.sphere.receiveShadow=!!this.params.receiveShadow,this.params.orbitEntity&&(n=this.params.orbitEntity.sphere.position,a=this.params.orbitRadius||400,o=this.createOrbitCircle(a),this.entity.add(o),this.sphere.position.set(a,0,0),this.entity.position.set(n.x,n.y,n.z),this.entity.rotation.x=y.o.degToRad(this.params.orbitInclanation),this.entity.rotation.y=y.o.degToRad(360*this.params.orbitStartPosition)),this.entity.add(this.sphere),t.abrupt("return",this);case 25:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"animate",value:function(t,e){if(t.getElapsedTime(),this.params.orbitEntity){var i=this.params.orbitSpeed*e,n=this.params.orbitDirection;this.entity.rotation.y+=i*n}this.params.spinSpeed&&(this.sphere.rotation.y+=this.params.spinSpeed*e*this.params.spinDirection)}},{key:"show",value:function(){this.params.onShow&&this.params.onShow(this.id)}},{key:"dispose",value:function(){var t,e,i,n,a,o,r;null===(t=this.sphereGeometry)||void 0===t||t.dispose(),null===(e=this.orbitGeometry)||void 0===e||e.dispose(),null===(i=this.orbit)||void 0===i||i.dispose(),null===(n=this.material)||void 0===n||n.dispose(),null===(a=this.heightMapTexture)||void 0===a||a.dispose(),null===(o=this.colourMapTexture)||void 0===o||o.dispose(),null===(r=this.texture)||void 0===r||r.dispose(),this._dispose()}},{key:"generateTerrainMaps",value:function(){for(var t=this.getCanvasContext(),e=t.createImageData(this.textureWidth,this.textureHeight),i=e.data,n=this.getCanvasContext(),a=n.createImageData(this.textureWidth,this.textureHeight),o=a.data,r=[].concat(Object(b.a)(this.params.baseSeed),[99999]).reduce((function(t,e){return t+e})),s=new x(r).generateNoiseMap(this.textureWidth,this.textureHeight),c=0;c<i.length;c+=4){for(var h=c/4%this.textureWidth,u=~~(c/4/this.textureWidth),d=255*s[h][u],l=[d,d,d,255],p=0;p<l.length;p++)i[c+p]=l[p];for(var g=this.getMapColour(d,u),m=0;m<g.length;m++)o[c+m]=g[m]}return t.putImageData(e,0,0),n.putImageData(a,0,0),{heightMap:t,map:n}}},{key:"getRangeColour",value:function(t,e){return this.lerpColour(t.dark,t.light,(e-t.min)/(t.max-t.min))}},{key:"lerpColour",value:function(t,e,i){var n=this.convertToColor(t).lerp(this.convertToColor(e),i);return[].concat(Object(b.a)(n.toArray()),[255])}},{key:"convertToColor",value:function(t){return(new y.g).setRGB(t[0],t[1],t[2])}},{key:"getCanvasContext",value:function(){var t=document.createElement("canvas").getContext("2d");return t.canvas.width=this.textureWidth,t.canvas.height=this.textureHeight,t.fillStyle="#fff",t.fillRect(0,0,t.canvas.width,t.canvas.height),t}},{key:"createOrbitCircle",value:function(t){this.orbitGeometry=new y.c;var e=[];this.orbit=new y.m({color:16777215,opacity:.5,transparent:!0});for(var i=0;i<=128;i++){var n=i/128*Math.PI*2;e.push(Math.cos(n)*t,0,Math.sin(n)*t)}var a=new Float32Array(e);return this.orbitGeometry.setAttribute("position",new y.b(a,3)),new y.l(this.orbitGeometry,this.orbit)}}]),t}(),j=i(34),R=i(67),O=i(68),I=i(69),M=i.n(I),C=function(){function t(){Object(f.a)(this,t)}return Object(w.a)(t,null,[{key:"getRandom",value:function(t){return M.a.factory({seed:t})()/4294967295}},{key:"getRandomInt",value:function(e,i,n){return Math.floor(t.getRandom(n)*(i-e+1)+e)}},{key:"getRandomFloat",value:function(e,i,n){return t.getRandom(n)*(i-e)+e}},{key:"coinToss",value:function(e){return t.getRandom(e)<=.5}},{key:"getRandomPointInSphere",value:function(t,e,i,n){e||(e=0),i||(i=0),n||(n=0);var a=Math.random(),o=Math.random(),r=2*Math.PI*a,s=Math.acos(1-2*o);return[e+t*Math.sin(s)*Math.cos(r),i+t*Math.sin(s)*Math.sin(r),n+t*Math.cos(s)]}}]),t}(),D=0,P=1,L=2,T=4,H=6,F=7,A=8,E=9,V=10,N=11,G=function(){function t(){Object(f.a)(this,t),this.EntityId=0}return Object(w.a)(t,[{key:"getNextId",value:function(){return this.EntityId++,this.EntityId}},{key:"generate",value:function(t){for(var e={suns:[],planets:[]},i=[{id:this.getNextId(),name:"Sun ".concat(this.EntityId),seed:[t,0],position:[0,0,0],radius:1280,terrainHeight:0,moons:[],orbitEntityId:0,orbitRadius:0,orbitSpeed:0,orbitDirection:0,orbitInclanation:0,orbitStartPosition:0,spinSpeed:C.getRandomFloat(1e-4,3e-4,[t,0].concat([H])),spinDirection:C.coinToss([t,0].concat([V]))?1:-1}],n=0;n<i.length;n++){for(var a=i[n],o=C.getRandomInt(1,9,[t,n,F]),r=0;r<o;r++){for(var s=[t,n,r],c=a.radius/10,h=a.radius/327,u=C.getRandomInt(h,2*c,[].concat(s,[D])),d=C.getRandomInt(1,10,[].concat(s,[F])),l=[],p=0;p<d;p++){var g=[t,n,r,p],m=C.coinToss([].concat(g,[T]))?1:-1,b=C.getRandomFloat(.001,.005,[].concat(g,[H])),v=C.getRandomInt(3*u*.5,4*u,[].concat(g,[A,0])),f=0===p?v:l[p-1].orbitRadius+C.getRandomInt(.2*v,v,[].concat(g,[A,1])),y=C.getRandomInt(u/12,u/4,[].concat(g,[D])),w={id:this.getNextId(),name:"Moon ".concat(p+1),seed:g,radius:y,terrainHeight:C.getRandom([].concat(g,[P])),orbitEntityId:-1,orbitRadius:f,orbitDirection:m,orbitSpeed:(d-p)/d,orbitInclanation:C.getRandomInt(0,45,[].concat(g,[E])),orbitStartPosition:C.getRandom([].concat(g,[N])),spinSpeed:b,spinDirection:C.coinToss([].concat(g,[V]))?1:-1,rgb:_([].concat(g,[L])),moons:[]};l.push(w)}var k=C.coinToss([].concat(s,[T]))?1:-1,x=C.getRandomFloat(.002,.006,[].concat(s,[H])),S=e.planets.length>0?e.planets[e.planets.length-1]:void 0,j=l[l.length-1].orbitRadius,R=C.getRandomInt(1.5*j,3*j,[].concat(s,[A,0])),O=0===r?R:S.orbitRadius,I=0===r?0:S.moons[S.moons.length-1].orbitRadius,M=u,G={id:this.getNextId(),name:"Planet ".concat(r+1),seed:s,radius:u,terrainHeight:1,orbitEntityId:a.id,orbitRadius:O+I+j+M,orbitDirection:k,orbitSpeed:(o-r)/o,orbitInclanation:C.getRandomInt(0,15,[].concat(s,[E])),orbitStartPosition:C.getRandom([].concat(s,[N])),spinSpeed:x,spinDirection:C.coinToss([].concat(s,[V]))?1:-1,moons:l};e.planets.push(G)}e.suns.push(a)}return e}}]),t}(),_=function(t){return[C.getRandomFloat(.6,1,[].concat(Object(b.a)(t),[0])),C.getRandomFloat(.6,1,[].concat(Object(b.a)(t),[1])),C.getRandomFloat(.6,1,[].concat(Object(b.a)(t),[2]))]},W=i(2),z=i(3),B=function(t){Object(W.a)(i,t);var e=Object(z.a)(i);function i(){var t;Object(f.a)(this,i);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))).maxTerrainHeight=5,t}return Object(w.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(t,e){var i=t/64,n=this.params.colour,a=n.r,o=n.g,r=n.b,s=[Math.floor(255*a),Math.floor(255*o),Math.floor(255*r),255];return[s[0]*i,s[1]*i,s[2]*i,s[3]]}}]),i}(S),q=function(t){Object(W.a)(i,t);var e=Object(z.a)(i);function i(){var t;Object(f.a)(this,i);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))).maxTerrainHeight=t.radius/16,t.colours={oceanDark:t.getRandomColour(0),oceanLight:t.getRandomColour(1),beachDark:t.getRandomColour(2),beachLight:t.getRandomColour(3),forestDark:t.getRandomColour(4),forestLight:t.getRandomColour(5),jungleDark:t.getRandomColour(6),jungleLight:t.getRandomColour(7),savannahDark:t.getRandomColour(8),savannahLight:t.getRandomColour(9),desertDark:t.getRandomColour(10),desertLight:t.getRandomColour(11),snowDark:t.getRandomColour(12),snowLight:t.getRandomColour(13)},t}return Object(w.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(t,e){return this.getColourForHeight(t)}},{key:"getColourForHeight",value:function(t){for(var e=0,i=[{min:0,max:60,dark:this.colours.oceanDark,light:this.colours.oceanLight},{min:60,max:70,dark:this.colours.oceanLight,light:this.colours.beachLight},{min:70,max:110,dark:this.colours.forestDark,light:this.colours.forestLight},{min:110,max:120,dark:this.colours.jungleDark,light:this.colours.jungleLight},{min:120,max:140,dark:this.colours.savannahDark,light:this.colours.savannahLight},{min:120,max:150,dark:this.colours.desertDark,light:this.colours.desertLight}];e<i.length;e++){var n=i[e];if(t<n.max)return this.getRangeColour(n,t)}return this.colours.snowLight}},{key:"getRandomColour",value:function(t){var e=[].concat(Object(b.a)(this.params.baseSeed),[t]);return[255*C.getRandomFloat(.2,1,[].concat(Object(b.a)(e),[0])),255*C.getRandomFloat(.2,1,[].concat(Object(b.a)(e),[1])),255*C.getRandomFloat(.2,1,[].concat(Object(b.a)(e),[2])),255]}}]),i}(S),J=function(t){Object(W.a)(i,t);var e=Object(z.a)(i);function i(t,n,a,o,r){var s;return Object(f.a)(this,i),(s=e.call(this,t,n,a,o,r)).maxTerrainHeight=0,s.params.terrainHeight=0,s.params.texturePath="assets/sun.jpg",s}return Object(w.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(t,e){var i=this.params.colour,n=i.r,a=i.g,o=i.b,r=[Math.floor(255*n),Math.floor(255*a),Math.floor(255*o),255];return[r[0],r[1],r[2],r[3]]}}]),i}(S),Y={oceanDark:[0,24,168,255],oceanLight:[0,105,148,255],beachDark:[140,129,95,255],beachLight:[221,202,146,255],forestDark:[0,66,37,255],forestLight:[0,127,72,255],jungleDark:[48,102,79,255],jungleLight:[57,122,94,255],savannahDark:[136,155,105,255],savannahLight:[165,189,126,255],desertDark:[175,175,144,255],desertLight:[198,198,167,255],snowDark:[200,200,200,255],snowLight:[255,255,255,255]},K=function(t){Object(W.a)(i,t);var e=Object(z.a)(i);function i(){var t;Object(f.a)(this,i);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))).maxTerrainHeight=t.radius/16,t}return Object(w.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(t,e){return this.getColourForHeight(t)}},{key:"getColourForHeight",value:function(t){for(var e=0,i=[{min:0,max:60,dark:Y.oceanDark,light:Y.oceanLight},{min:60,max:70,dark:Y.oceanLight,light:Y.beachLight},{min:70,max:110,dark:Y.forestDark,light:Y.forestLight},{min:110,max:120,dark:Y.jungleDark,light:Y.jungleLight},{min:120,max:140,dark:Y.savannahDark,light:Y.savannahLight},{min:120,max:150,dark:Y.desertDark,light:Y.desertLight}];e<i.length;e++){var n=i[e];if(t<n.max)return this.getRangeColour(n,t)}return Y.snowLight}}]),i}(S);s.a.render(Object(h.jsx)(o.a.StrictMode,{children:Object(h.jsx)(d,{solarSystemApp:new function t(){var e,i=this;Object(f.a)(this,t),this.solarSystem=void 0,this.isRunning=!1,this.scene=void 0,this.camera=void 0,this.clock=new y.f,this.bodies=[],this.renderer=void 0,this.orbitControls=void 0,this.stats=void 0,this.showPlanetId=void 0,this.cameraInitialPosition=void 0,this.spaceTexture=void 0,this.gui=void 0,this.guiViewActionsFolder=void 0,this.ambientLight=void 0,this.pointLight=void 0,this.onInitialising=void 0,this.onInitialised=void 0,this.options={seed:2,simulationSpeed:3,showOrbits:!0,followPlanetName:"Sun 1"},this.buttonHandlers={resetView:function(){i.resetView()},newSeed:function(){i.options.seed=y.o.randInt(1e5,999999),i.init()},changeSeed:function(){i.init()}},this.init=function(){i.onInitialising&&i.onInitialising(),i.gui.updateDisplay(),i.clearScene(),i.solarSystem=(new G).generate(i.options.seed),i.resetView(),i._init().then((function(){i.animate(),i.onInitialised&&i.onInitialised()}))},this._init=Object(v.a)(g.a.mark((function t(){var e,a,o,r,s;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i.showPlanetId=-1,i.ambientLight=new y.a(16777215,.15),i.scene.add(i.ambientLight),i.pointLight=new y.t(16244886,1),i.pointLight.position.set(0,0,0),i.scene.add(i.pointLight),t.next=8,i.createSolarSystem();case 8:e=i.bodies.filter((function(t){return t.entityType===n.Planet})),a=i.bodies.filter((function(t){return t.entityType===n.Sun}))[0],i.guiViewActionsFolder=i.gui.addFolder("View Actions"),i.guiViewActionsFolder.open(),i.guiViewActionsFolder.add(i.options,"showOrbits").name("Show Orbits").onChange(i.toggleOrbits),i.guiViewActionsFolder.add(i.options,"followPlanetName",[a.name].concat(Object(b.a)(e.map((function(t){return t.name}))))).name("Centre of View"),i.guiViewActionsFolder.add(i.buttonHandlers,"resetView").name("Reset View"),o=Object(m.a)(e);try{for(o.s();!(r=o.n()).done;)s=r.value,i.guiViewActionsFolder.add(s,"show").name(s.name||"A Planet")}catch(c){o.e(c)}finally{o.f()}i.isRunning=!0;case 18:case"end":return t.stop()}}),t)}))),this.animate=function(){if(i.isRunning){if(requestAnimationFrame(i.animate),i.bodies.forEach((function(t){t.animate(i.clock,i.options.simulationSpeed/5)})),i.orbitControls.update(),i.stats.update(),i.showPlanetId>-1){var t=i.bodies.find((function(t){return t.id===i.showPlanetId}));if(t){var e=new y.B;t.sphere.getWorldPosition(e),i.camera.position.set(e.x+2*t.radius,e.y+2*t.radius,e.z+8*t.radius),i.camera.lookAt(e.x,e.y,e.z)}}else{var n=i.bodies.find((function(t){return t.name===i.options.followPlanetName}));if(n){var a=new y.B;n.sphere.getWorldPosition(a),i.orbitControls.target.set(a.x,a.y,a.z)}}i.renderer.render(i.scene,i.camera)}},this.clearScene=function(){var t,e;i.isRunning=!1;try{i.gui.removeFolder(i.guiViewActionsFolder),i.guiViewActionsFolder.destroy()}catch(o){}null===(t=i.ambientLight)||void 0===t||t.dispose(),null===(e=i.pointLight)||void 0===e||e.dispose();var n,a=Object(m.a)(i.bodies);try{for(a.s();!(n=a.n()).done;){n.value.dispose()}}catch(r){a.e(r)}finally{a.f()}i.bodies=[],i.scene.clear(),i.renderer.render(i.scene,i.camera)},this.resetView=function(){var t;i.showPlanetId=-1,(t=i.camera.position).set.apply(t,Object(b.a)(i.cameraInitialPosition)),i.orbitControls=new j.a(i.camera,i.renderer.domElement)},this.handleShowPlanet=function(t){i.showPlanetId=t},this.toggleOrbits=function(){var t,e=Object(m.a)(i.bodies);try{for(e.s();!(t=e.n()).done;){var n=t.value;n.orbit&&(n.orbit.opacity=0===n.orbit.opacity?.5:0)}}catch(a){e.e(a)}finally{e.f()}},this.createSolarSystem=Object(v.a)(g.a.mark((function t(){var e,a,o,r,s,c,h,u;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=.005,a=.005,o=Object(m.a)(i.solarSystem.suns),t.prev=3,o.s();case 5:if((r=o.n()).done){t.next=21;break}return s=r.value,c=new J(s.id,s.name,n.Sun,s.radius,{baseSeed:s.seed,position:s.position?Object(l.a)(y.B,Object(b.a)(s.position)):new y.B(0,0,0),colour:new y.g(16763424),orbitEntity:!1,orbitRadius:s.orbitRadius,orbitDirection:s.orbitDirection,orbitSpeed:s.orbitSpeed,orbitInclanation:s.orbitInclanation,orbitStartPosition:s.orbitStartPosition,spinSpeed:s.spinSpeed,spinDirection:s.spinDirection}),t.next=10,c.create();case 10:i.bodies.push(c),i.scene.add(c.entity),h=g.a.mark((function t(o){var r,s,c,h,u,d,p,v,f;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=i.solarSystem.planets[o],s=i.bodies.find((function(t){return t.id===r.orbitEntityId})),c={baseSeed:r.seed,position:r.position?Object(l.a)(y.B,Object(b.a)(r.position)):s.entity.position,terrainHeight:r.terrainHeight,orbitEntity:s,orbitRadius:r.orbitRadius,orbitDirection:r.orbitDirection,orbitSpeed:r.orbitSpeed*e,orbitInclanation:r.orbitInclanation,orbitStartPosition:r.orbitStartPosition,spinSpeed:r.spinSpeed,spinDirection:r.spinDirection,onShow:i.handleShowPlanet},h=2===o?new K(r.id,r.name,n.Planet,r.radius,c):new q(r.id,r.name,n.Planet,r.radius,c),t.next=6,h.create();case 6:u=Object(m.a)(r.moons),t.prev=7,u.s();case 9:if((d=u.n()).done){t.next=19;break}return p=d.value,v=h,f=new B(p.id,p.name,n.Moon,p.radius,{baseSeed:p.seed,position:p.position?Object(l.a)(y.B,Object(b.a)(p.position)):v.entity.position,colour:p.rgb?Object(l.a)(y.g,Object(b.a)(p.rgb)):new y.g(1,1,1),terrainHeight:p.terrainHeight,orbitEntity:v,orbitRadius:p.orbitRadius,orbitDirection:p.orbitDirection,orbitSpeed:p.orbitSpeed*a,orbitInclanation:p.orbitInclanation,orbitStartPosition:p.orbitStartPosition,spinSpeed:p.spinSpeed,spinDirection:r.spinDirection}),t.next=15,f.create();case 15:i.bodies.push(f),h.entity.add(f.entity);case 17:t.next=9;break;case 19:t.next=24;break;case 21:t.prev=21,t.t0=t.catch(7),u.e(t.t0);case 24:return t.prev=24,u.f(),t.finish(24);case 27:i.bodies.push(h),i.scene.add(h.entity);case 29:case"end":return t.stop()}}),t,null,[[7,21,24,27]])})),u=0;case 14:if(!(u<i.solarSystem.planets.length)){t.next=19;break}return t.delegateYield(h(u),"t0",16);case 16:u++,t.next=14;break;case 19:t.next=5;break;case 21:t.next=26;break;case 23:t.prev=23,t.t1=t.catch(3),o.e(t.t1);case 26:return t.prev=26,o.f(),t.finish(26);case 29:case"end":return t.stop()}}),t,null,[[3,23,26,29]])}))),this.solarSystem=(new G).generate(this.options.seed),this.scene=new y.v,this.scene.background=(new y.g).setHex(0);var a=new y.h;this.spaceTexture=a.load(["assets/kurt/space_ft.png","assets/kurt/space_bk.png","assets/kurt/space_up.png","assets/kurt/space_dn.png","assets/kurt/space_rt.png","assets/kurt/space_lf.png"]),this.scene.background=this.spaceTexture,this.camera=new y.d,this.camera=new y.s(25,window.innerWidth/window.innerHeight,50,1e7),this.cameraInitialPosition=[0,6*this.solarSystem.suns[0].radius,20*this.solarSystem.suns[0].radius],(e=this.camera.position).set.apply(e,Object(b.a)(this.cameraInitialPosition)),this.camera.lookAt(0,0,0),this.renderer=new y.C({powerPreference:"high-performance",antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.shadowMap.enabled=!0,document.body.appendChild(this.renderer.domElement),this.orbitControls=new j.a(this.camera,this.renderer.domElement),this.stats=new R.a,document.body.appendChild(this.stats.dom),this.gui=new O.a,this.gui.width=300,this.gui.add(this.buttonHandlers,"newSeed").name("New Seed"),this.gui.add(this.options,"seed").name("Seed").onFinishChange(this.buttonHandlers.changeSeed),this.gui.add(this.options,"simulationSpeed",0,20,.1).name("Simulation Speed")}})}),document.getElementById("root"))},71:function(t,e,i){},76:function(t,e,i){}},[[240,1,2]]]);
//# sourceMappingURL=main.234f47e0.chunk.js.map