"use client";

import React from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function FoundationSchool() {
  const classes = [
    {
      id: "class-1",
      title: "The New Creature",
      content:
        "Understanding your identity in Christ and what it means to be born again. Discover your new nature and how to live in this reality.",
      number: 1,
    },
    {
      id: "class-2",
      title: "The Holy Spirit",
      content:
        "Learn who the Holy Spirit is, how to receive Him, and how to function with Him daily. Essential for every Christian's life.",
      number: 2,
    },
    {
      id: "class-3",
      title: "Christian Doctrines",
      content:
        "Establish foundational doctrines every Christian must know. Core spiritual truths that guide belief and conduct.",
      number: 3,
    },
    {
      id: "class-4a",
      title: "Evangelism",
      content:
        "Learn the ministry of reconciliation and practical strategies for consistent soul-winning and discipleship.",
      number: "4A",
    },
    {
      id: "class-4b",
      title: "Introduction to Cell Ministry",
      content:
        "Understand the structure and purpose of Cell Ministry - the backbone of the Church's growth strategy.",
      number: "4B",
    },
    {
      id: "class-5",
      title: "The Church",
      content:
        "Discover your role in both the universal and local Church, and your responsibilities in its advancement.",
      number: 5,
    },
    {
      id: "class-6",
      title: "Christian Living",
      content:
        "Learn practical daily habits and values that align with God's Word for successful Christian living.",
      number: 6,
    },
    {
      id: "class-7",
      title: "Christian Service",
      content:
        "Understand that ministry is every Christian's calling and learn how to serve effectively in the local church.",
      number: 7,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="pt-[150px] pb-20 font-body">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <Link href="/resources" className="mb-16 block">
            <Button variant="ghost" className="hover:underline p-0">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Button>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <GraduationCap className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                    Foundation School
                  </h1>
                  <p className="text-xl text-gray-600 mt-2">
                    7 Essential Classes for New Believers
                  </p>
                </div>
              </div>

              <p className="text-lg text-gray-600 max-w-3xl">
                Build a strong foundation in your faith with our comprehensive
                Foundation School program. Each class is designed to equip you
                with essential knowledge and practical skills for successful
                Christian living.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 text-orange-600 font-semibold">
                <BookOpen className="w-5 h-5" />
                <span>7 Classes Available</span>
              </div>
              <Link href="/resources#foundation-school">
                <Button variant="outline" className="w-full lg:w-auto">
                  View Course Schedule
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {classes.map((classItem) => (
            <motion.div
              key={classItem.id}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <Link href={`/resources/foundation/${classItem.id}`}>
                <div className="relative overflow-hidden">
                  <div className="w-full border border-aero-200 rounded-2xl py-8 flex flex-col gap-6 transition-all duration-300 group-hover:border-aero-300">
                    <div className="flex items-center gap-5 px-8">
                      <span className="bg-aero-600 text-white size-16 p-3 rounded-full flex items-center justify-center shrink-0 group-hover:bg-aero-700 transition-colors">
                        <h1 className="text-2xl font-bold">
                          {classItem.number}
                        </h1>
                      </span>
                      <h2 className="text-[24px] font-semibold text-gray-900 group-hover:text-aero-700 transition-colors">
                        {classItem.title}
                      </h2>
                    </div>
                    <div className="px-8">
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {classItem.content}
                      </p>
                      <div className="mt-4 flex items-center text-aero-600 font-medium group-hover:text-aero-700 transition-colors">
                        <span>View Class Content</span>
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          className="mt-20 text-center bg-orange-100 rounded-2xl py-12 px-8 lg:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-orange-900 mb-4">
            Ready to Start Your Foundation School Journey?
          </h3>
          <p className="text-base text-orange-900 mb-8 max-w-xl mx-auto">
            Join our next Foundation School cohort and build a strong foundation
            for your faith. Classes are held virtually every Tuesday evening.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/resources#foundation-school">
              <Button size="default" className="w-full sm:w-auto">
                Register Now
              </Button>
            </Link>
            <Link href="/resources">
              <Button
                variant="outline"
                size="default"
                className="w-full sm:w-auto text-orange-900 border-orange-900"
              >
                Download Letter
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
