var changeParent = (child, newParent) => {
	var childNode = TechTree.get(child);
	var newParentNode = TechTree.get(newParent);
	childNode.parent.children.remove(childNode);
	newParentNode.children.add(childNode);	
};

function techNode(parent2, block, requirements) {
var parent = TechTree.all.find(node => node.content == parent2);
var node = new TechTree.TechNode(parent, block, requirements);
return node;
};

function createPhantomBlock(name, size) {
const PB = extendContent(Block, name, {});
PB.size = size;
//not change
PB.health = 0.1;
PB.buildVisibility = BuildVisibility.editorOnly;
return PB;
};

//Planets
const SerpuloPlanetIcon = createPhantomBlock("Planet Serpulo", 2);
SerpuloPlanetIcon.alwaysUnlocked = true;

//overrides
Time.run(10, () => {
Vars.ui.research.root = techNode(SerpuloPlanetIcon, Blocks.coreShard, ItemStack.empty);
});

Blocks.coreShard.alwaysUnlocked = false;