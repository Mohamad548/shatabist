import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import clsxm from "@/utils/clsxm";

interface ShataLoadingProps {
  size?: "small" | "medium" | "large";
  className?: string;
  showText?: boolean;
  text?: string;
  color?: "text-white" | "text-black";
}

const ShataLoading: React.FC<ShataLoadingProps> = ({
  size = "medium",
  className,
  showText = true,
  text = "در حال بارگذاری...",
  color = "text-black",
}) => {
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <div
      className={clsxm(
        "flex flex-col items-center justify-center gap-4 py-6",
        className
      )}
    >
      {/* Logo with animations */}
      <div className="relative">
        {/* Rotating ring behind logo */}
        <motion.div
          className={clsxm(
            "absolute inset-0 rounded-full border-4 border-green-200",
            sizeClasses[size]
          )}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Pulsing glow effect */}
        <motion.div
          className={clsxm(
            "absolute inset-0 rounded-full bg-green-400/20",
            sizeClasses[size]
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* The actual logo */}
        <motion.div
          className={clsxm(
            "relative rounded-full overflow-hidden bg-white shadow-lg",
            sizeClasses[size]
          )}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/logo/shata-logo.png"
            alt="شتا"
            fill
            className="object-contain p-1"
            priority
          />
        </motion.div>
      </div>

      {/* Loading Text */}
      {showText && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.p
            className={clsxm(
              "font-Bold tracking-wide",
              textSizes[size],
              color
            )}
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.p>

          {/* Simple animated dots */}
          <div className="flex justify-center gap-1 mt-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-green-500 rounded-full"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ShataLoading;
