const korium = Vars.content.getByName(ContentType.item, "koriummod-korium");
const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");

const sironShield = extendContent(ForceProjector, "siron-shield", {
  
    localizedName: "Siron shield",
    description: "abmogubuga",
	
    category: Category.effect,
    buildVisibility: BuildVisibility.shown,
	
    size: 4,
    health: 900,
    phaseUseTime: 110,
    phaseRadiusBoost: 17,
    radius: 210,
    shieldHealth: 1850,
    cooldownNormal: 3.5,
    cooldownLiquid: 1.7,
    cooldownBrokenBase: 2.5,
    basePowerDraw: 8.0,
    canOverdrive: true,

    requirements: ItemStack.with(siron, 120, Items.titanium, 95, Items.silicon, 115),
	
    buildType: prov(() => {
        var entity = extend(ForceProjector.ForceBuild, sironShield,{
			
            drawShield(){
				
                if(!this.broken){
                    var radius = this.realRadius();

                    Draw.z(Layer.shields);

                    Draw.color(Tmp.c1.set(this.team.color).lerp(korium.color, this.phaseHeat), Color.white, Mathf.clamp(this.hit));

                    if(Core.settings.getBool("animatedshields")){
                        Fill.poly(this.x, this.y, 6, radius);
                    }else{
                        Lines.stroke(1.5);
                        Draw.alpha(0.09 + Mathf.clamp(0.08 * this.hit));
                        Fill.poly(this.x, this.y, 6, radius);
                        Draw.alpha(1);
                        Lines.poly(this.x, this.y, 6, radius);
                        Draw.reset();
						
                    }
					
                }

            Draw.reset();
			
            }
        });
		
    return entity;
	}),
});

sironShield.consumes.item(korium).boost();
sironShield.consumes.power(11.1);


