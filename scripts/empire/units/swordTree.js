function getTex(tex){  return Core.atlas.find("koriummod-" + tex)  }

const sword = extendContent(UnitType, "sword", {
	
    localizedName: "Sword",
    description: "---",
	
    speed: 0.55,
    hitSize: 9,
    health: 320,
})

sword.constructor = () => extend(MechUnit, {});

sword.weapons.add(

    extendContent(Weapon, "sword-weapon", {
		
		    load(){
				
	            this.outlineRegion = getTex("sword-weapon-outline");
	            this.heatRegion = getTex("sword-weapon-heat");
	            this.region = getTex("sword-weapon");
	        }, 
			
            reload: 9,
            x: 4,
            y: 1,
            top: false,
            ejectEffect: Fx.casing1,
            bullet: Bullets.standardCopper,
    })
)