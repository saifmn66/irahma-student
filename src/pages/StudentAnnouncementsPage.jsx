import { useState } from 'react';
import {
  BellRing,
  Calendar,
  Sparkles,
  Search,
  Tag,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { schoolAnnouncements, upcomingExams } from '../data/studentMockData';

export default function StudentAnnouncementsPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Avis &amp; Communications Officielles</h2>
          <p className="text-xs text-slate-500">
            Retrouvez toutes les notes de la direction, plannings d'examens et actualités.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {['all', 'Examens', 'Activités', 'Administration'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === cat
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? 'Toutes' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Exams Focus Bar */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 p-5 rounded-2xl border border-orange-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-orange-600" />
          <h3 className="font-bold text-orange-950 text-sm">Calendrier des Prochains Contrôles &amp; Évaluations</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {upcomingExams.map((exam) => (
            <div key={exam.id} className="p-3.5 rounded-xl bg-white border border-orange-200/60 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                  {exam.subject}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">Coeff. {exam.coeff}</span>
              </div>
              <h4 className="font-bold text-slate-800 text-xs">{exam.title}</h4>
              <p className="text-[11px] text-slate-500 font-medium">
                📅 {exam.date} • ⏰ {exam.time} ({exam.room})
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {schoolAnnouncements.map((ann) => (
          <div
            key={ann.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-colors space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200/60">
                  {ann.category}
                </span>
                {ann.badge && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200">
                    {ann.badge}
                  </span>
                )}
                <span className="text-xs text-slate-400">• {ann.date}</span>
              </div>

              <span className="text-xs text-slate-400 font-medium">Par : {ann.author}</span>
            </div>

            <h3 className="font-bold text-slate-900 text-base">{ann.title}</h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {ann.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
