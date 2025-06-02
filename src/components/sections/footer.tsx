"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Facebook,
  Sun,
  Moon
} from "lucide-react"
import { useTheme } from "next-themes"

const footerLinks = {
  "For Brands": [
    { name: "Dashboard", href: "/dashboard/brand" },
    { name: "Create Campaign", href: "/campaign/new" },
    { name: "Find Influencers", href: "/influencers" },
    { name: "Case Studies", href: "/case-studies" },
  ],
  "For Influencers": [
    { name: "Dashboard", href: "/dashboard/influencer" },
    { name: "Browse Campaigns", href: "/campaigns" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Resources", href: "/resources" },
  ],
  "Company": [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  "Legal": [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
  ],
}

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
]

export function Footer() {
  const { theme, setTheme } = useTheme()

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-5 h-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} Lemon 2.0. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
