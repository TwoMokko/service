import Link from "next/link";

export default function NotFound() {
	return (
		<div>
			<h2>Not Found</h2>
			<p>Не удалось найти запрошенный ресурс</p>
			<Link href="/">Вернуться на начальную страницу</Link>
		</div>
	);
}
