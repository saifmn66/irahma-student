import { useState } from 'react';
import {
  BookOpen,
  User,
  Clock,
  MapPin,
  Download,
  Search,
  FileText,
  Mail,
  ChevronRight,
} from 'lucide-react';
import { enrolledSubjects } from '../data/studentMockData';

export default function StudentCoursesPage() {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const filtered = enrolledSubjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase()) ||
    s.teacher.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & Top stats */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Matières &amp; Supports Pédagogiques</h2>
          <p className="text-xs text-slate-500">Consultez les programmes, chapitres et supports de cours.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une matière ou un prof..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((subject) => (
          <div
            key={subject.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
                    {subject.code} • Coeff. {subject.coefficient}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mt-0.5">{subject.name}</h3>
                </div>

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-xs shrink-0"
                  style={{ backgroundColor: subject.color || '#F97316' }}
                >
                  {subject.gradeLetter}
                </div>
              </div>

              {/* Teacher and Room info */}
              <div className="py-3 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-800">{subject.teacher}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-slate-500 text-[11px]">{subject.teacherEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span>{subject.room}</span>
                </div>
              </div>

              {/* Progress and Grade */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs mb-3">
                <span className="text-slate-500 font-medium">Moyenne actuelle</span>
                <span className="font-bold text-orange-600 font-mono text-sm">
                  {subject.currentGrade} / 20
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => alert(`Téléchargement du syllabus pour : ${subject.name}`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Syllabus &amp; Cours</span>
              </button>

              <button
                onClick={() => setSelectedSubject(subject)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
              >
                <span>Chapitres</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Chapters Preview Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-orange-600 uppercase font-mono">{selectedSubject.code}</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedSubject.name}</h3>
              </div>
              <button
                onClick={() => setSelectedSubject(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3">
              <p className="text-xs text-slate-500">Chapitres du 1er Trimestre :</p>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold text-slate-800">Chapitre 1 : Notions Fondamentales</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Validé</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold text-slate-800">Chapitre 2 : Développements &amp; Théorèmes</span>
                  </div>
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">En Cours</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-600">Chapitre 3 : Applications &amp; Problèmes de Synthèse</span>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">Prévu Nov.</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedSubject(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
