"use client"

import CircleBadge from "@/components/ui/circle-badge"
import involved1 from "@/assets/images/involved1.png"
import involved2 from "@/assets/images/involved2.png"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export default function Involved() {
    return (
        <section className="font-body">
            <div className="bg-yellow-100 py-[130px] flex items-center justify-center px-32 gap-28 mb-50">
                <div className="grid grid-cols-3 gap-8 lg:w-1/2">
                    <CircleBadge drag={false} icon={{ name: "users-round", size: "lg:size-[106px] size-[65px]" }} className="bg-aero-600 text-aero-1100 lg:p-8 p-5" />
                    <CircleBadge drag={false} icon={{ name: "heart-handshake", size: "lg:size-[106px] size-[65px]" }} className="bg-yellow-200 text-yellow-700 lg:p-8 p-5" />
                    <Image src={involved1} alt="Black woman smiling wide" className="rounded-full lg:size-[170px] size-[65px] object-cover" />
                    <CircleBadge drag={false} icon={{ name: "book-heart", size: "lg:size-[106px] size-[65px]" }} className="bg-orange-600 text-orange-100 lg:p-8 p-5" />
                    <Image src={involved2} alt="Black man smiling wide" className="rounded-full lg:size-[170px] size-[65px]" />
                    <CircleBadge drag={false} icon={{ name: "hand-helping", size: "lg:size-[106px] size-[65px]" }} className="bg-aero-200 text-deep-blue-1000 lg:p-8 p-5" />
                    <Image src={involved2} alt="Black man smiling wide" className="rounded-full lg:size-[170px] size-[65px]" />
                    <CircleBadge drag={false} icon={{ name: "asterisk", size: "lg:size-[106px] size-[65px]" }} className="bg-orange-200 text-orange-600 lg:p-8 p-5" />
                    <CircleBadge drag={false} icon={{ name: "blocks", size: "lg:size-[106px] size-[65px]" }} className="bg-yellow-600 text-yellow-1000 lg:p-8 p-5" />
                </div>
                <div className="flex flex-col gap-16 w-1/2">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px]">TAKE YOUR NEXT STEPS</h1>
                        <p className="text-deep-blue-400">At BLW Lighthouse, we believe everyone has unique gifts to share. That’s why we provide diverse ministries and programs to help you deepen your faith and discover new opportunities to thrive.</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <Button className="w-fit">
                            <ArrowDown />
                        </Button>
                        Learn More
                    </div>
                </div>
            </div>
        </section>
    )
}