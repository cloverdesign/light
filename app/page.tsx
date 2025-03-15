'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeartHandshakeIcon } from "lucide-react";
import Image from "next/image";
import hero1 from '../public/images/hero1.png'
import hero2 from '../public/images/hero2.png'
import hero3 from '../public/images/hero3.png'

export default function Home() {

  const heroImages = [
    {
      url: hero1,
      alt: "Women hugging"
    },
    {
      url: hero2,
      alt: "Picture of a man on his knees on the floor praying in a crowd of people"
    },
    {
      url: hero3,
      alt: "Picture of a man praying with his hands clasped togther."
    }
  ]

  return (
    <section className="font-body h-screen pt-[105px] bg-radial-[at_50%_-105%] from-aero-600 from-10% to-[#FFFCF7] to-70%">
      <div className="flex flex-col items-center justify-center gap-16 h-full">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="xl:text-9xl lg:text-8xl text-6xl text-center leading-[72px] lg:leading-[120px] xl:leading-[144px]">
            <div className="relative inline-block mr-5 w-fit h-fit">
              <Badge variant="header" className="absolute capitalize transform -rotate-12 -left-5 -top-5 lg:top-2">
                <HeartHandshakeIcon />
                Welcome Home
              </Badge>
              Where
            </div>
            Faith, Love, & Community
            <div className="relative inline-block ml-4 w-fit h-fit">
              <p>Flourish</p>
              <svg width="435" height="144" viewBox="0 0 435 144" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 bottom-2.5 h-full w-full">
                <path d="M273.838 8.51659C205.753 5.8801 126.033 0.818651 62.3827 16.9958C20.4649 27.6495 -2.63556 49.5143 4.18218 72.9789C7.42436 84.1375 14.8087 95.7725 31.3693 103.729C57.6737 116.367 96.0255 125.005 129.041 131.823C189.752 144.359 256.584 144.428 318.948 134.785C368.726 127.089 446.127 113.021 430.113 78.4955C415.192 46.326 344.698 29.9193 289.546 19.8562C220.025 7.17143 149.289 3.962 76.2784 3" stroke="#FFC855" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </h1>
          <p className="text-deep-blue-400 xl:w-[40%] lg:w-[60%] w-[80%] text-center text-xl">Discover a place where God’s presence transforms lives, and everyone belongs.</p>
        </div>
        <Button>
          Plan Your Visit
        </Button>
      </div>
      <div>
        {
          heroImages.map((image, index) => (
            <Image src={image.url} key={index} alt={image.alt} />
          ))
        }
      </div>
    </section>
  );
}
