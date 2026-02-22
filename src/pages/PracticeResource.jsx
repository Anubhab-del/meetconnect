import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, fetchBlogs } from '../redux/slices/practiceSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

const categories = ['Frontend', 'Backend', 'Full-Stack', 'Behavioral', 'DSA'];

const difficultyColors = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Hard: 'bg-red-100 text-red-700',
};

const PracticeResource = () => {
  const dispatch = useDispatch();
  const {
    questions = [],
    blogs = [],
    totalPages = 1,
    currentPage = 1,
    totalQuestions = 0,
    loading,
  } = useSelector((state) => state.practice);

  const [category, setCategory] = useState('Frontend');

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchQuestions({ category, page: 1 }));
  }, [category, dispatch]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    dispatch(fetchQuestions({ category, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Practice Resources</h1>
          <p className="text-light mt-1 text-sm">
            Browse interview questions and blogs to sharpen your skills
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT — Questions */}
          <div className="flex-1">

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === cat
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-secondary hover:text-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-primary">
                {category} Interview Questions
              </h2>
              <span className="text-xs text-gray-500">
                {totalQuestions} questions total
              </span>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex justify-center py-16">
                <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Questions List */}
            {!loading && (
              <div className="space-y-3">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-lg font-black text-accent flex-shrink-0">
                        {String((currentPage - 1) * 10 + idx + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 leading-relaxed">
                          {q.question}
                        </p>
                        <span
                          className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                            difficultyColors[q.difficulty] ||
                            'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft size={14} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                        currentPage === page
                          ? 'bg-primary text-white shadow'
                          : 'border border-gray-300 text-gray-600 hover:bg-light hover:border-secondary'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}
          </div>

          {/* RIGHT — Blogs Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-20">
              <h3 className="text-base font-bold text-primary mb-4">
                📚 Recommended Blogs
              </h3>

              <div className="space-y-4">
                {blogs.map((blog) => (
                  <a
                    key={blog.id}
                    href={blog.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-3 rounded-xl border border-gray-100 hover:border-secondary hover:bg-light transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors leading-snug">
                        {blog.title}
                      </p>
                      <FaExternalLinkAlt
                        className="text-gray-400 group-hover:text-secondary flex-shrink-0 mt-0.5"
                        size={12}
                      />
                    </div>

                    <span
                      className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                        blog.category === 'Technical'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-pink-100 text-pink-700'
                      }`}
                    >
                      {blog.category}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PracticeResource;