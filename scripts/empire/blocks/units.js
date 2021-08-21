const omnidium = Vars.content.getByName(ContentType.item, "koriummod-omnidium");
const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");
const kapronite = Vars.content.getByName(ContentType.item, "koriummod-kapronite");

const sword = Vars.content.getByName(ContentType.unit, "koriummod-sword");

const omnidiumGroundFactory = extendContent(UnitFactory, "omnidium-ground-factory", {
		
	localizedName: "Omnidium ground factory",
    description: "---",
	
	category: Category.units,
    buildVisibility: BuildVisibility.shown,
	
	size: 3,
});

omnidiumGroundFactory.requirements = ItemStack.with(kapronite, 120, omnidium, 80, Items.titanium, 50);
omnidiumGroundFactory.consumes.power(3.2);

omnidiumGroundFactory.plans = Seq.with(
    new Packages.mindustry.world.blocks.units.UnitFactory.UnitPlan(sword, 60 * 24, ItemStack.with(omnidium, 20, siron, 15))
);