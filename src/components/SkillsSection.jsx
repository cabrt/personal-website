import { motion } from 'framer-motion'
import './SkillsSection.css'

const skillsData = {
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 }
  }
}

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function SkillsSection() {
  return (
    <div className="skills-section">
      {Object.entries(skillsData).map(([key, category], categoryIndex) => (
        <motion.div 
          key={key} 
          className="skills-category"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
        >
          <h3 className="skills-category-title">{category.title}</h3>
          <motion.div 
            className="skills-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {category.items.map((skill, index) => (
              <motion.span 
                key={index} 
                className="skill-tag"
                variants={tagVariants}
                whileHover={{ 
                  y: -4, 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
