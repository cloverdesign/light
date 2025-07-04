"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, MapPin, Calendar, Asterisk } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";

interface TeamLeaderCardProps {
  name: string;
  role: string; // Will be split by \n for multiple roles
  description: string;
  image?: string | StaticImageData;
  imageAlt?: string;
  index: number;
}

const TeamLeaderCard: React.FC<TeamLeaderCardProps> = ({
  name,
  role,
  description,
  image,
  imageAlt,
  index,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Split roles by newlines and clean them up
  const roles = role
    .split("\n")
    .map((r) => r.trim())
    .filter((r) => r.length > 0);

  // Function to get role colors based on role content
  const getRoleColors = (role: string, fallbackIndex: number = 0) => {
    const roleLower = role.toLowerCase();

    // Pastor/Leadership roles - Deep blue theme
    if (roleLower.includes("pastor") || roleLower.includes("leader")) {
      return {
        bg: "bg-deep-blue-500",
        text: "text-aero-100",
      };
    }

    // Head/Director roles - Aero theme
    if (roleLower.includes("head") || roleLower.includes("director")) {
      return {
        bg: "bg-aero-500",
        text: "text-deep-blue-600",
      };
    }

    // Coordinator roles - Yellow theme
    if (roleLower.includes("coordinator")) {
      return {
        bg: "bg-yellow-500",
        text: "text-yellow-900",
      };
    }

    // Officer roles - Deep blue theme
    if (roleLower.includes("officer")) {
      return { bg: "bg-deep-blue-500", text: "text-aero-100" };
    }

    // Foundation/School roles - Aero theme
    if (roleLower.includes("foundation") || roleLower.includes("school")) {
      return {
        bg: "bg-aero-500",
        text: "text-deep-blue-600",
      };
    }

    // Group/Team roles - Yellow theme
    if (roleLower.includes("group") || roleLower.includes("team")) {
      return {
        bg: "bg-yellow-500",
        text: "text-yellow-900",
      };
    }

    // Assistant roles - Aero theme
    if (roleLower.includes("assistant")) {
      return {
        bg: "bg-aero-500",
        text: "text-deep-blue-600",
      };
    }

    // Fellowship roles - Deep blue theme
    if (roleLower.includes("fellowship")) {
      return {
        bg: "bg-deep-blue-500",
        text: "text-aero-100",
      };
    }

    // Default colors based on index
    const defaultColors = [
      { bg: "bg-yellow-500", text: "text-yellow-900" },
      { bg: "bg-aero-500", text: "text-deep-blue-600" },
      { bg: "bg-deep-blue-500", text: "text-aero-100" },
    ];
    return defaultColors[fallbackIndex % defaultColors.length];
  };

  // Function to get modal role colors based on role content
  const getModalRoleColors = (role: string, fallbackIndex: number = 0) => {
    const roleLower = role.toLowerCase();

    // Pastor/Leadership roles
    if (roleLower.includes("pastor") || roleLower.includes("leader")) {
      return {
        bg: "bg-deep-blue-100",
        text: "text-deep-blue-800",
        border: "border-deep-blue-200",
      };
    }

    // Head/Director roles
    if (roleLower.includes("head") || roleLower.includes("director")) {
      return {
        bg: "bg-aero-100",
        text: "text-aero-800",
        border: "border-aero-200",
      };
    }

    // Coordinator roles
    if (roleLower.includes("coordinator")) {
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
      };
    }

    // Officer roles
    if (roleLower.includes("officer")) {
      return {
        bg: "bg-deep-blue-100",
        text: "text-deep-blue-800",
        border: "border-deep-blue-200",
      };
    }

    // Foundation/School roles
    if (roleLower.includes("foundation") || roleLower.includes("school")) {
      return {
        bg: "bg-aero-100",
        text: "text-aero-800",
        border: "border-aero-200",
      };
    }

    // Group/Team roles
    if (roleLower.includes("group") || roleLower.includes("team")) {
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
      };
    }

    // Assistant roles
    if (roleLower.includes("assistant")) {
      return {
        bg: "bg-aero-100",
        text: "text-aero-800",
        border: "border-aero-200",
      };
    }

    // Fellowship roles
    if (roleLower.includes("fellowship")) {
      return {
        bg: "bg-deep-blue-100",
        text: "text-deep-blue-800",
        border: "border-deep-blue-200",
      };
    }

    // Default colors based on index
    const defaultColors = [
      {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
      },
      {
        bg: "bg-aero-100",
        text: "text-aero-800",
        border: "border-aero-200",
      },
      {
        bg: "bg-deep-blue-100",
        text: "text-deep-blue-800",
        border: "border-deep-blue-200",
      },
    ];
    return defaultColors[fallbackIndex % defaultColors.length];
  };

  // Truncate description for card preview
  const truncatedDescription =
    description.length > 120
      ? description.substring(0, 120) + "..."
      : description;

  const shouldShowReadMore = description.length > 120;

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        className="group bg-white text-deep-blue-600 rounded-xl border border-aero-200 overflow-hidden hover:rotate-[3deg] transition-all duration-300 hover:-translate-y-1 relative"
      >
        {/* Sticky Note Image */}
        {image && (
          <div className="absolute -top-2 -right-2 z-[2] transform rotate-12 group-hover:rotate-6 transition-transform duration-300">
            <div className="relative w-20 h-20 sm:w-42 sm:h-42 bg-yellow-400 rounded-lg border-2 border-yellow-300 p-1">
              <div className="relative w-full h-full rounded-md overflow-hidden">
                <Image
                  src={image}
                  alt={imageAlt || name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 80px, 96px"
                />
              </div>
              {/* Sticky note tape effect */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-yellow-200 rounded-sm opacity-70"></div>
            </div>
          </div>
        )}

        {/* Placeholder sticky note for no image */}
        {!image && (
          <div className="absolute -top-2 -right-2 z-[2] transform rotate-12 group-hover:rotate-6 transition-transform duration-300">
            <div className="relative w-20 h-20 sm:w-42 sm:h-42 bg-yellow-400 rounded-lg border-2 border-yellow-300 p-1">
              <div className="relative w-full h-full rounded-md overflow-hidden bg-yellow-500 flex items-center justify-center">
                <Asterisk className="w-6 h-6 text-yellow-900" />
              </div>
              {/* Sticky note tape effect */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-yellow-200 rounded-sm opacity-70"></div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-6 pr-16 sm:pr-20 flex flex-col justify-between min-h-48">
          {/* Header */}
          <div className="flex-1">
            <p className="text-lg lg:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {name}
            </p>

            {/* Roles */}
            <div className="flex flex-wrap gap-2 mb-4">
              {roles.map((singleRole, roleIndex) => {
                const colors = getRoleColors(singleRole, roleIndex);
                return (
                  <span
                    key={roleIndex}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs lg:text-sm font-medium ${colors.bg} ${colors.text} transition-colors transform hover:scale-105`}
                  >
                    {singleRole}
                  </span>
                );
              })}
            </div>

            {/* Description Preview */}
            <p className="text-gray-600 leading-relaxed text-sm mb-4 line-clamp-3 w-4/5">
              {truncatedDescription}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4">
            {shouldShowReadMore && (
              <Button onClick={() => setIsModalOpen(true)} className="w-fit">
                Read More
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                <div className="flex-1 pr-4">
                  <p className="text-2xl font-bold text-gray-900 mb-3">
                    {name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((singleRole, roleIndex) => {
                      const colors = getModalRoleColors(singleRole, roleIndex);
                      return (
                        <span
                          key={roleIndex}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text} border ${colors.border}`}
                        >
                          {singleRole}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <Button onClick={() => setIsModalOpen(false)} size="xs">
                  <X />
                </Button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image in modal - styled as sticky note */}
                  {image && (
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                      <div className="relative transform rotate-3 hover:rotate-1 transition-transform duration-300">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 bg-yellow-400 rounded-lg shadow-lg border-2 border-yellow-300 p-2">
                          <div className="relative w-full h-full rounded-md overflow-hidden">
                            <Image
                              src={image}
                              alt={imageAlt || name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 128px, 160px"
                            />
                          </div>
                          {/* Sticky note tape effect */}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-5 bg-yellow-200 rounded-sm opacity-70"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Full description */}
                  <div className="flex-1">
                    <div className="prose prose-gray max-w-none">
                      {description.split("\n").map(
                        (paragraph, index) =>
                          paragraph.trim() && (
                            <p
                              key={index}
                              className="mb-4 text-gray-700 leading-relaxed"
                            >
                              {paragraph.trim()}
                            </p>
                          ),
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
                <Button onClick={() => setIsModalOpen(false)} variant="outline">
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TeamLeaderCard;
