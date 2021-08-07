function newItem(name, realName, hardnes, flammabilit, radioactivit, explosivenes, theColor){
    const item = extendContent(Item, name, {
		
		localizedName: realName,
		color: Color.valueOf(theColor),
		
		hardness: hardnes,
		flammability: flammabilit,
        radioactivity: radioactivit,
	    explosiveness: explosivenes,
		
	});

	return item;
};

const korium = newItem("korium", "Korium", 3, 0, 0.6, 0, "#8276a6");
const omnidium = newItem("omnidium", "Omnidium", 0, 0, 0, 0, "#a21a90");//change color
const norium = newItem("norium", "Norium", 0, 0, 0.3, 0, "#a21a90");//may be deleted
const siron = newItem("siron", "Siron", 6, 0, 7.4, 0, "#6c1717");
const procionit = newItem("frozen-procionit", "Frozen Procionit", 4, 0, 0, 0, "#656469");
const kapronite = newItem("kapronite", "kapronite", 3, 0, 0, 0, "#656469");
