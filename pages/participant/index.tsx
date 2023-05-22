import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import Form from "../../components/Form";
import { Button } from "../../components/Button";
import { useRouter } from "next/router";
import RestrictedPage from "../../components/page/RestrictedPage";
import { useSession } from "next-auth/react";
import { showAlert } from "../../components/Alert";

export default function Participant() {
	const [code, setCodde] = useState("");
	const router = useRouter();
	const handleSubmmit = async () => {
		if (code === "") {
			showAlert({
				title: "Hmmh..",
				message: "Tolong masukkan kode yang benar",
			});
		}
		await fetch("/api/vote/" + code, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message && data?.message === "NOT_FOUND") {
					showAlert({
						title: "Hmmh...",
						message: "Kode yang anda masukkan salah",
					});
					return;
				}
				router.push("/participant/kode-voting");
				return;
			});
	};

	const { data: session } = useSession();
	if (!session) {
		return <RestrictedPage />;
	}
	return (
		<div className="container flex flex-col items-center justify-center w-full h-screen mx-auto space-y-5">
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
