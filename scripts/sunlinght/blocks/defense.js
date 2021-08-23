const korium = Vars.content.getByName(ContentType.item, "koriummod-korium");

function newWall(name, realName, health, size){
	
    const wall = extendContent(Wall, name, {
		
		localizedName: realName,
		buildVisibility: BuildVisibility.shown,
		category: Category.defense,
		
	    size: size,
	    health: health,
		
	});

    return wall;
};

function setLightning(obj){
    obj.insulated = true;
    obj.absorbLasers = true;
    obj.schematicPriority = 10;
    obj.lightningChance = 0.42;
    obj.lightningDamage = 38;
	obj.lightningLength = 24;
	obj.lightningColor = korium.color;
};

const koriumWall = extendContent(Wall, "korium-wall", {
	
	localizedName: "Korium wall",
	description: "--",
	
	buildVisibility: BuildVisibility.shown,
	category: Category.defense,
		
	size: 1,
	health: 410,
	
    requirements: ItemStack.with(korium, 6),
});

koriumWall.buildType = () => {
	const ent = extendContent(Wall.WallBuild, koriumWall, {
    
	    charge: 1,
		
		init(){
            this.getBARS();
            
            this.maxHealth = 410;
            //this.health = koriumWall.health;
            
            //return this.super$init();
        },
	
	    display(table){
			
			    this.super$display(table);
			
			    getBARS();
			
                table.table(cons(t => {
                    t.left();
                    t.add(new Image(this.block.getDisplayIcon(this.tile))).size(8 * 4);
                    t.labelWrap(this.block.getDisplayName(this.tile)).left().width(190).padLeft(5);
                })).growX().left();
                table.row();
                
                table.table(cons(bars => {
                    bars.defaults().growX().height(18).pad(4);
                    this.displayCbars(bars);
                })).growX();
                table.row();
                
                let charge = this.charge;
                let chargePhase = this.charge;//TODO
                
                table.table(cons(t => {
                    const rebuild = new RunnableAction();
                    rebuild.setRunnable(() => {
                        t.clearChildren();
                        t.left();
                        
                        t.add(Core.bundle.format("korium-wall-charge", charge)).left();
                        t.row();
                        
//                        t.table(cons(t2 => {
//                            t2.left();
//                                
//                            t2.add(new Image(itemf.item.icon(Cicon.small)));
//                            t2.labelWrap(amount + " / " + itemf.amount).left().width(190).padLeft(5);
//                        })).left();
                    });
                    
                rebuild.run();
//                t.update(() => {
//                        amount = this.items != null ? this.items.get(itemf.item) : 0;
//                        itemf = this.phaseReq(this.phase);
//                        phase = this.phase;
//                            
//                        rebuild.run();
//                });
            })).padTop(12).growX().left();
                
            table.marginBottom(-5);
        },
		
		getBARS(){
			this.cbars = new Seq();
            
            this.cbars.add(new Bar(Core.bundle.get("stat.health"), Pal.lancerLaser, floatp(() => this.healthcf())));
            this.cbars.add(new Bar(Core.bundle.get("stat.charge"), Pal.accent, floatp(() => this.charge)));
		},
		
		healthcf(){
            return this.health / this.maxHealth;
        },
		
		displayCbars(table){
            this.cbars.each(bar => {
                table.add(bar).growX();
                table.row();
            });
        },
	});
	return ent;
};

//setLightning(koriumWall);
	
//////////////////////////////////////////////////////////////////////////////////
	
/*
const koriumWallLarge = newWall("korium-wall-large", "Large Korium wall", 1640, 2);
    koriumWallLarge.requirements = ItemStack.with(korium, 24);
	setLightning(koriumWallLarge);
*/


