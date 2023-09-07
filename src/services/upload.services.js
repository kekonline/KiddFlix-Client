import service from "../services/service.config";

//this is the code to the backend to upload pictures into cloudinary
const uploadImageService = (imageFile) => {
    return service.post("/upload", imageFile);
};

export { uploadImageService };