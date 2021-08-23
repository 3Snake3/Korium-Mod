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

const koriumWall = extendContent(Wall, "korium-wall", {
	
	localizedName: "Korium wall",
	description: "--",
	
	buildVisibility: BuildVisibility.shown,
	category: Category.defense,
		
	size: 1,
	health: 410,
	
    requirements: ItemStack.with(korium, 6),
});

koriumWall.buildType = () => {
	const ent = extendContent(Wall.WallBuild, koriumWall, {
    
	    charge: 0,
		
		init(){
            this.getBARS();
            
            this.maxHealth = this.koriumWall().maxHealth;
            //this.health = this.koriumWall().consHealth;
            
            return this.super$init();
        },
	
	    display(table){
			table.table(cons(bars => {
                bars.defaults().growX().height(18).pad(4);

                this.BARS.each(bar => {
                    table.add(bar).growX();
                    table.row();
                });

            })).growX();
            table.row();
		},
		
		getBARS(){
			this.BARS = new Seq();
            
            this.BARS.add(new Bar(Core.bundle.get("stat.health"), Pal.lancerLaser, floatp(() => this.healthcf())));
            this.BARS.add(new Bar(Core.bundle.get("stat.charge"), Pal.accent, floatp(() => this.phasef())));
		},
	});
	return ent;
};

setLightning(koriumWall);
	
//////////////////////////////////////////////////////////////////////////////////
	
/*
const koriumWallLarge = newWall("korium-wall-large", "Large Korium wall", 1640, 2);
    koriumWallLarge.requirements = ItemStack.with(korium, 24);
	setLightning(koriumWallLarge);
*/
