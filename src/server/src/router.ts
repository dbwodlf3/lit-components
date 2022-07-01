import path from "path";
import settings from "settings";
import fs from "fs";
import express from "express";

const router = express.Router();

router.get("/", (req, res)=>{

    res.render("index.njk")
});

router.get("/components/:filename", (req, res)=>{
    if(fs.existsSync(path.join(settings.templateRoot, "components", `${req.params.filename}.njk`)))
    {
        res.render(`components/${req.params.filename}.njk`);
    }
    else {
        res.render(`404.njk`);
    }
})

export default router;