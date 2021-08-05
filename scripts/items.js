function node(parent2, block, requirements, objectives){
	var parent = TechTree.all.find(node => node.content == parent2);
	var node = new TechTree.TechNode(parent, block, requirements);
	
	node.objectives.add(objectives);
}; 

function newItem(name, realName, hardness, flammability, radioactivity, explosiveness, color){
    const item = extendContent(Item, name, {});
	item.localizedName = realName;
	item.color = Color.valueOf(color);
	item.hardness = hardness;
	item.flammability = flammability;
	item.radioactivity = radioactivity;
	item.explosiveness = explosiveness;
	return item;
};

const korium = newItem("korium", "Korium", 3.0, 0.0, 0.6, 0.0, "#8276a6");
const omnidium = newItem("omnidium", "Omnidium", 0.0, 0.0, 0.3, 0.0, "#a21a90");//change color
const norium = newItem("norium", "Norium", 0.0, 0.0, 0.3, 0.0, "#a21a90");//BL
const siron = newItem("siron", "Siron", 6.0, 0.0, 9.4, 0.1, "#6c1717");
const procionit = newItem("frozen-procionit", "Frozen Procionit", 4.0, 0.0, 0.0, 0.0, "#656469");