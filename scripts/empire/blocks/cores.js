const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");

//CORE "STAR"

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

    thrusterLenght: 35/4,

});

coreStar.requirements = ItemStack.with(Items.copper, 2000, siron, 3000, Items.graphite, 1000, Items.silicon, 2000);
