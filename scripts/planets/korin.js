const elysiumGenerator = extend(PlanetGenerator, {
	
    seed: 1,

	basegen: new BaseGenerator(),
    scl: 5.78,
    waterOffset: 0.07,
	water: 0.08,
	
	rawHeight(position){
        position = Tmp.v33.set(position).scl(this.scl);
        return (Mathf.pow(Simplex.noise3d(this.seed, 7, 0.5, 1/3, position.x, position.y, position.z), 2.3) + this.waterOffset) / (1 + this.waterOffset);
    },
	   
	getHeight(position){
        let height = this.rawHeight(position);
        return Math.max(height, this.water);
    },
	
	getColor(position){
        let block = this.getBlock(position);
        //replace undefined blocks with dark sand color
        if(block == null) return Blocks.darksand.mapColor;
        Tmp.c1.set(block.mapColor).a = 1 - block.albedo;
        
        return Tmp.c1;
    },
	
	genTile(position, tile){
        tile.floor = this.getBlock(position);
        tile.block = tile.floor.asFloor().wall;

        if(Ridged.noise3d(1, position.x, position.y, position.z, 2, 22) > 0.31){//#31!!!
            tile.block = Blocks.air;
        };
    },
	
	getBlock(position){
        let arr = this.arr;
        let scl = this.scl;
        
        let height = this.rawHeight(position);
        Tmp.v31.set(position);
        
        position = Tmp.v33.set(position).scl(scl);
        let rad = this.scl;
        let temp = Mathf.clamp(Math.abs(position.y * 2) / rad);
        let tnoise = Simplex.noise3d(this.seed, 7, 0.56, 1/3, position.x, position.y + 999, position.z);
        
        temp = Mathf.lerp(temp, tnoise, 0.5);
        height *= 1.2;
        height = Mathf.clamp(height);
		
		let tar = Simplex.noise3d(this.seed, 4, 0.55, 1/2, position.x, position.y + 999, position.z) * 0.3 + Tmp.v31.dst(0, 0, 1) * 0.2;

        let res = arr[Mathf.clamp(Math.floor(temp * arr.length), 0, arr[0].length - 1)][Mathf.clamp(Math.floor(height * arr[0].length), 0, arr[0].length - 1)];
		if(tar > 0.5){
            return this.tars.get(res, res);
        }else{
            return res;
        }
    },
	
	noise(x, y, octaves, falloff, scl, mag){
        let v = this.sector.rect.project(x, y).scl(5);
        return Simplex.noise3d(this.seed, octaves, falloff, 1 / scl, v.x, v.y, v.z) * mag;//OCTAVE NOISE??
    },
	
	generate(tiles, sec){
        this.tiles = tiles;
        this.sector = sec;
		
		var gend = elysiumGenerator;
        
        const rand = this.rand;
        rand.setSeed(sec.id);
        
        //tile, sector
        let gen = new TileGen();
        this.tiles.each((x, y) => {
            gen.reset();
            let position = this.sector.rect.project(x / tiles.width, y / tiles.height);

            this.genTile(position, gen);
            tiles.set(x, y, new Tile(x, y, gen.floor, gen.overlay, gen.block));
        });
		
		const Room = {
            x: 0, y: 0, radius: 0,
            connected: new ObjectSet(),

            connect(to){
                if(this.connected.contains(to)) return;

                this.connected.add(to);
                
                //let gend = elysiumGenerator;
                let nscl = rand.random(100, 140);//hz
                let stroke = rand.random(3, 9);//4, 12
                
                gend.brush(gend.pathfind(this.x, this.y, to.x, to.y, tile => (tile.solid() ? 50 : 0) + gend.noise(tile.x, tile.y, 2, 0.4, 1 / nscl) * 500, Astar.manhattan), stroke);
            }
        };
		
		const setRoom = (x, y, radius) => {
            let room = Object.create(Room);
            
            room.x = x;
            room.y = y;
            room.radius = radius;
            //room.connected.add(this);
            
            return room;
        };
		
		this.cells(4);
        this.distort(10, 12);

        this.width = this.tiles.width;
        this.height = this.tiles.height;

        let constraint = 1.3;
        let radius = this.width / 2 / Mathf.sqrt3;
        let rooms = rand.random(2, 5);
        let roomseq = new Seq();
		
		for(let i = 0; i < rooms; i++){
            Tmp.v1.trns(rand.random(360), rand.random(radius / constraint));
            let rx = Math.floor(this.width / 2 + Tmp.v1.x);
            let ry = Math.floor(this.height / 2 + Tmp.v1.y);
            let maxrad = radius - Tmp.v1.len();
            let rrad = Math.floor(Math.min(rand.random(9, maxrad / 2), 30));
            
            roomseq.add(setRoom(rx, ry, rrad));
        };

        let spawn = null;
        let enemies = new Seq();
        let enemySpawns = rand.random(1, Math.max(Mathf.floor(this.sector.threat * 4), 1));
        
        let offset = rand.nextInt(360);
        let length = this.width / 2.55 - rand.random(13, 23);
        let angleStep = 5;
        let waterCheckRad = 5;
		
		for(let i = 0; i < 360; i += angleStep){
            let angle = offset + i;
            let cx = Math.floor(this.width / 2 + Angles.trnsx(angle, length));
            let cy = Math.floor(this.height / 2 + Angles.trnsy(angle, length));

            let waterTiles = 0;

            //check for water presence.
            for(let rx = -waterCheckRad; rx <= waterCheckRad; rx++){
                for(let ry = -waterCheckRad; ry <= waterCheckRad; ry++){
                    let tile = this.tiles.get(cx + rx, cy + ry);
                    
                    if(tile == null || tile.floor().liquidDrop != null){
                        waterTiles++;
                    };
                };
            };

            if(waterTiles <= 4 || (i + angleStep >= 360)){
                spawn = setRoom(cx, cy, rand.random(8, 15));
                roomseq.add(spawn);

                for(let j = 0; j < enemySpawns; j++){
                    let enemyOffset = rand.range(60);
                    
                    Tmp.v1.set(cx - this.width / 2, cy - this.height / 2).rotate(180 + enemyOffset).add(this.width / 2, this.height / 2);
                    let espawn = setRoom(Math.floor(Tmp.v1.x), Math.floor(Tmp.v1.y), rand.random(8, 16));
                    roomseq.add(espawn);
                    enemies.add(espawn);
                };

                break;
            };
        };
		
		roomseq.each(room => this.erase(room.x, room.y, room.radius));
		
		let connections = rand.random(Math.max(rooms - 1, 1), rooms + 3);
        for(let i = 0; i < connections; i++){
            roomseq.random(rand).connect(roomseq.random(rand));
        };
		
		roomseq.each(room => spawn.connect(room));

        this.cells(1);
        this.distort(10, 6);

        this.inverseFloodFill(this.tiles.getn(spawn.x, spawn.y));

        let ores = Seq.with(Blocks.oreCopper, Blocks.oreLead);
        let poles = Math.abs(this.sector.tile.v.y);
        let nmag = 0.5;
        let scl = 1;
        let addscl = 1.3;
		
		if(Simplex.noise3d(gend.seed, 2, 0.5, scl, this.sector.tile.v.x, this.sector.tile.v.y, this.sector.tile.v.z)*nmag + poles > 0.25*addscl){
            ores.add(Blocks.oreCoal);
        }
		
		if(Simplex.noise3d(gend.seed, 2, 0.5, scl, this.sector.tile.v.x + 1, this.sector.tile.v.y, this.sector.tile.v.z)*nmag + poles > 0.5*addscl){
            ores.add(Blocks.oreTitanium);
        }

        if(Simplex.noise3d(gend.seed, 2, 0.5, scl, this.sector.tile.v.x + 2, this.sector.tile.v.y, this.sector.tile.v.z)*nmag + poles > 0.7*addscl){
            ores.add(Blocks.oreThorium);
        }

        if(rand.chance(0.25)){
            ores.add(Blocks.oreScrap);
        }
		
		let frequencies = new FloatSeq();
        for(let i = 0; i < ores.size; i++){
            frequencies.add(rand.random(-0.1, 0.01) - i * 0.01 + poles * 0.04);
        };
		
		this.pass((x, y) => {
            if(!this.floor.asFloor().hasSurface()) return;

            let offsetX = x - 4, offsetY = y + 23;
            for(let i = ores.size - 1; i >= 0; i--){
                let entry = ores.get(i);
                let freq = frequencies.get(i);
                
                if(Math.abs(0.5 - gend.noise(offsetX, offsetY + i * 999, 2, 0.7, (40 + i * 2))) > 0.22 + i * 0.01 &&
                    Math.abs(0.5 - gend.noise(offsetX, offsetY - i * 999, 1, 1, (30 + i * 4))) > 0.37 + freq){
                    this.ore = entry;
                    break;
                };    
            };

            if(this.ore == Blocks.oreScrap && rand.chance(0.33)){
                this.floor = Blocks.metalFloorDamaged;
            };
        });
		
		this.trimDark();
        this.median(2);
        this.tech();
		
		this.pass((x, y) => {

            if(this.floor == Blocks.stone){
                if(Math.abs(0.5 - gend.noise(x - 90, y, 4, 0.8, 65)) > 0.02){
                    this.floor = Blocks.boulder;
                };
            };

            if(this.floor != null && this.floor != Blocks.basalt && this.floor != Blocks.mud && this.floor.asFloor().hasSurface()){
                let noise = gend.noise(x + 782, y, 5, 0.75, 260, 1);
                if(noise > 0.72){
                    this.floor = noise > 0.78 ? Blocks.taintedWater : (this.floor == Blocks.sand ? Blocks.sandWater : Blocks.darksandTaintedWater);
                    this.ore = Blocks.air;
                }else if(noise > 0.67){
                    this.floor = (this.floor == Blocks.sand ? this.floor : Blocks.darksand);
                    this.ore = Blocks.air;
                };
            };
        });
		
		let difficulty = this.sector.threat;
        const ints = this.ints;
        
        ints.clear();
        ints.ensureCapacity(this.width * this.height / 4);

        Schematics.placeLaunchLoadout(spawn.x, spawn.y);

        enemies.each(espawn => this.tiles.getn(espawn.x, espawn.y).setOverlay(Blocks.spawn));

        let state = Vars.state;

        if(this.sector.hasEnemyBase()){
            this.basegen.generate(tiles, enemies.map(r => this.tiles.getn(r.x, r.y)), this.tiles.get(spawn.x, spawn.y), state.rules.waveTeam, this.sector, difficulty);

            state.rules.attackMode = this.sector.info.attack = true;
        }else{
            state.rules.winWave = this.sector.info.winWave = 10 + 5 * Math.max(difficulty * 10, 1);
        };

        let waveTimeDec = 0.4;

        state.rules.waveSpacing = Mathf.lerp(60 * 65 * 2, 60 * 60 * 1, Math.floor(Math.max(difficulty - waveTimeDec, 0) / 0.8));
        state.rules.waves = this.sector.info.waves = true;
        state.rules.enemyCoreBuildRadius = 480;

        state.rules.spawns = Waves.generate(difficulty, new Rand(), state.rules.attackMode);
    },
	
	postGenerate(tiles){
        if(this.sector.hasEnemyBase()){
            this.basegen.postGenerate();
        };
    } 
});

elysiumGenerator.arr = [
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

elysiumGenerator.dec = new ObjectMap().of(
    Blocks.water, Blocks.sand,
    Blocks.dacite, Blocks.stone,
    Blocks.grass, Blocks.ice,
    Blocks.water, Blocks.snow
);

elysiumGenerator.tars = new ObjectMap().of(
    Blocks.water, Blocks.grass,
    Blocks.dacite, Blocks.snow
);

const korin = extend(Planet, "korin", Planets.sun, 3, 1, {});
korin.generator = elysiumGenerator;
korin.meshLoader =  prov(() => new HexMesh(korin, 6));
korin.atmosphereColor = Color.valueOf("#aaaaaa");
korin.atmosphereRadIn = 0.003;
korin.atmosphereRadOut = 0.37;
korin.startSector = 11;

korin.alwaysUnlocked = true;