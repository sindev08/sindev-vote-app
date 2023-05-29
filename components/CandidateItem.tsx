import { CheckIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

interface Props {
	name: string;
	title?: string;
	index: number;
	percentage?: number;
	onClick?: () => void;
	isSelected: boolean;
	imageUrl: any;
}

export default function CandidateItem(props: Props) {
	return (
		<div className="flex flex-row items-center p-5 space-x-3 border rounded-md border-zinc-100">
			<div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-center bg-zinc-100">
				{props.index + 1}
			</div>
			<div className="relative flex items-center self-center justify-center w-24 overflow-hidden rounded bg-zinc-100 aspect-square">
				<Image src={props.imageUrl} alt="profile" fill />
			</div>
			<div className="w-full ">
				<h3 className="text-lg font-bold">{props.name}</h3>
				<p>{props.title}</p>
				<div className="flex flex-row items-center space-x-2">
					{/* Bar */}
					<div className="w-full h-1 rounded-full bg-zinc-100">
						<div
							className="h-1 bg-black rounded-full"
							style={{ width: `${props.percentage}%` }}
						></div>
					</div>
					{/* Bar */}
					{/* Indikator */}
					<p className="text-sm font-bold ">
						{Intl.NumberFormat("en", { notation: "compact" }).format(
							props.percentage || 0
						)}
						%
					</p>
					{/* Indikator */}
				</div>
			</div>
			<div
				onClick={props.onClick}
				className={`flex items-center justify-center w-20 h-20 rounded-md cursor-pointer ${
					props.isSelected
						? "bg-red-500 hover:bg-green-600"
						: "bg-orange-500 hover:bg-zinc-200"
				}`}
			>
				<CheckIcon className="w-7 h-7" />
			</div>
		</div>
	);
}
