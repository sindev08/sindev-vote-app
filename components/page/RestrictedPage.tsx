import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../Button";
import { signIn, useSession } from "next-auth/react";

export default function RestrictedPage() {
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();
	if (session) {
		setLoading(false);
	}
	return loading ? (
		<div className="flex items-center justify-center w-full h-screen">
			<Head>
				<title>Loading...</title>
			</Head>
			<h1 className="text-4xl font-bold ">Loading...</h1>
		</div>
	) : (
		<div className="flex flex-col items-center justify-center h-screen space-y-5 ">
			<Head>
				<title>Login dulu</title>
			</Head>
			<Image
				alt="restricted"
				src={"/assets/restricted.svg"}
				width="200"
				height={200}
			/>
			<h1 className="text-4xl font-bold ">Login dulu Yah...</h1>
			<h2 className="text-lg">
				Untuk mengakses halaman ini, kamu wajib login terlebih dahulu
			</h2>
			<Button onClick={signIn} text="Login" />
		</div>
	);
}
