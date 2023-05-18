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
registerLocale("id", id);

export default function CreateVote() {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [candidates, setCandidates] = useState<Candidate[]>([]);
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
	return (
		<div className="container mx-auto">
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
			<h1 className="text-4xl ffont-bol">Buat Voting Baru</h1>
			<h2 className="text-zinc mt-3">
				Silahkan masukkan data yang dibutuhkan sebelum membuat vote online
			</h2>
			<form className="flex flex-col">
				{/* Detail Vote */}
				<div className="space-y-5">
					<h3 className=" font-medium text-xl mt-10">Detail Voting</h3>
					<div className="flex flex-col">
						<label className="mt-5 text-sm">Judul</label>
						<Form
							onChange={() => {}}
							value={""}
							className="mt-1 w-1/2"
							placeholder={"Contoh : Voting Calon Gubernur"}
						/>
					</div>
					<div className="flex flex-col w-2/3 ">
						<label>Kapan Dimulai?</label>
						<div className="inline-flex">
							<DatePicker
								onChange={(date) => date && setStartDate(date)}
								locale="id"
								showTimeSelect
								selected={startDate}
								dateFormat="Pp"
								minDate={new Date()}
								className={"w-full bg-zinc-100 py-2 px-3"}
							/>
							<span className="text-sm text-center p-3">sampai</span>
							<DatePicker
								onChange={(date) => date && setEndDate(date)}
								locale="id"
								showTimeSelect
								selected={startDate}
								dateFormat="Pp"
								minDate={startDate}
								className={"w-full bg-zinc-100 py-2 px-3"}
							/>
						</div>
					</div>
				</div>
				{/* Detail Vote */}
				{/* Kandidate */}
				<h3 className="font-medium yexy-xl mt-10"></h3>
				<div className="grid gap-4 grid-cols-4 mt-5">
					{candidates.map((candidate: Candidate, i: number) => (
						<CandidateForm
							key={i}
							candidate={candidate}
							submitCandidate={submitCandidate}
							removeCandidate={removeCandidateForm}
						/>
					))}
					<div
						className="w-1/3 flex flex-col items-center justify-center cursor-pointer bg-zinc-100 aspect-square text-zinc-300 hover:bg-black hover:text-white"
						onClick={() => addCandidateForm()}
					>
						<PlusIcon className="w-1/3" />
					</div>
				</div>
				{/* Kandidate */}
				<div className="text-right mt-19">
					<Button text="Buat Voting" />
				</div>
			</form>
		</div>
	);
}
