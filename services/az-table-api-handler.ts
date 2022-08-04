import {
  AZ_BLOB_STORAGE_API_BASE_URL,
  AZ_TABLE_STORAGE_API_BASE_URL,
  AZ_BLOB_STORAGE_BASE_URL,
} from '@constants';

export const getEvents = async (filter: string, top?: string) => {
  const url = `${AZ_TABLE_STORAGE_API_BASE_URL}/events?${
    filter ? `&$filter=${filter}` : ''
  }${top ? `&$top=${top}` : ''}`;

  try {
    const response = await fetch(url, { method: 'GET' });

    const responseObj = await response.json();

    return response.status === 200 ? await responseObj.value : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEvent = async (userId: string, eventId: string) => {
  const filter = `PartitionKey eq '${userId}' and RowKey eq '${eventId}'`;

  const response = await getEvents(filter);

  return response[0];
};

export const deleteEvent = async (partitionKey: string, rowKey: string) => {
  const url = `${AZ_TABLE_STORAGE_API_BASE_URL}/events/delete/${partitionKey}/${rowKey}`;
  console.error(url);
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'If-Match': '*',
      },
    });
    return response.status === 204;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const upsertEvent = async (
  partitionKey: string,
  rowKey: string,
  data: unknown
) => {
  const url = `${AZ_TABLE_STORAGE_API_BASE_URL}/events/${partitionKey}/${rowKey}`;
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response.status === 204;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploadBlob = async (
  file: File,
  container: string,
  folder: string
) => {
  if (!file) return null;
  const url = `${AZ_BLOB_STORAGE_API_BASE_URL}/${container}/${folder}/${file.name}`;
  const blobUrl = `${AZ_BLOB_STORAGE_BASE_URL}/${container}/${folder}/${file.name}`;
  const UTCstring = new Date().toUTCString();
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'x-ms-date': UTCstring,
      'x-ms-blob-type': 'BlockBlob',
      'x-ms-version': '2019-02-02',
      Accept: 'application/json;odata=nometadata',
      'Content-Type': file.type,
    },
    body: file, // body data type must match "Content-Type" header
  });
  return response.status === 201 ? blobUrl : null;
};

export const CreateContainer = async () => {};
