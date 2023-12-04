import multer from "multer";
import { uuid } from "uuidv4";
import Service from "./service.js";
import { TOKEN_ERROR } from "./const.js";
import { resolve } from "path";

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, resolve("./uploads"));
    },
    filename: (request, file, callback) => {
        const id = uuid().replace(/-/g, '');
        const filename = `${id}_${file.originalname}`;
        file.link = `/uploads/${filename}`;
        callback(null, filename);
    }
});

const uploadFile = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        callback(null, true);
    }
});

/**@type {import("./type").handler} */
const authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            result: "FAIL",
            message: ["Not authentication"]
        });
    }
    const { error, data } = Service.JWT.verifyAccessToken(token);
    if (error) {
        if (error.message == TOKEN_ERROR.TOKEN_EXPIRED) {
            return res.status(401).json({
                result: "FAIL",
                message: ["Token expired"],
                error: error
            });
        }
        else if (error.message == TOKEN_ERROR.TOKEN_INVALID) {
            return res.status(401).json({
                result: "FAIL",
                message: ["Invalid token"],
                error: error
            });
        }
        else return res.status(401).json({
            result: "FAIL",
            message: ["Unknown"],
            error: error
        });
    }
    req.payload = data;
    next();
}

export { uploadFile, authentication }