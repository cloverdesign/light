"use client";

import CircleBadge from "@/components/ui/circle-badge";
import involved1 from "@/assets/images/involved1.png";
import involved2 from "@/assets/images/involved2.png";
import involved3 from "@/assets/images/involved3.png";
import grow from "@/assets/images/grow.png";
import grow2 from "@/assets/images/grow2.png";
import gift from "@/assets/images/gift.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDown, BookHeart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import { useMotionTimeline } from "@/hooks/useMotionTimeline";
import { motion, useInView } from "motion/react";

export default function Involved() {
  const badgeContainerRef = useRef<HTMLDivElement | null>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const giftRef = useRef<HTMLDivElement>(null);
  const isCommunityInView = useInView(communityRef, {
    once: true,
    amount: 0.3,
  });
  const isGiftInView = useInView(giftRef, { once: true, amount: 0.3 });

  const scope = useMotionTimeline([
    [
      [
        [
          "[data-animate='badge1']",
          { scale: 1 },
          {
            duration: 0.2,
            ease: "easeInOut",
            type: "spring",
            damping: 10,
            stiffness: 100,
          },
        ],
        [
          "[data-animate='badge2']",
          { scale: 1 },
          {
            duration: 0.2,
            ease: "easeInOut",
            type: "spring",
            damping: 10,
            stiffness: 100,
          },
        ],
        [
          "[data-animate='image1']",
          { scale: 1 },
          {
            duration: 0.2,
            ease: "easeInOut",
            type: "spring",
            damping: 10,
            stiffness: 100,
          },
        ],
      ],
      [
        [
          "[data-animate='badge3']",
          { scale: 1 },
          {
            duration: 0.2,
            ease: "easeInOut",
            type: "spring",
            damping: 10,
            stiffness: 100,
          },
        ],
        [
          "[data-animate='image2']",
          { scale: 1 },
          {
            duration: 0.2,
            ease: "easeInOut",
            type: "spring",
            damping: 10,
            stiffness: 100,
          },
        ],
        [
          "[data-animate='badge4']",
          { scale: 1 },
          {
            duration: 0.2,
            ease: "easeInOut",
            type: "spring",
            damping: 10,
            stiffness: 100,
          },
        ],
      ],
      [
        [
          "[data-animate='image3']",
          { scale: 1 },
          {
            duration: 0.2,
            ease: "easeInOut",
            type: "spring",
            damping: 10,
            stiffness: 100,
          },
        ],
        [
          "[data-animate='badge5']",
          { scale: 1 },
          {
            duration: 0.2,
            ease: "easeInOut",
            type: "spring",
            damping: 10,
            stiffness: 100,
          },
        ],
        [
          "[data-animate='badge6']",
          { scale: 1 },
          {
            duration: 0.2,
            ease: "easeInOut",
            type: "spring",
            damping: 10,
            stiffness: 100,
          },
        ],
      ],
    ],
    [
      [
        "[data-animate='heading1']",
        { y: 0 },
        {
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          damping: 10,
          stiffness: 100,
        },
      ],
      [
        "[data-animate='heading2']",
        { y: 0 },
        {
          duration: 0.5,
          ease: "easeInOut",
          delay: 0.1,
          type: "spring",
          damping: 10,
          stiffness: 100,
        },
      ],
      [
        "[data-animate='sub']",
        { opacity: 1 },
        {
          duration: 0.5,
          ease: "easeInOut",
          delay: 0.2,
        },
      ],
      [
        "[data-animate='btn']",
        { scale: 1 },
        {
          duration: 0.5,
          ease: "easeInOut",
          delay: 0.1,
          type: "spring",
          damping: 10,
          stiffness: 50,
        },
      ],
    ],
  ]);
  return (
    <section className="font-body" ref={scope}>
      <div className="bg-yellow-100 py-[130px] flex flex-col lg:flex-row items-center justify-center px-8 lg:px-32 gap-28 mb-50">
        <div className="grid grid-cols-3 lg:gap-8 gap-4 lg:w-1/3">
          <motion.div data-animate="badge1" initial={{ scale: 0 }}>
            <CircleBadge
              drag={false}
              icon={{ name: "users-round", size: "w-full h-full" }}
              className="bg-aero-600 text-aero-1100 !w-full p-6 lg:p-8"
            />
          </motion.div>
          <motion.div data-animate="badge2" initial={{ scale: 0 }}>
            <CircleBadge
              drag={false}
              icon={{ name: "heart-handshake", size: "w-full h-full" }}
              className="bg-yellow-200 text-yellow-700 !w-full p-6 lg:p-8"
            />
          </motion.div>
          <motion.div data-animate="image1" initial={{ scale: 0 }}>
            <Image
              src={involved1}
              alt="Black woman smiling wide"
              className="rounded-full w-full h-fit object-cover"
            />
          </motion.div>
          <motion.div data-animate="badge3" initial={{ scale: 0 }}>
            <CircleBadge
              drag={false}
              icon={{ name: "book-heart", size: "w-full h-full" }}
              className="bg-orange-600 text-orange-100 !w-full p-6 lg:p-8"
            />
          </motion.div>
          <motion.div data-animate="image2" initial={{ scale: 0 }}>
            <Image
              src={involved2}
              alt="Black man smiling wide"
              className="rounded-full w-full h-fit"
            />
          </motion.div>
          <motion.div data-animate="badge4" initial={{ scale: 0 }}>
            <CircleBadge
              drag={false}
              icon={{ name: "hand-helping", size: "w-full h-full" }}
              className="bg-aero-200 text-deep-blue-1000 !w-full p-6 lg:p-8"
            />
          </motion.div>
          <motion.div data-animate="image3" initial={{ scale: 0 }}>
            <Image
              src={involved3}
              alt="Black man smiling wide"
              className="rounded-full w-full h-fit"
            />
          </motion.div>
          <motion.div data-animate="badge5" initial={{ scale: 0 }}>
            <CircleBadge
              drag={false}
              icon={{ name: "asterisk", size: "w-full h-full" }}
              className="bg-orange-200 text-orange-600 !w-full p-6 lg:p-8"
            />
          </motion.div>
          <motion.div data-animate="badge6" initial={{ scale: 0 }}>
            <CircleBadge
              drag={false}
              icon={{ name: "blocks", size: "w-full h-full" }}
              className="bg-yellow-600 text-yellow-1000 !w-full p-6 lg:p-8"
            />
          </motion.div>
        </div>
        <div className="flex flex-col gap-16 lg:w-[40%]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <div className="overflow-y-hidden">
                <motion.h1
                  data-animate="heading1"
                  initial={{ y: 100 }}
                  className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px] lg:w-[70%] text-center lg:text-left"
                >
                  TAKE YOUR
                </motion.h1>
              </div>
              <div className="overflow-y-hidden">
                <motion.h1
                  data-animate="heading1"
                  initial={{ y: 100 }}
                  className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px] lg:w-[70%] text-center lg:text-left"
                >
                  NEXT STEPS
                </motion.h1>
              </div>
            </div>
            <motion.p
              data-animate="sub"
              initial={{ opacity: 0 }}
              className="text-deep-blue-400 text-center lg:text-left"
            >
              At BLW Lighthouse, we believe everyone has unique gifts to share.
              That’s why we provide diverse ministries and programs to help you
              deepen your faith and discover new opportunities to thrive.
            </motion.p>
          </div>

          <motion.div
            data-animate="btn"
            initial={{ scale: 0 }}
            className="flex items-center justify-center lg:justify-start gap-6 cursor-pointer"
            onClick={() => {
              communityRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
            <Button className="w-fit px-4 pb-4 pt-3">
              <ArrowDown />
            </Button>
            <p className="text-deep-blue-400 text-sm">Learn More</p>
          </motion.div>
        </div>
      </div>
      <motion.div
        ref={communityRef}
        initial={{ opacity: 0, y: 50 }}
        animate={
          isCommunityInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-8 mb-50 px-8 lg:px-32"
      >
        <h1 className="text-[40px] leading-[48px] w-fit lg:text-[56px] lg:leading-[72px] text-center lg:text-left relative">
          Find A Community
          <Badge
            variant="header"
            className="absolute capitalize transform rotate-[7deg] right-0 lg:-right-5 -top-5"
          >
            <BookHeart />
            Grow Spiritually
          </Badge>
        </h1>

        <div
          style={{
            backgroundImage: `url(${grow.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="rounded-2xl h-[142px] lg:h-[400px] w-full overflow-hidden"
        >
          <Image src={grow2} alt="gradient" className="w-full h-full" />
        </div>

        <p className="text-deep-blue-400 lg:w-[50%] text-center">
          Our Cell Groups are a great way to stay connected with your
          churchfamily for a weekly time of study. Grow spiritually as part of a
          <div className="relative inline-block w-fit h-fit ml-2">
            connect group.
            <svg
              width="126"
              height="39"
              viewBox="0 0 126 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 -bottom-2 w-[105%]"
            >
              <path
                d="M78.8447 4.31291C59.6528 3.68544 37.1809 2.48086 19.239 6.33089C7.42306 8.86639 0.91143 14.0701 2.83324 19.6545C3.74715 22.3101 5.82867 25.0791 10.4968 26.9727C17.9116 29.9804 28.7223 32.0363 38.029 33.6588C55.1423 36.6423 73.9812 36.6588 91.5606 34.3639C105.592 32.5321 127.41 29.184 122.896 20.9674C118.69 13.3113 98.819 9.40659 83.2725 7.01166C63.6757 3.99277 43.7364 3.22895 23.1559 3"
                stroke="#FFC855"
                strokeWidth="4.42532"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </p>

        <Button variant="secondary-juicy">Join a Group</Button>
      </motion.div>

      <motion.div
        ref={giftRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isGiftInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          backgroundImage: `url(${gift.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="mb-50 flex flex-col lg:flex-row items-center justify-center lg:h-[50vh] p-8 xl:px-32 gap-20 lg:gap-8 h-[700px]"
      >
        <div
          className="relative mx-auto lg:w-1/2 w-full h-1/2 lg:h-full"
          ref={badgeContainerRef}
        >
          <CircleBadge
            drag
            ref={badgeContainerRef}
            icon={{
              name: "heart-handshake",
              size: "lg:size-[88px] size-[65px]",
            }}
            className="bg-yellow-200 text-yellow-700 lg:p-8 p-5 shadow-md absolute top-10 left-[5px] md:left-[3%] -rotate-[9deg] will-change-transform rounded-full cursor-grab active:cursor-grabbing"
          />
          <CircleBadge
            drag
            ref={badgeContainerRef}
            icon={{
              name: "message-circle-heart",
              size: "lg:size-[88px] size-[65px]",
            }}
            className="bg-orange-600 text-orange-200 lg:p-8 p-5 shadow-md absolute top-0 right-[45%] -rotate-[9deg] will-change-transform rounded-full cursor-grab active:cursor-grabbing"
          />
          <CircleBadge
            drag
            ref={badgeContainerRef}
            icon={{ name: "hand-heart", size: "lg:size-[88px] size-[65px]" }}
            className="bg-aero-600 text-aero-100 lg:p-8 p-5 shadow-md absolute bottom-4 right-[40%] rotate-[5deg] will-change-transform rounded-full cursor-grab active:cursor-grabbing"
          />
        </div>
        <div className="lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start gap-11 h-1/2 lg:h-full">
          <h1 className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px]">
            USE YOUR GIFTS TO SERVE & MAKE
            <div className="relative inline-block w-fit h-fit ml-2">
              <h1 className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px]">
                A DIFFERENCE.
              </h1>
              <svg
                className="absolute left-0 -bottom-1 w-full"
                width="119"
                height="13"
                viewBox="0 0 119 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.73944 8.84912C9.59305 8.84912 17.3869 7.91732 25.1483 6.78363C32.5318 5.70515 39.986 4.99725 47.4305 4.46779C53.9941 4.00098 60.4657 3.85806 67.0057 3.0908C73.5987 2.31731 80.2905 2.16401 86.9251 2.21453C91.5177 2.2495 95.9504 3.24781 100.492 3.79494C104.13 4.23327 107.728 4.96366 111.304 5.75089C112.956 6.1146 114.718 6.28537 116.343 6.73669C117.794 7.13995 113.637 6.8776 113.62 6.87752C106.317 6.84418 97.4776 5.22042 90.5866 8.56746C90.1857 8.76221 89.9667 8.84912 89.5226 8.84912C88.3605 8.84912 91.8291 9.20799 92.9338 9.56891C94.5208 10.0874 96.2673 10.4067 97.8941 10.7894C98.3569 10.8983 98.6925 10.665 98.9112 11.1024"
                  stroke="#FFC855"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </h1>
          <p className="text-deep-blue-400">
            God made each of us to serve in different ways, and there are plenty
            of opportunities to participate here at Lighthouse.
          </p>
          <Button className="w-fit">Join a Team</Button>
        </div>
      </motion.div>
    </section>
  );
}
