import { useState } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Printer,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { weeklyTimetableData } from '../data/studentMockData';

const DAYS = ['Tous les jours', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

export default function StudentTimetablePage() {
  const [selectedDay, setSelectedDay] = useState('Tous les jours');

  const daysToShow =
    selectedDay === 'Tous les jours'
      ? ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
      : [selectedDay];

  return (
    <div className="space-y-6">
      {/* Top Bar with Day Selector and Print */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Emploi du Temps Hebdomadaire</h2>
          <p className="text-xs text-slate-500">Classe : 3ème Année Collège - Groupe B (Salle B12)</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Day pills */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDay === day
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Print button */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Imprimer</span>
          </button>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="space-y-6">
        {daysToShow.map((day) => {
          const sessions = weeklyTimetableData[day] || [];

          return (
            <div key={day} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  <h3 className="font-bold text-slate-900 text-base">{day}</h3>
                </div>
                <span className="text-xs font-medium text-slate-400">
                  {sessions.length} séances programmées
                </span>
              </div>

              {sessions.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  Aucun cours prévu ce jour.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {sessions.map((session, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200/90 hover:border-orange-300 hover:shadow-xs transition-all flex flex-col justify-between bg-slate-50/40 relative overflow-hidden group"
                    >
                      {/* Color strip */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1.5"
                        style={{ backgroundColor: session.color || '#F97316' }}
                      />

                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-mono font-bold text-slate-700">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {session.time}
                          </span>
                        </div>

                        <h4 className="font-bold text-slate-900 text-sm group-hover:text-orange-600 transition-colors">
                          {session.subject}
                        </h4>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1.5 truncate">
                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{session.teacher}</span>
                        </div>

                        <div className="flex items-center gap-1 font-semibold text-slate-700 shrink-0">
                          <MapPin className="w-3 h-3 text-orange-500" />
                          <span>{session.room}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
