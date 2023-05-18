import React from "react";
import { zeroPad } from "react-countdown";

interface ItemProps {
	value: number;
	label: string;
}
export default function CountdownItem({ label, value }: ItemProps) {
	return (
		<div className="flex items-center">
			<div className="flex flex-col text-center">
				<span className="text-5xl font-bold">{zeroPad(value, 2)}</span>
				<span className="text-xl font-light">{label}</span>
			</div>
			{label !== "Detik" && <span className="mx-auto text-4xl ">:</span>}
		</div>
	);
}
