"use client";
import Logo from "@/assets/icons/logo.svg"
import NavLink from "../ui/nav-link";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion, stagger, useAnimate } from "motion/react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);

    const [scope, animate] = useAnimate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Change nav on scroll
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Resources", path: "/resources" },
        { name: "Our Campuses", path: "/campuses" },
        { name: "Get Involved", path: "/involved" },
        { name: "Giving", path: "/giving" },
    ];

    const staggerMenuItems = stagger(0.24, { startDelay: 0.05 });

    const handleToggleMenuOpen = () => {
        animate(
            [
                [".menu-backdrop",
                    {
                        opacity: 1,
                        translateY: 0
                    },
                    {
                        duration: 0.2,
                    }
                ],
                [
                    ".menu-item",
                    {
                        translateY: "100%"
                    },
                    {
                        duration: 0.2,
                        delay: staggerMenuItems,
                        at: "<"
                    }
                ]
            ]
        );
        setMenuOpen(prev => !prev)
    }

    const handleToggleMenuClose = () => {
        animate(
            [
                [
                    ".menu-item",
                    {
                        translateY: "-100%",
                        display: "block",
                    },
                    {
                        duration: 0.2,
                        delay: staggerMenuItems,
                    }
                ],
                [".menu-backdrop",
                    {
                        opacity: 0,
                        translateY: "-100%",
                        display: "block",
                    },
                    {
                        duration: 0.2,
                        at: "<"
                    }
                ],

            ]
        );
        setMenuOpen(prev => !prev)
    }

    const isTransparent = pathname === "/" || pathname === "/live" || pathname === "/involved"

    return (
        <nav className={`flex items-center justify-between py-8 px-6 font-body w-full fixed top-0 left-0 
            ${isTransparent && !isScrolled
                ? "bg-transparent"
                : "bg-white"} transition-all duration-500 ease-in-out`}
            ref={scope}
        >
            <Link href="/">
                <Logo />
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-22 justify-self-start">
                {
                    navItems.map((item, index) => (
                        <li key={index}>
                            <NavLink href={item.path}>{item.name}</NavLink>
                        </li>
                    ))
                }
            </ul>

            <Button className="hidden md:flex gap-6 justify-self-end">
                Contact
            </Button>

            {/* Mobile Menu */}
            <Button className="md:hidden" onClick={handleToggleMenuOpen} size="xs">
                <Menu />
            </Button>

            <motion.section
                className="bg-aero-500/50 fixed top-0 left-0 h-screen w-screen z-50 menu-backdrop"
                initial={{
                    opacity: 0,
                    translateY: 100,
                }}
                onClick={handleToggleMenuClose}
            >
                <ul>
                    {navItems.map((item, index) => (
                        <motion.li key={index} className="menu-item w-fit p-2 bg-aero-500 border-[4px] border-white rounded-full flex items-center justify-center"
                            initial={{
                                translateY: "-100%",
                                display: "block",
                            }}
                        >
                            {item.name}
                        </motion.li>
                    ))}
                </ul>
            </motion.section>
        </nav>
    );
}
