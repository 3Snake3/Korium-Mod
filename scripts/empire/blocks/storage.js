const siron = Vars.content.getByName(ContentType.item, "koriummod-siron");
const kapronite = Vars.content.getByName(ContentType.item, "koriummod-kapronite");

const invisibleTime = 60*4;
const invisibleReloadTime = 60 * 10;


//CORE FLICKERING

const coreFlickering = extendContent(CoreBlock, "core-flickering", {
    
    localizedName: "Core Flickering",
    description: "aboba",

    category: Category.effect,
    buildVisibility: BuildVisibility.shown,

    size: 3,
    health: 2800,
    itemCapacity: 4500,
    unitType: UnitTypes.gamma,//TODO mod unit
    unitCapModifier: 10,

});

coreFlickering.requirements = ItemStack.with(Items.copper, 1500, siron, 1000, Items.graphite, 500, Items.lead, 200);

//CORE STAR

const coreStar = extendContent(CoreBlock, "core-star", {
    
    localizedName: "Core Star",
    description: "aboba",

    category: Category.effect,
    buildVisibility: BuildVisibility.shown,

    size: 4,
    health: 4800,
    itemCapacity: 9500,
    unitType: UnitTypes.gamma,//TODO mod unit
    unitCapModifier: 16,
    researchCostMultiplier: 0.08,
	configurable: true,

    thrusterLenght: 34/4,

});

coreStar.requirements = ItemStack.with(Items.copper, 2000, siron, 3000, Items.graphite, 1000, Items.silicon, 2000);

coreStar.buildType = () => {
    const b = extendContent(CoreBlock.CoreBuild, coreStar, {
		
    buildConfiguration(table){
		
	    table.button(Icon.eye, () => {
			
			var canUse = true;
			
			if(canUse){
				canUse = false;
			    
				coreStar.targetable = false;
				
				Time.run(invisibleTime,()=>{
					coreStar.targetable = true;
				});
				
				Time.run(invisibleReloadTime,()=>{
					canUse = true;
				});
			}
			
		}).size(40);
	},
	
	placed(){
        this.super.placed();
        Vars.state.teams.registerCore(this);
		
	    table.button(Icon.eye-off, () => {
			
			var canUse = true;
			
			if(canUse){
				canUse = false;
			    
				coreStar.targetable = false;
				coreStar.captureInvicibility = 0;
				coreStar.priority = TargetPriority.base;
				coreStar.flags = EnumSet.of(BlockFlag.factory);
				
				Time.run(invisibleTime,()=>{
					coreStar.targetable = true;
				});
				
				Time.run(invisibleReloadTime,()=>{
					canUse = true;
				});
			}
			
		}).size(40);
    }
			
    });
    return b;
};

//KAPRONITE UNLOADER

const kaproniteUnloader = extendContent(Unloader, "kapronite-unloader", {

	localizedName: "kapronite unloader",
	category: Category.effect,
	buildVisibility: BuildVisibility.shown,

    speed: 5.40,//HMMMMMMMMMMMMMM
    group: BlockGroup.transportation,
	
});

kaproniteUnloader.requirements = ItemStack.with(kapronite, 35, Items.silicon, 25);

//KAPRONITE STORAGES

//BUDUT
