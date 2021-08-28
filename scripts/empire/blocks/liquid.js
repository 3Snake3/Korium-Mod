const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");
const kapronite = Vars.content.getByName(ContentType.item, "koriummod-kapronite");

const waters = [Blocks.water, Blocks.sandWater, Blocks.darksandWater, Blocks.deepwater, Blocks.taintedWater, Blocks.darksandTaintedWater, Blocks.stone];

const getTex = tex => Core.atlas.find("koriummod-" + tex);

//UNDERWATER CONDUIT

const underwaterConduit = extendContent(ArmoredConduit, "underwater-conduit", {
			
	localizedName: "Underwater conduit",
    description: "",
	
    category: Category.liquid,
    buildVisibility: BuildVisibility.shown,
	buildCostMultiplier: 2,
	
	//leaks: false,
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
		
		let n = this.name;
		
		this.topRegions = [ getTex(n+"-top-0"), getTex(n+"-top-1"), getTex(n+"-top-2"), getTex(n+"-top-3"), getTex(n+"-top-4")];

        this.downRegion = getTex(this.name + "-down")
		this.upRegion = getTex(this.name + "-up")
	},
	
	canPlaceOn(tile, team){
		let floor = tile.floor;
		
        //make sure that there are liquids in this place
		const canPlace = floor.isLiquid ? waters.includes(floor) : else;
		return canPlace;
    },
	
	buildType: prov(() => {
        return extend(ArmoredConduit.ArmoredConduitBuild, underwaterConduit,{
			
        
        });
	}),
});

underwaterConduit.requirements = ItemStack.with(siron, 3, Items.silicon, 2, Items.metaglass, 3);