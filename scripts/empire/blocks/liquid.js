const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");
const kapronite = Vars.content.getByName(ContentType.item, "koriummod-kapronite");

const waters = ["shallow-water", "sand-water", "darksand-water", "deep-water", "tainted-water", "darksand-tainted-water"];

const getTex = tex => Core.atlas.find("koriummod-" + tex);

//UNDERWATER CONDUIT

const underwaterConduit = extendContent(ArmoredConduit, "underwater-conduit", {
			
	localizedName: "Underwater conduit",
    description: "",
	
    category: Category.liquid,
    buildVisibility: BuildVisibility.shown,
	buildCostMultiplier: 2,
	
	leaks: false,
	requiresWater: true,
	placeableLiquid: true,
	
    liquidCapacity: 18,
    liquidPressure: 1.04,
    health: 95,
	
	/*
	init(){
        //this.super$init();

        if(this.junctionReplacement == null) this.junctionReplacement = underwaterJunction;
    },
	*/
	
	load(){
		this.super$load();
		
		this.topRegions = [];
		this.topRegions.length = 4;
		for(let i = 0; i < 5; i++){
			this.topRegions[i] = getTex(this.name+"-top-"+i)
		}

        this.downRegion = getTex(this.name + "-down")
		this.upRegion = getTex(this.name + "-up")
	},
	
	canPlaceOn(tile, team){
		let floor = tile.floor;
		
        //make sure that there are liquids in this place
        if(!floor.isLiquid){
			return false;
		}else if(water.includes(floor.name)){
			return true;
		}else{
		    return false;	
		}
    },
	
	buildType: prov(() => {
        return extend(ArmoredConduit.ArmoredConduitBuild, underwaterConduit,{
			
        
        });
	}),
});

underwaterConduit.requirements = ItemStack.with(siron, 3, Items.silicon, 2, Items.metaglass, 3);