import React from "react";
import { formatDateTime, cn } from "@/lib/utils";

const FormattedDateTime = ({
	date,
	className,
}: {
	date: string | null | undefined;
	className?: string;
}) => {
	return (
		<p className={cn("body-2 text-light-200", className)}>
			{formatDateTime(date)}
		</p>
	);
};

export default FormattedDateTime;
