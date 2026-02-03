import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ExperienceCard.css'

export default function ExperienceCard({ title, subtitle, tags, bullets, link }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <motion.div 
      className="experience-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="card-title-group">
          <div className="card-title-row">
            <h2 className="card-title">{title}</h2>
            {link && (
              <motion.a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="link-icon">▶</span>
                {link.label}
              </motion.a>
            )}
          </div>
          <p className="card-subtitle">{subtitle}</p>
        </div>
        <motion.div 
          className="expand-indicator"
          animate={{ rotate: isExpanded ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          −
        </motion.div>
      </div>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div 
            className="card-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="card-content-inner">
              <div className="card-tags">
                {tags.map((tag, index) => (
                  <motion.span 
                    key={index} 
                    className="tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              
              <ul className="card-bullets">
                {bullets.map((bullet, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <span className="bullet-dash"></span>
                    {bullet}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
