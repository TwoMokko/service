import Link from "next/link";

export default function NotFound() {
	return (
		<div className="other-page">
			<div className="container">
				<h2>Not Found</h2>
				<p>Не удалось найти запрошенный ресурс</p>
				<Link prefetch={false} href="/">
					Вернуться на начальную страницу
				</Link>
			</div>
		</div>
	);
}
