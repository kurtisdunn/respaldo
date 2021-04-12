import assign from 'object-assign';
import cookie from 'js-cookie';
import fetch from '../../utils/fetch';

export default function (data) {
  console.log(data);
  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "password");
  urlencoded.append("username", "hostworks.local\\kurtisd");
  urlencoded.append("password", "NWz#Lut9nc*7!");
  
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer");
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  return fetch('/token', {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  })
}
