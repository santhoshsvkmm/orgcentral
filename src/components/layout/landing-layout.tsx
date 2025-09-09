'use client';

import { MainHeader } from '@/components/layout/main-header';
import { Building, Twitter, Facebook, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

interface LandingLayoutProps {
  children: React.ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      
      <motion.footer  
        className="border-t bg-gray-50 text-gray-700" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.1 }} 
        variants={sectionVariants} 
      > 
        <div className="container mx-auto px-4 py-12 sm:py-16"> 
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8"> 
            <motion.div  
              className="col-span-2 lg:col-span-2" 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.1 }} 
            > 
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-2"> 
                <Building className="h-7 w-7" /> 
                <span>OrgCentral</span> 
              </Link> 
              <p className="text-sm text-muted-foreground max-w-xs"> 
                Empowering construction excellence with integrated project management, powered by AI. 
              </p> 
            </motion.div> 
            {[ 
              { title: 'Explore', links: [ 
                  {label: 'Detailed Features', href: '/features-detailed'},  
                  {label: 'AI in Construction', href: '/ai-in-construction'},  
                  {label: 'Project Command Center', href: '/solutions/project-command-center'},  
                  {label: 'Pricing', href: '/pricing'},  
                  {label: 'Request Demo', href: '/register'} 
                ]  
              }, 
              { title: 'Company', links: [{label: 'About Us', href: '/about'}, {label: 'Contact Sales', href: '/contact'}, {label: 'Careers', href: '#'}] }, 
              { title: 'Resources', links: [{label: 'Case Studies', href: '/case-studies'}, {label: 'Help Center', href: '/help'}, {label: 'API Documentation', href: '/api-docs'}] } 
            ].map((column, colIndex) => ( 
              <motion.div  
                key={column.title} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: 0.2 + colIndex * 0.1 }} 
              > 
                <h5 className="font-semibold mb-3 text-foreground">{column.title}</h5> 
                <ul className="space-y-2 text-sm"> 
                  {column.links.map(link => ( 
                      <li key={link.label}><Link href={link.href} className="hover:text-primary hover:underline">{link.label}</Link></li> 
                  ))} 
                </ul> 
              </motion.div> 
            ))} 
          </div> 
          <motion.div  
            className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground" 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.5 }} 
          > 
            <p>&copy; {currentYear || new Date().getFullYear()} OrgCentral. All rights reserved.</p> 
            <div className="flex space-x-4 mt-4 sm:mt-0"> 
              <Link href="#" className="hover:text-primary"><Twitter className="h-5 w-5" /></Link> 
              <Link href="#" className="hover:text-primary"><Facebook className="h-5 w-5" /></Link> 
              <Link href="#" className="hover:text-primary"><Linkedin className="h-5 w-5" /></Link> 
            </div> 
            <div className="mt-4 sm:mt-0"> 
              <Link href="/privacy" className="hover:text-primary hover:underline">Privacy Policy</Link> 
              <span className="mx-2">|</span> 
              <Link href="/terms" className="hover:text-primary hover:underline">Terms of Service</Link> 
            </div> 
          </motion.div> 
        </div> 
      </motion.footer>
    </div>
  );
}