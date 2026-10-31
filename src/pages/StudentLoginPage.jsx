import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  School,
  Lock,
  Mail,
  Eye,
  EyeOff,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import authService from '../services/authService';
import THEME from '../constants/theme';

export default function StudentLoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('2024089');
  const [password, setPassword] = useState('student123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.login({
        identifier: identifier.trim(),
        email: identifier.trim(),
        studentNumber: identifier.trim(),
        password: password,
      });

      navigate('/');
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Identifiant ou mot de passe incorrect.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setIdentifier('2024089');
    setPassword('student123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 mb-1">
            <School className="w-8 h-8 stroke-[2.2]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Portail Élève Irahma
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
            Accédez à vos cours, notes, emplois du temps et devoirs en toute simplicité.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-slate-200/60 rounded-3xl border border-slate-200/80">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Identifier or Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Matricule ou Email Scolaire
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Ex: 2024089 ou youssef@..."
                  className="block w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white text-slate-900 placeholder-slate-400 font-medium transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Mot de Passe
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Veuillez contacter le secrétariat ou votre professeur principal pour réinitialiser vos identifiants.');
                  }}
                  className="text-[11px] font-semibold text-orange-600 hover:text-orange-700"
                >
                  Oublié ?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white text-slate-900 placeholder-slate-400 font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all disabled:opacity-60 cursor-pointer"
            >
              <span>{loading ? 'Connexion en cours...' : 'Se connecter à l\'Espace Élève'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="p-3 rounded-2xl bg-orange-50/70 border border-orange-100 flex items-center justify-between gap-2">
              <div className="text-left">
                <p className="text-[11px] font-bold text-orange-950">Compte Démo Élève</p>
                <p className="text-[10px] text-orange-800">Youssef Benali (3AC-B)</p>
              </div>

              <button
                type="button"
                onClick={handleDemoFill}
                className="px-2.5 py-1.5 rounded-lg bg-orange-600 text-white font-bold text-[10px] hover:bg-orange-700 transition-colors shadow-2xs"
              >
                Remplir Démo
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-slate-400 space-y-1">
          <p>Irahma School • Collège &amp; Lycée d'Excellence</p>
          <p>© {new Date().getFullYear()} Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
}
