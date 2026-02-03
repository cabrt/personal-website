import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import ExperienceCard from './components/ExperienceCard'
import SkillsSection from './components/SkillsSection'
import './App.css'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const letterAnimation = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

// Animated text component
function AnimatedText({ text, className, delay = 0 }) {
  const words = text.split(' ')
  
  return (
    <motion.span 
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05, delayChildren: delay } }
      }}
    >
      {words.map((word, i) => (
        <motion.span key={i} className="word-wrapper">
          <motion.span 
            className="word"
            variants={letterAnimation}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Section component with scroll animation
function AnimatedSection({ children, className, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50])

  const experiences = [
    {
      title: 'Silicon Labs',
      subtitle: 'Software Developer Intern | June 2025 - May 2026',
      tags: ['Python', 'LoRA', 'PyTorch', 'Jupyter', 'LLM'],
      bullets: [
        'Built a fine-tuned autocomplete model for Silicon Labs\' embedded C code, for code assistance',
        'Led model selection and training strategy: evaluated model variants and implemented LoRA fine-tuning',
        'Authored a reproducible Jupyter notebook (data loading, training loop, checkpoints, eval) to run and iterate training end-to-end',
        'Collaborated across teams to align prompts/evals with embedded-systems patterns and developer workflows'
      ]
    },
    {
      title: 'Ecohome.co',
      subtitle: 'Software Developer Co-op | July 2024 - December 2024',
      tags: ['PHP', 'Laravel', 'HTML/CSS', 'UX Design'],
      bullets: [
        'Redesigned core user interface components in a Laravel-powered PHP environment, integrating user feedback from usability studies',
        'Conducted iterative usability tests and analytics-driven optimizations, streamlining the user journey',
        'Partnered with cross-functional teams to adopt accessibility best practices',
        'Worked with full-stack technologies ensuring a consistent user experience across the platform'
      ]
    },
    {
      title: 'Austin Circuit Design',
      subtitle: 'Software Developer Intern | July 2024 - September 2024',
      tags: ['Python', 'Unit Testing', 'Documentation'],
      bullets: [
        'Developed comprehensive Python-based unit tests for UPG software, enhancing reliability and coverage',
        'Improved testing workflow, including detailed comments and documentation',
        'Created a testing platform for a product that shipped tens of thousands of units'
      ]
    }
  ]

  const education = {
    title: 'Northeastern University',
    subtitle: 'B.S. Computer Science | May 2026',
    tags: ['Python', 'Java', 'AI/ML', 'Algorithms'],
    bullets: [
      'Khoury College of Computer Science',
      'CS Courses: AI, Object-Oriented Design, Algorithms & Data, Software Engineering',
      'Additional: Logic and Computation, Web Development, User Experience Design'
    ]
  }

  const projects = [
    {
      title: 'Reinforcement Learning Platform',
      subtitle: 'Python | February 2025 - March 2025',
      tags: ['Python', 'RL', 'PPO', 'PyTorch'],
      link: {
        url: 'https://www.youtube.com/watch?v=BAhdljjRw5A',
        label: 'Watch Demo'
      },
      bullets: [
        'Built an RL experimentation platform to quickly train, evaluate, and compare PPO agents',
        'Developed a detailed control and monitoring suite to tune hyperparameters and debug iteratively',
        'Trained three PPO Snake agents to near-optimal performance across multiple board sizes'
      ]
    },
    {
      title: 'Valorant Eco Kill Discord Bot',
      subtitle: 'Python | August 2023',
      tags: ['Python', 'Discord API', 'Automation'],
      bullets: [
        'Developed automated Discord bot for real-time tracking of eco kills in online gaming',
        'Implemented computerized leaderboard to measure player performance and statistics',
        'Created a seamless and user-friendly experience enhancing in-game competitiveness'
      ]
    }
  ]

  return (
    <div className="app" ref={containerRef}>
      {/* Progress bar */}
      <motion.div 
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <motion.section 
        className="hero"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <div className="hero-content">
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Software Developer
          </motion.div>
          
          <h1 className="name">
            <AnimatedText text="Conor" className="name-first" delay={0.3} />
            <AnimatedText text="Abramson-Tieu" className="name-highlight" delay={0.5} />
          </h1>
          
          <motion.p 
            className="hero-tagline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Building intelligent systems at the intersection of
            <span className="highlight"> AI/ML</span> and
            <span className="highlight"> human-centered design</span>
          </motion.p>

          <motion.div 
            className="hero-links"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.a 
              href="mailto:cabrt2@gmail.com" 
              className="hero-link"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in touch
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/conor-abramson-tieu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-link secondary"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              LinkedIn
            </motion.a>
          </motion.div>

          <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div 
              className="scroll-line"
              animate={{ height: [40, 60, 40] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span>Scroll</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="content">
        {/* Experience */}
        <AnimatedSection className="section-header">
          <span className="section-number">01</span>
          <h2 className="section-title">Experience</h2>
        </AnimatedSection>
        
        <motion.div 
          className="cards-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <ExperienceCard {...exp} />
            </motion.div>
          ))}
        </motion.div>

        {/* Education */}
        <AnimatedSection className="section-header" delay={0.1}>
          <span className="section-number">02</span>
          <h2 className="section-title">Education</h2>
        </AnimatedSection>
        
        <AnimatedSection className="cards-container">
          <ExperienceCard {...education} />
        </AnimatedSection>

        {/* Projects */}
        <AnimatedSection className="section-header" delay={0.1}>
          <span className="section-number">03</span>
          <h2 className="section-title">Projects</h2>
        </AnimatedSection>
        
        <motion.div 
          className="cards-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {projects.map((proj, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <ExperienceCard {...proj} />
            </motion.div>
          ))}
        </motion.div>

        {/* Skills */}
        <AnimatedSection className="section-header" delay={0.1}>
          <span className="section-number">04</span>
          <h2 className="section-title">Skills</h2>
        </AnimatedSection>
        
        <AnimatedSection>
          <SkillsSection />
        </AnimatedSection>

        {/* Contact Footer */}
        <AnimatedSection delay={0.2}>
          <footer className="contact">
            <div className="contact-content">
              <h3 className="contact-title">Let's connect</h3>
              <motion.div 
                className="contact-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.a 
                  href="mailto:cabrt2@gmail.com" 
                  className="contact-item"
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                >
                  <span className="contact-label">Email</span>
                  <span className="contact-value">cabrt2@gmail.com</span>
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/conor-abramson-tieu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-item"
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                >
                  <span className="contact-label">LinkedIn</span>
                  <span className="contact-value">conor-abramson-tieu</span>
                </motion.a>
                <motion.div className="contact-item" variants={fadeInUp}>
                  <span className="contact-label">Location</span>
                  <span className="contact-value">Boston, MA</span>
                </motion.div>
              </motion.div>
            </div>
          </footer>
        </AnimatedSection>
      </section>
    </div>
  )
}

export default App
