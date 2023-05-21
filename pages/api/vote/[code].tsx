import { votes } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req });
	if (!session) {
		return res
			.status(401)
			.json({ message: "Kamu harus login terlebih dahulu." });
	}

	const { code } = req.query;

	// Get Detail by ciode
	if (req.method === "GET") {
		const result = await prisma?.votes.findFirst({
			select: {
				id: true,
				publisher: true,
				title: true,
				code: true,
				startDateTime: true,
				endDateTime: true,
				candidates: true,
				createdAt: true,
				deleteAt: true,
			},
			where: {
				code: code as string,
				deleteAt: null,
			},
		});
		if (!result) {
			return res.status(404).json({ message: "NOT_FOUND" });
		}
		const response: Res<votes> = {
			status: 200,
			data: result,
		};
		return res.json(response);
	}

	// Delete by Code
	if (req.method === "DELETE") {
		const result = await prisma?.votes.update({
			where: {
				code: code as string,
			},
			data: {
				deleteAt: new Date().toString(),
			},
		});
		return res.json(result);
	}

	//Update by Code
	if (req.method === "PUT") {
		const result = await prisma?.votes.update({
			where: {
				code: code as string,
			},
			data: {
				title: req.body.title,
				candidates: req.body.candidates,
				startDateTime: req.body.startDateTime,
				endDateTime: req.body.endDateTime,
			},
		});
		return res.json(result);
	}
}
