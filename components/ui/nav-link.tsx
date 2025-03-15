"use client"; // Required for client-side hooks like usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    activeClassName?: string;
}

const NavLink: FC<NavLinkProps> = ({ href, children, className = "", activeClassName = "text-yellow-1000 font-semibold hover:text-yellow-1100" }) => {
    const pathname = usePathname(); // Get current route
    const isActive = pathname === href; // Check if link is active

    return (
        <Link href={href} className={`${className} ${isActive ? activeClassName : ""} whitespace-nowrap hover:text-orange-600 py-2 px-4`}>
            {children}
        </Link>
    );
};

export default NavLink;
