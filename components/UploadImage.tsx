import Image from "next/image";
import React, { useState } from "react";

interface Props {
	onChange?: any;
	// value?: string;
	className?: string;
	imgPreview: any;
	setImgPreview: any;
}

export default function UploadImage(props: Props) {
	// const onChangeUpload = (e: any) => {
	// 	const reader = new FileReader();

	// 	reader.onload = () => {
	// 		if (reader?.readyState === 2) {
	// 			setImgPreview(reader.result);
	// 		}
	// 	};

	// 	setImg(e?.target?.file[0]);
	// 	reader.readAsDataURL(e.target.file[0]);
	// };
	return (
		<div className="flex flex-col space-y-4">
			<div className="relative flex items-center self-center justify-center w-1/2 overflow-hidden rounded bg-zinc-100 aspect-square">
				<Image src={props.imgPreview} alt="profile" fill />
			</div>
			<input
				className="block w-full text-sm text-zinc-600 file:mr-6 file:py-1.5 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-zinc-900 file:text-white hover:file:bg-zinc-700"
				type="file"
				id="formFile"
				onChange={props.onChange}
			/>
		</div>
	);
}
