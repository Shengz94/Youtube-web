import logo from '../Resources/yt_logo.png'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = (props) => {
    return (
        <div className="top-bar">
            <div className="left-content">
                <div className="logo">
                    <img src={logo} />
                </div>
            </div>
            <div className="search-bar">
                <TextField size="small" style={{width:"400px"}} placeholder="Search" variant="outlined" value={props.query} onChange={(event) => props.handleSearchBar(event)}/>
                <Button size="small" style={{height:"38px"}} variant="contained" color="default" startIcon={<SearchIcon />} onClick={() => props.handleSearchButton(true)}/>
            </div>
        </div>
    );
};

export default SearchBar;