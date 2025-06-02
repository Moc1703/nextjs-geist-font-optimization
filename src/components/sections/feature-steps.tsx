"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Pencil, 
  Users, 
  BarChart, 
  FileText 
} from "lucide-react"

const steps = [
  {
    icon: Pencil,
    title: "Create",
    description: "Design your campaign with clear goals and requirements"
  },
  {
    icon: Users,
    title: "Choose",
    description: "Select from our curated network of influential creators"
  },
  {
    icon: BarChart,
    title: "Monitor",
    description: "Track campaign performance in real-time"
  },
  {
    icon: FileText,
    title: "Report",
    description: "Get detailed analytics and ROI measurements"
  }
]

export function FeatureSteps() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>

        <div 
          ref={containerRef}
          className="overflow-x-auto pb-8 cursor-grab active:cursor-grabbing"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <motion.div 
            className="flex gap-6 min-w-max px-4"
            drag="x"
            dragConstraints={containerRef}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            dragElastic={0.2}
          >
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  className="w-72 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl flex flex-col items-center text-center"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
