import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import API from '../utils/api';
import {
  FaFileAlt, FaUpload, FaCheckCircle, FaTimesCircle,
  FaLightbulb, FaRoad, FaStar,
} from 'react-icons/fa';

const categoryColors = {
  Frontend: { bg: 'bg-blue-100', text: 'text-blue-700', bar: '#3B82F6' },
  Backend: { bg: 'bg-purple-100', text: 'text-purple-700', bar: '#8B5CF6' },
  'Full-Stack': { bg: 'bg-green-100', text: 'text-green-700', bar: '#10B981' },
  DSA: { bg: 'bg-yellow-100', text: 'text-yellow-700', bar: '#F59E0B' },
  Behavioral: { bg: 'bg-pink-100', text: 'text-pink-700', bar: '#EC4899' },
};

const ScoreBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-xs font-medium text-gray-600">{label}</span>
      <span className="text-xs font-bold text-gray-800">{value}%</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2.5">
      <div
        className="h-2.5 rounded-full transition-all duration-700"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      setResult(null);
    } else {
      toast.error('Please upload a PDF file only');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === 'application/pdf') {
      setFile(dropped);
      setResult(null);
    } else {
      toast.error('Please upload a PDF file only');
    }
  };

  const handleAnalyze = async () => {
    if (!file) { toast.error('Please upload your resume first'); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const { data } = await API.post('/resume/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(data);
      toast.success('Resume analyzed successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to analyze resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="bg-gradient-to-r from-primary to-secondary text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <FaFileAlt className="text-accent text-xl" />
            <h1 className="text-3xl font-bold">Smart Resume Analyzer</h1>
          </div>
          <p className="text-light text-sm">Upload your resume and get a personalized 30-day interview prep roadmap</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {!result ? (
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-base font-bold text-gray-700 mb-2">Upload Your Resume</h3>
              <p className="text-sm text-gray-500 mb-6">PDF format only, max 5MB. We analyze your skills, detect gaps, and build your roadmap.</p>

              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer mb-6 ${
                  dragging ? 'border-secondary bg-light' : file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-secondary hover:bg-gray-50'
                }`}
                onClick={() => document.getElementById('resumeInput').click()}
              >
                <input
                  id="resumeInput"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {file ? (
                  <>
                    <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-3" />
                    <p className="text-sm font-semibold text-green-700">{file.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                  </>
                ) : (
                  <>
                    <FaUpload className="text-gray-400 text-4xl mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-600">Drag & drop your resume here</p>
                    <p className="text-xs text-gray-400 mt-1">or click to browse files</p>
                    <p className="text-xs text-gray-400 mt-2">PDF only • Max 5MB</p>
                  </>
                )}
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!file || loading}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-sm hover:bg-secondary transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <FaFileAlt /> Analyze My Resume
                  </>
                )}
              </button>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {['Skill Detection', 'Gap Analysis', '30-Day Roadmap'].map((item) => (
                  <div key={item} className="bg-light rounded-xl p-3">
                    <p className="text-xs font-semibold text-primary">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Resume Score</p>
                <div className="text-6xl font-black text-primary mb-2">{result.overallScore}%</div>
                <p className="text-sm text-gray-500">{result.pageCount} page resume • {result.wordCount} words</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Best Interview Fit</p>
                <div className={`text-xl font-black px-4 py-2 rounded-xl inline-block ${categoryColors[result.bestFit]?.bg} ${categoryColors[result.bestFit]?.text}`}>
                  {result.bestFit}
                </div>
                <p className="text-xs text-gray-500 mt-3">Based on detected skills in your resume</p>
              </div>

              {/* FIXED SECTION */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</p>

                <button
                  onClick={() => { setResult(null); setFile(null); }}
                  className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-secondary transition mb-2"
                >
                  Analyze Another Resume
                </button>

                <a
                  href="/my-interviews"
                  className="w-full border-2 border-primary text-primary py-2 rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition text-center block"
                >
                  Schedule an Interview
                </a>
              </div>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ResumeAnalyzer;