import React from "react";
import { withRouter } from 'react-router-dom';

const VideoCard = (props) => {

    function goToVideo(){
        props.history.push("video?v=" + props.video.id);
    }

    return (
        <div className="video-card" onClick={goToVideo}>
            <div className="video-thumbnail">
                <img src={props.video.thumbnail}/>
            </div>
            <div className="video-info">
                <div className="video-title">
                    <span>{props.video.title}</span>
                </div>
                <div className="video-channel">
                    <span>{props.video.channel.title}</span>
                </div>
                <div className="video-description">
                    <span>{props.video.description}</span>
                </div>
            </div>
        </div>
    );
};

export default withRouter(VideoCard);