import { useState, useEffect, useMemo } from 'react';
import StudentHeroBanner from '../components/dashboard/StudentHeroBanner';
import StudentStatCard from '../components/dashboard/StudentStatCard';
import TodayClassesWidget from '../components/dashboard/TodayClassesWidget';
import GradesOverviewChart from '../components/dashboard/GradesOverviewChart';
import UpcomingAssignmentsWidget from '../components/dashboard/UpcomingAssignmentsWidget';
import SubjectsProgressWidget from '../components/dashboard/SubjectsProgressWidget';
import RecentAnnouncementsWidget from '../components/dashboard/RecentAnnouncementsWidget';
import { StatCardSkeleton } from '../components/common/Skeleton';
import studentDataService from '../services/studentDataService';
import authService from '../services/authService';

export default function StudentDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await studentDataService.getDashboardOverview();
        setDashboardData(data);
      } catch (err) {
        console.error('Error loading student dashboard data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const statsCards = useMemo(() => {
    if (!dashboardData) return [];
    const { stats } = dashboardData;

    return [
      {
        id: 'gpa',
        title: 'Moyenne Générale',
        value: `${stats.overallGPA}`,
        unit: `/ ${stats.maxGPA}`,
        iconName: 'Award',
        trend: `Rang #${stats.classRank} / ${stats.totalStudentsInClass}`,
        trendType: 'positive',
        subtitle: 'Top 5% de la classe',
        badge: 'Mention Très Bien',
      },
      {
        id: 'attendance',
        title: 'Taux de Présence',
        value: `${stats.attendanceRate}%`,
        unit: '',
        iconName: 'ClipboardCheck',
        trend: '+0.8% ce mois',
        trendType: 'positive',
        subtitle: `${stats.totalPresencesHours}h assidues`,
        badge: `${stats.justifiedHours}h justifiées`,
      },
      {
        id: 'courses',
        title: 'Matières Inscrites',
        value: `${dashboardData.subjects?.length || 8}`,
        unit: 'Matières',
        iconName: 'BookOpen',
        trend: 'Curriculum actif',
        trendType: 'neutral',
        subtitle: '3ème Collège',
        badge: 'Année 2024-2025',
      },
      {
        id: 'assignments',
        title: 'Devoirs en Cours',
        value: `${stats.pendingAssignments}`,
        unit: 'À Rendre',
        iconName: 'FileCheck2',
        trend: `${stats.totalCompletedAssignments} validés`,
        trendType: 'positive',
        subtitle: 'Prochain : Demain 23:59',
        badge: 'En Règle',
      },
    ];
  }, [dashboardData]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-44 rounded-3xl bg-slate-200 animate-pulse" />
        <StatCardSkeleton count={4} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
          <div className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Hero Personalized Banner */}
      <StudentHeroBanner
        profile={dashboardData?.profile}
        todaySchedule={dashboardData?.todaySchedule}
      />

      {/* 2. Key Academic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {statsCards.map((stat) => (
          <StudentStatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* 3. Primary Section: Today's Schedule + Academic Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Schedule Timeline */}
        <div className="lg:col-span-5">
          <TodayClassesWidget schedule={dashboardData?.todaySchedule} />
        </div>

        {/* Grades Evolution Chart */}
        <div className="lg:col-span-7">
          <GradesOverviewChart
            gradesTrend={dashboardData?.gradesTrend}
            subjects={dashboardData?.subjects}
          />
        </div>
      </div>

      {/* 4. Secondary Section: Homework & Assignments + School Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Homework Widget */}
        <div className="lg:col-span-7">
          <UpcomingAssignmentsWidget
            assignments={dashboardData?.upcomingAssignments}
          />
        </div>

        {/* Recent Notices */}
        <div className="lg:col-span-5">
          <RecentAnnouncementsWidget
            announcements={dashboardData?.announcements}
          />
        </div>
      </div>

      {/* 5. Subjects & Progress Grid */}
      <div>
        <SubjectsProgressWidget subjects={dashboardData?.subjects} />
      </div>
    </div>
  );
}
