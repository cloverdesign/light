'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Globe, HeartHandshakeIcon } from "lucide-react";
import { motion, useVelocity, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { EventCard } from "@/components/hero/event-card";
import CircleBadge from "@/components/ui/circle-badge";
import Image from "next/image";

import hero1 from '@/assets/images/hero1.png'
import hero2 from '@/assets/images/hero2.png'
import hero3 from '@/assets/images/hero3.png'
import hero4 from '@/assets/images/hero4.png'
import circle from '@/assets/images/circle.png'
import Link from "next/link";
import { useMotionTimeline } from "@/hooks/useMotionTimeline";
import { spring } from "motion";
import { DynamicIcon } from "lucide-react/dynamic";
import { Marquee } from "@/components/ui/marquee";

const MotionBadge = motion.create(Badge)
const MotionButton = motion.create(Button)
const MotionImage = motion.create(Image)

export default function Home() {

  const scope = useMotionTimeline(
    [
      [
        ['.heading-1', { y: 0 }, { duration: 1, ease: "easeInOut", type: spring, bounce: 0.5 }],
        ['.heading-2', { y: 0 }, { duration: 1, ease: "easeInOut", delay: 0.1, type: spring, bounce: 0.5 }],
        ['.plan-btn', { scale: 1, opacity: 1 }, { duration: 0.8, ease: "easeInOut", delay: 0.2 }],
        ['.sub-heading', { opacity: 1, }, { duration: 1, ease: "easeInOut", delay: 0.3, }]
      ],
      [
        ['.welcome-badge', { scale: 1, opacity: 1, rotate: [0, 4] }, { duration: 0.8, ease: "easeInOut", }],
        ['.path-1', { pathLength: 1, opacity: 1 }, { duration: 0.8, ease: "easeInOut" }],
      ]
    ],
    1
  )

  const heroImages = [
    {
      url: hero1,
      alt: "Women hugging",
      style: "mt-2",
      badges: [
        { icon: "earth", style: "bg-orange-600 text-orange-200 -top-4 left-10 p-2 rotate-9" },
        { text: "Love", style: "bg-yellow-600 text-yellow-1000 -bottom-6 right-0 px-4 py-2 -rotate-8" }
      ]
    },
    {
      url: hero2,
      alt: "Picture of a man on his knees on the floor praying in a crowd of people",
      style: "mt-60",
      badges: [
        { icon: "hand-heart", style: "bg-aero-600 text-deep-blue-600 top-55 left-10 p-2 rotate-9" },
        { text: "Faith", style: "bg-orange-600 text-orange-200 -bottom-6 right-0 px-4 py-2 -rotate-8" }
      ]
    },
    {
      url: hero3,
      alt: "Picture of a man praying with his hands clasped togther.",
      style: "mt-2",
      badges: [
        { text: "Prayer", style: "bg-aero-600 text-deep-blue-600 -top-4 left-10 px-4 py-2 -rotate-9" },
        { icon: "flame", style: "bg-yellow-600 text-yellow-1000 -bottom-6 right-0 p-2 -rotate-8" }
      ]
    },
    {
      url: hero4,
      alt: "Picture of a man on his knees on the floor praying in a crowd of people",
      style: "mt-60",
      badges: [
        { text: "Jesus", style: "bg-yellow-200 text-yellow-1000 top-55 left-10 px-4 py-2 -rotate-9" },
        { icon: "flame", style: "bg-yellow-600 text-yellow-1000 -bottom-6 right-0 p-2 -rotate-8" }
      ]
    },
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

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const rotate = useTransform(smoothVelocity, [-1000, 0, 1000], ["-2deg", "0deg", "2deg"]);

  return (
    <section
      ref={scope}
      className="font-body pt-[140px] mb-200 relative">

      {/* Hero Section */}
      <div className="flex flex-col items-center gap-16 lg:h-screen z-[2] relative">
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

      <svg width="1440" height="735" viewBox="0 0 1440 735" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 w-full z-[1]">
        <circle cx="720" r="831" fill="url(#paint0_radial_2052_107)" />
        <defs>
          <radialGradient id="paint0_radial_2052_107" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(720 -1.55493e-05) rotate(46.6085) scale(806.06)">
            <stop stopColor="#3DBAEE" stopOpacity="0.63" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Hero Images */}
      <div className="overflow-hidden py-8">
        <motion.div
          className="flex items-center w-max gap-8 py-5"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {
            [...heroImages, ...heroImages, ...heroImages, ...heroImages].map((image, index) => (
              <div className="relative h-max w-max" key={index}>
                {image.badges?.map((badge, idx) => (
                  <span key={idx} className={`${badge.style} absolute rounded-full block border-3 border-white z-[10]`}>
                    {badge.text ? <p className="font-semibold">{badge.text}</p> : <DynamicIcon name={badge.icon as any} fallback={() => <Globe />} className="size-5" />}
                  </span>
                ))}
                <MotionImage
                  src={image.url}
                  alt={image.alt}
                  className={`rounded-xl rotate-4 ${image.style} w-[300px] lg:w-[400px]`}
                  style={{ rotate }}
                />
              </div>
            ))
          }
        </motion.div>
      </div>

      {/* Events Section */}
      <div className="my-10 lg:my-50 h-[50vh] flex flex-col items-center justify-center overflow-hidden relative">
        <div className="border-y-[1px] bg-white border-aero-300 rotate-[8deg] overflow-hidden py-2">
          <Marquee baseVelocity={-2}>
            * Join Us This Sunday * Bible Study Wednesdays at 7PM * Community Outreach this Saturday
          </Marquee>
        </div>
        <div className="border-y-[1px] bg-white border-aero-300 -rotate-[8deg] overflow-hidden py-2">
          <Marquee baseVelocity={-2}>
            * Join Us This Sunday * Bible Study Wednesdays at 7PM * Community Outreach this Saturday
          </Marquee>
        </div>
      </div>

      <div className="mb-50 lg:pl-[127px] px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between overflow-x-hidden gap-10">
        <div className="flex flex-col gap-4 shrink-0">
          <div className="overflow-y-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2, type: spring, bounce: 0.5 }}
              className="lg:text-[56px] text-[40px]">
              Upcoming
              <div className="relative inline-block ml-4 w-fit h-fit">
                <p>Events</p>
                <svg
                  className="absolute left-2 bottom-0 w-full" width="119" height="13" viewBox="0 0 119 13" fill="none" xmlns="http://www.w3.org/2000/motion.svg">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.7 }}
                    d="M1.73944 8.84912C9.59305 8.84912 17.3869 7.91732 25.1483 6.78363C32.5318 5.70515 39.986 4.99725 47.4305 4.46779C53.9941 4.00098 60.4657 3.85806 67.0057 3.0908C73.5987 2.31731 80.2905 2.16401 86.9251 2.21453C91.5177 2.2495 95.9504 3.24781 100.492 3.79494C104.13 4.23327 107.728 4.96366 111.304 5.75089C112.956 6.1146 114.718 6.28537 116.343 6.73669C117.794 7.13995 113.637 6.8776 113.62 6.87752C106.317 6.84418 97.4776 5.22042 90.5866 8.56746C90.1857 8.76221 89.9667 8.84912 89.5226 8.84912C88.3605 8.84912 91.8291 9.20799 92.9338 9.56891C94.5208 10.0874 96.2673 10.4067 97.8941 10.7894C98.3569 10.8983 98.6925 10.665 98.9112 11.1024"
                    stroke="#FFC855"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            className="text-deep-blue-400 lg:w-[60%] w-full md:w-[30%]"
          >Stay connected with our vibrant fellowship through upcoming events</motion.p>
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

      {/* Grow Section */}
      <div className="mb-50 lg:mb-75 flex flex-col lg:flex-row items-center justify-center h-[100vh] lg:h-[50vh] p-8 xl:px-32 gap-20 lg:gap-8">
        <div className="relative mx-auto lg:w-1/2 w-full h-1/2 lg:h-full" ref={badgeContainerRef}>
          <CircleBadge
            drag ref={badgeContainerRef} icon={{ name: "book-heart", size: "lg:size-[88px] size-[65px]" }} className="bg-aero-100 text-aero-800 lg:p-8 p-5 shadow-md absolute top-10 left-[5px] md:left-[3%] -rotate-[9deg] will-change-transform border-white border-[11px] rounded-full cursor-grab active:cursor-grabbing" />
          <CircleBadge
            drag ref={badgeContainerRef} icon={{ name: "user-round", size: "lg:size-[88px] size-[65px]" }} className="bg-orange-600 text-orange-300 lg:p-8 p-5 shadow-md absolute top-0 right-[45%] -rotate-[9deg] will-change-transform border-white border-[11px] rounded-full cursor-grab active:cursor-grabbing" />
          <CircleBadge
            drag ref={badgeContainerRef} icon={{ name: "hand-helping", size: "lg:size-[88px] size-[65px]" }} className="bg-aero-600 text-deep-blue-600 lg:p-8 p-5 shadow-md absolute bottom-4 right-[40%] rotate-[5deg] will-change-transform border-white border-[11px] rounded-full cursor-grab active:cursor-grabbing" />
          <CircleBadge
            drag ref={badgeContainerRef} icon={{ name: "heart-handshake", size: "lg:size-[88px] size-[65px]" }} className="bg-yellow-600 text-yellow-1000 lg:p-8 p-5 shadow-md absolute bottom-0 left-[10%] -rotate-[11deg] will-change-transform border-white border-[11px] rounded-full cursor-grab active:cursor-grabbing" />
        </div>
        <div className="lg:w-1/2 text-center lg:text-right flex flex-col gap-4 h-1/2 lg:h-full">
          <div className="overflow-y-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2, type: spring, bounce: 0.5 }}
              className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px]">
              FIND YOUR PLACE TO
            </motion.h1>
          </div>
          <div className="overflow-y-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2, type: spring, bounce: 0.5 }}
              className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px]">
              GROW, SERVE & BELONG
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
            className="text-deep-blue-400"
          >
            At Light House, there’s a place for everyone to get involved and make a difference.
          </motion.p>
        </div>
      </div>

      <div className="mb-50 lg:mb-75 h-[60vh] lg:h-[80vh] px-8 lg:px-32 w-full">
        <motion.div
          style={{
            // backgroundImage: `url(${foundation.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
          className={`rounded-4xl relative h-full w-full flex items-center justify-center md:items-start md:justify-normal overflow-hidden origin-center bg-deep-blue-600 md:bg-[url(/foundation.png)]`}
          initial={{ height: 0, width: 0 }}
          whileInView={{ height: "100%", width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: spring, bounce: 0.3 }}
        >
          <Image src={circle} alt="Circle yellow gradient" className="absolute bottom-0 left-0 w-full h-full" />
          <div className="flex flex-col gap-8 text-yellow-100 md:text-yellow-1100 absolute p-5 lg:p-20 md:bottom-0 h-fit w-fit">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="overflow-y-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.7, type: spring, bounce: 0.5 }}
                    className="text-[35px] leading-[48px] lg:text-[56px] lg:leading-[72px]">
                    NEW TO FAITH?
                  </motion.h1>
                </div>
                <div className="overflow-y-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.7, type: spring, bounce: 0.5 }}
                    className="text-[35px] leading-[48px] lg:text-[56px] lg:leading-[72px]">
                    START STRONG WITH
                  </motion.h1>
                </div>
                <div className="overflow-y-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.7, type: spring, bounce: 0.5 }}
                    className="text-[35px] leading-[48px] lg:text-[56px] lg:leading-[72px]">
                    FOUNDATION SCHOOL
                  </motion.h1>
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
                className="lg:w-[50%]"
              >
                Whether you’re new to our church or recently born again, the Foundation School is the perfect place to begin your journey of faith, growth, and service in Christ
              </motion.p>
            </div>
            <MotionButton
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
              asChild variant="secondary-juicy" className="w-fit">
              <Link href="/resources#foundation-school">
                Learn More
              </Link>
            </MotionButton>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-24">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col gap-2">
            <div className="overflow-y-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.7, type: spring, bounce: 0.5 }}
                className="text-[40px] text-center leading-[48px] lg:text-[56px] lg:leading-[72px]">
                OUR
                <div className="relative inline-block mx-4 w-fit h-fit">
                  <p>Stories</p>
                  <svg width="435" height="144" viewBox="0 0 435 144" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 bottom-0 h-full w-full">
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.7 }}
                      d="M273.838 8.51659C205.753 5.8801 126.033 0.818651 62.3827 16.9958C20.4649 27.6495 -2.63556 49.5143 4.18218 72.9789C7.42436 84.1375 14.8087 95.7725 31.3693 103.729C57.6737 116.367 96.0255 125.005 129.041 131.823C189.752 144.359 256.584 144.428 318.948 134.785C368.726 127.089 446.127 113.021 430.113 78.4955C415.192 46.326 344.698 29.9193 289.546 19.8562C220.025 7.17143 149.289 3.962 76.2784 3" stroke="#FFC855" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </div>
              </motion.h1>
            </div>
            <div className="overflow-y-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.7, type: spring, bounce: 0.5 }}
                className="text-[40px] text-center leading-[48px] lg:text-[56px] lg:leading-[72px]"
              >
                OF TRANSFORMATION
              </motion.h1>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8 }}
            className="text-deep-blue-400 text-xl text-center lg:w-[50%] px-8"
          >
            Hear how God’s love and the warmth of our community have impacted lives. Let these stories inspire and encourage you on your journey of faith.
          </motion.p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 md:gap-8 w-full justify-center">
            {
              initialTestimonials.map((item, index) => (
                <Badge key={index} variant={currentTestimonial.name === item.name ? "default" : "outline"} onClick={() => handleSelectTestimonial(item)} className="text-xs md:text-base hover:cursor-pointer hover:bg-orange-500">
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
                  className={`absolute top-[80px] w-[80%] md:w-2/3 rounded-xl p-16 flex flex-col gap-6 bg-${item.color}`}
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
