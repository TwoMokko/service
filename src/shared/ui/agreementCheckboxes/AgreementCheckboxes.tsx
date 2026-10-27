"use client";

import { MdDone } from "react-icons/md";

import Link from "next/link";

import styles from "./AgreementCheckboxes.module.scss";

type AgreementName = "agreementPersonalData" | "agreementMarketing";

interface AgreementCheckboxesProps {
	agreementPersonalData: boolean;
	agreementMarketing: boolean;
	errors?: { agreementPersonalData?: boolean };
	isSubmitted?: boolean;
	onAgreementChange: (name: AgreementName, value: boolean) => void;
	className?: string;
	secondaryStyle?: boolean;
}

export function AgreementCheckboxes({
	agreementPersonalData,
	agreementMarketing,
	errors,
	isSubmitted = false,
	onAgreementChange,
	className = "",
	secondaryStyle = false,
}: AgreementCheckboxesProps) {
	const showError = Boolean(isSubmitted && errors?.agreementPersonalData);
	const agreementsConfig: Array<{
		name: AgreementName;
		checked: boolean;
		content: React.ReactNode;
		showErrorState?: boolean;
	}> = [
		{
			name: "agreementPersonalData",
			checked: agreementPersonalData,
			showErrorState: showError,
			content: (
				<div>
					Обработку моих персональных данных в целях и порядке, установленных в{" "}
					<Link
						href="/user-agreement"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.policyLink}
						prefetch={false}
					>
						Согласии на обработку персональных данных
					</Link>{" "}
					и{" "}
					<Link
						href="/user-agreement-credit"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.policyLink}
						prefetch={false}
					>
						Согласии на обработку персональных данных для целей кредитования
					</Link>
				</div>
			),
		},
		{
			name: "agreementMarketing",
			checked: agreementMarketing,
			content: (
				<div>
					Предоставление мне информации, в том числе рекламного характера способами,
					указанными в{" "}
					<Link
						href="/user-agreement-ads"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.policyLink}
						prefetch={false}
					>
						Согласии на получение рекламных и информационных материалов
					</Link>
				</div>
			),
		},
	];

	return (
		<div
			className={`${styles.agreements} ${className} ${secondaryStyle ? styles.secondary : ""}`}
		>
			<p>
				Настоящим я подтверждаю ознакомление с{" "}
				<Link
					href="/policy"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.policyLink}
					prefetch={false}
				>
					Политикой обработки персональных данных
				</Link>
				, выражаю свое согласие на:
			</p>

			{agreementsConfig.map((agreement) => (
				<label key={agreement.name} className={styles.checkboxWrap}>
					<input
						type="checkbox"
						name={agreement.name}
						checked={agreement.checked}
						onChange={(e) => onAgreementChange(agreement.name, e.target.checked)}
					/>
					<span
						className={`${styles.checkbox} ${
							agreement.showErrorState ? styles.errorCheckbox : ""
						}`}
					>
						{agreement.checked && <MdDone size={16} color="black" />}
					</span>
					{agreement.content}
				</label>
			))}
		</div>
	);
}
