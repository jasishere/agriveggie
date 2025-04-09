// /api/auth.js
import crypto from 'crypto';

export default function handler(req, res) {
  const IMAGEKIT_PRIVATE_KEY = 'private_ytjZ6oLP3jcX9sgnhvQj3F7K6CQ=';

  const token = crypto.randomBytes(16).toString('hex');
  const expire = Math.floor(Date.now() / 1000) + 600; // 10 minutes from now

  const signature = crypto
    .createHmac('sha1', IMAGEKIT_PRIVATE_KEY)
    .update(token + expire)
    .digest('hex');

  res.status(200).json({
    token,
    expire,
    signature,
  });
}
