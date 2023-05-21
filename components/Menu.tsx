import Image from "next/image";
import React from "react";
import { Button } from "./Button";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export const Menu = () => {
	const router = useRouter();

	const { data: session } = useSession();
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
			{session ? (
				<div className="space-x-3">
					<span>{session?.user?.name}</span>
					<Button text="Logout" onClick={signOut} />
				</div>
			) : (
				<Button text="Login" onClick={signIn} />
			)}
		</div>
	);
};
