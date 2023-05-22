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

	// Get Detail by code
	if (req.method === "GET") {
		const vote = await prisma?.votes.findFirst({
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
		if (!vote) {
			return res.status(404).json({ message: "NOT_FOUND" });
		}

		// Get Participant of the vote
		const participants = await prisma?.participant.findMany({
			select: {
				candidate: true,
				email: true,
				createdAt: true,
			},
			where: {
				code: code as string,
			},
		});

		// Count Vote for each candidate
		var candidates: Candidate[] = [];
		if (participants) {
			candidates = vote?.candidates.map((candidate) => {
				const votes =
					participants.filter(
						(participant) => participant.candidate === candidate.name
					).length || 0;
				return {
					...candidate,
					votes,
				};
			}) as Candidate[];
		}

		const clientVote: Vote = {
			id: vote.id,
			publisher: vote.publisher,
			title: vote.title,
			code: vote.code,
			startDateTime: String(vote.startDateTime),
			endDateTime: String(vote.endDateTime),
			candidates: vote.candidates,
			createdAt: String(vote.createdAt),
			totalVotes: candidates
				? candidates?.reduce(
						(acc, candidate) => acc + (candidate.votes ? candidate.votes : 0),
						0
				  )
				: 0,
		};

		const response: Res<Vote> = {
			status: 200,
			data: clientVote,
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
