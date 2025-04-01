"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';

import about from '@/assets/images/about.png';
import about2 from '@/assets/images/about2.png';
import circle from '@/assets/images/about-circle.png';
import mission from '@/assets/images/mission.png';
import vision from '@/assets/images/vision.png';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Asterisk } from 'lucide-react';

export default function About() {
    const campus = [
        {
            title: "The Bible is the inspired Word of God.",
            content: [
                "We believe that the Bible contains the inspired Word of God (2 Tit 3:16, 2 Pet 1:20-21)",
            ]
        },
        {
            title: "One God, existing in three persons: Father, Son, and Holy Spirit.",
            content: [
                "We believe that there is one God eternally existent in three persons:",
                "God the Father, God the Son and God the Holy Spirit. (Eph 4:4-5; 1 Cor 8:6)"
            ]
        },
        {
            title: "We believe in the Deity of Christ.",
            content: [
                "He was born of a virgin; (Jn 1:1-4, 10:30, Heb 1:1-5)",
                "He was conceived of the Holy Spirit; (Matt 1:18-25; Luk 1:30-3 5)",
                "He died; (John 19:30-3, 5)",
                "He rose again from the dead bodily; (John 20:25-29, Luke 24:36-40)",
                "He ascended into heaven bodily, (1 Thess 4:16-17, Matt 24:29-30)"
            ]
        },
        {
            title: "The Rapture of the church and the Second Coming of Christ.",
            content: [
                "We believe in the Rapture of the church, and the Second Coming of Christ (1Thess 4:16-17; Mat 24:29-30)."
            ]
        },
        {
            title: "The repentence",
            content: [
                "We believe that the only means of being cleansed from sin is repentance and faith in the precious blood of Jesus Christ (Acts 3:19, Luk 24:47, Eph 1:7)"
            ]
        },
        {
            title: "The sanctifying power of the Holy Spirit.",
            content: [
                "We believe that regeneration by the power of the Holy Ghost through the Word of God is essential for personal salvation (Tit 2:5, Jn 3:3-5, Eph 5:27)"
            ]
        },
        {
            title: "Eternal life for the saved and eternal judgment for the lost.",
            content: [
                "We believe that the redemptive work of Christ on the cross provides divine healing for the body and salvation for the soul to everyone that believes (Acts3:16 Acts 9:32-35, 1 Pet 2:24)."
            ]
        },
        {
            title: "Empowered by the Holy Spirit.",
            content: [
                "We believe that when an individual receives the Holy Ghost, he receives divine enablement for Christian service and witness (Acts 1:8; 2:4; 3:1-26; 4:5-12)"
            ]
        },
        {
            title: "The Sanctifying Power of the Holy Spirit.",
            content: [
                "We believe in the sanctifying power of the Holy Ghost. (1 Cor 6:11; Rom 15:16)"
            ]
        },
        {
            title: "Eternal Life and Final Judgment",
            content: [
                "We believe in the final resurrection of both the saved and the lost. The former to eternal life and the later to eternal judgment (Rev 20:11-15, 1 Cor 12:23)."
            ]
        }
    ]
    return (
        <section className="font-body pt-[100px]">
            <div
                style={{
                    backgroundImage: `url(${about.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top'
                }}
                className="h-screen w-full overflow-hidden relative"
            >
                <Image src={circle} alt="Circle yellow gradient" className="absolute bottom-0 left-0 w-full h-full" />
                <div className="flex flex-col md:items-start items-center gap-16 text-yellow-100 absolute bottom-8 left-8 h-fit w-fit">
                    <div className="flex flex-col md:text-left text-center gap-4">
                        <h1 className="xl:text-9xl lg:text-8xl text-6xl leading-[72px] lg:leading-[120px] xl:leading-[144px]">
                            Living the Vision, <br /> Sharing the Love
                        </h1>
                        <p className="lg:w-[70%]">
                            Discover a place where God’s presence transforms lives, and everyone belongs.
                        </p>
                    </div>
                    <Button variant="secondary-juicy" className="w-fit">
                        Join The BLW
                    </Button>
                </div>
            </div>

            <div className='px-8 lg:px-32 my-50 flex flex-col gap-14 relative'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-8 h-max'>
                    <Image src={mission} alt="Hand on the bible" className='rounded-xl h-[200px] lg:h-full w-full object-cover' />
                    <div className='flex flex-col gap-4'>
                        <div className="relative inline-block w-fit h-fit">
                            <h1 className='text-[56px] leading-[72px]'>MISSION</h1>
                            <svg className="absolute left-0 -bottom-1 w-full" width="119" height="13" viewBox="0 0 119 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.73944 8.84912C9.59305 8.84912 17.3869 7.91732 25.1483 6.78363C32.5318 5.70515 39.986 4.99725 47.4305 4.46779C53.9941 4.00098 60.4657 3.85806 67.0057 3.0908C73.5987 2.31731 80.2905 2.16401 86.9251 2.21453C91.5177 2.2495 95.9504 3.24781 100.492 3.79494C104.13 4.23327 107.728 4.96366 111.304 5.75089C112.956 6.1146 114.718 6.28537 116.343 6.73669C117.794 7.13995 113.637 6.8776 113.62 6.87752C106.317 6.84418 97.4776 5.22042 90.5866 8.56746C90.1857 8.76221 89.9667 8.84912 89.5226 8.84912C88.3605 8.84912 91.8291 9.20799 92.9338 9.56891C94.5208 10.0874 96.2673 10.4067 97.8941 10.7894C98.3569 10.8983 98.6925 10.665 98.9112 11.1024" stroke="#FFC855" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </div>
                        <p className='text-deep-blue-400 lg:w-[500px]'>Empowering believers to live Spirit-filled lives, make disciples of all nations, and manifest the excellence of God in every area of life.</p>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-8 h-max'>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-[56px] leading-[72px]'>& VISION</h1>
                        <p className='text-deep-blue-400 lg:w-[500px]'>To take the divine presence of God to the people and nations of the world, demonstrating the character of the Spirit.</p>
                    </div>
                    <Image src={vision} alt="Hand on the bible" className='rounded-xl h-[200px] lg:h-full w-full object-cover' />
                </div>
                <svg width="75" height="41" viewBox="0 0 75 41" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute -bottom-10 left-4 lg:-bottom-5 lg:left-24'>
                    <path d="M4.77654 2C4.77654 6.56834 2 10.7918 2 15.3971C2 17.2474 4.53562 16.1023 5.87834 15.6697C10.0181 14.336 13.9193 12.4349 18.0863 11.1131C19.9364 10.5262 21.6327 9.65743 22.0307 11.6973C22.8858 16.0796 23.8591 20.5281 24.1241 24.9775C24.1848 25.9954 23.4031 30.3615 24.3004 31.2866C25.1135 32.1248 31.6345 23.599 32.2775 22.9524C33.8352 21.386 36.8979 17.7727 39.4832 17.7727C41.0305 17.7727 42.66 20.9764 43.2955 22.0372C45.3485 25.464 47.4145 28.3978 50.2588 31.4035C52.3408 33.6034 54.2989 36.8983 56.8256 38.7251C58.5509 39.9725 61.1721 36.6165 61.96 35.8042C64.9594 32.7119 68.8805 28.706 73 26.8858" stroke="#FFBA2A" strokeWidth="3" strokeLinecap="round" />
                </svg>
            </div>

            <div className='flex flex-col items-center gap-28 mb-50'>
                <h1 className='text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px] text-center w-full'>FROM A SMALL <br /> BEGINNINGS TO A GLOBAL MOVEMENT <br /> OF FAITH</h1>
                <div className='flex flex-col h-full items-center gap-8'>
                    <div className='lg:flex flex-col items-center gap-3 text-center hidden'>
                        <Badge variant="outline" className='w-fit'>
                            2010
                        </Badge>
                        <h1 className='!font-body !capitalize font-bold'>The Spark of Vision</h1>
                        <p className='text-deep-blue-400 lg:w-[400px]'>A small group of passionate believers came together with a shared dream: to spread the divine presence of God and demonstrate the character of the Spirit in their community.</p>
                    </div>
                    <div className='flex flex-col gap-12 pl-10 pr-8 relative'>
                        <div className='flex items-center justify-center gap-16'>
                            <div className='lg:hidden flex-col gap-3 flex'>
                                <Badge variant="outline" className='w-fit'>
                                    2010
                                </Badge>
                                <h1 className='!font-body !capitalize font-bold'>The Spark of Vision</h1>
                                <p className='text-deep-blue-400 lg:w-[400px] w-full'>A small group of passionate believers came together with a shared dream: to spread the divine presence of God and demonstrate the character of the Spirit in their community.</p>
                            </div>
                        </div>
                        <div className='flex flex-col-reverse lg:flex-row items-center justify-center gap-6 lg:gap-16 lg:relative lg:h-[500px]'>
                            <Image src={about2} alt="People on a couch praying with their eyes closed." className='rounded-xl lg:w-[400px]' />
                            <div className='rounded-full bg-orange-600 size-6 border-[5px] border-white hidden lg:block' />
                            <div className='flex flex-col gap-3'>
                                <div className='flex items-center'>
                                    <div className='rounded-full bg-orange-600 size-6 border-[5px] border-white lg:hidden absolute left-2' />
                                    <Badge variant="outline" className='w-fit'>
                                        2012
                                    </Badge>
                                </div>
                                <h1 className='!font-body !capitalize font-bold'>First Fellowship Established</h1>
                                <p className='text-deep-blue-400 lg:w-[400px] w-full'>The first Lighthouse Fellowship was launched, bringing people together through worship, prayer, and service.</p>
                            </div>

                            <div className='hidden lg:flex flex-col items-center absolute -z-[1]'>
                                <div className='rounded-full bg-yellow-600 size-6 border-[5px] border-white' />
                                <div className='h-[500px] w-[3px] bg-deep-blue-600 rounded-full' />
                            </div>
                        </div>
                        <div className='lg:hidden flex flex-col items-center absolute -z-[1] left-2'>
                            <div className='rounded-full bg-yellow-600 size-6 border-[5px] border-white' />
                            <div className='h-[500px] w-[3px] bg-deep-blue-600 rounded-full' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='mb-50'>
                <div className='flex flex-col items-center gap-4'>
                    <h1 className='text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px] text-center w-full lg:w-[30%]'>A CULTURE <br /> ROOTED IN CHRIST</h1>
                    <p className='text-deep-blue-400 text-xl'>We are guided by these core values</p>
                </div>

            </div>
            <div className='flex items-center justify-between lg:px-32 px-8 mb-32'>
                <h1 className='text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px]'>Grounded in Faith, <br /> Guided by truth</h1>
                <p className='text-deep-blue-400 text-xl w-[40%]'>Our Statements of Faith have their source in the Bible and are in total alignment with the the doctrines of Christ.</p>
            </div>
            <div className="flex flex-col w-full mb-50 border-b border-aero-200">
                {campus.map((item, index) =>
                (<Accordion type="single" key={index} collapsible className="w-full">
                    <AccordionItem value="item">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2 lg:gap-8 font-body font-normal">
                                <p className="text-xl lg:text-3xl">{index + 1 > 9 ? "" : "0"}{index + 1}</p>
                                <p className="text-xl lg:text-3xl">{item.title}</p>
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

            <div className='flex flex-col gap-32'>
                <h1 className='text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px] text-center'>Meet the Leaders <br /> who guide our mission</h1>
            </div>
        </section>
    );
}
