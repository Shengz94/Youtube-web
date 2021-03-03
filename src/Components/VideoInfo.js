import React, {Fragment, useEffect, useState} from "react";
import {getVideoById, getChannelById} from "../Helpers/YoutubeAPI";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const VideoInfo = (props) => {
    const [video, setVideo] = useState();
    const [channel, setChannel] = useState();
    const [videoReady, setVideoReady] = useState(false);
    const [channelReady, setChannelReady] = useState(false);

    useEffect(() => {
        if(video){
            setVideoReady(true);
        }
    }, [video]);

    useEffect(() => {
        if(channel){
            setChannelReady(true);
        }
    }, [channel]);

    useEffect(() => {
        getVideo();
    }, [props.videoId]);

    function getVideo(){
        getVideoById(props.videoId).then(videoResponse => {
            setVideo(videoResponse);
            if(!channel){
                getChannel(videoResponse.channel.id);
            }
        }, (error) =>{
            console.log(error);
            document.getElementById("error-holder").innerHTML = error;
        });
    };

    function getChannel(id){
        getChannelById(id).then(channelResponse => {
            setChannel(channelResponse);
        }, (error) =>{
            console.log(error);
            document.getElementById("error-holder").innerHTML = error;
        });
    };

    if(!video){
        getVideo();
    }

    return (
        <div className="video-section">
            { videoReady &&
                <Fragment>
                    <div className="video-player">
                        <iframe width="640" height="360" src={"https://www.youtube.com/embed/" + video.id}></iframe>
                    </div>
                    <div className="info-section">
                        <div className="video-info">
                            <div className="video-title">
                                <h3>{video.title}</h3>
                            </div>
                            <div className="video-miscellaneous">
                                <div className="left-content">
                                    <div className="video-views">
                                        <span>{video.views} views</span>
                                    </div>
                                    <div className="dot-separator">
                                        <span>•</span>
                                    </div>
                                    <div className="video-published-date">
                                        <span>{video.publishedAt}</span>
                                    </div>
                                </div>
                                <div className="right-content">
                                    <div className="video-likes">
                                        <ThumbUpIcon />
                                        <span>{video.likes}</span>
                                    </div>
                                    <div className="video-dislikes">
                                        <ThumbDownIcon />
                                        <span>{video.dislikes}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="channel-info">
                            {channelReady &&
                                <Fragment>
                                    <div className="channel-thumbnail">
                                        <img src={channel.thumbnail}/>
                                    </div>
                                    <div className="channel-text">
                                        <div className="channel-title">
                                            <span>{channel.title}</span>
                                        </div>
                                        <div className="channel-subscribers">
                                            <span>{channel.subscribers} subscribers</span>
                                        </div>
                                    </div>
                                </Fragment>
                            }
                        </div>
                        <div className="video-description">
                            <p>{video.description}</p>
                        </div>
                    </div>
                </Fragment>
            }
        </div>
    );
};

export default VideoInfo;