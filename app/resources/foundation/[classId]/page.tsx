"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Clock, Users, Target } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ClassContent {
  id: string;
  number: string;
  title: string;
  introduction: string;
  keyScriptures?: string[];
  themeScriptures?: string[];
  topicsCovered?: string[];
  keyPoints?: string[];
  keyConcepts?: string[];
  importantTruths?: string[];
  steps?: string[];
  assignments: string[];
  studyMaterials?: string[];
  referenceMaterials?: string[];
}

const classData: Record<string, ClassContent> = {
  "class-1": {
    id: "class-1",
    number: "1",
    title: "The New Creature",
    introduction:
      'This class introduces believers to their new identity in Christ. Being "born again" is not just a symbolic statement—it means you have become a new person spiritually, with a new nature from God. The goal of this class is to help you understand what it means to be a new creature and how to live in this reality.',
    keyScriptures: [
      "2 Corinthians 5:17-18",
      "Romans 6:4",
      "Ephesians 2:10 (AMPC)",
      "2 Peter 1:3",
      "1 Peter 2:9 (AMPC)",
    ],
    topicsCovered: [
      "What it means to be born again",
      "Eternal life, righteousness, and fellowship with God",
      "Salvation as a gift through grace by faith",
      "Living by the Spirit vs. the flesh",
      "Transforming the mind with the Word (Romans 12:2)",
    ],
    keyConcepts: [
      "The new creature is a completely new being with no past (2 Cor 5:17)",
      "You've received a new nature—righteousness, eternal life, and divine fellowship",
      "Assurance of salvation is based on God's Word, not feelings (Romans 10:9-10; 1 John 5:11-13)",
    ],
    assignments: [
      "Explain 2 Corinthians 5:17 in your own words.",
      "Reflect: Are you confident in your salvation regardless of emotions?",
    ],
    studyMaterials: [
      'Book: "Now That You Are Born Again"',
      'Book: "Recreating Your World"',
      'Messages: "Jesus", "The Overcoming Life"',
    ],
  },
  "class-2": {
    id: "class-2",
    number: "2",
    title: "The Holy Spirit",
    introduction:
      "This class is designed to give clarity about who the Holy Spirit is, why every Christian must receive Him, and how to function with Him daily. The Holy Spirit is not optional in your Christian life—He is essential.",
    themeScriptures: ["John 14:16–20", "Acts 1:8"],
    topicsCovered: [
      "Who is the Holy Spirit?",
      "How to receive the Holy Spirit",
      "Speaking in tongues: what it is and why it matters",
      "Seven Spirits of God (Isaiah 11:2)",
      "Gifts and fruits of the Spirit (1 Corinthians 12, Galatians 5)",
      "Ministry gifts (Ephesians 4:11)",
    ],
    importantTruths: [
      "The Holy Spirit is the doer of God's will on Earth.",
      "He empowers you to live the Christian life successfully.",
      "Every believer is to receive and be filled with the Holy Spirit.",
      "Speaking in tongues is a divine tool for edification and communion.",
    ],
    assignments: [
      "Speak in tongues daily for at least 10 minutes. Journal any changes you observe.",
      'Read: "The Seven Spirits of God"',
    ],
    referenceMaterials: [
      'Books: "Seven Things the Holy Spirit Will Do In You"',
      '"The Holy Spirit and You"',
      '"The Oil and The Mantle"',
    ],
  },
  "class-3": {
    id: "class-3",
    number: "3",
    title: "Christian Doctrines",
    introduction:
      "This class helps establish foundational doctrines every Christian must know. Doctrines are spiritual truths revealed in scripture, which guide belief and conduct.",
    topicsCovered: [
      "Supremacy of the Bible",
      "Living in Two Worlds (physical and spiritual)",
      "Core doctrines of the faith (based on Hebrews 6:1-2):",
      "• Repentance from dead works",
      "• Faith toward God",
      "• Baptisms (Holy Spirit and water)",
      "• Laying on of hands",
      "• Resurrection of the dead",
      "• Eternal judgment",
      "Righteousness: a nature, not behavior",
      "Holiness and Sanctification",
      "Deliverance: the believer is already delivered",
      "Activism vs Apologetics",
      "Loveworld Exceptionalism, Expansionism, Perfectionism",
    ],
    assignments: [
      'Listen to: "Understanding Righteousness", "3 Important Laws", "Activism vs Apologetics"',
      "Write 3 key lessons from each",
    ],
  },
  "class-4a": {
    id: "class-4a",
    number: "4A",
    title: "Evangelism",
    introduction:
      "Evangelism is every Christian's responsibility—not just to preach, but to win souls and raise them into disciples. This class defines soul-winning and outlines a practical strategy for consistent evangelism.",
    keyPoints: [
      "The Ministry of Reconciliation is given to all believers (2 Cor 5:17–18)",
      "Evangelism is not optional—it's obedience to Christ (Matt 28:19–20)",
      "Every soul must be followed up, taught, and mentored",
    ],
    steps: [
      "Be filled with the Spirit",
      "Understand the Gospel",
      "Explain the Gospel clearly",
      "Lead others into salvation",
      "Receive them into God's family and the local Church",
      "Introduce mentorship through Foundation School and Cell Ministry",
      "Release them into leadership and service",
    ],
    assignments: [
      'Read: "Join This Chariot"',
      "Use the SoulTracker app to log new souls",
      "Bring at least 2 new people to your next class",
    ],
  },
  "class-4b": {
    id: "class-4b",
    number: "4B",
    title: "Introduction to Cell Ministry",
    introduction:
      "This class introduces the structure and purpose of the Cell Ministry, the backbone of the Church's growth strategy. Every member of the Church must belong to a Cell.",
    topicsCovered: [
      "The Cell is the basic outreach and fellowship unit of the Church",
      "Cell growth = Church growth",
      "Functions of the Cell: prayer, Bible study, evangelism, care, leadership development",
    ],
    keyPoints: [
      "It ensures no member is left out or uncared for",
      "It provides leadership training and ministry expression",
      "It guarantees orderly spiritual development and discipleship",
    ],
    assignments: [
      "Join and participate in a Cell",
      "Report on your experience",
    ],
  },
  "class-5": {
    id: "class-5",
    number: "5",
    title: "The Church",
    introduction:
      "The Church is both universal and local. The universal Church refers to the Body of Christ—comprising all believers in Christ globally. The local Church is the physical and spiritual community to which believers belong in their geographical or assigned area. Both are crucial in a Christian's journey of spiritual growth, training, and service.",
    topicsCovered: [
      "God commanded it (Hebrews 10:25)",
      "Jesus went regularly and showed us the pattern (Luke 4:16)",
      "It is where the Body of Christ functions and grows",
      "The Church is the pillar and ground of truth (1 Tim 3:15)",
      "A place for fellowship and communion with fellow believers",
      "It is the center of spiritual growth and maturity",
      "It is where the Word is taught consistently",
      "A platform for practical ministry and leadership training",
      "Provides answers through God's Word and spiritual guidance",
      "Hosts the corporate anointing—a multiplied spiritual presence",
      "Offers support, refreshing, and encouragement in life's journey",
    ],
    assignments: [
      'Read "Power of Your Mind" and write 2 key insights',
      'Listen to "Topical Teaching on Christian Growth"',
      'Listen to "Tithes and Offerings" and sign up for a Partnership arm of the ministry',
    ],
  },
  "class-6": {
    id: "class-6",
    number: "6",
    title: "Christian Living",
    introduction:
      "The Christian life is practical. While salvation is instant upon believing in Jesus, spiritual maturity is a journey. This class covers how to live daily as a successful and productive Christian. It emphasizes personal discipline, habits, and values that align with the Word of God.",
    keyPoints: [
      "Daily Devotion: Commit to prayer, Bible study, and meditation every day",
      "Walking in Love: Love is the hallmark of Christian maturity",
      "Living by Faith: The just shall live by faith (Heb 11:6; 2 Cor 5:7)",
      "Righteousness and Holiness: You are righteous by nature",
      "Financial Stewardship: Understand and practice God's financial principles",
      "Christian Communication: Speech should be truthful, faith-filled, and edifying",
      "Be Filled with the Spirit: Stay spiritually vibrant",
    ],
    assignments: [
      'Write and submit 2 insights from "Power of Your Mind"',
      'Listen to "Christian Growth & Maturity"',
      'Listen to "Tithes and Offerings" and begin regular partnership',
    ],
  },
  "class-7": {
    id: "class-7",
    number: "7",
    title: "Christian Service",
    introduction:
      "Ministry is every Christian's calling. God saved you to serve. This class teaches students how to serve in the local church, how to be effective in ministry, and how to leverage technology in spreading the Gospel.",
    topicsCovered: [
      "You are saved to serve—Christianity without service is incomplete",
      "The Church is your platform for expressing your gifts and fulfilling your calling",
      "Serving in the Church helps build Christian character, faithfulness, and leadership",
      "Every role in the Church, from ushering to media, is significant in God's Kingdom",
      "Ministry in today's world requires technology",
      "Service and Leadership: Be consistent, punctual, and passionate",
    ],
    assignments: [
      "Complete all tutorials on ministry tools",
      "Join and participate in a service department",
      "Study for your final exam and prepare for Foundation School graduation",
    ],
  },
};

export default function ClassContentPage({
  params,
}: {
  params: { classId: string };
}) {
  const classContent = classData[params.classId];

  if (!classContent) {
    return (
      <div className="pt-[150px] pb-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Class Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The requested class could not be found.
        </p>
        <Link href="/resources/foundation">
          <Button>Back to Foundation School</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-[150px] pb-20 font-body">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/resources/foundation">
            <Button variant="ghost" className="mb-6 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Foundation School
            </Button>
          </Link>

          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 lg:p-12 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-600 text-white size-16 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {classContent.number}
                </span>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">
                  Foundation School
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {classContent.title}
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-gray-600">
                  Class {classContent.number}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-gray-600">90 minutes</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-gray-600">
                  Interactive Session
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Introduction */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-orange-600" />
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {classContent.introduction}
            </p>
          </div>

          {/* Key Scriptures */}
          {(classContent.keyScriptures || classContent.themeScriptures) && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {classContent.keyScriptures
                  ? "Key Scriptures"
                  : "Theme Scriptures"}
              </h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {(
                    classContent.keyScriptures || classContent.themeScriptures
                  )?.map((scripture, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-medium">{scripture}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Topics Covered */}
          {classContent.topicsCovered && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Topics Covered
              </h3>
              <ul className="space-y-3">
                {classContent.topicsCovered.map((topic, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 shrink-0"></span>
                    <span className="text-gray-700">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Points */}
          {classContent.keyPoints && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Key Points
              </h3>
              <ul className="space-y-3">
                {classContent.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Concepts */}
          {classContent.keyConcepts && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Key Concepts
              </h3>
              <ul className="space-y-3">
                {classContent.keyConcepts.map((concept, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0"></span>
                    <span className="text-gray-700">{concept}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Important Truths */}
          {classContent.importantTruths && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Important Truths
              </h3>
              <ul className="space-y-3">
                {classContent.importantTruths.map((truth, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 shrink-0"></span>
                    <span className="text-gray-700">{truth}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps */}
          {classContent.steps && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {classContent.id === "class-4a"
                  ? "7 Steps to Perfecting Soulwinning"
                  : "Steps"}
              </h3>
              <ol className="space-y-3">
                {classContent.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Assignments */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Assignments
            </h3>
            <div className="bg-yellow-50 rounded-lg p-6">
              <ol className="space-y-3">
                {classContent.assignments.map((assignment, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="bg-yellow-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{assignment}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Study Materials */}
          {(classContent.studyMaterials || classContent.referenceMaterials) && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {classContent.studyMaterials
                  ? "Study Materials"
                  : "Reference Materials"}
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {(
                    classContent.studyMaterials ||
                    classContent.referenceMaterials
                  )?.map((material, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-medium">{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/resources/foundation">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Classes
            </Button>
          </Link>
          <Link href="/resources#foundation-school">
            <Button className="w-full sm:w-auto">
              Register for Foundation School
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
