import { Action } from "@/src/shared/data/actions/actions";

import styles from "./Actions.module.scss";

interface ActionCardProps {
	action: Action;
}
export function ActionCard({ action }: ActionCardProps) {
	return (
		<article className={styles.actions__card}>
			<h3>{action.title}</h3>
			<p>{action.subtitle}</p>
		</article>
	);
}
