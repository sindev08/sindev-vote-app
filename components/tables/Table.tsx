import { LinkIcon, TrashIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import React, { useState } from "react";
import { useGlobalFilter, useTable } from "react-table";
import { showAlert } from "../Alert";
import { votes } from "@prisma/client";
import GlobalFilter from "./GlobalFilter";

interface Props {
	columns?: any;
	tableData?: any;
}

export default function Table({ columns, tableData }: Props) {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
		preGlobalFilteredRows,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data: tableData,
		},
		useGlobalFilter
	);
	const [deleteVote, setDeleteVotes] = useState<votes[]>();

	const handleDelete = (code: string) => {
		showAlert({
			title: "Anda Yakin?",
			message: "Ingin menghapus data ini?",
			onPositiveClick() {
				fetch("/api/vote/" + code, {
					method: "DELETE",
				})
					.then(() => {
						showAlert({
							title: "Berhasil",
							message: "Data Berhasil Dihapus",
						});
						setDeleteVotes(deleteVote?.filter((vote) => vote.code !== code));
					})
					.catch(() => {
						showAlert({
							title: "Gagal",
							message: "Data Gagal Dihapus",
						});
					});
			},
		});
	};
	return (
		<div>
			<GlobalFilter
				preGlobalFilteredRows={preGlobalFilteredRows}
				globalFilter={state.globalFilter}
				setGlobalFilter={setGlobalFilter}
			/>
			<table
				{...getTableProps()}
				className="w-full border table-auto border-zinc-100 "
			>
				<thead>
					{headerGroups?.map((headerGroup: any, i: number) => (
						<tr
							className="border-b border-zinc-100"
							key={i}
							{...headerGroup.getHeaderGroupProps()}
						>
							{headerGroup?.headers?.map((column: any, index: number) => (
								<th
									className="p-5 text-left"
									key={index}
									{...column.getHeaderProps()}
								>
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows?.map((row: any, i: number) => {
						prepareRow(row);
						return (
							<tr key={i} {...row.getRowProps()}>
								<td className="p-5 text-left underline">
									<a href={`/vote/${row.original.code}`}>
										{row.original.title}
									</a>
								</td>
								<td className="p-5 text-left">
									{row.original.candidates.map(
										(c: Candidate, index: number) => (
											<span key={index}>
												{c.name +
													(index < row.original.candidates.length - 1
														? " vs "
														: "")}
											</span>
										)
									)}
								</td>
								<td className="p-5 font-bold text-left">{row.original.code}</td>
								<td className="p-5 text-left">
									{moment(row.original.startDateTime).format(
										"DD MMM YYYY hh:mm a"
									)}
								</td>
								<td className="p-5 text-left">
									{moment(row.original.endDateTime).format(
										"DD MMM YYYY hh:mm a"
									)}
								</td>
								<td className="p-5 text-left">
									<div className="">
										<a href={`/participant/${row.original.code}`}>
											<LinkIcon className="w-8 h-8 p-2 hover:bg-zinc-100 " />
										</a>
										<button onClick={() => handleDelete(row.original.code)}>
											<TrashIcon className="w-8 h-8 p-2 hover:bg-zinc-100 " />
										</button>
									</div>
								</td>

								{/* {row?.cells?.map((cell: any, index: number) => {
								return (
									<td
										className="p-5 text-left"
										key={i}
										{...cell.getCellProps()}
									>
										{cell.render("Cell")}
									</td>
								);
							})} */}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

{
	/* <div className="mb-10">
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
														(index < vote.candidates.length - 1 ? " vs " : "")}
												</span>
											))}
										</td>
										<td className="p-5 font-bold text-left">{vote.code}</td>
										<td className="p-5 text-left">
											{moment(vote.startDateTime).format("DD MMM YYYY hh:mm a")}
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
			</div> */
}
