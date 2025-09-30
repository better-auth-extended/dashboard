"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { useTransition } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
	name: z.string(),
	email: z.email(),
	password: z.string(),
});

export const SignUpForm = () => {
	const [loading, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof signUpSchema>) => {
		startTransition(async () => {
			await authClient.signUp.email({
				name: values.name,
				email: values.email,
				password: values.password,
				fetchOptions: {
					onError: (ctx) => {
						form.setError("root", {
							message: ctx.error.message,
						});
					},
					onSuccess: () => {
						router.push("/dashboard");
					},
				},
			});
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{form.formState.errors.root?.message && (
					<p className="text-sm text-destructive">
						{form.formState.errors.root?.message}
					</p>
				)}

				<Button type="submit" disabled={!form.formState.isDirty || loading}>
					{loading ? (
						<Loader2Icon className="animate-spin repeat-infinite" />
					) : null}
					Sign in
				</Button>
			</form>
		</Form>
	);
};
