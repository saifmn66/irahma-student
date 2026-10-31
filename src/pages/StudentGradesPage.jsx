import { useState } from 'react';
import {
  Award,
  Download,
  Printer,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { enrolledSubjects, currentStudentProfile } from '../data/studentMockData';

export default function StudentGradesPage() {
  const [selectedTerm, setSelectedTerm] = useState('t1');

  // Calculate totals
  const totalCoeff = enrolledSubjects.reduce((acc, sub) => acc + sub.coefficient, 0);
  const totalWeightedPoints = enrolledSubjects.reduce(
    (acc, sub) => acc + sub.currentGrade * sub.coefficient,
    0
  );
  const calculatedGPA = (totalWeightedPoints / totalCoeff).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Top Banner / Card */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700 uppercase">
              Bulletin Pédagogique
            </span>
            <span className="text-xs text-slate-400">Année Scolaire 2024-2025</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Relevé de Notes &amp; Évaluations
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Élève : <span className="font-semibold text-slate-700">{currentStudentProfile.fullName}</span> • Classe :{' '}
            <span className="font-semibold text-slate-700">{currentStudentProfile.class.name}</span>
          </p>
        </div>

        {/* GPA Summary Pill & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-5 py-3 rounded-2xl bg-orange-50 border border-orange-200/80 text-center">
            <span className="text-[10px] uppercase font-bold text-orange-600 block">
              Moyenne Trimestrielle
            </span>
            <span className="text-2xl font-black text-orange-600 font-mono">
              {calculatedGPA} <span className="text-xs font-normal text-slate-500">/ 20</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger Bulletin (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trimester Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setSelectedTerm('t1')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedTerm === 't1'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          1er Trimestre (En Cours)
        </button>
        <button
          onClick={() => setSelectedTerm('t2')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedTerm === 't2'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'bg-white text-slate-400 hover:bg-slate-100'
          }`}
        >
          2ème Trimestre (À venir)
        </button>
        <button
          onClick={() => setSelectedTerm('t3')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedTerm === 't3'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'bg-white text-slate-400 hover:bg-slate-100'
          }`}
        >
          3ème Trimestre (À venir)
        </button>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Matière &amp; Code</th>
                <th className="py-3.5 px-3">Professeur</th>
                <th className="py-3.5 px-3 text-center">Coeff.</th>
                <th className="py-3.5 px-3 text-center">Dernières Notes</th>
                <th className="py-3.5 px-3 text-center">Moyenne Matière</th>
                <th className="py-3.5 px-3 text-center">Moyenne Classe</th>
                <th className="py-3.5 px-3 text-center">Total Points</th>
                <th className="py-3.5 px-4">Appréciation Enseignant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {enrolledSubjects.map((sub) => {
                const weightedPoints = (sub.currentGrade * sub.coefficient).toFixed(1);
                const isAboveClass = sub.currentGrade >= sub.classAverage;

                return (
                  <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Subject */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{sub.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{sub.code}</div>
                    </td>

                    {/* Teacher */}
                    <td className="py-3.5 px-3 text-slate-600 truncate max-w-[140px]">
                      {sub.teacher}
                    </td>

                    {/* Coefficient */}
                    <td className="py-3.5 px-3 text-center font-bold text-slate-800">
                      {sub.coefficient}
                    </td>

                    {/* Recent notes chips */}
                    <td className="py-3.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        {sub.recentNotes?.map((n, i) => (
                          <span
                            key={i}
                            title={`${n.title} (${n.date})`}
                            className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold border border-slate-200"
                          >
                            {n.score}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Subject Final Mark */}
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 font-mono font-extrabold text-sm text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200/60">
                        {sub.currentGrade} <span className="text-[10px] font-normal text-slate-400">/20</span>
                      </span>
                    </td>

                    {/* Class Benchmark */}
                    <td className="py-3.5 px-3 text-center text-slate-500 font-mono">
                      <span className={isAboveClass ? 'text-emerald-600 font-bold' : 'text-slate-600'}>
                        {sub.classAverage}
                      </span>
                    </td>

                    {/* Total Weighted Points */}
                    <td className="py-3.5 px-3 text-center font-bold font-mono text-slate-800">
                      {weightedPoints}
                    </td>

                    {/* Appreciation */}
                    <td className="py-3.5 px-4 text-slate-600 text-[11px] leading-relaxed max-w-xs">
                      {sub.currentGrade >= 17
                        ? 'Excellente maîtrise des compétences et participation très active.'
                        : sub.currentGrade >= 15
                        ? 'Très bon travail d\'ensemble, élève sérieux et appliqué.'
                        : 'Travail satisfaisant, poursuivez les efforts avec la même régularité.'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Footer Summary Row */}
            <tfoot className="bg-orange-50/60 border-t-2 border-orange-200 text-slate-900 font-bold">
              <tr>
                <td className="py-4 px-4 text-orange-800" colSpan={2}>
                  Total Général &amp; Bilan Semestriel
                </td>
                <td className="py-4 px-3 text-center text-orange-900">{totalCoeff}</td>
                <td className="py-4 px-3"></td>
                <td className="py-4 px-3 text-center text-orange-600 text-base font-black">
                  {calculatedGPA} / 20
                </td>
                <td className="py-4 px-3 text-center text-slate-600">14.15</td>
                <td className="py-4 px-3 text-center text-orange-900 text-sm">
                  {totalWeightedPoints.toFixed(1)} pts
                </td>
                <td className="py-4 px-4 text-emerald-700 font-bold">
                  ★ Félicitations du Conseil de Classe
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Decision Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/40 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-950 text-sm">Mention : Très Bien (Top 5%)</h4>
            <p className="text-xs text-emerald-800">
              Assiduité exemplaire • 0 absence injustifiée • Participation valorisée par l'équipe pédagogique.
            </p>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shrink-0 text-center shadow-xs">
          Rang : 2ème / 28 élèves
        </span>
      </div>
    </div>
  );
}
