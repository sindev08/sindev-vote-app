import React from "react";
import CountdownItem from "./CountdwonItem";

interface Props {
	days: number;
	minutes: number;
	hours: number;
	seconds: number;
}

export default function CountdownRenderer(props: Props) {
	return (
		<div className="flex flex-row mx-auto justify-center">
			<CountdownItem label="Hari" value={props.days} />
			<CountdownItem label="Jam" value={props.hours} />
			<CountdownItem label="Menit" value={props.minutes} />
			<CountdownItem label="Detik" value={props.seconds} />
		</div>
	);
}
