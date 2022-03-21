import multer from "multer";
import { randomUUID } from "crypto";

//helps multer figure out what type of file we are working with
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

type MimeKey = keyof typeof MIME_TYPE_MAP;

const fileUpload = multer({
  limits: { fileSize: 10000000 },
  //handles creation and saving of files to storage media
  storage: multer.diskStorage({
    //req sent, file sent, and callback func
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      //converts left side of map sent to right side, getting proper extension
      const extension = MIME_TYPE_MAP[file.mimetype as MimeKey];
      cb(null, randomUUID() + "." + extension);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype as MimeKey];
    let error: Error | null = isValid ? null : new Error("Invalid Filetype");
    if (error) {
      cb(error);
    } else {
      cb(null, isValid);
    }
  },
});

export default fileUpload;