"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Globe, Hand } from "lucide-react";
import {
  motion,
  useVelocity,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EventCard } from "@/components/hero/event-card";
import CircleBadge from "@/components/ui/circle-badge";
import Image from "next/image";

import hero1 from "@/assets/images/hero1.png";
import hero2 from "@/assets/images/hero2.png";
import hero3 from "@/assets/images/hero3.png";
import hero4 from "@/assets/images/hero4.png";
import hero5 from "@/assets/images/hero5.webp";
import circle from "@/assets/images/circle.png";
import circle2 from "@/assets/images/circle2.png";
import Link from "next/link";
import { spring } from "motion";
import { DynamicIcon } from "lucide-react/dynamic";
import { Marquee } from "@/components/ui/marquee";
import { useWindowSize } from "@uidotdev/usehooks";
import { Hero } from "./hero";

const MotionButton = motion.create(Button);
const MotionImage = motion.create(Image);

const DRAG_BUFFER = 50;

export default function Home() {
  const heroImages = [
    {
      url: hero1,
      alt: "Women hugging",
      style: "mt-2",
      badges: [
        {
          icon: "earth",
          style: "bg-orange-600 text-orange-200 -top-4 left-10 p-2 rotate-9",
        },
        {
          text: "Love",
          style:
            "bg-yellow-600 text-yellow-1000 -bottom-6 right-0 px-4 py-2 -rotate-8",
        },
      ],
    },
    {
      url: hero2,
      alt: "Picture of a man on his knees on the floor praying in a crowd of people",
      style: "mt-60",
      badges: [
        {
          icon: "hand-heart",
          style: "bg-aero-600 text-deep-blue-600 top-55 left-10 p-2 rotate-9",
        },
        {
          text: "Faith",
          style:
            "bg-orange-600 text-orange-200 -bottom-6 right-0 px-4 py-2 -rotate-8",
        },
      ],
    },
    {
      url: hero3,
      alt: "Picture of a man praying with his hands clasped togther.",
      style: "mt-2",
      badges: [
        {
          text: "Prayer",
          style:
            "bg-aero-600 text-deep-blue-600 -top-4 left-10 px-4 py-2 -rotate-9",
        },
        {
          icon: "flame",
          style:
            "bg-yellow-600 text-yellow-1000 -bottom-6 right-0 p-2 -rotate-8",
        },
      ],
    },
    {
      url: hero4,
      alt: "Picture of a man on his knees on the floor praying in a crowd of people",
      style: "mt-60",
      badges: [
        {
          text: "Jesus",
          style:
            "bg-yellow-200 text-yellow-1000 top-55 left-10 px-4 py-2 -rotate-9",
        },
        {
          icon: "flame",
          style:
            "bg-yellow-600 text-yellow-1000 -bottom-6 right-0 p-2 -rotate-8",
        },
      ],
    },
    {
      url: hero5,
      alt: "Picture of a man on his knees on the floor praying in a crowd of people",
      style: "mt-60",
      badges: [
        {
          text: "Jesus",
          style:
            "bg-yellow-200 text-yellow-1000 top-55 left-10 px-4 py-2 -rotate-9",
        },
        {
          icon: "flame",
          style:
            "bg-yellow-600 text-yellow-1000 -bottom-6 right-0 p-2 -rotate-8",
        },
      ],
    },
  ];

  const events = [
    // {
    //   title: "Foundation School Graduation",
    //   content:
    //     "Celebrate the achievements of our Foundation School graduates as they complete their spiritual journey and step into their next season of ministry and service.",
    //   time: "10 AM",
    //   date: "1st June, 2025",
    //   icon: { style: "bg-aero-600 text-deep-blue-600", name: "graduation-cap" },
    // },
    // {
    //   title: "Global Communion Service",
    //   content:
    //     "Join believers worldwide in a powerful time of unity and worship as we partake in communion together, transcending borders and celebrating our shared faith.",
    //   time: "10 AM",
    //   date: "1st June, 2025",
    //   icon: { style: "bg-orange-600 text-orange-200", name: "book-open-text" },
    // },
    {
      title: "Ignite Con '25",
      content:
        "Join us as we set Pretoria on fire for Jesus at Ignite Conference 2025!",
      time: "10 AM",
      date: "31st August, 2025",
      icon: { style: "bg-orange-600 text-orange-200", name: "flame" },
      url: "https://kingsforms.online/igniteregistration"
    },
    {
      title: "ICPLC 2025",
      content:
        "Meet us in Loveworld City for revelation, fire, and unstoppable vision!",
      time: "10 AM",
      date: "4th - 7th September 2025",
      icon: { style: "bg-aero-600 text-deep-blue-600", name: "book-open-text" },
      url: "https://icplc-live.vercel.app/"
    },
  ];

  const initialTestimonials = [
    {
      name: "Noluthando N",
      title: "Exponential Spiritual Growth",
      content:
        "Hi, I'm Noluthando Nsele, and I've been attending BLW Lighthouse for the past three years. Being part of this community has profoundly impacted my life. Before joining, I struggled to find purpose and meaning. However, through the church's teachings and ministries, such as the Foundation School, I've grown deeper in my faith and developed a stronger sense of identity.\n\nThe Bible says in 1 Corinthians 15:33, 'Do not be deceived: Bad company corrupts good morals.' I can attest to this truth. The friends I've made at Lighthouse have been instrumental in my spiritual growth. They've taught me to rely on God, pray with me in times of need, and correct me when I'm wrong. I'm truly blessed.\n\nBLW Lighthouse emphasizes holistic growth, covering not only biblical teachings and spiritual growth but also practical life aspects. This comprehensive approach has challenged me to live out my faith in meaningful ways.\n\nI'm grateful for BLW Lighthouse and its role in my spiritual journey. The church has become my family, and I'm committed to continuing to grow and serve. Now I am a leader at the church and I'm thankful for the opportunity to serve in the house of the Lord.\n\nIf you're seeking a church that will challenge, encourage, and support you, I highly recommend BLW Lighthouse.",
      color: "yellow-600",
    },
    {
      name: "Mbali S",
      title: "Lighthouse has been a game changer!",
      content:
        "I'm Sister Mbali from Lighthouse SMU. Over the past three years, I've had an incredible journey. I've connected with amazing people, developed a unique skill set through the numerous activities and departments I was a part of, and been prepared for ministry and life.\n\nPastor Semi is the highlight of my experience, embodying excellence and limitless potential. He inspires me to strive for excellence and fulfill my potential. Lighthouse has been a game changer, shifting my life's trajectory. I'm grateful for the impact it's had.",
      color: "orange-600",
    },
    {
      name: "Phenyo M",
      title: "A True Beacon of Light",
      content:
        "This year, being part of BLW Lighthouse has been such a blessing in my life. It's been a place of hope, encouragement, and faith - a true beacon of light indeed.\n\nThrough the guidance and support l've received, l've grown so much in my faith, learning to trust God more deeply and walk in His purpose. I'm truly thankful for Pastor Semi for his prayers, teachings, and fellowship that have strengthened me spiritually.\n\nNot only has this year been a spiritual breakthrough, but it has also been a year of personal achievement. There was a time when I faced significant challenges in my academics and felt as though there was no hope. However, by God's grace, I was able to overcome those difficulties and achieve excellent results in the module I struggled with—something I could not have accomplished without His strength and the unwavering support and encouragement from the BLW Lighthouse family.\n\nThank you, BLW Lighthouse, for being such a big part of my journey this year. Here's to another year of faith, growth, and blessings. God bless you all.",
      color: "aero-600",
    },
    {
      name: "Denzel K",
      title: "A Life-Changing Experience",
      content:
        "Being part of Lighthouse has been transformative for me. Being part of Lighthouse has provided a nurturing environment where I've built meaningful friendships and grown spiritually.\n\nThe teachings and fellowship have deepened my understanding of God's love and purpose for my life. To me Lighthouse isn't just a church group; it's a family that has encouraged me to step out of my comfort zone, serve others, and strengthen my faith.",
      color: "aero-600",
    },
  ];

  interface Testimonial {
    name: string;
    title: string;
    content: string;
    color: string;
  }

  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial>(
    initialTestimonials[0],
  );
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [expandedTestimonials, setExpandedTestimonials] = useState<Set<string>>(
    new Set(),
  );

  const [eventsIndex, setEventsIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(size.width ? size.width < 768 : false); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [size.width]);

  const getCardWidth = () => {
    if (isMobile) {
      return size.width ? size.width - 32 : 320; // fallback to 320px if width is null
    } else {
      return 450;
    }
  };

  const gap = 32;
  const cardWidth = getCardWidth();
  const totalCardWidth = cardWidth + gap;

  const dragX = useMotionValue(0);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && eventsIndex < events.length - 1) {
      setEventsIndex((prev) => prev + 1);
    } else if (x >= DRAG_BUFFER && eventsIndex > 0) {
      setEventsIndex((prev) => prev - 1);
    }
  };

  const goToPrevious = () => {
    if (eventsIndex > 0) {
      setEventsIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (eventsIndex < events.length - 1) {
      setEventsIndex((prev) => prev + 1);
    }
  };

  const handleSelectTestimonial = (item: Testimonial) => {
    const newOrder = [
      item,
      ...testimonials.filter((t) => t.name !== item.name),
    ];
    setTestimonials(newOrder);
    setCurrentTestimonial(item);

    // Auto-collapse testimonials that are no longer in front position
    setExpandedTestimonials((prev) => {
      const newSet = new Set(prev);
      // Keep only the front card expanded if it was already expanded
      const nonFrontCards = newOrder.slice(1);
      nonFrontCards.forEach((testimonial) => {
        newSet.delete(testimonial.name);
      });
      return newSet;
    });
  };

  const handleDragTestimonialCard = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } },
    draggedItem: Testimonial,
  ) => {
    const dragThreshold = 100;
    const dragDistance = Math.abs(info.offset.x);

    if (dragDistance > dragThreshold) {
      const currentIndex = testimonials.findIndex(
        (t) => t.name === draggedItem.name,
      );
      if (currentIndex === 0 && testimonials.length > 1) {
        const newOrder = [...testimonials.slice(1), testimonials[0]];
        setTestimonials(newOrder);
        setCurrentTestimonial(newOrder[0]);

        // Auto-collapse the card that was dragged away from front position
        setExpandedTestimonials((prev) => {
          const newSet = new Set(prev);
          newSet.delete(draggedItem.name);
          return newSet;
        });
      }
    }
  };

  const toggleTestimonialExpansion = (testimonialName: string) => {
    setExpandedTestimonials((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(testimonialName)) {
        newSet.delete(testimonialName);
      } else {
        newSet.add(testimonialName);
      }
      return newSet;
    });
  };

  const badgeContainerRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const rotate = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    ["-2deg", "0deg", "2deg"],
  );

  return (
    <section className="font-body pt-[100px] lg:pt-[140px] relative">
      <Hero />
      <svg
        width="1440"
        height="735"
        viewBox="0 0 1440 735"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute lg:block hidden top-0 w-full z-[1]"
      >
        <circle cx="720" r="831" fill="url(#paint0_radial_2052_107)" />
        <defs>
          <radialGradient
            id="paint0_radial_2052_107"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(720 -1.55493e-05) rotate(46.6085) scale(806.06)"
          >
            <stop stopColor="#3DBAEE" stopOpacity="0.63" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <svg
        width="393"
        height="882"
        viewBox="0 0 393 882"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute block lg:hidden top-0 w-full z-[1]"
      >
        <circle cx="197" cy="51" r="831" fill="url(#paint0_radial_2338_2146)" />
        <defs>
          <radialGradient
            id="paint0_radial_2338_2146"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(197 51) rotate(49.5892) scale(829.455)"
          >
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
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          {[...heroImages, ...heroImages, ...heroImages, ...heroImages].map(
            (image, index) => (
              <div className="relative h-max w-max" key={index}>
                {image.badges?.map((badge, idx) => (
                  <span
                    key={idx}
                    className={`${badge.style} absolute rounded-full block border-3 border-white z-[10]`}
                  >
                    {badge.text ? (
                      <p className="font-semibold">{badge.text}</p>
                    ) : (
                      <DynamicIcon
                        name={
                          badge.icon as
                          | "globe"
                          | "hand-heart"
                          | "flame"
                          | "earth"
                        }
                        fallback={() => <Globe />}
                        className="size-5"
                      />
                    )}
                  </span>
                ))}
                <MotionImage
                  src={image.url}
                  alt={image.alt}
                  className={`rounded-xl rotate-4 ${image.style} w-[300px] lg:w-[400px] h-full`}
                  style={{ rotate }}
                />
              </div>
            ),
          )}
        </motion.div>
      </div>

      {/* Events Section */}
      <div className="my-10 lg:my-50 h-[50vh] flex flex-col items-center justify-center overflow-hidden relative">
        <div className="border-y-[1px] bg-white border-aero-300 rotate-[8deg] overflow-hidden py-2">
          <Marquee baseVelocity={-2}>
            * Join Us This 31st August * Ignite Con &lsquo;25  *  Join Us This 31st August * Ignite Con &lsquo;25
          </Marquee>
        </div>
        <div className="border-y-[1px] bg-white border-aero-300 -rotate-[8deg] overflow-hidden py-2">
          <Marquee baseVelocity={-2}>
            * Join Us This 31st August * Ignite Con &lsquo;25  *  Join Us This 31st August * Ignite Con &lsquo;25
          </Marquee>
        </div>
      </div>

      <div className="mb-50 lg:pl-[127px] px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between overflow-x-hidden gap-10">
        <div className="flex flex-col gap-4">
          <div className="overflow-y-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                delay: 0.2,
                type: spring,
                bounce: 0.5,
              }}
              className="text-[35px] leading-[48px] lg:text-[56px] lg:leading-[72px]"
            >
              Upcoming
              <div className="relative inline-block ml-4 w-fit h-fit">
                <p>Events</p>
                <svg
                  className="absolute left-2 -bottom-0.5 w-full"
                  width="119"
                  height="13"
                  viewBox="0 0 119 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/motion.svg"
                >
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      delay: 0.7,
                    }}
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
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8 }}
            className="text-deep-blue-400 lg:w-[60%] w-full md:w-[30%]"
          >
            Stay connected with our vibrant fellowship through upcoming events
          </motion.p>
        </div>
        <div className="py-2 flex flex-col gap-10 overflow-hidden relative">
          <motion.div
            drag="x"
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            style={{
              x: dragX,
            }}
            animate={{
              translateX: -eventsIndex * totalCardWidth,
            }}
            transition={{
              type: "spring",
              mass: 3,
              stiffness: 400,
              damping: 50,
            }}
            onDragEnd={onDragEnd}
            className="flex items-center gap-8 cursor-grab active:cursor-grabbing w-max relative"
          >
            {[...events].map((item, index) => (
              <EventCard
                icon={item.icon}
                key={index}
                title={item.title}
                content={item.content}
                time={item.time}
                date={item.date}
                url={item.url}
              />
            ))}
          </motion.div>
          <div className="flex items-center lg:ml-20 gap-8">
            <Button
              variant="tertiary"
              size="round"
              className="rounded-full"
              onClick={goToPrevious}
              disabled={eventsIndex === 0}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="tertiary"
              size="round"
              className="rounded-full"
              onClick={goToNext}
              disabled={eventsIndex === events.length - 1}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>

      {/* Grow Section */}
      <div className="mb-50 lg:mb-75 flex flex-col lg:flex-row items-center justify-center h-[100vh] lg:h-[50vh] p-8 xl:px-32 gap-20 lg:gap-8">
        <div className="relative mx-auto size-[300px]" ref={badgeContainerRef}>
          <CircleBadge
            drag
            ref={badgeContainerRef}
            icon={{ name: "book-heart", size: "size-[88px]" }}
            className="bg-aero-100 text-aero-800 p-8 absolute top-[22px] left-[21px] -rotate-[9deg] will-change-transform border-white border-[11px] rounded-full cursor-grab active:cursor-grabbing"
          />
          <CircleBadge
            drag
            ref={badgeContainerRef}
            icon={{ name: "user-round", size: "size-[88px]" }}
            className="bg-orange-600 text-orange-300 p-8 absolute top-[37px] left-[100px] -rotate-[9deg] will-change-transform border-white border-[11px] rounded-full cursor-grab active:cursor-grabbing"
          />
          <CircleBadge
            drag
            ref={badgeContainerRef}
            icon={{ name: "hand-helping", size: "size-[88px]" }}
            className="bg-aero-600 text-deep-blue-600 p-8 absolute top-[135px] left-[121px] rotate-[5deg] will-change-transform border-white border-[11px] rounded-full cursor-grab active:cursor-grabbing"
          />
          <CircleBadge
            drag
            ref={badgeContainerRef}
            icon={{ name: "heart-handshake", size: "size-[88px]" }}
            className="bg-yellow-600 text-yellow-1000 p-8 absolute top-[121px] left-[14px] -rotate-[11deg] will-change-transform border-white border-[11px] rounded-full cursor-grab active:cursor-grabbing"
          />
        </div>
        <div className="lg:w-1/2 text-center lg:text-right flex flex-col lg:justify-center gap-4 h-1/2 lg:h-full">
          <div className="flex flex-col gap-1">
            <div className="overflow-y-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.2,
                  type: spring,
                  bounce: 0.5,
                }}
                className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px]"
              >
                FIND YOUR PLACE TO
              </motion.h1>
            </div>
            <div className="overflow-y-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.2,
                  type: spring,
                  bounce: 0.5,
                }}
                className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px]"
              >
                GROW, SERVE & BELONG
              </motion.h1>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
            className="text-deep-blue-400"
          >
            At Lighthouse, there’s a place for everyone to get involved and make
            a difference.
          </motion.p>
        </div>
      </div>

      <div className="mb-50 lg:mb-75 h-fit px-8 lg:px-32 w-full">
        <motion.div
          style={{
            // backgroundImage: `url(${foundation.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className={`rounded-4xl relative h-full w-full flex items-center justify-center md:items-start md:justify-normal overflow-hidden origin-center bg-deep-blue-600 md:bg-[url(/foundation.png)]`}
          initial={{ height: 0, width: 0 }}
          whileInView={{ height: "100%", width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: spring, bounce: 0.3 }}
        >
          <Image
            src={circle}
            alt="Circle yellow gradient"
            className="absolute bottom-0 left-0 w-full h-full hidden md:block"
          />
          <Image
            src={circle2}
            alt="Circle yellow gradient"
            className="absolute bottom-0 left-0 w-full h-full md:hidden block"
          />
          <div className="flex flex-col gap-8 text-yellow-100 md:text-yellow-1100 relative p-8 lg:p-20 md:bottom-0 h-fit w-fit">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:gap-1">
                <div className="overflow-y-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                      delay: 0.7,
                      type: spring,
                      bounce: 0.5,
                    }}
                    className="text-[35px] leading-[48px] lg:text-[56px] lg:leading-[72px]"
                  >
                    NEW TO FAITH?
                  </motion.h1>
                </div>
                <div className="overflow-y-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                      delay: 0.7,
                      type: spring,
                      bounce: 0.5,
                    }}
                    className="text-[35px] leading-[48px] lg:text-[56px] lg:leading-[72px]"
                  >
                    START STRONG
                  </motion.h1>
                </div>
                <div className="overflow-y-hidden">
                  <motion.h1
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                      delay: 0.7,
                      type: spring,
                      bounce: 0.5,
                    }}
                    className="text-[35px] leading-[48px] lg:text-[56px] lg:leading-[72px]"
                  >
                    WITH FOUNDATION SCHOOL
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
                Whether you’re new to our church or recently born again, the
                Foundation School is the perfect place to begin your journey of
                faith, growth, and service in Christ
              </motion.p>
            </div>
            <MotionButton
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
              asChild
              variant="secondary-juicy"
              className="w-fit"
            >
              <Link href="/resources#foundation-school">Learn More</Link>
            </MotionButton>
          </div>
        </motion.div>
      </div>

      <div
        className={`flex flex-col gap-24 ${expandedTestimonials.size > 0 ? "pb-[600px]" : "pb-24"}`}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col gap-2">
            <div className="overflow-y-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.7,
                  type: spring,
                  bounce: 0.5,
                }}
                className="text-[40px] text-center leading-[48px] lg:text-[56px] lg:leading-[72px]"
              >
                OUR
                <div className="relative inline-block mx-4 w-fit h-fit">
                  <p>Stories</p>
                  <svg
                    width="435"
                    height="144"
                    viewBox="0 0 435 144"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-0 bottom-0 h-full w-full"
                  >
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                        delay: 0.7,
                      }}
                      d="M273.838 8.51659C205.753 5.8801 126.033 0.818651 62.3827 16.9958C20.4649 27.6495 -2.63556 49.5143 4.18218 72.9789C7.42436 84.1375 14.8087 95.7725 31.3693 103.729C57.6737 116.367 96.0255 125.005 129.041 131.823C189.752 144.359 256.584 144.428 318.948 134.785C368.726 127.089 446.127 113.021 430.113 78.4955C415.192 46.326 344.698 29.9193 289.546 19.8562C220.025 7.17143 149.289 3.962 76.2784 3"
                      stroke="#FFC855"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </motion.h1>
            </div>
            <div className="overflow-y-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.7,
                  type: spring,
                  bounce: 0.5,
                }}
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
            Hear how God’s love and the warmth of our community have impacted
            lives. Let these stories inspire and encourage you on your journey
            of faith.
          </motion.p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 md:gap-8 w-full justify-center">
            {initialTestimonials.map((item, index) => (
              <Badge
                key={index}
                variant={
                  currentTestimonial.name === item.name ? "default" : "outline"
                }
                onClick={() => handleSelectTestimonial(item)}
                className="text-xs md:text-base hover:cursor-pointer hover:bg-orange-500"
              >
                {item.name.split(" ")[0]}
              </Badge>
            ))}
          </div>
          <div
            className={`relative w-full flex flex-col justify-center items-center ${expandedTestimonials.size > 0 ? "min-h-[800px]" : "min-h-[600px]"}`}
          >
            {testimonials.map((item, index) => {
              const isExpanded = expandedTestimonials.has(item.name);
              const shouldTruncateContent =
                !isExpanded && item.content.length > 160;
              const displayContent = shouldTruncateContent
                ? item.content.substring(0, 160) + "..."
                : item.content;

              return (
                <motion.div
                  key={index}
                  layout
                  className={`${isExpanded ? "h-auto min-h-[400px] max-h-[500px]" : "h-[450px]"} overflow-hidden absolute top-[80px] w-[80%] md:w-2/3 rounded-xl p-8 md:p-16 flex flex-col gap-6 bg-${item.color} cursor-${index === 0 ? "grab" : "default"}`}
                  drag="x"
                  dragConstraints={{
                    left: 0,
                    right: 0,
                  }}
                  dragElastic={0.2}
                  whileDrag={{
                    scale: 1.05,
                    rotate: 5,
                    zIndex: 1000,
                  }}
                  onDragEnd={(event, info) =>
                    handleDragTestimonialCard(event, info, item)
                  }
                  style={{
                    zIndex: testimonials.length - index,
                    scale: 1 - index * 0.05,
                  }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  animate={{
                    scale: 1 - index * 0.05,
                    y: -(index * 20),
                  }}
                >
                  <h1 className="text-3xl">&ldquo;{item.title}&quot;</h1>
                  <p
                    className={`flex-1 ${isExpanded ? "overflow-y-auto" : ""}`}
                  >
                    {displayContent}
                  </p>
                  <p>- {item.name}.</p>
                  {index === 0 && (
                    <div className="flex items-center justify-center w-full">
                      <Button
                        variant="link"
                        onClick={() => toggleTestimonialExpansion(item.name)}
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </Button>
                    </div>
                  )}
                  {index === 0 && (
                    <div className="absolute top-4 right-4 text-deep-blue-500 rounded-full bg-background p-2 text-sm">
                      <Hand className="size-4" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
