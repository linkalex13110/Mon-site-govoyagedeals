import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function NavigationLink({ href, children, onClick }: NavigationLinkProps) {
  return (
    <li>
      <Link
        to={href}
        onClick={onClick}
        className="text-2xl font-medium text-gray-900 hover:text-blue-600 transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}