import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./src/public/files/images/attachments");
  },
  filename: function (req, file, callback) {
    let ext = file.originalname.split(".").pop();
    // callback(null, "file" + "-" + Date.now() + "." + ext);
    callback(null, uuidv4() + "." + ext);
  }
});

const uploader = multer({ storage: storage });

export default uploader;
