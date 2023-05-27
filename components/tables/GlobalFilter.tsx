import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

export default function GlobalFilter({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
}: any) {
	// const count = preGlobalFilteredRows.length;
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);
	return (
		<div className="flex items-center h-10 mb-8 border-2 border-zinc-900 w-fit">
			<span className="flex items-center h-full pl-3 pr-2 text-base font-semibold text-white bg-zinc-900">
				Search :{" "}
			</span>
			<input
				className="h-full px-3 font-medium bg-white focus:outline-none text-basem placeholder:text-zinc-800"
				value={value || ""}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				placeholder="Cari voting..."
			/>
		</div>
	);
}
