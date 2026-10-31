import {
  GraduationCap,
  Award,
  CheckCircle2,
  CalendarCheck,
  TrendingUp,
  TrendingDown,
  BookOpen,
  ClipboardCheck,
  FileCheck2,
} from 'lucide-react';

const iconMap = {
  Award,
  GraduationCap,
  ClipboardCheck,
  FileCheck2,
  BookOpen,
  CheckCircle2,
  CalendarCheck,
};

export default function StudentStatCard({ stat }) {
  if (!stat) return null;
  const IconComponent = iconMap[stat.iconName] || stat.icon || GraduationCap;

  const isPositive = stat.trendType === 'positive';
  const isNegative = stat.trendType === 'negative';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 group flex flex-col justify-between">
      {/* Top Header of Card */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            {stat.title}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
              {stat.value}
            </span>
            {stat.unit && (
              <span className="text-xs font-medium text-slate-400">
                {stat.unit}
              </span>
            )}
          </div>
        </div>

        {/* Orange icon container matching irahma_web */}
        <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 transition-transform duration-200 group-hover:scale-105 group-hover:bg-orange-100/70 shrink-0">
          <IconComponent className="w-5 h-5 stroke-[2]" />
        </div>
      </div>

      {/* Bottom Trend & Context */}
      <div className="mt-4 pt-3 border-t border-slate-100/90 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-medium">
          {isPositive && (
            <span className="inline-flex items-center gap-0.5 text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">
              <TrendingUp className="w-3.5 h-3.5" />
              {stat.trend}
            </span>
          )}
          {isNegative && (
            <span className="inline-flex items-center gap-0.5 text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded-md border border-red-100">
              <TrendingDown className="w-3.5 h-3.5" />
              {stat.trend}
            </span>
          )}
          {!isPositive && !isNegative && (
            <span className="inline-flex items-center gap-0.5 text-slate-600 font-medium bg-slate-100 px-1.5 py-0.5 rounded-md">
              {stat.trend}
            </span>
          )}
          <span className="text-slate-500 truncate max-w-[130px] sm:max-w-[160px]">
            {stat.subtitle}
          </span>
        </div>

        {stat.badge && (
          <span className="hidden sm:inline-block text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
            {stat.badge}
          </span>
        )}
      </div>
    </div>
  );
}
