import React from 'react';
import { Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

export default function AdminHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold">Espace Administration</h1>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 hover:bg-red-50 rounded-full"
            >
              <LogOut className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}