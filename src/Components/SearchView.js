import React, {useEffect, useState} from "react";
import VideoCard from "./VideoCard";
import {searchByQuery, searchRandomVideos} from "../Helpers/YoutubeAPI";
import { Button } from "@material-ui/core";

const SearchView = (props) => {
    const [result, setResult] = useState();
    const [nextPage, setNextPage] = useState();
    const [prevPage, setPrevPage] = useState();

    useEffect(() => {
        if(props.searchButton && props.query !== ""){
            searchVideos();
            props.handleSearchButton(false);
        }
    }, [props.searchButton]);

    useEffect(() => {
        if(props.query !== ""){
            searchVideos();
        }
        else{
            searchFillerVideos()
        }
    }, []);

    function searchVideos(pageToken = ""){
        searchByQuery(props.query, pageToken).then((videos) => {            
            setResult(videos);
            if(videos.nextPageToken){
                setNextPage(videos.nextPageToken);
            }
            if(videos.prevPageToken){
                setPrevPage(videos.prevPageToken);
            }
        }, (error) =>{
            console.log(error);
            document.getElementById("error-holder").innerHTML = error;
        });
    }
    function searchFillerVideos(pageToken =""){
        searchRandomVideos(pageToken).then((videos) => {
            setResult(videos);
            if(videos.nextPageToken){
                setNextPage(videos.nextPageToken);
            }
            else{
                setNextPage(undefined);
            }
            if(videos.prevPageToken){
                setPrevPage(videos.prevPageToken);
            }
            else{
                setPrevPage(undefined);
            }
        }, (error) =>{
            console.log(error);
            document.getElementById("error-holder").innerHTML = error;
        });
    }

    function goToPage(pageToken){
        if(props.query === ""){
            searchFillerVideos(pageToken);
        }
        else{
            searchVideos(pageToken);
        }
    }

    function renderVideoCards(){
        if( result ){
            return result.items.map(video => <VideoCard key={video.id} video={video} history={props.history} />);
        }
        else{
            return null;
        }
    }
    function renderPrevPage(){
        if(typeof prevPage !== "undefined"){
            return <Button variant="contained" color="default" className="prev-page-button" onClick={() => goToPage(prevPage)}>Previous</Button>
        }
    }
    function renderNextPage(){
        if(typeof nextPage !== "undefined"){
            return <Button variant="contained" color="default" className="next-page-button" onClick={() => goToPage(nextPage)}>Next</Button>
        }
    }

    return (
        <div className="search-view">
            <div className="videos-list">
                {renderVideoCards()}
            </div>
            <div className="buttons-list">
                {renderPrevPage()}
                {renderNextPage()}
            </div>
        </div>
    );
};

export default SearchView;