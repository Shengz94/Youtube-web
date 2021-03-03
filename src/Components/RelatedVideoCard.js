import React from "react";
import { withRouter } from 'react-router-dom';

const RelatedVideoCard = (props) => {

    function goToVideo(){
        props.changeVideoId(props.video.id);
        props.history.push("video?v=" + props.video.id);
    }

    return (
        <div className="video-card" onClick={goToVideo}>
            <div className="left-content">
                <div className="video-thumbnail">
                    <img src={props.video.thumbnail}/>
                </div>
            </div>
            <div className="right-content">
                <div className="video-title">
                    <span>{props.video.title}</span>
                </div>
                <div className="video-channel">
                    <span>{props.video.channel.title}</span>
                </div>
            </div>
        </div>
    );
};

export default withRouter(RelatedVideoCard);