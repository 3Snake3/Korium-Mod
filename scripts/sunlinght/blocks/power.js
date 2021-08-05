const norium = Vars.content.getByName(ContentType.item, "koriummod-norium");

//NORIUM SOLAR PANEL

const noriumPanel = extendContent(SolarGenerator, "norium-solar-panel", {
    
    localizedName: "Norium solar panel",
    description: "abogus",

    category: Category.power,
    buildVisibility: buildVisibility.shown,

    size: 3,
    health: 170,
    powerProduction: 2.5,

});

noriumPanel.requirements = ItemStack.with(norium, 140, Items.metaglass, 75);
