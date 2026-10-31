import { Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  User,
  CheckCircle2,
  Calendar,
  ArrowRight,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export default function TodayClassesWidget({ schedule }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
            <Clock className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Emploi du Temps d'Aujourd'hui</h3>
            <p className="text-xs text-slate-500">Mardi • 4 séances programmées</p>
          </div>
        </div>

        <Link
          to="/timetable"
          className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 hover:underline"
        >
          <span>Semaine complète</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Class Schedule List */}
      <div className="mt-4 space-y-3 flex-1 overflow-y-auto pr-1">
        {schedule?.map((item, idx) => {
          const isCompleted = item.status === 'completed';
          const isLive = item.status === 'live';
          const isPause = item.code === 'PAUSE';

          if (isPause) {
            return (
              <div
                key={item.id || idx}
                className="py-2 px-3.5 rounded-xl bg-slate-50/70 border border-dashed border-slate-200 flex items-center justify-between text-xs text-slate-500"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                  <span className="font-medium text-slate-700">{item.subject}</span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">{item.time}</span>
              </div>
            );
          }

          return (
            <div
              key={item.id || idx}
              className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-150 ${
                isLive
                  ? 'bg-orange-50/60 border-orange-300 ring-2 ring-orange-500/20 shadow-xs'
                  : isCompleted
                  ? 'bg-slate-50/60 border-slate-200 opacity-80'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-sm">
                      {item.subject}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                      {item.code}
                    </span>
                    {isLive && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        En Cours
                      </span>
                    )}
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Terminé
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-medium line-clamp-1">
                    {item.topic}
                  </p>
                </div>

                {/* Time Badge */}
                <div className="text-right shrink-0">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-mono text-xs font-bold text-slate-700 shadow-2xs">
                    {item.time}
                  </span>
                </div>
              </div>

              {/* Footer row: Teacher & Room */}
              <div className="mt-3 pt-2.5 border-t border-slate-100/80 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5 truncate">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{item.teacher}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 text-slate-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span>{item.room}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
