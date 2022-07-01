import path from "path";

export default {
    port : 8888,
    projectRoot: path.resolve(path.dirname(path.dirname(path.dirname(__dirname)))),
    serverRoot: path.resolve(path.dirname(__dirname)),
    templateRoot: path.resolve(path.join(path.dirname(__dirname), "static", "templates")),
}
