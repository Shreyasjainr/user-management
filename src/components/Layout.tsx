import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  onNewUser: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onNewUser }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <Header onNewUser={onNewUser} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

