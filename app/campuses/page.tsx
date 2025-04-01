'use client'
import Image from "next/image";
import campus1 from "@/assets/images/campus1.png"
import campus2 from "@/assets/images/campus2.png"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Asterisk } from "lucide-react";

export default function Campuses() {
    const campus = [
        {
            title: "Lighthouse SMU",
            content: [
                "New Auditorium, Sefako Makghto University",
                "Sundays 10am / Wednesdays 6pm"
            ]
        },
        {
            title: "Lighthouse TUT GA",
            content: [
                "GH101, Building 11, TUT Ga-Rankuwa Campus",
                "Sundays 10am, Wednesdays (Online)"
            ]
        },
        {
            title: "Lighthouse Madeira",
            content: [
                "Madeira Office, Madiera Isle",
                "Fridays 6pm"
            ]
        }
    ]

    return (
        <section className="font-body pt-[100px] flex flex-col items-center gap-16">
            <div className="flex items-center justify-center h-screen">
                <Image src={campus2} alt="Hands in a circle" className="-rotate-[8.28deg] rounded-2xl border border-white" />
                <Image src={campus1} alt="People on the grass talking" className="rotate-[6.28deg] -ml-[250px] mt-[100px] rounded-2xl border border-white" />
            </div>
            <h1 className="text-[56px] leading-[72px] lg:text-[112px] lg:leading-[111px] text-center">Our <br /> Campuses</h1>
            <div className="flex flex-col w-full mb-50 border-b border-aero-200">
                {campus.map((item, index) =>
                (<Accordion type="single" key={index} collapsible className="w-full">
                    <AccordionItem value="item">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2 lg:gap-8">
                                <Asterisk className="size-4 lg:size-8 shrink-0" />
                                <p className="text-xl lg:text-3xl font-body font-normal">{item.title}</p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            {
                                item.content.map((stuff, idx) => (
                                    <div key={idx} className="flex items-center gap-8">
                                        <Asterisk className="size-4 lg:size-6 text-aero-600 shrink-0" />
                                        <p>{stuff}</p>
                                    </div>
                                ))
                            }
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>))}
            </div>
        </section>
    )
}