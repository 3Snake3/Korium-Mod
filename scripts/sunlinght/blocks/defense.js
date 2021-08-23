const korium = Vars.content.getByName(ContentType.item, "koriummod-korium");

function ChargingWall(name, maxChargeStages, requiredCharge, stageUpgradeMultiplier, additionally){
	
	this = extendContent(Wall, name, additionally);
	const block = this;
	
	this.buildType = () => {
		return extendContent(Wall.WallBuild, block, {
			
			charge: 0,
			chargeStage: 1,
			maxChargeStages: maxChargeStages,
			
			upgradeMultiplier: stageUpgradeMultiplier,
			requiredCharge: requiredCharge,
			
			damage(damage){
				
				this.charge += damage / 10;
				
				this.checkStages();
				
                print("Special damage (" + damage + "), ");
		        this.super$damage(damage);
            },
			
			checkStages(){
				
				if(this.chargeStage >= this.maxChargeStage){
					this.chargeStage = this.maxChargeStage;
				}else{
					
				    if(this.charge >= (this.requiredCharge * this.chargeStage)){
						
						this.charge = 0;
						
						if(!(this.chargeStage >= this.maxChargeStage)){
							this.chargeStage++;
						    print("Update Charge Stage to" + this.chargeStage);
						}
					}
				}
			},
			
		    onDestroyed(){
			    this.super$onDestroyed();
				
				Sounds.spark.at(this.tile);

                Damage.damage(this.x, this.y, this.upgradeMultiplier * this.chargeStage * tilesize, 10 * (this.upgradeMultiplier * this.chargeStage) * 4);

                //Effect.shake(2, 5, this.x, this.y);
                //explodeEffect.at(x, y);
				
                print("EXPLOSION OF THE " + this.chargeStage + " CHARGE STAGE WALL, ");
			},
		});
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






