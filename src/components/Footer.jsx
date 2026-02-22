import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center font-bold text-primary">M</div>
              <span className="text-white text-lg font-bold">MeetConnect</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your go-to platform for mock interview scheduling, preparation, and practice. Land your dream job with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-accent transition-colors">Dashboard</Link></li>
              <li><Link to="/my-interviews" className="hover:text-accent transition-colors">My Interviews</Link></li>
              <li><Link to="/practice" className="hover:text-accent transition-colors">Practice Resources</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-3">Connect With Us</h4>
            <div className="flex gap-4 text-xl">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors"><FaLinkedin /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors"><FaGithub /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors"><FaTwitter /></a>
            </div>
            <p className="text-xs text-gray-500 mt-4">© {new Date().getFullYear()} MeetConnect. All rights reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;