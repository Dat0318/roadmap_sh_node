import express from 'express';
import multer from 'multer';
import Joi from 'joi';
import { ManagementClient } from 'auth0';

var auth0 = new ManagementClient({
  domain: 'xxxx.auth0.com', // domain value
  clientId: 'client_id', // client_id value
  clientSecret: 'client_secret', // client_secret value
  scope: 'create:users read:users update:users',
});

// import NodeClam from 'clamscan';
// const clamScan = new NodeClam().init({
//   clamdscan: {
//     path: './upload', // Path to clamdscan binary on your server
//     config_file: '/etc/clamd.d/scan.conf', // Path to ClamAV config file on your server
//   },
//   preference: 'clamdscan',
// });

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}`);
    },
  }),
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'],
  fileFilter = (req, file, cb) => {
    let isAllow = allowedFileTypes.includes(file.mimetype);
    cb(null, isAllow);
  };
const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter }); // 2MB

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'Invalid file type or file too large.' });
  }
  try {
    // const scanResult = await clamScan.scan_file(req.file.path);
    // if (scanResult.is_infected) {
    //   fs.unlinkSync(req.file.path); // Delete infected file
    //   return res.status(400).send({ message: 'File is infected with malware.' });
    // }
    res.status(200).send({ message: 'File uploaded successfully.' });
  } catch (error) {
    res.status(500).send({ message: 'Error scanning file for malware.' });
  }
});

router.get('/files/:filename', (req, res) => {
  // Verify user authorization here

  const filename = req.params.filename;
  const filePath = path.join('../uploads', filename);
  res.sendFile(filePath);
});

const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().required(),
});

// # validate local params with joi
router.post('/route', async (req, res, next) => {
  try {
    const validatedData = await schema.validateAsync(req.body);
    // Your code here
  } catch (err) {
    if (err instanceof Joi.ValidationError) {
      res.status(400).send('Bad Request');
    } else {
      next(err);
    }
  }
});

// auth 0 external services
// https://tuan200tokyo.blogspot.com/2023/03/blog151-logging-out-when-using-passport.html
router.get('/auth0/logout', function (req, res) {
  req.logout(function () {
    // Log out
    // res.redirect( '/' );    // After logging out, move to the top page ('/')
    res.redirect(
      'https://（Auth0 domain）/v2/logout?client_id=（Auth0 client_id）&returnTo=http://localhost:8080'
    );
  });
});

router.get('/auth0/insert', function (req, res) {
  var params = { user_id: 'abcabc' },
    metadata = { nickname: '俺', picture: 'https://manholemap.juge.me/imgs/logo.jpg' };
  auth0.users.update(params, metadata, function (err, user) {
    console.log( err ? { err } : { user });
  });
});

export default router;
