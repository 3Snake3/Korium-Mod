const korium = Vars.content.getByName(ContentType.item, "koriummod-korium");
const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");
const kapronite = Vars.content.getByName(ContentType.item, "koriummod-kapronite");

//bullets

const fragKorium = extendContent(FlakBulletType, 4.5, 14, {
    ammoMultiplier: 4,
    splashDamage: 54 * 1.5,
    splashDamageRadius: 42,
    lightning: 4,
    lightningLength: 11,
	lightningColor: korium.color,
    shootEffect: Fx.shootBig,
    explodeRange: 20,
});

const fragSiron = extendContent(FlakBulletType, 3.8, 19, {
    splashDamageRadius: 30,
    splashDamage: 20 * 1.5,
			
    fragBullet: extendContent(BasicBulletType, 2.4, 11, "bullet", {
        width: 11,
        height: 12,
        shrinkY: 1,
        lifetime: 19,
        frontColor: Color.valueOf("#862424"),
        backColor: Color.valueOf("#6c1717"),
        despawnEffect: Fx.none,
    }),
			
    fragBullets: 5,
    hitEffect: Fx.plasticExplosion,
    frontColor: Color.valueOf("#862424"),
    backColor: Color.valueOf("#6c1717"),
    shootEffect: Fx.shootBig,
    collidesGround: true,
    explodeRange: 22,
});

const bigArtillery = extendContent(ArtilleryBulletType, 2.4, 33.7, {
	lifeTime: 132,
	splashDamageRadius: 32,
	splashDamage: 18 * 1.9,
	fragLifeMin: 0.7,
	lightRadius: 47,
    lightColor: Items.pyratite.color,
    lightOpacity: 0.72,
	width: 29.6,
	height: 29.2,
	incendAmount: 15,
    incendSpread: 26,
	collides: true,
    collidesTiles: true,
    makeFire: true,
	
	fragBullet: extendContent(FlakBulletType, 2.1, 15, {
		lifeTime: 52,
		splashDamageRadius: 23,
		splashDamage: 11 * 1.2,
		fragLifeMin: 0.4,
		lightRadius: 28,
        lightColor: Items.pyratite.color,
        lightOpacity: 0.49,
		width: 18.9,
		height: 19,
		collides: true,
        collidesTiles: true,
        makeFire: true,
		
		fragBullet: extendContent(BasicBulletType, 0.9, 7, {
			width: 11,
            height: 12,
            shrinkY: 1,
            lifetime: 19,
			lightRadius: 11,
            lightColor: Items.pyratite.color,
            lightOpacity: 0.2,
            frontColor: Items.pyratite.color,
            despawnEffect: Fx.none,
			collides: true,
            collidesTiles: true,
            makeFire: true,
		}),
		
		fragBullets: 5,
	}),
	
	fragBullets: 15,
});

//turrets

const vortex = extendContent(ItemTurret, "vortex", {
	
	localizedName: "Vortex",
    description: "Cyclon upgrade",
	
    category: Category.turret,
    buildVisibility: BuildVisibility.shown,

    size: 3,
	health: 1755,

    xRand: 5,
    reloadTime: 17,
    range: 225,
    recoilAmount: 3,
    rotateSpeed: 10,
    inaccuracy: 11,
    shootCone: 35,
    shootSound: Sounds.shootSnap,
});

vortex.requirements = ItemStack.with(kapronite, 300, Items.titanium, 155, siron, 95);
vortex.ammo(
    korium, fragKorium,
    Items.plastanium, Bullets.fragPlastic,
    siron, fragSiron
);

const burningSky = extendContent(ItemTurret, "burning-sky", {
	
	localizedName: "The Burning sky",
    description: "BOOM",
	
    category: Category.turret,
    buildVisibility: BuildVisibility.shown,
	
	size: 4,
	health: 2950,
	
	range: 350,
	minRange: 110,
	shots: 7,
	inaccuracy: 19.8,
	reloadTime: 297,
	cooldown: 0.06,
	velocityInaccuracy: 0.4,
	recoilAmount: 15,
	targetAir: false,
	shootSound: Sounds.artillery,
	xRand: 11,
});

burningSky.requirements = ItemStack.with(kapronite, 850, siron, 540, Items.silicon, 350, Items.metaglass, 120);
burningSky.ammo(
    Items.pyratite, bigArtillery
);