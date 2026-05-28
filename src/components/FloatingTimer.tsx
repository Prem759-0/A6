import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { Coffee, Play, Pause, RotateCcw, X, Volume2, Sparkles } from "lucide-react";

export const FloatingTimer: React.FC = () => {
  const {
    timerSecondsTotal,
    timerSecondsLeft,
    isTimerRunning,
    timerProductName,
    pauseTimer,
    resumeTimer,
    resetTimer
  } = useShop();

  const [isExpanded, setIsExpanded] = useState(false);
  const [pulseDirection, setPulseDirection] = useState(true);

  // If there is no active timer and seconds left is 0, do not render anything
  if (timerSecondsTotal === 0 && timerSecondsLeft === 0) {
    return null;
  }

  const formatTimerDigits = (secsTotal: number) => {
    const m = Math.floor(secsTotal / 60);
    const s = secsTotal % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = timerSecondsTotal > 0 ? (timerSecondsLeft / timerSecondsTotal) : 0;
  const isFinished = timerSecondsLeft === 0;

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none animate-slide-up">
      {isExpanded ? (
        /* Expanded Popover Clock Pane */
        <div className="bg-white border-3 border-black rounded-2xl p-4 w-72 shadow-retro flex flex-col gap-3 relative animate-scale-up">
          
          {/* Close mini panel button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2.5 right-2.5 p-1 bg-stone-100 border border-black rounded-lg hover:bg-neutral-200 transition-transform cursor-pointer"
            title="Minimize"
          >
            <span className="text-[9px] font-mono block leading-none font-black text-neutral-800">▼</span>
          </button>

          {/* Steeping blend name details */}
          <div className="pr-4 border-b border-neutral-100 pb-2">
            <span className="text-[8px] font-mono uppercase font-black tracking-widest text-[#E64A19] block">
              Active Colorado Steep
            </span>
            <h4 className="font-serif italic font-extrabold text-[#1E2229] text-sm truncate">
              {timerProductName || "Loose Leaf Blend"}
            </h4>
          </div>

          {/* Interactive display */}
          <div className="flex items-center justify-between py-1 bg-[#FAF9F5] p-2.5 rounded-xl border border-dashed border-neutral-300">
            {isFinished ? (
              <div className="flex flex-col">
                <span className="text-emerald-700 font-extrabold text-[13px] animate-bounce flex items-center gap-1 leading-tight">
                  <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-400" /> Sachet Ready! 🔔
                </span>
                <span className="text-[9px] text-neutral-400 font-mono leading-none">Remove tea bag now.</span>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest font-mono leading-none">Time Remaining</span>
                <span className="font-mono text-2xl font-black text-[#1D2128]">
                  {formatTimerDigits(timerSecondsLeft)}
                </span>
              </div>
            )}

            {/* Micro progress line */}
            <div className="w-20 h-2 bg-stone-200 border border-black rounded-full overflow-hidden">
              <div 
                className={`h-full border-r border-black transition-all ${isFinished ? "bg-emerald-500" : "bg-[#00838F]"}`}
                style={{ width: `${progressPercent * 100}%` }}
              />
            </div>
          </div>

          {/* Control Triggers */}
          <div className="flex gap-2">
            {isFinished ? (
              <button
                onClick={resetTimer}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest py-2 rounded-lg border-2 border-black shadow-retro-sm transition-transform cursor-pointer"
              >
                Clear Timer
              </button>
            ) : (
              <>
                {isTimerRunning ? (
                  <button
                    onClick={pauseTimer}
                    className="flex-1 bg-[#1E2229] hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest py-1.5 rounded-lg border-2 border-black shadow-retro-sm active:translate-y-0.5 flex items-center justify-center gap-1 cursor-pointer transition-transform"
                  >
                    <Pause className="w-3.5 h-3.5" /> Pause
                  </button>
                ) : (
                  <button
                    onClick={resumeTimer}
                    className="flex-1 bg-[#00838F] hover:bg-[#00ACC1] text-white font-black text-xs uppercase tracking-widest py-1.5 rounded-lg border-2 border-black shadow-retro-sm active:translate-y-0.5 flex items-center justify-center gap-1 cursor-pointer transition-transform"
                  >
                    <Play className="w-3.5 h-3.5" /> Resume
                  </button>
                )}

                <button
                  onClick={resetTimer}
                  className="p-1.5 bg-white text-red-600 hover:bg-red-50 border-2 border-black rounded-lg shadow-retro-sm active:translate-y-0.5 flex items-center justify-center cursor-pointer transition-transform"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4.5 h-4.5" />
                </button>
              </>
            )}
          </div>

        </div>
      ) : (
        /* Collapsed Floating Stamp bubble button */
        <button
          onClick={() => setIsExpanded(true)}
          className={`flex items-center gap-3 bg-white border-2 border-black rounded-2xl p-3 pr-4 shadow-retro hover:-translate-y-0.5 duration-200 cursor-pointer ${
            isFinished ? "bg-emerald-50 border-emerald-500" : "bg-white"
          }`}
          aria-label="Toggle tea steep timer"
        >
          {/* Animated teacup shape */}
          <div className="relative">
            <div className={`p-2 rounded-xl border border-black text-neutral-900 ${isFinished ? "bg-emerald-500 text-white animate-bounce-short" : "bg-amber-100"}`}>
              <Coffee className={`w-5 h-5 ${isTimerRunning ? "animate-pulse" : ""}`} />
            </div>
            
            {/* Little indicator badge */}
            <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 border border-black rounded-full ${
              isFinished ? "bg-rose-500 animate-ping" : "bg-amber-500 animate-pulse"
            }`} />
          </div>

          <div className="text-left font-mono">
            <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest block leading-none">
              {isFinished ? "Steep Finish" : "Steeping Block"}
            </span>
            <p className={`text-xs font-black tracking-tight leading-snug ${isFinished ? "text-emerald-700 animate-scroll" : "text-neutral-900"}`}>
              {isFinished ? "Ready! 🔔" : formatTimerDigits(timerSecondsLeft)}
            </p>
          </div>
        </button>
      )}
    </div>
  );
};
