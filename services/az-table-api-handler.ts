import {
  AZ_BLOB_STORAGE_API_BASE_URL,
  AZ_TABLE_STORAGE_API_BASE_URL,
  AZ_BLOB_STORAGE_BASE_URL,
} from '@constants';
import { plusOneDay } from '@utils';

export const getAllCountries = async () => {
  return await getEvents(null, null, 'country');
};

export const getAllEvents = async () => {
  return await getEvents();
};

export const getEvents = async (
  filter?: string | null,
  top?: string | null,
  select?: string | null
) => {
  const url = `${AZ_TABLE_STORAGE_API_BASE_URL}/events?${
    filter ? `&$filter=${filter}` : ''
  }${top ? `&$top=${top}` : ''}${select ? `&$select=${select}` : ''}`;

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

export const getEventDetail = async (title: string, start_date: string) => {
  const startDatePlusOne = plusOneDay(start_date);

  const filter = `title eq '${title}' and start_date ge '${start_date}' and start_date lt '${startDatePlusOne}'`;

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
  if (!file?.name) return null;

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
