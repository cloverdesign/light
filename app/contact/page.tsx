'use client'

import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DropdownMenuTriggerButton } from "@/components/ui/dropdown-trigger"
import { Asterisk } from "lucide-react"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { SocialsCard } from "@/components/contact/socials-card"


export default function Contact() {
    const [reason, setReason] = useState("Reason")

    const socials = [
        {
            icon: "instagram",
            title: "Instagram",
            content: [
                {
                    name: "Lighthouse SMU",
                    link: "https://www.instagram.com/blw.lighthouse/",
                    handle: "blw.lighthouse"
                },
                {
                    name: "Lighthouse TUT GA",
                    link: "https://www.instagram.com/blw.lighthouse.ga/",
                    handle: "blw.lighthouse.ga"
                },
                {
                    name: "Lighthouse Madeira",
                    link: "https://www.instagram.com/blw.lighthouse/",
                    handle: "blw.lighthouse"
                }
            ],
            style: "absolute lg:-top-[300px] top-0 rotate-[10deg]"
        },
        {
            icon: "youtube",
            title: "Youtube",
            content: [
                {
                    name: "Lighthouse",
                    link: "https://www.youtube.com/@blwlighthouse",
                    handle: "blw.lighthouse"
                }
            ],
            style: "absolute lg:-top-[100px] to-[200px] rotate-[20deg]"
        },
        {
            icon: "tiktok",
            title: "Tiktok",
            content: [
                {
                    name: "Lighthouse",
                    link: "https://www.youtube.com/@blwlighthouse",
                    handle: "blw.lighthouse"
                }
            ],
            style: "absolute lg:top-0 top-[300px] -rotate-[3deg]"
        }
    ]
    return (
        <section className="pt-[105px] font-body">
            <div className="h-screen flex flex-col lg:flex-row items-center gap-16 lg:gap-32 lg:px-32 px-8 mb-50">
                <div className="flex flex-col gap-4 lg:w-1/3">
                    <h1 className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px] text-center lg:text-left">WE’D LOVE TO <br /> HEAR FROM YOU!</h1>
                    <p className="text-deep-blue-400 text-center lg:text-left">For questions, suggestions, or prayer requests: No matter the situation, you can always feel free to reach out, even if it’s just to say hi.</p>
                </div>
                <form className="flex flex-col gap-6 lg:w-2/3">
                    <Input
                        icon="user-round"
                        placeholder="Full Name"
                    />
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                        <Input
                            icon="mailbox"
                            placeholder="Email"
                        />
                        <Input
                            icon="smartphone"
                            placeholder="Phone Number"
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-2/6 h-fit">
                                <DropdownMenuTriggerButton>
                                    <div className="flex gap-2 items-center">
                                        <Asterisk className="size-4 shrink-0" />
                                        <p className="whitespace-nowrap">{reason}</p>
                                    </div>
                                </DropdownMenuTriggerButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="dropdown-content-width-full">
                                <DropdownMenuRadioGroup value={reason} onValueChange={setReason}>
                                    <DropdownMenuRadioItem value="Prayer Request">Prayer Request</DropdownMenuRadioItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioItem value="Questions">Questions</DropdownMenuRadioItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioItem value="Suggestions">Suggestions</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Textarea
                            icon="message-square-heart"
                            placeholder="Enter your message here"
                            className="w-4/6"
                        />
                    </div>
                    <Button variant="outline" className="lg:self-end self-center lg:w-fit w-full">
                        Send Message
                    </Button>
                </form>
            </div>
            <div className="lg:px-32 px-8 mb-50 h-screen">
                <div className="bg-orange-600 flex flex-col lg:flex-row lg:items-center lg:justify-center h-full rounded-4xl overflow-hidden">
                    <div className="lg:w-1/2 lg:h-full h-1/2 flex items-center justify-center">
                        <h1 className="text-orange-100 text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px] text-center lg:text-left">OUR SOCIALS <br /> TO STAY CONNECTED</h1>
                    </div>
                    <div className="relative lg:w-1/2 lg:h-fit h-1/2">
                        {
                            socials.map((item, index) => (
                                <SocialsCard
                                    key={index}
                                    icon={item.icon}
                                    title={item.title}
                                    content={item.content}
                                    className={item.style}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section >
    )
}