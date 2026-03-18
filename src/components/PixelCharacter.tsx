import { useState } from "react";
import { motion } from "framer-motion";

interface PixelCharacterProps {
  onCharacterClick?: () => void;
}

export default function PixelCharacter({
  onCharacterClick,
}: PixelCharacterProps) {
  const [isJumping, setIsJumping] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [expression, setExpression] = useState<"normal" | "happy" | "thinking">(
    "normal",
  );

  const handleClick = () => {
    setIsJumping(true);
    setIsTalking(true);
    setExpression("happy");

    if (onCharacterClick) onCharacterClick();

    setTimeout(() => setIsJumping(false), 500);
    setTimeout(() => {
      setIsTalking(false);
      setExpression("normal");
    }, 2000);
  };

  const expressions = {
    normal: (
      <>
        {/* Eyes */}
        <div className="absolute left-[35%] top-[30%] w-2 h-2 bg-white"></div>
        <div className="absolute right-[35%] top-[30%] w-2 h-2 bg-white"></div>
        {/* Mouth */}
        <div className="absolute left-[40%] top-[50%] w-6 h-1 bg-white"></div>
      </>
    ),
    happy: (
      <>
        {/* Happy eyes */}
        <div className="absolute left-[35%] top-[30%] w-2 h-1 bg-white"></div>
        <div className="absolute right-[35%] top-[30%] w-2 h-1 bg-white"></div>
        {/* Smile */}
        <div className="absolute left-[40%] top-[50%] w-6 h-2 bg-white rounded-b-full"></div>
      </>
    ),
    thinking: (
      <>
        {/* Thinking eyes */}
        <div className="absolute left-[35%] top-[30%] w-2 h-2 bg-white rounded-full"></div>
        <div className="absolute right-[35%] top-[30%] w-2 h-2 bg-white rounded-full"></div>
        {/* Thinking mouth */}
        <div className="absolute left-[45%] top-[50%] w-4 h-1 bg-white rounded-full"></div>
      </>
    ),
  };

  const speechBubbles = [
    "Let's code!",
    "Hello World!",
    "404 Sleep Not Found",
    "Git commit -m 'awesome'",
    "sudo make sandwich",
    "It works on my machine!",
    "async await my coffee",
    "console.log('Hello!')",
  ];

  const [currentSpeech] = useState(
    () => speechBubbles[Math.floor(Math.random() * speechBubbles.length)],
  );

  return (
    <div
      className="relative w-48 h-64 mx-auto cursor-pointer"
      onClick={handleClick}
    >
      {/* Speech Bubble */}
      {isTalking && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 border-2 border-blue-500 rounded-xl p-3 min-w-[160px]"
        >
          <div className="text-sm text-white font-mono text-center">
            {currentSpeech}
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 border-b-2 border-r-2 border-blue-500 rotate-45"></div>
        </motion.div>
      )}

      {/* Character Container */}
      <motion.div
        animate={{ y: isJumping ? -30 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="relative w-full h-full"
      >
        {/* Body */}
        <div className="absolute inset-4 bg-gradient-to-b from-blue-600 to-blue-800 rounded-lg pixelate"></div>

        {/* Head */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full pixelate border-4 border-blue-800">
          {expressions[expression]}
        </div>

        {/* Arms */}
        <motion.div
          animate={{ rotate: isJumping ? 20 : 0 }}
          className="absolute top-20 left-2 w-6 h-16 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full pixelate"
        ></motion.div>
        <motion.div
          animate={{ rotate: isJumping ? -20 : 0 }}
          className="absolute top-20 right-2 w-6 h-16 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full pixelate"
        ></motion.div>

        {/* Laptop */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg pixelate border-2 border-gray-700">
          {/* Screen */}
          <div className="absolute inset-1 bg-gradient-to-b from-green-900 to-green-950 rounded">
            {/* Code lines */}
            <div className="absolute top-2 left-2 w-8 h-1 bg-green-500"></div>
            <div className="absolute top-4 left-2 w-12 h-1 bg-green-500"></div>
            <div className="absolute top-6 left-4 w-6 h-1 bg-green-500"></div>
            {/* Cursor */}
            <div className="absolute top-8 left-2 w-2 h-1 bg-green-300 animate-pulse"></div>
          </div>
          {/* Keyboard */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-gray-700 rounded-sm"></div>
        </div>

        {/* Legs */}
        <div className="absolute bottom-4 left-10 w-6 h-12 bg-gradient-to-b from-blue-700 to-blue-900 rounded-full pixelate"></div>
        <div className="absolute bottom-4 right-10 w-6 h-12 bg-gradient-to-b from-blue-700 to-blue-900 rounded-full pixelate"></div>

        {/* Floating XP Orbs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            delay: 0,
          }}
          className="absolute top-4 left-4 w-4 h-4 bg-yellow-400 rounded-full blur-sm"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            delay: 1,
          }}
          className="absolute top-8 right-6 w-3 h-3 bg-cyan-400 rounded-full blur-sm"
        ></motion.div>
      </motion.div>

      {/* Level Badge */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full border-2 border-yellow-300">
        LVL 99 DEV
      </div>
    </div>
  );
}
