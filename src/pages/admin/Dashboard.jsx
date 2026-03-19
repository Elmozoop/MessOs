import { useState } from "react";
import { useData } from "../../context/DataContext";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { 
  Users, UserCheck, UserX, Target, Trash2, TrendingUp, AlertCircle, PlusCircle, CheckCircle2, ChevronRight
} from "lucide-react";
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { motion } from "framer-motion";

export function Dashboard() {
  const { adminMealStats, upcomingMeal, wasteData, logDailyWaste } = useData();
  const [wasteInput, setWasteInput] = useState("");
  const [loggedToday, setLoggedToday] = useState(false);

  const modelAccuracyData = [
    { day: "Mon", actual: 480, predicted: 500 },
    { day: "Tue", actual: 420, predicted: 430 },
    { day: "Wed", actual: 490, predicted: 485 },
    { day: "Thu", actual: 390, predicted: 410 },
    { day: "Fri", actual: 310, predicted: 320 },
    { day: "Sat", actual: 210, predicted: 240 },
    { day: "Sun", actual: 280, predicted: 290 },
  ];

  const wasteCompositionData = [
    { name: "Plate Scraps", value: 45, color: "#E8C4C4" },      // Rose
    { name: "Prep Waste", value: 30, color: "#F0E0A8" },        // Gold
    { name: "Overproduction", value: 25, color: "#D0C4E8" },    // Lavender
  ];

  const predictedCount = adminMealStats.predictionAttending;
  const foodRecommendations = [
    { item: "Rice", qty: Math.round(predictedCount * 0.18) + " kg", img: "🍚" },
    { item: "Dal Tadka", qty: Math.round(predictedCount * 0.08) + " kg", img: "🍲" },
    { item: "Paneer Masala", qty: Math.round(predictedCount * 0.12) + " kg", img: "🥘" },
  ];

  const handleLogWaste = (e) => {
    e.preventDefault();
    if (!wasteInput || isNaN(wasteInput)) return;
    logDailyWaste(wasteInput);
    setLoggedToday(true);
    setWasteInput("");
  };

  const StatCard = ({ title, value, subtext, icon: Icon, colorClass, highlight }) => (
    <motion.div whileHover={{ y: -4 }}>
      <Card className={`relative overflow-hidden h-full flex flex-col justify-between p-5 border-none shadow-sm ${highlight ? 'bg-gradient-to-br from-[var(--color-sage)] to-[var(--color-primary-600)] text-white' : 'bg-white dark:bg-slate-800'}`}>
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-2xl ${highlight ? 'bg-white/20 text-white' : colorClass}`}>
            <Icon className="w-6 h-6" />
          </div>
          {highlight && <Badge className="bg-white/20 text-white border-0">Live</Badge>}
        </div>
        <div>
          <h3 className={`text-3xl font-black font-sans tracking-tight mb-1 ${highlight ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
            {value}
          </h3>
          <p className={`text-sm font-semibold tracking-wide ${highlight ? 'text-emerald-50' : 'text-slate-500 dark:text-slate-400'}`}>
            {title}
          </p>
          {subtext && <p className={`text-[10px] font-bold mt-2 ${highlight ? 'text-emerald-100' : 'text-slate-400'}`}>{subtext}</p>}
        </div>
      </Card>
    </motion.div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col xl:flex-row gap-5 w-full pb-10">
      
      {/* Left Column - Main Content Area */}
      <div className="flex-1 min-w-0">
        
        {/* Greeting row */}
        <motion.div variants={itemVariants} className="flex items-start justify-between flex-wrap gap-3.5 mb-6">
          <div className="mb-1">
            <h2 className="font-serif text-[1.9rem] font-bold text-[var(--color-text-primary)] leading-[1.2] mb-1">
              Hello, Admin. K 👋
            </h2>
            <p className="text-[13.5px] text-[var(--color-text-secondary)] font-medium">Here's what's happening in your mess today.</p>
          </div>
          
          <div className="inline-flex items-center bg-[rgba(255,255,255,0.68)] backdrop-blur-[12px] border border-[var(--color-border)] rounded-full p-1 gap-0.5 shadow-[var(--glass-shadow)]">
             <button className="px-[22px] py-[7px] rounded-full border-none font-sans text-[13px] font-semibold cursor-pointer transition-all duration-200 bg-[linear-gradient(135deg,var(--color-sage),var(--color-sky))] text-white shadow-[0_4px_12px_rgba(143,201,154,0.45)]">
               Today
             </button>
             <button className="px-[22px] py-[7px] rounded-full border-none font-sans text-[13px] font-semibold cursor-pointer transition-all bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]">
               Week
             </button>
          </div>
        </motion.div>

        {/* Section Header: Stats */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-3.5">
          <span className="text-[13px] font-bold text-[var(--color-text-muted)] tracking-[1.5px] uppercase flex items-center gap-2 before:content-[''] before:w-3.5 before:h-0.5 before:bg-[var(--color-sage)] before:rounded-sm">
            Live Attendance Stats
          </span>
          <a href="#" className="font-sans text-[12px] font-bold text-[var(--color-sage-dark)] px-3 py-1 rounded-lg bg-[rgba(143,201,154,0.15)] cursor-pointer transition-colors hover:bg-[rgba(143,201,154,0.28)] flex items-center gap-1 no-underline">
            View All ›
          </a>
        </motion.div>

        {/* Stat Cards Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-[22px]">
          
          {/* Total Students */}
          <div className="rounded-[20px] p-[20px_18px] backdrop-blur-[20px] border border-[var(--color-border)] shadow-[var(--shadow-md),inset_0_1px_0_rgba(255,255,255,1)] transition-transform duration-300 hover:-translate-y-1 bg-[rgba(255,255,255,0.65)] relative overflow-hidden group">
            <div className="absolute w-[120px] h-[120px] rounded-full -top-[30px] -right-[30px] opacity-15 bg-[var(--color-sky)] transition-transform group-hover:scale-110"></div>
            <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-[17px] mb-3.5 bg-[rgba(130,196,240,0.20)] relative z-10">👥</div>
            <div className="font-serif text-[2.2rem] font-bold leading-none mb-1.5 text-[var(--color-text-primary)] relative z-10">{adminMealStats.totalStudents}</div>
            <div className="text-[12.5px] font-semibold text-[var(--color-text-secondary)] relative z-10">Total Students</div>
            <div className="text-[11px] font-medium mt-1 text-[var(--color-text-muted)] relative z-10">Registered this semester</div>
          </div>

          {/* Confirmed Yes */}
          <div className="rounded-[20px] p-[20px_18px] backdrop-blur-[20px] border border-[var(--color-border)] shadow-[var(--shadow-md),inset_0_1px_0_rgba(255,255,255,1)] transition-transform duration-300 hover:-translate-y-1 bg-[linear-gradient(135deg,rgba(143,201,154,0.22),rgba(200,237,208,0.35))] relative overflow-hidden group">
            <div className="absolute w-[120px] h-[120px] rounded-full -top-[30px] -right-[30px] opacity-15 bg-[var(--color-sage)] transition-transform group-hover:scale-110"></div>
            <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-[17px] mb-3.5 bg-[rgba(143,201,154,0.25)] relative z-10">✅</div>
            <div className="font-serif text-[2.2rem] font-bold leading-none mb-1.5 text-[var(--color-sage-dark)] relative z-10">{adminMealStats.confirmedYes}</div>
            <div className="text-[12.5px] font-semibold text-[var(--color-sage-dark)] relative z-10">Confirmed Yes</div>
            <div className="text-[11px] font-medium mt-1 text-[rgba(74,148,96,0.75)] relative z-10">{((adminMealStats.confirmedYes / adminMealStats.totalStudents) * 100).toFixed(1)}% response rate</div>
          </div>

          {/* Skipped */}
          <div className="rounded-[20px] p-[20px_18px] backdrop-blur-[20px] border border-[var(--color-border)] shadow-[var(--shadow-md),inset_0_1px_0_rgba(255,255,255,1)] transition-transform duration-300 hover:-translate-y-1 bg-[linear-gradient(135deg,rgba(240,160,160,0.18),rgba(250,212,212,0.30))] relative overflow-hidden group">
            <div className="absolute w-[120px] h-[120px] rounded-full -top-[30px] -right-[30px] opacity-15 bg-[var(--color-blush)] transition-transform group-hover:scale-110"></div>
            <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-[17px] mb-3.5 bg-[rgba(240,160,160,0.20)] relative z-10">⏭️</div>
            <div className="font-serif text-[2.2rem] font-bold leading-none mb-1.5 text-[#C04040] relative z-10">{adminMealStats.confirmedNo}</div>
            <div className="text-[12.5px] font-semibold text-[#C04040] relative z-10">Skipped Meal</div>
            <div className="text-[11px] font-medium mt-1 text-[rgba(192,64,64,0.70)] relative z-10">{((adminMealStats.confirmedNo / adminMealStats.totalStudents) * 100).toFixed(1)}% skip rate today</div>
          </div>

          {/* AI */}
          <div className="rounded-[20px] p-[20px_18px] backdrop-blur-[20px] shadow-[0_8px_28px_rgba(143,201,154,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] transition-transform duration-300 hover:-translate-y-1 bg-[linear-gradient(135deg,var(--color-sage)_0%,var(--color-sky)_100%)] border-none relative overflow-hidden group">
            <div className="inline-flex items-center gap-1.5 bg-[rgba(255,255,255,0.28)] border border-[rgba(255,255,255,0.45)] rounded-full px-2.5 py-1 text-[10px] font-bold text-white tracking-[0.5px] mb-2.5 relative z-10">
               <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>Live
            </div>
            <div className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-[17px] mb-3.5 bg-[rgba(255,255,255,0.25)] relative z-10">🎯</div>
            <div className="font-serif text-[2.2rem] font-bold leading-none mb-1.5 text-white relative z-10">{adminMealStats.predictionAttending}</div>
            <div className="text-[12.5px] font-semibold text-[rgba(255,255,255,0.85)] relative z-10">AI Prediction</div>
            <div className="text-[11px] font-medium mt-1 text-[rgba(255,255,255,0.65)] relative z-10">Expected attendance</div>
          </div>

        </motion.div>

        {/* Section Header: Analytics */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-3.5 mt-2">
          <span className="text-[13px] font-bold text-[var(--color-text-muted)] tracking-[1.5px] uppercase flex items-center gap-2 before:content-[''] before:w-3.5 before:h-0.5 before:bg-[var(--color-sage)] before:rounded-sm">
            Analytics
          </span>
        </motion.div>

        {/* Charts Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          
          {/* Chart 1 */}
          <div className="bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[var(--color-border)] rounded-[22px] p-[22px_24px] shadow-[var(--shadow-md),inset_0_1px_0_rgba(255,255,255,1)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[14px] font-extrabold text-[var(--color-text-primary)]">Attendance Trend</span>
              <span className="text-[10.5px] font-bold px-3 py-1 rounded-full tracking-[0.5px] bg-[var(--color-sky-light)] text-[#3A8FD0]">Weekly</span>
            </div>
            <div className="relative h-[280px]">
               <ResponsiveContainer width="99%" height="100%">
                  <AreaChart data={wasteData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A1A2E" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#1A1A2E" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8FC99A" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#8FC99A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0, 0, 0, 0.05)" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#8A8AAA', fontSize: 11 }} dy={10} />
                  <YAxis yAxisId="left" tick={{ fill: '#8A8AAA', fontSize: 11 }} axisLine={false} tickLine={false} dx={-10} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#8A8AAA', fontSize: 11 }} axisLine={false} tickLine={false} dx={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.90)', borderRadius: '12px', borderColor: 'rgba(255,255,255,0.85)', padding: '10px' }}
                    itemStyle={{ color: '#4A4A6A', fontWeight: 'bold' }}
                  />
                  <Area yAxisId="left" type="monotone" dataKey="wasteKg" stroke="#1A1A2E" strokeWidth={2.5} fillOpacity={1} fill="url(#colorWaste)" name="Waste (kg)" />
                  <Area yAxisId="right" type="monotone" dataKey="attendance" stroke="#8FC99A" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAtt)" name="Attendance" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2 */}
          <div className="bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[var(--color-border)] rounded-[22px] p-[22px_24px] shadow-[var(--shadow-md),inset_0_1px_0_rgba(255,255,255,1)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[14px] font-extrabold text-[var(--color-text-primary)]">Model Accuracy</span>
              <span className="text-[10.5px] font-bold px-3 py-1 rounded-full tracking-[0.5px] bg-[var(--color-sage-light)] text-[var(--color-sage-dark)]">94% Max</span>
            </div>
            <div className="relative h-[280px]">
               <ResponsiveContainer width="99%" height="100%">
                <BarChart data={modelAccuracyData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(0, 0, 0, 0.05)" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#8A8AAA', fontSize: 11 }} domain={[0, 600]} />
                  <YAxis type="category" dataKey="day" reversed={true} axisLine={false} tickLine={false} tick={{ fill: '#4A4A6A', fontSize: 11, fontWeight: 600 }} dx={-10} width={40} />
                  <Tooltip 
                    cursor={{fill: 'rgba(0,0,0,0.04)'}}
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.90)', borderRadius: '12px', borderColor: 'rgba(255,255,255,0.85)', padding: '10px' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontWeight: '600' }} />
                  <Bar dataKey="predicted" name="AI Predicted" fill="rgba(184,164,232,0.70)" stroke="#B8A4E8" strokeWidth={1.5} radius={8} barSize={14} />
                  <Bar dataKey="actual" name="Actual" fill="rgba(143,201,154,0.70)" stroke="#8FC99A" strokeWidth={1.5} radius={8} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </motion.div>

      </div>

      {/* Right Column */}
      <div className="xl:w-[288px] shrink-0 flex flex-col gap-[18px]">
        
        {/* Target Audience Card */}
        <motion.div variants={itemVariants} className="bg-[linear-gradient(145deg,var(--color-lavender)_0%,#9B8AD0_100%)] rounded-[22px] p-[22px] shadow-[0_8px_32px_rgba(184,164,232,0.45)] relative overflow-hidden">
          <div className="absolute w-[200px] h-[200px] rounded-full bg-[rgba(255,255,255,0.10)] -top-[60px] -right-[40px]"></div>
          <div className="absolute w-[120px] h-[120px] rounded-full bg-[rgba(255,255,255,0.07)] -bottom-[30px] -left-[20px]"></div>
          
          <div className="flex justify-between items-start mb-2 relative z-10">
            <span className="text-[10px] font-bold tracking-[2px] uppercase text-[rgba(255,255,255,0.72)]">Target Audience</span>
            <div className="w-[34px] h-[34px] rounded-[10px] bg-[rgba(255,255,255,0.20)] border border-[rgba(255,255,255,0.30)] flex items-center justify-center text-[14px] cursor-pointer">🎯</div>
          </div>
          <div className="font-serif text-[3rem] font-bold text-white leading-none mb-5 relative z-10">{adminMealStats.predictionAttending}</div>
          
          <div className="text-[9.5px] font-extrabold tracking-[2px] uppercase text-[rgba(255,255,255,0.65)] mb-3 relative z-10">AI Recommended Quantities</div>
          
          <div className="relative z-10">
            {foodRecommendations.map((rec, i) => {
              // Map index to specific colors for dots
              const dots = ["#F0A0A0", "#F8A870", "#F5D060", "#8FC99A"];
              return (
                <div key={i} className="flex items-center justify-between py-[11px] border-b border-[rgba(255,255,255,0.15)] last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-[10px]">
                    <div className="w-[10px] h-[10px] rounded-full shrink-0" style={{ background: dots[i % dots.length] }}></div>
                    <span className="text-[13.5px] font-semibold text-white">{rec.item}</span>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.20)] border border-[rgba(255,255,255,0.30)] rounded-[10px] px-3 py-1 text-[12px] font-bold text-white">
                    {rec.qty}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Donut Card */}
        <motion.div variants={itemVariants} className="bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[var(--color-border)] rounded-[22px] p-[22px] shadow-[var(--shadow-md),inset_0_1px_0_rgba(255,255,255,1)] flex-1">
          <div className="flex justify-between items-center mb-[18px]">
            <span className="text-[14px] font-extrabold text-[var(--color-text-primary)]">Waste Breakdown</span>
            <span className="text-[10.5px] font-bold px-3 py-1 rounded-full tracking-[0.5px] bg-[var(--color-sage-light)] text-[var(--color-sage-dark)]">Today</span>
          </div>
          
          <div className="relative h-[160px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteCompositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius="68%"
                  outerRadius="100%"
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={3}
                >
                  {wasteCompositionData.map((entry, index) => {
                    const colors = ["#8FC99A", "#F0A0A0", "#F5D060"]; // Consumed(concept), Wasted, Saved
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.90)', borderRadius: '12px', borderColor: 'rgba(255,255,255,0.85)', padding: '10px' }}
                  itemStyle={{ fontWeight: 'bold' }}
                  formatter={(value) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center bg-transparent pointer-events-none">
               <div className="font-serif text-[1.8rem] font-bold text-[var(--color-text-primary)] leading-none">{wasteCompositionData[1].value}%</div>
               <div className="text-[10px] font-bold tracking-[1px] uppercase text-[var(--color-text-muted)] mt-[3px]">Wasted</div>
            </div>
          </div>
          
          <div className="flex gap-[14px] mt-[24px] flex-wrap justify-center">
            {wasteCompositionData.map((item, idx) => {
               const colors = ["#8FC99A", "#F0A0A0", "#F5D060"];
               return (
                 <div key={idx} className="flex items-center gap-[6px] text-[11.5px] font-semibold text-[var(--color-text-secondary)]">
                   <div className="w-2 h-2 rounded-full shrink-0" style={{ background: colors[idx % colors.length] }}></div>
                   {item.name}
                 </div>
               );
            })}
          </div>
        </motion.div>

        {/* Action Panel - Log Waste */}
        <motion.div variants={itemVariants} className="bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[var(--color-border)] rounded-[22px] p-[22px] shadow-[var(--shadow-md),inset_0_1px_0_rgba(255,255,255,1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-[34px] h-[34px] rounded-[10px] bg-[rgba(240,160,160,0.20)] flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-[#C04040]" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-[var(--color-text-primary)]">Log Mess Waste</h3>
                <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.5px]">End of day tally</p>
              </div>
            </div>
            
            {!loggedToday ? (
              <form onSubmit={handleLogWaste} className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    step="0.1"
                    required
                    placeholder="KG amount" 
                    value={wasteInput}
                    onChange={(e) => setWasteInput(e.target.value)}
                    className="flex-1 bg-[rgba(255,255,255,0.68)] border border-[var(--color-border)] rounded-[12px] px-4 py-2 text-[13px] font-bold focus:outline-none focus:border-[rgba(143,201,154,0.5)] focus:shadow-[0_0_0_3px_rgba(143,201,154,0.15)] transition-all shadow-sm"
                  />
                  <button type="submit" className="shrink-0 bg-[linear-gradient(135deg,var(--color-sage),var(--color-sky))] text-white rounded-[12px] w-[42px] h-[42px] flex items-center justify-center shadow-[0_4px_12px_rgba(143,201,154,0.45)] border-none shrink-0 cursor-pointer">
                    <PlusCircle className="w-5 h-5"/>
                  </button>
                </div>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[linear-gradient(135deg,rgba(143,201,154,0.18),rgba(130,196,240,0.12))] border border-[rgba(143,201,154,0.28)] rounded-[14px] p-3 text-center">
                <CheckCircle2 className="w-6 h-6 text-[var(--color-sage-dark)] mx-auto mb-1" />
                <p className="font-bold text-[12px] text-[var(--color-sage-dark)]">Logged Successfully</p>
              </motion.div>
            )}
        </motion.div>

      </div>

    </motion.div>
  );
}
