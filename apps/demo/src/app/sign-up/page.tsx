import type { Metadata } from "next/types";
import { SignUpForm } from "./client";

export const metadata: Metadata = {
	title: "Sign up",
};

export default function SignIn() {
	return (
		<div className="min-h-dvh grid place-items-center">
			<div className="max-w-md w-full space-y-6">
				<h1 className="text-2xl font-medium">Sign up</h1>
				<SignUpForm />
			</div>
		</div>
	);
}
