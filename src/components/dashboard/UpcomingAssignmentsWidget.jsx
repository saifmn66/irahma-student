import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileCheck2,
  Calendar,
  Clock,
  ArrowRight,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
} from 'lucide-react';
import studentDataService from '../../services/studentDataService';

export default function UpcomingAssignmentsWidget({ assignments: initialAssignments }) {
  const [assignments, setAssignments] = useState(initialAssignments || []);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [homeworkNote, setHomeworkNote] = useState('');
  const [fileName, setFileName] = useState('');

  const handleOpenSubmitModal = (asg) => {
    setSelectedAssignment(asg);
    setSubmissionSuccess(false);
    setHomeworkNote('');
    setFileName('');
  };

  const handleConfirmSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await studentDataService.submitAssignment(selectedAssignment.id, {
        note: homeworkNote,
        file: fileName || 'Devoir_Youssef_Benali.pdf',
      });
      setSubmissionSuccess(true);
      // Update local state
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === selectedAssignment.id ? { ...a, status: 'submitted', dueDate: 'Soumis à l\'instant' } : a
        )
      );
      setTimeout(() => {
        setSelectedAssignment(null);
        setSubmissionSuccess(false);
      }, 1400);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Devoirs &amp; Travaux à Rendre</h3>
              <p className="text-xs text-slate-500">
                {assignments.filter((a) => a.status === 'pending').length} devoirs en attente
              </p>
            </div>
          </div>

          <Link
            to="/assignments"
            className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 hover:underline"
          >
            <span>Voir tout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Assignments List */}
        <div className="mt-4 space-y-3 flex-1 overflow-y-auto pr-1">
          {assignments.map((item) => {
            const isPending = item.status === 'pending';
            const isSubmitted = item.status === 'submitted';
            const isGraded = item.status === 'graded';
            const isUrgent = item.priority === 'high' && isPending;

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-200/90 hover:border-orange-200 hover:bg-orange-50/20 transition-all flex flex-col justify-between gap-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/60">
                        {item.subject}
                      </span>
                      {isUrgent && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-200">
                          <AlertCircle className="w-3 h-3" />
                          Urgent
                        </span>
                      )}
                      {isGraded && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Noté : {item.score}
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-slate-900 text-xs sm:text-sm line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      Professeur : {item.teacher}
                    </p>
                  </div>

                  {/* Due Date & Action */}
                  <div className="text-right shrink-0 flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{item.dueDate}</span>
                    </div>

                    {isPending && (
                      <button
                        onClick={() => handleOpenSubmitModal(item)}
                        className="mt-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-[11px] transition-colors shadow-2xs"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Rendre</span>
                      </button>
                    )}

                    {isSubmitted && (
                      <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3" />
                        Soumis
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submission Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setSelectedAssignment(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {submissionSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Devoir transmis avec succès !</h3>
                <p className="text-xs text-slate-500">
                  Votre travail a bien été envoyé à {selectedAssignment.teacher}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-orange-600 tracking-wider">
                    Dépôt de Devoir
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{selectedAssignment.title}</h3>
                  <p className="text-xs text-slate-500">
                    Matière : {selectedAssignment.subject} • Échéance : {selectedAssignment.dueDate}
                  </p>
                </div>

                {selectedAssignment.instructions && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                    <p className="font-semibold text-slate-800 mb-1">Consignes du professeur :</p>
                    <p>{selectedAssignment.instructions}</p>
                  </div>
                )}

                {/* Upload zone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Fichier de votre devoir (PDF, Word, Image)</label>
                  <label className="border-2 border-dashed border-slate-300 hover:border-orange-500 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-orange-50/30">
                    <Upload className="w-6 h-6 text-orange-500 mb-2" />
                    <span className="text-xs font-medium text-slate-700">
                      {fileName ? fileName : 'Cliquez pour sélectionner un document'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">PDF ou DOCX (Max 15 Mo)</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFileName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Commentaire pour l'enseignant (optionnel)</label>
                  <textarea
                    rows={2}
                    value={homeworkNote}
                    onChange={(e) => setHomeworkNote(e.target.value)}
                    placeholder="Précisez un détail ou une remarque relative à votre exercice..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedAssignment(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-60"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Envoi en cours...' : 'Envoyer mon devoir'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
