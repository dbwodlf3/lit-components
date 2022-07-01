const path = require("path");
const gulp = require('gulp');
const browserify = require("browserify");
const tsify = require("tsify");
const babelify = require("babelify");
const vinyl = require("vinyl-source-stream");
const buffer = require('gulp-buffer');
const concat = require('gulp-concat');
const glob = require('glob');
const watchify = require("watchify");

const projectRoot = path.resolve(__dirname);
const clientRootDir = path.join(projectRoot, "src/client");
const clientConfig = {
    "baseDir": clientRootDir
}

function buildClient(){
	const option = {
        "basedir": path.join(clientConfig.baseDir, "src"),
		"paths": [path.join(clientConfig.baseDir, "src")],
		"debug": true,
		"entries": ["index.ts", glob.sync("components/**/*.ts")]
	}

	return browserify(glob.sync(path.join(projectRoot,"src/client/src/**/*.ts")), option)
		.plugin(tsify, {"target": "es6", "project": "src/client"})
		.transform(babelify, {
			"presets": [
				["@babel/preset-env", {"targets": {}}]
			],
			"extensions": [".js", ".ts"],
			"global": true
			}
		)
		.bundle()
		.pipe(vinyl("client.js"))
		.pipe(buffer())
		.pipe(concat('client.js'))
		.pipe(gulp.dest("src/server/static/js"));
}

function watchClient(){
	const option = {
		"paths": [path.join(clientConfig.baseDir, "src")],
        "debug": true,
        "entries": ["src/client/src/index.ts"],
        "cache": {},
        "packageCache": {},
    };

	const client_bro = makeBro(glob.sync("src/client/src/**/*.ts"), option);

	const update = ()=>{
		return client_bro
			.bundle()
			.on('error', (err)=>{ console.error(err)})
			.pipe(vinyl('client.js'))
			.pipe(gulp.dest("src/server/static/js"))
	}

	client_bro.on('update', update);

	return update();
}

function makeBro(files, option){
    const bro = browserify(files, option);

    bro.plugin(watchify, { "delay": 1000, "ignoreWatch": ['**/node_modules/**']});
    bro.plugin(tsify, { "target": "es6", "project": "src/client"});
    bro.transform(babelify, { 
        "presets": [ 
                ["@babel/preset-env", {targets: {}}]
            ], 
        "extensions": ['.js','.ts'],
        "global": true }
	);

    bro.on('time', (time) => {
        const time_obj = new Date()
        const current_time = `${time_obj.getHours()}:${time_obj.getMinutes()}:${time_obj.getSeconds()}`;

        console.log(`[${current_time}] Updated it takes ${time}ms`);
    })

    return bro;
}

exports.buildClient = buildClient;
exports.watchClient = watchClient;