import { fetch } from '../utils/axios';

export function getData(params) {
  return fetch({
    url: '/test',
    method: 'get',
    params,
  });
}

export default {};
