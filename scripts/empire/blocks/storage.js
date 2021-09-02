const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");
const kapronite = Vars.content.getByName(ContentType.item, "koriummod-kapronite");

//CORE FLICKERING

const coreFlickering = extendContent(CoreBlock, "core-flickering", {
    
    localizedName: "Core Flickering",
    description: "aboba",

    category: Category.effect,
    buildVisibility: BuildVisibility.shown,

    size: 3,
    health: 2800,
    itemCapacity: 4500,
    unitType: UnitTypes.gamma,//TODO mod unit
    unitCapModifier: 10,

});

coreFlickering.requirements = ItemStack.with(Items.copper, 1500, siron, 1000, Items.graphite, 500, Items.lead, 200);

//CORE STAR

const coreStar = extendContent(CoreBlock, "core-star", {
    
    localizedName: "Core Star",
    description: "aboba",

    category: Category.effect,
    buildVisibility: BuildVisibility.shown,

    size: 4,
    health: 4800,
    itemCapacity: 9500,
    unitType: UnitTypes.gamma,//TODO mod unit
    unitCapModifier: 16,
    researchCostMultiplier: 0.08,
    thrusterLength: 32/4,

});

coreStar.requirements = ItemStack.with(Items.copper, 2000, siron, 3000, Items.graphite, 1000, Items.silicon, 2000);

//KAPRONITE UNLOADER

const kaproniteUnloader = extendContent(Unloader, "kapronite-unloader", {

	localizedName: "Kapronite unloader",
	category: Category.effect,
	buildVisibility: BuildVisibility.shown,

    speed: 5.40,//HMMMMMMMMMMMMMM
    group: BlockGroup.transportation,
	
});

kaproniteUnloader.requirements = ItemStack.with(kapronite, 35, Items.silicon, 25);

//KAPRONITE STORAGES

//BUDUT
