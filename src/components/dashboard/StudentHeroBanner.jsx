import { Link } from 'react-router-dom';
import {
  CalendarDays,
  FileCheck2,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

export default function StudentHeroBanner({ profile, todaySchedule }) {
  const nextClass = todaySchedule?.find((s) => s.status === 'live' || s.status === 'upcoming');

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white p-6 sm:p-8 shadow-sm">
      {/* Decorative background circles */}
      <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute right-1/3 -bottom-16 w-48 h-48 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Column: Greeting & Info */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-medium border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Année Scolaire 2024-2025 • {profile?.class?.name || '3ème Année Collège - Groupe B'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Bonjour, {profile?.firstName || 'Youssef'} ! 👋
          </h2>

          <p className="text-orange-50/90 text-sm sm:text-base leading-relaxed">
            Tu as <span className="font-semibold text-white">2 cours restants</span> aujourd'hui et{' '}
            <span className="font-semibold text-white">1 devoir à rendre demain</span>. Continue sur cette excellente lancée !
          </p>

          {/* Next Class Notification Pill */}
          {nextClass && (
            <div className="pt-1">
              <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-2 rounded-xl bg-black/15 backdrop-blur-md border border-white/15 text-xs text-orange-50">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <Clock className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
                  <span>Prochain cours :</span>
                </div>
                <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-md">
                  {nextClass.subject}
                </span>
                <span className="text-orange-100">
                  {nextClass.time} • {nextClass.room}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Quick Metric Badges & Action */}
        <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-200 text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>Rang Classe</span>
              </div>
              <div className="text-xl font-extrabold text-white mt-0.5">
                #2 <span className="text-xs font-normal text-orange-200">/ 28</span>
              </div>
            </div>

            <div className="px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center">
              <div className="text-orange-100 text-xs font-semibold">Moyenne Générale</div>
              <div className="text-xl font-extrabold text-white mt-0.5">
                16.85 <span className="text-xs font-normal text-orange-200">/ 20</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              to="/timetable"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-orange-600 font-bold text-xs hover:bg-orange-50 transition-colors shadow-xs"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Emploi du temps</span>
            </Link>

            <Link
              to="/assignments"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-700/60 hover:bg-orange-700 text-white font-bold text-xs transition-colors border border-white/20"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Mes Devoirs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
