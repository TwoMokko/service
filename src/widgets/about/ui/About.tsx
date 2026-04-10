import React from "react";

import { Button } from "@/src/shared/ui/button/Button";

import styles from "./About.module.scss";

export function About() {
	return (
		<section className={`${styles.about} block-bottom`}>
			<div className="container">
				<div className={styles.content}>
					<div>
						<h2 className="section-title">О сервисе</h2>
						<p>Качество – главный принцип нашей работы</p>
						<p>
							Мы специализируемся на диагностике, ремонте <br />и техническом
							обслуживании всех марок автомобилей.
						</p>
						<div>
							<p>
								Узнайте больше о работе
								<br />
								Peleton за 1 мин
							</p>
							<a href="/video/video4.mp4" data-fancybox datatype="html5video">
								<Button minWidth={306} className={styles.btn}>
									Смотреть видео о сервисе
								</Button>
							</a>
						</div>
					</div>
					<div>swiper</div>
				</div>
			</div>
		</section>
	);
}
