import fetch from '../../utils/fetch';

export default function (data) {
  return fetch('/user')
  .then(r => r);
}
