import { votes } from "@prisma/client";
import useSWR from "swr";

export default function useVote(code: string) {
	const fetcher = (url: string) => fetch(url).then((r) => r.json());
	const { data, mutate, error } = useSWR<Res<votes>>(
		code ? "/api/vote/" + code : null,
		fetcher
	);
	return {
		data,
		mutate,
		error,
		isLoading: !error && !data,
	};
}
