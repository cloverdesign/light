"use client";

import { usePathname } from "next/navigation";
import Logo from "@/assets/icons/logo2.svg"
import Link from "next/link";
import footer from '../../public/images/footer.png'
import Image from "next/image";
import { Button } from "../ui/button";

const Footer = () => {
    const pathname = usePathname();

    const footerItems = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Resources", path: "/resources" },
        { name: "Our Campuses", path: "/campuses" },
        { name: "Get Involved", path: "/involved" },
        { name: "Giving", path: "/giving" },
    ];

    // Define custom footers for different pages
    const pageFooters: Record<string, JSX.Element> = {
        "/": (
            <div className="text-deep-blue-600 font-body flex flex-col gap-14">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-6">
                            <h1 className="lg:text-6xl md:text-5xl text-[40px] !capitalize leading-[48px] lg:leading-[72px]">Make an Impact <br /> with Your Giving!</h1>
                            <p>Your support helps us share God’s love and serve our community.</p>
                        </div>
                        <div className="flex items-center gap-6 w-full">
                            <Button className="w-full">
                                Give Now
                            </Button>
                            <Button variant="outline" className="w-full border-deep-blue-600">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${footer.src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        className="w-full h-[300px] lg:w-[600px] lg:h-[400px] rounded-2xl lg:-mt-20"
                    />
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <Logo />
                    <div className="flex flex-wrap items-center gap-4 justify-center">
                        {
                            footerItems.map((item, index) => (
                                <Link key={index} href={item.path} className="hover:text-orange-500 text-sm">{item.name}</Link>
                            ))
                        }
                    </div>
                </div>
                <div className="border-t border-deep-blue-600 pt-6">
                    <p className="text-sm">&copy; Copyright {new Date().getFullYear()} Light House BLW. All Rights Reserved.</p>
                </div>
            </div>
        ),

        "/involved": (
            <div className="text-deep-blue-600 font-body flex flex-col gap-14">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-6">
                            <h1 className="lg:text-6xl md:text-5xl text-[40px] !capitalize leading-[48px] lg:leading-[72px]">Make an Impact <br /> with Your Giving!</h1>
                            <p>Your support helps us share God’s love and serve our community.</p>
                        </div>
                        <div className="flex items-center gap-6 w-full">
                            <Button className="w-full">
                                Give Now
                            </Button>
                            <Button variant="outline" className="w-full border-deep-blue-600">
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${footer.src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        className="w-full h-[300px] lg:w-[600px] lg:h-[400px] rounded-2xl lg:-mt-20"
                    />
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <Logo />
                    <div className="flex flex-wrap items-center gap-4 justify-center">
                        {
                            footerItems.map((item, index) => (
                                <Link key={index} href={item.path} className="hover:text-orange-500 text-sm">{item.name}</Link>
                            ))
                        }
                    </div>
                </div>
                <div className="border-t border-deep-blue-600 pt-6">
                    <p className="text-sm">&copy; Copyright {new Date().getFullYear()} Light House BLW. All Rights Reserved.</p>
                </div>
            </div>
        ),
    };

    // Fallback footer for other pages
    const defaultFooter = (
        <div className="font-body flex flex-col gap-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <Logo />
                <div className="flex flex-wrap items-center gap-4 justify-center">
                    {
                        footerItems.map((item, index) => (
                            <Link key={index} href={item.path} className="hover:text-orange-500 text-sm">{item.name}</Link>
                        ))
                    }
                </div>
            </div>
            <div className="border-t border-deep-blue-600 pt-6">
                <p className="text-sm">&copy; Copyright {new Date().getFullYear()} Light House BLW. All Rights Reserved.</p>
            </div>
        </div>
    );

    return (
        <footer className={`${pathname === "/live" ? "bg-deep-blue-800 text-aero-200" : "bg-[#C8EAF8] text-deep-blue-600"} p-8`}>
            {pageFooters[pathname] || defaultFooter}
        </footer>
    );
};

export default Footer;
