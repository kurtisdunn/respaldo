import fetch from '../../utils/fetch';

export default function (data) {
  return fetch('/v2/CloudGatewayPools')
  .then(r => r);
}
