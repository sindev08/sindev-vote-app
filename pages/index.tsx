import type { NextPage } from "next";
import Head from "next/head";
import { Menu } from "../components/Menu";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { useSession } from "next-auth/react";
import useVotes from "../lib/useVotes";
import { useEffect, useMemo, useState } from "react";
import { votes } from "@prisma/client";
import { showAlert } from "../components/Alert";
import Table from "../components/tables/Table";

const Home: NextPage = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const { data: dataVotesApi, error, isLoading } = useVotes();
	// console.log("dataVotesApi", dataVotesApi);

	const [votes, setVotes] = useState<votes[]>();

	const columns = useMemo(
		() => [
			{
				Header: "Judul",
				accessor: "title",
			},
			{
				Header: "Kandidat",
				accessor: "candidates",
			},
			{
				Header: "Kode",
				accessor: "code",
			},
			{
				Header: "Mulai",
				accessor: "startDateTime",
			},
			{
				Header: "Selesai",
				accessor: "endDateTime",
			},
		],
		[]
	);

	useEffect(() => {
		if (dataVotesApi) {
			setVotes(dataVotesApi?.data);
		}
	}, [dataVotesApi]);
	const tableData = useMemo(() => votes, [votes]);

	return (
		<div className="container mx-auto">
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Menu />

			{/* Header */}
			<div className="flex flex-col space-y-3 place-items-center py-44">
				<h1 className="text-5xl font-bold">Ayo Mulai Voting!</h1>
				<h2 className="px-3 py-1 text-lg bg-zinc-100">
					Web Voting No. 1 Indonesia
				</h2>
				<Image
					src={"/assets/header.svg"}
					width={274}
					height={243}
					alt="Header"
				/>
				<div className="space-x-10">
					<Button
						onClick={() => router.push("/vote/create")}
						text="Buat Vote Baru"
						className="font-bold"
					/>
					<Button
						text="Ikutan Vote"
						type="secondary"
						onClick={() => router.push("/participant")}
					/>
				</div>
			</div>

			{session && tableData && columns && (
				<Table columns={columns} tableData={tableData} />
			)}

			{/* Table */}
			{/* {session && (
				<div className="mb-10">
					<span className="py-5 text-lg font-bold">Vote yang saya buat</span>
					<table className="w-full border table-auto border-zinc-100 ">
						<thead>
							<tr className="border-b border-zinc-100">
								<th className="p-5 text-left">No</th>
								<th className="p-5 text-left">Judul</th>
								<th className="p-5 text-left">Kandidat</th>
								<th className="p-5 text-left">Kode</th>
								<th className="p-5 text-left">Mulai</th>
								<th className="p-5 text-left">Selesai</th>
								<th className="p-5 text-left"></th>
							</tr>
						</thead>
						<tbody>
							{votes && votes.length > 0
								? votes?.map((vote: votes, i: number) => (
										<tr key={i}>
											<td className="p-5 text-left">{i + 1}</td>
											<td className="p-5 text-left underline">
												<a href={`/vote/${vote.code}`}>{vote.title}</a>
											</td>
											<td className="p-5 text-left">
												{vote.candidates.map((c: Candidate, index: number) => (
													<span key={index}>
														{c.name +
															(index < vote.candidates.length - 1
																? " vs "
																: "")}
													</span>
												))}
											</td>
											<td className="p-5 font-bold text-left">{vote.code}</td>
											<td className="p-5 text-left">
												{moment(vote.startDateTime).format(
													"DD MMM YYYY hh:mm a"
												)}
											</td>
											<td className="p-5 text-left">
												{moment(vote.endDateTime).format("DD MMM YYYY hh:mm a")}
											</td>
											<td className="p-5 text-left">
												<div className="">
													<a href={`/participant/${vote.code}`}>
														<LinkIcon className="w-8 h-8 p-2 hover:bg-zinc-100 " />
													</a>
													<button onClick={() => handleDelete(vote.code)}>
														<TrashIcon className="w-8 h-8 p-2 hover:bg-zinc-100 " />
													</button>
												</div>
											</td>
										</tr>
								  ))
								: "Belum ada votes yang dibuat"}
						</tbody>
					</table>
				</div>
			)} */}
		</div>
	);
};

export default Home;
