import { Link } from 'react-router-dom';
import { BellRing, Calendar, Sparkles, ArrowRight, ShieldAlert, Award } from 'lucide-react';

export default function RecentAnnouncementsWidget({ announcements }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
            <BellRing className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Avis &amp; Communications Récentes</h3>
            <p className="text-xs text-slate-500">Notes d'information officielles de l'établissement</p>
          </div>
        </div>

        <Link
          to="/announcements"
          className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 hover:underline"
        >
          <span>Consulter les avis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Announcements List */}
      <div className="mt-4 space-y-3">
        {announcements?.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl border border-slate-200/90 hover:border-slate-300 transition-colors flex items-start gap-3.5"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-50 text-orange-600 border border-orange-200/60">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 shrink-0 font-medium">{item.date}</span>
              </div>

              <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                {item.content}
              </p>
              <div className="mt-2 text-[10px] font-semibold text-slate-400">
                Par : {item.author}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
