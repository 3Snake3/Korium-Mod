const simplex = new Packages.arc.util.noise.Simplex();
const rid = new Packages.arc.util.noise.RidgedPerlin(1, 2);

const KorinGenerator = extend(PlanetGenerator, {
    getColor(position){
        var block = this.getBlock(position);

        Tmp.c1.set(block.mapColor).a = 1 - block.albedo;
        return Tmp.c1
    },
    
    getBlock(pos){
	    var height = this.rawHeight(pos);
	
	    Tmp.v31.set(pos);
	    pos = Tmp.v33.set(pos).scl(KorinGenerator.scl);
	    var rad = KorinGenerator.scl;
	    var temp = Mathf.clamp(Math.abs(pos.y * 2) / rad);
	    var tnoise = simplex.octaveNoise3D(7, 0.56, 1 / 3, pos.x, pos.y + 999, pos.z);
	    temp = Mathf.lerp(temp, tnoise, 0.5);
	    height *= 1.2;
	    height = Mathf.clamp(height);
	
	    var tar = simplex.octaveNoise3D(4, 0.55, 0.5, pos.x, pos.y + 999, pos.z) * 0.3 + Tmp.v31.dst(0, 0, 1) * 0.2;
	    var res = KorinGenerator.arr[
	       Mathf.clamp(Mathf.floor(temp * KorinGenerator.arr.length), 0, KorinGenerator.arr[0].length - 1)][ Mathf.clamp(Mathf.floor(height * KorinGenerator.arr[0].length), 0, KorinGenerator.arr[0].length - 1)
	    ];
	
	    if (tar > 0.5){
	        return KorinGenerator.tars.get(res, res);
	    } else {
	        return res;
	    };
    },
    
    rawHeight(pos){
		var pos = Tmp.v33.set(pos);
		pos.scl(KorinGenerator.scl);
		
		return (Mathf.pow(simplex.octaveNoise3D(7, 0.5, 1 / 3, pos.x, pos.y, pos.z), 2.3) + KorinGenerator.waterOffset) / (1 + KorinGenerator.waterOffset);  
    },
    
    getHeight(position){
        var height = this.rawHeight(position);
        return Math.max(height, KorinGenerator.water);
    },
    
    genTile(position, tile){
        tile.floor = this.getBlock(position);
        tile.block = tile.floor.asFloor().wall;

        if(rid.getValue(position.x, position.y, position.z, 22) > 0.32){
            tile.block = Blocks.air;
        }
    }
});

KorinGenerator.arr = [
    [Blocks.water, Blocks.dacite, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.dacite, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.water, Blocks.dacite, Blocks.dacite],
    [Blocks.dacite, Blocks.water, Blocks.water, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.water, Blocks.dacite, Blocks.dacite, Blocks.dacite],
    [Blocks.grass, Blocks.dacite, Blocks.grass, Blocks.water, Blocks.dacite, Blocks.grass, Blocks.dacite, Blocks.dacite, Blocks.dacite, Blocks.water, Blocks.water, Blocks.dacite, Blocks.dacite],
    [Blocks.water, Blocks.water, Blocks.grass, Blocks.water, Blocks.dacite, Blocks.grass, Blocks.grass, Blocks.dacite, Blocks.dacite, Blocks.dacite, Blocks.water, Blocks.water, Blocks.dacite],  
    [Blocks.water, Blocks.water, Blocks.water, Blocks.dacite, Blocks.dacite, Blocks.dacite, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.water, Blocks.dacite],  
    [Blocks.grass, Blocks.water, Blocks.water, Blocks.water, Blocks.grass, Blocks.grass, Blocks.dacite, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.dacite, Blocks.water, Blocks.dacite],  
    [Blocks.water, Blocks.water, Blocks.grass, Blocks.grass, Blocks.dacite, Blocks.dacite, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.dacite, Blocks.grass, Blocks.water, Blocks.water],  
    [Blocks.water, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.water, Blocks.dacite, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.dacite, Blocks.dacite, Blocks.grass, Blocks.dacite],  
    [Blocks.water, Blocks.water, Blocks.grass, Blocks.water, Blocks.water, Blocks.dacite, Blocks.water, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.dacite, Blocks.dacite],
    [Blocks.dacite, Blocks.grass, Blocks.grass, Blocks.dacite, Blocks.water, Blocks.dacite, Blocks.water, Blocks.water, Blocks.grass, Blocks.grass, Blocks.dacite, Blocks.dacite, Blocks.dacite], 
    [Blocks.water, Blocks.water, Blocks.grass, Blocks.dacite, Blocks.water, Blocks.water, Blocks.water, Blocks.water, Blocks.grass, Blocks.dacite, Blocks.dacite, Blocks.dacite, Blocks.dacite], 
    [Blocks.water, Blocks.water, Blocks.grass, Blocks.dacite, Blocks.dacite, Blocks.grass, Blocks.dacite, Blocks.water, Blocks.dacite, Blocks.water, Blocks.dacite, Blocks.water, Blocks.dacite],
    [Blocks.grass, Blocks.grass, Blocks.grass, Blocks.dacite, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.grass, Blocks.dacite, Blocks.dacite, Blocks.dacite, Blocks.dacite, Blocks.dacite]
];
KorinGenerator.scl = 1.6612096;
KorinGenerator.waterOffset = 0.02;
KorinGenerator.basegen = new BaseGenerator();
KorinGenerator.water = 0.09;//normal is 0.06

KorinGenerator.dec = new ObjectMap().of(
    Blocks.water, Blocks.dacite,
    Blocks.dacite, Blocks.dacite,
    Blocks.water, Blocks.water,
    Blocks.water, Blocks.water
);

KorinGenerator.tars = new ObjectMap().of(
    Blocks.water, Blocks.grass,
    Blocks.dacite, Blocks.grass
);
const KorinPlanet = new JavaAdapter(Planet, {}, "Korin", Planets.sun, 3, 1.0);
KorinPlanet.generator = KorinGenerator;
KorinPlanet.startSector = 25;
KorinPlanet.hasAtmosphere = false;
KorinPlanet.meshLoader = prov(() => new HexMesh(KorinPlanet, 6));
KorinPlanet.orbitRadius = 19.8;
KorinPlanet.rotateTime = 10800;
KorinPlanet.orbitTime = Mathf.pow((2.0 + 14.0 + 0.66), 1.5) * 80;

KorinPlanet.accessible = true;//In tech tree normal is false