import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Menu } from "../../components/Menu";
import CandidateItem from "./CandidateItem";
import { Button } from "../../components/Button";
import Countdown from "../../components/Countdown/Countdown";
import { showAlert } from "../../components/Alert";

export default function DetailParticipant() {
	const router = useRouter();
	const { code } = router.query;
	return (
		<div className="container mx-auto">
			<Head>
				<title>Mulai Voting</title>
			</Head>
			<Menu />
			<div>
				<h1 className="mt-10 text-4xl text-center">Judul Voting</h1>
				{/* Timer */}
				<Countdown className="mt-10" />
				{/* Timer */}
				{/* Kandidat */}
				<div className="w-2/3 mx-auto mt-10 space-y-3 ">
					<CandidateItem />
					<CandidateItem />
					<CandidateItem />
					<CandidateItem />
				</div>
				{/* Kandidat */}
				{/* Submit */}
				<div className="mt-10 text-center">
					<Button
						text="Kirim Vote Saya"
						onClick={() =>
							showAlert({
								title: "Yeayy",
								message: "Kamu Berhasil",
								positiveBtnText: "Iya",
								onPositiveClick() {},
							})
						}
					/>
				</div>
			</div>
		</div>
	);
}
