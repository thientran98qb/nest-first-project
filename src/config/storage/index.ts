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
export const fileFilter = (req: any, file: any, callback: any) => {
    const fileType = file.mimetype
    const minetypes = ['image/png', 'image/jpg', 'image/jpeg']
    if (!minetypes.includes(fileType)) {
      req.errMsg = 'Not support file type, please change file upload'
      return callback(null, false)
    }
    if (file.size > MAX_SIZE) {
      req.errMsg = 'Max size allow just 5MB, please check it'
      return callback(null, false)
    }
    return callback(null, true)
}

export const MAX_SIZE = 5 * 1024 * 1024
export const FILE_TYPES_REG = '.(png|jpeg|jpg)'
