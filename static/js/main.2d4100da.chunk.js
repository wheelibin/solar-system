(this["webpackJsonpsolar-system"]=this["webpackJsonpsolar-system"]||[]).push([[0],{237:function(t,e,i){},239:function(t,e,i){"use strict";i.r(e);i(69),i(70);var a,n=i(15),o=i.n(n),r=i(64),s=i.n(r),h=i(18),c=i(7),d=i(6),u=i.n(d),l=i(10),g=i(12),p=i(0),m=i(5),b=i(1),v=i(65),f=function(){function t(e){Object(p.a)(this,t),this.noiseGenerator=void 0,this.noiseGenerator=new v.a(e)}return Object(b.a)(t,[{key:"generateNoiseMap",value:function(t,e){for(var i=[],a=0;a<t;a++){i[a]=[];for(var n=0;n<e;n++){var o=this.getMixedFrequencyNoise(a,n,[.01,.02,.04,.08,.16,.32,.64,1.28]);o=Math.pow(o,2.3),i[a][n]=o}}return this.makeSeamlessVertically(i,.2*e),this.makeSeamlessHorizontally(i,.05*t),i}},{key:"getNoise",value:function(t,e,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,o=i*t+a,r=i*e+n,s=1/i,h=this.noiseGenerator.noise2D(o,r)/2+.5,c=s*h;return c}},{key:"getMixedFrequencyNoise",value:function(t,e,i){var a=this,n=0;return i.reduce((function(i,o,r){n+=1/o;var s=10*r,h=100*r;return i+a.getNoise(t,e,o,s,h)}),0)/n}},{key:"makeSeamlessHorizontally",value:function(t,e){for(var i=t.length,a=t[0].length,n=0;n<e;n++)for(var o=n/e,r=0;r<a;r++){var s=~~(i-e+n);t[s][r]=m.o.lerp(t[s][r],t[~~(e-n)][r],o)}}},{key:"makeSeamlessVertically",value:function(t,e){for(var i=t.length,a=t[0].length,n=0;n<e;n++)for(var o=Math.ceil(e-n),r=0;r<i;r++){for(var s=0,h=0,c=0,d=r-o;d<r+o;d++)d<0||d>=i||(s+=t[d][n],h+=t[d][a-n-1],c++);t[r][n]=s/c,t[r][a-n-1]=h/c}}}]),t}();!function(t){t[t.Sun=0]="Sun",t[t.Planet=1]="Planet",t[t.Moon=2]="Moon"}(a||(a={}));var y=function(){function t(e,i,a,n){Object(p.a)(this,t),this.id=void 0,this.entityType=void 0,this.entity=void 0,this.params=void 0,this.radius=void 0,this.sphere=void 0,this.orbit=void 0,this.textureWidth=void 0,this.textureHeight=void 0,this.maxTerrainHeight=void 0,this.loader=new m.z,this.sphereGeometry=void 0,this.orbitGeometry=void 0,this.material=void 0,this.heightMapTexture=void 0,this.colourMapTexture=void 0,this.texture=void 0,this.id=e,this.entityType=i,this.radius=a,this.params=n,this.entity=new m.k,this.textureWidth=512,this.textureHeight=256}return Object(b.a)(t,[{key:"create",value:function(){var t=Object(l.a)(u.a.mark((function t(){var e,i,a,n,o;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(this.params.terrainHeight&&this.params.terrainHeight>0)){t.next=10;break}e=this.generateTerrainMaps(),this.heightMapTexture=new m.e(e.heightMap.canvas),this.colourMapTexture=new m.e(e.map.canvas),this.heightMapTexture.mapping=m.i,this.colourMapTexture.mapping=m.i,i=Math.ceil(this.params.terrainHeight*this.maxTerrainHeight),this.material=new m.r({bumpMap:this.heightMapTexture,bumpScale:i,map:this.colourMapTexture,displacementMap:this.heightMapTexture,displacementScale:i}),t.next=18;break;case 10:if(!this.params.texturePath){t.next=17;break}return t.next=13,this.loader.loadAsync(this.params.texturePath);case 13:this.texture=t.sent,this.material=new m.q({map:this.texture,color:this.params.colour}),t.next=18;break;case 17:this.material=new m.q({color:this.params.colour});case 18:return this.sphereGeometry=new m.w(this.radius,64,48),this.sphere=new m.p(this.sphereGeometry,this.material),this.sphere.castShadow=!!this.params.castShadow,this.sphere.receiveShadow=!!this.params.receiveShadow,this.params.orbitEntity&&(a=this.params.orbitEntity.sphere.position,n=this.params.orbitRadius||400,o=this.createOrbitCircle(n),this.entity.add(o),this.sphere.position.set(n,0,0),this.entity.position.set(a.x,a.y,a.z),this.entity.rotation.x=m.o.degToRad(this.params.orbitInclanation)),this.entity.add(this.sphere),t.abrupt("return",this);case 25:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"animate",value:function(t,e){if(t.getElapsedTime(),this.params.orbitEntity){var i=this.params.orbitSpeed*e,a=this.params.orbitDirection;this.entity.rotation.y+=i*a}this.params.spinSpeed&&(this.sphere.rotation.y+=this.params.spinSpeed*e)}},{key:"show",value:function(){this.params.onShow&&this.params.onShow(this.id)}},{key:"dispose",value:function(){var t,e,i,a,n,o,r;null===(t=this.sphereGeometry)||void 0===t||t.dispose(),null===(e=this.orbitGeometry)||void 0===e||e.dispose(),null===(i=this.orbit)||void 0===i||i.dispose(),null===(a=this.material)||void 0===a||a.dispose(),null===(n=this.heightMapTexture)||void 0===n||n.dispose(),null===(o=this.colourMapTexture)||void 0===o||o.dispose(),null===(r=this.texture)||void 0===r||r.dispose(),this._dispose()}},{key:"generateTerrainMaps",value:function(){for(var t=this.getCanvasContext(),e=t.createImageData(this.textureWidth,this.textureHeight),i=e.data,a=this.getCanvasContext(),n=a.createImageData(this.textureWidth,this.textureHeight),o=n.data,r=[].concat(Object(c.a)(this.params.baseSeed),[99999]).reduce((function(t,e){return t+e})),s=new f(r).generateNoiseMap(this.textureWidth,this.textureHeight),h=0;h<i.length;h+=4){for(var d=h/4%this.textureWidth,u=~~(h/4/this.textureWidth),l=255*s[d][u],g=[l,l,l,255],p=0;p<g.length;p++)i[h+p]=g[p];for(var m=this.getMapColour(l,u),b=0;b<m.length;b++)o[h+b]=m[b]}return t.putImageData(e,0,0),a.putImageData(n,0,0),{heightMap:t,map:a}}},{key:"getRangeColour",value:function(t,e){return this.lerpColour(t.dark,t.light,(e-t.min)/(t.max-t.min))}},{key:"lerpColour",value:function(t,e,i){var a=this.convertToColor(t).lerp(this.convertToColor(e),i);return[].concat(Object(c.a)(a.toArray()),[255])}},{key:"convertToColor",value:function(t){return(new m.g).setRGB(t[0],t[1],t[2])}},{key:"getCanvasContext",value:function(){var t=document.createElement("canvas").getContext("2d");return t.canvas.width=this.textureWidth,t.canvas.height=this.textureHeight,t.fillStyle="#fff",t.fillRect(0,0,t.canvas.width,t.canvas.height),t}},{key:"createOrbitCircle",value:function(t){this.orbitGeometry=new m.c;var e=[];this.orbit=new m.m({color:16777215,opacity:.5,transparent:!0});for(var i=0;i<=128;i++){var a=i/128*Math.PI*2;e.push(Math.cos(a)*t,0,Math.sin(a)*t)}var n=new Float32Array(e);return this.orbitGeometry.setAttribute("position",new m.b(n,3)),new m.l(this.orbitGeometry,this.orbit)}}]),t}(),w=i(33),k=i(66),x=i(67),S=i(68),R=i.n(S),j=function(){function t(){Object(p.a)(this,t)}return Object(b.a)(t,null,[{key:"getRandom",value:function(t){return R.a.factory({seed:t})()/4294967295}},{key:"getRandomInt",value:function(e,i,a){return Math.floor(t.getRandom(a)*(i-e+1)+e)}},{key:"getRandomFloat",value:function(e,i,a){return t.getRandom(a)*(i-e)+e}},{key:"coinToss",value:function(e){return t.getRandom(e)<=.5}},{key:"getRandomPointInSphere",value:function(t,e,i,a){e||(e=0),i||(i=0),a||(a=0);var n=Math.random(),o=Math.random(),r=2*Math.PI*n,s=Math.acos(1-2*o);return[e+t*Math.sin(s)*Math.cos(r),i+t*Math.sin(s)*Math.sin(r),a+t*Math.cos(s)]}}]),t}(),O=0,I=1,M=2,C=4,L=5,D=6,H=7,T=8,F=9,P=function(){function t(){Object(p.a)(this,t),this.EntityId=0}return Object(b.a)(t,[{key:"getNextId",value:function(){return this.EntityId++,this.EntityId}},{key:"generate",value:function(t){for(var e={suns:[],planets:[]},i=[{id:this.getNextId(),name:"Sun ".concat(this.EntityId),seed:[t,0],position:[0,0,0],radius:1280,terrainHeight:0,moons:[],orbitEntityId:0,orbitRadius:0,orbitSpeed:0,orbitDirection:0,orbitInclanation:0,spinSpeed:j.getRandomFloat(1e-4,3e-4,[t,0].concat([D]))}],a=0;a<i.length;a++){for(var n=i[a],o=j.getRandomInt(1,9,[t,a,H]),r=0;r<o;r++){for(var s=[t,a,r],h=j.getRandomInt(.1*n.radius,.3*n.radius,[].concat(s,[O])),c=j.getRandomInt(1,5,[].concat(s,[H])),d=[],u=0;u<c;u++){var l=[t,a,r,u],g=j.coinToss([].concat(l,[C]))?1:-1,p=j.getRandomFloat(.001,.005,[].concat(l,[L])),m=j.getRandomFloat(.001,.005,[].concat(l,[D])),b=j.getRandomInt(3*h*.5,4*h,[].concat(l,[T,0])),v={id:this.getNextId(),name:"Moon ".concat(u),seed:l,radius:j.getRandomInt(h/12,h/4,[].concat(l,[O])),terrainHeight:j.getRandom([].concat(l,[I])),orbitEntityId:-1,orbitRadius:0===u?b:d[u-1].orbitRadius+j.getRandomInt(.2*b,b,[].concat(l,[T,1])),orbitDirection:g,orbitSpeed:p,orbitInclanation:j.getRandomInt(0,45,[].concat(l,[F])),spinSpeed:m,rgb:E([].concat(l,[M])),moons:[]};d.push(v)}var f=j.coinToss([].concat(s,[C]))?1:-1,y=j.getRandomFloat(.001,.005,[].concat(s,[L])),w=j.getRandomFloat(.002,.006,[].concat(s,[D])),k=j.getRandomInt(1.1*d[d.length-1].orbitRadius,2*d[d.length-1].orbitRadius,[].concat(s,[T,0])),x=e.planets.length>0?e.planets[e.planets.length-1]:void 0,S=0===r?k:x.orbitRadius,R=0===r?0:x.moons[x.moons.length-1].orbitRadius,P=d[d.length-1].orbitRadius,A=h,V={id:this.getNextId(),name:"Planet ".concat(r),seed:s,radius:h,terrainHeight:1,orbitEntityId:n.id,orbitRadius:S+R+P+A,orbitDirection:f,orbitSpeed:y,orbitInclanation:j.getRandomInt(0,15,[].concat(s,[F])),spinSpeed:w,moons:d};e.planets.push(V)}e.suns.push(n)}return e}}]),t}(),E=function(t){return[j.getRandomFloat(.6,1,[].concat(Object(c.a)(t),[0])),j.getRandomFloat(.6,1,[].concat(Object(c.a)(t),[1])),j.getRandomFloat(.6,1,[].concat(Object(c.a)(t),[2]))]},A=i(2),V=i(3),G=function(t){Object(A.a)(i,t);var e=Object(V.a)(i);function i(){var t;Object(p.a)(this,i);for(var a=arguments.length,n=new Array(a),o=0;o<a;o++)n[o]=arguments[o];return(t=e.call.apply(e,[this].concat(n))).maxTerrainHeight=5,t}return Object(b.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(t,e){var i=t/64,a=this.params.colour,n=a.r,o=a.g,r=a.b,s=[Math.floor(255*n),Math.floor(255*o),Math.floor(255*r),255];return[s[0]*i,s[1]*i,s[2]*i,s[3]]}}]),i}(y),N=function(t){Object(A.a)(i,t);var e=Object(V.a)(i);function i(){var t;Object(p.a)(this,i);for(var a=arguments.length,n=new Array(a),o=0;o<a;o++)n[o]=arguments[o];return(t=e.call.apply(e,[this].concat(n))).maxTerrainHeight=8,t.colours={oceanDark:t.getRandomColour(0),oceanLight:t.getRandomColour(1),beachDark:t.getRandomColour(2),beachLight:t.getRandomColour(3),forestDark:t.getRandomColour(4),forestLight:t.getRandomColour(5),jungleDark:t.getRandomColour(6),jungleLight:t.getRandomColour(7),savannahDark:t.getRandomColour(8),savannahLight:t.getRandomColour(9),desertDark:t.getRandomColour(10),desertLight:t.getRandomColour(11),snowDark:t.getRandomColour(12),snowLight:t.getRandomColour(13)},t}return Object(b.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(t,e){return this.getColourForHeight(t)}},{key:"getColourForHeight",value:function(t){for(var e=0,i=[{min:0,max:60,dark:this.colours.oceanDark,light:this.colours.oceanLight},{min:60,max:70,dark:this.colours.oceanLight,light:this.colours.beachLight},{min:70,max:110,dark:this.colours.forestDark,light:this.colours.forestLight},{min:110,max:120,dark:this.colours.jungleDark,light:this.colours.jungleLight},{min:120,max:140,dark:this.colours.savannahDark,light:this.colours.savannahLight},{min:120,max:150,dark:this.colours.desertDark,light:this.colours.desertLight}];e<i.length;e++){var a=i[e];if(t<a.max)return this.getRangeColour(a,t)}return this.colours.snowLight}},{key:"getRandomColour",value:function(t){var e=[].concat(Object(c.a)(this.params.baseSeed),[t]);return[255*j.getRandomFloat(.2,1,[].concat(Object(c.a)(e),[0])),255*j.getRandomFloat(.2,1,[].concat(Object(c.a)(e),[1])),255*j.getRandomFloat(.2,1,[].concat(Object(c.a)(e),[2])),255]}}]),i}(y),W=function(t){Object(A.a)(i,t);var e=Object(V.a)(i);function i(t,a,n,o){var r;return Object(p.a)(this,i),(r=e.call(this,t,a,n,o)).maxTerrainHeight=0,r.params.terrainHeight=0,r.params.texturePath="assets/sun.jpg",r}return Object(b.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(t,e){var i=this.params.colour,a=i.r,n=i.g,o=i.b,r=[Math.floor(255*a),Math.floor(255*n),Math.floor(255*o),255];return[r[0],r[1],r[2],r[3]]}}]),i}(y),_={oceanDark:[0,24,168,255],oceanLight:[0,105,148,255],beachDark:[140,129,95,255],beachLight:[221,202,146,255],forestDark:[0,66,37,255],forestLight:[0,127,72,255],jungleDark:[48,102,79,255],jungleLight:[57,122,94,255],savannahDark:[136,155,105,255],savannahLight:[165,189,126,255],desertDark:[175,175,144,255],desertLight:[198,198,167,255],snowDark:[200,200,200,255],snowLight:[255,255,255,255]},B=function(t){Object(A.a)(i,t);var e=Object(V.a)(i);function i(){var t;Object(p.a)(this,i);for(var a=arguments.length,n=new Array(a),o=0;o<a;o++)n[o]=arguments[o];return(t=e.call.apply(e,[this].concat(n))).maxTerrainHeight=8,t}return Object(b.a)(i,[{key:"_dispose",value:function(){}},{key:"getMapColour",value:function(t,e){return this.getColourForHeight(t)}},{key:"getColourForHeight",value:function(t){for(var e=0,i=[{min:0,max:60,dark:_.oceanDark,light:_.oceanLight},{min:60,max:70,dark:_.oceanLight,light:_.beachLight},{min:70,max:110,dark:_.forestDark,light:_.forestLight},{min:110,max:120,dark:_.jungleDark,light:_.jungleLight},{min:120,max:140,dark:_.savannahDark,light:_.savannahLight},{min:120,max:150,dark:_.desertDark,light:_.desertLight}];e<i.length;e++){var a=i[e];if(t<a.max)return this.getRangeColour(a,t)}return _.snowLight}}]),i}(y),z=(i(237),i(17)),q=function(){return Object(z.jsx)("div",{className:"loading-indicator",children:"Generating Solar System..."})};s.a.render(Object(z.jsx)(o.a.StrictMode,{children:Object(z.jsx)(q,{})}),document.getElementById("root"));var J=new function t(){var e,i=this;Object(p.a)(this,t),this.solarSystem=void 0,this.isRunning=!1,this.scene=void 0,this.camera=void 0,this.clock=new m.f,this.bodies=[],this.renderer=void 0,this.orbitControls=void 0,this.stats=void 0,this.showPlanetId=void 0,this.cameraInitialPosition=void 0,this.spaceTexture=void 0,this.gui=void 0,this.guiViewActionsFolder=void 0,this.loadingIndicator=void 0,this.ambientLight=void 0,this.pointLight=void 0,this.options={seed:2,simulationSpeed:5},this.buttonHandlers={resetView:function(){i.resetView()},toggleOrbits:function(){var t,e=Object(g.a)(i.bodies);try{for(e.s();!(t=e.n()).done;){var a=t.value;a.orbit&&(a.orbit.opacity=0===a.orbit.opacity?.5:0)}}catch(n){e.e(n)}finally{e.f()}},newSeed:function(){i.options.seed=m.o.randInt(1e5,999999),i.reset()},changeSeed:function(){i.reset()}},this.init=Object(l.a)(u.a.mark((function t(){var e,n,o;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i.showPlanetId=-1,i.ambientLight=new m.a(16777215,.15),i.scene.add(i.ambientLight),i.pointLight=new m.t(16244886,1),i.pointLight.position.set(0,0,0),i.scene.add(i.pointLight),t.next=8,i.createSolarSystem();case 8:i.guiViewActionsFolder=i.gui.addFolder("View Actions"),i.guiViewActionsFolder.open(),i.guiViewActionsFolder.add(i.buttonHandlers,"toggleOrbits").name("Toggle Orbits"),i.guiViewActionsFolder.add(i.buttonHandlers,"resetView").name("Reset View"),e=Object(g.a)(i.bodies.filter((function(t){return t.entityType===a.Planet})));try{for(o=function(){var t=n.value,e=i.solarSystem.planets.find((function(e){return e.id===t.id}));i.guiViewActionsFolder.add(t,"show").name((null===e||void 0===e?void 0:e.name)||"A Planet")},e.s();!(n=e.n()).done;)o()}catch(r){e.e(r)}finally{e.f()}i.isRunning=!0;case 15:case"end":return t.stop()}}),t)}))),this.animate=function(){if(i.isRunning){if(requestAnimationFrame(i.animate),i.bodies.forEach((function(t){t.animate(i.clock,10*i.options.simulationSpeed/100)})),i.orbitControls.update(),i.stats.update(),i.showPlanetId>-1){var t=i.bodies.find((function(t){return t.id===i.showPlanetId}));if(t){var e=new m.B;t.sphere.getWorldPosition(e),i.camera.position.set(e.x+2*t.radius,e.y+2*t.radius,e.z+8*t.radius),i.camera.lookAt(e.x,e.y,e.z)}}i.renderer.render(i.scene,i.camera)}},this.clearScene=function(){i.isRunning=!1;try{i.gui.removeFolder(i.guiViewActionsFolder),i.guiViewActionsFolder.destroy()}catch(a){}i.ambientLight.dispose(),i.pointLight.dispose();var t,e=Object(g.a)(i.bodies);try{for(e.s();!(t=e.n()).done;){t.value.dispose()}}catch(n){e.e(n)}finally{e.f()}i.bodies=[],i.scene.clear(),i.renderer.render(i.scene,i.camera)},this.reset=function(){i.toggleLoadingIndicator(),i.gui.updateDisplay(),i.clearScene(),i.solarSystem=(new P).generate(i.options.seed),i.resetView(),i.init().then((function(){i.animate(),i.toggleLoadingIndicator()}))},this.resetView=function(){var t;i.showPlanetId=-1,(t=i.camera.position).set.apply(t,Object(c.a)(i.cameraInitialPosition)),i.orbitControls=new w.a(i.camera,i.renderer.domElement)},this.handleShowPlanet=function(t){i.showPlanetId=t},this.toggleLoadingIndicator=function(){var t=i.loadingIndicator.style.display;i.loadingIndicator.style.display="none"===t?"flex":"none"},this.createSolarSystem=Object(l.a)(u.a.mark((function t(){var e,n,o,r,s,d;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=Object(g.a)(i.solarSystem.suns),t.prev=1,e.s();case 3:if((n=e.n()).done){t.next=19;break}return o=n.value,r=new W(o.id,a.Sun,o.radius,{baseSeed:o.seed,position:o.position?Object(h.a)(m.B,Object(c.a)(o.position)):new m.B(0,0,0),colour:new m.g(16763424),orbitEntity:!1,orbitRadius:o.orbitRadius,orbitDirection:o.orbitDirection,orbitSpeed:o.orbitSpeed,orbitInclanation:o.orbitInclanation,spinSpeed:o.spinSpeed}),t.next=8,r.create();case 8:i.bodies.push(r),i.scene.add(r.entity),s=u.a.mark((function t(e){var n,o,r,s,d,l,p,b,v;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=i.solarSystem.planets[e],o=i.bodies.find((function(t){return t.id===n.orbitEntityId})),r={baseSeed:n.seed,position:n.position?Object(h.a)(m.B,Object(c.a)(n.position)):o.entity.position,terrainHeight:n.terrainHeight,orbitEntity:o,orbitRadius:n.orbitRadius,orbitDirection:n.orbitDirection,orbitSpeed:n.orbitSpeed,orbitInclanation:n.orbitInclanation,spinSpeed:n.spinSpeed,onShow:i.handleShowPlanet},s=2===e?new B(n.id,a.Planet,n.radius,r):new N(n.id,a.Planet,n.radius,r),t.next=6,s.create();case 6:d=Object(g.a)(n.moons),t.prev=7,d.s();case 9:if((l=d.n()).done){t.next=19;break}return p=l.value,b=s,v=new G(p.id,a.Moon,p.radius,{baseSeed:p.seed,position:p.position?Object(h.a)(m.B,Object(c.a)(p.position)):b.entity.position,colour:p.rgb?Object(h.a)(m.g,Object(c.a)(p.rgb)):new m.g(1,1,1),terrainHeight:p.terrainHeight,orbitEntity:b,orbitRadius:p.orbitRadius,orbitDirection:p.orbitDirection,orbitSpeed:p.orbitSpeed,orbitInclanation:p.orbitInclanation,spinSpeed:p.spinSpeed}),t.next=15,v.create();case 15:i.bodies.push(v),s.entity.add(v.entity);case 17:t.next=9;break;case 19:t.next=24;break;case 21:t.prev=21,t.t0=t.catch(7),d.e(t.t0);case 24:return t.prev=24,d.f(),t.finish(24);case 27:i.bodies.push(s),i.scene.add(s.entity);case 29:case"end":return t.stop()}}),t,null,[[7,21,24,27]])})),d=0;case 12:if(!(d<i.solarSystem.planets.length)){t.next=17;break}return t.delegateYield(s(d),"t0",14);case 14:d++,t.next=12;break;case 17:t.next=3;break;case 19:t.next=24;break;case 21:t.prev=21,t.t1=t.catch(1),e.e(t.t1);case 24:return t.prev=24,e.f(),t.finish(24);case 27:case"end":return t.stop()}}),t,null,[[1,21,24,27]])}))),this.solarSystem=(new P).generate(this.options.seed),this.scene=new m.v,this.scene.background=(new m.g).setHex(0);var n=new m.h;this.spaceTexture=n.load(["assets/kurt/space_ft.png","assets/kurt/space_bk.png","assets/kurt/space_up.png","assets/kurt/space_dn.png","assets/kurt/space_rt.png","assets/kurt/space_lf.png"]),this.scene.background=this.spaceTexture,this.camera=new m.d,this.camera=new m.s(25,window.innerWidth/window.innerHeight,50,1e7),this.cameraInitialPosition=[0,6*this.solarSystem.suns[0].radius,20*this.solarSystem.suns[0].radius],(e=this.camera.position).set.apply(e,Object(c.a)(this.cameraInitialPosition)),this.camera.lookAt(0,0,0),this.renderer=new m.C({powerPreference:"high-performance",antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.shadowMap.enabled=!0,document.body.appendChild(this.renderer.domElement),this.orbitControls=new w.a(this.camera,this.renderer.domElement),this.stats=new k.a,document.body.appendChild(this.stats.dom),this.gui=new x.a,this.gui.width=300,this.gui.add(this.buttonHandlers,"newSeed").name("New Seed"),this.gui.add(this.options,"seed").name("Seed").onFinishChange(this.buttonHandlers.changeSeed),this.gui.add(this.options,"simulationSpeed",0,100,1).name("Simulation Speed"),this.loadingIndicator=document.getElementsByClassName("loading-indicator")[0],this.loadingIndicator.style.display="none"};J.init().then((function(){J.animate()}))},70:function(t,e,i){}},[[239,1,2]]]);
//# sourceMappingURL=main.2d4100da.chunk.js.map