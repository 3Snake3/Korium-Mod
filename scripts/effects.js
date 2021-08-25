const tiedFx = new Effect(50, e => {
    color(Color.valueOf("686a9d"), Color.white, e.fout() / 5 + Mathf.randomSeedRange(e.id, 0.12));

        randLenVectors(e.id, 2, 1 + e.fin() * 3, (x, y) => {
            Fill.circle(e.x + x, e.y + y, .2 + e.fout() * 1.2);
        });
});

const tied = extend(StatusEffect, "tied", {
	
	localizedName: "Tied",
	
    speedMultiplier: 0.75,
    armorMultiplier: 0.96,
    damage: 0.89,
	transitionDamage: 5,
    effect: tiedFx,
    color: Color.valueOf("686a9d"),
	
	init(() => {
        this.opposite(StatusEffects.wet, StatusEffects.freezing);
        this.affinity(tarred, ((unit, result, time) => {
            unit.damagePierce(this.transitionDamage);
            this.effect.at(unit.x + Mathf.range(unit.bounds() / 2), unit.y + Mathf.range(unit.bounds() / 2));
            result.set(this, Math.min(time + result.time, 300));
        }));
    }),
});