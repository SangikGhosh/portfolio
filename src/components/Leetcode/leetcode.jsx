import { useEffect, useState, useRef } from "react";
import {
  FaMedal,
  FaChartLine,
  FaTrophy,
  FaCheckCircle,
  FaListAlt,
} from "react-icons/fa";
import { RiCopperCoinFill } from "react-icons/ri";
import PropTypes from "prop-types";
import { TextHoverEffect } from "../GlowText/ui";

const LeetCodeProgress = () => {
  const [progress, setProgress] = useState(null);
  const [badgesData, setBadgesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://leetcode-api-faisalshohag.vercel.app/Sangik_Ghosh")
      .then((response) => response.json())
      .then((data) => {
        setProgress(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch data");
        setLoading(false);
      });

    fetch("https://alfa-leetcode-api.onrender.com/Sangik_Ghosh/badges")
      .then((response) => response.json())
      .then((data) => {
        setBadgesData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch badges:", error);
      });
  }, []);

  if (loading) return <div className="text-center text-blue-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!progress) return <div>No data available.</div>;

  return (
    <>
      <div className="achievements dark:bg-[#000000] min-h-screen flex flex-col items-center justify-center py-10 bg-[#000000]">
        <TextHoverEffect text="ACHIEVEMENTS" id="achievements" />
        <div className="container mx-auto p-8 bg-[#1a1a1a] rounded-xl shadow-xl max-w-6xl lg:px-12 xl:max-w-7xl">
          {/* Profile Section */}
          <div className="flex flex-col items-center md:flex-row md:items-center mb-12 bg-[#1a1a1a]">
            <img
              src="https://avatars.githubusercontent.com/u/136787875?s=400&u=0c804c413ccf10b164faed21260d9771f2aa30df&v=4"
              alt="Profile"
              className="w-20 h-20 md:w-24 md:h-24 lg:w-27 lg:h-27 rounded-full border-[0.3rem] border-green-500 shadow-lg"
            />
            <div className="mt-6 md:mt-0 md:ml-8 lg:ml-10 text-center bg-[#1a1a1a] md:text-left">
              <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-wide font-bold bg-[#1a1a1a] text-gray-900 dark:text-white">
                Sangik Ghosh
              </h1>
              <p className="text-base md:text-xl lg:text-xl bg-[#1a1a1a] text-gray-500 dark:text-gray-400 mt-3">
                Tech Enthusiast🌀
              </p>
            </div>
          </div>

          {/* LeetCode Progress Section */}
          <h1 className="text-4xl md:text-3xl lg:text-5xl tracking-wide font-bold text-center bg-[#1a1a1a] mb-12">
            <span className="text-transparent bg-clip-text bg-[#5154ff]">
              LeetCode
            </span>{" "}
            <span className="dark:text-white bg-[#1a1a1a]">Progress</span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-[#1a1a1a] gap-8 lg:gap-10 group">
            {progressCards(progress)}
          </div>

          {/* Badge Showcase Section */}
          {badgesData?.badges?.length > 0 && (
            <div className="bg-[#1a1a1a] mt-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-wide font-bold text-center text-gray-700 dark:text-white my-12">
                Badges
              </h1>

              {/* Earned Badges */}
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 dark:text-white mb-6">
                  Earned Badges
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {badgesData.badges.map((badge, index) => (
                    <BadgeCard key={index} badge={badge} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const progressCards = (progress) => {
  const cards = [
    {
      title: "Total Solved",
      value: progress.totalSolved,
      bgColor: "from-blue-500 to-blue-700",
      icon: <FaCheckCircle className="bg-transparent" />,
    },
    {
      title: "Easy Solved",
      value: progress.easySolved,
      bgColor: "from-green-500 to-green-700",
      icon: <FaListAlt className="bg-transparent" />,
    },
    {
      title: "Medium Solved",
      value: progress.mediumSolved,
      bgColor: "from-yellow-500 to-yellow-700",
      icon: <FaChartLine className="bg-transparent" />,
    },
    {
      title: "Hard Solved",
      value: progress.hardSolved,
      bgColor: "from-red-500 to-red-700",
      icon: <FaTrophy className="bg-transparent" />,
    },
    {
      title: "Contribution Point",
      value: progress.contributionPoint,
      bgColor: "from-indigo-500 to-indigo-700",
      icon: <RiCopperCoinFill className="bg-transparent" />,
    },
    {
      title: "Rank",
      value: progress.ranking,
      bgColor: "from-purple-500 to-purple-700",
      icon: <FaMedal className="bg-transparent" />,
    },
  ];

  return cards.map((card, index) => (
    <ProgressCard
      key={index}
      title={card.title}
      value={card.value}
      bgColor={card.bgColor}
      icon={card.icon}
    />
  ));
};

const ProgressCard = ({ title, value, bgColor, icon }) => {
  const [displayedValue, setDisplayedValue] = useState(0);
  const cardRef = useRef(null);
  const animationRef = useRef(null);

  const animateCount = (targetValue) => {
    let start = 0;
    const duration = 2000; // Animation duration in ms
    const step = (timestamp) => {
      if (!animationRef.current) {
        animationRef.current = timestamp;
      }
      const progress = Math.min((timestamp - animationRef.current) / duration, 1);
      const count = Math.floor(progress * targetValue);
      setDisplayedValue(count);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        animationRef.current = null; // Reset animation timestamp for next view
      }
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCount(parseInt(value, 10));
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [value]);

  return (
    <div
      ref={cardRef}
      className={`group-hover:blur-sm  hover:!blur-none p-6 bg-[#1a1a1a] rounded-lg shadow-lg bg-gradient-to-r ${bgColor} text-white transform hover:scale-105 transition-transform duration-500 ease-in-out`}
    >
      <div className="flex bg-transparent items-center mb-4">
        <div className="bg-transparent text-2xl">{icon}</div>
        <h2 className="ml-4 bg-transparent text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-3xl bg-transparent font-bold mt-2">{displayedValue}</p>
    </div>
  );
};

const BadgeCard = ({ badge }) => (
  <div className="p-6 rounded-lg shadow-lg bg-[#111] dark:bg-[#1a1a1a] text-white text-center">
    <img
      src={badge.icon.startsWith("http") ? badge.icon : `https://leetcode.com${badge.icon}`}
      alt={badge.displayName || badge.name}
      className="w-24 h-24 mx-auto mb-4"
    />
    <h2 className="text-lg font-semibold bg-[#1a1a1a]">{badge.displayName || badge.name}</h2>
    {badge.creationDate && (
      <p className="text-gray-400 text-sm mt-1 bg-[#1a1a1a]">Earned on {new Date(badge.creationDate).toLocaleDateString()}</p>
    )}
  </div>
);

ProgressCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  bgColor: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

BadgeCard.propTypes = {
  badge: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    name: PropTypes.string,
    creationDate: PropTypes.string,
  }).isRequired,
};

export default LeetCodeProgress;
