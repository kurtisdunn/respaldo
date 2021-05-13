import fetch from '../../utils/fetch';

export default function (data) {
  return fetch('/v2/tenants', {
    method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(r => r);
    }