
const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");
const procionit = Vars.content.getByName(ContentType.liquid, "koriummod-procionit");
const kapronit = Vars.content.getByName(ContentType.item, "koriummod-kapronit");

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

const liquidProcionit = newLiquidFloor("liquid-procionit", "Liquid Procionit", 0, 0.20, true);
  liquidProcionit.cacheLayer = CacheLayer.tar;
  liquidProcionit.liquidDrop = procionit;
  liquidProcionit.emitLight = true;
  liquidProcionit.lightRadius = 31;
  liquidProcionit.lightColor = Color.valueOf("#534660");
  liquidProcionit.status = StatusEffects.melting;
  liquidProcionit.statusDuration = 240;
  
const procionitUnits = newBlock("procionit-units", "Units in Procionit", 1);

//const darkProcionitBlock = newBlock();

//ORES

const oreSiron = extensContent(OreBlock, "ore-siron", {
	
	localizedName: "Ore Siron",
	itemDrop: siron,
	
	oreThreshold: 0.889,
    oreScale: 25.550152,
	
});

const oreKapronit = extensContent(OreBlock, "ore-kapronit", {
	
	localizedName: "Ore Kapronit",
	itemDrop: kapronit,
	
	oreThreshold: 0.872,
    oreScale: 24.720340,
	
});

const oreKorium = extensContent(OreBlock, "ore-korium", {
	
	localizedName: "Ore Korium",
	itemDrop: korium,
	
});