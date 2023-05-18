import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import Form from "../../components/Form";
import { Button } from "../../components/Button";
import { useRouter } from "next/router";

export default function Participant() {
	const [code, setCodde] = useState("");
	const router = useRouter();
	const handleSubmmit = () => {
		router.push("/participant/kode-voting");
	};
	return (
		<div className="flex flex-col w-full items-center justify-center h-screen space-y-5 container mx-auto">
			<Head>
				<title>Ikut Partisipasi</title>
			</Head>
			<Image
				alt="participant"
				src={"/assets/participant.svg"}
				width={200}
				height={180}
			/>
			<h1 className="text-4xl font-bold ">Ikutan Voting</h1>
			<h2 className="w-1/3 text-center">
				Untuk ikutan voting, kamu harus memasukkan kode voting yang sudah di
				berikan panitia/penyelenggara
			</h2>
			<Form
				placeholder="Masukkan koda voting"
				className="w-1/3 mt-3"
				value={code}
				onChange={setCodde}
			/>
			<Button onClick={handleSubmmit} text="Lanjutkan" className="w-1/3" />
			<button className="text-sm" onClick={() => router.push("/")}>
				Kembali
			</button>
		</div>
	);
}
