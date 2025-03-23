"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';

const about = '/images/about.png';
const circle = '/images/about-circle.png';
const mission = '/images/mission.png';
const vision = '/images/vision.png';

export default function About() {
    return (
        <section className="font-body pt-[100px]">
            <div
                style={{
                    backgroundImage: `url(${about})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top'
                }}
                className="h-screen w-full overflow-hidden relative"
            >
                <Image src={circle} alt="Circle yellow gradient" className="absolute bottom-0 left-0 w-full h-full" width={500} height={500} />
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
                    <Image src={mission} alt="Hand on the bible" className='rounded-xl h-[200px] lg:h-full w-full object-cover' width={500} height={500} />
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
                    <Image src={vision} alt="Hand on the bible" className='rounded-xl h-[200px] lg:h-full w-full object-cover' width={500} height={500} />
                </div>
                <svg width="75" height="41" viewBox="0 0 75 41" fill="none" xmlns="http://www.w3.org/2000/svg" className='absolute -bottom-10 left-4 lg:-bottom-5 lg:left-24'>
                    <path d="M4.77654 2C4.77654 6.56834 2 10.7918 2 15.3971C2 17.2474 4.53562 16.1023 5.87834 15.6697C10.0181 14.336 13.9193 12.4349 18.0863 11.1131C19.9364 10.5262 21.6327 9.65743 22.0307 11.6973C22.8858 16.0796 23.8591 20.5281 24.1241 24.9775C24.1848 25.9954 23.4031 30.3615 24.3004 31.2866C25.1135 32.1248 31.6345 23.599 32.2775 22.9524C33.8352 21.386 36.8979 17.7727 39.4832 17.7727C41.0305 17.7727 42.66 20.9764 43.2955 22.0372C45.3485 25.464 47.4145 28.3978 50.2588 31.4035C52.3408 33.6034 54.2989 36.8983 56.8256 38.7251C58.5509 39.9725 61.1721 36.6165 61.96 35.8042C64.9594 32.7119 68.8805 28.706 73 26.8858" stroke="#FFBA2A" strokeWidth="3" strokeLinecap="round" />
                </svg>
            </div>

            <div className='flex flex-col items-center'>
                <h1 className='text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px] text-center w-[30%]'>FROM A SMALL BEGINNINGS TO A GLOBAL MOVEMENT OF FAITH</h1>
                <div></div>
            </div>
        </section>
    );
}
