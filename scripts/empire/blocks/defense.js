const shield = extendContent(ForceProjector, "siron-shield", {
  
    localizedName: "Siron shield",
    description: "abmogubuga",
});

//const color = Color.valueOf("#29d0fa");
const color = korium.colir;

sironShield.buildType = prov(() => {
    var entity = extend(ForceProjector.ForceBuild, sironShield,{
      drawShield(){
        if(!this.broken){
                var radius = this.realRadius();

                Draw.z(Layer.shields);

                Draw.color(Tmp.c1.set(this.team.color).lerp(color,this.phaseHeat), Color.white, Mathf.clamp(this.hit));

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
});
