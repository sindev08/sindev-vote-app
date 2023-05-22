import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Menu } from "../../components/Menu";
import CandidateItem from "./CandidateItem";
import { Button } from "../../components/Button";
import Countdown from "../../components/Countdown/Countdown";
import { showAlert } from "../../components/Alert";
import useVote from "../../lib/useVote";
import moment from "moment";

export const STATE_NOT_STARTED = "STATE_NOT_STARTED",
	STATE_STARTED = "STATE_STARTED",
	STATE_ENDED = "STATE_ENDED",
	STATE_LOADING = "STATE_LOADING";

export default function DetailParticipant() {
	const router = useRouter();
	const { code } = router.query;
	const { data: dataVoteApi, mutate: mutateVoteApi } = useVote(code as string);

	const [selectedCandidate, setSelectedCandidate] =
		useState<Candidate | null>();
	const [currentState, setCurrentState] = useState(STATE_LOADING);

	const submitVote = async () => {
		if (selectedCandidate) {
			showAlert({
				title: "Apakah Kamu Yakin",
				message: "Kamu akan memilih kandidat " + selectedCandidate.name,
				positiveBtnText: "Ya, saya yakin",
				onPositiveClick: async () => {
					const res = await fetch(
						"/api/participant/" + dataVoteApi?.data?.code,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								candidate: selectedCandidate.name,
							}),
						}
					);
					if (res.status === 200) {
						mutateVoteApi();
						showAlert({
							title: "Vote terkirim",
							message: "Terimakasih telah berpartisipasi",
						});
					}
				},
			});
		} else {
			showAlert({
				title: "Vote Gagal",
				message: "Mohon pilih salah satu kandidat",
			});
		}
	};

	useEffect(() => {
		if (dataVoteApi && dataVoteApi?.data) {
			const vote = dataVoteApi.data;
			if (currentState === STATE_ENDED) {
				return;
			}
			const start = moment(vote?.startDateTime);
			const end = moment(vote?.endDateTime);

			const interval = setInterval(async () => {
				const now = moment();
				if (now.isBefore(start)) {
					setCurrentState(STATE_NOT_STARTED);
				} else if (now.isAfter(start) && now.isBefore(end)) {
					setCurrentState(STATE_STARTED);
				} else if (now.isAfter(end)) {
					setCurrentState(STATE_ENDED);
				}
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [dataVoteApi]);
	return (
		<div className="container mx-auto">
			<Head>
				<title>Mulai Voting</title>
			</Head>
			<Menu />
			<div>
				<h1 className="mt-10 text-4xl text-center">
					{dataVoteApi?.data?.title}
				</h1>
				{/* Timer */}
				<Countdown
					start={String(dataVoteApi?.data?.startDateTime)}
					end={String(dataVoteApi?.data?.endDateTime)}
					currentState={currentState}
					className="mt-10"
				/>
				{/* Timer */}
				{/* Kandidat */}
				<div className="w-2/3 mx-auto mt-10 space-y-3 ">
					{dataVoteApi?.data?.candidates.map(
						(candidate: Candidate, i: number) => (
							<CandidateItem
								onClick={() => {
									currentState === STATE_STARTED &&
										setSelectedCandidate(candidate);
								}}
								isSelected={selectedCandidate?.name === candidate.name}
								name={candidate.name}
								index={i}
								title={"Kandidate" + candidate.key}
								percentage={candidate.votes ? (candidate.votes / 1) * 100 : 0}
								key={i}
							/>
						)
					)}
				</div>
				{/* Kandidat */}
				{/* Submit */}
				<div className="mt-10 text-center">
					<Button
						text="Kirim Vote Saya"
						onClick={
							() => {
								submitVote();
							}
							// showAlert({
							// 	title: "Yeayy",
							// 	message: "Kamu Berhasil",
							// 	positiveBtnText: "Iya",
							// 	onPositiveClick() {},
							// })
						}
					/>
				</div>
			</div>
		</div>
	);
}
