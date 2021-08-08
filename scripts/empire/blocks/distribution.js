const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");
const kapronite = Vars.content.getByName(ContentType.item, "koriummod-kapronite");
const omnidium = Vars.content.getByName(ContentType.item, "koriummod-omnidium");

const kaproniteConveyor = extendContent(ArmoredConveyor, "kapronite-conveyor", {
	
	localizedName: "kapronite conveyor",
	category: Category.distribution,
	buildVisibility: BuildVisibility.shown,
	
	health: 210,
	speed: 0.06,
	displayedSpeed: 8.25,
	
});

kaproniteConveyor.requirements = ItemStack.with(kapronite, 1, Items.thorium, 1, Items.metaglass, 1);

const kaproniteRouter = extendContent(Router, "kapronite-router", {
	
	localizedName: "kapronite conveyor",
	category: Category.distribution,
	buildVisibility: BuildVisibility.shown,	
	
	health: 85,
	speed: 7.1,//YESS SLOWLY
	buildCostMultiplier: 2,

});

kaproniteRouter.requirements = ItemStack.with(kapronite, 12);

const omnidiumBridge = extendContent(BufferedItemBridge, "omnidium-conveyor", {

    localizedName: "Omnidium brige conveyor",
	category: Category.distribution,
	buildVisibility: BuildVisibility.shown,
	
	size: 1,
    health: 55,
	range: 7,
	speed: 85.1,
	arrowSpacing: 5,
    bufferCapacity: 18,

});

omnidiumBridge.requirements = ItemStack.with(omnidium, 10, Items.lead, 8);
