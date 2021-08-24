const korium = Vars.content.getByName(ContentType.item, "koriummod-korium");

function ChargingWall(name, maxChargeStages, reqCharge, stageUpgradeMultiplier, additionally){
	
	var a = additionaly;
	
	this = extendContent(Wall, name, {
		
		localizedName: a.ocalizedName,
	    description: a.description,
	
	    buildVisibility: BuildVisibility.shown,
	    category: Category.defense,
		
	    size: a.size,
	    health: a.health,
	
        requirements: a.requirements,
	})
	
	var block = this;
	
	this.buildType = function(){
		return extendContent(Wall.WallBuild, block, {
			
			charge: 0,
			chargeStage: 1,
			maxChargeStage: maxChargeStages,
			
			upgradeMultiplier: stageUpgradeMultiplier,
			requiredCharge: reqCharge,
			
			damage(d){
				
				this.charge += d / 10;
				
				this.checkStages();
				
                print("Special damage (" + d + "), ");
		        this.super$damage(d);
            },
			
			checkStages(){
				
				if(this.chargeStage > this.maxChargeStage){
					this.chargeStage = this.maxChargeStage;
				}else{
					
				    if(this.charge >= (this.requiredCharge * this.chargeStage)){
						
						if(!(this.chargeStage >= this.maxChargeStage)){
														
							this.charge = 0;
							this.chargeStage++;
							
						    print("Update Charge Stage to" + this.chargeStage);
						}
					}
				}
			},
			
//		      onDestroyed(){
//			      this.super$onDestroyed();
//				
//				  Sounds.spark.at(this.tile);
//
//                Damage.damage(this.x, this.y, this.upgradeMultiplier * this.chargeStage * tilesize, 10 * (this.upgradeMultiplier * this.chargeStage) * 4);
//
//                //Effect.shake(2, 5, this.x, this.y);
//                //explodeEffect.at(x, y);
//				
//                print("EXPLOSION OF THE " + this.chargeStage + " CHARGE STAGE WALL, ");
//		  	  },
		})
	}
}

const koriumWall = new ChargingWall("korium-wall", 5, 10, 1.3, {
	
	localizedName: "Korium wall",
	description: "--",
	
	buildVisibility: BuildVisibility.shown,
	category: Category.defense,
		
	size: 1,
	health: 410,
	
    requirements: ItemStack.with(korium, 6),
});



//setLightning(koriumWall);
	
//////////////////////////////////////////////////////////////////////////////////
	
/*
const koriumWallLarge = newWall("korium-wall-large", "Large Korium wall", 1640, 2);
    koriumWallLarge.requirements = ItemStack.with(korium, 24);
	setLightning(koriumWallLarge);
*/






