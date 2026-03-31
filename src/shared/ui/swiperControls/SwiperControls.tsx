import styles from "./SwiperControls.module.scss"
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import React from "react";

interface SwiperControlsProps {
    prevButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & Record<string, any>;
    nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & Record<string, any>;
    paginationProps?: React.HTMLAttributes<HTMLDivElement> & Record<string, any>;
}

export function SwiperControls({
                                   prevButtonProps = {},
                                   nextButtonProps = {},
                                   paginationProps = {}
                               }: SwiperControlsProps) {
    return (
        <div className={styles.swiperControls}>
            <div
                className={styles.controls__pagination}
                {...paginationProps}
            ></div>
            <div className={styles.controls__buttonWrap}>
                <button
                    type="button"
                    className={styles.controls__buttonPrev}
                    aria-label="Предыдущий слайд"
                    {...prevButtonProps}
                >
                    <IoIosArrowBack size={20} color="white" />
                </button>
                <button
                    type="button"
                    className={styles.controls__buttonNext}
                    aria-label="Следующий слайд"
                    {...nextButtonProps}
                >
                    <IoIosArrowForward size={20} color="white" />
                </button>
            </div>
        </div>
    );
}