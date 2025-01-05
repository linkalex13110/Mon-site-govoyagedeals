import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Tag, 
  Users, 
  Settings,
  BarChart
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin'
  },
  {
    title: 'Articles',
    icon: FileText,
    path: '/admin/articles'
  },
  {
    title: 'Offres',
    icon: Tag,
    path: '/admin/offers'
  },
  {
    title: 'Utilisateurs',
    icon: Users,
    path: '/admin/users'
  },
  {
    title: 'Statistiques',
    icon: BarChart,
    path: '/admin/stats'
  },
  {
    title: 'Paramètres',
    icon: Settings,
    path: '/admin/settings'
  }
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {item.title}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}