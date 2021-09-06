const getTex = tex => Core.atlas.find("koriummod-" + tex);

const sword = extendContent(UnitType, "sword", {
	
    localizedName: "Sword",
    description: "---",
	
    speed: 0.55,
    hitSize: 9,
    health: 320,
	
	init(){
        this.weapons.add(
		    extend(Weapon, "sword-weapon", {
				load(){
					this.region = getTex(this.name);
					this.outlineRegion = getTex(this.name + "-outline");
					/*this.heatRegion =*/
				},
				
                reload: 10,
                x: 4,
                y: 2,
                top: false,
                ejectEffect: Fx.casing1,
                bullet: Bullets.standardCopper,
            })
		)
		this.super$init();
    }
})

sword.constructor = () => extend(MechUnit, {})