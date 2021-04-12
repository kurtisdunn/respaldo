import 'whatwg-fetch';

function checkStatus (res) {
    // console.log(res);
    // console.log(res.status);
    // if (res.status == 200 ) {
    //   console.log(res);
    //   return res.json();
    // }

  if (res.status >= 200 && res.status < 300) {
    return res;
 }else if(res.status === 500) {
   return res;
  } else {
    var error = new Error(res.statusText);
    error.res = res.json();
    throw error;
  }
}

function parseJson (res) {
  if(res){ return res.json(); }
}

export default function (path, opts = {}) {
  return fetch(`api/${path}`, opts)
    .then(checkStatus)
    .then(parseJson);
}
