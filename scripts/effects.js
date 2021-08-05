function node(parent2, block, requirements, objectives){
	var parent = TechTree.all.find(node => node.content == parent2);
	var node = new TechTree.TechNode(parent, block, requirements);
	
	node.objectives.add(objectives);
}; 

const corrColor1 = Color.green;

const corrosionFX = new Effect(50, e => {
    color(corrColor1, Color.white, e.fout() / 5 + Mathf.randomSeedRange(e.id, 0.12));

        randLenVectors(e.id, 2, 1 + e.fin() * 3, (x, y) => {
            Fill.circle(e.x + x, e.y + y, .2 + e.fout() * 1.2);
        });
});

const corrosion = extend(StatusEffect, "corrosion", {
    speedMultiplier: 0.75,
    armorMultiplier: 0.78,
    damage: 0.19,
    effect: corrosionFX,
    color: Color.green
});