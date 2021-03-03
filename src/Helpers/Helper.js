
function getParameter(url, parameter){
    let queryString = url.substring(url.indexOf("?"));

    return new URLSearchParams(queryString).get(parameter);
}

export default getParameter;