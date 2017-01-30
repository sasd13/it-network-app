import { 
    Post,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent
}
from '../models';
// import { DomSanitizer} from '@angular/platform-browser';
// import { SafeResourceUrl} from '@angular/platform-browser';
// import { Pipe, PipeTransform } from '@angular/core';

const youtubeReg =  /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/mi;
    // https://youtu.be/sgUv1sts0zY
const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/mi;
    // https://en.wikipedia.org/wiki/Sunset#/media/File:Sunset_2007-1.jpg
    // http://www.robocup2016.org/media/leagues/eindhoven/albert-van-bremen/robocup-soccer-small-size_Albert-van-Breemen-2_R220X0.jpg
const videoRegex = /http[s]?:\/\/.+\.(mp4|ogg|webm)/mi;
    // http://camendesign.com/code/video_for_everybody/test.html
    // http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4
    // http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm
const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/mi;
const youtube = "https://youtu.be/";

// @Pipe({ name: 'safe' })
// export class MessageParser implements PipeTransform {
export class MessageParser {

    // constructor(private sanitizer: DomSanitizer) {}
    
    // transform(url) {
    //     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    // }

    parse(post: Post): PostContent<any> {
        let youtubeMatch = youtubeRegex.exec(post.message);
        let pictureMatch = pictureRegex.exec(post.message);
        let videoMatch = videoRegex.exec(post.message);
        let value : string;
        let type : string;
        if (pictureMatch) {
            return new PicturePostContent(pictureMatch[0]);
        }
        else if (videoMatch) {
            return new VideoPostContent(videoMatch[0]);
        }
        else if (youtubeMatch) {
             return new YoutubePostContent(
                youtubeMatch[0]
             );
        }
        return null;
    }
}
