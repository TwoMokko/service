'use client';

import Link from "next/link";
import { navigationLinks } from "@/src/shared/config";
import { NavigationLink } from "@/src/shared/types/types";
import { CategoryWithServices } from "@/src/shared/data/services";
import styles from "./Header.module.scss";

interface NavLinksMobileProps {
    services: CategoryWithServices[];
    onClick?: () => void;
}

export function NavLinksMobile({ onClick }: NavLinksMobileProps) {
    return (
        <>
            {navigationLinks.map((link: NavigationLink) => (
                <li key={link.href}>
                    <Link
                        prefetch={false}
                        className={styles.link}
                        href={link.href}
                        onClick={onClick}
                        rel="noopener noreferrer"
                    >
                        {link.title}
                    </Link>
                </li>
            ))}
        </>
    );
}