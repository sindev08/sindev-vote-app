import React, { useEffect, useState } from "react";
import Form from "./Form";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface Props {
	candidate: Candidate;
	submitCandidate: (candidate: Candidate) => void;
	removeCandidate: (key: number) => void;
}

export default function CandidateForm(props: Props) {
	const [candidate, setCandidate] = useState<Candidate>({
		key: 0,
		name: "",
		title: "",
	});

	useEffect(() => {
		setCandidate(props.candidate);
	}, [props.candidate]);

	useEffect(() => {
		props.submitCandidate(candidate);
	}, [candidate]);

	return (
		<div className="flex flex-col p-5 border border-zinc-100">
			<div className="self-end ">
				<XCircleIcon
					className="w-6 h-6 cursor-pointer hover:bg-zinc-100 text-zinc-300"
					onClick={() => props.removeCandidate(candidate.key)}
				/>
			</div>
			<div className="relative flex items-center self-center justify-center w-1/2 overflow-hidden rounded bg-zinc-100 aspect-square">
				<Image src={"/assets/images/profile.png"} alt="profile" fill />
			</div>
			{/* <h1 className="flex items-center self-center justify-center w-1/2 text-4xl text-center rounded-full bg-zinc-100 aspect-square">
				{props.candidate.key}
			</h1> */}
			<label className="mt-3 mb-1 text-sm">Nama Kandidat</label>
			<Form
				placeholder="Masukkan Nama Kandidat"
				onChange={(e) => {
					setCandidate({ ...candidate, name: e });
				}}
				value={candidate.name}
			/>
		</div>
	);
}
