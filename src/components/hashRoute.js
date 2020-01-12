const hashRoute = () => {

  var url = window.location.hash;

  if (url.length <= 1) return false;

  if (url.includes('=')) {
    
    url = url.substr(1, url.length);

    let parts = url.split('=');

    return {
      [parts[0]]: parts[1]
    }
  } else {
    url = url.substr(1, url.length);
    
    return {
      [url]: true
    }
  }

  return false;

};

export default hashRoute;