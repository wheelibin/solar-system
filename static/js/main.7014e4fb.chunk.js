(this.webpackJsonptrees=this.webpackJsonptrees||[]).push([[0],{228:function(t,e,i){"use strict";i.r(e);i(65);var a,n=i(16),r=i(6),o=i.n(r),s=i(10),h=i(12),c=i(7),u=i(0),d=i(5),l=i(1),p=i(61),g=function(){function t(e){Object(u.a)(this,t),this.noiseGenerator=void 0,this.noiseGenerator=new p.a(e)}return Object(l.a)(t,[{key:"generateNoiseMap",value:function(t,e){for(var i=[],a=0;a<t;a++){i[a]=[];for(var n=0;n<e;n++){var r=this.getMixedFrequencyNoise(a,n,[.01,.02,.04,.08,.16,.32,.64,1.28]);r=Math.pow(r,2.3),i[a][n]=r}}return this.makeSeamlessVertically(i,.2*e),this.makeSeamlessHorizontally(i,.05*t),i}},{key:"getNoise",value:function(t,e,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,r=i*t+a,o=i*e+n,s=1/i,h=this.noiseGenerator.noise2D(r,o)/2+.5,c=s*h;return c}},{key:"getMixedFrequencyNoise",value:function(t,e,i){var a=this,n=0;return i.reduce((function(i,r,o){n+=1/r;var s=10*o,h=100*o;return i+a.getNoise(t,e,r,s,h)}),0)/n}},{key:"makeSeamlessHorizontally",value:function(t,e){for(var i=t.length,a=t[0].length,n=0;n<e;n++)for(var r=n/e,o=0;o<a;o++){var s=~~(i-e+n);t[s][o]=d.o.lerp(t[s][o],t[~~(e-n)][o],r)}}},{key:"makeSeamlessVertically",value:function(t,e){for(var i=t.length,a=t[0].length,n=0;n<e;n++)for(var r=Math.ceil(e-n),o=0;o<i;o++){for(var s=0,h=0,c=0,u=o-r;u<o+r;u++)u<0||u>=i||(s+=t[u][n],h+=t[u][a-n-1],c++);t[o][n]=s/c,t[o][a-n-1]=h/c}}}]),t}();!function(t){t[t.Sun=0]="Sun",t[t.Planet=1]="Planet",t[t.Moon=2]="Moon"}(a||(a={}));var m=function(){function t(e,i,a,n){Object(u.a)(this,t),this.id=void 0,this.entityType=void 0,this.entity=void 0,this.params=void 0,this.radius=void 0,this.sphere=void 0,this.orbit=void 0,this.textureWidth=void 0,this.textureHeight=void 0,this.loader=new d.z,this.sphereGeometry=void 0,this.orbitGeometry=void 0,this.material=void 0,this.heightMapTexture=void 0,this.colourMapTexture=void 0,this.texture=void 0,this.id=e,this.entityType=i,this.radius=a,this.params=n,this.entity=new d.k,this.textureWidth=512,this.textureHeight=256}return Object(l.a)(t,[{key:"create",value:function(){var t=Object(s.a)(o.a.mark((function t(){var e,i,a,n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(this.params.terrainHeight>0)){t.next=9;break}e=this.generateTerrainMaps(),this.heightMapTexture=new d.e(e.heightMap.canvas),this.colourMapTexture=new d.e(e.map.canvas),this.heightMapTexture.mapping=d.i,this.colourMapTexture.mapping=d.i,this.material=new d.r({bumpMap:this.heightMapTexture,bumpScale:this.params.terrainHeight,map:this.colourMapTexture,displacementMap:this.heightMapTexture,displacementScale:this.params.terrainHeight}),t.next=17;break;case 9:if(!this.params.texturePath){t.next=16;break}return t.next=12,this.loader.loadAsync(this.params.texturePath);case 12:this.texture=t.sent,this.material=new d.q({map:this.texture,color:this.params.colour}),t.next=17;break;case 16:this.material=new d.q({color:this.params.colour});case 17:return this.sphereGeometry=new d.w(this.radius,64,48),this.sphere=new d.p(this.sphereGeometry,this.material),this.sphere.castShadow=!!this.params.castShadow,this.sphere.receiveShadow=!!this.params.receiveShadow,this.params.orbitEntity&&(i=this.params.orbitEntity.sphere.position,a=this.params.orbitRadius||400,n=this.createOrbitCircle(a),this.entity.add(n),this.sphere.position.set(a,0,0),this.entity.position.set(i.x,i.y,i.z)),this.entity.add(this.sphere),t.abrupt("return",this);case 24:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"animate",value:function(t){if(t.getElapsedTime(),this.params.orbitEntity){var e=this.params.orbitSpeed,i=this.params.orbitDirection;this.entity.rotation.y+=e*i}this.params.spinSpeed&&(this.sphere.rotation.y+=this.params.spinSpeed)}},{key:"show",value:function(){this.params.onShow&&this.params.onShow(this.id)}},{key:"dispose",value:function(){var t,e,i,a,n,r,o;null===(t=this.sphereGeometry)||void 0===t||t.dispose(),null===(e=this.orbitGeometry)||void 0===e||e.dispose(),null===(i=this.orbit)||void 0===i||i.dispose(),null===(a=this.material)||void 0===a||a.dispose(),null===(n=this.heightMapTexture)||void 0===n||n.dispose(),null===(r=this.colourMapTexture)||void 0===r||r.dispose(),null===(o=this.texture)||void 0===o||o.dispose(),this._dispose()}},{key:"generateTerrainMaps",value:function(){for(var t=this.getCanvasContext(),e=t.createImageData(this.textureWidth,this.textureHeight),i=e.data,a=this.getCanvasContext(),n=a.createImageData(this.textureWidth,this.textureHeight),r=n.data,o=[].concat(Object(c.a)(this.params.baseSeed),[99999]).reduce((function(t,e){return t+e})),s=new g(o).generateNoiseMap(this.textureWidth,this.textureHeight),h=0;h<i.length;h+=4){for(var u=h/4%this.textureWidth,d=~~(h/4/this.textureWidth),l=255*s[u][d],p=[l,l,l,255],m=0;m<p.length;m++)i[h+m]=p[m];for(var b=this.getMapColour(l,d),v=0;v<b.length;v++)r[h+v]=b[v]}return t.putImageData(e,0,0),a.putImageData(n,0,0),{heightMap:t,map:a}}},{key:"getRangeColour",value:function(t,e){return this.lerpColour(t.dark,t.light,(e-t.min)/(t.max-t.min))}},{key:"lerpColour",value:function(t,e,i){var a=this.convertToColor(t).lerp(this.convertToColor(e),i);return[].concat(Object(c.a)(a.toArray()),[255])}},{key:"convertToColor",value:function(t){return(new d.g).setRGB(t[0],t[1],t[2])}},{key:"getCanvasContext",value:function(){var t=document.createElement("canvas").getContext("2d");return t.canvas.width=this.textureWidth,t.canvas.height=this.textureHeight,t.fillStyle="#fff",t.fillRect(0,0,t.canvas.width,t.canvas.height),t}},{key:"createOrbitCircle",value:function(t){this.orbitGeometry=new d.c;var e=[];this.orbit=new d.m({color:16777215,opacity:.5,transparent:!0});for(var i=0;i<=128;i++){var a=i/128*Math.PI*2;e.push(Math.cos(a)*t,0,Math.sin(a)*t)}var n=new Float32Array(e);return this.orbitGeometry.setAttribute("position",new d.b(n,3)),new d.l(this.orbitGeometry,this.orbit)}}]),t}(),b=i(30),v=i(62),f=i(63),y=i(64),k=i.n(y),w=function(){function t(){Object(u.a)(this,t)}return Object(l.a)(t,null,[{key:"getRandom",value:function(t){return k.a.factory({seed:t})()/4294967295}},{key:"getRandomInt",value:function(e,i,a){return Math.floor(t.getRandom(a)*(i-e+1)+e)}},{key:"getRandomFloat",value:function(e,i,a){return t.getRandom(a)*(i-e)+e}},{key:"coinToss",value:function(e){return t.getRandom(e)<=.5}},{key:"getRandomPointInSphere",value:function(t,e,i,a){e||(e=0),i||(i=0),a||(a=0);var n=Math.random(),r=Math.random(),o=2*Math.PI*n,s=Math.acos(1-2*r);return[e+t*Math.sin(s)*Math.cos(o),i+t*Math.sin(s)*Math.sin(o),a+t*Math.cos(s)]}}]),t}(),x=0,R=1,S=2,j=4,O=5,M=6,C=7,D=8,I=function(){function t(){Object(u.a)(this,t),this.EntityId=0}return Object(l.a)(t,[{key:"getNextId",value:function(){return this.EntityId++,this.EntityId}},{key:"generate",value:function(t){for(var e={suns:[],planets:[]},i=[{id:this.getNextId(),name:"Sun ".concat(this.EntityId),seed:[t,0],position:[0,0,0],radius:1280,terrainHeight:0,moons:[],orbitEntityId:0,orbitRadius:0,orbitSpeed:0,orbitDirection:0,spinSpeed:w.getRandomFloat(1e-4,3e-4,[t,0].concat([M]))}],a=0;a<i.length;a++){for(var n=i[a],r=w.getRandomInt(1,9,[t,a,C]),o=0;o<r;o++){for(var s=[t,a,o],h=w.getRandomInt(.1*n.radius,.3*n.radius,[].concat(s,[x])),c=w.getRandomInt(1,5,[].concat(s,[C])),u=[],d=0;d<c;d++){var l=[t,a,o,d],p=w.coinToss([].concat(l,[j]))?1:-1,g=w.getRandomFloat(.001,.005,[].concat(l,[O])),m=w.getRandomFloat(.001,.005,[].concat(l,[M])),b=w.getRandomInt(3*h*.5,4*h,[].concat(l,[D,0])),v={id:this.getNextId(),name:"Moon ".concat(d),seed:l,radius:w.getRandomInt(h/24,h/8,[].concat(l,[x])),terrainHeight:w.getRandomInt(1,10,[].concat(l,[R])),orbitEntityId:-1,orbitRadius:0===d?b:u[d-1].orbitRadius+w.getRandomInt(.2*b,b,[].concat(l,[D,1])),orbitDirection:p,orbitSpeed:g,spinSpeed:m,rgb:L([].concat(l,[S])),moons:[]};u.push(v)}var f=w.coinToss([].concat(s,[j]))?1:-1,y=w.getRandomFloat(.001,.005,[].concat(s,[O])),k=w.getRandomFloat(.002,.006,[].concat(s,[M])),I=w.getRandomInt(1.1*u[u.length-1].orbitRadius,2*u[u.length-1].orbitRadius,[].concat(s,[D,0])),F=e.planets.length>0?e.planets[e.planets.length-1]:void 0,H=0===o?I:F.orbitRadius,P=0===o?0:F.moons[F.moons.length-1].orbitRadius,T=u[u.length-1].orbitRadius,E=h,A={id:this.getNextId(),name:"Planet ".concat(o),seed:s,radius:h,terrainHeight:8,orbitEntityId:n.id,orbitRadius:H+P+T+E,orbitDirection:f,orbitSpeed:y,spinSpeed:k,moons:u};e.planets.push(A)}e.suns.push(n)}return e}}]),t}(),L=function(t){return[w.getRandomFloat(.6,1,[].concat(Object(c.a)(t),[0])),w.getRandomFloat(.6,1,[].concat(Object(c.a)(t),[1])),w.getRandomFloat(.6,1,[].concat(Object(c.a)(t),[2]))]},F=i(2),H=i(3),P=function(t){Object(F.a)(i,t);var e=Object(H.a)(i);function i(){return Object(u.a)(this,i),e.apply(this,arguments)}return Object(l.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(t,e){var i=t/255,a=this.params.colour,n=a.r,r=a.g,o=a.b,s=[Math.floor(255*n),Math.floor(255*r),Math.floor(255*o),255];return[s[0]*i,s[1]*i,s[2]*i,s[3]]}}]),i}(m),T=function(t){Object(F.a)(i,t);var e=Object(H.a)(i);function i(){var t;Object(u.a)(this,i);for(var a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(t=e.call.apply(e,[this].concat(n))).colours={oceanDark:t.getRandomColour(0),oceanLight:t.getRandomColour(1),beachDark:t.getRandomColour(2),beachLight:t.getRandomColour(3),forestDark:t.getRandomColour(4),forestLight:t.getRandomColour(5),jungleDark:t.getRandomColour(6),jungleLight:t.getRandomColour(7),savannahDark:t.getRandomColour(8),savannahLight:t.getRandomColour(9),desertDark:t.getRandomColour(10),desertLight:t.getRandomColour(11),snowDark:t.getRandomColour(12),snowLight:t.getRandomColour(13)},t}return Object(l.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(t,e){return this.getColourForHeight(t)}},{key:"getColourForHeight",value:function(t){for(var e=0,i=[{min:0,max:60,dark:this.colours.oceanDark,light:this.colours.oceanLight},{min:60,max:70,dark:this.colours.oceanLight,light:this.colours.beachLight},{min:70,max:110,dark:this.colours.forestDark,light:this.colours.forestLight},{min:110,max:120,dark:this.colours.jungleDark,light:this.colours.jungleLight},{min:120,max:140,dark:this.colours.savannahDark,light:this.colours.savannahLight},{min:120,max:150,dark:this.colours.desertDark,light:this.colours.desertLight}];e<i.length;e++){var a=i[e];if(t<a.max)return this.getRangeColour(a,t)}return this.colours.snowLight}},{key:"getRandomColour",value:function(t){var e=[].concat(Object(c.a)(this.params.baseSeed),[t]);return[255*w.getRandomFloat(.2,1,[].concat(Object(c.a)(e),[0])),255*w.getRandomFloat(.2,1,[].concat(Object(c.a)(e),[1])),255*w.getRandomFloat(.2,1,[].concat(Object(c.a)(e),[2])),255]}}]),i}(m),E=function(t){Object(F.a)(i,t);var e=Object(H.a)(i);function i(){return Object(u.a)(this,i),e.apply(this,arguments)}return Object(l.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(t,e){var i=this.params.colour,a=i.r,n=i.g,r=i.b,o=[Math.floor(255*a),Math.floor(255*n),Math.floor(255*r),255];return[o[0],o[1],o[2],o[3]]}}]),i}(m),A={oceanDark:[0,24,168,255],oceanLight:[0,105,148,255],beachDark:[140,129,95,255],beachLight:[221,202,146,255],forestDark:[0,66,37,255],forestLight:[0,127,72,255],jungleDark:[48,102,79,255],jungleLight:[57,122,94,255],savannahDark:[136,155,105,255],savannahLight:[165,189,126,255],desertDark:[175,175,144,255],desertLight:[198,198,167,255],snowDark:[200,200,200,255],snowLight:[255,255,255,255]},V=function(t){Object(F.a)(i,t);var e=Object(H.a)(i);function i(){return Object(u.a)(this,i),e.apply(this,arguments)}return Object(l.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(t,e){return this.getColourForHeight(t)}},{key:"getColourForHeight",value:function(t){for(var e=0,i=[{min:0,max:60,dark:A.oceanDark,light:A.oceanLight},{min:60,max:70,dark:A.oceanLight,light:A.beachLight},{min:70,max:110,dark:A.forestDark,light:A.forestLight},{min:110,max:120,dark:A.jungleDark,light:A.jungleLight},{min:120,max:140,dark:A.savannahDark,light:A.savannahLight},{min:120,max:150,dark:A.desertDark,light:A.desertLight}];e<i.length;e++){var a=i[e];if(t<a.max)return this.getRangeColour(a,t)}return A.snowLight}}]),i}(m),G=new function t(){var e,i=this;Object(u.a)(this,t),this.solarSystem=void 0,this.isRunning=!1,this.scene=void 0,this.camera=void 0,this.clock=new d.f,this.bodies=[],this.renderer=void 0,this.orbitControls=void 0,this.stats=void 0,this.showPlanetId=void 0,this.cameraInitialPosition=void 0,this.spaceTexture=void 0,this.gui=void 0,this.guiViewActionsFolder=void 0,this.ambientLight=void 0,this.pointLight=void 0,this.options={seed:2},this.buttonHandlers={resetView:function(){var t;i.showPlanetId=-1,(t=i.camera.position).set.apply(t,Object(c.a)(i.cameraInitialPosition)),i.orbitControls=new b.a(i.camera,i.renderer.domElement)},toggleOrbits:function(){var t,e=Object(h.a)(i.bodies);try{for(e.s();!(t=e.n()).done;){var a=t.value;a.orbit&&(a.orbit.opacity=0===a.orbit.opacity?.5:0)}}catch(n){e.e(n)}finally{e.f()}},newSeed:function(){i.options.seed=d.o.randInt(1e4,1e5),i.reset()},changeSeed:function(){i.reset()}},this.init=Object(s.a)(o.a.mark((function t(){var e,n,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i.showPlanetId=-1,i.ambientLight=new d.a(16777215,.15),i.scene.add(i.ambientLight),i.pointLight=new d.t(16244886,1),i.pointLight.position.set(0,0,0),i.scene.add(i.pointLight),t.next=8,i.createSolarSystem();case 8:i.guiViewActionsFolder=i.gui.addFolder("View Actions"),i.guiViewActionsFolder.open(),i.guiViewActionsFolder.add(i.buttonHandlers,"toggleOrbits").name("Toggle Orbits"),i.guiViewActionsFolder.add(i.buttonHandlers,"resetView").name("Reset View"),e=Object(h.a)(i.bodies.filter((function(t){return t.entityType===a.Planet})));try{for(r=function(){var t=n.value,e=i.solarSystem.planets.find((function(e){return e.id===t.id}));i.guiViewActionsFolder.add(t,"show").name((null===e||void 0===e?void 0:e.name)||"A Planet")},e.s();!(n=e.n()).done;)r()}catch(o){e.e(o)}finally{e.f()}i.isRunning=!0;case 15:case"end":return t.stop()}}),t)}))),this.animate=function(){if(i.isRunning){if(requestAnimationFrame(i.animate),i.bodies.forEach((function(t){t.animate(i.clock)})),i.orbitControls.update(),i.stats.update(),i.showPlanetId>-1){var t=i.bodies.find((function(t){return t.id===i.showPlanetId}));if(t){var e=new d.B;t.sphere.getWorldPosition(e),i.camera.position.set(e.x+2*t.radius,e.y+2*t.radius,e.z+8*t.radius),i.camera.lookAt(e.x,e.y,e.z)}}i.renderer.render(i.scene,i.camera)}},this.clearScene=function(){i.isRunning=!1;try{i.gui.removeFolder(i.guiViewActionsFolder),i.guiViewActionsFolder.destroy()}catch(a){}i.ambientLight.dispose(),i.pointLight.dispose();var t,e=Object(h.a)(i.bodies);try{for(e.s();!(t=e.n()).done;){t.value.dispose()}}catch(n){e.e(n)}finally{e.f()}i.bodies=[],i.scene.clear(),i.renderer.render(i.scene,i.camera)},this.reset=function(){i.gui.updateDisplay(),i.clearScene(),i.solarSystem=(new I).generate(i.options.seed),i.init().then((function(){i.animate()}))},this.createSolarSystem=Object(s.a)(o.a.mark((function t(){var e,r,s,u,l,p,g;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=function(t){i.showPlanetId=t},r=Object(h.a)(i.solarSystem.suns),t.prev=2,r.s();case 4:if((s=r.n()).done){t.next=20;break}return u=s.value,l=new E(u.id,a.Sun,u.radius,{baseSeed:u.seed,position:u.position?Object(n.a)(d.B,Object(c.a)(u.position)):new d.B(0,0,0),colour:new d.g(16763424),terrainHeight:0,texturePath:"assets/sun.jpg",orbitEntity:!1,orbitRadius:u.orbitRadius,orbitDirection:u.orbitDirection,orbitSpeed:u.orbitSpeed,spinSpeed:u.spinSpeed}),t.next=9,l.create();case 9:i.bodies.push(l),i.scene.add(l.entity),p=o.a.mark((function t(r){var s,u,l,p,g,m,b,v,f;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=i.solarSystem.planets[r],u=i.bodies.find((function(t){return t.id===s.orbitEntityId})),l={baseSeed:s.seed,position:s.position?Object(n.a)(d.B,Object(c.a)(s.position)):u.entity.position,terrainHeight:s.terrainHeight,orbitEntity:u,orbitRadius:s.orbitRadius,orbitDirection:s.orbitDirection,orbitSpeed:s.orbitSpeed,spinSpeed:s.spinSpeed,onShow:e},p=2===r?new V(s.id,a.Planet,s.radius,l):new T(s.id,a.Planet,s.radius,l),t.next=6,p.create();case 6:g=Object(h.a)(s.moons),t.prev=7,g.s();case 9:if((m=g.n()).done){t.next=19;break}return b=m.value,v=p,f=new P(b.id,a.Moon,b.radius,{baseSeed:b.seed,position:b.position?Object(n.a)(d.B,Object(c.a)(b.position)):v.entity.position,colour:b.rgb?Object(n.a)(d.g,Object(c.a)(b.rgb)):new d.g(1,1,1),terrainHeight:b.terrainHeight,orbitEntity:v,orbitRadius:b.orbitRadius,orbitDirection:b.orbitDirection,orbitSpeed:b.orbitSpeed,spinSpeed:b.spinSpeed}),t.next=15,f.create();case 15:i.bodies.push(f),p.entity.add(f.entity);case 17:t.next=9;break;case 19:t.next=24;break;case 21:t.prev=21,t.t0=t.catch(7),g.e(t.t0);case 24:return t.prev=24,g.f(),t.finish(24);case 27:i.bodies.push(p),i.scene.add(p.entity);case 29:case"end":return t.stop()}}),t,null,[[7,21,24,27]])})),g=0;case 13:if(!(g<i.solarSystem.planets.length)){t.next=18;break}return t.delegateYield(p(g),"t0",15);case 15:g++,t.next=13;break;case 18:t.next=4;break;case 20:t.next=25;break;case 22:t.prev=22,t.t1=t.catch(2),r.e(t.t1);case 25:return t.prev=25,r.f(),t.finish(25);case 28:case"end":return t.stop()}}),t,null,[[2,22,25,28]])}))),this.solarSystem=(new I).generate(this.options.seed),this.scene=new d.v,this.scene.background=(new d.g).setHex(0);var r=new d.h;this.spaceTexture=r.load(["assets/kurt/space_ft.png","assets/kurt/space_bk.png","assets/kurt/space_up.png","assets/kurt/space_dn.png","assets/kurt/space_rt.png","assets/kurt/space_lf.png"]),this.scene.background=this.spaceTexture,this.camera=new d.d,this.camera=new d.s(25,window.innerWidth/window.innerHeight,50,1e7),this.cameraInitialPosition=[0,6*this.solarSystem.suns[0].radius,20*this.solarSystem.suns[0].radius],(e=this.camera.position).set.apply(e,Object(c.a)(this.cameraInitialPosition)),this.camera.lookAt(0,0,0),this.renderer=new d.C({powerPreference:"high-performance",antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.shadowMap.enabled=!0,document.body.appendChild(this.renderer.domElement),this.orbitControls=new b.a(this.camera,this.renderer.domElement),this.stats=new v.a,document.body.appendChild(this.stats.dom),this.gui=new f.a,this.gui.add(this.buttonHandlers,"newSeed").name("New Seed"),this.gui.add(this.options,"seed").name("Seed").onFinishChange(this.buttonHandlers.changeSeed)};G.init().then((function(){G.animate()}))},65:function(t,e,i){}},[[228,1,2]]]);
//# sourceMappingURL=main.7014e4fb.chunk.js.map