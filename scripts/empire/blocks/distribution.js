const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");
const kapronit = Vars.content.getByName(ContentType.item, "koriummod-kapronit");
const omnidium = Vars.content.getByName(ContentType.item, "koriummod-omnidium");

const kapronitConveyor = extendContent(ArmoredConveyor, "kapronit-conveyor", {
	
	localizedName: "Kapronit conveyor",
	category: Category.distribution,
	buildVisibility: BuildVisibility.shown,
	
	health: 210,
	speed: 0.06,
	displayedSpeed: 8.25,
	
});

kapronitConveyor.requirements = ItemStack.with(kapronit, 1, Items.thorium, 1, Items.metaglass, 1);

const kapronitRouter = extendContent(Router, "kapronit-router", {
	
	localizedName: "Kapronit conveyor",
	category: Category.distribution,
	buildVisibility: BuildVisibility.shown,	
	
	health: 85,
	speed: 7.1,//YESS SLOWLY
	buildCostMultiplier: 2,

});

kapronitRouter.requirements = ItemStack.with(kapronit, 12);

const kapronitUnloader = extendContent(Unloader, "kapronit-unloader", {//THIIIS IS STOOOOOOOOOORAAAAGEEEEEEEEEE NO DISTRIBUTION!!!!!!

	localizedName: "Kapronit unloader",
	category: Category.effect,
	buildVisibility: BuildVisibility.shown,

    speed: 5.40,//HMMMMMMMMMMMMMM
    group: BlockGroup.transportation,
	
});

kapronitUnloader.requirements = ItemStack.with(kapronite, 35, Items.silicon, 25);

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

omnidiumConveyor.requirements = ItemStack.with(omnidium, 10, Items.lead, 8);
