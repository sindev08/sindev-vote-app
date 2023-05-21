import { votes } from "@prisma/client";
import useSWR from "swr";

export default function useVotes() {
	const fetcher = (url: string) => fetch(url).then((r) => r.json());
	const { data, error } = useSWR<Res<votes>>("/api/vots", fetcher);
	return {
		data,
		error,
		isLoading: !error && !data,
	};
}
