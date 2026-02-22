import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Interview from '../models/Interview.js';
import User from '../models/User.js';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected for seeding...');

  // Find first user
  const user = await User.findOne();
  if (!user) { console.log('Create a user first via /api/auth/register'); process.exit(); }

  const interviews = [
    {
      user: user._id,
      interviewType: 'Frontend',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      time: '10:00',
      interviewer: { name: 'Sarah Johnson', role: 'Senior Frontend Engineer', avatar: 'SJ' },
      status: 'upcoming',
      resources: [
        { title: 'JavaScript.info', url: 'https://javascript.info' },
        { title: 'CSS Tricks', url: 'https://css-tricks.com' },
      ],
    },
    {
      user: user._id,
      interviewType: 'DSA',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      time: '14:00',
      interviewer: { name: 'David Kim', role: 'DSA & Algorithms Expert', avatar: 'DK' },
      status: 'completed',
      feedback: 'Great problem-solving approach! Work on optimizing time complexity.',
      score: 7,
      result: 'Pass',
    },
    {
      user: user._id,
      interviewType: 'Behavioral',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      time: '11:00',
      interviewer: { name: 'Aisha Rodriguez', role: 'Behavioral Coach', avatar: 'AR' },
      status: 'completed',
      feedback: 'Good use of STAR method. Be more concise in your answers.',
      score: 8,
      result: 'Pass',
    },
  ];

  await Interview.deleteMany({ user: user._id });
  await Interview.insertMany(interviews);
  console.log('✅ Seed data inserted!');
  process.exit();
};

seed().catch(console.error);