'use client';

import { useModal } from "@/src/app/_providers/ModalProvider";
import { Button } from "@/src/shared/ui/button/Button";
import styles from "./Header.module.scss";

export function ButtonCall() {
    const { openModal } = useModal();

    return (
        <Button
            onClick={() => openModal("common")}
            className={`${styles.headerBtnCall} mob-hide`}
        >
            Записаться на сервис
        </Button>
    );
}