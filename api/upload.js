const axios = require('axios');
const FormData = require('form-data');
const formidable = require('formidable');  // Import formidable for handling file uploads

const IMAGEKIT_PUBLIC_KEY = 'public_cl2IvhD5fdLu2jVbH5kaLufybGI=';
const IMAGEKIT_PRIVATE_KEY = 'private_ytjZ6oLP3jcX9sgnhvQj3F7K6CQ=';
const IMAGEKIT_URL = 'https://upload.imagekit.io/api/v1/files/upload';

module.exports = (req, res) => {
  // Initialize formidable to handle incoming form data
  const form = new formidable.IncomingForm();

  // Parse the incoming request
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to parse form data' });
    }

    // Destructure the necessary fields and files
    const { image } = files;  // The uploaded image file
    const { fileName, signature, expire, token } = fields;  // Other form fields

    // Check if the image is provided
    if (!image) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Prepare the form data for ImageKit
    const formData = new FormData();
    formData.append('file', image[0]);  // Assuming 'image' is an array, use the first item
    formData.append('fileName', fileName);
    formData.append('publicKey', IMAGEKIT_PUBLIC_KEY);
    formData.append('signature', signature);
    formData.append('expire', expire);
    formData.append('token', token);

    try {
      // Send the file data to ImageKit
      const response = await axios.post(IMAGEKIT_URL, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      // Return the image URL from ImageKit
      return res.json({ imageUrl: response.data.url });
    } catch (error) {
      console.error('Image upload failed:', error);
      return res.status(500).send('Image upload failed');
    }
  });
};
