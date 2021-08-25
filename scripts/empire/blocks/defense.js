const korium = Vars.content.getByName(ContentType.item, "koriummod-korium");
const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");
const kapronite = Vars.content.getByName(ContentType.item, "koriummod-kapronite");

const sironShield = extendContent(ForceProjector, "siron-shield", {
  
    localizedName: "Siron shield",
    description: "",
	
    category: Category.effect,
    buildVisibility: BuildVisibility.shown,
	
    size: 4,
    health: 950,
    itemCapasity: 20,

    radius: 188.5,
    shieldHealth: 1750,
    cooldownNormal: 3.8,
    cooldownLiquid: 3.0,
    cooldownBrokenBase: 1.6,
	phaseUseTime: 170,
    phaseRadiusBoost: 18.1,
    //basePowerDraw: 8.0,hm
	
    buildType: prov(() => {
        var entity = extend(ForceProjector.ForceBuild, sironShield,{
			
            drawShield(){
				
                if(!this.broken){
                    var radius = this.realRadius();

                    Draw.z(Layer.shields);

                    Draw.color(this.team.color, Tmp.c1.set(Color.white).lerp(korium.color, this.phaseHeat), Mathf.clamp(this.hit));

                    if(Core.settings.getBool("animatedshields")){
                        Fill.poly(this.x, this.y, 8, radius);
                    }else{
                        Lines.stroke(1.5);
                        Draw.alpha(0.09 + Mathf.clamp(0.08 * this.hit));
                        Fill.poly(this.x, this.y, 8, radius);
                        Draw.alpha(1);
                        Lines.poly(this.x, this.y, 8, radius);
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

sironShield.requirements = ItemStack.with(siron, 120, Items.titanium, 95, Items.silicon, 115);

const titaniumShield = extendContent(ForceProjector, "titanium-shield", {
	
	localizedName: "Titanium shield",
    description: "",
	
    category: Category.effect,
    buildVisibility: BuildVisibility.shown,
	
    size: 3,
    health: 650,
    phaseUseTime: 105,
    phaseRadiusBoost: 12,
    radius: 145,
    shieldHealth: 1100,
    cooldownNormal: 2.8,
    cooldownLiquid: 1.5,
    cooldownBrokenBase: 1.9,
    basePowerDraw: 8.0,
	
	buildType: prov(() => {
        var entity = extend(ForceProjector.ForceBuild, titaniumShield,{
			
            drawShield(){
				
                if(!this.broken){
                    var radius = this.realRadius();

                    Draw.z(Layer.shields);

                    Draw.color(Tmp.c1.set(this.team.color).lerp(Items.titanium.color, this.phaseHeat), Color.white, Mathf.clamp(this.hit));

                    if(Core.settings.getBool("animatedshields")){
                        Fill.poly(this.x, this.y, 12, radius);
                    }else{
                        Lines.stroke(1.8);
                        Draw.alpha(0.09 + Mathf.clamp(0.08 * this.hit));
                        Fill.poly(this.x, this.y, 12, radius);
                        Draw.alpha(1);
                        Lines.poly(this.x, this.y, 12, radius);
                        Draw.reset();
                    }
					
                }

            Draw.reset();
			
            }
        });
		
    return entity;
	}),
});

titaniumShield.consumes.item(Items.titanium).boost();
titaniumShield.consumes.power(8.7);

titaniumShield.requirements = ItemStack.with(Items.graphenite, 140, Items.titanium, 240, Items.silicon, 170);
