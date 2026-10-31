import { Link } from 'react-router-dom';
import { BookOpen, User, ArrowRight, Award } from 'lucide-react';

export default function SubjectsProgressWidget({ subjects }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Matières &amp; Coefficients</h3>
            <p className="text-xs text-slate-500">8 matières actives ce semestre</p>
          </div>
        </div>

        <Link
          to="/courses"
          className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 hover:underline"
        >
          <span>Détails des cours</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of Subjects */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {subjects?.map((sub) => {
          const percentage = (sub.currentGrade / 20) * 100;

          return (
            <div
              key={sub.id}
              className="p-3.5 rounded-xl border border-slate-200/90 hover:border-orange-300 hover:shadow-xs transition-all bg-white flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
                      {sub.code} • Coeff. {sub.coefficient}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate group-hover:text-orange-600 transition-colors">
                      {sub.name}
                    </h4>
                  </div>
                  <span className="text-xs font-extrabold px-1.5 py-0.5 rounded bg-orange-50 text-orange-600 border border-orange-200/60 shrink-0">
                    {sub.gradeLetter}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2 truncate">
                  <User className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{sub.teacher}</span>
                </div>
              </div>

              {/* Grade progress & note */}
              <div className="mt-3 pt-2.5 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[11px] text-slate-500">Moyenne</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {sub.currentGrade} <span className="text-[10px] font-normal text-slate-400">/ 20</span>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: sub.color || '#F97316',
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
