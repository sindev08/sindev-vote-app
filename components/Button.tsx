// import Link from "next/link";
import React from "react";

interface Props {
	text: string;
	type?: "primary" | "secondary";
	className?: string;
	onClick?: () => void;
	isLoading?: boolean;

	// url?: string | any;
}

export const Button = (props: Props) => {
	return (
		<button
			className={`${
				props.type === "secondary"
					? "border-2 border-black bg-white hover:bg-black hover:text-white text-black"
					: "border-2 border-black bg-black hover:bg-zinc-800 text-white"
			}  px-3 py-2 ${props.className}`}
			onClick={props.onClick}
			disabled={props.isLoading}
		>
			{props.isLoading ? "Loading..." : props.text}
		</button>
	);
};

// export const Button = (props: Props) => {
// 	return props.url !== "" ? (
// 		<Link
// 			className={`${
// 				props.type === "secondary"
// 					? "border-2 border-black bg-white hover:bg-black hover:text-white text-black"
// 					: "border-2 border-black bg-black hover:bg-zinc-800 text-white"
// 			}  px-3 py-2 ${props.className}`}
// 			onClick={() => props.onClick}
// 			href={props.url}
// 		>
// 			{props.text}
// 		</Link>
// 	) : (
// 		<button
// 			className={`${
// 				props.type === "secondary"
// 					? "border-2 border-black bg-white hover:bg-black hover:text-white text-black"
// 					: "border-2 border-black bg-black hover:bg-zinc-800 text-white"
// 			}  px-3 py-2 ${props.className}`}
// 			onClick={() => props.onClick}
// 		>
// 			{props.text}
// 		</button>
// 	);
// };
