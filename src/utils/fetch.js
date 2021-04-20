import 'whatwg-fetch';
import cookie from 'js-cookie';


function checkStatus (response) {
  // console.log('checkStatus', response);
  if (response.status >= 200 && response.status < 300) {
    return response;
 }else if(response.status === 500) {
   return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response.json();
    throw error;
  }
}

function parseJson (response) {
  if(response){ return response.json(); }
}

export default function (path, opts = {}) {
  const token = cookie.getJSON('token');

  if (!opts.headers) {
    opts.headers = {};
  }

  if (token) {
    opts.headers['Authorization'] = `Bearer ${token.access}`;
  }

  return fetch(`api/${path}`, opts)
    .then(checkStatus)
    .then(parseJson);
}
