function getTex(tex){  return Core.atlas.find("koriummod-" + tex)  }

const sword = extendContent(UnitType, "sword", {
	
    localizedName: "Sword",
    description: "---",
	
    speed: 0.55,
    hitSize: 9,
    health: 320,
	
	init(){
        this.super$init();
        sword.weapons.add(

            extendContent(Weapon, "sword-weapon", {
		        load(){
				
	                this.outlineRegion = getTex("sword-weapon-outline");
	                this.heatRegion = getTex("sword-weapon-heat");
	                this.region = getTex("sword-weapon");
	            }, 
				
				mirror: true,
                reload: 9,
                x: 4,
                y: 1,
                top: false,
                ejectEffect: Fx.casing1,
                bullet: Bullets.standardCopper,
            })
        )
    }
})

sword.constructor = () => extend(MechUnit, {})