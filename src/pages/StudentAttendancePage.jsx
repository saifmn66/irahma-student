import { useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  Upload,
  Plus,
  ShieldCheck,
  X,
} from 'lucide-react';
import { studentAttendanceRecords, currentStudentProfile } from '../data/studentMockData';

export default function StudentAttendancePage() {
  const [records, setRecords] = useState(studentAttendanceRecords);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');

  const stats = currentStudentProfile.academicStats;

  const handleSubmitJustification = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setDate('');
      setReason('');
      alert('Votre justificatif a été transmis à la Surveillance Générale.');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Taux de Présence</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ClipboardCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{stats.attendanceRate}%</div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">✓ Assiduité exemplaire</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Heures Présentes</span>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{stats.totalPresencesHours} h</div>
          <p className="text-xs text-slate-500 mt-1">Total heures dispensées</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Absences Justifiées</span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{stats.justifiedHours} h</div>
          <p className="text-xs text-sky-700 font-medium mt-1">Toutes visées par l'école</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Injustifiées</span>
            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-2">{stats.unjustifiedHours} h</div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">0 faute disciplinaire</p>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Historique des Absences &amp; Retards</h3>
            <p className="text-xs text-slate-500">Registre officiel de la vie scolaire.</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Déposer un Justificatif</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Date &amp; Jour</th>
                <th className="py-3 px-4">Créneau Horaire</th>
                <th className="py-3 px-4">Matière</th>
                <th className="py-3 px-4 text-center">Durée</th>
                <th className="py-3 px-4 text-center">Statut</th>
                <th className="py-3 px-4">Motif &amp; Validation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div>{rec.date}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{rec.dayName}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{rec.time}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{rec.subject}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-700">{rec.hours} h</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      {rec.statusLabel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-xs">
                    <div>{rec.reason}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Visé par : {rec.verifiedBy}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Justification Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900">Justificatif envoyé !</h4>
                <p className="text-xs text-slate-500">La vie scolaire traitera votre document sous 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitJustification} className="space-y-4">
                <h3 className="font-bold text-slate-900 text-base">Transmission d'un Justificatif d'Absence</h3>
                <p className="text-xs text-slate-500">
                  Certificat médical, convocation officielle ou mot des parents.
                </p>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Date de l'absence</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Motif</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Rendez-vous médical spécialiste"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Fichier justificatif (PDF ou Photo)</label>
                  <input type="file" required className="text-xs text-slate-500 block w-full" />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 text-white"
                  >
                    Transmettre
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
