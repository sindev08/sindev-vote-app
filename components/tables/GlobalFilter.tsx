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
		<div>
			Search :{" "}
			<input
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
