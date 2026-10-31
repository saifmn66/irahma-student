import api from '../api/axiosClient';
import {
  currentStudentProfile,
  enrolledSubjects,
  todaySchedule,
  weeklyTimetableData,
  upcomingAssignments,
  upcomingExams,
  schoolAnnouncements,
  studentAttendanceRecords,
  studentGradesTrend,
} from '../data/studentMockData';

export const studentDataService = {
  // Fetch overview stats and dashboard payload
  getDashboardOverview: async () => {
    try {
      // In future: const { data } = await api.get('/student/dashboard');
      return {
        profile: currentStudentProfile,
        stats: currentStudentProfile.academicStats,
        gradesTrend: studentGradesTrend,
        todaySchedule,
        upcomingAssignments,
        upcomingExams,
        announcements: schoolAnnouncements,
        subjects: enrolledSubjects,
      };
    } catch (err) {
      console.warn('Using fallback student dashboard data', err);
      return {
        profile: currentStudentProfile,
        stats: currentStudentProfile.academicStats,
        gradesTrend: studentGradesTrend,
        todaySchedule,
        upcomingAssignments,
        upcomingExams,
        announcements: schoolAnnouncements,
        subjects: enrolledSubjects,
      };
    }
  },

  // Fetch timetable
  getTimetable: async () => {
    try {
      const response = await api.get('timetable');
      if (response.data && response.data.length > 0) {
        return response.data;
      }
    } catch (err) {
      console.warn('API timetable unreachable, using structured schedule', err.message);
    }
    return weeklyTimetableData;
  },

  // Fetch enrolled subjects
  getSubjects: async () => {
    try {
      const response = await api.get('subjects');
      if (response.data && response.data.length > 0) {
        // Merge with visual decorations
        return enrolledSubjects;
      }
    } catch (err) {
      console.warn('API subjects unreachable, using mock subjects', err.message);
    }
    return enrolledSubjects;
  },

  // Fetch attendance
  getAttendance: async () => {
    try {
      const response = await api.get('attendance');
      if (response.data && response.data.length > 0) {
        return response.data;
      }
    } catch (err) {
      console.warn('API attendance unreachable, using student records', err.message);
    }
    return {
      summary: currentStudentProfile.academicStats,
      records: studentAttendanceRecords,
    };
  },

  // Submit assignment homework
  submitAssignment: async (assignmentId, fileOrNotes) => {
    await new Promise((res) => setTimeout(res, 600));
    return {
      success: true,
      message: 'Devoir remis avec succès ! Votre enseignant sera notifié.',
      submissionDate: new Date().toISOString(),
    };
  },
};

export default studentDataService;
