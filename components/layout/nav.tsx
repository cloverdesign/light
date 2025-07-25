"use client";
import NavLink from "../ui/nav-link";
import Link from "next/link";
import { useEffect, useState } from "react";
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
                <svg width="50" height="42" viewBox="0 0 50 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_2584_56)">
                        <path d="M30.4327 23.9015L30.0596 22.1547L28.832 19.6616L49.5592 14.5738C49.0438 18.5282 46.7731 22.2479 44.6994 25.5889C41.1492 31.3099 37.0403 36.671 32.9286 41.9906C32.7439 42.0236 32.8136 41.9614 32.7675 41.8728C32.5027 41.3537 32.3426 40.6979 32.0495 40.1382C28.6774 33.6842 21.4292 34.3626 15.2286 33.216L14.5088 33.0407H33.4939L35.2285 30.0625L35.0985 29.8505L11.637 29.8401L11.5333 30.0295L12.9721 33.0991C12.8515 33.3733 12.8628 34.9119 12.6715 34.9232C9.84023 33.4138 6.76398 31.896 4.28791 29.8354C1.82785 27.7861 0.241201 24.4555 0 21.2633L14.228 22.3949L13.9454 23.9966H11.4014V25.3157H35.3331V23.9024H30.4337L30.4327 23.9015ZM33.5429 26.0685L32.9286 26.0629L32.3652 28.3298L31.846 26.0685L31.0075 26.077L30.4789 28.2355L30.1944 27.5788C29.9833 26.8863 30.2377 25.816 29.2088 26.0695L30.0069 29.0863L30.7974 29.1655L31.4691 26.9174L31.9506 29.1683L32.7892 29.1777L33.5438 26.0695L33.5429 26.0685ZM14.9337 26.0685C14.4683 25.9677 13.6966 26.142 13.1907 26.0685V29.1777H14.8395C15.5452 29.1777 15.875 27.8822 15.1702 27.527C15.1042 27.348 15.2917 27.4008 15.3219 27.3584C15.6177 26.9523 15.4595 26.1825 14.9328 26.0685H14.9337ZM22.2357 26.0685H21.6704V29.1306L21.8663 29.2333L23.9363 29.1165L23.9316 28.7066H22.2357V26.0685Z" fill="currentColor" />
                        <path d="M21.0108 16.1755C18.7948 16.77 16.7634 18.1126 15.4528 19.998L15.3266 20.03L2.16797 12.5C2.89722 11.1169 4.16824 9.86566 5.43548 8.93855C9.67157 5.83968 15.2833 5.42889 19.9443 7.86916L22.8952 9.86378C23.2221 8.44295 23.9307 7.0325 24.7598 5.83874C29.0939 -0.405153 37.877 -1.92019 43.9993 2.65508L26.9438 17.6387C26.6451 17.7744 26.2032 17.309 25.9121 17.1629C24.9661 16.6871 23.8544 16.2556 22.801 16.1746C22.7878 15.9541 22.7699 16.0078 22.9404 15.9861C23.3117 15.939 23.9636 15.9654 24.3537 15.988C24.6618 16.0059 25.1254 16.2528 25.3449 16.0332V13.7249H23.7903C23.6961 13.7249 23.5199 13.6721 23.4605 13.5835V10.1445C23.2316 10.1511 22.9536 10.0729 22.801 10.2859V13.7249H21.0108V16.1746V16.1755Z" fill="currentColor" />
                        <path d="M13.756 28.7076L13.8445 27.8059C14.2261 27.7023 14.6746 27.7221 14.9375 28.0481C15.043 28.2601 14.9488 28.5013 14.7943 28.6605L13.7569 28.7066L13.756 28.7076Z" fill="currentColor" />
                        <path d="M13.9105 26.4585C15.2805 26.2899 15.1222 27.5986 13.8436 27.3461C13.7051 27.249 13.6712 26.5377 13.9105 26.4585Z" fill="currentColor" />
                    </g>
                    <defs>
                        <clipPath id="clip0_2584_56">
                            <rect width="49.5592" height="42" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
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
