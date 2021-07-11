import fetch from '../../utils/fetch';

export default function (data) {
  return fetch('v2/backupServers/1')
  .then(r => r);
}