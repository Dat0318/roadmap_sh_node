import crypto from 'crypto';

// introduction advanced encryption standard: mã hóa tiêu chuẩn
// RSA: mã hóa bất đối xứng
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16); // initialization vector

export function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);

  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
}

export function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);

  return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
}

export function hashData(data) {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}