import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  LayoutDashboard,
  Smartphone,
  Settings,
  HelpCircle,
  Bell,
  Menu,
  Moon,
  Sun,
  Shield,
} from 'lucide-react';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { useTheme } from '../../context/ThemeContext';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}

interface BottomNavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarContentProps {
  navItems: NavItem[];
  bottomNavItems: BottomNavItem[];
  setMobileMenuOpen: (open: boolean) => void;
}

const SidebarContent = ({ navItems, bottomNavItems, setMobileMenuOpen }: SidebarContentProps) => (
  <>
    <div className="mt-2 flex items-center gap-3 px-6 py-8">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-sage-dark)] shadow-[0_4px_16px_rgba(143,201,154,0.4)]">
        <Leaf className="h-5 w-5 text-white" />
      </div>
      <span className="ml-1 text-[22px] font-black tracking-tight text-[var(--color-text-primary)] dark:text-white">
        MessOS
      </span>
    </div>

    <nav className="mt-4 flex-1 space-y-1.5 px-5">
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Link
            key={idx}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
            className="relative mb-1 block"
          >
            {item.isActive && (
              <motion.div
                layoutId="active-nav"
                className="absolute inset-0 rounded-[14px] bg-[var(--color-sage-light)]/80 text-[#161722]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <div
              className={`relative z-10 flex items-center gap-3.5 rounded-[14px] px-4 py-3.5 text-[14.5px] font-bold transition-colors ${item.isActive ? 'text-[var(--color-sage-dark)] shadow-[inset_4px_0_0_var(--color-sage-dark)]' : 'text-[var(--color-text-muted)] hover:bg-slate-50/50 hover:text-[var(--color-text-primary)] dark:hover:bg-slate-800/50 dark:hover:text-[var(--color-sage)]'}`}
            >
              <Icon
                className={`h-5 w-5 ${item.isActive ? 'text-[var(--color-sage-dark)]' : 'opacity-80'}`}
              />
              {item.label}
            </div>
          </Link>
        );
      })}
    </nav>

    <div className="mb-4 space-y-1.5 border-t border-slate-200/50 px-5 py-6 dark:border-slate-800/50">
      {bottomNavItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Link
            key={idx}
            to={item.path}
            className="flex items-center gap-3.5 rounded-[14px] px-4 py-3 text-[14.5px] font-bold text-[var(--color-text-muted)] transition-colors hover:bg-slate-50/50 hover:text-[var(--color-text-primary)] dark:hover:bg-slate-800/50 dark:hover:text-slate-300"
          >
            <Icon className="h-5 w-5 opacity-80" />
            {item.label}
          </Link>
        );
      })}
    </div>
  </>
);

export function MainLayout() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isStudentView = location.pathname.startsWith('/student');
  const isAdminView = location.pathname.startsWith('/admin');

  const navItems: NavItem[] = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, isActive: isAdminView },
    { path: '/student', label: 'Student Demo', icon: Smartphone, isActive: isStudentView },
    { path: '#', label: 'Order', icon: Shield, isActive: false },
    { path: '#', label: 'Messages', icon: Bell, isActive: false },
    { path: '#', label: 'Activity', icon: LayoutDashboard, isActive: false },
  ];

  const bottomNavItems: BottomNavItem[] = [
    { path: '#', label: 'Get Help', icon: HelpCircle },
    { path: '#', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-canvas flex min-h-screen w-full overflow-hidden font-sans">
      <aside className="z-20 hidden h-screen w-[260px] shrink-0 flex-col border-r border-white/40 bg-white/50 shadow-[4px_0_32px_rgba(0,0,0,0.02)] backdrop-blur-xl lg:flex dark:border-slate-800/50">
        <SidebarContent
          navItems={navItems}
          bottomNavItems={bottomNavItems}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </aside>

      <div className="relative z-10 flex h-screen flex-1 flex-col overflow-hidden">
        <header className="z-20 flex h-[88px] shrink-0 items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="-ml-2 rounded-xl p-2 text-[var(--color-text-secondary)] hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <span className="text-xl font-black text-[var(--color-sage)]">MessOS</span>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-100 bg-white text-[var(--color-text-muted)] shadow-sm transition-colors hover:text-[var(--color-sage)] dark:border-slate-700 dark:bg-slate-800"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-100 bg-white text-[var(--color-text-muted)] shadow-sm transition-colors hover:text-[var(--color-rose)] dark:border-slate-700 dark:bg-slate-800"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span
                className="absolute top-2.5 right-3 h-2.5 w-2.5 rounded-full border-2 border-white bg-[var(--color-rose)] dark:border-slate-800"
                aria-hidden="true"
              ></span>
            </button>

            <div className="ml-2 flex cursor-pointer items-center gap-3 border-l border-slate-200 pl-4 transition-opacity hover:opacity-80 dark:border-slate-700">
              <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-[var(--color-sky)]">
                <img
                  src="https://api.dicebear.com/9.x/notionists/svg?seed=Admin"
                  alt="Profile"
                  className="h-full w-full bg-slate-100 object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-[var(--color-text-primary)] dark:text-slate-200">
                  Admin_K.
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full flex-1 overflow-x-hidden overflow-y-auto p-4 pt-0 lg:p-8">
          <Outlet />
        </main>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-white shadow-2xl lg:hidden dark:bg-slate-900"
            >
              <SidebarContent
                navItems={navItems}
                bottomNavItems={bottomNavItems}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
