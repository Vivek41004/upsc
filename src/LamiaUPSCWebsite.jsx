import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, Brain, Heart, Star, Filter, Moon, Sun, Bookmark } from 'lucide-react';

const LamiaUPSCWebsite = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [bookmarkedSubjects, setBookmarkedSubjects] = useState([]);

  const subjects = [
    {
      name: "Medical Science",
      mbsOverlap: 95,
      scoring: 85,
      syllabusSize: "Medium",
      suitability: "Perfect for MBBS background",
      challenges: "Vast syllabus, needs current updates",
      color: "bg-blue-500"
    },
    {
      name: "Anthropology",
      mbsOverlap: 40,
      scoring: 90,
      syllabusSize: "Medium",
      suitability: "Good for analytical minds",
      challenges: "Abstract concepts, less overlap",
      color: "bg-purple-500"
    },
    {
      name: "Psychology",
      mbsOverlap: 60,
      scoring: 85,
      syllabusSize: "Small",
      suitability: "Human behavior understanding",
      challenges: "Subjective answers, case studies",
      color: "bg-pink-500"
    },
    {
      name: "Philosophy",
      mbsOverlap: 20,
      scoring: 80,
      syllabusSize: "Large",
      suitability: "Logical thinking development",
      challenges: "Abstract thinking, lengthy answers",
      color: "bg-indigo-500"
    },
    {
      name: "Zoology",
      mbsOverlap: 75,
      scoring: 82,
      syllabusSize: "Large",
      suitability: "Strong biology foundation",
      challenges: "Diagram intensive, detailed study",
      color: "bg-green-500"
    }
  ];

  const moreSubjects = [
    "Sociology", "Public Administration", "Literature", "Statistics", 
    "Law", "Geography", "Botany", "Management"
  ];

  const quizQuestions = [
    {
      question: "What's your primary interest?",
      options: ["Stay in science", "Explore society & behavior", "Analytical subjects", "Creative subjects"]
    },
    {
      question: "How do you prefer to study?",
      options: ["Diagrams & visuals", "Text & theory", "Case studies", "Practical examples"]
    },
    {
      question: "What's your scoring priority?",
      options: ["Maximum overlap with MBBS", "Highest scoring potential", "Manageable syllabus", "Personal interest"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const ParticleBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );

  const SubjectCard = ({ subject, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(bookmarkedSubjects.includes(subject.name));

    const toggleBookmark = () => {
      if (isBookmarked) {
        setBookmarkedSubjects(prev => prev.filter(s => s !== subject.name));
      } else {
        setBookmarkedSubjects(prev => [...prev, subject.name]);
      }
      setIsBookmarked(!isBookmarked);
    };

    return (
      <motion.div
        className="relative w-80 h-96 perspective-1000"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="relative w-full h-full preserve-3d transition-transform duration-700"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
          {/* Front of card */}
          <div className={`absolute inset-0 w-full h-full ${subject.color} bg-opacity-20 backdrop-blur-lg rounded-xl border border-white/20 p-6 backface-hidden`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white">{subject.name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark();
                }}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked ? 'bg-yellow-400 text-yellow-900' : 'bg-white/20 text-white'
                }`}
              >
                <Bookmark size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white/80">MBBS Overlap:</span>
                <div className="flex-1 bg-white/20 rounded-full h-2">
                  <motion.div
                    className="h-2 bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.mbsOverlap}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </div>
                <span className="text-sm text-white font-semibold">{subject.mbsOverlap}%</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white/80">Scoring:</span>
                <div className="flex-1 bg-white/20 rounded-full h-2">
                  <motion.div
                    className="h-2 bg-green-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.scoring}%` }}
                    transition={{ delay: 0.7, duration: 1 }}
                  />
                </div>
                <span className="text-sm text-white font-semibold">{subject.scoring}%</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <p className="text-white/90 text-sm leading-relaxed">{subject.suitability}</p>
            </div>
            
            <div className="absolute bottom-4 left-6 right-6">
              <p className="text-white/70 text-xs text-center">Click to flip for details</p>
            </div>
          </div>
          
          {/* Back of card */}
          <div className={`absolute inset-0 w-full h-full ${subject.color} bg-opacity-30 backdrop-blur-lg rounded-xl border border-white/20 p-6 backface-hidden rotate-y-180`}>
            <h3 className="text-2xl font-bold text-white mb-4">{subject.name}</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">✅ Why it suits you:</h4>
                <p className="text-white/90 text-sm">{subject.suitability}</p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">⚠️ Challenges:</h4>
                <p className="text-white/90 text-sm">{subject.challenges}</p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">📚 Syllabus Size:</h4>
                <p className="text-white/90 text-sm">{subject.syllabusSize}</p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">📈 Scoring Potential:</h4>
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(subject.scoring / 20) ? 'text-yellow-400 fill-current' : 'text-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const QuizSection = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleAnswer = (answer) => {
      setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizAnswers(answers);
        setShowRecommendation(true);
      }
    };

    const getRecommendation = () => {
      // Simple logic for demonstration
      if (answers[0] === "Stay in science") {
        return ["Medical Science", "Zoology"];
      } else if (answers[0] === "Explore society & behavior") {
        return ["Anthropology", "Psychology"];
      } else {
        return ["Philosophy", "Psychology"];
      }
    };

    return (
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!showRecommendation ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold mb-8 text-white">
                {quizQuestions[currentQuestion].question}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className="p-4 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="mb-6"
              >
                <span className="text-6xl">🎉</span>
              </motion.div>
              <h3 className="text-3xl font-bold mb-4 text-white">
                Your Top 2 Matches:
              </h3>
              <div className="flex justify-center space-x-4">
                {getRecommendation().map((subject, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-lg text-white font-semibold"
                  >
                    {subject}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const ComparisonTable = () => {
    const [sortBy, setSortBy] = useState('scoring');
    const [sortOrder, setSortOrder] = useState('desc');

    const sortedSubjects = [...subjects].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

    return (
      <div className="overflow-x-auto">
        <table className="w-full bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
          <thead>
            <tr className="border-b border-white/20">
              <th className="p-4 text-left text-white font-semibold">Subject</th>
              <th 
                className="p-4 text-left text-white font-semibold cursor-pointer hover:bg-white/10"
                onClick={() => {
                  setSortBy('scoring');
                  setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
                }}
              >
                Scoring Potential
              </th>
              <th 
                className="p-4 text-left text-white font-semibold cursor-pointer hover:bg-white/10"
                onClick={() => {
                  setSortBy('mbsOverlap');
                  setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
                }}
              >
                MBBS Overlap
              </th>
              <th className="p-4 text-left text-white font-semibold">Syllabus Size</th>
            </tr>
          </thead>
          <tbody>
            {sortedSubjects.map((subject, index) => (
              <motion.tr
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <td className="p-4 text-white font-medium">{subject.name}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-white/20 rounded-full h-2">
                      <div 
                        className="h-2 bg-green-400 rounded-full"
                        style={{ width: `${subject.scoring}%` }}
                      />
                    </div>
                    <span className="text-white text-sm">{subject.scoring}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-white/20 rounded-full h-2">
                      <div 
                        className="h-2 bg-blue-400 rounded-full"
                        style={{ width: `${subject.mbsOverlap}%` }}
                      />
                    </div>
                    <span className="text-white text-sm">{subject.mbsOverlap}%</span>
                  </div>
                </td>
                <td className="p-4 text-white">{subject.syllabusSize}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500'
    }`}>
      <ParticleBackground />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Lamiah's UPSC Journey
          </motion.h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="text-white">
              <span className="text-sm">Bookmarked: {bookmarkedSubjects.length}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Lamiah, Let's Find Your{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Perfect Optional Subject!
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tailored for your MBBS background. Designed for your dreams.
          </motion.p>
          
          <motion.button
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Begin! 🚀
          </motion.button>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Your Medical Foundation</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              You've mastered human anatomy, but now it's time to master India's governance too!
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🩺", text: "MBBS Knowledge", desc: "Strong foundation in medical sciences" },
              { icon: "🧠", text: "Analytical Skills", desc: "Problem-solving mindset from medical training" },
              { icon: "📚", text: "Study Discipline", desc: "Proven ability to handle vast syllabi" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.text}</h3>
                <p className="text-white/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Recommended Subjects */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Top Recommended Subjects
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-8">
            {subjects.map((subject, index) => (
              <SubjectCard key={subject.name} subject={subject} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Explore More Options */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Explore More Options
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moreSubjects.map((subject, index) => (
              <motion.div
                key={subject}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20 text-center text-white font-medium hover:bg-white/20 transition-all cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {subject}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Recommendation Quiz */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Find Your Perfect Match
          </motion.h2>
          
          <QuizSection />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Subject Comparison
          </motion.h2>
          
          <ComparisonTable />
        </div>
      </section>

      {/* Motivation Footer */}
      <footer className="py-16 px-4 bg-black/20">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex justify-center space-x-4 mb-6">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl"
              >
                📚
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                className="text-4xl"
              >
                🎓
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                className="text-4xl"
              >
                🏆
              </motion.div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">
              Remember Lamiah, choosing the right optional is the first step in your UPSC success.
            </h2>
            
            <p className="text-xl text-white/90 mb-8">
              Your medical background gives you a unique advantage. Use it wisely!
            </p>
            
            <motion.button
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ready to choose? Let's begin your preparation! 🚀
            </motion.button>
          </motion.div>
          
          <div className="text-white/60 text-sm">
            <p>Made with ❤️ for Lamiah's UPSC journey</p>
            <p className="mt-2">🎯 Easter Egg: You're destined for greatness, Dr. Lamiah! 🎯</p>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-white/20 backdrop-blur-lg text-white p-3 rounded-full hover:bg-white/30 transition-all z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronDown className="rotate-180" size={24} />
      </motion.button>
    </div>
  );
};

export default LamiaUPSCWebsite;