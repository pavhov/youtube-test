import { config } from "dotenv";

config({path: `${__dirname}/../../.env`});

import { Run } from "./lib/decorators";

import Debug, { IDebugger } from "debug";
import { Db } from "mongodb";
import Koa, { Context } from "koa";

import { GetVideosInfo, YoutubeVideoInfo } from "./lib/youtube";
import { DB } from "./lib/mongodb";
import { save, view } from "./module/video";

let debug: IDebugger = Debug(`${process.env.NODE_NAME}`);

class App {
    @Run
    private async Main() {
        try {
            let videosInfo: YoutubeVideoInfo = await GetVideosInfo();
            let db: Db = await DB();
            await save(db, videosInfo);

            await App.server(db);
        } catch (e) {
            debug("App crashed: ", e)
        }
    }

    private static server = (db: Db) => new Promise((resolve: () => void, reject: (reason: any) => void) => {
        const app = new Koa();

        app.use(view.bind(null, db));

        app.listen({
            port: process.env.PORT,
            host: process.env.IP,
        }, () => {
            debug(`Koa listening on http://${process.env.IP}:${process.env.PORT}`);
            resolve();
        });

        app.on("error", (err: Error) => {
            debug("server error", err);
            reject(err);
        });
    });
}
