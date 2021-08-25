function newLiquid(name, realName, temperature, viscosity, flammability, explosiveness, heatCapacity){
	const liquid = extendContent(Liquid, name, {});
	liquid.temperature = temperature;
	liquid.viscosity = viscosity;
	liquid.flammability = flammability;
	liquid.explosiveness = explosiveness;
	liquid.heatCapacity = heatCapacity;
	//liquid.effect = effect;
	return liquid;
};

const procionite = extendContent(Liquid, "procionite", {

    localizedName: "Procionite",
	color: Color.valueOf("686a9d")
	
	temperature: 1.0,
	viscosity: 0.88,
    effect: StatusEffects.melting,
    lightColor = Color.valueOf("534660").a(0.4);
});
