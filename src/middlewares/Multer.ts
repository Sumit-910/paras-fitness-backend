import multer from 'multer';
import path from 'path';

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log("directory ",__dirname);
        cb(null, path.join(__dirname, '../../../client/public/uploads'));
      },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter (optional)
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
