import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	LinkIcon,
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import React, { useState } from "react";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import { showAlert } from "../Alert";
import { votes } from "@prisma/client";
import GlobalFilter from "./GlobalFilter";
import { useSession } from "next-auth/react";

interface Props {
	columns?: any;
	tableData?: any;
}

export default function Table({ columns, tableData }: Props) {
	// Use the state and functions returned from useTable to build your UI
	const { data: session } = useSession();
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
		preGlobalFilteredRows,
		setGlobalFilter,
		page,
		// The rest of these things are super handy, too ;)
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
	} = useTable(
		{
			columns,
			data: tableData,
		},
		useGlobalFilter,
		usePagination
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
		<div className="w-full pb-10">
			<>
				<GlobalFilter
					preGlobalFilteredRows={preGlobalFilteredRows}
					globalFilter={state.globalFilter}
					setGlobalFilter={setGlobalFilter}
				/>
				<table
					{...getTableProps()}
					className="w-full border table-auto border-zinc-100"
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
						{page?.map((row: any, i: number) => {
							prepareRow(row);
							return (
								<tr key={i} {...row.getRowProps()}>
									{row.original.publisher !== session?.user?.email ? (
										<td className="p-5 text-left">{row.original.title}</td>
									) : (
										<td className="p-5 text-left">
											<a
												className="relative flex items-center w-fit"
												href={`/vote/${row.original.code}`}
											>
												{row.original.title}
												<div className="absolute p-1 rounded-sm -right-8 bg-zinc-900 -top-4">
													<PencilSquareIcon className="w-3 h-3 text-zinc-100" />
												</div>
											</a>
										</td>
									)}

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
									<td className="p-5 font-bold text-left">
										{row.original.code}
									</td>
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
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className="flex flex-col items-center w-full pb-16 mt-8 space-y-5">
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center space-x-4">
							<button
								className="px-3 py-2 border-2 border-zinc-900"
								onClick={() => gotoPage(0)}
								disabled={!canPreviousPage}
							>
								<ChevronDoubleLeftIcon className="w-5 h-5" />
							</button>
							<button
								className="px-3 py-2 border-2 bg-zinc-900 border-zinc-900"
								onClick={() => previousPage()}
								disabled={!canPreviousPage}
							>
								<ChevronLeftIcon className="w-5 h-5 text-white" />
							</button>
						</div>
						<div className="items-center hidden space-x-4 md:flex">
							<span>
								Halaman{" "}
								<strong>
									{state.pageIndex + 1} of {pageOptions.length}
								</strong>{" "}
							</span>
							<select
								value={state.pageSize}
								className=" focus:outline-none"
								onChange={(e) => {
									setPageSize(Number(e.target.value));
								}}
							>
								{[5, 10, 20].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										Memperlihatkan {pageSize}
									</option>
								))}
							</select>
						</div>
						<div className="flex items-center space-x-4">
							<button
								className="px-3 py-2 border-2 bg-zinc-900 border-zinc-900"
								onClick={() => nextPage()}
								disabled={!canNextPage}
							>
								<ChevronRightIcon className="w-5 h-5 text-white" />
							</button>
							<button
								className="px-3 py-2 border-2 border-zinc-900"
								onClick={() => gotoPage(pageCount - 1)}
								disabled={!canNextPage}
							>
								<ChevronDoubleRightIcon className="w-5 h-5" />
							</button>
						</div>
					</div>
					<div className="flex items-center space-x-4 md:hidden">
						<span>
							Halaman{" "}
							<strong>
								{state.pageIndex + 1} of {pageOptions.length}
							</strong>{" "}
						</span>
						<select
							value={state.pageSize}
							className=" focus:outline-none"
							onChange={(e) => {
								setPageSize(Number(e.target.value));
							}}
						>
							{[5, 10, 20].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									Memperlihatkan {pageSize}
								</option>
							))}
						</select>
					</div>
				</div>
			</>
		</div>
	);
}
