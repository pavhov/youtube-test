import { Db } from "mongodb";
import { YoutubeVideoInfo } from "../lib/youtube";
import { Context } from "koa";

export const save = async (db: Db, videosInfo: YoutubeVideoInfo) => {
    return videosInfo.items.forEach((item) => {
        return db.collection("video-info").updateOne({_id: item.id,}, {
            $set: {
                _id: item.id,
                title: item.snippet.title,
                description: item.snippet.description,
                watches: item.statistics.viewCount,
                likes: item.statistics.likeCount,
                dislikes: item.statistics.dislikeCount,
                comment: item.statistics.commentCount,
            }
        }, {upsert: true})
    });
};

export const view = async (db: Db, ctx: Context) => {
    try {
        let body = await db.collection("video-info").find().toArray();
        ctx.body = JSON.stringify(body);
    } catch (e) {
        ctx.body = e.message;
    }
};
