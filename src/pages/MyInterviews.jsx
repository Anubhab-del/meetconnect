import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  fetchUpcomingInterviews,
  fetchCompletedInterviews,
  cancelInterview,
} from '../redux/slices/interviewSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InterviewCard from '../components/InterviewCard';
import { FaFilter } from 'react-icons/fa';

const interviewTypes = ['All', 'Frontend', 'Backend', 'Full-Stack', 'DSA', 'Behavioral'];

const MyInterviews = () => {
  const dispatch = useDispatch();
  const { upcoming, completed, loading } = useSelector((state) => state.interviews);
  const [tab, setTab] = useState('upcoming');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    if (tab === 'upcoming') dispatch(fetchUpcomingInterviews());
    else dispatch(fetchCompletedInterviews());
  }, [tab, dispatch]);

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this interview?')) {
      dispatch(cancelInterview(id)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') toast.success('Interview cancelled');
        else toast.error('Failed to cancel interview');
      });
    }
  };

  const interviews = tab === 'upcoming' ? upcoming : completed;
  const filtered = filterType === 'All'
    ? interviews
    : interviews.filter((i) => i.interviewType === filterType);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">My Interviews</h1>
          <p className="text-light mt-1 text-sm">Track all your scheduled and completed mock interviews</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

        {/* Tabs + Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Tabs */}
          <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 p-1 w-fit">
            {['upcoming', 'completed'].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setFilterType('All'); }}
                className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                  tab === t ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-primary'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-secondary text-sm" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              {interviewTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-lg font-semibold text-gray-700">No {tab} interviews found</h3>
            <p className="text-gray-500 text-sm mt-1">
              {tab === 'upcoming' ? 'Schedule a mock interview from the dashboard.' : 'Completed interviews will appear here.'}
            </p>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((interview) => (
              <InterviewCard
                key={interview._id}
                interview={interview}
                type={tab}
                onCancel={tab === 'upcoming' ? handleCancel : null}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyInterviews;