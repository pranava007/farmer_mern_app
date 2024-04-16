import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

// Function to handle GET request
export const getData = async (url) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${url}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Function to handle POST request
export const postData = async (url, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${url}`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const postFormData = async (url, data) => {
  try {
    console.log("data", data)
    const response = await axios.post(`${API_BASE_URL}/${url}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const putFormData = async (url, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${url}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Function to handle PUT request
export const putData = async (url, newData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${url}`, newData);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};
