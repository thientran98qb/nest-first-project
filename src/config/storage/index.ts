import { diskStorage } from "multer";

export const storageConfig = (folder: string) => diskStorage({
    destination: `uploads/${folder}`,
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = file.originalname.split('.').pop(); // Get the original file extension
        const newFilename = `${file.fieldname}-${uniqueSuffix}.${fileExtension}`;
        callback(null, newFilename);
    },
})
