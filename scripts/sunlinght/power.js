const koriumPowerNode = extendContent(PowerNode, "korium-power-node", {
	
	localizedName: "Korium power node",
	description: "With the help of Korium, it transmits energy over long distances and a large number of points",
	
	size: 2,
	health: 300,
	maxNodes: 48,
	laserRange: 26.8,
	
	category: Category.power,
	buildVisibility: BuildVisibility.shown,
	
	laserColor1: Color.white,
    laserColor2: Color.valueOf("#8276a6"),
	
});

koriumPowerNode.requirements = ItemStack.with(Vars.content.getByName(ContentType.item, "koriummod-korium"), 42);
