function node(parent2, block, requirements, objectives){
	var parent = TechTree.all.find(node => node.content == parent2);
	var node = new TechTree.TechNode(parent, block, requirements);
	
	node.objectives.add(objectives);
}; 

function newLiquid(name, realName, temperature, viscosity, flammability, explosiveness, heatCapacity){
	const liquid = extendContent(Liquid, name, {});
	liquid.temperature = temperature;
	liquid.viscosity = viscosity;
	liquid.flammability = flammability;
	liquid.explosiveness = explosiveness;
	liquid.heatCapacity = heatCapacity;
	//liquid.effect = effect;
	return liquid;
};

const procionit = newLiquid("procionit", "Procionit", 0.40, 0.5, 0.0, 0.0, 0.0);
