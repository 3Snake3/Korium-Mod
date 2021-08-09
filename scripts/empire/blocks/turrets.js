const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");
const kapronite = Vars.content.getByName(ContentType.item, "koriummod-kapronite");


const multiTurret = extendContent(ItemTurret, "multiTurret", {
	
	localizedName: "Multi turret",
	category: Category.turret,
    buildVisibility: BuildVisibility.shown,
	configurable: true,
	
	size: 3,
    health: 1240,
	
	buildType: prov(() => {
		
        var b = extend(ForceProjector.ForceBuild, multiTurret, {
			
			buildConfiguration(table){
				
			    table.button(Icon.exit, () => {
				    this.changeShoot(multiArt);
			    }).size(40);
				
			    table.button(Icon.export, () => {
				    this.changeShoot(multiGround);
			    }).size(40);
				
			    table.button(Icon.exit, () => {
				    this.changeShoot(multiAir);
			    }).size(40);
				
		    },
			
			changeShoot(type){
				
			},
			
			shoot(ammo){
				
			    var t = multiTurret;
			
			    this.useAmmo();
                this.shooting = true;
			
			    Time.run(0.1, () => {
				    if(!this.isValid()) return;
					
				    //block.tr.trns(this.rotation, this.block.size * Vars.tilesize / 2);
				
				    t.recoil = t.recoilAmount;
			    	this.heat = 1;
				    this.bullet(ammo, this.rotation + Mathf.range(t.inaccuracy));
				    this.effects();
			    	this.shooting = false;
			    });
		    },

        });	
		
    return b;
	}),
	
});

multiTurret.requirements = ItemStack.with(Items.copper, 65, Items.lead, 50, Items.graphite, 45, Items.silicon, 40);