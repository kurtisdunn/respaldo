import fetch from '../../utils/fetch';

export default function (id) {
  return fetch(`/v2/tenants/${id != null ? id : ''}`)
  .then(r => r);
}
