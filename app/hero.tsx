import { useMotionTimeline } from "@/hooks/useMotionTimeline";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeartHandshakeIcon } from "lucide-react";
import Link from "next/link";

const MotionBadge = motion.create(Badge);

export const Hero = () => {
  const scope = useMotionTimeline([
    [
      [
        "[data-animate='heading1']",
        { y: 0 },
        {
          duration: 1,
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
          duration: 1,
          ease: "easeInOut",
          delay: 0.1,
          type: "spring",
          damping: 10,
          stiffness: 100,
        },
      ],
      [
        "[data-animate='plan-btn']",
        { scale: 1, opacity: 1 },
        { duration: 0.8, ease: "easeInOut", delay: 0.2 },
      ],
      [
        "[data-animate='sub-heading']",
        { opacity: 1 },
        { duration: 1, ease: "easeInOut", delay: 0.3 },
      ],
    ],
    [
      [
        "[data-animate='welcome-badge']",
        { scale: 1, opacity: 1, rotate: -12 },
        { duration: 0.8, ease: "easeInOut" },
      ],
      [
        "[data-animate='path1']",
        { pathLength: 1, opacity: 1 },
        { duration: 0.8, ease: "easeInOut" },
      ],
    ],
  ]);

  return (
    <div
      ref={scope}
      className="flex flex-col items-center gap-8 lg:gap-16 lg:h-screen z-[2] relative"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="overflow-y-hidden">
          <motion.h1
            data-animate="heading1"
            initial={{ y: "100%" }}
            className="xl:text-9xl lg:text-8xl text-6xl text-center leading-[72px] lg:leading-[120px] xl:leading-[144px]"
          >
            <span className="relative inline-block mr-5 w-fit h-fit mt-6 ml-6">
              <MotionBadge
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                variant="header"
                data-animate="welcome-badge"
                className="absolute capitalize transform -left-5 -top-5 lg:top-2 mt-4"
              >
                <HeartHandshakeIcon />
                Welcome Home
              </MotionBadge>
              Where
            </span>
            Faith, Love, &
          </motion.h1>
        </div>
        <div className="overflow-y-hidden">
          <motion.h1
            data-animate="heading2"
            initial={{ y: "100%" }}
            className="xl:text-9xl lg:text-8xl text-6xl text-center"
          >
            Community
            <span className="relative inline-block m-4 w-fit h-fit">
              Flourish
              <svg
                width="435"
                height="144"
                viewBox="0 0 435 144"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 -bottom-2 h-full w-full"
              >
                <motion.path
                  data-animate="path1"
                  initial={{ pathLength: 0, opacity: 0 }}
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
          data-animate="sub-heading"
          initial={{ opacity: 0 }}
          className="text-deep-blue-400 xl:w-[50%] lg:w-[60%] w-[80%] text-center text-xl"
        >
          Discover a place where God&apos;s presence transforms lives, and
          everyone belongs.
        </motion.p>
      </div>
      <motion.div data-animate="plan-btn" initial={{ scale: 0, opacity: 0 }}>
        <Button asChild>
          <Link href="/contact">Plan Your Visit</Link>
        </Button>
      </motion.div>
    </div>
  );
};
