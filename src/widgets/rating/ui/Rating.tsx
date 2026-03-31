"use client"
import styles from "./Rating.module.scss"
import Link from "next/link";
import {SectionId} from "@/src/shared/types/types";
import {Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {ratingData} from "@/src/shared/data/rating/rating";
import {RatingCard} from "@/src/widgets/rating/ui/RatingCard";
import {Button} from "@/src/shared/ui/button/Button";
import {SwiperControls} from "@/src/shared/ui/swiperControls/SwiperControls";

export function Rating() {
    const navigation = {
        prevEl: '[data-rating-prev]',
        nextEl: '[data-rating-next]'
    }

    return <section className={`${styles.rating} block-bottom`}>
        <div className="container">
            <div className={styles.top}>
                <h2 className="section-title">
                    Присоединяйтесь <br/>к 1000 довольных клиентов
                </h2>
                <Link href={`/${SectionId.REVIEWS}`}>
                    <Button variant='secondary'>Смотреть все отзывы</Button>
                </Link>
            </div>
            <div className={styles.rating__wrapper}>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation={navigation}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        el: '[data-rating-pagination]',
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                    loop={false}
                    className={styles.ratingSwiper}
                >
                    {
                        ratingData.map(itm =>
                            <SwiperSlide key={itm.title} className={styles.rating__slide}>
                                <RatingCard rating={itm} />
                            </SwiperSlide>
                        )
                    }
                    <SwiperControls
                        prevButtonProps={{ 'data-rating-prev': true }}
                        nextButtonProps={{ 'data-rating-next': true }}
                        paginationProps={{ 'data-rating-pagination': true }}
                    />
                </Swiper>


            </div>
        </div>
    </section>
}