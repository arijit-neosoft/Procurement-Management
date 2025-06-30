import path from 'node:path';

import multer from 'multer';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `img-${file.fieldname}${path.extname(file.originalname)}`);
  },
});

const singleUploadImageOnly = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(new Error('Error: Images only! (jpeg, jpg, png, gif)'));
  },
}).single('img');

export const _multer = {
  singleUploadImageOnly: singleUploadImageOnly,
};
