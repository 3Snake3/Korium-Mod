const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");
const procionite = Vars.content.getByName(ContentType.liquid, "koriummod-procionite");
const kapronite = Vars.content.getByName(ContentType.item, "koriummod-kapronite");
const korium = Vars.content.getByName(ContentType.item, "koriummod-korium");

//FUNCTIONS////////////////////////////////////////////////////////////////////////////

function newFloor(name, realName, variants, speedMultiplier, emitLight, lightRadius, lightColor){
  const floor = extendContent(Floor, name, {});
  floor.localizedName = realName;
  floor.variants = variants;
  floor.speedMultiplier = speedMultiplier;
  floor.emitLight = emitLight;
  floor.lightRadius = lightRadius;
  if(lightColor != 0){
  floor.lightColor = Color.valueOf(lightColor);
  }
  return floor;
}


function newLiquidFloor(name, realName, variants, speedMultiplier, isDeep){
  const liqFloor = extendContent(Floor, name, {});
  liqFloor.localizedName = realName;
  liqFloor.isLiquid = true;
  liqFloor.variants = variants;
  liqFloor.speedMultiplier = speedMultiplier;
  liqFloor.cacheLayer = CacheLayer.water;
  liqFloor.albedo = 0.5;
  if(isDeep){
     liqFloor.status = StatusEffects.wet;
     liqFloor.statusDuration = 90;
  }
  return liqFloor;
}


function newBlock(name, realName, variants){
  const StaticBlock = extendContent(StaticWall, name, {});
  StaticBlock.localizedName = realName;
  StaticBlock.variants = variants;
  return StaticBlock;
}


function newLightBlock(name, realName, variants, lightRadius, lightColor){
  const LightBlock = extendContent(Block, name, {});
  LightBlock.localizedName = realName;
  LightBlock.emitLight = true;
  LightBlock.lightRadius = lightRadius;
  LightBlock.lightColor = Color.valueOf(lightColor);
  LightBlock.breakable = false;
  LightBlock.instantDeconstruct = true;
  LightBlock.variants = variants;
  LightBlock.cacheLayer = CacheLayer.walls;
  return LightBlock;
}


function newBoulder(name, realName, variants){
  const boulder = extendContent(Prop, name, {});
  boulder.localizedName = realName;
  boulder.variants = variants;
  return boulder;
}


function newPine(name, realName, variants){
  const pine = extendContent(StaticTree, name, {});
  pine.localizedName = realName;
  pine.variants = variants;
  return pine;
}


//ATTRIBUTES and OTHER write separately!!!

//CONTENT/////////////////////////////////////////////////////////////////////////////////

const koriumBlock = newBlock("korium-block", "Korium Block", 2);
const koriumBoulder = newBoulder("korium-boulder", "Korium Boulder", 2);
const koriumFloor = newFloor("korium-floor", "Korium Floor", 3, 1.0, false, 0, 0);
koriumFloor.asFloor().wall = koriumBlock;
koriumFloor.asFloor().decoration = koriumBoulder;


const procionitBlock = newBlock("procionit-block", "Procionit Block", 1);
const procionitIce = newFloor("procionit-ice", "Procionit Ice", 3, 0.9, false, 0, 0);

const liquidProcionite = newLiquidFloor("liquid-procionite", "Liquid Procionite", 0, 0.20, true);
  liquidProcionite.cacheLayer = CacheLayer.tar;
  liquidProcionite.liquidDrop = procionite;
  liquidProcionite.emitLight = true;
  liquidProcionite.lightRadius = 31;
  liquidProcionite.lightColor = Color.valueOf("534660");
  liquidProcionite.status = StatusEffects.melting;
  liquidProcionite.statusDuration = 240;
  
const procionitUnits = newBlock("procionit-units", "Units in Procionit", 1);

//const darkProcionitBlock = newBlock();

//ORES

const oreSiron = extendContent(OreBlock, "oreSiron", {
	
	localizedName: "Ore Siron",
	itemDrop: siron,
	
	oreThreshold: 0.889,
    oreScale: 25.550152,
	
});

const orekapronite = extendContent(OreBlock, "oreKapronite", {
	
	localizedName: "Ore Kapronite",
	itemDrop: kapronite,
	
	oreThreshold: 0.872,
    oreScale: 24.720340,
	
});

const oreKorium = extendContent(OreBlock, "oreKorium", {
	
	localizedName: "Ore Korium",
	itemDrop: korium,
	
});
