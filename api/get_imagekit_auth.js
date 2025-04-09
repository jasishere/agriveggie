// api/get_imagekit_auth.js (Vercel function)

const axios = require('axios');

const IMAGEKIT_PUBLIC_KEY = 'public_cl2IvhD5fdLu2jVbH5kaLufybGI=';
const IMAGEKIT_PRIVATE_KEY = 'private_ytjZ6oLP3jcX9sgnhvQj3F7K6CQ=';
const IMAGEKIT_URL = 'https://upload.imagekit.io/api/v1/files/upload';

module.exports = async (req, res) => {
  try {
    const response = await axios.get('your-backend-url-to-fetch-auth-data');

    if (response.status !== 200) {
      return res.status(500).send('Failed to get ImageKit auth data');
    }

    // Return the auth data from your backend
    res.status(200).json(response.data); 
  } catch (error) {
    console.error('Error getting ImageKit auth data:', error);
    res.status(500).send('Internal Server Error');
  }
};
