const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalname = file.originalname;
        callback(null, uniqueSuffix + '-' + originalname);
    }
});

const isPDF = (req, file, callback) => {
    if (file.mimetype === 'application/pdf') {
        callback(null, true);
    } else {
        callback(new Error('Only PDF files are allowed'));
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50000000, // 50MB (Note: 1MB = 1000000 bytes)
        files: 2, // Maximum number of files allowed
    },
    fileFilter: isPDF
});

const uploadDocumentMiddleware = (req, res, next) => {
  upload.array('files')(req, res, (err) => {
      console.log('Inside upload callback');
      if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: err.message });
      } else if (err) {
          return res.status(400).json({ error: err.message });
      }
      next();
  });
};


module.exports = uploadDocumentMiddleware;
