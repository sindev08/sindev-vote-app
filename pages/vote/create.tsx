import Head from "next/head";
import React, { useState } from "react";
import { Menu } from "../../components/Menu";
import Image from "next/image";
import Form from "../../components/Form";
import DatePicker, { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import "react-datepicker/dist/react-datepicker.css";
import CandidateForm from "../../components/candidateForm";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "../../components/Button";
import { useSession } from "next-auth/react";
import RestrictedPage from "../../components/page/RestrictedPage";
import { showAlert } from "../../components/Alert";
import { useRouter } from "next/router";
registerLocale("id", id);

export default function CreateVote() {
	const { data: session } = useSession();
	const [startDateTime, setStartDateTime] = useState(new Date());
	const [endDateTime, setEndDateTime] = useState(new Date());
	const [candidates, setCandidates] = useState<Candidate[]>([]);
	const [title, setTitle] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	if (!session) {
		return <RestrictedPage />;
	}
	const submitCandidate = (candidate: Candidate) => {
		setCandidates(
			candidates.map((c) => (c.key === candidate.key ? candidate : c))
		);
	};
	const addCandidateForm = () => {
		const newCandidate: Candidate = {
			name: "",
			key: candidates.length + 1,
			title: "",
			imageUrl: "",
			imagePublicId: "",
		};
		setCandidates([...candidates, newCandidate]);
	};

	const removeCandidateForm = (key: number) => {
		//Lis kandidat baru kecuali dengan key diatas
		const newCandidates = candidates.filter(
			(candidate) => candidate.key !== key
		);
		// Re-arrange atau diurutkan ulang...
		newCandidates.forEach((candidate, index) => {
			candidate.key = index + 1;
		});
		setCandidates(newCandidates);
	};

	const createVote = (e: any) => {
		e.preventDefault();
		//Validasi
		if (title == "") {
			showAlert({ title: "Hmmh", message: "Judul tidak boleh kosong" });
			return;
		}
		if (candidates.length < 2) {
			showAlert({ title: "Hmmh", message: "Minimal ada dua kandidat" });
			return;
		}
		if (startDateTime > endDateTime) {
			showAlert({
				title: "Hmmh",
				message: "Tanggal mulai tidak boleh lebih besar dari selesai",
			});
			return;
		}
		if (candidates.some((c) => c.name === "")) {
			showAlert({
				title: "Hmmh",
				message: "Nama kandidat tidak boleh kosong",
			});
			return;
		}

		if (candidates.some((c) => c.imageUrl === "")) {
			showAlert({
				title: "Hmmh",
				message: "Gambar kandidat tidak boleh kosong",
			});
			return;
		}

		const data = {
			title,
			startDateTime,
			endDateTime,
			candidates,
			publisher: session?.user?.email,
		};

		setLoading(true);
		fetch("/api/vote", {
			method: "POST",
			// headers: {
			// 	"Content-Type": "application/json",
			// },
			body: JSON.stringify({
				title,
				startDateTime,
				endDateTime,
				candidates,
				publisher: session?.user?.email,
			}),
		})
			.then((data) => {
				showAlert({ title: "Yeayy", message: "Voting berhasil dibuat" });
				router.push("/");
			})
			.catch(() => {
				showAlert({
					title: "Yeayy",
					message: "Voting gagal dibuat",
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className="container px-4 mx-auto xl:px-0">
			<Head>
				<title>Voting Baru</title>
			</Head>
			<Menu />

			<div className="py-10">
				<Image
					src={"/assets/create-vote.svg"}
					alt="Create Vote"
					width={284}
					height={198}
				/>
			</div>
			<h1 className="text-2xl font-bold md:text-4xl">Buat Voting Baru</h1>
			<h2 className="mt-3 text-base text-zinc">
				Silahkan masukkan data yang dibutuhkan sebelum membuat vote online
			</h2>
			<form className="flex flex-col" onSubmit={createVote}>
				{/* Detail Vote */}
				<div className="space-y-5">
					<h3 className="mt-10 text-lg font-medium md:text-xl ">
						Detail Voting
					</h3>
					<div className="flex flex-col">
						<label className="mt-5 text-sm">Judul</label>
						<Form
							onChange={(e) => {
								setTitle(e);
							}}
							value={title}
							className="w-full mt-1 md:w-1/2"
							placeholder={"Contoh : Voting Calon Gubernur"}
						/>
					</div>
					<div className="flex flex-col w-full md:w-2/3 ">
						<label>Kapan Dimulai?</label>
						<div className="flex flex-col space-y-1 md:space-y-0 md:flex-row">
							<DatePicker
								onChange={(date) => date && setStartDateTime(date)}
								locale="id"
								showTimeSelect
								selected={startDateTime}
								dateFormat="Pp"
								minDate={new Date()}
								className={"w-full bg-zinc-100 py-2 px-3"}
							/>
							<span className="p-3 text-sm text-center">sampai</span>
							<DatePicker
								onChange={(date) => date && setEndDateTime(date)}
								locale="id"
								showTimeSelect
								selected={endDateTime}
								dateFormat="Pp"
								minDate={startDateTime}
								className={"w-full bg-zinc-100 py-2 px-3"}
							/>
						</div>
					</div>
				</div>
				{/* Detail Vote */}
				{/* Kandidate */}
				<h3 className="mt-10 font-medium yexy-xl"></h3>
				<div className="grid gap-4 mt-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
					{candidates.map((candidate: Candidate, i: number) => (
						<CandidateForm
							key={i}
							candidate={candidate}
							submitCandidate={submitCandidate}
							removeCandidate={removeCandidateForm}
						/>
					))}
					<div
						className="flex flex-col items-center justify-center w-16 cursor-pointer md:-1/3 bg-zinc-100 aspect-square text-zinc-300 hover:bg-black hover:text-white"
						onClick={() => addCandidateForm()}
					>
						<PlusIcon className="w-1/2 md:w-1/3" />
					</div>
				</div>

				{/* Kandidate */}
				<div className="my-20 text-right">
					<Button text="Buat Voting" isLoading={loading} />
				</div>
			</form>
		</div>
	);
}
