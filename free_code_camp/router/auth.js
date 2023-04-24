import express from 'express';
import sanitizeHtml from 'sanitize-html';
import { body, validationResult } from 'express-validator';
import verifyToken from '../middleware/authMiddleware.js';
import authController from '../controllers/authController.js';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import GoogleRecaptcha from 'google-recaptcha';
import redis from 'redis';
import { decrypt, encrypt, hashData } from '../common/encrypt.js';

const router = express.Router();
const client = redis.createClient();
const recaptcha = new GoogleRecaptcha({ secret: 'YOUR_SECRET_KEY' });

{
  /* Client side for re-captcha
  <head>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
  </head>
  <body>
    <form>
      <!-- Your form fields -->
      <div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
      <button type="submit">Submit</button>
    </form>
  </body>
*/
}
// Authentication routes
router.post('/login', (req, res) => {
  const recaptchaResponse = req.body['g-recaptcha-response'];

  recaptcha.verify({ response: recaptchaResponse }, (error) => {
    if (error) {
      // Invalid or expired reCAPTCHA response
      res.status(400).json({ error: 'Invalid captcha' });
    } else {
      // Continue with your login logic
      req.session.regenerate((err) => {
        if (err) {
          // Handle error
        } else {
          req.session.authenticated = true;
          res.redirect('/');
        }
      });
    }
  });
});
// Implement account lockouts attempts
router.post('/login-lock', (req, res) => {
  const { username, password } = req.body;

  // Check if the account is locked
  client.get(`lockout:${username}`, (err, lockout) => {
    if (lockout) {
      return res.status(429).json({ error: 'Account locked' });
    }

    // Check the provided credentials
    authenticate(username, password, (err, success) => {
      if (success) {
        // Reset the failed login attempts counter
        client.del(`failed:${username}`);
        // Continue with your login logic
      } else {
        // Increment the failed login attempts counter
        client.incr(`failed:${username}`);

        // Check if the limit has been reached
        client.get(`failed:${username}`, (err, attempts) => {
          if (attempts >= 5) {
            // Lock the account for 30 minutes
            client.setex(`lockout:${username}`, 30 * 60, 1);
          }
        });

        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });
});
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      // Handle error
    } else {
      res.redirect('/login');
    }
  });
});
router.post('/register', authController.register);
router.post('/authenticate', authController.authenticate);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

router.get('/protected', verifyToken, (req, res) => {
  res.send('Access granted: You are authenticated');
});

router.post(
  '/submit',
  [
    // basic validate of params
    body('username')
      .custom((value) => {
        if (/\d/.test(value)) {
          throw new Error('Username must not contain numbers');
        }
        return true;
      })
      .isLength({ min: 5 })
      .withMessage('Username must be at least 5 characters long'),
    body('email').isEmail().withMessage('Email must be a valid email address'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('Form submitted successfully');
  }
);

router.post('/comment', (req, res) => {
  const sanitizedComment = sanitizeHtml(req.body.comment, {
    allowedTags: ['b', 'i', 'em', 'strong', 'u'],
    allowedAttributes: {},
  });
  res.send(`Comment received: ${sanitizedComment}`);
});

// Two factor authentication 2fa
router.get('/generate-secret', (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  res.send(secret);
});

router.get('/generate-qr', async (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

  res.send(`
    <div>
      <h2>Scan the QR Code with a TOTP App</h2>
      <img src="${qrCodeUrl}" alt="QR Code">
      <p><strong>Secret:</strong> ${secret.base32}</p>
    </div>
  `);
});

router.post('/verify-totp', (req, res) => {
  //qr code and call api verify
  const { token, secret } = req.body;

  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
  });

  if (verified) {
    res.send({ status: 'success', message: 'Two-Factor Authentication successful!' });
  } else {
    res.send({ status: 'error', message: 'Invalid token. Please try again.' });
  }
});

router.post('/encrypt', (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).send('No data provided');
  }

  res.status(200).send({ encrypted: encrypt(data) });
});

router.post('/decrypt', (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).send('No data provided');
  }

  res.status(200).send({ encrypted: decrypt(data) });
});

router.post('/hash', (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).send('No data provided');
  }

  res.status(200).send({ hash: hashData(data) });
});

export default router;
