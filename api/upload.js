// /api/upload.js
import axios from 'axios';

export default async function handler(req, res) {
  // Allow CORS for dev/testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, fileName, token, expire, signature } = req.body;

    if (!image || !fileName || !signature || !token || !expire) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await axios.post(
      'https://upload.imagekit.io/api/v1/files/upload',
      {
        file: image, // base64 string
        fileName,
        token,
        expire,
        signature,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        auth: {
          username: 'public_cl2IvhD5fdLu2jVbH5kaLufybGI=',
          password: 'private_ytjZ6oLP3jcX9sgnhvQj3F7K6CQ=',
        },
      }
    );

    return res.status(200).json({ imageUrl: response.data.url });
  } catch (error) {
    console.error('ImageKit upload error:', error?.response?.data || error.message);
    return res.status(500).json({
      error: 'Upload failed',
      details: error?.response?.data || error.message,
    });
  }
}
