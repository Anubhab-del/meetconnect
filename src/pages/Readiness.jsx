import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReadiness } from '../redux/slices/readinessSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts';

const categoryColors = {
  Frontend: '#3B82F6',
  Backend: '#8B5CF6',
  'Full-Stack': '#10B981',
  DSA: '#F59E0B',
  Behavioral: '#EC4899',
};

const categoryEmojis = {
  Frontend: '🎨',
  Backend: '⚙️',
  'Full-Stack': '🌐',
  DSA: '🧠',
  Behavioral: '🤝',
};

const CircularProgress = ({ value, size = 160, strokeWidth = 12, color = '#40916C' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E5E7EB" strokeWidth={strokeWidth} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke={color} strokeWidth={strokeWidth} fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
      />
    </svg>
  );
};

const Readiness = () => {
  const dispatch = useDispatch();
  const { readiness, overallReadiness, label, recommendation, totalInterviews, history, loading } = useSelector((state) => state.readiness);

  useEffect(() => {
    dispatch(fetchReadiness());
  }, [dispatch]);

  const radarData = Object.keys(readiness).map((key) => ({
    subject: key,
    score: readiness[key],
    fullMark: 100,
  }));

  const historyData = history.map((h) => ({
    date: new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: Math.round((h.score / 10) * 100),
    type: h.type,
  }));

  const getColor = (score) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    if (score >= 40) return '#3B82F6';
    return '#EF4444';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Interview Readiness Score</h1>
          <p className="text-light mt-1 text-sm">Track your progress and know exactly where you stand</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">

          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            {/* Overall Score Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Overall Readiness</p>
              <div className="relative">
                <CircularProgress value={overallReadiness} size={180} strokeWidth={14} color={getColor(overallReadiness)} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-gray-800">{overallReadiness}%</span>
                  <span className="text-xs font-semibold text-secondary mt-1">{label}</span>
                </div>
              </div>
              <div className="mt-6 bg-light rounded-xl p-4 w-full">
                <p className="text-sm text-gray-600 leading-relaxed">{recommendation}</p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-2xl font-black text-primary">{totalInterviews}</span>
                <span className="text-sm text-gray-500">interviews completed</span>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-bold text-primary mb-4">Skills Radar</h3>
              {radarData.length > 0 && radarData.some(d => d.score > 0) ? (
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#6B7280' }} />
                    <Radar
                      name="Readiness"
                      dataKey="score"
                      stroke="#40916C"
                      fill="#40916C"
                      fillOpacity={0.25}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-3">📊</div>
                  <p className="text-gray-500 text-sm">Complete some interviews to see your skills radar</p>
                </div>
              )}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="text-base font-bold text-primary mb-6">Category Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.keys(readiness).map((cat) => (
                <div key={cat} className="flex flex-col items-center p-4 rounded-xl border border-gray-100 hover:border-secondary hover:shadow-sm transition-all">
                  <span className="text-2xl mb-2">{categoryEmojis[cat]}</span>
                  <span className="text-xs font-semibold text-gray-600 mb-3">{cat}</span>
                  <div className="relative">
                    <CircularProgress
                      value={readiness[cat]}
                      size={80}
                      strokeWidth={7}
                      color={categoryColors[cat]}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-black text-gray-800">{readiness[cat]}%</span>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${readiness[cat]}%`, backgroundColor: categoryColors[cat] }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Over Time */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-bold text-primary mb-4">Progress Over Time</h3>
            {historyData.length > 1 ? (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#9CA3AF' }} unit="%" />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    formatter={(value) => [`${value}%`, 'Score']}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#40916C"
                    strokeWidth={3}
                    dot={{ fill: '#40916C', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Interview Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center">
                <div className="text-5xl mb-3">📈</div>
                <p className="text-gray-500 text-sm">Complete at least 2 interviews to see your progress chart</p>
              </div>
            )}
          </div>

        </div>
      )}

      <Footer />
    </div>
  );
};

export default Readiness;