import { useState } from "react";
import { Button } from "./Button";
import { createRoot } from "react-dom/client";

interface Props {
	isOpen?: boolean;
	title?: string;
	message?: string;
	positiveBtnText?: string;
	negativeBtnText?: string;
	onPositiveClick?: () => void;
	onNegativeClick?: () => void;
}

function Alert(props: Props) {
	const [isOpen, setIsOpen] = useState(props.isOpen);
	return (
		<div
			className={`relative z-10 ${!isOpen && "hidden"}`}
			role="dialog"
			arial-modal="true"
		>
			<div className="fixed inset-0 bg-zinc-900 bg-opacity-40 transition-opacity"></div>
			<div className="fixed inset-0 z-10 overflow-y-auto">
				<div className="flex min-h-full items-center justify-center text-center">
					<div className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all p-4 rounded-md">
						{/* Content */}
						<div className="w-full p-5 text-center">
							<p className="text-2xl font-bold">{props.title || "Title"}</p>
							<p className="text-lg"> {props.message || "Message Here"}</p>
						</div>
						{/* Content */}
						<div className="space-x-3 mt-5">
							<button
								className="text-sm bg-zinc px-2 py-1 hover:bg-zinc-200 bg-zinc-100"
								onClick={() => {
									props.onNegativeClick;
									setIsOpen(false);
								}}
							>
								{props.negativeBtnText || "Kembali"}
							</button>
							<Button
								text={props.positiveBtnText || "Iya"}
								className={`${!props.onPositiveClick && "hidden"}`}
								onClick={() => {
									props.onPositiveClick && props.onPositiveClick();
									setIsOpen(false);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export function showAlert(props: Props) {
	const alert = document.createElement("div");
	alert.id = "alert";
	document.body.appendChild(alert);
	const root = createRoot(alert);
	root.render(
		<Alert
			isOpen={true}
			title={props.title}
			message={props.message}
			positiveBtnText={props.positiveBtnText}
			negativeBtnText={props.negativeBtnText}
			onPositiveClick={props.onPositiveClick}
			onNegativeClick={props.onNegativeClick}
		/>
	);
}
