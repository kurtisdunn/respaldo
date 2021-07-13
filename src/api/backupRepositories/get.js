import fetch from '../../utils/fetch';

export default function (id) {
  return fetch(`v2/backupRepositories/${id != null ? id : ''}`)
  .then(r => r);
}