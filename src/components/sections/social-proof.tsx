"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director at TechCorp",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    content: "Lemon 2.0 transformed our influencer marketing strategy. The platform made it incredibly easy to find the right creators and track our campaign performance.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Brand Manager at StyleHouse",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    content: "The analytics and reporting features are outstanding. We've seen a 300% increase in ROI since switching to Lemon 2.0.",
    rating: 5
  },
  {
    name: "Emma Williams",
    role: "CEO at BeautyBloom",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    content: "The quality of influencers on this platform is unmatched. Every campaign has exceeded our expectations.",
    rating: 5
  }
]

const clientLogos = [
  "https://images.pexels.com/photos/12861307/pexels-photo-12861307.jpeg", // Replace with actual client logos
  "https://images.pexels.com/photos/12861308/pexels-photo-12861308.jpeg",
  "https://images.pexels.com/photos/12861309/pexels-photo-12861309.jpeg",
  "https://images.pexels.com/photos/12861310/pexels-photo-12861310.jpeg",
  "https://images.pexels.com/photos/12861311/pexels-photo-12861311.jpeg"
]

export function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Leading Brands
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join thousands of successful businesses using Lemon 2.0
          </p>
        </motion.div>

        {/* Client Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
          {clientLogos.map((logo, index) => (
            <motion.div
              key={index}
              className="w-32 h-16 grayscale hover:grayscale-0 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentTestimonial}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-2xl font-medium mb-8">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <div 
                  className="w-full h-full bg-gray-200 dark:bg-gray-700"
                  style={{
                    backgroundImage: `url(${testimonials[currentTestimonial].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>
              <div className="text-left">
                <div className="font-semibold">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
