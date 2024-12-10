import { Router } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ejercicios",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
} as any);

const upload = multer({ storage });

const router = Router();

router.post("/", upload.single("image"), (req, res) => {
  try {
    res.json({
      success: true,
      message: "Imagen subida con éxito",
      imageUrl: req?.file?.path,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error al subir la imagen" });
  }
});

export { router };
