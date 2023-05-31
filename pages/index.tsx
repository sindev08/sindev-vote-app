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
			{
				Header: "Aksi",
				accessor: "",
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
	console.log(tableData);

	return (
		<div className="container px-4 mx-auto xl:px-0">
			<Head>
				<title>Aplikasi Voting</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Menu />
			{/* Header */}
			<div className="flex flex-col space-y-3 place-items-center py-44">
				<h1 className="text-3xl font-bold text-center md:text-5xl">
					Ayo Mulai Voting!
				</h1>
				<h2 className="px-3 py-1 text-base text-center md:text-lg bg-zinc-100">
					Web Voting No. 1 Cirebon
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
			{tableData && tableData?.length > 0 ? (
				columns && <Table columns={columns} tableData={tableData} />
			) : (
				<div className="flex items-center justify-center w-full pb-10">
					<span className="px-3 py-1 rounded bg-zinc-100">
						Belum ada voting
					</span>
				</div>
			)}
		</div>
	);
};

export default Home;
