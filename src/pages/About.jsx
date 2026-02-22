import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const team = [
  { name: 'Sarah Johnson', role: 'Co-Founder & CEO', bio: 'Former Google engineer with 10+ years of experience. Passionate about democratizing interview prep.', avatar: 'SJ' },
  { name: 'Michael Chen', role: 'Co-Founder & CTO', bio: 'Ex-Amazon tech lead. Built distributed systems at scale. Loves mentoring developers.', avatar: 'MC' },
  { name: 'Priya Patel', role: 'Head of Product', bio: 'Product manager turned entrepreneur. Focused on creating seamless user experiences.', avatar: 'PP' },
  { name: 'David Kim', role: 'Lead Engineer', bio: 'Full-stack developer obsessed with clean code and scalable architecture.', avatar: 'DK' },
];

const investors = [
  { name: 'TechVentures Capital', amount: '$2M Seed Round', logo: 'TV' },
  { name: 'EdTech Fund', amount: '$5M Series A', logo: 'EF' },
  { name: 'Future Labs', amount: 'Strategic Partner', logo: 'FL' },
];

const values = [
  { icon: '🎯', title: 'Mission-Driven', desc: 'We exist to help every developer land their dream job, regardless of their background.' },
  { icon: '🤝', title: 'Community First', desc: 'We believe in the power of community and peer learning to accelerate growth.' },
  { icon: '⚡', title: 'Continuous Improvement', desc: 'We iterate fast, listen to feedback, and relentlessly improve our platform.' },
  { icon: '🌍', title: 'Inclusive', desc: 'We welcome everyone — from bootcamp grads to CS PhDs — and everything in between.' },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center font-black text-primary text-3xl mx-auto mb-6">M</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">About MeetConnect</h1>
          <p className="text-light text-lg max-w-2xl mx-auto leading-relaxed">
            We're on a mission to make quality interview preparation accessible to every developer on the planet.
            MeetConnect connects aspiring engineers with industry experts for realistic, structured mock interviews.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
        <p className="text-gray-600 leading-relaxed text-base max-w-3xl mx-auto">
          MeetConnect was born out of frustration. Our founders, Sarah and Michael, went through dozens of interviews
          at top tech companies and realized that the biggest gap wasn't technical skill — it was practice.
          They knew how to code, but they weren't used to thinking out loud, handling pressure, or articulating
          their thought process. After helping friends land jobs at FAANG companies through mock sessions, they
          decided to build a platform that could scale this impact to thousands of developers worldwide.
        </p>
      </section>

      {/* Values */}
      <section className="bg-light py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-10">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-primary text-base mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <h2 className="text-3xl font-bold text-primary text-center mb-2">Meet the Team</h2>
        <p className="text-gray-500 text-center mb-10 text-sm">The people behind MeetConnect</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
                {member.avatar}
              </div>
              <h3 className="font-bold text-gray-800 text-base">{member.name}</h3>
              <p className="text-secondary text-xs font-semibold mt-0.5 mb-3">{member.role}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
              <div className="flex justify-center gap-3 mt-4 text-gray-400">
                <a href="#" className="hover:text-primary transition-colors"><FaLinkedin size={16} /></a>
                <a href="#" className="hover:text-primary transition-colors"><FaGithub size={16} /></a>
                <a href="#" className="hover:text-primary transition-colors"><FaTwitter size={16} /></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Investors */}
      <section className="bg-dark text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Our Investors</h2>
          <p className="text-gray-400 text-center text-sm mb-10">Backed by world-class investors who believe in our mission</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {investors.map((inv) => (
              <div key={inv.name} className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center hover:bg-white/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-black text-primary text-lg mx-auto mb-4">
                  {inv.logo}
                </div>
                <h3 className="font-semibold text-white text-sm">{inv.name}</h3>
                <p className="text-accent text-xs mt-1 font-medium">{inv.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;