const axios = require('axios');
const FormData = require('form-data');

const IMAGEKIT_PRIVATE_KEY = 'yprivate_ytjZ6oLP3jcX9sgnhvQj3F7K6CQ=';
const IMAGEKIT_PUBLIC_KEY = 'public_cl2IvhD5fdLu2jVbH5kaLufybGI=';
const IMAGEKIT_URL = 'https://upload.imagekit.io/api/v1/files/upload';

module.exports = async (req, res) => {
  const { image, fileName, signature, expire, token } = req.body;

  const form = new FormData();
  form.append('file', Buffer.from(image, 'base64'));
  form.append('fileName', fileName);
  form.append('publicKey', IMAGEKIT_PUBLIC_KEY);
  form.append('signature', signature);
  form.append('expire', expire);
  form.append('token', token);

  try {
    const response = await axios.post(IMAGEKIT_URL, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    return res.json({ imageUrl: response.data.url });
  } catch (error) {
    console.error('Image upload failed:', error);
    return res.status(500).send('Image upload failed');
  }
};
