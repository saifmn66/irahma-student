import { useState } from 'react';
import {
  User,
  Shield,
  KeyRound,
  Download,
  CheckCircle2,
  AlertCircle,
  School,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Lock,
} from 'lucide-react';
import { currentStudentProfile } from '../data/studentMockData';
import authService from '../services/authService';

export default function StudentProfilePage() {
  const [profile] = useState(authService.getUser() || currentStudentProfile);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPass, setChangingPass] = useState(false);
  const [passMessage, setPassMessage] = useState(null);
  const [passError, setPassError] = useState(null);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPassMessage(null);
    setPassError(null);

    if (newPassword !== confirmPassword) {
      setPassError('Les deux nouveaux mots de passe ne correspondent pas.');
      return;
    }
    if (newPassword.length < 6) {
      setPassError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }

    try {
      setChangingPass(true);
      const res = await authService.changePassword({ currentPassword, newPassword });
      setPassMessage(res.message || 'Mot de passe modifié avec succès !');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPassError(err?.response?.data?.message || err.message || 'Échec de modification du mot de passe.');
    } finally {
      setChangingPass(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-orange-500/20">
            {profile.firstName ? `${profile.firstName[0]}${profile.lastName ? profile.lastName[0] : ''}` : 'YB'}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{profile.fullName}</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Inscrit Actif
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Identifiant : <span className="font-mono font-bold text-slate-700">#{profile.studentNumber}</span> • Classe :{' '}
              <span className="font-bold text-orange-600">{profile.class.name}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('Téléchargement de l\'Attestation de Scolarité 2024-2025...')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs border border-orange-200/80 transition-colors shadow-2xs self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-orange-600" />
          <span>Attestation de Scolarité (PDF)</span>
        </button>
      </div>

      {/* Grid: Student Info + Guardian Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-slate-900 text-base">Informations Personnelles</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Nom complet</span>
              <span className="font-bold text-slate-800 text-sm">{profile.fullName}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Matricule Scolaire</span>
              <span className="font-mono font-bold text-slate-800 text-sm">#{profile.studentNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Date de Naissance</span>
              <span className="font-semibold text-slate-800">{profile.dateOfBirth} (16 ans)</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Genre</span>
              <span className="font-semibold text-slate-800">{profile.gender === 'Male' ? 'Masculin' : 'Féminin'}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Email Scolaire</span>
              <span className="font-semibold text-slate-800 break-all">{profile.email}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">Téléphone</span>
              <span className="font-semibold text-slate-800">{profile.phone}</span>
            </div>
          </div>
        </div>

        {/* Guardian Details */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Shield className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-slate-900 text-base">Responsable Légal (Parent / Tuteur)</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Nom du Tuteur</span>
              <span className="font-bold text-slate-800 text-sm">{profile.guardian.name} ({profile.guardian.relation})</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-4 h-4 text-slate-400" />
              <span className="font-semibold">{profile.guardian.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{profile.guardian.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{profile.guardian.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Password Change */}
      <div id="security" className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4 max-w-xl">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <KeyRound className="w-5 h-5 text-orange-500" />
          <h3 className="font-bold text-slate-900 text-base">Sécurité &amp; Mot de Passe</h3>
        </div>

        {passMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{passMessage}</span>
          </div>
        )}

        {passError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{passError}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Mot de passe actuel</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Nouveau mot de passe</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 caractères"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Retapez le nouveau mot de passe"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={changingPass}
            className="mt-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-colors disabled:opacity-60"
          >
            {changingPass ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
          </button>
        </form>
      </div>
    </div>
  );
}
