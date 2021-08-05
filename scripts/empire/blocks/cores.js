

//FUNCTIONS

function newEmpireCore(name, health, size, item, colich, itemCapacity, unitCapModifier, unitType){
    const core = extendContent(CoreBlock, name, {});
    core.buildVisibility = BuildVisibility.shown;
	core.size = size;
	core.health = health;
    core.category = Category.effect;
	core.itemCapacity = itemCapacity;
	core.unitCapModifier = unitCapModifier;
	core.unitType = unitType;
    core.requirements = ItemStack.with(item, colich);
    return core;
};

//CORE "STAR"

const coreStar = extendContent(CoreBlock, "core-star", {
    
    localizedName: "Core Star",
    description: "aboba",

    category: Category.effect,
    buildVisibility: BuildVisibility.shown,

    size: 4,

});

coreStar.requirements = ItemStack.with();
newEmpireCore("core-star", 2100, 3, siron, 700, 6000, 20, UnitTypes.gamma);
