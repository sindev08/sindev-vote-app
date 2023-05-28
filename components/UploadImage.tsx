import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
	onChange?: any;
	handleDelete?: any;
	// value?: string;
	className?: string;
	imgPreview: any;
	setImgPreview: any;
}

export default function UploadImage(props: Props) {
	return (
		<div className="flex flex-col space-y-4">
			<div className="relative flex items-center self-center justify-center w-1/2 overflow-hidden rounded bg-zinc-100 aspect-square">
				<Image
					src={
						props.imgPreview ? props.imgPreview : "/assets/images/avatar.png"
					}
					alt="profile"
					width={200}
					height={200}
				/>
				{/* {props.imgPreview && (
					<button
						onClick={props.handleDelete}
						className="absolute bottom-0 left-0 p-1 bg-zinc-300"
					>
						<XMarkIcon className="w-4 h-4 " />
					</button>
				)} */}
			</div>
			{!props.imgPreview && (
				<input
					className="block w-full text-sm text-zinc-600 file:mr-6 file:py-1.5 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-zinc-900 file:text-white hover:file:bg-zinc-700"
					type="file"
					value={props.imgPreview ? props.imgPreview : ""}
					id="formFile"
					onChange={props.onChange}
				/>
			)}
		</div>
	);
}
