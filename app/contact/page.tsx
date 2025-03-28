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


export default function Contact() {
    const [reason, setReason] = useState("Reason")
    return (
        <section className="pt-[105px] font-body">
            <div className="h-screen flex flex-col lg:flex-row items-center gap-16 lg:gap-32 lg:px-32 px-8 mb-50">
                <div className="flex flex-col gap-4 lg:w-1/3">
                    <h1 className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px] text-center lg:text-left">WE’D LOVE TO <br /> HEAR FROM YOU!</h1>
                    <p className="text-deep-blue-400 text-center lg:text-left">For questions, suggestions, or prayer requests: No matter the situation, you can always feel free to reach out, even if it’s just to say hi.</p>
                </div>
                <div className="flex flex-col gap-6 lg:w-2/3">
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
                            placeholder="Full Name"
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="lg:w-fit w-full min-w-[154px]">
                                <DropdownMenuTriggerButton>
                                    <div className="flex gap-2 items-center">
                                        <Asterisk className="size-4" />
                                        <p>{reason}</p>
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
                        <div></div>
                    </div>
                    <Button variant="outline" className="lg:self-end self-center lg:w-fit w-full">
                        Send Message
                    </Button>
                </div>
            </div>
        </section>
    )
}