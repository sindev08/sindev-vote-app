import { useSession } from "next-auth/react";
import React from "react";
import RestrictedPage from "../../components/page/RestrictedPage";

export default function Vote() {
	const { data: session } = useSession();
	if (!session) {
		return <RestrictedPage />;
	}
	return <div>Vote</div>;
}
