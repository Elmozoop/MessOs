import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { 
  Leaf, LayoutDashboard, Smartphone, User, Settings, HelpCircle,
  Bell, Search, Menu, Moon, Sun, Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function MainLayout() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine active view
  const isStudentView = location.pathname.startsWith("/student");
  const isAdminView = location.pathname.startsWith("/admin");

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard, isActive: isAdminView },
    { path: "/student", label: "Student Demo", icon: Smartphone, isActive: isStudentView },
    // Adding dummy items to match the aesthetic of the image
    { path: "#", label: "Order", icon: Shield, isActive: false },
    { path: "#", label: "Messages", icon: Bell, isActive: false },
    { path: "#", label: "Activity", icon: LayoutDashboard, isActive: false },
  ];

  const bottomNavItems = [
    { path: "#", label: "Get Help", icon: HelpCircle },
    { path: "#", label: "Settings", icon: Settings },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 px-6 py-8 mt-2">
        <div className="w-10 h-10 rounded-2xl bg-[var(--color-sage-dark)] flex items-center justify-center shadow-[0_4px_16px_rgba(143,201,154,0.4)]">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <span className="text-[22px] font-black text-[var(--color-text-primary)] dark:text-white tracking-tight ml-1">
          MessOS
        </span>
      </div>

      <nav className="flex-1 px-5 mt-4 space-y-1.5">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link key={idx} to={item.path} onClick={() => setMobileMenuOpen(false)} className="block relative mb-1">
              {item.isActive && (
                <motion.div layoutId="active-nav" className="absolute inset-0 bg-[var(--color-sage-light)]/80 text-[#161722] rounded-[14px]" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <div className={`relative z-10 flex items-center gap-3.5 px-4 py-3.5 rounded-[14px] font-bold text-[14.5px] transition-colors ${item.isActive ? 'text-[var(--color-sage-dark)] shadow-[inset_4px_0_0_var(--color-sage-dark)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-slate-50/50 dark:hover:text-[var(--color-sage)] dark:hover:bg-slate-800/50'}`}>
                <Icon className={`w-5 h-5 ${item.isActive ? 'text-[var(--color-sage-dark)]' : 'opacity-80'}`} /> 
                {item.label}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="px-5 py-6 mb-4 space-y-1.5 border-t border-slate-200/50 dark:border-slate-800/50">
        {bottomNavItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link key={idx} to={item.path} className="flex items-center gap-3.5 px-4 py-3 rounded-[14px] font-bold text-[14.5px] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-slate-50/50 dark:hover:text-slate-300 dark:hover:bg-slate-800/50 transition-colors">
              <Icon className="w-5 h-5 opacity-80" /> 
              {item.label}
            </Link>
          )
        })}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-canvas flex w-full font-sans overflow-hidden">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] h-screen shrink-0 bg-white/50 backdrop-blur-xl border-r border-white/40 dark:border-slate-800/50 shadow-[4px_0_32px_rgba(0,0,0,0.02)] z-20">
        <SidebarContent />
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        
        {/* Top Header matching the image */}
        <header className="h-[88px] shrink-0 flex items-center justify-between px-6 lg:px-10 z-20">
          
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 text-[var(--color-text-secondary)] rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xl font-black text-[var(--color-sage)]">MessOS</span>
          </div>



          {/* Right Header Controls */}
          <div className="flex items-center gap-4 ml-auto">
             <button onClick={toggleTheme} className="w-11 h-11 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 text-[var(--color-text-muted)] hover:text-[var(--color-sage)] transition-colors shadow-sm border border-slate-100 dark:border-slate-700">
               {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
             <button className="relative w-11 h-11 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 text-[var(--color-text-muted)] hover:text-[var(--color-rose)] transition-colors shadow-sm border border-slate-100 dark:border-slate-700">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2.5 right-3 w-2.5 h-2.5 rounded-full bg-[var(--color-rose)] border-2 border-white dark:border-slate-800"></span>
             </button>
             
             {/* Profile matching image */}
             <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-200 dark:border-slate-700 cursor-pointer hover:opacity-80 transition-opacity">
               <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[var(--color-sky)]">
                 <img src="https://api.dicebear.com/9.x/notionists/svg?seed=Admin" alt="Profile" className="w-full h-full object-cover bg-slate-100" />
               </div>
               <div className="hidden sm:block">
                 <p className="text-sm font-bold text-[var(--color-text-primary)] dark:text-slate-200">Admin_K.</p>
               </div>
             </div>
          </div>
        </header>

        {/* Main Scrollable Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full p-4 lg:p-8 pt-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-[260px] bg-white dark:bg-slate-900 z-50 flex flex-col shadow-2xl lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
