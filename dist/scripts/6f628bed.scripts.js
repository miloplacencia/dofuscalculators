!function(){"use strict";angular.module("DofusExpCalculator",["ngResource","ngRoute","ngTouch","ngAnimate"]),angular.module("DofusExpCalculator").config(["$routeProvider",function(a){a.when("/professions_calculator",{templateUrl:"views/professions.html",controller:"ProfessionsController"}).when("/professions_calculator/:profession/:exp/:level",{templateUrl:"views/professions.html",controller:"ProfessionsController"}).when("/hunter_calculator",{templateUrl:"views/hunter.html",controller:"HunterController"}).when("/hunter_calculator/:calculator",{templateUrl:"views/hunter.html",controller:"HunterController"}).otherwise({redirectTo:"/professions_calculator"})}])}(),function(){"use strict";var a=angular.module("DofusExpCalculator");a.service("DbService",function(){this.gathering={Alchemist:[{gather:"Flax Flower",lvl:1,exp:10},{gather:"Hemp Flower",lvl:10,exp:15},{gather:"Five-Leaf Clover",lvl:20,exp:20},{gather:"Wild Mint Leaf",lvl:30,exp:25},{gather:"Freyesque Orchid",lvl:40,exp:30},{gather:"Edelweiss",lvl:50,exp:35},{gather:"Pandkin Seed",lvl:50,exp:35},{gather:"Snowdrop Flower",lvl:100,exp:60}],Farmer:[{gather:"Wheat",lvl:1,exp:10},{gather:"Barley",lvl:10,exp:15},{gather:"Oats",lvl:20,exp:20},{gather:"Hop",lvl:30,exp:25},{gather:"Flax",lvl:40,exp:30},{gather:"Rye",lvl:50,exp:35},{gather:"Rice",lvl:50,exp:35},{gather:"Malt",lvl:60,exp:40},{gather:"Hemp",lvl:70,exp:45},{gather:"Frosteez",lvl:100,exp:60}],Fisherman:[{gather:"Snapper",lvl:1,exp:10},{gather:"Small River Fish",lvl:1,exp:10},{gather:"Small Sea Fish",lvl:1,exp:10},{gather:"River Fish",lvl:10,exp:15},{gather:"Sea Fish",lvl:20,exp:20},{gather:"Large River Fish",lvl:40,exp:30},{gather:"Large Sea Fish",lvl:50,exp:35},{gather:"Giant River Fish",lvl:70,exp:45},{gather:"Giant Sea Fish",lvl:80,exp:50},{gather:"Frigost Fish",lvl:100,exp:60}],Lumberjack:[{gather:"Ash Wood",lvl:1,exp:10},{gather:"Chestnut Wood",lvl:10,exp:15},{gather:"Walnut Wood",lvl:20,exp:20},{gather:"Oak Wood",lvl:30,exp:25},{gather:"Oliviolet Wood",lvl:35,exp:27},{gather:"Bombu Wood",lvl:35,exp:27},{gather:"Maple Wood",lvl:40,exp:30},{gather:"Yew Wood",lvl:50,exp:35},{gather:"Bamboo Wood",lvl:50,exp:35},{gather:"Cherry Wood",lvl:60,exp:40},{gather:"Ebony Wood",lvl:70,exp:45},{gather:"Kaliptus Wood",lvl:75,exp:47},{gather:"Hornbeam Wood",lvl:80,exp:50},{gather:"Dark Bamboo Wood",lvl:80,exp:50},{gather:"Elm Wood",lvl:90,exp:55},{gather:"Aspen Wood",lvl:100,exp:60},{gather:"Holy Bamboo Wood",lvl:100,exp:60}],Miner:[{gather:"Iron",lvl:1,exp:10},{gather:"Copper",lvl:10,exp:15},{gather:"Bronze",lvl:20,exp:20},{gather:"Cobalt",lvl:30,exp:25},{gather:"Manganese",lvl:40,exp:30},{gather:"Tin",lvl:50,exp:35},{gather:"Silicate",lvl:50,exp:35},{gather:"Silver",lvl:60,exp:40},{gather:"Bauxite",lvl:70,exp:45},{gather:"Gold",lvl:80,exp:50},{gather:"Dolomite",lvl:100,exp:60},{gather:"Obsidian",lvl:100,exp:60}]},this.Professions=["Alchemist","Lumberjack","Hunter","Fisherman","Farmer","Miner","Fishmonger","Butcher","Baker","Tailor","Jeweller","Shoemaker","Handyman","Wand-Carver","Staff-Carver","Bow-Carver","Axe-Smith","Hammer-Smith","Dagger-Smith","Sword-Smith","Shovel-Smith","Shield-Smith"],this.expLvl=[0,50,140,271,441,653,905,1199,1534,1911,2330,2792,3297,3846,4439,5078,5762,6493,7271,8097,8973,9898,10875,11903,12985,14122,15315,16564,17873,19242,20672,22166,23726,25353,27048,28815,30656,32572,34566,36641,38800,41044,43378,45804,48325,50946,53669,56498,59437,62491,65664,68960,72385,75943,79640,83482,87475,91624,95937,100421,105082,109930,114971,120215,125671,131348,137256,143407,149811,156481,163429,170669,178214,186080,194283,202839,211765,221082,230808,240964,251574,262660,274248,286364,299037,312297,326175,340705,355924,371870,388582,406106,424486,443772,464016,485274,507604,531071,555741,581687],this.expCasilla=[1,10,25,50,100,250,500,1e3],this.unlockLevel=[1,10,20,40,60,80,100],this.gatherCraft={gather:["Alchemist","Farmer","Fisherman","Lumberjack","Miner"],craft:["Baker","Butcher","Hunter","Fishmonger","Jeweller","Shoemaker","Tailor","Handyman","Bow carver","Staff carver","Wand carver","Axe smith","Dagger smith","Hammer smith","Shovel smith","Sword smith","Shield smith"]}}),a.service("CalculatorService",["DbService",function(a){this.uselessLevel=function(a){return a>=40&&60>a?[1]:a>=60&&80>a?[1,2]:a>=80&&100>a?[1,2,3]:100===a?[1,2,3,4]:[]},this.isUseless=function(a,b){return b=parseInt(b),a>=40&&60>a?1===b?!0:!1:a>=60&&80>a?1===b||2===b?!0:!1:a>=80&&100>a?1===b||2===b||3===b?!0:!1:100===a&&(1===b||2===b||3===b||4===b)?!0:!1},this.blockedLevel=function(a,b){var c=[1,1,10,20,40,60,80,100];return a<c[parseInt(b-1)]?!0:!1},this.buscarNivel=function(b){for(var c=0;b>=a.expLvl[c]&&b>=0&&581687>=b;)c++;return c},this.experienciaRestante=function(b,c){var d=c||100,e=this.buscarNivel(b),f=a.expLvl[d-1]||581687,g=f-b;return{expBase:Math.floor(b),expRestante:g>0?parseInt(g):581687,expFinal:parseInt(f),lvlFinal:Math.floor(d),lvlInicial:parseInt(e)}},this.levelInicial=function(a){var b=581687>a?this.buscarNivel(a):100;return parseInt(b)},this.expRestante=function(b,c){c=c||100;var d=a.expLvl[c-1]||581687;return parseInt(d-b)},this.calcularExpPorCasilla=function(b){for(var c={},d=0;d<a.expCasilla.length;d++)c[d]=Math.ceil(b/a.expCasilla[d]);return c},this.isGatheringTrue=function(b){for(var c=!1,d=0,e=a.gatherCraft.gather.length;e>d;d++)a.gatherCraft.gather[d]===b&&(c=!0);return c},this.removeBlank=function(a){for(var b in a)0===a[b].length&&delete a[b];return a},this.separarNumeros=function(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}}]),a.service("Crafts",["$http","$filter","CalculatorService",function(a,b,c){this.list,this.recipes,this.setRecipes=function(){var a={};return angular.forEach(this.list,function(b,c){var d={desplegado:!1,limiteRecursos:0,bloqueado:!1,inutil:!1,cantidad:0,recipes:{}};angular.forEach(b,function(a,b){d.recipes[b]={calcRecipe:!1,toggleCalcRecipe:function(){this.calcRecipe=!this.calcRecipe}}}),a[c]=d}),a},this.get=function(b){var d=this;return NProgress.start(),a.get("JSON/"+b.toLowerCase()+".json",{cache:!0}).success(function(a){d.list=c.removeBlank(a[b]),d.recipes=d.setRecipes(),NProgress.done()})}}])}(),function(){"use strict";var a=angular.module("DofusExpCalculator");a.directive("profesionesLista",function(){return{restrict:"E",scope:{profession:"="},controller:"ProfessionsController",templateUrl:"views/templates/professions_template.html"}}),a.directive("errorMsg",function(){return{restrict:"E",scope:!0,templateUrl:"views/templates/error.html"}}),a.directive("showLevel",function(){return{restrict:"E",scope:!0,templateUrl:"views/templates/show_level_template.html"}}),a.directive("professionGathering",function(){return{restrict:"E",scope:!0,templateUrl:"views/templates/profession_gathering.html"}}),a.directive("slots",function(){return{restrict:"E",scope:{profession:"=",results:"=",slots:"@"},templateUrl:"views/templates/slots.html",link:function(a){var b=a.slots,c=a.results.slots[b];a.toggleDesplegar=function(){c.desplegado=!c.desplegado},c.bloqueado=a.results.blocked(a.profession.levelInicial,b),c.inutil=a.results.useless(a.profession.levelInicial,b),c.cantidad=a.results.cantidadCrafts(b)}}}),a.directive("recetas",function(){return{restrict:"E",templateUrl:"views/templates/recetas.html"}})}(),function(){"use strict";var a=angular.module("DofusExpCalculator");a.filter("noSpace",function(){return function(a){a&&a.replace(" ","")}})}(),function(){"use strict";var a=angular.module("DofusExpCalculator");a.controller("MainController",["$scope","$routeParams","$location",function(a,b,c){a.isProfession=function(){return-1!==c.path().indexOf("profession")}}]),a.controller("ProfessionsController",["$scope","$routeParams","CalculatorService","DbService",function(a,b,c,d){var e=c,f=d;a.getWarning=function(){return a.profession.level>a.profession.levelInicial?!1:!0},a.checked=function(b){return a.profession.name===b?!0:!1},a.profession={name:b.profession,level:parseInt(b.level)||100,exp:parseInt(b.exp)||0,list:f.Professions,loadedInfo:function(){return!a.getWarning()&&!!this.name}},a.profession.levelInicial=e.levelInicial(a.profession.exp),a.profession.expRestante=e.expRestante(a.profession.exp,a.profession.level)}]),a.controller("ResultsController",["$scope","$http","CalculatorService","DbService","Crafts",function(a,b,c,d,e){a.profession;if(!a.getWarning()){a.gatheringList=d.gathering[a.profession.name];var f=c.calcularExpPorCasilla(a.profession.expRestante),g=function(a){return f[a-1]};a.results={listaCantidades:f,cantidadCrafts:g,blocked:c.blockedLevel,useless:c.isUseless,isGathering:c.isGatheringTrue(a.profession.name),slots:{}};var h=e.get(a.profession.name);h.success(function(){a.crafts=e.list,a.results.slots=e.recipes})}}]),a.controller("HunterController",["$scope","$routeParams",function(a,b){a.returnCalculator=function(){return b.calculator},a.isButcher="butcher"===a.returnCalculator(),a.isHunter="hunter"===a.returnCalculator(),a.isHunterButcher=!a.returnCalculator()||"hunter_butcher"===a.returnCalculator(),a.hunterOrButcher=function(){var b=a.returnCalculator(),c=b.split("_");return 2===c.length?"totals":c[0]}}]),a.controller("HunterCalculatorController",["$scope","HunterFactory",function(a,b){b.profession=a.hunterOrButcher(),b.putRecipes(),a.hunterButcher={search:"",profession:a.hunterOrButcher(),recipes:b.recipes,ingredients:b.recipes.ingredients,recipesToCalc:{},ingredientsToCalc:{},isSearched:function(a){return-1!==a.toLowerCase().indexOf(this.search.toLowerCase())},setQuantityIngredient:function(a,b){return b?a*b:a},addIngredient:b.addIngredient,addRecipe:b.addRecipe,delIngredient:b.delIngredient,delRecipe:b.delRecipe,calculateQuantity:b.calculateQuantity,getFinalStats:b.getFinalStats},a.helper={needComa:function(a,b){var c=this.keysLength(b),d="object"==typeof this.value,e=d||a===c-1;return e?"":", "},keysLength:function(a){return Object.keys(a).length}}}])}(),angular.module("DofusExpCalculator").factory("HunterFactory",["$http","CalculatorService","$filter",function(a,b,c){var d={},e="JSON/";return d.recipes={hunter:{},butcher:{},totals:{},ingredients:{}},d.profession="",d.orderTotals=function(){var a=this.recipes.butcher,b=this.recipes.hunter,d=this.recipes.ingredients,e={};angular.forEach(a,function(a,c){angular.forEach(a,function(f,g){!d[g]&&b[g]&&(angular.forEach(b[g],function(b,c){g===c?a[g]+=b:a[c]=b}),e[c]=a)})}),this.recipes.totals=e,console.log(c("json")(e))},d.putRecipes=function(){var c=this;return a.get(e+"hunter_in_butcher.json",{cache:!0}).success(function(a){angular.forEach(a,function(a,d){c.recipes[d]=b.removeBlank(a)})})},d.addRecipe=function(a){var b=this.recipes[this.profession][a],c={ingredients:b,quantity:1};this.recipesToCalc[a]?this.recipesToCalc[a].quantity++:(this.recipesToCalc[a]=c,this.addIngredient(b)),this.search=""},d.addIngredient=function(a){{var b=this;this.profession}angular.forEach(a,function(c,d){var e=b.ingredientsToCalc[d],f=b.recipes.ingredients[d];!e&&f?b.ingredientsToCalc[d]={quantity:parseInt(c,10)}:e&&f&&(b.ingredientsToCalc[d].quantity+=parseInt(a[d],10))})},d.delRecipe=function(a){var b=this.recipesToCalc[a];this.delIngredient(b),delete this.recipesToCalc[a]},d.delIngredient=function(a){var b=this,c=a.ingredients;angular.forEach(c,function(a,c){var d=b.ingredientsToCalc[c],e=b.recipes.ingredients[c];d&&e&&(b.ingredientsToCalc[c].quantity-=a),d&&0==d.quantity&&delete b.ingredientsToCalc[c]})},d.calculateQuantity=function(a,b){var c=this.recipesToCalc,d=0;return angular.forEach(c,function(a){var c=a.quantity||1;a.ingredients[b]&&(d+=a.ingredients[b]*c)}),this.ingredientsToCalc[b].totalQuantity=d,this.ingredientsToCalc[b].totalPrice=this.recipes.ingredients[b].price*d,this.ingredientsToCalc[b].totalPods=this.recipes.ingredients[b].pods*d,this.ingredientsToCalc[b]},d.getFinalStats=function(){var a=this.ingredientsToCalc,b=0,c=0;return angular.forEach(a,function(a){b+=a.totalPrice,c+=a.totalPods}),{price:b,pods:c}},d}]);