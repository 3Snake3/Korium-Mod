const korium = Vars.content.getByName(ContentType.item, "koriummod-korium");
const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");
const kapronite = Vars.content.getByName(ContentType.item, "koriummod-kapronite");

const fragKorium = extendContent(FlakBulletType, 4.5, 15, {
            ammoMultiplier: 4,
            splashDamage: 54 * 1.5,
            splashDamageRadius: 42,
            lightning: 4,
            lightningLength: 11,
			lightningColor: korium.color,
            shootEffect: Fx.shootBig,
            collidesGround: true,
            explodeRange: 20,
});

const fragSiron = extendContent(FlakBulletType, 3, 19, {
            splashDamageRadius: 30,
            splashDamage: 20 * 1.5,
			
            fragBullet: extendContent(BasicBulletType, 2, 15, "bullet", {
                width: 11,
                height: 12,
                shrinkY: 1,
                lifetime: 15,
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
            explodeRange: 20,
});

const vortex = extendContent(ItemTurret, "vortex", {
	
	localizedName: "Vortex",
    description: "Cyclon upgrade",
	
    category: Category.turret,
    buildVisibility: BuildVisibility.shown,

    xRand: 5,
    reloadTime: 6,
    range: 225,
    size: 3,
    recoilAmount: 3,
    rotateSpeed: 10,
    inaccuracy: 11,
    shootCone: 35,
    shootSound: Sounds.shootSnap,

    health: 1755,
});

vortex.requirements = ItemStack.with(kapronite, 300, Items.titanium, 155, siron, 95);

vortex.ammo(
                korium, fragKorium,
                Items.plastanium, Bullets.fragPlastic,
                siron, fragSiron
);