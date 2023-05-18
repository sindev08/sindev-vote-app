import React from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
import CountdownRenderer from "./CountdownRenderer";

interface Props {
	className?: string;
}

export default function CountDown(props: Props) {
	const countDown: CountdownRendererFn = ({
		days,
		hours,
		minutes,
		seconds,
	}) => {
		return (
			<CountdownRenderer
				days={days}
				hours={hours}
				minutes={minutes}
				seconds={seconds}
			/>
		);
	};
	return (
		<div className={`${props.className} text-center`}>
			<p>Voting akan dimulai pada:</p>
			<Countdown date={Date.now() + 1000000} renderer={countDown} />,
		</div>
	);
}
