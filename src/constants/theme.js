/**
 * Theme & Design System Tokens for Irahma School Dashboard
 * White & Orange theme with clean SaaS aesthetic
 */

export const THEME = {
  colors: {
    // Primary Brand Orange
    primary: '#F97316',        // orange-500
    primaryHover: '#EA580C',   // orange-600
    primaryLight: '#FFF7ED',   // orange-50
    primarySubtle: '#FFEDD5',  // orange-100
    primaryActive: '#C2410C',  // orange-700

    // Secondary Accent
    secondary: '#0284C7',      // sky-600
    secondaryLight: '#F0F9FF', // sky-50

    // Backgrounds
    pageBg: '#F8FAFC',         // slate-50 (clean light page background)
    cardBg: '#FFFFFF',         // pure white for cards and modules
    sidebarBg: '#FFFFFF',      // white sidebar
    headerBg: '#FFFFFF',       // white header

    // Typography
    textPrimary: '#0F172A',    // slate-900 (ultra readable, high contrast)
    textSecondary: '#475569',  // slate-600
    textMuted: '#94A3B8',      // slate-400
    textInverted: '#FFFFFF',

    // Borders & Dividers
    border: '#E2E8F0',         // slate-200
    borderLight: '#F1F5F9',    // slate-100
    borderStrong: '#CBD5E1',   // slate-300

    // Semantic States
    success: '#16A34A',        // green-600
    successLight: '#DCFCE7',   // green-100
    warning: '#D97706',        // amber-600
    warningLight: '#FEF3C7',   // amber-100
    danger: '#DC2626',         // red-600
    dangerLight: '#FEE2E2',    // red-100
    info: '#2563EB',           // blue-600
    infoLight: '#DBEAFE',      // blue-100

    // Charts Palette
    chart: {
      primary: '#F97316',
      primaryGradientStart: '#FB923C',
      primaryGradientEnd: '#FFF7ED',
      accent1: '#FB923C',      // orange-400
      accent2: '#FDBA74',      // orange-300
      accent3: '#FED7AA',      // orange-200
      accent4: '#FFEDD5',      // orange-100
      slate: '#94A3B8',
      grid: '#F1F5F9',
    }
  },

  borderRadius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',
  },

  shadows: {
    card: '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.03)',
    cardHover: '0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
    dropdown: '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
  },

  transitions: {
    default: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  }
};

export default THEME;
