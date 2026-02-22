import { FaCalendarAlt, FaClock, FaUserTie, FaLaptopCode, FaStar, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';

const typeColors = {
  Frontend: 'bg-blue-100 text-blue-700',
  Backend: 'bg-purple-100 text-purple-700',
  'Full-Stack': 'bg-green-100 text-green-700',
  DSA: 'bg-yellow-100 text-yellow-700',
  Behavioral: 'bg-pink-100 text-pink-700',
};

const resultColors = {
  Pass: 'bg-green-100 text-green-700',
  Fail: 'bg-red-100 text-red-700',
  Pending: 'bg-gray-100 text-gray-600',
};

const InterviewCard = ({ interview, type, onCancel }) => {
  const formattedDate = new Date(interview.date).toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      {/* Top Row */}
      <div className="flex items-start justify-between mb-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[interview.interviewType] || 'bg-gray-100 text-gray-600'}`}>
          {interview.interviewType}
        </span>
        {type === 'completed' && (
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${resultColors[interview.result]}`}>
            {interview.result}
          </span>
        )}
        {type === 'upcoming' && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/20 text-primary">
            Upcoming
          </span>
        )}
      </div>

      {/* Interviewer */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-sm">
          {interview.interviewer?.avatar || interview.interviewer?.name?.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{interview.interviewer?.name}</p>
          <p className="text-xs text-gray-500">{interview.interviewer?.role}</p>
        </div>
      </div>

      {/* Date & Time */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <FaCalendarAlt className="text-secondary" /> {formattedDate}
        </span>
        <span className="flex items-center gap-1">
          <FaClock className="text-secondary" /> {interview.time}
        </span>
      </div>

      {/* Completed: Score + Feedback */}
      {type === 'completed' && (
        <div className="space-y-2 mb-4">
          {interview.score !== undefined && (
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700">Score: {interview.score}/10</span>
            </div>
          )}
          {interview.feedback && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-600 italic">"{interview.feedback}"</p>
            </div>
          )}
        </div>
      )}

      {/* Upcoming: Resources */}
      {type === 'upcoming' && interview.resources?.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Prep Resources:</p>
          <div className="space-y-1">
            {interview.resources.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-secondary hover:underline"
              >
                <FaExternalLinkAlt size={10} /> {res.title}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Cancel Button for Upcoming */}
      {type === 'upcoming' && onCancel && (
        <button
          onClick={() => onCancel(interview._id)}
          className="flex items-center gap-2 text-xs text-red-500 hover:text-red-700 transition-colors mt-2"
        >
          <FaTrash size={11} /> Cancel Interview
        </button>
      )}
    </div>
  );
};

export default InterviewCard;