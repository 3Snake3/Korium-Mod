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
	
	drawPlace(x, y, rotation, valid){
        this.super$drawPlace(x, y, rotation, valid);

        Draw.color(Pal.gray);
        Lines.stroke(3);
        Lines.poly(x * this.tilesize + this.offset, y * this.tilesize + this.offset, 8, this.radius);
        Draw.color(player.team().color);
        Lines.stroke(1);
        Lines.poly(x * this.tilesize + this.offset, y * this.tilesize + this.offset, 8, this.radius);
        Draw.color();
    },
	
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
                        Lines.stroke(1.8);
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
	
	drawPlace(x, y, rotation, valid){
        this.super$drawPlace(x, y, rotation, valid);

        Draw.color(Pal.gray);
        Lines.stroke(3);
        Lines.poly(x * this.tilesize + this.offset, y * this.tilesize + this.offset, 10, this.radius);
        Draw.color(player.team().color);
        Lines.stroke(1);
        Lines.poly(x * this.tilesize + this.offset, y * this.tilesize + this.offset, 10, this.radius);
        Draw.color();
    },
	
	buildType: prov(() => {
        var entity = extend(ForceProjector.ForceBuild, titaniumShield,{
			
            drawShield(){
				
                if(!this.broken){
                    var radius = this.realRadius();

                    Draw.z(Layer.shields);

                    Draw.color(Tmp.c1.set(this.team.color).lerp(Items.titanium.color, this.phaseHeat), Color.white, Mathf.clamp(this.hit));

                    if(Core.settings.getBool("animatedshields")){
                        Fill.poly(this.x, this.y, 10, radius);
                    }else{
                        Lines.stroke(1.8);
                        Draw.alpha(0.09 + Mathf.clamp(0.08 * this.hit));
                        Fill.poly(this.x, this.y, 10, radius);
                        Draw.alpha(1);
                        Lines.poly(this.x, this.y, 10, radius);
                        Draw.reset();
                    }
					
                }

            Draw.reset();
			
            }
        });
		
    return entity;
	}),
});

titaniumShield.consumes.item(Items.titanium);
titaniumShield.consumes.item(Items.phaseFabric).boost();
titaniumShield.consumes.power(8.7);

titaniumShield.requirements = ItemStack.with(Items.graphite, 140, Items.titanium, 240, Items.silicon, 170);
