"use client";
import Logo from "@/assets/icons/logo.svg"
import NavLink from "../ui/nav-link";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion, useDragControls, useMotionValue, useAnimate } from "motion/react";
import { useMeasure } from "@uidotdev/usehooks";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const pathname = usePathname();
    const y = useMotionValue(0)

    const [isScrolled, setIsScrolled] = useState(false);

    const [scope, animate] = useAnimate()

    const [drawerRef, { height }] = useMeasure()

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
        { name: "Contact", path: "/contact" }
    ];

    const handleToggleMenuOpen = () => {
        setMenuOpen(prev => !prev)
    }

    const handleToggleMenuClose = async () => {
        const yStart = typeof y.get() === "number" ? y.get() : 0;
        animate(scope.current, { opacity: [1, 0] })
        await animate("#menu", { y: [yStart, height] })
        setMenuOpen(prev => !prev)
    }

    const isTransparent = pathname === "/" || pathname === "/live" || pathname === "/involved"

    const controls = useDragControls()

    return (
        <nav className={`flex items-center justify-between py-8 px-6 font-body w-full fixed top-0 left-0 z-[10]
            ${isTransparent && !isScrolled
                ? "bg-transparent"
                : "bg-white"} ${pathname === "/live" && !isScrolled ? "text-aero-100" : ""} 
                transition-all duration-500 ease-in-out`
        }
        >
            <Link href="/">
                <Logo />
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex lg:gap-[22px] justify-self-start">
                {
                    navItems.slice(0, 5).map((item, index) => (
                        <li key={index}>
                            <NavLink href={item.path}>{item.name}</NavLink>
                        </li>
                    ))
                }
            </ul>

            <Button asChild className="hidden md:flex justify-self-end">
                <NavLink href="/contact">Contact</NavLink>
            </Button>

            {/* Mobile Menu */}
            <Button className="md:hidden z-100" onClick={handleToggleMenuOpen} size="xs">
                <Menu />
            </Button>

            {menuOpen &&
                <motion.section
                    id="menu-backdrop"
                    className="bg-yellow-600/20 backdrop-blur-sm h-screen w-screen z-50 absolute top-0 left-0 menu-backdrop flex items-end px-3 pb-3"
                    initial={{
                        opacity: 0
                    }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    ref={scope}
                    onClick={handleToggleMenuClose}
                >
                    <motion.ul
                        id="menu"
                        ref={drawerRef}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-aero-500 h-[70vh]  w-full menu rounded-2xl flex flex-col items-center justify-center gap-3 relative"
                        initial={{
                            y: "100%",
                        }}
                        style={{ y }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5, type: "spring", bounce: 0.1 }}

                        onDragEnd={() => {
                            if (y.get() >= 100) {
                                handleToggleMenuClose()
                            }
                        }}
                        drag="y"
                        dragControls={controls}
                        dragListener={false}
                        dragConstraints={{
                            top: 0,
                            bottom: 0
                        }}
                        dragElastic={{
                            top: 0,
                            bottom: 0.5
                        }}
                    >
                        <button
                            onPointerDown={(e) => {
                                controls.start(e)
                            }}
                            className="h-2 w-14 cursor-grab touch-none rounded-full active:cursor-grabbing bg-aero-200 absolute top-4" />
                        {navItems.map((item, index) => (
                            <motion.li key={index} className="menu-item text-aero-100 font-body uppercase text-xl font-bold"
                                initial={{
                                    y: "-100%",
                                    display: "block",
                                }}
                                animate={{
                                    y: 0
                                }}
                            >
                                <Link href={item.path} onClick={handleToggleMenuClose}>
                                    {item.name}
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.section>}
        </nav >
    );
}
