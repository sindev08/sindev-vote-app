import React, { useEffect, useState } from "react";
import Form from "./Form";
import { XCircleIcon } from "@heroicons/react/24/solid";
import UploadImage from "./UploadImage";
import { showAlert } from "./Alert";
import axios from "axios";

interface Props {
	candidate: Candidate;
	submitCandidate: (candidate: Candidate) => void;
	removeCandidate: (key: number) => void;
}

export default function CandidateForm(props: Props) {
	const [imgPreview, setImgPreview] = useState(null);
	const [candidate, setCandidate] = useState<Candidate>({
		key: 0,
		name: "",
		title: "",
		imageUrl: "",
		imagePublicId: "",
	});

	const onChangeUpload = async (e: any) => {
		const file = e.target.files[0];

		// setCandidate({ ...candidate, imageUrl: e.target.files[0] });
		if (file.type !== "image/png") {
			return showAlert({
				title: "Hmmmh..",
				message: "Format file harus PNG",
			});
		}
		if (file.size > 1024000) {
			return showAlert({
				title: "Hmmmh..",
				message: "Ukuran file tidak boleh lebih dari 1 MB",
			});
		} else {
			const data = new FormData();
			data.append("file", file);
			data.append("upload_preset", "public-vote");
			data.append("cloud_name", "djrxbywav");
			data.append("folder", "public-vote");
			try {
				const resp = await axios.post(
					`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
					data
				);
				setImgPreview(resp.data.url);
				setCandidate({
					...candidate,
					imageUrl: resp.data.url,
					imagePublicId: resp.data.public_id,
				});
			} catch (err) {
				console.log("errr : ", err);
			}
		}
	};

	// const deleteImage = async (e: any) => {
	// 	e.preventDefault();
	// 	cloudinary.v2.uploader
	// 		.destroy(candidate.imagePublicId, function (error: any, result: any) {
	// 			console.log(result, error);
	// 		})
	// 		.then((resp: any) => console.log(resp))
	// 		.catch((_err: any) =>
	// 			console.log("Something went wrong, please try again later.")
	// 		);
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
				onChange={onChangeUpload}
				// handleDelete={deleteImage}
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
