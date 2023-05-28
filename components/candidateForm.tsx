import React, { useEffect, useState } from "react";
import Form from "./Form";
import { XCircleIcon } from "@heroicons/react/24/solid";
import UploadImage from "./UploadImage";

interface Props {
	candidate: Candidate;
	submitCandidate: (candidate: Candidate) => void;
	removeCandidate: (key: number) => void;
}

export default function CandidateForm(props: Props) {
	const [imgPreview, setImgPreview] = useState("/assets/images/avatar.png");
	const [candidate, setCandidate] = useState<Candidate>({
		key: 0,
		name: "",
		title: "",
		imageUrl: "",
	});

	// const onChangeUpload = (e: any) => {
	// 	const file = e.target.files[0];
	// 	setCandidate({ ...candidate, imageUrl: e.target.files[0] });
	// 	console.log(e.target.files[0]);
	// 	console.log(candidate.imageUrl);
	// 	// if (file.size > 1024000) alert("GAGAL");
	// 	// else {
	// 	// 	setCandidate({ ...candidate, imageUrl: e.target.files[0] });
	// 	// }
	// };

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
			{/* Image */}
			<UploadImage
				onChange={(e: { target: { files: any[] } }) => {
					setCandidate({ ...candidate, imageUrl: e.target.files[0] });
				}}
				imgPreview={imgPreview}
				setImgPreview={setImgPreview}
			/>
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
