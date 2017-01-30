import { 
    Post,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent
}
from '../models';

const youtubeRegex =  /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    // https://www.youtube.com/watch?v=wuCK-oiE3rM
const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
    // https://en.wikipedia.org/wiki/Sunset#/media/File:Sunset_2007-1.jpg
const videoRegex = /http[s]?:\/\/.+\.(mp4|ogg|webm)/gmi;
    // 

const youtube = "https://youtu.be/";

export class MessageParser {

    parse(post: Post): PostContent<any> {
        const youtubeMatch = youtubeRegex.exec(post.message);
        const pictureMatch = pictureRegex.exec(post.message);
        const videoMatch = videoRegex.exec(post.message);
        let lien : string;
        let type : string;

        if (pictureMatch) {
            lien = pictureMatch[0];
            type = "image";
            class ImageContent extends PostContent<string> {
                constructor(t : string , l : string) {
                    super(type,lien);
                }
            }
            return new ImageContent(type, lien);
        }
        if (videoMatch) {
            lien = videoMatch[0];
            type = "video";
            class VideoContent extends PostContent<string> {
                constructor(t : string , l : string) {
                    super(type,lien);
                }
            }
            return new VideoContent(type, lien);
        }
        if (youtubeMatch) {
            lien = youtubeMatch[0];
            type = "youtube";
            class YouTubeContent extends PostContent<string> {
                constructor(t : string , l : string) {
                    super(type,lien);
                }
            }
            return new YouTubeContent(type, lien);
        }
        return null;
    }
}
