"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { Article } from "@/src/shared/data/articles/articles";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./Article.module.scss";

export function ArticleContent({ article }: { article: Article }) {
	const { openModal } = useModal();
	return (
		<section className={`${styles.wrapper}`}>
			<div className="block-bottom">
				<div className={styles.top}>
					<div className={styles.top__img}>
						<Image
							src={`/images/articles/items/${article.img}`}
							alt=""
							fill
							sizes="100%"
						/>
					</div>
					<div className={styles.top__info}>
						<div className={styles.badges}>
							<span className={styles.tag}>{article.serviceTag}</span>
							<span>{article.dateEnd}</span>
						</div>
						<h1 className={styles.title}>{article.title}</h1>
					</div>
				</div>

				<div className={styles.content}>
					{/*TODO: разные типы данных (таблицы, параграфы, списки нумерованные и не нумерованные, картинки)*/}
					{/*или же хранить контент сразу в нужном виде с классами ReactNode*/}
					<p>{article.description}</p>
				</div>

				<div className={styles.bottom}>
					<div className={styles.service}>
						<div className={styles.service__content}>
							<div>
								<Image
									src="/images/icons/service_logo.svg"
									alt="logo"
									width={200}
									height={40}
								/>
								<p className={styles.service__text}>
									<span>PELETON СЕРВИС</span> — ваш <br />
									эксперт в сохранении <br />
									идеального состояния <br />
									автомобиля
								</p>
							</div>
							<div className={styles.service__card}>
								{/*TODO: получать еще и услугу, к которой прикреплено (в page.tsx или тут)*/}
								<div className={styles.service__card_top}>
									<span className={styles.service__card_title}>
										{article.serviceTag}
									</span>
									<span className={styles.service__card_count}>(count)</span>
								</div>
								<Link
									prefetch={false}
									href={`/services/${article.serviceHref}`}
									className={styles.service__card_link}
								>
									<Button variant="outline" minWidth={128}>
										Подробнее
									</Button>
									{/*<div className={styles.link_arrow}>*/}
									{/*    <LuArrowUpRight size={18} />*/}
									{/*</div>*/}
								</Link>

								<div className={styles.service__card_img}>
									<Image
										className={styles.imgBackground}
										src={`/images/services/cards/${article.serviceHref}.png`}
										alt=""
										fill
									/>
								</div>
							</div>
						</div>
					</div>
					<Button onClick={() => openModal("common")}>Записаться на сервис</Button>
				</div>
			</div>
		</section>
	);
}
