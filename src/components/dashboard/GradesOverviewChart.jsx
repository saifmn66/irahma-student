import { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Award, TrendingUp, BarChart3, LineChart } from 'lucide-react';
import { THEME } from '../../constants/theme';

export default function GradesOverviewChart({ gradesTrend, subjects }) {
  const [viewMode, setViewMode] = useState('evolution'); // 'evolution' | 'subjects'

  // Subject-wise comparison data
  const subjectsData = subjects?.map((s) => ({
    name: s.name.length > 12 ? s.name.substring(0, 10) + '..' : s.name,
    fullName: s.name,
    note: s.currentGrade,
    moyenneClasse: s.classAverage,
  })) || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
            <Award className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Performance Académique</h3>
            <p className="text-xs text-slate-500">
              Moyenne générale actuelle : <span className="font-bold text-orange-600">16.85 / 20</span> (Mention Très Bien)
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setViewMode('evolution')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'evolution'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LineChart className="w-3.5 h-3.5" />
            <span>Évolution</span>
          </button>

          <button
            onClick={() => setViewMode('subjects')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'subjects'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Par Matière</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full pt-4">
        {viewMode === 'evolution' ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={gradesTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="studentGradeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="classGradeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />

              <XAxis
                dataKey="term"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 11 }}
              />

              <YAxis
                domain={[10, 20]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 11 }}
                unit="/20"
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-200 text-xs">
                        <p className="font-bold text-slate-800 mb-1.5">{label}</p>
                        <div className="space-y-1">
                          <p className="text-orange-600 font-semibold flex items-center justify-between gap-4">
                            <span>Ma Moyenne :</span>
                            <span className="font-bold text-sm">{payload[0]?.value} / 20</span>
                          </p>
                          <p className="text-slate-500 flex items-center justify-between gap-4">
                            <span>Moyenne Classe :</span>
                            <span>{payload[1]?.value} / 20</span>
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend
                verticalAlign="top"
                align="right"
                height={30}
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', fontWeight: 500 }}
              />

              <Area
                type="monotone"
                dataKey="studentAvg"
                name="Ma Moyenne"
                stroke="#F97316"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#studentGradeGrad)"
                activeDot={{ r: 6, fill: '#EA580C', stroke: '#FFFFFF', strokeWidth: 2 }}
              />

              <Area
                type="monotone"
                dataKey="classAvg"
                name="Moyenne de la Classe"
                stroke="#94A3B8"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#classGradeGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 10 }} />
              <YAxis domain={[0, 20]} axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-200 text-xs">
                        <p className="font-bold text-slate-800 mb-1">{data.fullName}</p>
                        <p className="text-orange-600 font-semibold">Note : {data.note} / 20</p>
                        <p className="text-slate-500">Moyenne Classe : {data.moyenneClasse} / 20</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend verticalAlign="top" align="right" height={30} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="note" name="Ma Note" fill="#F97316" radius={[6, 6, 0, 0]} />
              <Bar dataKey="moyenneClasse" name="Moyenne Classe" fill="#CBD5E1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer Benchmark Insights */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+2.75 points au-dessus de la moyenne de la classe</span>
        </div>
        <span className="text-[11px] text-slate-400">Dernière mise à jour : 28 Octobre</span>
      </div>
    </div>
  );
}
