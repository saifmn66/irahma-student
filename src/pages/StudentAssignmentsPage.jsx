import { useState } from 'react';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  Download,
  Filter,
  FileText,
  X,
} from 'lucide-react';
import { upcomingAssignments } from '../data/studentMockData';
import studentDataService from '../services/studentDataService';

export default function StudentAssignmentsPage() {
  const [filter, setFilter] = useState('all');
  const [assignments, setAssignments] = useState(upcomingAssignments);
  const [selectedAsg, setSelectedAsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const filtered = assignments.filter((a) => {
    if (filter === 'pending') return a.status === 'pending';
    if (filter === 'submitted') return a.status === 'submitted';
    if (filter === 'graded') return a.status === 'graded';
    return true;
  });

  const handleConfirmSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await studentDataService.submitAssignment(selectedAsg.id);
    setSuccess(true);
    setAssignments((prev) =>
      prev.map((a) => (a.id === selectedAsg.id ? { ...a, status: 'submitted' } : a))
    );
    setTimeout(() => {
      setSelectedAsg(null);
      setSuccess(false);
      setSubmitting(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter Tabs */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Gestion des Devoirs &amp; Travaux</h2>
          <p className="text-xs text-slate-500">
            Suivez vos dates limites, déposez vos devoirs et consultez les corrections.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
          {[
            { id: 'all', label: 'Tous' },
            { id: 'pending', label: 'En attente' },
            { id: 'submitted', label: 'Soumis' },
            { id: 'graded', label: 'Notés' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === tab.id
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isPending = item.status === 'pending';
          const isSubmitted = item.status === 'submitted';
          const isGraded = item.status === 'graded';
          const isUrgent = item.priority === 'high' && isPending;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:border-orange-300 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200/60">
                    {item.subject}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.code}
                  </span>
                  {isUrgent && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200">
                      <AlertCircle className="w-3 h-3" />
                      Date limite proche
                    </span>
                  )}
                  {isSubmitted && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                      <Clock className="w-3 h-3" />
                      En attente de notation
                    </span>
                  )}
                  {isGraded && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Note : {item.score}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>

                {item.instructions && (
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.instructions}
                  </p>
                )}

                {item.feedback && (
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-800">
                    <span className="font-bold">Appréciation de l'enseignant : </span>
                    {item.feedback}
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span>Professeur : <strong className="text-slate-700">{item.teacher}</strong></span>
                  {item.attachmentName && (
                    <button
                      onClick={() => alert(`Téléchargement de la fiche : ${item.attachmentName}`)}
                      className="text-orange-600 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Download className="w-3 h-3" />
                      <span>{item.attachmentName}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Status and Action Button */}
              <div className="flex flex-col md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Échéance</span>
                  <span className="font-mono text-xs font-bold text-slate-800">{item.dueDate}</span>
                </div>

                {isPending && (
                  <button
                    onClick={() => setSelectedAsg(item)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Déposer mon devoir</span>
                  </button>
                )}

                {isSubmitted && (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                    ✓ Devoir rendu
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedAsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedAsg(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            {success ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900">Devoir déposé avec succès !</h4>
              </div>
            ) : (
              <form onSubmit={handleConfirmSubmit} className="space-y-4">
                <h3 className="font-bold text-slate-900 text-base">Déposer : {selectedAsg.title}</h3>
                <p className="text-xs text-slate-500">Matière : {selectedAsg.subject}</p>

                <div className="border-2 border-dashed border-slate-300 rounded-xl p-5 text-center bg-slate-50">
                  <Upload className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-700">Cliquez pour importer votre devoir (PDF/Word)</p>
                  <input type="file" className="mt-2 text-xs text-slate-500" required />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedAsg(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 text-white"
                  >
                    {submitting ? 'Envoi...' : 'Confirmer le dépôt'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
