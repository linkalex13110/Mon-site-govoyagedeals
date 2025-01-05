import React from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import Navigation from '../components/Navigation';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export default function Blog() {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Les 10 plus belles plages cachées du Portugal",
      excerpt: "Découvrez des joyaux méconnus de la côte portugaise, loin des sentiers battus...",
      category: "Destinations",
      date: "15 Mars 2024",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1577958194277-7b3bc213b03c?auto=format&fit=crop&q=80&w=1200",
      featured: true
    },
    {
      id: 2,
      title: "Guide ultime pour voyager léger",
      excerpt: "Nos conseils d'experts pour faire sa valise intelligemment...",
      category: "Conseils",
      date: "12 Mars 2024",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      title: "Les meilleures périodes pour visiter le Japon",
      excerpt: "Quand partir pour profiter au maximum de votre séjour...",
      category: "Guides",
      date: "10 Mars 2024",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
        <Navigation />
        <div className="container mx-auto px-6 pb-24 pt-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Blog Voyage</h1>
            <p className="text-xl text-white/90">
              Inspirations, conseils et guides pour vos prochaines aventures
            </p>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-6 py-24">
        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map(post => (
          <div key={post.id} className="mb-24">
            <div className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-4 text-white/90 mb-4">
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{post.readTime}</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">{post.title}</h2>
                <p className="text-white/90 mb-4 text-lg">{post.excerpt}</p>
                <button className="flex items-center gap-2 text-white group/btn">
                  <span className="font-medium">Lire l'article</span>
                  <ChevronRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map(post => (
            <div key={post.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <button className="flex items-center gap-2 text-blue-600 group/btn">
                    <span className="font-medium">Lire plus</span>
                    <ChevronRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}