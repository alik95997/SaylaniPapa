import multer from "multer";

const storage = multer.diskStorage({
    destination: "/upload",
    filename: (req, res, cb) => {
        console.log("file", file)
        cb(false, `${new Date().getTime()} - ${file.originalname} `)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})

export default upload