import service from "../services/service.config";

const uploadImageService = (imageFile) => {
    return service.post("/upload", imageFile);
};

export { uploadImageService };