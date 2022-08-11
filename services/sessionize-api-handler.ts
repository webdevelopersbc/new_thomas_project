import { SESSIONIZE_BASE_URL } from '@constants';

export const getSessions = async (id: string) => {
  const url = `${SESSIONIZE_BASE_URL}/${id}/view/Sessions`;
  try {
    const response = await fetch(url, { method: 'GET' });
    const responseObj = await response.json();
    return response.status === 200 ? responseObj[0].sessions : [];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSpeakers = async (id: string) => {
  const url = `${SESSIONIZE_BASE_URL}/${id}/view/Speakers`;
  try {
    const response = await fetch(url, { method: 'GET' });
    const responseObj = await response.json();
    return response.status === 200 ? responseObj : [];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getGridSmart = async (id: string) => {
  const url = `${SESSIONIZE_BASE_URL}/${id}/view/GridSmart`;
  try {
    const response = await fetch(url, { method: 'GET' });
    const responseObj = await response.json();
    return response.status === 200 ? responseObj[0] : [];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
