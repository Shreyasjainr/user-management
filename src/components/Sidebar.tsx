import React from 'react';
import menuIcon from '../icons/menu.svg';
import propertiesIcon from '../icons/properties.svg';
import tvIcon from '../icons/tv.svg';
import settingsIcon from '../icons/settings.svg';
import cardsIcon from '../icons/cards.svg';
import profileIcon from '../icons/profile.svg';
import usersIcon from '../icons/users.svg';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-20 bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1">
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-1 py-3  cursor-pointer transition-colors text-gray-600 hover:bg-gray-50">
            <img src={menuIcon} alt="menu" className="w-5 h-5" />
            <span className="text-xs font-medium text-center px-1">Menu</span>
          </div>
          <div className="flex flex-col items-center gap-1 py-3  cursor-pointer transition-colors text-gray-600 hover:bg-gray-50">
            <img src={propertiesIcon} alt="properties" className="w-5 h-5" />
            <span className="text-xs font-medium text-center px-1">Properties</span>
          </div>
          <div className="flex flex-col items-center gap-1 py-3  cursor-pointer transition-colors text-gray-600 hover:bg-gray-50">
            <img src={tvIcon} alt="tv" className="w-5 h-5" />
            <span className="text-xs font-medium text-center px-1">TV</span>
          </div>
          <div className="flex flex-col items-center gap-1 py-3  cursor-pointer transition-colors text-gray-600 hover:bg-gray-50">
            <img src={settingsIcon} alt="settings" className="w-5 h-5" />
            <span className="text-xs font-medium text-center px-1">Settings</span>
          </div>
          <div className="flex flex-col items-center gap-1 py-3  cursor-pointer transition-colors text-gray-600 hover:bg-gray-50">
            <img src={cardsIcon} alt="cards" className="w-5 h-5" />
            <span className="text-xs font-medium text-center px-1">Cards</span>
          </div>
          <div className="flex flex-col items-center gap-1 py-3  cursor-pointer transition-colors text-gray-600 hover:bg-gray-50">
            <img src={profileIcon} alt="profile" className="w-5 h-5" />
            <span className="text-xs font-medium text-center px-1">Profile</span>
          </div>
          <div className="flex flex-col items-center gap-1 py-3 cursor-pointer transition-colors text-gray-600 hover:bg-gray-50 border-l-[3px] border-black">
            <img src={usersIcon} alt="users" className="w-5 h-5" />
            <span className="text-xs font-medium text-center px-1">Users</span>
          </div>
        </div>

      </nav>
    </aside>
  );
};

export default Sidebar;

