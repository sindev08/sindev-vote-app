import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";
import { code } from "../../../lib/code";
import { votes } from "@prisma/client";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });
	if (!session) {
		return res
			.status(404)
			.json({ message: "Kamu harus login terlebih dahulu" });
	}
	// Create New
	if (req.method === "POST") {
		const data = JSON.parse(req.body);

		const result = await prisma.votes.create({
			data: {
				title: data.title,
				candidates: data.candidates,
				startDateTime: data.startDateTime,
				endDateTime: data.endDateTime,
				publisher: data.publisher,
				code: code(6),
				deleteAt: null,
			},
		});
		// console.log(res.json(result));

		return res.json(result);

		// try {

		// 	Upload the image to Cloudinary
		// 	upload.array("candidates", 5)(req, res, async function (err) {
		// 		if (err) {
		// 			res.status(400).json({ message: "Image upload failed" });
		// 			return;
		// 		}
		// 	});
		// 	const { files } = req;
		// 	const imageUploadPromises = files.map((file: any) => {
		// 		const { buffer } = file;
		// 		return new Promise((resolve, reject) => {
		// 			const cloudinaryUpload = cloudinary.uploader.upload_stream(
		// 				{ folders: "vote-app" },
		// 				(error: any, result: unknown) => {
		// 					if (error) {
		// 						reject(error);
		// 						return;
		// 					}
		// 					resolve(result);
		// 				}
		// 			);
		// 			cloudinaryUpload.write(buffer);
		// 			cloudinaryUpload.end();
		// 		});
		// 	});

		// 	const uploadImages = await Promise.all(imageUploadPromises);

		// 	//Save image URLs adn additional data to MongoDB
		// 	const candidates = JSON.parse(req.body.candidates);
		// 	const candidatesWithImageUrl = candidates.map(
		// 		(candidate: any, index: number) => ({
		// 			key: candidate.key,
		// 			name: candidate.name,
		// 			imageUrl: uploadImages[index].secure_url,
		// 		})
		// 	);

		// 	const result = await prisma.votes.create({
		// 		data: {
		// 			title: req.body.title,
		// 			candidates: req.body.candidates,
		// 			startDateTime: req.body.startDateTime,
		// 			endDateTime: req.body.endDateTime,
		// 			publisher: req.body.publisher,
		// 			code: code(6),
		// 			deleteAt: null,
		// 		},
		// 	});
		// 	// console.log("with Image", candidatesWithImageUrl);
		// 	// console.log("without Image", req.body.candidates);

		// 	return res.json(result);
		// } catch (error) {
		// 	console.error(error);
		// 	res.status(500).json({ message: "Internal server error" });
		// }
	}

	// Get All by Users
	if (req.method === "GET") {
		const result = await prisma.votes.findMany({
			where: {
				deleteAt: null,
			},
		});
		const response: Res<votes[]> = {
			status: 200,
			data: result,
		};
		return res.json(response);
	}

	return res.status(200).json({ data: "Hello World" });
}
