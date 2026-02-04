import { motion } from 'framer-motion'
import './SkillsSection.css'

const skills = {
  languages: {
    title: 'Languages',
    items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C#', 'PHP', 'SQL', 'HTML/CSS', 'R', 'Assembly']
  },
  frameworks: {
    title: 'Frameworks & Libraries',
    items: ['React', 'Next.js', 'Node.js', 'Express', 'PyTorch', 'PEFT/LoRA', 'Laravel', 'Jupyter']
  },
  tools: {
    title: 'Tools & Platforms',
    items: ['Git', 'Docker', 'Linux', 'VS Code', 'IntelliJ', 'Axure']
  }
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } }
}

const item = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
}

export default function SkillsSection() {
  return (
    <div className="skills-section">
      {Object.entries(skills).map(([key, category], idx) => (
        <motion.div 
          key={key} 
          className="skills-category"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
        >
          <h3 className="skills-category-title">{category.title}</h3>
          <motion.div className="skills-list" initial="hidden" whileInView="visible" viewport={{ once: false }} variants={container}>
            {category.items.map((skill, i) => (
              <motion.span key={i} className="skill-tag" variants={item} whileHover={{ y: -4, scale: 1.05, transition: { duration: 0.2 } }}>
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
