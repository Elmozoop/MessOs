import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, Target, Trash2, PlusCircle, CheckCircle2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { useData } from '../../context/DataContext';

import type {
  ModelAccuracyDataPoint,
  WasteCompositionDataPoint,
  FoodRecommendation,
} from '../../types';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  highlight?: boolean;
}

const StatCard = ({ title, value, subtext, icon: Icon, colorClass, highlight }: StatCardProps) => (
  <motion.div whileHover={{ y: -4 }}>
    <Card
      className={`relative flex h-full flex-col justify-between overflow-hidden border-none p-5 shadow-sm ${highlight ? 'bg-gradient-to-br from-[var(--color-sage)] to-[var(--color-primary-600)] text-white' : 'bg-white dark:bg-slate-800'}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className={`rounded-2xl p-3 ${highlight ? 'bg-white/20 text-white' : colorClass}`}>
          <Icon className="h-6 w-6" />
        </div>
        {highlight && <Badge className="border-0 bg-white/20 text-white">Live</Badge>}
      </div>
      <div>
        <h3
          className={`mb-1 font-sans text-3xl font-black tracking-tight ${highlight ? 'text-white' : 'text-slate-800 dark:text-white'}`}
        >
          {value}
        </h3>
        <p
          className={`text-sm font-semibold tracking-wide ${highlight ? 'text-emerald-50' : 'text-slate-500 dark:text-slate-400'}`}
        >
          {title}
        </p>
        {subtext && (
          <p
            className={`mt-2 text-[10px] font-bold ${highlight ? 'text-emerald-100' : 'text-slate-400'}`}
          >
            {subtext}
          </p>
        )}
      </div>
    </Card>
  </motion.div>
);

export function Dashboard() {
  const { adminMealStats, wasteData, logDailyWaste } = useData();
  const [wasteInput, setWasteInput] = useState('');
  const [loggedToday, setLoggedToday] = useState(false);

  const modelAccuracyData: ModelAccuracyDataPoint[] = [
    { day: 'Mon', actual: 480, predicted: 500 },
    { day: 'Tue', actual: 420, predicted: 430 },
    { day: 'Wed', actual: 490, predicted: 485 },
    { day: 'Thu', actual: 390, predicted: 410 },
    { day: 'Fri', actual: 310, predicted: 320 },
    { day: 'Sat', actual: 210, predicted: 240 },
    { day: 'Sun', actual: 280, predicted: 290 },
  ];

  const wasteCompositionData: WasteCompositionDataPoint[] = [
    { name: 'Plate Scraps', value: 45, color: '#E8C4C4' },
    { name: 'Prep Waste', value: 30, color: '#F0E0A8' },
    { name: 'Overproduction', value: 25, color: '#D0C4E8' },
  ];

  const predictedCount = adminMealStats.predictionAttending;
  const foodRecommendations: FoodRecommendation[] = [
    { item: 'Rice', qty: `${Math.round(predictedCount * 0.18)} kg`, img: '🍚' },
    { item: 'Dal Tadka', qty: `${Math.round(predictedCount * 0.08)} kg`, img: '🍲' },
    { item: 'Paneer Masala', qty: `${Math.round(predictedCount * 0.12)} kg`, img: '🥘' },
  ];

  const handleLogWaste = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!wasteInput || isNaN(Number(wasteInput))) return;
    logDailyWaste(Number(wasteInput));
    setLoggedToday(true);
    setWasteInput('');
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
      className="flex w-full flex-col gap-5 pb-10 xl:flex-row"
    >
      <div className="min-w-0 flex-1">
        <motion.div
          variants={itemVariants}
          className="mb-6 flex flex-wrap items-start justify-between gap-3.5"
        >
          <div className="mb-1">
            <h2 className="mb-1 font-serif text-[1.9rem] leading-[1.2] font-bold text-[var(--color-text-primary)]">
              Hello, Admin. K 👋
            </h2>
            <p className="text-[13.5px] font-medium text-[var(--color-text-secondary)]">
              Here's what's happening in your mess today.
            </p>
          </div>

          <div className="inline-flex items-center gap-0.5 rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.68)] p-1 shadow-[var(--glass-shadow)] backdrop-blur-[12px]">
            <button className="cursor-pointer rounded-full border-none bg-[linear-gradient(135deg,var(--color-sage),var(--color-sky))] px-[22px] py-[7px] font-sans text-[13px] font-semibold text-white shadow-[0_4px_12px_rgba(143,201,154,0.45)] transition-all duration-200">
              Today
            </button>
            <button className="cursor-pointer rounded-full border-none bg-transparent px-[22px] py-[7px] font-sans text-[13px] font-semibold text-[var(--color-text-muted)] transition-all hover:text-[var(--color-text-secondary)]">
              Week
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-3.5 flex items-center justify-between">
          <span className="flex items-center gap-2 text-[13px] font-bold tracking-[1.5px] text-[var(--color-text-muted)] uppercase before:h-0.5 before:w-3.5 before:rounded-sm before:bg-[var(--color-sage)] before:content-['']">
            Live Attendance Stats
          </span>
          <a
            href="#"
            className="flex cursor-pointer items-center gap-1 rounded-lg bg-[rgba(143,201,154,0.15)] px-3 py-1 font-sans text-[12px] font-bold text-[var(--color-sage-dark)] no-underline transition-colors hover:bg-[rgba(143,201,154,0.28)]"
          >
            View All ›
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-[22px] grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
        >
          <StatCard
            title="Total Students"
            value={adminMealStats.totalStudents}
            subtext="Registered this semester"
            icon={Users}
            colorClass="bg-[rgba(130,196,240,0.20)]"
          />

          <StatCard
            title="Confirmed Yes"
            value={adminMealStats.confirmedYes}
            subtext={`${((adminMealStats.confirmedYes / adminMealStats.totalStudents) * 100).toFixed(1)}% response rate`}
            icon={UserCheck}
            colorClass="bg-[rgba(143,201,154,0.25)]"
          />

          <StatCard
            title="Skipped Meal"
            value={adminMealStats.confirmedNo}
            subtext={`${((adminMealStats.confirmedNo / adminMealStats.totalStudents) * 100).toFixed(1)}% skip rate today`}
            icon={UserX}
            colorClass="bg-[rgba(240,160,160,0.20)]"
          />

          <StatCard
            title="AI Prediction"
            value={adminMealStats.predictionAttending}
            subtext="Expected attendance"
            icon={Target}
            colorClass="bg-white/20"
            highlight
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-2 mb-3.5 flex items-center justify-between"
        >
          <span className="flex items-center gap-2 text-[13px] font-bold tracking-[1.5px] text-[var(--color-text-muted)] uppercase before:h-0.5 before:w-3.5 before:rounded-sm before:bg-[var(--color-sage)] before:content-['']">
            Analytics
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="rounded-[22px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.65)] p-[22px_24px] shadow-[var(--shadow-md),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-[20px]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[14px] font-extrabold text-[var(--color-text-primary)]">
                Attendance Trend
              </span>
              <span className="rounded-full bg-[var(--color-sky-light)] px-3 py-1 text-[10.5px] font-bold tracking-[0.5px] text-[#3A8FD0]">
                Weekly
              </span>
            </div>
            <div className="relative h-[280px]">
              <ResponsiveContainer width="99%" height="100%">
                <AreaChart data={wasteData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A1A2E" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#1A1A2E" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8FC99A" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#8FC99A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(0, 0, 0, 0.05)"
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#8A8AAA', fontSize: 11 }}
                    dy={10}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: '#8A8AAA', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    dx={-10}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: '#8A8AAA', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    dx={10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.90)',
                      borderRadius: '12px',
                      borderColor: 'rgba(255,255,255,0.85)',
                      padding: '10px',
                    }}
                    itemStyle={{ color: '#4A4A6A', fontWeight: 'bold' }}
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="wasteKg"
                    stroke="#1A1A2E"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorWaste)"
                    name="Waste (kg)"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="attendance"
                    stroke="#8FC99A"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorAtt)"
                    name="Attendance"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[22px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.65)] p-[22px_24px] shadow-[var(--shadow-md),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-[20px]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[14px] font-extrabold text-[var(--color-text-primary)]">
                Model Accuracy
              </span>
              <span className="rounded-full bg-[var(--color-sage-light)] px-3 py-1 text-[10.5px] font-bold tracking-[0.5px] text-[var(--color-sage-dark)]">
                94% Max
              </span>
            </div>
            <div className="relative h-[280px]">
              <ResponsiveContainer width="99%" height="100%">
                <BarChart
                  data={modelAccuracyData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={true}
                    vertical={false}
                    stroke="rgba(0, 0, 0, 0.05)"
                  />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#8A8AAA', fontSize: 11 }}
                    domain={[0, 600]}
                  />
                  <YAxis
                    type="category"
                    dataKey="day"
                    reversed={true}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#4A4A6A', fontSize: 11, fontWeight: 600 }}
                    dx={-10}
                    width={40}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.90)',
                      borderRadius: '12px',
                      borderColor: 'rgba(255,255,255,0.85)',
                      padding: '10px',
                    }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontWeight: '600' }}
                  />
                  <Bar
                    dataKey="predicted"
                    name="AI Predicted"
                    fill="rgba(184,164,232,0.70)"
                    stroke="#B8A4E8"
                    strokeWidth={1.5}
                    radius={8}
                    barSize={14}
                  />
                  <Bar
                    dataKey="actual"
                    name="Actual"
                    fill="rgba(143,201,154,0.70)"
                    stroke="#8FC99A"
                    strokeWidth={1.5}
                    radius={8}
                    barSize={14}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex shrink-0 flex-col gap-[18px] xl:w-[288px]">
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-[22px] bg-[linear-gradient(145deg,var(--color-lavender)_0%,#9B8AD0_100%)] p-[22px] shadow-[0_8px_32px_rgba(184,164,232,0.45)]"
        >
          <div className="absolute -top-[60px] -right-[40px] h-[200px] w-[200px] rounded-full bg-[rgba(255,255,255,0.10)]" />
          <div className="absolute -bottom-[30px] -left-[20px] h-[120px] w-[120px] rounded-full bg-[rgba(255,255,255,0.07)]" />

          <div className="relative z-10 mb-2 flex items-start justify-between">
            <span className="text-[10px] font-bold tracking-[2px] text-[rgba(255,255,255,0.72)] uppercase">
              Target Audience
            </span>
            <div className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border border-[rgba(255,255,255,0.30)] bg-[rgba(255,255,255,0.20)] text-[14px]">
              🎯
            </div>
          </div>
          <div className="text-3rem relative z-10 mb-5 font-serif leading-none font-bold text-white">
            {adminMealStats.predictionAttending}
          </div>

          <div className="relative z-10 mb-3 text-[9.5px] font-extrabold tracking-[2px] text-[rgba(255,255,255,0.65)] uppercase">
            AI Recommended Quantities
          </div>

          <div className="relative z-10">
            {foodRecommendations.map((rec, i) => {
              const dots = ['#F0A0A0', '#F8A870', '#F5D060', '#8FC99A'];
              return (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-[rgba(255,255,255,0.15)] py-[11px] last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-[10px]">
                    <div
                      className="h-[10px] w-[10px] shrink-0 rounded-full"
                      style={{ background: dots[i % dots.length] }}
                    />
                    <span className="text-[13.5px] font-semibold text-white">{rec.item}</span>
                  </div>
                  <div className="flex h-[12px] items-center justify-center rounded-[10px] border border-[rgba(255,255,255,0.30)] bg-[rgba(255,255,255,0.20)] px-3 py-1 text-[12px] font-bold text-white">
                    {rec.qty}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex-1 rounded-[22px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.65)] p-[22px] shadow-[var(--shadow-md),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-[20px]"
        >
          <div className="mb-[18px] flex items-center justify-between">
            <span className="text-[14px] font-extrabold text-[var(--color-text-primary)]">
              Waste Breakdown
            </span>
            <span className="rounded-full bg-[var(--color-sage-light)] px-3 py-1 text-[10.5px] font-bold tracking-[0.5px] text-[var(--color-sage-dark)]">
              Today
            </span>
          </div>

          <div className="relative flex h-[160px] items-center justify-center">
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
                  {wasteCompositionData.map((_, index) => {
                    const colors = ['#8FC99A', '#F0A0A0', '#F5D060'];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255,255,255,0.90)',
                    borderRadius: '12px',
                    borderColor: 'rgba(255,255,255,0.85)',
                    padding: '10px',
                  }}
                  itemStyle={{ fontWeight: 'bold' }}
                  formatter={(value: number) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute bg-transparent text-center">
              <div className="font-serif text-[1.8rem] leading-none font-bold text-[var(--color-text-primary)]">
                {wasteCompositionData[1].value}%
              </div>
              <div className="mt-[3px] text-[10px] font-bold tracking-[1px] text-[var(--color-text-muted)] uppercase">
                Wasted
              </div>
            </div>
          </div>

          <div className="mt-[24px] flex flex-wrap justify-center gap-[14px]">
            {wasteCompositionData.map((item, idx) => {
              const colors = ['#8FC99A', '#F0A0A0', '#F5D060'];
              return (
                <div
                  key={idx}
                  className="flex items-center gap-[6px] text-[11.5px] font-semibold text-[var(--color-text-secondary)]"
                >
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: colors[idx % colors.length] }}
                  />
                  {item.name}
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-[22px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.65)] p-[22px] shadow-[var(--shadow-md),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-[20px]"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-[rgba(240,160,160,0.20)]">
              <Trash2 className="h-4 w-4 text-[#C04040]" />
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-[var(--color-text-primary)]">
                Log Mess Waste
              </h3>
              <p className="text-[10px] font-bold tracking-[0.5px] text-[var(--color-text-muted)] uppercase">
                End of day tally
              </p>
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
                  onChange={e => setWasteInput(e.target.value)}
                  className="flex-1 rounded-[12px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.68)] px-4 py-2 text-[13px] font-bold shadow-sm transition-all focus:border-[rgba(143,201,154,0.5)] focus:shadow-[0_0_0_3px_rgba(143,201,154,0.15)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-[42px] w-[42px] shrink-0 cursor-pointer items-center justify-center rounded-[12px] border-none bg-[linear-gradient(135deg,var(--color-sage),var(--color-sky))] text-white shadow-[0_4px_12px_rgba(143,201,154,0.45)]"
                >
                  <PlusCircle className="h-5 w-5" />
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[14px] border border-[rgba(143,201,154,0.28)] bg-[linear-gradient(135deg,rgba(143,201,154,0.18),rgba(130,196,240,0.12))] p-3 text-center"
            >
              <CheckCircle2 className="mx-auto mb-1 h-6 w-6 text-[var(--color-sage-dark)]" />
              <p className="text-[12px] font-bold text-[var(--color-sage-dark)]">
                Logged Successfully
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
