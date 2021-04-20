import cookie from 'js-cookie';


export default function () {
  cookie.remove('token');
  window.location.href = '/#/login';
}
