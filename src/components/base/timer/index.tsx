"use client";

import React, { useEffect, useState } from "react";

interface TimerClientProps {
  expiryTimestamp: number;
  onExpire?: () => void;
  children?: React.ReactNode;
  className?: string;
  hideExpireMessage?: boolean;
}
const TimerClient: React.FC<TimerClientProps> = ({
  expiryTimestamp,
  onExpire,
  children,
  className,
  hideExpireMessage = false,
}) => {
  const [remaining, setRemaining] = useState(
    Math.max(0, expiryTimestamp - Date.now())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, expiryTimestamp - now);
      setRemaining(diff);

      if (diff <= 0) {
        clearInterval(interval);
        if (onExpire) onExpire();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTimestamp, onExpire]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={className}>
      {remaining > 0 ? (
        <>
          {children} {formatTime(remaining)}
        </>
      ) : (
        !hideExpireMessage && (
          <span className="text-red-500 font-bold text-xs">
            کد منقضی شده است
          </span>
        )
      )}
    </div>
  );
};

export default TimerClient;
