'use client';

import { LandingLayout } from "@/components/layout/landing-layout";
import { PageTitle } from "@/components/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  User, 
  ArrowRight, 
  TrendingUp,
  Building,
  Zap,
  Shield,
  Brain
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Construction Management",
    excerpt: "Explore how artificial intelligence is revolutionizing project planning, risk assessment, and resource optimization in the construction industry.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    category: "AI & Technology",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: 2,
    title: "5 Ways to Reduce Construction Project Delays",
    excerpt: "Learn proven strategies to keep your construction projects on schedule and avoid costly delays that impact your bottom line.",
    author: "Mike Chen",
    date: "2024-01-12",
    category: "Project Management",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Digital Transformation in Construction: A Complete Guide",
    excerpt: "Discover how digital tools and technologies are transforming traditional construction workflows and improving project outcomes.",
    author: "Emily Rodriguez",
    date: "2024-01-10",
    category: "Digital Transformation",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Safety First: Implementing Modern Safety Protocols",
    excerpt: "Best practices for maintaining the highest safety standards on construction sites using modern technology and training methods.",
    author: "David Thompson",
    date: "2024-01-08",
    category: "Safety",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Cost Control Strategies for Large Construction Projects",
    excerpt: "Effective methods to monitor and control costs throughout the lifecycle of major construction projects.",
    author: "Lisa Park",
    date: "2024-01-05",
    category: "Financial Management",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Sustainable Construction: Building for the Future",
    excerpt: "How sustainable building practices and green technologies are shaping the future of construction.",
    author: "James Wilson",
    date: "2024-01-03",
    category: "Sustainability",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const categories = [
  { name: "AI & Technology", icon: <Brain className="h-4 w-4" />, count: 12 },
  { name: "Project Management", icon: <Building className="h-4 w-4" />, count: 18 },
  { name: "Safety", icon: <Shield className="h-4 w-4" />, count: 8 },
  { name: "Digital Transformation", icon: <Zap className="h-4 w-4" />, count: 15 }
];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <LandingLayout>
      <PageTitle 
        title="Construction Industry Blog" 
        description="Insights, trends, and best practices for modern construction management." 
      />
      
      <div className="space-y-8 md:space-y-12">
        {/* Featured Post */}
        {featuredPost && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary">Featured</Badge>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-4">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <Button asChild>
                      <Link href={`/blog/${featuredPost.id}`} className="inline-flex items-center gap-2">
                        Read More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </section>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {post.category}
                      </Badge>
                      <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.id}`}>Read More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded cursor-pointer">
                    <div className="flex items-center gap-2">
                      {category.icon}
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Newsletter Signup */}
            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
              <p className="text-sm opacity-90 mb-4">
                Get the latest construction industry insights delivered to your inbox.
              </p>
              <Button variant="secondary" className="w-full">
                Subscribe to Newsletter
              </Button>
            </Card>

            {/* Popular Posts */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Popular Posts</h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium line-clamp-2 mb-1">{post.title}</h4>
                      <p className="text-xs text-muted-foreground">{post.readTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <section className="text-center bg-slate-50 rounded-lg p-12">
          <TrendingUp className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Projects?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover how OrgCentral can help you implement the strategies and best practices discussed in our blog.
          </p>
          <Button size="lg" asChild>
            <Link href="/register">Start Your Free Trial</Link>
          </Button>
        </section>
      </div>
    </LandingLayout>
  );
}