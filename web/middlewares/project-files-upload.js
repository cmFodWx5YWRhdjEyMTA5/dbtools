const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/uploads/projects/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const checkIsImg = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("doc, pdf and images Only!");
  }
};

exports.projectFileUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkIsImg(file, cb);
  }
});
