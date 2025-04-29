'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Asterisk, ChevronLeft, ChevronRight, HeartHandshakeIcon } from "lucide-react";
import { animate, useMotionValue, motion, AnimationOptions } from "motion/react";
import { useRef, useState } from "react";
import { EventCard } from "@/components/hero/event-card";
import CircleBadge from "@/components/ui/circle-badge";
import Image from "next/image";

import hero1 from '@/assets/images/hero1.png'
import hero2 from '@/assets/images/hero2.png'
import hero3 from '@/assets/images/hero3.png'
import foundation from '@/assets/images/foundation.png'
import circle from '@/assets/images/circle.png'
import Link from "next/link";
import { useMotionTimeline } from "@/hooks/useMotionTimeline";

const TRANSITION: AnimationOptions = {
  ease: "easeInOut",
  duration: 0.5
}

const MotionBadge = motion.create(Badge)
const MotionButton = motion.create(Button)

export default function Home() {

  const scope = useMotionTimeline(
    [
      [
        ['.heading-1', { y: 0 }, TRANSITION],
        ['.heading-2', { y: 0 }, TRANSITION],
        ['.plan-btn', { scale: 1, opacity: 1 }, { duration: 0.8, ease: "easeInOut" }],
        ['.sub-heading', { opacity: 1, }, { duration: 1, ease: "easeInOut" }]
      ],
      [
        ['.welcome-badge', { scale: 1, opacity: 1 }, { duration: 0.8, ease: "easeInOut" }],
        ['.path-1', { pathLength: 1, opacity: 1 }, { duration: 0.8, ease: "easeInOut" }],
      ]
    ],
    1
  )


  const heroImages = [
    {
      url: hero1,
      alt: "Women hugging",
      style: "mt-2"
    },
    {
      url: hero2,
      alt: "Picture of a man on his knees on the floor praying in a crowd of people",
      style: "mt-60"
    },
    {
      url: hero3,
      alt: "Picture of a man praying with his hands clasped togther.",
      style: "mt-10"
    }
  ]

  const eventsContent = [
    {
      text: "Join us this Sunday"
    },
    {
      text: "Bible Study Wednesdays at 7PM"
    },
    {
      text: "Community Outreach this Saturday"
    }
  ]

  const events = [
    {
      title: "Sunday Worship Service",
      content: "Stay connected with our vibrant fellowship through upcoming events",
      time: "10 AM",
      date: "Every Sunday",
      icon: { style: "bg-aero-600 text-deep-blue-600", name: "hand-heart" }
    },
    {
      title: "Midweek Bible Study",
      content: "Dive deeper into God’s Word with engaging Bible studies that inspire, challenge, and transform",
      time: "10 AM",
      date: "Every Sunday",
      icon: { style: "bg-orange-600 text-orange-200", name: "book-open-text" }
    },
    {
      title: "Sunday Worship Service",
      content: "Stay connected with our vibrant fellowship through upcoming events",
      time: "10 AM",
      date: "Every Sunday",
      icon: { style: "bg-aero-600 text-deep-blue-600", name: "hand-heart" }
    }
  ]

  const initialTestimonials = [
    {
      name: "Mabel A",
      title: "A Life-Changing Experience",
      content: "This fellowship has truly transformed my life. I came here feeling lost, but the love, prayers, and encouragement I received helped me find my purpose. The support here is not just words; it’s a genuine expression of God’s love.",
      color: "yellow-600"
    },
    {
      name: "Joel B",
      title: "A Life-Changing Experience",
      content: "This fellowship has truly transformed my life. I came here feeling lost, but the love, prayers, and encouragement I received helped me find my purpose. The support here is not just words; it’s a genuine expression of God’s love.",
      color: "orange-600"
    },
    {
      name: "Justin A",
      title: "A Life-Changing Experience",
      content: "This fellowship has truly transformed my life. I came here feeling lost, but the love, prayers, and encouragement I received helped me find my purpose. The support here is not just words; it’s a genuine expression of God’s love.",
      color: "aero-600"
    },
    {
      name: "Grace A",
      title: "A Life-Changing Experience",
      content: "This fellowship has truly transformed my life. I came here feeling lost, but the love, prayers, and encouragement I received helped me find my purpose. The support here is not just words; it’s a genuine expression of God’s love.",
      color: "yellow-600"
    }
  ]

  interface Testimonial {
    name: string;
    title: string;
    content: string;
    color: string
  }

  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial>(initialTestimonials[0])
  const [testimonials, setTestimonials] = useState(initialTestimonials)

  const handleSelectTestimonial = (item: Testimonial) => {
    const reordered = testimonials.filter(t => t.name !== item.name).concat(item);
    setTestimonials(reordered);
    setCurrentTestimonial(item)
  }

  const badgeContainerRef = useRef<HTMLDivElement | null>(null)

  return (
    <section
      ref={scope}
      className="font-body pt-[155px] mb-200 bg-radial-[at_50%_-70%] from-aero-600 from-10% to-[#FFFCF7] to-50% relative">
      <div className="flex flex-col items-center justify-center gap-16">
        <div className="flex flex-col items-center justify-center">
          <div className="overflow-y-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              className="heading-1 xl:text-9xl lg:text-8xl text-6xl text-center leading-[72px] lg:leading-[120px] xl:leading-[144px]">
              <div className="relative inline-block mr-5 w-fit h-fit mt-6 ml-6">
                <MotionBadge
                  initial={{ scale: 0, opacity: 0 }}
                  variant="header"
                  className="welcome-badge absolute capitalize transform -rotate-12 -left-5 -top-5 lg:top-2">
                  <HeartHandshakeIcon />
                  Welcome Home
                </MotionBadge>
                Where
              </div>
              Faith, Love, &
            </motion.h1>
          </div>
          <div className="overflow-y-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              className="heading-2 xl:text-9xl lg:text-8xl text-6xl text-center leading-[72px] lg:leading-[120px] xl:leading-[144px]">
              Community
              <span className="relative inline-block m-4 w-fit h-fit">
                Flourish
                <svg
                  width="435"
                  height="144"
                  viewBox="0 0 435 144"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-0 bottom-2.5 h-full w-full"
                >
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    className="path-1"
                    d="M273.838 8.51659C205.753 5.8801 126.033 0.818651 62.3827 16.9958C20.4649 27.6495 -2.63556 49.5143 4.18218 72.9789C7.42436 84.1375 14.8087 95.7725 31.3693 103.729C57.6737 116.367 96.0255 125.005 129.041 131.823C189.752 144.359 256.584 144.428 318.948 134.785C368.726 127.089 446.127 113.021 430.113 78.4955C415.192 46.326 344.698 29.9193 289.546 19.8562C220.025 7.17143 149.289 3.962 76.2784 3"
                    stroke="#FFC855"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            className="sub-heading text-deep-blue-400 xl:w-[50%] lg:w-[60%] w-[80%] text-center text-xl"
          >
            Discover a place where God’s presence transforms lives, and everyone belongs.
          </motion.p>
        </div>
        <MotionButton
          initial={{ scale: 0, opacity: 0 }}
          asChild
          className="plan-btn"
        >
          <Link href="/campuses">
            Plan Your Visit
          </Link>
        </MotionButton>
      </div>
      <div className="overflow-x-hidden">
        <motion.div
          className="flex items-center w-max gap-8 p-5"
        >
          {
            [...heroImages, ...heroImages, ...heroImages].map((image, index) => (
              <Image src={image.url} key={index} alt={image.alt} className={`rounded-xl rotate-[4deg] ${image.style}`} />
            ))
          }
        </motion.div>
      </div>
      <div className="my-50 h-[50vh] flex flex-col items-center justify-center overflow-hidden relative">
        <div className="border-y-[1px] bg-white border-aero-300 flex items-center gap-2 py-2 rotate-[8deg]">
          {
            [...eventsContent, ...eventsContent].map((eventItem, index) => (
              <span key={index} className="flex items-center gap-2 w-max">
                <Asterisk className="size-3" />
                <p className="whitespace-nowrap text-aero-900 text-[32px]">{eventItem.text}</p>
              </span>
            ))
          }
        </div>
        <div className="border-y-[1px] bg-white border-aero-300 flex items-center gap-2 py-2 -rotate-[8deg]">
          {
            [...eventsContent, ...eventsContent].map((eventItem, index) => (
              <span key={index} className="flex items-center gap-2 w-max">
                <Asterisk className="size-3" />
                <p className="whitespace-nowrap text-aero-900 text-[32px]">{eventItem.text}</p>
              </span>
            ))
          }
        </div>
      </div>

      <div className="mb-50 lg:pl-[127px] px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between overflow-x-hidden gap-10">
        <div className="flex flex-col gap-4 shrink-0">
          <h2 className="lg:text-[56px] text-[40px]">Upcoming
            <div className="relative inline-block ml-4 w-fit h-fit">
              <p>Events</p>
              <svg className="absolute left-2 bottom-0 w-full" width="119" height="13" viewBox="0 0 119 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.73944 8.84912C9.59305 8.84912 17.3869 7.91732 25.1483 6.78363C32.5318 5.70515 39.986 4.99725 47.4305 4.46779C53.9941 4.00098 60.4657 3.85806 67.0057 3.0908C73.5987 2.31731 80.2905 2.16401 86.9251 2.21453C91.5177 2.2495 95.9504 3.24781 100.492 3.79494C104.13 4.23327 107.728 4.96366 111.304 5.75089C112.956 6.1146 114.718 6.28537 116.343 6.73669C117.794 7.13995 113.637 6.8776 113.62 6.87752C106.317 6.84418 97.4776 5.22042 90.5866 8.56746C90.1857 8.76221 89.9667 8.84912 89.5226 8.84912C88.3605 8.84912 91.8291 9.20799 92.9338 9.56891C94.5208 10.0874 96.2673 10.4067 97.8941 10.7894C98.3569 10.8983 98.6925 10.665 98.9112 11.1024" stroke="#FFC855" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </h2>
          <p className="text-deep-blue-400 lg:w-[60%] w-full md:w-[30%]">Stay connected with our vibrant fellowship through upcoming events</p>
        </div>
        <div className="py-2 flex flex-col gap-10 w-max">
          <div className="flex items-center gap-8">
            {
              [...events].map((item, index) => (
                <EventCard icon={item.icon} key={index} title={item.title} content={item.content} time={item.time} date={item.date} />
              ))
            }
          </div>
          <div className="flex items-center lg:ml-20 gap-8">
            <Button className="bg-aero-600 rounded-full text-aero-100 px-4 pb-3 pt-2 hover:bg-aero-400">
              <ChevronLeft />
            </Button>
            <Button className="bg-aero-600 rounded-full text-aero-100 px-4 pb-3 pt-2 hover:bg-aero-400">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-50 flex flex-col lg:flex-row items-center justify-center h-[100vh] lg:h-[50vh] p-8 xl:px-32 gap-20 lg:gap-8">
        <div className="relative mx-auto lg:w-1/2 w-full h-1/2 lg:h-full" ref={badgeContainerRef}>
          <CircleBadge drag ref={badgeContainerRef} icon={{ name: "book-heart", size: "lg:size-[88px] size-[65px]" }} className="bg-aero-100 text-aero-800 lg:p-8 p-5 shadow-md absolute top-10 left-[5px] md:left-[3%] -rotate-[9deg] will-change-transform border-white border-[11px] rounded-full cursor-grab active:cursor-grabbing" />
          <CircleBadge drag ref={badgeContainerRef} icon={{ name: "user-round", size: "lg:size-[88px] size-[65px]" }} className="bg-orange-600 text-orange-300 lg:p-8 p-5 shadow-md absolute top-0 right-[45%] -rotate-[9deg] will-change-transform border-white border-[11px] rounded-full cursor-grab active:cursor-grabbing" />
          <CircleBadge drag ref={badgeContainerRef} icon={{ name: "hand-helping", size: "lg:size-[88px] size-[65px]" }} className="bg-aero-600 text-deep-blue-600 lg:p-8 p-5 shadow-md absolute bottom-4 right-[40%] rotate-[5deg] will-change-transform border-white border-[11px] rounded-full cursor-grab active:cursor-grabbing" />
          <CircleBadge drag ref={badgeContainerRef} icon={{ name: "heart-handshake", size: "lg:size-[88px] size-[65px]" }} className="bg-yellow-600 text-yellow-1000 lg:p-8 p-5 shadow-md absolute bottom-0 left-[10%] -rotate-[11deg] will-change-transform border-white border-[11px] rounded-full cursor-grab active:cursor-grabbing" />
        </div>
        <div className="lg:w-1/2 text-center lg:text-right flex flex-col gap-4 h-1/2 lg:h-full">
          <h1 className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px]">FIND YOUR PLACE TO <br /> GROW, SERVE & BELONG</h1>
          <p className="text-deep-blue-400">At Light House, there’s a place for everyone to get involved and make a difference.</p>
        </div>
      </div>

      <div className="mb-50 h-[80vh] lg:h-screen px-8 lg:px-32 w-full">
        <div
          style={{
            backgroundImage: `url(${foundation.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
          className="rounded-4xl relative h-full w-full overflow-hidden"
        >
          <Image src={circle} alt="Circle yellow gradient" className="absolute bottom-0 left-0 w-full h-full" />
          <div className="flex flex-col gap-8 text-yellow-1100 absolute bottom-8 left-8 h-fit w-fit">
            <div className="flex flex-col gap-4">
              <h1 className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px]">NEW TO FAITH? <br /> START STRONG WITH <br /> FOUNDATION SCHOOL</h1>
              <p className="lg:w-[50%]">Whether you’re new to our church or recently born again, the Foundation School is the perfect place to begin your journey of faith, growth, and service in Christ</p>
            </div>
            <Button asChild variant="secondary-juicy" className="w-fit">
              <Link href="/resources#foundation-school">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-24">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-[40px] text-center leading-[48px] lg:text-[56px] lg:leading-[72px]">
            OUR
            <div className="relative inline-block mx-4 w-fit h-fit">
              <p>Stories</p>
              <svg width="435" height="144" viewBox="0 0 435 144" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 bottom-0 h-full w-full">
                <path d="M273.838 8.51659C205.753 5.8801 126.033 0.818651 62.3827 16.9958C20.4649 27.6495 -2.63556 49.5143 4.18218 72.9789C7.42436 84.1375 14.8087 95.7725 31.3693 103.729C57.6737 116.367 96.0255 125.005 129.041 131.823C189.752 144.359 256.584 144.428 318.948 134.785C368.726 127.089 446.127 113.021 430.113 78.4955C415.192 46.326 344.698 29.9193 289.546 19.8562C220.025 7.17143 149.289 3.962 76.2784 3" stroke="#FFC855" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <br /> OF TRANSFORMATION
          </h1>
          <p className="text-deep-blue-400 text-xl text-center w-[50%]">Hear how God’s love and the warmth of our community have impacted lives. Let these stories inspire and encourage you on your journey of faith.</p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-8 w-full justify-center">
            {
              initialTestimonials.map((item, index) => (
                <Badge key={index} variant={currentTestimonial.name === item.name ? "default" : "outline"} onClick={() => handleSelectTestimonial(item)} className="hover:cursor-pointer hover:bg-orange-500">
                  {item.name.split(" ")[0]}
                </Badge>
              ))
            }
          </div>
          <div className="relative w-full flex flex-col justify-center items-center">
            {
              testimonials.map((item, index) => (
                <motion.div
                  key={index}
                  layout
                  className={`absolute top-[80px] w-2/3 rounded-xl p-16 flex flex-col gap-6 bg-${item.color}`}
                  style={{
                    zIndex: testimonials.length - index,
                    scale: 1 - index * 0.05,
                    translateY: -(index * 20),
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <h1 className="text-3xl">&ldquo;{item.title}&quot;</h1>
                  <p>{item.content}</p>
                  <p>- {item.name}.</p>
                </motion.div>
              ))
            }
          </div>
        </div>
      </div>

    </section >
  );
}
