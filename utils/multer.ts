import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/images/uploads");
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString() + "-" + file.originalname);
	},
});

const fileFilter = (
	req: any,
	file: { mimetype: string },
	cb: (arg0: null, arg1: boolean) => void
) => {
	if (
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/png"
	) {
		cb(null, true);
	} else {
		// cb(new Error('Not supported file type!'), false);
		({ error: "Unsupported file format. Upload only JPEG/JPG or PNG" });
	}
};

const upload = multer({
	storage,
	limits: { fieldSize: 1024 * 1024 },
	fileFilter,
});

export default upload;
