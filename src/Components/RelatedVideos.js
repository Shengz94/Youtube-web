import React, {Fragment, useEffect, useState} from "react";
import {getRelatedVideosById} from "../Helpers/YoutubeAPI";
import RelatedVideoCard from "./RelatedVideoCard";

const RelatedVideo = (props) => {
    const [videosList, setVideosList] = useState();
    const [videosReady, setVideosReady] = useState(false);

    useEffect(() => {
        if(videosList){
            setVideosReady(true);
        }
    }, [videosList]);

    useEffect(() => {
        getRelatedVideos();
    }, [props.videoId]);

    function getRelatedVideos(){
        getRelatedVideosById(props.videoId).then(videosResponse => {
            setVideosList(videosResponse);
        }, (error) =>{
            console.log(error);
            document.getElementById("error-holder").innerHTML = error;
        });
    }

    if(!videosList){
        getRelatedVideos();
    }

    return (
        <div className="related-videos-section">
            {videosReady && videosList.items.map(video => <RelatedVideoCard key={video.id} video={video} changeVideoId={(videoId) => props.changeVideoId(videoId)}/>)}
        </div>
    );
};

export default RelatedVideo;