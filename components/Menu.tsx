import Image from "next/image";
import React from "react";
import { Button } from "./Button";
import { useRouter } from "next/router";

export const Menu = () => {
	const router = useRouter();
	return (
		<div className="flex justify-between py-5 ">
			<Image
				src="/assets/jujurly.svg"
				width={100}
				height={100}
				alt="Jujurly"
				className="cursor pointer"
				onClick={() => router.push("/")}
			/>
			<Button text="Login" />
		</div>
	);
};
