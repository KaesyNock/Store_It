"use client";

/* eslint-disable tailwindcss/no-custom-classname */
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.actions";

const OTPModal = ({
	accountId,
	email,
}: {
	accountId: string;
	email: string;
}) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(true);
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// Call API to verify OTP
			const sessionId = await verifySecret({ accountId, password });

			if (sessionId) router.push("/");
		} catch (error) {
			console.log("Failed to verify OTP", error);
		}

		setIsLoading(false);
	};

	const handleResendOtp = async () => {
		await sendEmailOTP({ email });
	};

	return (
		<div>
			<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
				<AlertDialogContent className='shad-alert-dialog'>
					<AlertDialogHeader className='relative flex justify-center'>
						<AlertDialogTitle className='h-2 text-center'>
							Enter your OTP
							<Image
								src='/assets/icons/close-dark.svg'
								alt='closed'
								width={20}
								height={20}
								onClick={() => setIsOpen(false)}
								className='otp-close-button'
							/>
						</AlertDialogTitle>
						<AlertDialogDescription className='subtitle-2 text-light-100 text-center'>
							We&apos;ve sent a code to{" "}
							<span className='text-brand pl-1'>{email}</span>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<InputOTP maxLength={6} value={password} onChange={setPassword}>
						<InputOTPGroup className='shad-otp'>
							<InputOTPSlot index={0} className='chad-otp-slot' />
							<InputOTPSlot index={1} className='chad-otp-slot' />
							<InputOTPSlot index={2} className='chad-otp-slot' />
							<InputOTPSlot index={3} className='chad-otp-slot' />
							<InputOTPSlot index={4} className='chad-otp-slot' />
							<InputOTPSlot index={5} className='chad-otp-slot' />
						</InputOTPGroup>
					</InputOTP>

					<AlertDialogFooter>
						<div className='flex flex-col gap-4'>
							<AlertDialogAction
								onClick={handleSubmit}
								className='shad-submit-btn h-12'
								type='button'>
								Submit
								{isLoading && (
									<Image
										src='/assets/icons/loader.svg'
										alt='loader'
										width={24}
										height={24}
										className='ml-2 animate-spin'
									/>
								)}
							</AlertDialogAction>
							<div className='subtitle-2 text-light-100 mt-2 text-center'>
								Didn&apos;t get a code?
								<Button
									type='button'
									variant='link'
									onClick={handleResendOtp}
									className='text-brand pl-1'>
									Click to Resend
								</Button>
							</div>
						</div>
						<AlertDialogAction></AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default OTPModal;
