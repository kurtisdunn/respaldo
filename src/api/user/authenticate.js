import assign from 'object-assign';
import cookie from 'js-cookie';
import fetch from '../../utils/fetch';

export default function (data) {
  return fetch('/token', {
    method: 'post',
    headers: {
      'Authorization': 'Bearer',
      "cont": "application/json",
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: new URLSearchParams({
      'grant_type':'password',
      'username': data.username,
      'password': data.password
    })
  }).then(function (r) {
    cookie.set('token', {
      access: r.access_token,
      expiry: r.expires_in,
      refresh: r.refresh_token,
      type: r.token_type[0].toUpperCase() + r.token_type.substring(1)
    });
  });
}
