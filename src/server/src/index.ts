import path from "path";
import express from "express";
import morgan from "morgan";
import * as njk from "nunjucks";

import settings from "settings";
import router from "router";

const app = express();


const njk_env = njk.configure(path.join(settings.serverRoot, 'static', 'templates'), 
    {
        "autoescape": true,
        "watch": true,
        "express": app
    }
);

njk_env.addGlobal('isExpirationOut',(inputDatetime:string)=>{
    const expiration = new Date(inputDatetime);
    const current_date = new Date();

    return 0 > (expiration.getTime() - current_date.getTime());
});


app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/static/js', express.static(path.join(settings.serverRoot, 'static', 'js')));
app.use('/static/img', express.static(path.join(settings.serverRoot, 'static', 'img')));
app.use('/static/assets', express.static(path.join(settings.serverRoot, 'static', 'assets')));
app.use(router);

app.listen(settings.port, '0.0.0.0', ()=>{
    console.log(`Server is running on ${settings.port} port`);
});
