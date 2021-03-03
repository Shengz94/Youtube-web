# Youtube-web

The web app is developed with React (JS) and it uses Youtube API V3.

The application has two pages.

* Video listing by title search.
* Video viewing and information related to the selected video.

## Top Bar

This bar contains the Youtube logo and the video search engine.

The search engine performs a search by video titles.

## Search for videos

In this view we can see the list of videos resulting from the search filter in the top bar.

The first time this view is accessed (without searching), a list of videos will be displayed using preset filters.

Each result will be displayed as a card with the following information:

* Thumbnail with a preview of the video.
* Title.
* Description.
* Clicking on any part of a video card will redirect you to the page for viewing the selected video.

## Viewing of video and related information.

This view has 3 main parts.

* Video.
* Video information.
* List of related videos.

At the same time, the Video Information section has the following information about the selected video:

Title.
Number of views.
Upload date.
Number of likes.
Number of dislikes.
Channel avatar.
Channel title.
Number of subscribers to the channel.
Description.

The information of the selected video is part of the link, so the information of the video will be maintained when the page is refreshed and it is easier to share the link of the selected video.

## Ejecutar aplicación

* From a console, access the build folder.
* Install serve with npm if it is not installed yet.
    `npm install -g serve`
* Execute the following command line to start the local server.
    `serve -s build`
* Access from a browser the link showed by the previous command. Default:
    `http://localhost:5000`



#Disclaimer

* The application uses a free API account, so you have a daily limit of 10,000 for the entire application. Once this limit is exceeded, the application will stop working until the next quota restart.
* Average application quota usage is 100 for each page rendering.