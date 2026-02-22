import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { scheduleInterview, clearInterviewStatus } from '../redux/slices/interviewSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaCalendarAlt, FaClock, FaUserTie, FaLaptopCode } from 'react-icons/fa';

const interviewers = [
  { name: 'Sarah Johnson', role: 'Senior Frontend Engineer', avatar: 'SJ' },
  { name: 'Michael Chen', role: 'Full Stack Developer', avatar: 'MC' },
  { name: 'Priya Patel', role: 'Backend Engineer', avatar: 'PP' },
  { name: 'David Kim', role: 'DSA & Algorithms Expert', avatar: 'DK' },
  { name: 'Aisha Rodriguez', role: 'Behavioral Coach', avatar: 'AR' },
];

const interviewTypes = ['Frontend', 'Backend', 'Full-Stack', 'DSA', 'Behavioral'];

const stats = [
  { label: 'Mock Interviews Done', value: '10,000+' },
  { label: 'Expert Interviewers', value: '50+' },
  { label: 'Students Placed', value: '2,500+' },
  { label: 'Companies', value: '200+' },
];

const faqs = [
  { q: 'How do I schedule a mock interview?', a: 'Simply fill in the schedule form on this page — choose your interview type, date, time and preferred interviewer, then hit Submit.' },
  { q: 'Can I reschedule or cancel an interview?', a: 'Yes! Head to My Interviews and cancel any upcoming interview from there. Rescheduling can be done by cancelling and booking a new slot.' },
  { q: 'Who are the interviewers?', a: 'Our interviewers are industry professionals with experience at top tech companies, carefully vetted by the MeetConnect team.' },
  { q: 'Is there any cost involved?', a: 'MeetConnect offers a free tier with limited mock interviews. Premium plans are available for unlimited access.' },
  { q: 'How do I access practice resources?', a: 'Visit the Practice Resources page from the header. You can filter by category and browse interview questions and blogs.' },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.interviews);
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    interviewType: '',
    date: '',
    time: '',
    interviewer: null,
  });
  const [errors, setErrors] = useState({});
  const [openFaq, setOpenFaq] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.interviewType) e.interviewType = 'Please select an interview type';
    if (!form.date) e.date = 'Please select a date';
    else if (new Date(form.date) < new Date().setHours(0, 0, 0, 0)) e.date = 'Date cannot be in the past';
    if (!form.time) e.time = 'Please select a time';
    if (!form.interviewer) e.interviewer = 'Please choose an interviewer';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(scheduleInterview(form)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Interview scheduled successfully! 🎉');
        setForm({ interviewType: '', date: '', time: '', interviewer: null });
        setErrors({});
        dispatch(clearInterviewStatus());
      } else {
        toast.error('Failed to schedule interview');
      }
    });
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-secondary transition ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300'
    }`;

  // Get today's date string for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-lg text-light max-w-2xl mx-auto mb-8">
            Practice makes perfect. Schedule your mock interview today and take one step closer to landing your dream job.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-10">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-2xl font-bold text-accent">{stat.value}</p>
                <p className="text-xs text-light mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary">Schedule an Interview</h2>
          <p className="text-gray-500 mt-2">Fill in the details below to book your mock session</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Interview Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaLaptopCode className="inline mr-2 text-secondary" />
                Type of Interview
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {interviewTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => { setForm({ ...form, interviewType: type }); setErrors({ ...errors, interviewType: '' }); }}
                    className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                      form.interviewType === type
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-secondary hover:text-secondary'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.interviewType && <p className="text-red-500 text-xs mt-1">{errors.interviewType}</p>}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaCalendarAlt className="inline mr-2 text-secondary" />
                  Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={(e) => { setForm({ ...form, date: e.target.value }); setErrors({ ...errors, date: '' }); }}
                  className={inputClass('date')}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaClock className="inline mr-2 text-secondary" />
                  Time
                </label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => { setForm({ ...form, time: e.target.value }); setErrors({ ...errors, time: '' }); }}
                  className={inputClass('time')}
                />
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>
            </div>

            {/* Choose Interviewer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaUserTie className="inline mr-2 text-secondary" />
                Choose Interviewer
              </label>
              <div className="space-y-3">
                {interviewers.map((interviewer) => (
                  <div
                    key={interviewer.name}
                    onClick={() => { setForm({ ...form, interviewer }); setErrors({ ...errors, interviewer: '' }); }}
                    className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all ${
                      form.interviewer?.name === interviewer.name
                        ? 'border-primary bg-light shadow'
                        : 'border-gray-200 hover:border-secondary hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {interviewer.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{interviewer.name}</p>
                      <p className="text-xs text-gray-500">{interviewer.role}</p>
                    </div>
                    {form.interviewer?.name === interviewer.name && (
                      <span className="ml-auto text-primary text-lg">✓</span>
                    )}
                  </div>
                ))}
              </div>
              {errors.interviewer && <p className="text-red-500 text-xs mt-1">{errors.interviewer}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-secondary transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Scheduling...' : 'Schedule Interview 🚀'}
            </button>
          </form>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-light py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Schedule', desc: 'Pick your interview type, date, time and preferred interviewer.' },
              { step: '02', title: 'Practice', desc: 'Join the mock interview session and get grilled by our expert interviewers.' },
              { step: '03', title: 'Improve', desc: 'Receive detailed feedback, scores and resources to level up your skills.' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-5xl font-black text-accent mb-4">{item.step}</div>
                <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-4 py-14 w-full">
        <h2 className="text-3xl font-bold text-primary text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
              >
                {faq.q}
                <span className={`text-secondary text-lg transition-transform ${openFaq === idx ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;