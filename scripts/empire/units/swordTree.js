const sword = extendContent(UnitType, "sword", {
	
    localizedName: "Sword",
    description: "---",
	
    speed: 0.55,
    hitSize: 9,
    health: 320,
	allowLegStep: false,
})

sword.weapons.add(
    extendContent(Weapon, "sword-weapon", {
            reload: 9,
            x: 5,
            y: 1,
            top: false,
            ejectEffect: Fx.casing1,
            bullet: Bullets.standardCopper,
    })
)

sword.constructor = () => { 
	const unit = extendContent(Unitc, {});
	return unit
}