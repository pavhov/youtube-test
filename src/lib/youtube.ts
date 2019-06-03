import request, { Response } from "request";
import videos from "../config/videos.json";
import Debug, { IDebugger } from "debug";

let debug: IDebugger = Debug(`${process.env.NODE_NAME}`);

export interface YoutubeVideoInfo {
    kind: string,
    etag: string,
    pageInfo: {
        totalResults: number,
        resultsPerPage: number
    },
    items: {
        kind: string,
        etag: string,
        id: string,
        snippet: {
            publishedAt: string,
            channelId: string,
            title: string,
            description: string,
            thumbnails: {
                default: {
                    "url": string,
                    "width": number,
                    "height": number
                },
                medium: {
                    "url": string,
                    "width": number,
                    "height": number
                },
                high: {
                    url: string,
                    width: number,
                    height: number
                },
                standard: {
                    url: string,
                    width: number,
                    height: number
                },
                maxres: {
                    url: string,
                    width: number,
                    height: number
                }
            },
            channelTitle: string,
            tags: string[],
            categoryId: string,
            liveBroadcastContent: string,
            localized: {
                title: string,
                description: string
            }
        },
        contentDetails: {
            duration: string,
            dimension: string,
            definition: string,
            caption: string,
            licensedContent: boolean,
            projection: string
        },
        statistics: {
            viewCount: string,
            likeCount: string,
            dislikeCount: string,
            favoriteCount: string,
            commentCount: string
        },
        topicDetails: {
            topicIds: string[],
            relevantTopicIds: string[],
            topicCategories: string[]
        }
    }[]
}

export const GetVideosInfo = () => new Promise((resolve: (body: any) => void, reject: (reason: any) => void) => {
    let options = {
        method: "GET",
        url: "https://www.googleapis.com/youtube/v3/videos",
        qs:
            {
                part: "contentDetails,recordingDetails,snippet,statistics,topicDetails",
                id: videos.ids.join(","),
                key: process.env.TOKEN,
            },
    };

    request(options, function (error: Error, response: Response, body) {
        if (error) {
            debug("Video info get crushed: ", error);
            reject(error);
        } else {
            debug("Video info get done");
            resolve(JSON.parse(body));
        }
    });

});
