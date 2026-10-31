import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  GraduationCap,
  CheckSquare,
  ClipboardCheck,
  BellRing,
  User,
  School,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  Award,
  X,
} from 'lucide-react';
import authService from '../../services/authService';

const studentNavItems = [
  { id: 'dashboard',    label: 'Dashboard',     icon: LayoutDashboard, to: '/' },
  { id: 'timetable',    label: 'Timetable',     icon: CalendarDays,    to: '/timetable',    badge: 'Today' },
  { id: 'courses',      label: 'My Courses',    icon: BookOpen,        to: '/courses',      badge: '8' },
  { id: 'grades',       label: 'Grades & GPA',  icon: Award,           to: '/grades',       badge: '16.85' },
  { id: 'assignments',  label: 'Assignments',   icon: CheckSquare,     to: '/assignments',  badge: '3 Due' },
  { id: 'attendance',   label: 'Attendance',    icon: ClipboardCheck,  to: '/attendance',   badge: '98%' },
  { id: 'announcements',label: 'School Notices',icon: BellRing,        to: '/announcements',badge: 'New' },
  { id: 'profile',      label: 'Student Profile',icon: User,           to: '/profile' },
];

export default function StudentSidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
}) {
  const user = authService.getUser();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Logo Badge */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-sm shadow-orange-500/20 shrink-0">
            <School className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          
          {!collapsed && (
            <div className="flex flex-col transition-opacity duration-200 truncate">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-900 tracking-tight text-base">
                  Irahma School
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-orange-50 text-orange-600 border border-orange-200/60">
                  Student
                </span>
              </div>
              <span className="text-xs text-slate-500 font-normal">
                Espace Élève &amp; Famille
              </span>
            </div>
          )}
        </div>

        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4 space-y-1">
        <div className={`px-2 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider ${collapsed ? 'text-center' : ''}`}>
          {collapsed ? '•••' : 'Espace Scolaire'}
        </div>

        {studentNavItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.to === '/'}
              onClick={() => {
                if (window.innerWidth < 768) setMobileOpen(false);
              }}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `w-full group flex items-center rounded-xl font-medium text-sm transition-all duration-150 relative ${
                  collapsed ? 'justify-center p-2.5' : 'px-3 py-2.5 gap-3'
                } ${
                  isActive
                    ? 'bg-orange-50 text-orange-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      isActive
                        ? 'text-orange-600 stroke-[2.2]'
                        : 'text-slate-400 group-hover:text-slate-600 stroke-[1.8]'
                    }`}
                  />

                  {!collapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}

                  {!collapsed && item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isActive
                          ? 'bg-orange-100/80 text-orange-700'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200/80'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-600 rounded-r-full" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Motivation Card (when expanded) */}
        {!collapsed && (
          <div className="pt-4 px-1">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border border-orange-200/60">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-orange-500 text-white flex items-center justify-center text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-800">Objectif Trimestre</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Moyenne actuelle : <span className="font-bold text-orange-600">16.85 / 20</span>. Tu es dans le Top 5% de ta classe !
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Profile & Collapse Toggle */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-2">
        {/* Student card info */}
        <div
          className={`flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            {user?.firstName ? user.firstName[0] : 'Y'}
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate leading-tight">
                {user?.fullName || 'Youssef Benali'}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {user?.class?.shortName || '3AC-B'} • Élève
              </p>
            </div>
          )}

          {!collapsed && (
            <button
              onClick={() => {
                authService.logout();
                window.location.href = '/login';
              }}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Desktop Collapse / Expand Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center w-full py-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg text-xs transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-1.5">
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse view</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer (backdrop + slide-in panel) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Pane */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-50">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:flex flex-col shrink-0 transition-all duration-200 sticky top-0 h-screen ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
