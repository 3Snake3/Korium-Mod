const getTex = tex => Core.atlas.find("koriummod-" + tex);

//weapons

const swordWeapon = extendContent(Weapon, "sword-weapon", {
    reload: 10,
    x: 4,
    y: 2,
    top: false,
    ejectEffect: Fx.casing1,
    bullet: Bullets.standardCopper,
});

//units

const sword = extendContent(UnitType, "sword", {
	
    localizedName: "Sword",
    description: "---",
	
    speed: 0.55,
    hitSize: 9,
    health: 320,
	
	init(){
        this.super$init();
        this.weapons.add(swordWeapon)
    }
})

sword.constructor = () => extend(MechUnit, {})