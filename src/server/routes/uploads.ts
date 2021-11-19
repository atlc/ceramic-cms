import * as express from "express";
import * as multer from "multer";
import { uploadS3 } from "../utils/s3";

const router = express.Router();

const storage = multer.memoryStorage();
const uploadFile = multer({ storage });

router.post("/", uploadFile.single("temp"), async (req, res) => {
    try {
        const uploadRes = await uploadS3(req.file.buffer, req.file.originalname);
        //@ts-ignore
        const image_url = uploadRes.Location;
        res.json({ image_url });
    } catch (error) {
        res.status(500).json({ message: "Unable to upload image", error });
    }
});

export default router;
