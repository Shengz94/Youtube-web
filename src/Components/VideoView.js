import { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import getParameter from "../Helpers/Helper";
import RelatedVideo from "./RelatedVideos";
import VideoInfo from "./VideoInfo";

const VideoView = (props) => {
    const [videoId, setVideoId] = useState(getParameter(window.location.href, "v"));

    useEffect(() => {
        if(props.searchButton && props.query !== ""){
            props.history.push("/");
            props.handleSearchButton(false);
        }
    }, [props.searchButton]);

    function changeVideoId(videoId){
        setVideoId(videoId);
    }
    
    return (
        <div className="video-view">
            <VideoInfo videoId={videoId} />
            <RelatedVideo videoId={videoId} changeVideoId={(videoId) => changeVideoId(videoId)}/>
        </div>
    );
};

export default withRouter(VideoView);