const norium = Vars.content.getByName(ContentType.item, "koriummod-norium");
const korium = Vars.content.getByName(ContentType.item, "koriummod-korium");

//NORIUM SOLAR PANEL

const noriumPanel = extendContent(SolarGenerator, "norium-solar-panel", {
    
    localizedName: "Norium solar panel",
    description: "abogus",

    category: Category.power,
    buildVisibility: BuildVisibility.shown,

    size: 3,
    health: 170,
    powerProduction: 2.5,

});

noriumPanel.requirements = ItemStack.with(norium, 140, Items.metaglass, 75);

//KORIUM POWER NODE

const koriumPowerNode = extendContent(PowerNode, "korium-power-node", {
	
	localizedName: "Korium power node",
	description: "With the help of Korium, it transmits energy over long distances and a large number of points",
	
	size: 2,
	health: 300,
	maxNodes: 48,
	laserRange: 26.8,
	
	category: Category.power,
	buildVisibility: BuildVisibility.shown,
	
	laserColor1: Color.valueOf("#4e4b64"),
    laserColor2: Color.valueOf("#676386"),

});

koriumPowerNode.requirements = ItemStack.with(korium, 42);

//KORIUM BATTARY LARGE

const koriumBatteryLarge = extendContent(Battery, "korium-battery-large", {
	
	localizedName: "Large Korium battery",
	description: "amogus dun tun tudun",
	
	category: Category.power,
	buildVisibility: BuildVisibility.shown,
	
	size: 3,
	hasPower: true,
	
});

koriumBatteryLarge.consumes.powerBuffered(105000);
koriumbatteryLarge.requirements = ItemStack.with(korium, 150, Items.lead, 80);
