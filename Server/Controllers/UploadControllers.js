import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 5 * 1024 * 1024 },
}).single("file");

const handleSingleUploadFile = async (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, (error) => {
      if (error) {
        reject(error);
      }

      resolve({ file: req.file, body: req.body });
    });
  });
};

// Upload File
export const uploadFile = async (req, res) => {
  try {
    const uploadResult = await handleSingleUploadFile(req, res);
    res
      .status(200)
      .json({
        success: true,
        message: "File Uploaded Successfully",
        data: uploadResult,
      });
  } catch (error) {
    console.log(error);
    res.status(422).json({ errors: [e.message] });
  }
};
