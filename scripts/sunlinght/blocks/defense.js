const korium = Vars.content.getByName(ContentType.item, "koriummod-korium");

function newWall(name, realName, health, size){
	
    const wall = extendContent(Wall, name, {
		
		localizedName: realName,
		buildVisibility: BuildVisibility.shown,
		category: Category.defense,
		
	    size: size,
	    health: health,
		
	});

    return wall;
};

function setLightning(obj){
    obj.insulated = true;
    obj.absorbLasers = true;
    obj.schematicPriority = 10;
    obj.lightningChance = 0.42;
    obj.lightningDamage = 38;
	obj.lightningLength = 24;
	obj.lightningColor = korium.color;
};

const koriumWall = newWall("korium-wall", "Korium wall", 410, 1);
    koriumWall.requirements = ItemStack.with(korium, 6);
    setLightning(koriumWall);
	
const koriumWallLarge = newWall("korium-wall-large", "Large Korium wall", 1640, 2);
    koriumWallLarge.requirements = ItemStack.with(korium, 24);
	setLightning(koriumWallLarge);

