import { diskStorage } from 'multer';
import {  join } from 'path';
export const multerOptions = {
  storage: diskStorage({
    destination: join('src/Assets'),
    filename: (req, file, callback) => {
      const filename = file.originalname;
      callback(null, filename);
    },
  }),
};
