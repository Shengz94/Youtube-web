const API_KEY = "AIzaSyAMRgVOsBR-v6YGqj7FWNAn3Sv0xb3lUjg";
const API_DOMAIN = "https://youtube.googleapis.com/youtube/v3/";
const API_SEARCH = "search";
const API_GET_VIDEO = "videos"
const API_GET_CHANNEL = "channels"

function searchByQuery(query, pageToken, maxResults = 25){
    let endpoint = API_DOMAIN + API_SEARCH + "?part=snippet&maxResults=" + maxResults + "&q=" + encodeURI(query) + "&type=video&key=" + API_KEY;

    if(pageToken !== ""){
        endpoint += "&pageToken=" + pageToken;
    }
    return fetch(endpoint)
    .then((response) => {
        return response.json(); 
    })
    .then((data) => {
        if(data.error){
            return Promise.reject("Error " + data.error.code + ": " + data.error.errors[0].message);
        }
        var result = {
            etag: data.etag,
            pageInfo:{
                totalResults: data.pageInfo.totalResults,
                resultsPerPage: data.pageInfo.resultsPerPage,
            },
            items: []
        };
        if(data.nextPageToken){
            result.nextPageToken = data.nextPageToken;
        }
        if(data.prevPageToken){
            result.prevPageToken = data.prevPageToken;
        }
        data.items.forEach(item => {
            var video = {
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                channel:{
                    id: item.snippet.channelId,
                    title: item.snippet.channelTitle
                },
                thumbnail: item.snippet.thumbnails.medium.url
            }
            result.items.push(video);
        });
        return result;
    });
}

function getRelatedVideosById(videoId, maxResults = 25){
    let endpoint = API_DOMAIN + API_SEARCH + "?part=snippet&maxResults=" + maxResults + "&relatedToVideoId=" + videoId + "&type=video&key=" +API_KEY;
    console.log(endpoint);
    return fetch(endpoint)
    .then((response) => {
        return response.json(); 
    })
    .then((data) => {
        if(data.error){
            return Promise.reject("Error " + data.error.code + ": " + data.error.errors[0].message);
        }
        var result = {
            etag: data.etag,
            items: []
        }
        data.items.forEach(item => {
            var video = {
                id: item.id.videoId,
                title: item.snippet.title,
                channel:{
                    id: item.snippet.channelId,
                    title: item.snippet.channelTitle
                },
                thumbnail: item.snippet.thumbnails.medium.url
            }
            result.items.push(video);
        });
        return result;
    });
}

function getVideoById(id){
    let endpoint = API_DOMAIN + API_GET_VIDEO + "?part=snippet%2CcontentDetails%2Cstatistics&id=" + id + "&key=" + API_KEY;
    
    return fetch(endpoint)
    .then((response) => {
        return response.json(); 
    })
    .then((data) => {
        if(data.error){
            return Promise.reject("Error " + data.error.code + ": " + data.error.errors[0].message);
        }
        if(data){
            let item = data.items[0];
            var video = {
                id: item.id,
                publishedAt: item.snippet.publishedAt.split("T")[0],
                title: item.snippet.title,
                description: item.snippet.description,
                channel: {
                    id: item.snippet.channelId,
                    title: item.snippet.channelTitle
                },
                views: item.statistics.viewCount,
                likes: item.statistics.likeCount,
                dislikes: item.statistics.dislikeCount

            };
            return video;
        }
        else return undefined;
    });
}

function getChannelById(id){
    let endpoint = API_DOMAIN + API_GET_CHANNEL + "?part=snippet%2CcontentDetails%2Cstatistics&id=" + id + "&key=" + API_KEY;

    return fetch(endpoint)
    .then((response) => {
        return response.json(); 
    })
    .then((data) => {
        if(data.error){
            return Promise.reject("Error " + data.error.code + ": " + data.error.errors[0].message);
        }
        let item = data.items[0];
        var channel = {
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.medium.url,
            subscribers: item.statistics.subscriberCount,
            view: item.statistics.viewCount
        };
        return channel;
    });
}

function searchRandomVideos(pageToken, maxResults = 25){
    let endpoint = API_DOMAIN + API_SEARCH + "?part=snippet&maxResults=" + maxResults + "&relevanceLanguage=en&regionCode=ES&type=video&key=" + API_KEY;
    
    if(pageToken !== ""){
        endpoint += "&pageToken=" + pageToken;
    }

    console.log(endpoint);
    return fetch(endpoint)
    .then((response) => {
        return response.json(); 
    })
    .then((data) => {
        if(data.error){
            return Promise.reject("Error " + data.error.code + ": " + data.error.errors[0].message);
        }
        var result = {
            etag: data.etag,
            pageInfo:{
                totalResults: data.pageInfo.totalResults,
                resultsPerPage: data.pageInfo.resultsPerPage,
            },
            items: []
        };
        if(data.nextPageToken){
            result.nextPageToken = data.nextPageToken;
        }
        if(data.prevPageToken){
            result.prevPageToken = data.prevPageToken;
        }
        data.items.forEach(item => {
            var video = {
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                channel:{
                    id: item.snippet.channelId,
                    title: item.snippet.channelTitle
                },
                thumbnail: item.snippet.thumbnails.medium.url
            }
            result.items.push(video);
        });
        return result;
    });
}

export {searchByQuery, getRelatedVideosById, getVideoById, getChannelById, searchRandomVideos}

