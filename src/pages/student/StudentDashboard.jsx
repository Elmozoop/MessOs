import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Clock, Utensils, CheckCircle2, XCircle, Leaf, Trophy, Calendar, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function StudentDashboard() {
  const { studentStats, upcomingMeal, confirmMeal } = useData();
  const [timeLeft, setTimeLeft] = useState(upcomingMeal.timeRemainingMins * 60);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col xl:flex-row gap-8 w-full pb-10">
      
      {/* Left Column - Main Content Area */}
      <div className="flex-1 min-w-0">
        
        {/* Greeting row */}
        <motion.div variants={itemVariants} className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div className="mb-[5px]">
            <h2 className="font-serif text-[2rem] font-bold text-[var(--color-text-primary)] leading-[1.2] mb-1">
              Hello, {studentStats.name}! 👋
            </h2>
            <p className="text-[14px] text-[var(--color-text-secondary)] font-normal">Making campus greener daily 🌱</p>
          </div>
          
          <div className="inline-flex items-center bg-[rgba(255,255,255,0.65)] backdrop-blur-[12px] border border-[var(--color-border)] rounded-full p-1 gap-0.5 shadow-[var(--glass-shadow)]">
             <button className="px-5 py-1.5 rounded-full border-none font-sans text-[13px] font-semibold cursor-pointer transition-all duration-200 bg-[linear-gradient(135deg,var(--color-sage),var(--color-sky))] text-white shadow-[0_4px_12px_rgba(143,201,154,0.45)]">
               Today
             </button>
             <button className="px-5 py-1.5 rounded-full border-none font-sans text-[13px] font-semibold cursor-pointer transition-all bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]">
               Week
             </button>
          </div>
        </motion.div>

        {/* Impact Card */}
        <motion.div variants={itemVariants} className="bg-[linear-gradient(135deg,#8FC99A_0%,#A8D8B0_40%,#82C4F0_100%)] rounded-[22px] p-[26px_28px] mb-[22px] relative overflow-hidden shadow-[0_8px_32px_rgba(143,201,154,0.40)]">
          {/* Decorative circles */}
          <div className="absolute w-[280px] h-[280px] rounded-full bg-[rgba(255,255,255,0.12)] -top-[80px] -right-[60px]"></div>
          <div className="absolute w-[160px] h-[160px] rounded-full bg-[rgba(255,255,255,0.08)] -bottom-[40px] right-[80px]"></div>

          <div className="flex justify-between items-start mb-5 relative z-10">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[rgba(255,255,255,0.85)]">
              🏆 Sustainability Score
            </div>
            <div className="text-[2.8rem] font-extrabold text-white font-serif leading-none tracking-[-1px]">
              {studentStats.sustainabilityScore}
            </div>
          </div>
          
          <div className="bg-[rgba(255,255,255,0.30)] rounded-full h-[10px] mb-4 overflow-hidden relative z-10">
            <motion.div 
               initial={{ width: 0 }} animate={{ width: "82%" }} transition={{ duration: 1.2, ease: "easeOut" }}
               className="h-full bg-[linear-gradient(90deg,rgba(255,255,255,0.90),rgba(255,255,255,0.60))] rounded-full shadow-[0_0_12px_rgba(255,255,255,0.5)]" 
            />
          </div>
          
          <div className="flex justify-between items-center relative z-10">
            <div className="bg-[rgba(255,255,255,0.25)] backdrop-blur-sm border border-[rgba(255,255,255,0.40)] rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-white">
              🥇 Rank #{studentStats.rank} in Hostel
            </div>
            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-white">
              ♻️ {studentStats.wasteSavedKg.toFixed(1)}kg saved!
            </div>
          </div>
        </motion.div>

        {/* Meal Card */}
        <motion.div variants={itemVariants}>
          <div className="text-[16px] font-extrabold text-[var(--color-text-primary)] mb-4 tracking-[-0.2px]">Menu & Action</div>
          
          <AnimatePresence mode="popLayout">
            <motion.div key="meal-card" layout className="glass p-[22px_24px] mb-4">
              
              <div className="flex justify-between items-center mb-[18px]">
                <span className="bg-[linear-gradient(135deg,rgba(245,208,96,0.25),rgba(248,168,112,0.25))] border border-[rgba(245,208,96,0.40)] text-[#7A4A00] text-[10.5px] font-bold tracking-[1.5px] uppercase px-3 py-1 rounded-full">
                  ⏳ Upcoming
                </span>
                <span className="flex items-center gap-1.5 bg-[rgba(248,168,112,0.18)] border border-[rgba(248,168,112,0.35)] rounded-full px-3.5 py-1 text-[12.5px] font-bold text-[#8A3800]">
                  🕐 {formatTime(timeLeft)}
                </span>
              </div>

              <div className="font-serif text-[1.8rem] font-bold text-[var(--color-text-primary)] leading-[1.1] mb-1">
                {upcomingMeal.name}
              </div>
              <div className="text-[12px] text-[var(--color-text-muted)] mb-[18px]">
                {upcomingMeal.date}
              </div>

              <div className="text-[10px] font-bold tracking-[2px] uppercase text-[var(--color-text-muted)] mb-3 flex items-center gap-2 before:content-[''] before:w-4 before:h-0.5 before:bg-[var(--color-sage)] before:rounded-sm">
                🍴 Today's Menu
              </div>
              
              <div className="flex flex-wrap gap-2 mb-5">
                {upcomingMeal.menu.map((item, idx) => {
                  // Map colors based on index to mimic the HTML template's variety
                  const styleMap = [
                    { t: "tag-sage", d: "#5EA872" },
                    { t: "tag-butter", d: "#D4A800" },
                    { t: "tag-sky", d: "#4A9ED8" },
                    { t: "tag-lavender", d: "#8A6ED4" },
                    { t: "tag-peach", d: "#E07830" }
                  ];
                  const st = styleMap[idx % styleMap.length];
                  
                  return (
                    <div key={idx} className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[12.5px] font-semibold cursor-default hover:-translate-y-0.5 transition-transform ${st.t}`}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.d }}></span>
                      {item}
                    </div>
                  );
                })}
              </div>

              {/* Confirmation Action Area */}
              {upcomingMeal.userConfirmed === null ? (
                <div className="flex gap-2.5">
                  <button className="flex-1 p-3 rounded-[14px] border-none cursor-pointer font-sans text-[13px] font-bold transition-all hover:-translate-y-[3px] bg-[linear-gradient(135deg,var(--color-sage),var(--color-sky))] text-white shadow-[0_4px_16px_rgba(143,201,154,0.5)]" onClick={() => confirmMeal(true)}>
                    ✓ I'm Eating
                  </button>
                  <button className="flex-1 p-3 rounded-[14px] cursor-pointer font-sans text-[13px] font-bold transition-all hover:-translate-y-[3px] bg-[rgba(255,255,255,0.70)] backdrop-blur-[10px] text-[var(--color-text-secondary)] border-[1.5px] border-[rgba(255,255,255,0.9)] shadow-[var(--shadow-sm)]" onClick={() => confirmMeal(false)}>
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
                  <h3 className="text-xl font-black text-[#1A4024] tracking-tight mb-2">
                    {upcomingMeal.userConfirmed ? "Meal Confirmed! ✓" : "Meal Skipped! ✕"}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--color-text-secondary)]">
                    {upcomingMeal.userConfirmed ? "See you at the mess. Enjoy your meal! 🍛" : "Thank you for letting us know and saving food! 🌍"}
                  </p>
                  <button className="mt-4 text-[12px] font-bold text-[var(--color-text-muted)] hover:text-[var(--color-primary-900)] cursor-pointer bg-transparent border-none underline" onClick={() => confirmMeal(null)}>
                    Change Response
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right Column - Data/Overview Sidebar */}
      <div className="xl:w-[350px] shrink-0 flex flex-col gap-5">
        
        {/* Overview */}
        <motion.div variants={itemVariants} className="glass p-[22px]">
          <div className="text-[15px] font-extrabold text-[var(--color-text-primary)] mb-4">Overview</div>
          
          <div className="flex gap-3">
            <div className="flex-1 rounded-[16px] p-[16px_14px] text-center bg-[linear-gradient(135deg,rgba(143,201,154,0.25),rgba(200,237,208,0.40))] border border-[rgba(143,201,154,0.35)]">
              <motion.div key={studentStats.mealsAttended} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="font-serif text-[2rem] font-bold leading-none mb-1 text-[var(--color-sage-dark)]">
                {studentStats.mealsAttended}
              </motion.div>
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-[var(--color-sage-dark)]">Eaten</div>
            </div>
            
            <div className="flex-1 rounded-[16px] p-[16px_14px] text-center bg-[linear-gradient(135deg,rgba(240,160,160,0.20),rgba(250,212,212,0.35))] border border-[rgba(240,160,160,0.30)]">
              <motion.div key={studentStats.mealsSkipped} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="font-serif text-[2rem] font-bold leading-none mb-1 text-[#C04040]">
                {studentStats.mealsSkipped}
              </motion.div>
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-[#C04040]">Skipped</div>
            </div>
          </div>
        </motion.div>

        {/* GreenScore */}
        <motion.div variants={itemVariants} className="rounded-[20px] overflow-hidden bg-[linear-gradient(135deg,#B8A4E8_0%,#82C4F0_100%)] p-[20px_22px] shadow-[0_8px_28px_rgba(184,164,232,0.40)] relative">
          <div className="absolute w-[200px] h-[200px] rounded-full bg-[rgba(255,255,255,0.10)] -top-[60px] -right-[40px]"></div>
          
          <div className="text-[11px] font-bold tracking-[2px] uppercase text-[rgba(255,255,255,0.75)] mb-2 relative z-10">GreenStamp Score</div>
          <div className="flex items-baseline gap-2 mb-2.5 relative z-10">
            <div className="font-serif text-[2.4rem] font-bold text-white leading-none">78</div>
            <div className="text-[14px] text-[rgba(255,255,255,0.60)] font-semibold">/ 100</div>
          </div>
          <div className="bg-[rgba(255,255,255,0.25)] rounded-full h-[7px] overflow-hidden mb-3 relative z-10">
            <div className="w-[78%] h-full bg-[rgba(255,255,255,0.80)] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
          </div>
          <div className="text-[12px] text-[rgba(255,255,255,0.80)] font-medium relative z-10">🌿 4,200 kg CO₂ avoided</div>
        </motion.div>

        {/* This Week */}
        <motion.div variants={itemVariants} className="glass p-[22px] flex-1">
          <div className="flex justify-between items-center mb-4">
            <div className="text-[15px] font-extrabold text-[var(--color-text-primary)]">This Week</div>
            <a href="#" className="text-[12px] font-bold text-[var(--color-sage-dark)] cursor-pointer no-underline px-2.5 py-1 rounded-lg bg-[rgba(143,201,154,0.15)] hover:bg-[rgba(143,201,154,0.30)] transition-colors">View All</a>
          </div>

          <div className="flex items-center gap-3 p-[13px_14px] rounded-[14px] mb-2 cursor-pointer bg-[rgba(255,255,255,0.50)] border border-[rgba(255,255,255,0.80)] hover:bg-[rgba(255,255,255,0.80)] hover:translate-x-[3px] hover:shadow-[var(--shadow-sm)] transition-all">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-extrabold tracking-[0.5px] flex-shrink-0 bg-[linear-gradient(135deg,var(--color-lavender),var(--color-lavender-light))] text-[#38206A]">THU</div>
            <div className="flex-1">
              <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-[var(--color-text-muted)]">Breakfast</div>
              <div className="text-[13.5px] font-bold text-[var(--color-text-primary)] mt-0.5">Idli, Sambar</div>
            </div>
            <div className="text-[var(--color-text-muted)] text-[14px]">›</div>
          </div>

          <div className="flex items-center gap-3 p-[13px_14px] rounded-[14px] mb-2 cursor-pointer bg-[rgba(255,255,255,0.50)] border border-[rgba(255,255,255,0.80)] hover:bg-[rgba(255,255,255,0.80)] hover:translate-x-[3px] hover:shadow-[var(--shadow-sm)] transition-all">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-extrabold tracking-[0.5px] flex-shrink-0 bg-[linear-gradient(135deg,var(--color-sky),var(--color-sky-light))] text-[#0A2A5A]">FRI</div>
            <div className="flex-1">
              <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-[var(--color-text-muted)]">Lunch</div>
              <div className="text-[13.5px] font-bold text-[var(--color-text-primary)] mt-0.5">Veg Pulao</div>
            </div>
            <div className="text-[var(--color-text-muted)] text-[14px]">›</div>
          </div>

          <div className="flex items-center gap-3 p-[13px_14px] rounded-[14px] cursor-pointer bg-[rgba(255,255,255,0.50)] border border-[rgba(255,255,255,0.80)] hover:bg-[rgba(255,255,255,0.80)] hover:translate-x-[3px] hover:shadow-[var(--shadow-sm)] transition-all">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-extrabold tracking-[0.5px] flex-shrink-0 bg-[linear-gradient(135deg,var(--color-butter),var(--color-butter-light))] text-[#5A3800]">SAT</div>
            <div className="flex-1">
              <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-[var(--color-text-muted)]">Dinner</div>
              <div className="text-[13.5px] font-bold text-[var(--color-text-primary)] mt-0.5">Chole Bhature</div>
            </div>
            <div className="text-[var(--color-text-muted)] text-[14px]">›</div>
          </div>

        </motion.div>

      </div>
    </motion.div>
  );
}
