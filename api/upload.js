const axios = require('axios');

const IMAGEKIT_PUBLIC_KEY = 'public_cl2IvhD5fdLu2jVbH5kaLufybGI=';
const IMAGEKIT_PRIVATE_KEY = 'private_ytjZ6oLP3jcX9sgnhvQj3F7K6CQ=';
const IMAGEKIT_URL = 'https://upload.imagekit.io/api/v1/files/upload';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { image, fileName, token, expire, signature } = req.body;

    if (!image || !fileName || !signature || !token || !expire) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const response = await axios.post(
      IMAGEKIT_URL,
      {
        file: image, // base64 image string
        fileName,
        token,
        expire,
        signature,
      },
      {
        auth: {
          username: IMAGEKIT_PUBLIC_KEY,
          password: IMAGEKIT_PRIVATE_KEY,
        },
      }
    );

    res.status(200).json({ imageUrl: response.data.url });
  } catch (err) {
    console.error('Upload failed', err?.response?.data || err);
    res.status(500).json({ error: 'Upload failed', details: err?.response?.data });
  }
}

