const korium = koriummod-korium;
const siron = koriummod-siron;
const norium = koriummod-norium;

function node(parent2, block, requirements, objectives){
	var parent = TechTree.all.find(node => node.content == parent2);
	var node = new TechTree.TechNode(parent, block, requirements);
	
	node.objectives.add(objectives);
}; 

//WALLS

function newWall(name, health, size, item, colich, liCha, liDam, liLength, liColor){
    const wall = extendContent(Wall, name, {});
    wall.buildVisibility = BuildVisibility.shown;
	wall.size = size;
	wall.health = health;
    wall.category = Category.defense;
    wall.requirements = ItemStack.with(item, colich);
	wall.lightningChance = liCha;
	wall.lightningDamage = liDam;
    wall.lightningLength = liLength;
    wall.lightningColor = liColor;
    return wall;
};

const koriumWall = newWall("korium-wall", 475, 1, korium, 6, 0.25, 3, 4, Pal.surge);
const koriumWallLarge = newWall("korium-wall-large", 1900, 2, korium, 24, 1, 12, 16, Pal.surge);

const sironWall = newWall("siron-wall", 1305, 1, siron, 6, 0, 0, 0, Pal.surge);
const sironWallLarge = newWall("siron-wall-large", 5220, 2, siron, 24, 0, 0, 0, Pal.surge);

const noriumWall = newWall("norium-wall", 275, 1, norium, 6, 0, 0, 0, Pal.surge);
const noriumWallLarge = newWall("norium-wall-large", 1100, 2, norium, 24, 0, 0, 0, Pal.surge);
