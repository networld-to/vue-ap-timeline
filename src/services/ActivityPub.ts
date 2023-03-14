import axios from 'axios';

export async function getAccountStatuses(
  instanceHost: string,
  id: string,
  limit: string,
  excludeReplies = false
) {
  const response = await axios.get(
    `${instanceHost}/api/v1/accounts/${id}/statuses?limit=${limit}&exclude_replies=${excludeReplies}`
  );

  return response.data;
}

export async function getPost(instanceHost: string, id: string) {
  const response = await axios.get(`${instanceHost}/api/v1/statuses/${id}`);
  return response.data;
}

export async function getThread(instanceHost: string, id: string) {
  const response = await axios.get(
    `${instanceHost}/api/v1/statuses/${id}/context`
  );
  return response.data;
}
