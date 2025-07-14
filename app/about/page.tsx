"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

import about from "@/assets/images/about.webp";
import about2 from "@/assets/images/about2.png";
import aboutValues from "@/assets/images/about-values.png";
import aboutValuesMobile from "@/assets/images/about-values-mobile.png";
import circle from "@/assets/images/about-circle.png";
import mission from "@/assets/images/mission.png";
import vision from "@/assets/images/vision.png";
import danielle from "@/assets/images/danielle.webp";
import angelina from "@/assets/images/angelina.webp";
import khutsiso from "@/assets/images/khutsiso.webp";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Asterisk,
  BookOpen,
  Flame,
  FlameIcon,
  Flashlight,
  HandCoins,
  HandHeart,
  Heart,
  HeartPulse,
  Lightbulb,
  Trees,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useMotionTimeline } from "@/hooks/useMotionTimeline";
import { spring } from "motion";
import { useRef } from "react";
import TeamLeadersGrid from "@/components/about/team-leaders-grid";

const MotionButton = motion.create(Button);
const MotionImage = motion.create(Image);
const MotionBadge = motion.create(Badge);
const MotionDiv = motion.create("div");

export default function About() {
  const campus = [
    {
      title: "The Bible is the inspired Word of God.",
      content: [
        "We believe that the Bible contains the inspired Word of God (2 Tit 3:16, 2 Pet 1:20-21)",
      ],
    },
    {
      title:
        "One God, existing in three persons: Father, Son, and Holy Spirit.",
      content: [
        "We believe that there is one God eternally existent in three persons:",
        "God the Father, God the Son and God the Holy Spirit. (Eph 4:4-5; 1 Cor 8:6)",
      ],
    },
    {
      title: "We believe in the Deity of Christ.",
      content: [
        "He was born of a virgin; (Jn 1:1-4, 10:30, Heb 1:1-5)",
        "He was conceived of the Holy Spirit; (Matt 1:18-25; Luk 1:30-3 5)",
        "He died; (John 19:30-3, 5)",
        "He rose again from the dead bodily; (John 20:25-29, Luke 24:36-40)",
        "He ascended into heaven bodily, (1 Thess 4:16-17, Matt 24:29-30)",
      ],
    },
    {
      title: "The Rapture of the church and the Second Coming of Christ.",
      content: [
        "We believe in the Rapture of the church, and the Second Coming of Christ (1Thess 4:16-17; Mat 24:29-30).",
      ],
    },
    {
      title: "The repentence",
      content: [
        "We believe that the only means of being cleansed from sin is repentance and faith in the precious blood of Jesus Christ (Acts 3:19, Luk 24:47, Eph 1:7)",
      ],
    },
    {
      title: "The sanctifying power of the Holy Spirit.",
      content: [
        "We believe that regeneration by the power of the Holy Ghost through the Word of God is essential for personal salvation (Tit 2:5, Jn 3:3-5, Eph 5:27)",
      ],
    },
    {
      title: "Eternal life for the saved and eternal judgment for the lost.",
      content: [
        "We believe that the redemptive work of Christ on the cross provides divine healing for the body and salvation for the soul to everyone that believes (Acts3:16 Acts 9:32-35, 1 Pet 2:24).",
      ],
    },
    {
      title: "Empowered by the Holy Spirit.",
      content: [
        "We believe that when an individual receives the Holy Ghost, he receives divine enablement for Christian service and witness (Acts 1:8; 2:4; 3:1-26; 4:5-12)",
      ],
    },
    {
      title: "The Sanctifying Power of the Holy Spirit.",
      content: [
        "We believe in the sanctifying power of the Holy Ghost. (1 Cor 6:11; Rom 15:16)",
      ],
    },
    {
      title: "Eternal Life and Final Judgment",
      content: [
        "We believe in the final resurrection of both the saved and the lost. The former to eternal life and the later to eternal judgment (Rev 20:11-15, 1 Cor 12:23).",
      ],
    },
  ];

  const leaders = [
    {
      name: "Danielle Herbst",
      role: "Head of Administration",
      description:
        "I'm passionate about pursuing my purpose in Christ, spreading the gospel and medicine. I've been going to church since childhood but I joined this ministry in 2022, its been almost three years now.",
      image: danielle,
      imageAlt: "Danielle Herbst",
    },
    {
      name: "Angelina Basani Shilenge",
      role: "Fellowship Coordinator, Lighthouse\nHead of Foundation School",
      description:
        "My journey with Christ began in early 2023 when I made the life-changing decision to surrender my life to Him. Everything changed for the better, and my spiritual growth accelerated after joining BLW Lighthouse in May 2023. Since graduating from Foundation School that year, I've served actively in the ministry as a member of the Ushering Department, Cell Leader of Relentless Pursuit Cell (2024), Foundation School Officer, and Fellowship Coordinator for BLW Lighthouse Madeira. Driven by a growth mindset, I find great joy in seeing new converts mature into leaders. I've learned that investing in my spiritual development not only impacts those I lead but also helps others discover and pursue God's purpose for their lives.",
      image: angelina,
      imageAlt: "Angelina Basani Shilenge",
    },
    {
      name: "Pastor Khutsiso Malatji",
      role: "Assistant Group Pastor, Lighthouse\nFellowship Pastor, Lighthouse TUT GA",
      description:
        "I am Pastor Khutsiso Malatji, a dedicated member of the Believers Loveworld Campus Ministry and a passionate follower of Christ, I have been actively involved in ministry for 5 years, I joined the ministry in 2020. Throughout this time, I have had the privilege of serving in various capacities, including event coordination, being a cell leader, an usher, a chapter coordinator, a Zonal Finance officer, a Rhapsody officer, and community service initiatives. My journey in ministry has been a transformative experience, enriching my life and enabling me to impact others positively.\n\nWhat I Am Passionate About:\n• My passion lies in living a purposeful life\n• In leading people to deepen their relationship with God and to discover their purpose in Christ\n• Spreading the gospel all around the world through my partnership",
      image: khutsiso,
      imageAlt: "Pastor Khutsiso Malatji",
    },
    {
      name: "Mulamuleli Madele",
      role: "Fellowship Coordinator, Lighthouse SMU\nHead of Connect Groups",
      description:
        "I am a 20-year-old MBChB student at SMU in Ga-Rankuwa and the youngest of four siblings. I joined this ministry in 2023, and it has since been a life-transforming journey—deepening my understanding of God and my identity in Christ. I currently serve as the LH Group PFCC Officer, Program Coordinator, and SMU Chapter Coordinator. Passionate about soul winning, I'm driven by a strong desire to impact my community positively while continually growing and developing myself.",
      image: "",
      imageAlt: "Mulamuleli Madele",
    },
  ];

  const scope = useMotionTimeline([
    [
      [
        ".heading-1",
        { y: 0 },
        { duration: 1, ease: "easeInOut", type: spring, bounce: 0.5 },
      ],
      [
        ".heading-2",
        { y: 0 },
        {
          duration: 1,
          ease: "easeInOut",
          delay: 0.1,
          type: spring,
          bounce: 0.5,
        },
      ],
      [
        ".sub-heading",
        { opacity: 1 },
        { duration: 1, ease: "easeInOut", delay: 0.3 },
      ],
      [
        ".join-btn",
        { scale: 1, opacity: 1 },
        { duration: 0.8, ease: "easeInOut", delay: 0.2 },
      ],
    ],
    [
      [
        ".badge-1",
        { scale: 1 },
        {
          duration: 1,
          ease: "easeInOut",
          delay: 0.2,
          type: spring,
          bounce: 0.5,
        },
      ],
      [
        ".badge-2",
        { scale: 1 },
        {
          duration: 1,
          ease: "easeInOut",
          delay: 0.3,
          type: spring,
          bounce: 0.5,
        },
      ],
    ],
  ]);

  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const lineRef = useRef(null);

  const { scrollYProgress: yProgress1 } = useScroll({
    target: missionRef,
    offset: ["start end", "end center"],
  });

  const { scrollYProgress: yProgress2 } = useScroll({
    target: visionRef,
    offset: ["start end", "end center"],
  });

  const { scrollYProgress: lineProgress } = useScroll({
    target: lineRef,
    offset: ["start end", "end center"],
  });

  const imagePosition = useTransform(lineProgress, [0, 0.5], ["-150%", "0%"]);
  const imageOpacity = useTransform(lineProgress, [0, 0.5], [0, 1]);

  const position1 = useTransform(yProgress1, [0, 0.5], ["-150%", "0%"]);
  const posPosition1 = useTransform(yProgress1, [0, 0.5], ["150%", "0%"]);

  const position2 = useTransform(yProgress2, [0, 0.5], ["-150%", "0%"]);
  const posPosition2 = useTransform(yProgress2, [0, 0.5], ["150%", "0%"]);

  const opacity1 = useTransform(yProgress1, [0, 0.5], [0, 1]);
  const opacity2 = useTransform(yProgress2, [0, 0.5], [0, 1]);

  return (
    <section className="font-body pt-[100px]">
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${about.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        ref={scope}
        className="h-[80vh] w-full overflow-hidden relative"
      >
        <Image
          src={circle}
          alt="Circle yellow gradient"
          className="absolute bottom-0 left-0 w-full h-full z-[1]"
        />
        <div className="flex flex-col lg:items-start items-center justify-center gap-10 text-yellow-100 relative z-[2] h-full w-full lg:pl-10">
          <div className="flex flex-col md:text-left text-center gap-4">
            <div className="flex flex-col items-center justify-center">
              <div className="overflow-y-hidden flex">
                <motion.h1
                  initial={{ y: "100%" }}
                  className="heading-1 xl:text-9xl lg:text-8xl text-[56px] leading-none relative m-4 w-fit"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    className={`badge-1 w-fit p-2 bg-aero-600 text-deep-blue-600 absolute rounded-full block border-3 border-white z-[10] top-0 right-[15%] lg:right-0 -rotate-13`}
                  >
                    <HandHeart />
                  </motion.span>
                  <div className="relative inline-block w-fit mr-4 h-fit">
                    <motion.span
                      initial={{ scale: 0 }}
                      className={`badge-2 py-2 px-4 bg-orange-600 text-orange-200 text-base font-body !capitalize absolute rounded-full block border-3 border-white z-[10] -bottom-5 lg:bottom-0 -rotate-13 -left-3`}
                    >
                      <p className="font-semibold">Love</p>
                    </motion.span>
                    Living
                  </div>
                  the Vision,
                </motion.h1>
              </div>
              <div className="overflow-y-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  className="heading-2 xl:text-9xl lg:text-8xl text-[56px] leading-none relative lg:ml-4"
                >
                  Sharing the
                  <div className="relative inline-block mx-4 w-fit h-fit">
                    <p>Love</p>
                    <svg
                      width="152"
                      height="64"
                      viewBox="0 0 152 64"
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
                        d="M95.1702 5.30753C71.8544 4.20472 44.5539 2.08756 22.7567 8.85429C8.40181 13.3106 0.490983 22.4565 2.82574 32.2715C3.93603 36.939 6.46483 41.8057 12.136 45.1338C21.1441 50.42 34.2778 54.0334 45.5842 56.8851C66.3748 62.1289 89.2616 62.1578 110.618 58.1244C127.665 54.905 154.171 49.0204 148.687 34.579C143.577 21.1228 119.437 14.2601 100.55 10.0508C76.7418 4.74486 52.518 3.40239 27.5153 3"
                        stroke="#FFC855"
                        strokeWidth="4.42532"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </motion.h1>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              className="sub-heading lg:w-[50%] w-full ml-4 mb-4"
            >
              Discover a place where God’s presence transforms lives, and
              everyone belongs.
            </motion.p>
          </div>
          <MotionButton
            initial={{ scale: 0, opacity: 0 }}
            variant="secondary-juicy"
            className="join-btn ml-4 w-fit"
          >
            Join The Family
          </MotionButton>
        </div>
      </div>

      <div className="mb-100">
        {/* Mission/Vision Section */}
        <div className="px-8 lg:px-32 my-100 flex flex-col gap-14 relative overflow-x-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-16 h-max">
            <MotionImage
              style={{ x: position1, opacity: opacity1 }}
              ref={missionRef}
              src={mission}
              alt="Hand on the bible"
              className="rounded-xl h-[200px] lg:h-full lg:w-1/2 object-cover"
            />
            <motion.div
              style={{ x: posPosition1, opacity: opacity1 }}
              ref={missionRef}
              className="flex flex-col gap-4"
            >
              <div className="relative inline-block w-fit h-fit">
                <h1 className="text-[56px] leading-[72px]">MISSION</h1>
                <svg
                  className="absolute left-0 -bottom-1 w-full"
                  width="119"
                  height="13"
                  viewBox="0 0 119 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      delay: 0.7,
                    }}
                    d="M1.73944 8.84912C9.59305 8.84912 17.3869 7.91732 25.1483 6.78363C32.5318 5.70515 39.986 4.99725 47.4305 4.46779C53.9941 4.00098 60.4657 3.85806 67.0057 3.0908C73.5987 2.31731 80.2905 2.16401 86.9251 2.21453C91.5177 2.2495 95.9504 3.24781 100.492 3.79494C104.13 4.23327 107.728 4.96366 111.304 5.75089C112.956 6.1146 114.718 6.28537 116.343 6.73669C117.794 7.13995 113.637 6.8776 113.62 6.87752C106.317 6.84418 97.4776 5.22042 90.5866 8.56746C90.1857 8.76221 89.9667 8.84912 89.5226 8.84912C88.3605 8.84912 91.8291 9.20799 92.9338 9.56891C94.5208 10.0874 96.2673 10.4067 97.8941 10.7894C98.3569 10.8983 98.6925 10.665 98.9112 11.1024"
                    stroke="#FFC855"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-deep-blue-400 lg:w-[500px]">
                Empowering believers to live Spirit-filled lives, make disciples
                of all nations, and manifest the excellence of God in every area
                of life.
              </p>
            </motion.div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 h-max">
            <motion.div
              style={{ x: position2, opacity: opacity2 }}
              ref={visionRef}
              className="flex flex-col gap-4"
            >
              <h1 className="text-[56px] leading-[72px]">& VISION</h1>
              <p className="text-deep-blue-400 lg:w-[500px]">
                To take the divine presence of God to the people and nations of
                the world, demonstrating the character of the Spirit.
              </p>
            </motion.div>
            <MotionImage
              style={{ x: posPosition2, opacity: opacity2 }}
              ref={visionRef}
              src={vision}
              alt="Hand on the bible"
              className="rounded-xl h-[200px] lg:h-full lg:w-1/2 object-cover"
            />
          </div>
          <svg
            width="75"
            height="41"
            viewBox="0 0 75 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-10 left-4 lg:-bottom-5 lg:left-24 mb-6"
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.7 }}
              d="M4.77654 2C4.77654 6.56834 2 10.7918 2 15.3971C2 17.2474 4.53562 16.1023 5.87834 15.6697C10.0181 14.336 13.9193 12.4349 18.0863 11.1131C19.9364 10.5262 21.6327 9.65743 22.0307 11.6973C22.8858 16.0796 23.8591 20.5281 24.1241 24.9775C24.1848 25.9954 23.4031 30.3615 24.3004 31.2866C25.1135 32.1248 31.6345 23.599 32.2775 22.9524C33.8352 21.386 36.8979 17.7727 39.4832 17.7727C41.0305 17.7727 42.66 20.9764 43.2955 22.0372C45.3485 25.464 47.4145 28.3978 50.2588 31.4035C52.3408 33.6034 54.2989 36.8983 56.8256 38.7251C58.5509 39.9725 61.1721 36.6165 61.96 35.8042C64.9594 32.7119 68.8805 28.706 73 26.8858"
              stroke="#FFBA2A"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/*History Section */}
        <div className="flex flex-col items-center gap-28 mb-50">
          <div>
            <div className="overflow-y-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.2,
                  type: "spring",
                  bounce: 0.5,
                }}
                className="text-[40px] lg:text-[56px] m-2 leading-none text-center"
              >
                FROM A SMALL
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
                  type: "spring",
                  bounce: 0.5,
                }}
                className="text-[40px] lg:text-[56px] ml-2 mr-4 my-2 leading-none text-center relative"
              >
                BEGINNINGS TO A GLOBAL
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    delay: 0.7,
                    type: "spring",
                    bounce: 0.5,
                  }}
                  className={`w-fit p-2 bg-yellow-600 text-yellow-1000 absolute rounded-full block border-3 border-white z-[10] -bottom-2 right-2 -rotate-13`}
                >
                  <FlameIcon />
                </motion.span>
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
                  type: "spring",
                  bounce: 0.5,
                }}
                className="text-[40px] lg:text-[56px] m-2 leading-none text-center"
              >
                MOVEMENT OF FAITH
              </motion.h1>
            </div>
          </div>
          <div className="flex flex-col h-full items-center gap-8">
            <div className="lg:flex flex-col items-center gap-3 text-center hidden">
              <MotionBadge
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                variant="outline"
                className="w-fit"
              >
                2010
              </MotionBadge>
              <div className="overflow-y-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    delay: 0.6,
                    type: "spring",
                    bounce: 0.5,
                  }}
                  className="!font-body !capitalize font-bold"
                >
                  The Spark of Vision
                </motion.h1>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
                className="text-deep-blue-400 lg:w-[400px] w-full"
              >
                A small group of passionate believers came together with a
                shared dream: to spread the divine presence of God and
                demonstrate the character of the Spirit in their community.
              </motion.p>
            </div>
            <div className="flex flex-col gap-12 pl-10 pr-8 relative">
              <div className="flex items-center justify-center gap-16">
                <div className="lg:hidden flex-col gap-3 flex">
                  <MotionBadge
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                    variant="outline"
                    className="w-fit"
                  >
                    2010
                  </MotionBadge>
                  <div className="overflow-y-hidden">
                    <motion.h1
                      initial={{ y: "100%" }}
                      whileInView={{ y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: 0.6,
                        type: "spring",
                        bounce: 0.5,
                      }}
                      className="!font-body !capitalize font-bold"
                    >
                      The Spark of Vision
                    </motion.h1>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="text-deep-blue-400 lg:w-[400px] w-full"
                  >
                    A small group of passionate believers came together with a
                    shared dream: to spread the divine presence of God and
                    demonstrate the character of the Spirit in their community.
                  </motion.p>
                </div>
              </div>
              <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-6 lg:gap-16 lg:relative lg:h-[500px]">
                <MotionImage
                  ref={lineRef}
                  style={{ x: imagePosition, opacity: imageOpacity }}
                  src={about2}
                  alt="People on a couch praying with their eyes closed."
                  className="rounded-xl lg:w-[400px]"
                />
                <div className="rounded-full bg-orange-600 size-6 border-[5px] border-white hidden lg:block" />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center">
                    <div className="rounded-full bg-orange-600 size-6 border-[5px] border-white lg:hidden absolute left-2" />
                    <MotionBadge
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                      variant="outline"
                      className="w-fit"
                    >
                      2012
                    </MotionBadge>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="overflow-y-hidden">
                      <motion.h1
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                          delay: 0.6,
                          type: "spring",
                          bounce: 0.5,
                        }}
                        className="!font-body !capitalize font-bold"
                      >
                        First Fellowship Established
                      </motion.h1>
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                      className="text-deep-blue-400 lg:w-[400px] w-full"
                    >
                      The first Lighthouse Fellowship was launched, bringing
                      people together through worship, prayer, and service.
                    </motion.p>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col items-center absolute -z-[1]">
                  <div className="rounded-full bg-yellow-600 size-6 border-[5px] border-white" />
                  <svg
                    width="3"
                    height="503"
                    viewBox="0 0 3 503"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                        delay: 0.7,
                      }}
                      d="M1.5 1.5V501.5"
                      stroke="#011C31"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="lg:hidden flex flex-col items-center absolute -z-[1] left-2">
                <div className="rounded-full bg-yellow-600 size-6 border-[5px] border-white" />
                <svg
                  width="3"
                  height="503"
                  viewBox="0 0 3 503"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      delay: 0.7,
                    }}
                    d="M1.5 1.5V501.5"
                    stroke="#011C31"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="mb-100 relative flex flex-col gap-32">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px] text-center w-fit">
            A CULTURE
            <span className="relative block">
              ROOTED IN CHRIST
              <span className="bg-aero-600 rounded-full p-2 block w-fit h-fit absolute -top-5 left-12 -rotate-[9deg] border-3 border-background">
                <Trees className="text-deep-blue-600 size-6" />
              </span>
            </span>
          </h1>
          <p className="text-deep-blue-400 text-xl text-center">
            We are guided by these core values
          </p>
        </div>

        {/* Desktop hehe */}
        <div
          className="hidden lg:block h-screen w-full space-y-10"
          style={{
            backgroundImage: `url(${aboutValues.src})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        >
          <motion.div
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              delay: 0.1,
              type: "spring",
              bounce: 0.5,
            }}
            className="flex items-center justify-center gap-4"
          >
            <div className="w-[350px] border border-aero-200 rounded-2xl p-8 flex flex-col gap-6 bg-background -rotate-[7.11deg]">
              <div className="flex items-center gap-4">
                <span className="bg-aero-600 rounded-full p-2 block w-fit h-fit">
                  <HandHeart className="text-deep-blue-600 size-6 lg:size-8" />
                </span>
                <h2 className="!capitalize text-[48px]">Service</h2>
              </div>
              <p className="text-2xl text-deep-blue-400">
                Unconditional love, just as Christ first loved us.
              </p>
            </div>

            <div className="w-[350px] border border-aero-200 rounded-2xl p-8 flex flex-col gap-6 bg-background rotate-[7.11deg]">
              <div className="flex items-center gap-4">
                <span className="bg-orange-200 rounded-full p-2 block w-fit h-fit">
                  <HandHeart className="text-orange-600 size-6 lg:size-8" />
                </span>
                <h2 className="!capitalize text-[48px]">Love</h2>
              </div>
              <p className="text-2xl text-deep-blue-400">
                Unconditional love, just as Christ first loved us.
              </p>
            </div>

            <div className="w-[350px] border border-aero-200 rounded-2xl p-8 flex flex-col gap-6 bg-background -rotate-[7.11deg]">
              <div className="flex items-center gap-4">
                <span className="bg-yellow-200 rounded-full p-2 block w-fit h-fit">
                  <HandHeart className="text-yellow-1000 size-6 lg:size-8" />
                </span>
                <h2 className="!capitalize text-[48px]">Worship</h2>
              </div>
              <p className="text-2xl text-deep-blue-400">
                Unconditional love, just as Christ first loved us.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              delay: 0.2,
              type: "spring",
              bounce: 0.5,
            }}
            className="flex items-center justify-center gap-4"
          >
            <div className="w-[350px] border border-aero-200 rounded-2xl p-8 flex flex-col gap-6 bg-background -rotate-[7.11deg]">
              <div className="flex items-center gap-4">
                <span className="bg-deep-blue-600 rounded-full p-2 block w-fit h-fit">
                  <BookOpen className="text-aero-600 size-6 lg:size-8" />
                </span>
                <h2 className="!capitalize text-[48px]">Prayer</h2>
              </div>
              <p className="text-2xl text-deep-blue-400">
                Unconditional love, just as Christ first loved us.
              </p>
            </div>

            <div className="w-[350px] border border-aero-200 rounded-2xl p-8 flex flex-col gap-6 bg-background rotate-[7.11deg]">
              <div className="flex items-center gap-4">
                <span className="bg-yellow-600 rounded-full p-2 block w-fit h-fit">
                  <HandCoins className="text-yellow-1000 size-6 lg:size-8" />
                </span>
                <h2 className="!capitalize text-[48px]">Giving</h2>
              </div>
              <p className="text-2xl text-deep-blue-400">
                Unconditional love, just as Christ first loved us.
              </p>
            </div>

            <div className="w-[350px] border border-aero-200 rounded-2xl p-8 flex flex-col gap-6 bg-background -rotate-[7.11deg]">
              <div className="flex items-center gap-4">
                <span className="bg-orange-600 rounded-full p-2 block w-fit h-fit">
                  <HandHeart className="text-orange-200 size-6 lg:size-8" />
                </span>
                <h2 className="!capitalize text-[48px]">Excellence</h2>
              </div>
              <p className="text-2xl text-deep-blue-400">
                Unconditional love, just as Christ first loved us.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile */}
        <div
          className="lg:hidden flex flex-col w-full gap-10"
          style={{
            backgroundImage: `url(${aboutValuesMobile.src})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        >
          <motion.div className="flex flex-col items-center justify-center gap-4">
            <div className="w-[350px] border border-aero-200 rounded-2xl p-8 flex flex-col gap-6 bg-background -rotate-[7.11deg]">
              <div className="flex items-center gap-4">
                <span className="bg-aero-600 rounded-full p-2 block w-fit h-fit">
                  <HandHeart className="text-deep-blue-600 size-6 lg:size-8" />
                </span>
                <h2 className="!capitalize text-[48px]">Service</h2>
              </div>
              <p className="text-2xl text-deep-blue-400">
                Unconditional love, just as Christ first loved us.
              </p>
            </div>

            <div className="w-[350px] border border-aero-200 rounded-2xl p-8 flex flex-col gap-6 bg-background rotate-[7.11deg]">
              <div className="flex items-center gap-4">
                <span className="bg-orange-200 rounded-full p-2 block w-fit h-fit">
                  <HandHeart className="text-orange-600 size-6 lg:size-8" />
                </span>
                <h2 className="!capitalize text-[48px]">Love</h2>
              </div>
              <p className="text-2xl text-deep-blue-400">
                Unconditional love, just as Christ first loved us.
              </p>
            </div>

            <div className="w-[350px] border border-aero-200 rounded-2xl p-8 flex flex-col gap-6 bg-background -rotate-[7.11deg]">
              <div className="flex items-center gap-4">
                <span className="bg-yellow-200 rounded-full p-2 block w-fit h-fit">
                  <HandHeart className="text-yellow-1000 size-6 lg:size-8" />
                </span>
                <h2 className="!capitalize text-[48px]">Worship</h2>
              </div>
              <p className="text-2xl text-deep-blue-400">
                Unconditional love, just as Christ first loved us.
              </p>
            </div>
          </motion.div>
          <motion.div className="flex flex-col items-center justify-center gap-4">
            <div className="w-[350px] border border-aero-200 rounded-2xl p-8 flex flex-col gap-6 bg-background -rotate-[7.11deg]">
              <div className="flex items-center gap-4">
                <span className="bg-deep-blue-600 rounded-full p-2 block w-fit h-fit">
                  <BookOpen className="text-aero-600 size-6 lg:size-8" />
                </span>
                <h2 className="!capitalize text-[48px]">Prayer</h2>
              </div>
              <p className="text-2xl text-deep-blue-400">
                Unconditional love, just as Christ first loved us.
              </p>
            </div>

            <div className="w-[350px] border border-aero-200 rounded-2xl p-8 flex flex-col gap-6 bg-background rotate-[7.11deg]">
              <div className="flex items-center gap-4">
                <span className="bg-yellow-600 rounded-full p-2 block w-fit h-fit">
                  <HandCoins className="text-yellow-1000 size-6 lg:size-8" />
                </span>
                <h2 className="!capitalize text-[48px]">Giving</h2>
              </div>
              <p className="text-2xl text-deep-blue-400">
                Unconditional love, just as Christ first loved us.
              </p>
            </div>

            <div className="w-[350px] border border-aero-200 rounded-2xl p-8 flex flex-col gap-6 bg-background -rotate-[7.11deg]">
              <div className="flex items-center gap-4">
                <span className="bg-orange-600 rounded-full p-2 block w-fit h-fit">
                  <HandHeart className="text-orange-200 size-6 lg:size-8" />
                </span>
                <h2 className="!capitalize text-[48px]">Excellence</h2>
              </div>
              <p className="text-2xl text-deep-blue-400">
                Unconditional love, just as Christ first loved us.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Statements of Faith Section */}
      <div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-8 mb-10 lg:mb-50">
          <div className="flex flex-col">
            <div className="overflow-y-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  delay: 0.1,
                  type: "spring",
                  bounce: 0.5,
                }}
                className="whitespace-nowrap text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px] relative mt-4 ml-4"
              >
                <span className="-left-2 -rotate-[9deg] -top-3 font-body text-base font-bold leading-none absolute block bg-yellow-600 text-yellow-1000 rounded-full p-2 border-3 border-background">
                  10
                </span>
                Grounded in Faith,
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
                  delay: 0.1,
                  type: "spring",
                  bounce: 0.5,
                }}
                className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px] relative ml-4"
              >
                Guided by truth
              </motion.h1>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.7 }}
            className="text-deep-blue-400 text-xl lg:w-[40%] ml-4"
          >
            Our Statements of Faith have their source in the Bible and are in
            total alignment with the the doctrines of Christ.
          </motion.p>
        </div>

        <div className="flex flex-col w-full mb-100 border-b border-aero-200">
          {campus.map((item, index) => (
            <Accordion type="single" key={index} collapsible className="w-full">
              <AccordionItem value="item">
                <AccordionTrigger>
                  <div className="flex items-center gap-4 lg:gap-8 font-body font-normal">
                    <p className="text-xl lg:text-3xl">
                      {index + 1 > 9 ? "" : "0"}
                      {index + 1}
                    </p>
                    <p className="text-xl lg:text-3xl">{item.title}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {item.content.map((stuff, idx) => (
                    <div key={idx} className="flex items-center gap-8">
                      <Asterisk className="size-4 lg:size-6 text-aero-600 shrink-0" />
                      <p>{stuff}</p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>

      {/* Meet the Team Section */}
      <TeamLeadersGrid
        leaders={leaders}
        title="Meet the Leaders"
        subtitle="Passionate leaders who guide our mission with wisdom and dedication"
      />
    </section>
  );
}
