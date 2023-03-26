import axios from 'axios';

export async function getMastodonAccountStatuses(
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

export async function getMastodonPost(instanceHost: string, id: string) {
  const response = await axios.get(`${instanceHost}/api/v1/statuses/${id}`, {
    headers: {
      Accept: 'application/json',
    },
  });
  return response.data;
}

export async function getMastodonThread(instanceHost: string, id: string) {
  const response = await axios.get(
    `${instanceHost}/api/v1/statuses/${id}/context`
  );
  return response.data;
}

// The HTTPS endpoint of the account's ActivityPub outbox
export async function getMastodonAccountID(
  instanceHost: string,
  fediverseHandle: string
) {
  const response = await axios.get(
    `${instanceHost}/api/v1/accounts/lookup?acct=${fediverseHandle}`
  );
  return response.data.id;
}
