"use client";

import React from "react";
import { motion } from "framer-motion";
import TeamLeaderCard from "./team-leader-card";
import { StaticImageData } from "next/image";
import { Flame } from "lucide-react";

interface TeamLeader {
  name: string;
  role: string;
  description: string;
  image?: string | StaticImageData;
  imageAlt?: string;
}

interface TeamLeadersGridProps {
  leaders: TeamLeader[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const TeamLeadersGrid: React.FC<TeamLeadersGridProps> = ({
  leaders,
  title = "Meet Our Team Leaders",
  subtitle = "Passionate leaders who guide our community with wisdom and dedication",
  className = "",
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const subtitleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  return (
    <section className={`py-16 lg:py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={headerVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              variants={subtitleVariants}
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Grid */}
        <motion.div
          className="space-y-8 lg:space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {leaders.map((leader, index) => (
            <div
              key={`${leader.name}-${index}`}
              className={`max-w-4xl mx-auto ${index % 2 === 0 ? "lg:mr-auto lg:ml-0" : "lg:ml-auto lg:mr-0"
                }`}
            >
              <TeamLeaderCard
                name={leader.name}
                role={leader.role}
                description={leader.description}
                image={leader.image}
                imageAlt={leader.imageAlt}
                index={index}
              />
            </div>
          ))}
        </motion.div>

        {/* Empty State */}
        {leaders.length === 0 && (
          <motion.div
            className="text-center py-16 lg:py-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-gray-400 mb-6">
              <svg
                className="mx-auto h-16 w-16 lg:h-20 lg:w-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
              No Team Leaders Added Yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Team leader profiles will appear here once they're added to the
              system.
            </p>
          </motion.div>
        )}

        {/* Stats or additional info */}
        {leaders.length > 0 && (
          <motion.div
            className="mt-16 lg:mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="inline-flex gap-2 items-center justify-center px-6 py-3 bg-orange-500 rounded-full">
              <Flame className="text-orange-100" />
              <span className="text-sm font-medium text-orange-100">
                {leaders.length} dedicated{" "}
                {leaders.length === 1 ? "leader" : "leaders"} serving our
                community
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TeamLeadersGrid;
