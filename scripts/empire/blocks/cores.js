const korium = koriummod-korium;
const siron = koriummod-siron;
const norium = koriummod-norium;

function node(parent2, block, requirements, objectives){
	var parent = TechTree.all.find(node => node.content == parent2);
	var node = new TechTree.TechNode(parent, block, requirements);
	
	node.objectives.add(objectives);
}; 

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

const coreStar = newEmpireCore("core-star", 2100, 3, siron, 700, 6000, 20, UnitTypes.gamma);