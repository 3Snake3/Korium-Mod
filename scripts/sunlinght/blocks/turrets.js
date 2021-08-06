//ZEUS-1//

const zeus1 = extendContent(PowerTurret, "zeus-1", {
	
	localizedName: "Zeus-1",
	description: "Electric turret, releases three lightning bolts punching enemies and shocking them",
	
	shootType: extend(LightningBulletType, {
        damage: 30,
        lightningLength: 30,
        collidesAir: false,
        ammoMultiplier: 1,
    }),
	
	size: 2,
	rotateSpeed: 4,
	reloadTime: 28,
	powerUse: 5.4,
	targetAir: false,
	targetGround: true,
	range: 165,
	shootEffect: Fx.lightningShoot,
    heatColor: Color.red,
    recoilAmount: 1,
	health: 1100,
	shootSound: Sounds.spark,
	shots: 3,
	shootCone: 35,

    category: Category.turret,
	buildVisibility: BuildVisibility.shown,
    
});

zeus1.requirements = ItemStack.with(Items.copper, 100, Items.lead, 50, Items.titanium, 80);

//ZEUS-2//


const zeus2 = extendContent(PowerTurret, "zeus-2", {
	
	localizedName: "Zeus-2",
	description: "Improved version of the Zeus-1 turret, deals more damage and can attack air units",
	
	shootType: extend(LightningBulletType, {
        damage: 45,
        lightningLength: 35,
        collidesAir: true,
        ammoMultiplier: 1,
		lightningColor: Color.valueOf("#8276a6"),
    }),
	
	size: 2,
	rotateSpeed: 3.80,
	reloadTime: 25,
	powerUse: 6.1,
	targetAir: true,
	targetGround: true,
	range: 170,
	shootEffect: Fx.lightningShoot,
    heatColor: Color.red,
    recoilAmount: 1,
	health: 1150,
	shootSound: Sounds.spark,
	shots: 4,
	shootCone: 35,

    category: Category.turret,
	buildVisibility: BuildVisibility.shown,
    
});

zeus2.requirements = ItemStack.with(Items.copper, 110, Items.lead, 50, Vars.content.getByName(ContentType.item, "koriummod-korium"), 90);