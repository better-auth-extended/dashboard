import { notFound } from "next/navigation";
import { DashboardPage } from "./client";
import { source } from "../../../lib/dashboard";
import { auth } from "@/lib/auth";

type Props = {
	params: Promise<{ all: string | string[] | undefined }>;
};

export default async function Dashboard({ params }: Props) {
	const slugs = (await params).all;

	const data = await source.prefetch(auth);

	return <DashboardPage slugs={slugs} {...source.dehydrate(data)} />;
}

export const generateMetadata = async ({ params }: Props) => {
	const slugs = (await params).all;

	if (!source.getPage(slugs)) {
		notFound();
	}

	return source.generateMetadata(slugs);
};
