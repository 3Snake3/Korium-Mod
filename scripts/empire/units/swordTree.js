const getTex = tex => Core.atlas.find("koriummod-" + tex);

const sword = extendContent(UnitType, "sword", {
	
    localizedName: "Sword",
    description: "---",
	
    speed: 0.55,
    hitSize: 9,
    health: 320,
	
	init(){
        this.super$init();
        this.weapons.add(

            extendContent(Weapon, "sword-weapon", {
		        load(){
				
	                this.outlineRegion = getTex("sword-weapon-outline");
	                this.heatRegion = getTex("sword-weapon-heat");
	                this.region = getTex("sword-weapon");
	            }, 
				
				mirror: true,
				flip: true,
				alternate: true,
                reload: 10,
                x: 4,
                y: 2,
                top: false,
                ejectEffect: Fx.casing1,
                bullet: Bullets.standardCopper,
            })
        )
    }
})

sword.constructor = () => extend(MechUnit, {})