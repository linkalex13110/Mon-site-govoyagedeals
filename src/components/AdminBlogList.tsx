import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, MoreVertical } from 'lucide-react';
import AdminBlogPost from './AdminBlogPost';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  content: string;
}

export default function AdminBlogList() {
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Les 10 plus belles plages cachées du Portugal",
      excerpt: "Découvrez des joyaux méconnus de la côte portugaise...",
      category: "Destinations",
      date: "15 Mars 2024",
      image: "https://images.unsplash.com/photo-1577958194277-7b3bc213b03c",
      content: "Contenu détaillé de l'article..."
    }
  ]);

  const handleAddPost = (newPost: Omit<BlogPost, 'id' | 'date'>) => {
    setPosts([
      ...posts,
      {
        ...newPost,
        id: posts.length + 1,
        date: new Date().toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      }
    ]);
  };

  const handleDeletePost = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Gestion des Articles</h1>
            <button
              onClick={() => setIsAddingPost(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Nouvel Article
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Titre</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Catégorie</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{post.title}</h3>
                          <p className="text-sm text-gray-500">{post.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-500">{post.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {/* Handle edit */}}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isAddingPost && (
        <AdminBlogPost
          onSubmit={handleAddPost}
          onClose={() => setIsAddingPost(false)}
        />
      )}
    </div>
  );
}