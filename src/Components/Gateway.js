import { Fragment,  useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
import SearchView from "./SearchView";
import VideoView from "./VideoView";

const Gateway = () => {
    const [query, setQuery] = useState("");
    const [searchButton,setSearchButton] = useState(false);

    function handleSearchBar(event){
        setQuery(event.target.value);
    }

    function handleSearchButton(value){
        setSearchButton(value);
    }

    return (
        <Fragment>
            <SearchBar query={query} handleSearchBar={(newQuery) => handleSearchBar(newQuery)}  handleSearchButton={(bool) => handleSearchButton(bool)}/>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Youtube-web" render={() => (
                        <SearchView query={query} searchButton={searchButton} handleSearchButton={(bool) => handleSearchButton(bool)}/>
                    )}/>
                    <Route exact path="/Youtube-web/video" render={() => (
                        <VideoView searchButton={searchButton} handleSearchButton={(bool) => handleSearchButton(bool)}/>
                    )}/>
                </Switch>
            </BrowserRouter>
            <div id="error-holder"></div>
        </Fragment>
    );
};

export default Gateway;