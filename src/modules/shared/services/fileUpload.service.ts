import { Injectable } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";
import { CustomError } from "../helpers/customError";

@Injectable()
export class FileUploadService {
    public multerOptions = {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                callback(null, uniqueSuffix + extname(file.originalname));
            },
        }),
        fileFilter: (req, file, callback) => {
            const filetypes = /jpg|jpeg|png/;
            const mimetype = filetypes.test(file.mimetype);
            const extension = extname(file.originalname).toLowerCase(); // Corrected variable name
            const extnameCheck = filetypes.test(extension); // Use the corrected variable

            if (mimetype && extnameCheck) {
                return callback(null, true);
            }
            callback(new CustomError(400, 'Only .png, .jpg and .jpeg format allowed!'), false);
        }
    }
}