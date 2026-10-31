import { useState, useRef, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Calendar,
  Menu,
  ChevronDown,
  CheckCircle2,
  Clock,
  ArrowRight,
  GraduationCap,
  Sparkles,
  LogOut,
  User,
  Settings,
  BookOpen,
  AlertTriangle,
} from 'lucide-react';
import authService from '../../services/authService';
import { schoolAnnouncements, upcomingAssignments } from '../../data/studentMockData';

const PAGE_META = {
  '/':            { title: 'Student Dashboard',  subtitle: "Welcome back! Here's your academic summary today." },
  '/timetable':   { title: 'My Schedule & Timetable', subtitle: 'View your weekly classes, rooms, and teacher schedules.' },
  '/courses':     { title: 'Enrolled Courses',   subtitle: 'Access syllabus, chapters, course materials, and teachers.' },
  '/grades':      { title: 'Grades & Report Card', subtitle: 'Track your marks, averages, evaluations, and rank.' },
  '/assignments': { title: 'Assignments & Homework', subtitle: 'Manage your tasks, homework, deadlines, and submissions.' },
  '/attendance':  { title: 'Attendance Record', subtitle: 'Monitor presence rate, justified leaves, and timetable hours.' },
  '/announcements': { title: 'School Notices',   subtitle: 'Important communications from administration and faculty.' },
  '/profile':     { title: 'Student Profile',    subtitle: 'Manage your student details, guardian info, and credentials.' },
};

export default function StudentHeader({ onMenuClick }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const user = authService.getUser();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  const { title: pageTitle, subtitle: pageSubtitle } =
    PAGE_META[pathname] ?? { title: 'Student Portal', subtitle: 'Irahma School Collège & Lycée' };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile trigger & Page Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <span>Student Portal</span>
              <span>/</span>
              <span className="text-orange-600 font-semibold">{pageTitle}</span>
            </div>

            {/* Title & Subtitle */}
            <div className="flex items-baseline gap-2 mt-0.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-none">
                {pageTitle}
              </h1>
              <span className="hidden md:inline-block text-xs text-slate-500">
                · {pageSubtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Search & Actions */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Quick Search */}
          <div className="relative hidden lg:block w-56 xl:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subject, homework, teacher..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Current Academic Year / Semester Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50/80 border border-orange-200/60 text-orange-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span>Semestre 1 • 2024-2025</span>
          </div>

          {/* Date Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-600 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-orange-500" />
            <span>{formattedDate}</span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm">Notifications & Alerts</span>
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700">
                      3 new
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-orange-600 hover:text-orange-700 font-medium text-[11px]"
                  >
                    Mark read
                  </button>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                  {upcomingAssignments.slice(0, 2).map((asg) => (
                    <div
                      key={asg.id}
                      className="p-2.5 rounded-xl bg-orange-50/50 border border-orange-100/80 flex items-start gap-3 hover:bg-orange-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/assignments');
                      }}
                    >
                      <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="font-semibold text-slate-800 truncate text-xs">{asg.title}</p>
                          <span className="text-[10px] font-bold text-orange-600 shrink-0">{asg.dueDate}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{asg.subject} · {asg.teacher}</p>
                      </div>
                    </div>
                  ))}

                  {schoolAnnouncements.slice(0, 1).map((ann) => (
                    <div
                      key={ann.id}
                      className="p-2.5 rounded-xl bg-sky-50/50 border border-sky-100/80 flex items-start gap-3 hover:bg-sky-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/announcements');
                      }}
                    >
                      <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="font-semibold text-slate-800 truncate text-xs">{ann.title}</p>
                          <span className="text-[10px] text-slate-400">{ann.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{ann.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Class: 3ème Collège B</span>
                  <Link
                    to="/announcements"
                    onClick={() => setShowNotifications(false)}
                    className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1"
                  >
                    View all notices <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200"></div>

          {/* Student Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1 sm:pr-2.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              aria-label="Student profile menu"
            >
              {/* Avatar circle */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-xs">
                {user?.firstName ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ''}` : 'YB'}
              </div>

              {/* Student name & class */}
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {user?.fullName || `${user?.firstName || 'Youssef'} ${user?.lastName || 'Benali'}`}
                </span>
                <span className="text-[10px] text-orange-600 font-medium">
                  {user?.class?.shortName || '3AC-B'} • #{user?.studentNumber || '2024089'}
                </span>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                  <p className="font-bold text-slate-900 text-sm">{user?.fullName || 'Youssef Benali'}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.email || 'youssef.benali@student.irahma.edu'}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Rank #2 • GPA 16.85
                    </span>
                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl font-medium transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400 group-hover:text-orange-500" />
                  <span>My Profile & Guardian</span>
                </Link>

                <Link
                  to="/grades"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl font-medium transition-colors"
                >
                  <GraduationCap className="w-4 h-4 text-slate-400 group-hover:text-orange-500" />
                  <span>Report Card (Bulletin)</span>
                </Link>

                <Link
                  to="/profile#security"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl font-medium transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400 group-hover:text-orange-500" />
                  <span>Account & Password</span>
                </Link>

                <div className="my-1 border-t border-slate-100"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors text-left"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Log out of portal</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
