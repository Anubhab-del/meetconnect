import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBattle, fetchOpenBattles, joinBattle,
  submitAnswer, fetchMyBattles, fetchLeaderboard,
  clearBattleStatus, clearCurrentBattle,
} from '../redux/slices/battleSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { FaTrophy, FaClock, FaUsers, FaMedal, FaBolt } from 'react-icons/fa';

const categories = ['Frontend', 'Backend', 'Full-Stack', 'DSA', 'Behavioral'];

const categoryColors = {
  Frontend: 'bg-blue-100 text-blue-700',
  Backend: 'bg-purple-100 text-purple-700',
  'Full-Stack': 'bg-green-100 text-green-700',
  DSA: 'bg-yellow-100 text-yellow-700',
  Behavioral: 'bg-pink-100 text-pink-700',
};

const Timer = ({ seconds, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const pct = (timeLeft / seconds) * 100;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16">
        <svg className="transform -rotate-90 w-16 h-16">
          <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="4" fill="none" />
          <circle
            cx="32" cy="32" r="28"
            stroke={timeLeft < 60 ? '#EF4444' : '#40916C'}
            strokeWidth="4" fill="none"
            strokeDasharray={175.9}
            strokeDashoffset={175.9 - (pct / 100) * 175.9}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xs font-black ${timeLeft < 60 ? 'text-red-500' : 'text-primary'}`}>
            {mins}:{String(secs).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-xs text-gray-500">Time Left</span>
    </div>
  );
};

const Battle = () => {
  const dispatch = useDispatch();
  const { currentBattle, openBattles, myBattles, leaderboard, loading } = useSelector((state) => state.battle);
  const { user } = useSelector((state) => state.auth);
  const [tab, setTab] = useState('lobby');
  const [selectedCategory, setSelectedCategory] = useState('Frontend');
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchOpenBattles());
    dispatch(fetchMyBattles());
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const handleCreate = () => {
    dispatch(createBattle(selectedCategory)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Battle created! Waiting for opponent...');
        setTab('active');
      }
    });
  };

  const handleJoin = (id) => {
    dispatch(joinBattle(id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Joined battle! Answer the question!');
        setTab('active');
        setAnswer('');
        setSubmitted(false);
      } else {
        toast.error('Failed to join battle');
      }
    });
  };

  const handleSubmit = () => {
    if (!answer.trim() || answer.trim().length < 10) {
      toast.error('Please write a more detailed answer');
      return;
    }
    dispatch(submitAnswer({ id: currentBattle._id, answer })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setSubmitted(true);
        toast.success('Answer submitted!');
        dispatch(fetchMyBattles());
        dispatch(fetchLeaderboard());
      }
    });
  };

  const handleTimerExpire = () => {
    if (!submitted && currentBattle) {
      dispatch(submitAnswer({ id: currentBattle._id, answer: answer || 'No answer submitted' }));
      setSubmitted(true);
      toast.warning('Time up! Answer auto-submitted.');
    }
  };

  const isChallenger = currentBattle?.challenger?._id === user?._id || currentBattle?.challenger === user?._id;
  const myScore = isChallenger ? currentBattle?.challengerScore : currentBattle?.opponentScore;
  const opponentScore = isChallenger ? currentBattle?.opponentScore : currentBattle?.challengerScore;
  const myFeedback = isChallenger ? currentBattle?.challengerFeedback : currentBattle?.opponentFeedback;
  const opponentName = isChallenger ? currentBattle?.opponent?.name : currentBattle?.challenger?.name;
  const winnerId = currentBattle?.winner?._id || currentBattle?.winner;
  const iWon = winnerId === user?._id;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="bg-gradient-to-r from-primary to-secondary text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <FaTrophy className="text-accent text-xl" />
            <h1 className="text-3xl font-bold">Interview Battle Mode</h1>
          </div>
          <p className="text-light text-sm">Challenge other students to a live interview duel and climb the leaderboard</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

        {/* Tabs */}
        <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 p-1 w-fit mb-8 flex-wrap gap-1">
          {['lobby', 'active', 'history', 'leaderboard'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                tab === t ? 'bg-primary text-white shadow' : 'text-gray-500 hover:text-primary'
              }`}
            >
              {t === 'leaderboard' ? '🏆 Leaderboard' : t === 'active' ? '⚔️ Active' : t === 'lobby' ? '🎮 Lobby' : '📋 History'}
            </button>
          ))}
        </div>

        {/* LOBBY TAB */}
        {tab === 'lobby' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Create Battle */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-bold text-primary mb-1">⚔️ Create a Battle</h3>
              <p className="text-xs text-gray-500 mb-4">Pick a category and challenge anyone who joins</p>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-primary text-white border-primary'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-secondary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <button
                onClick={handleCreate}
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-secondary transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <FaBolt size={13} />
                {loading ? 'Creating...' : 'Create Battle'}
              </button>
            </div>

            {/* Open Battles */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-primary">🌐 Open Battles</h3>
                <button onClick={() => dispatch(fetchOpenBattles())} className="text-xs text-secondary hover:underline">Refresh</button>
              </div>
              {openBattles.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🎮</div>
                  <p className="text-sm text-gray-500">No open battles right now. Create one!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {openBattles.map((battle) => (
                    <div key={battle._id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-secondary hover:bg-gray-50 transition-all">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{battle.challenger?.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[battle.category]}`}>
                          {battle.category}
                        </span>
                      </div>
                      <button
                        onClick={() => handleJoin(battle._id)}
                        className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-secondary transition-all flex items-center gap-1"
                      >
                        Join ⚔️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ACTIVE TAB */}
        {tab === 'active' && (
          <div>
            {!currentBattle ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-5xl mb-4">⚔️</div>
                <h3 className="text-lg font-bold text-gray-700">No Active Battle</h3>
                <p className="text-sm text-gray-500 mt-1">Go to the Lobby to create or join a battle</p>
                <button
                  onClick={() => setTab('lobby')}
                  className="mt-4 bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-secondary transition"
                >
                  Go to Lobby
                </button>
              </div>
            ) : currentBattle.status === 'waiting' ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-5xl mb-4 animate-pulse">⏳</div>
                <h3 className="text-lg font-bold text-gray-700">Waiting for Opponent...</h3>
                <p className="text-sm text-gray-500 mt-1">Wait for someone to join from the lobby</p>
                <div className="mt-4 bg-light rounded-xl p-4 max-w-sm mx-auto">
                  <p className="text-xs text-gray-600 font-medium">Category: <span className="text-primary font-bold">{currentBattle.category}</span></p>
                </div>
                <button
                  onClick={() => { dispatch(clearCurrentBattle()); setTab('lobby'); }}
                  className="mt-4 text-sm text-red-500 hover:text-red-700"
                >
                  Cancel Battle
                </button>
              </div>
            ) : currentBattle.status === 'completed' ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-2xl mx-auto">
                <div className="text-6xl mb-4">{iWon ? '🏆' : currentBattle.winner ? '😤' : '🤝'}</div>
                <h2 className="text-2xl font-black text-primary mb-1">
                  {iWon ? 'You Won!' : currentBattle.winner ? 'You Lost!' : "It's a Tie!"}
                </h2>
                <p className="text-gray-500 text-sm mb-6">Battle completed</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded-xl ${iWon ? 'bg-green-50 border-2 border-green-300' : 'bg-gray-50'}`}>
                    <p className="text-xs text-gray-500 mb-1">Your Score</p>
                    <p className="text-3xl font-black text-primary">{myScore}<span className="text-base font-normal">/10</span></p>
                    {myFeedback && <p className="text-xs text-gray-500 mt-2 text-left leading-relaxed">{myFeedback}</p>}
                  </div>
                  <div className={`p-4 rounded-xl ${!iWon && currentBattle.winner ? 'bg-green-50 border-2 border-green-300' : 'bg-gray-50'}`}>
                    <p className="text-xs text-gray-500 mb-1">{opponentName || 'Opponent'}</p>
                    <p className="text-3xl font-black text-secondary">{opponentScore}<span className="text-base font-normal">/10</span></p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                  <p className="text-xs font-bold text-gray-600 mb-2">Question:</p>
                  <p className="text-sm text-gray-700">{currentBattle.question}</p>
                </div>
                <button
                  onClick={() => {
                    dispatch(clearCurrentBattle());
                    setTab('lobby');
                    setSubmitted(false);
                    setAnswer('');
                  }}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-secondary transition"
                >
                  Back to Lobby
                </button>
              </div>
            ) : (
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[currentBattle.category]}`}>
                        {currentBattle.category}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">vs {opponentName || 'Opponent'}</p>
                    </div>
                    {!submitted && <Timer seconds={300} onExpire={handleTimerExpire} />}
                  </div>
                  <div className="bg-light rounded-xl p-4 mb-4">
                    <p className="text-xs font-bold text-primary mb-1">Question:</p>
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">{currentBattle.question}</p>
                  </div>
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">✅</div>
                      <p className="text-sm font-semibold text-gray-700">Answer submitted! Waiting for opponent...</p>
                      <button
                        onClick={() => dispatch(fetchMyBattles())}
                        className="mt-3 text-xs text-secondary hover:underline"
                      >
                        Check result
                      </button>
                    </div>
                  ) : (
                    <>
                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        rows={7}
                        placeholder="Type your answer here. Be detailed and structured..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary resize-none mb-3"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{answer.length} characters</span>
                        <button
                          onClick={handleSubmit}
                          disabled={!answer.trim()}
                          className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-secondary transition disabled:opacity-60"
                        >
                          Submit Answer ⚔️
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* HISTORY TAB */}
        {tab === 'history' && (
          <div className="space-y-4">
            {myBattles.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-5xl mb-3">📋</div>
                <p className="text-gray-500 text-sm">No battles yet. Go fight someone!</p>
              </div>
            ) : (
              myBattles.map((battle) => {
                const isChallengerHere = battle.challenger?._id === user?._id;
                const myScoreHere = isChallengerHere ? battle.challengerScore : battle.opponentScore;
                const oppScoreHere = isChallengerHere ? battle.opponentScore : battle.challengerScore;
                const oppNameHere = isChallengerHere ? battle.opponent?.name : battle.challenger?.name;
                const winnerIdHere = battle.winner?._id;
                const wonHere = winnerIdHere === user?._id;

                return (
                  <div key={battle._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[battle.category]}`}>
                          {battle.category}
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          battle.status === 'completed'
                            ? wonHere ? 'bg-green-100 text-green-700'
                            : battle.winner ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-600'
                            : battle.status === 'waiting'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {battle.status === 'completed'
                            ? wonHere ? '🏆 Won' : battle.winner ? '❌ Lost' : '🤝 Tie'
                            : battle.status}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">{new Date(battle.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{battle.question}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>vs {oppNameHere || 'Waiting...'}</span>
                      {battle.status === 'completed' && (
                        <span className="font-semibold">Score: {myScoreHere} vs {oppScoreHere}</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* LEADERBOARD TAB */}
        {tab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white text-center">
                <FaTrophy size={32} className="mx-auto mb-2 text-accent" />
                <h3 className="text-xl font-black">Battle Leaderboard</h3>
                <p className="text-light text-xs mt-1">Top performers across all battles</p>
              </div>
              {leaderboard.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm">No battles completed yet. Be the first!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {leaderboard.map((entry, idx) => (
                    <div key={idx} className={`flex items-center gap-4 px-6 py-4 ${idx < 3 ? 'bg-light/30' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                        idx === 0 ? 'bg-yellow-400 text-white' :
                        idx === 1 ? 'bg-gray-300 text-white' :
                        idx === 2 ? 'bg-orange-400 text-white' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {idx < 3 ? <FaMedal /> : idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{entry.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-primary">{entry.wins}</p>
                        <p className="text-xs text-gray-400">wins</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Battle;