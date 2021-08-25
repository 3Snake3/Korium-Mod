const korium = Vars.content.getByName(ContentType.item, "koriummod-korium");
const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");
const kapronite = Vars.content.getByName(ContentType.item, "koriummod-kapronite");

const getTex = tex => Core.atlas.find("koriummod-" + tex);

//siron shield

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
	
	load(){	
	    this.super$load();
	    this.teamRegion = getTex("siron-shield-team");
	}, 
	
	drawPlace(x, y, rotation, valid){

        Draw.color(Pal.gray);
        Lines.stroke(3);
        Lines.poly(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, 8, this.radius);
        Draw.color(Vars.player.team().color);
        Lines.stroke(1);
        Lines.poly(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, 8, this.radius);
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

//titanium shield

const titaniumShield = extendContent(ForceProjector, "titanium-shield", {
	
	localizedName: "Titanium shield",
    description: "",
	
    category: Category.effect,
    buildVisibility: BuildVisibility.shown,
	
    size: 3,
    health: 650,
    phaseUseTime: 105,
    phaseRadiusBoost: 12,
    radius: 125,
    shieldHealth: 840,
    cooldownNormal: 1.8,
    cooldownLiquid: 1.4,
    cooldownBrokenBase: 1.5,
	
	load(){	
	    this.super$load();
	    this.teamRegion = getTex("titanium-shield-team");
	}, 
	
	drawPlace(x, y, rotation, valid){

        Draw.color(Pal.gray);
        Lines.stroke(3);
        Lines.poly(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, 10, this.radius);
		Draw.color(Items.titanium.color);
        Lines.stroke(1);
        Lines.poly(x * Vars.tilesize + this.offset, y * Vars.tilesize + this.offset, 10, this.radius);
        Draw.color();
    },
	
	buildType: prov(() => {
        var entity = extend(ForceProjector.ForceBuild, titaniumShield,{
			
            drawShield(){
				
                if(!this.broken){
                    var radius = this.realRadius();

                    Draw.z(Layer.shields);

                    Draw.color(Items.titanium.color, Color.white, Mathf.clamp(this.hit));

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
//titaniumShield.consumes.items(ItemStack.with(Items.titanium, 1, Items.phaseFabric.boost(), 1));

titaniumShield.consumes.power(8.7);

titaniumShield.requirements = ItemStack.with(Items.graphite, 140, Items.titanium, 240, Items.silicon, 170);
