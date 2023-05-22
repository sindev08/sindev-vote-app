import React from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
import CountdownRenderer from "./CountdownRenderer";
import {
	STATE_ENDED,
	STATE_LOADING,
	STATE_NOT_STARTED,
	STATE_STARTED,
} from "../../pages/participant/[code]";

interface Props {
	className?: string;
	start: string;
	end: string;
	currentState: string;
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
			{props.currentState === STATE_LOADING && <span>Tunggu Sebentar</span>}
			{props.currentState === STATE_NOT_STARTED && (
				<div>
					<p>Voting akan dimulai pada:</p>
					<Countdown date={props.start} renderer={countDown} />
				</div>
			)}
			{props.currentState === STATE_STARTED && (
				<div>
					<p>Voting sedang berlangsung:</p>
					<Countdown date={props.end} renderer={countDown} />
				</div>
			)}
			{props.currentState === STATE_ENDED && (
				<div>
					<p>Voting telah beraakhir</p>
				</div>
			)}
		</div>
	);
}
