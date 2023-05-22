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
		<div className="flex flex-row justify-center mx-auto">
			{props.days > 0 && <CountdownItem label="Hari" value={props.days} />}
			{props.hours > 0 && <CountdownItem label="Jam" value={props.hours} />}
			{props.minutes > 0 && (
				<CountdownItem label="Menit" value={props.minutes} />
			)}
			{props.seconds > 0 && (
				<CountdownItem label="Detik" value={props.seconds} />
			)}
		</div>
	);
}
