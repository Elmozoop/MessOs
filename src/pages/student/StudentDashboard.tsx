import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useData } from '../../context/DataContext';

export function StudentDashboard() {
  const { studentStats, upcomingMeal, confirmMeal } = useData();
  const [timeLeft, setTimeLeft] = useState(upcomingMeal.timeRemainingMins * 60);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-8 pb-10 xl:flex-row"
    >
      <div className="min-w-0 flex-1">
        <motion.div
          variants={itemVariants}
          className="mb-6 flex flex-wrap items-start justify-between gap-4"
        >
          <div className="mb-[5px]">
            <h2 className="mb-1 font-serif text-[2rem] leading-[1.2] font-bold text-[var(--color-text-primary)]">
              Hello, {studentStats.name}! 👋
            </h2>
            <p className="text-[14px] font-normal text-[var(--color-text-secondary)]">
              Making campus greener daily 🌱
            </p>
          </div>

          <div className="inline-flex items-center gap-0.5 rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.65)] p-1 shadow-[var(--glass-shadow)] backdrop-blur-[12px]">
            <button className="cursor-pointer rounded-full border-none bg-[linear-gradient(135deg,var(--color-sage),var(--color-sky))] px-5 py-1.5 font-sans text-[13px] font-semibold text-white shadow-[0_4px_12px_rgba(143,201,154,0.45)] transition-all duration-200">
              Today
            </button>
            <button className="cursor-pointer rounded-full border-none bg-transparent px-5 py-1.5 font-sans text-[13px] font-semibold text-[var(--color-text-muted)] transition-all hover:text-[var(--color-text-secondary)]">
              Week
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative mb-[22px] overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,#8FC99A_0%,#A8D8B0_40%,#82C4F0_100%)] p-[26px_28px] shadow-[0_8px_32px_rgba(143,201,154,0.40)]"
        >
          <div className="absolute -top-[80px] -right-[60px] h-[280px] w-[280px] rounded-full bg-[rgba(255,255,255,0.12)]"></div>
          <div className="absolute right-[80px] -bottom-[40px] h-[160px] w-[160px] rounded-full bg-[rgba(255,255,255,0.08)]"></div>

          <div className="relative z-10 mb-5 flex items-start justify-between">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[rgba(255,255,255,0.85)]">
              🏆 Sustainability Score
            </div>
            <div className="font-serif text-[2.8rem] leading-none font-extrabold tracking-[-1px] text-white">
              {studentStats.sustainabilityScore}
            </div>
          </div>

          <div className="relative z-10 mb-4 h-[10px] overflow-hidden rounded-full bg-[rgba(255,255,255,0.30)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '82%' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.90),rgba(255,255,255,0.60))] shadow-[0_0_12px_rgba(255,255,255,0.5)]"
            />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="rounded-full border border-[rgba(255,255,255,0.40)] bg-[rgba(255,255,255,0.25)] px-3.5 py-1.5 text-[12px] font-semibold text-white backdrop-blur-sm">
              🥇 Rank #{studentStats.rank} in Hostel
            </div>
            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-white">
              ♻️ {studentStats.wasteSavedKg.toFixed(1)}kg saved!
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="mb-4 text-[16px] font-extrabold tracking-[-0.2px] text-[var(--color-text-primary)]">
            Menu & Action
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div key="meal-card" layout className="glass mb-4 p-[22px_24px]">
              <div className="mb-[18px] flex items-center justify-between">
                <span className="rounded-full border border-[rgba(245,208,96,0.40)] bg-[linear-gradient(135deg,rgba(245,208,96,0.25),rgba(248,168,112,0.25))] px-3 py-1 text-[10.5px] font-bold tracking-[1.5px] text-[#7A4A00] uppercase">
                  ⏳ Upcoming
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-[rgba(248,168,112,0.35)] bg-[rgba(248,168,112,0.18)] px-3.5 py-1 text-[12.5px] font-bold text-[#8A3800]">
                  🕐 {formatTime(timeLeft)}
                </span>
              </div>

              <div className="mb-1 font-serif text-[1.8rem] leading-[1.1] font-bold text-[var(--color-text-primary)]">
                {upcomingMeal.name}
              </div>
              <div className="mb-[18px] text-[12px] text-[var(--color-text-muted)]">
                {upcomingMeal.date}
              </div>

              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold tracking-[2px] text-[var(--color-text-muted)] uppercase before:h-0.5 before:w-4 before:rounded-sm before:bg-[var(--color-sage)] before:content-['']">
                🍴 Today's Menu
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {upcomingMeal.menu.map((item: string, idx: number) => {
                  const styleMap = [
                    { t: 'tag-sage', d: '#5EA872' },
                    { t: 'tag-butter', d: '#D4A800' },
                    { t: 'tag-sky', d: '#4A9ED8' },
                    { t: 'tag-lavender', d: '#8A6ED4' },
                    { t: 'tag-peach', d: '#E07830' },
                  ];
                  const st = styleMap[idx % styleMap.length];

                  return (
                    <div
                      key={idx}
                      className={`flex cursor-default items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-[12.5px] font-semibold transition-transform hover:-translate-y-0.5 ${st.t}`}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: st.d }}
                      ></span>
                      {item}
                    </div>
                  );
                })}
              </div>

              {upcomingMeal.userConfirmed === null ? (
                <div className="flex gap-2.5">
                  <button
                    className="flex-1 cursor-pointer rounded-[14px] border-none bg-[linear-gradient(135deg,var(--color-sage),var(--color-sky))] p-3 font-sans text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(143,201,154,0.5)] transition-all hover:-translate-y-[3px]"
                    onClick={() => confirmMeal(true)}
                  >
                    ✓ I'm Eating
                  </button>
                  <button
                    className="flex-1 cursor-pointer rounded-[14px] border-[1.5px] border-[rgba(255,255,255,0.9)] bg-[rgba(255,255,255,0.70)] p-3 font-sans text-[13px] font-bold text-[var(--color-text-secondary)] shadow-[var(--shadow-sm)] backdrop-blur-[10px] transition-all hover:-translate-y-[3px]"
                    onClick={() => confirmMeal(false)}
                  >
                    ✕ Skip Meal
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  layout
                  className="glass-sage rounded-[20px] p-6 text-center"
                >
                  <h3 className="mb-2 text-xl font-black tracking-tight text-[#1A4024]">
                    {upcomingMeal.userConfirmed ? 'Meal Confirmed! ✓' : 'Meal Skipped! ✕'}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--color-text-secondary)]">
                    {upcomingMeal.userConfirmed
                      ? 'See you at the mess. Enjoy your meal! 🍛'
                      : 'Thank you for letting us know and saving food! 🌍'}
                  </p>
                  <button
                    className="mt-4 cursor-pointer border-none bg-transparent text-[12px] font-bold text-[var(--color-text-muted)] underline hover:text-[var(--color-primary-900)]"
                    onClick={() => confirmMeal(null as unknown as boolean)}
                  >
                    Change Response
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="flex shrink-0 flex-col gap-5 xl:w-[350px]">
        <motion.div variants={itemVariants} className="glass p-[22px]">
          <div className="mb-4 text-[15px] font-extrabold text-[var(--color-text-primary)]">
            Overview
          </div>

          <div className="flex gap-3">
            <div className="flex-1 rounded-[16px] border border-[rgba(143,201,154,0.35)] bg-[linear-gradient(135deg,rgba(143,201,154,0.25),rgba(200,237,208,0.40))] p-[16px_14px] text-center">
              <motion.div
                key={studentStats.mealsAttended}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                className="mb-1 font-serif text-[2rem] leading-none font-bold text-[var(--color-sage-dark)]"
              >
                {studentStats.mealsAttended}
              </motion.div>
              <div className="text-[10px] font-bold tracking-[2px] text-[var(--color-sage-dark)] uppercase">
                Eaten
              </div>
            </div>

            <div className="flex-1 rounded-[16px] border border-[rgba(240,160,160,0.30)] bg-[linear-gradient(135deg,rgba(240,160,160,0.20),rgba(250,212,212,0.35))] p-[16px_14px] text-center">
              <motion.div
                key={studentStats.mealsSkipped}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                className="mb-1 font-serif text-[2rem] leading-none font-bold text-[#C04040]"
              >
                {studentStats.mealsSkipped}
              </motion.div>
              <div className="text-[10px] font-bold tracking-[2px] text-[#C04040] uppercase">
                Skipped
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#B8A4E8_0%,#82C4F0_100%)] p-[20px_22px] shadow-[0_8px_28px_rgba(184,164,232,0.40)]"
        >
          <div className="absolute -top-[60px] -right-[40px] h-[200px] w-[200px] rounded-full bg-[rgba(255,255,255,0.10)]"></div>

          <div className="relative z-10 mb-2 text-[11px] font-bold tracking-[2px] text-[rgba(255,255,255,0.75)] uppercase">
            GreenStamp Score
          </div>
          <div className="relative z-10 mb-2.5 flex items-baseline gap-2">
            <div className="font-serif text-[2.4rem] leading-none font-bold text-white">78</div>
            <div className="text-[14px] font-semibold text-[rgba(255,255,255,0.60)]">/ 100</div>
          </div>
          <div className="relative z-10 mb-3 h-[7px] overflow-hidden rounded-full bg-[rgba(255,255,255,0.25)]">
            <div className="h-full w-[78%] rounded-full bg-[rgba(255,255,255,0.80)] shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
          </div>
          <div className="relative z-10 text-[12px] font-medium text-[rgba(255,255,255,0.80)]">
            🌿 4,200 kg CO₂ avoided
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass flex-1 p-[22px]">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[15px] font-extrabold text-[var(--color-text-primary)]">
              This Week
            </div>
            <a
              href="#"
              className="cursor-pointer rounded-lg bg-[rgba(143,201,154,0.15)] px-2.5 py-1 text-[12px] font-bold text-[var(--color-sage-dark)] no-underline transition-colors hover:bg-[rgba(143,201,154,0.30)]"
            >
              View All
            </a>
          </div>

          <div className="mb-2 flex cursor-pointer items-center gap-3 rounded-[14px] border border-[rgba(255,255,255,0.80)] bg-[rgba(255,255,255,0.50)] p-[13px_14px] transition-all hover:translate-x-[3px] hover:bg-[rgba(255,255,255,0.80)] hover:shadow-[var(--shadow-sm)]">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--color-lavender),var(--color-lavender-light))] text-[11px] font-extrabold tracking-[0.5px] text-[#38206A]">
              THU
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold tracking-[1.5px] text-[var(--color-text-muted)] uppercase">
                Breakfast
              </div>
              <div className="mt-0.5 text-[13.5px] font-bold text-[var(--color-text-primary)]">
                Idli, Sambar
              </div>
            </div>
            <div className="text-[14px] text-[var(--color-text-muted)]">›</div>
          </div>

          <div className="mb-2 flex cursor-pointer items-center gap-3 rounded-[14px] border border-[rgba(255,255,255,0.80)] bg-[rgba(255,255,255,0.50)] p-[13px_14px] transition-all hover:translate-x-[3px] hover:bg-[rgba(255,255,255,0.80)] hover:shadow-[var(--shadow-sm)]">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--color-sky),var(--color-sky-light))] text-[11px] font-extrabold tracking-[0.5px] text-[#0A2A5A]">
              FRI
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold tracking-[1.5px] text-[var(--color-text-muted)] uppercase">
                Lunch
              </div>
              <div className="mt-0.5 text-[13.5px] font-bold text-[var(--color-text-primary)]">
                Veg Pulao
              </div>
            </div>
            <div className="text-[14px] text-[var(--color-text-muted)]">›</div>
          </div>

          <div className="flex cursor-pointer items-center gap-3 rounded-[14px] border border-[rgba(255,255,255,0.80)] bg-[rgba(255,255,255,0.50)] p-[13px_14px] transition-all hover:translate-x-[3px] hover:bg-[rgba(255,255,255,0.80)] hover:shadow-[var(--shadow-sm)]">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--color-butter),var(--color-butter-light))] text-[11px] font-extrabold tracking-[0.5px] text-[#5A3800]">
              SAT
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-bold tracking-[1.5px] text-[var(--color-text-muted)] uppercase">
                Dinner
              </div>
              <div className="mt-0.5 text-[13.5px] font-bold text-[var(--color-text-primary)]">
                Chole Bhature
              </div>
            </div>
            <div className="text-[14px] text-[var(--color-text-muted)]">›</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
