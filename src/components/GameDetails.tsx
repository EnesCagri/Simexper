import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Award, Camera, MessageSquare } from "lucide-react";
import Image from "next/image";

interface GameDetailsProps {
  title: string;
  description: string;
  screenshots: string[];
  likes: number;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  reviews: Array<{
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

export default function GameDetails({
  title,
  description,
  screenshots,
  likes,
  achievements,
  reviews,
}: GameDetailsProps) {
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const handleLike = () => {
    if (!hasLiked) {
      setCurrentLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b border-gray-800 mb-8">
        {["description", "screenshots", "achievements", "reviews"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition-colors
              ${
                activeTab === tab
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Like Button */}
      <div className="flex justify-end mb-6">
        <Button
          onClick={handleLike}
          disabled={hasLiked}
          className={`flex items-center gap-2 ${
            hasLiked ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{currentLikes}</span>
        </Button>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Description Section */}
        {activeTab === "description" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert max-w-none"
          >
            <h2 className="text-2xl font-bold mb-4">About This Simulation</h2>
            <p className="text-gray-300">{description}</p>
          </motion.div>
        )}

        {/* Screenshots Section */}
        {activeTab === "screenshots" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden"
              >
                <Image
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
        )}

        {/* Achievements Section */}
        {activeTab === "achievements" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700"
              >
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image
                    src={achievement.icon}
                    alt={achievement.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{achievement.title}</h3>
                  <p className="text-gray-400">{achievement.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Reviews Section */}
        {activeTab === "reviews" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 rounded-lg bg-gray-800/50 border border-gray-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{review.user}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < review.rating
                              ? "text-yellow-500"
                              : "text-gray-600"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{review.date}</span>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
