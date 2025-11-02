import React from 'react';
import bellIcon from '../icons/bell.svg';
import usersIcon from '../icons/users.svg';
import downIcon from '../icons/down.svg';
import plusIcon from '../icons/plus.svg';
import queIcon from '../icons/que.svg';
import downIconWhite from '../icons/downWhite.svg';

interface HeaderProps {
  onNewUser: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewUser }) => {


  return (
    <header className="border-b border-gray-200">
      <div className="flex items-center justify-end px-6 py-2 bg-[#939393]">
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-200 p-2">
            01-Nov-2025, 12:15 am
          </div>
          <img src={queIcon} alt="que-icon" className='w-5 h-5 mr-2' />
          <div className="relative">
            <img src={bellIcon} alt="bell-icon" className='w-5 h-5' />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-black rounded-full flex items-center justify-center text-xs text-white">
              1
            </span>
          </div>
          <div className="flex items-center gap-2 pl-4 border-l border-gray-300">
            <span className="text-sm text-gray-200">Shreyas Jain</span>
            <img src={downIconWhite} alt="chevron down" className="w-3 h-3" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-gray-300 pr-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border-r border-gray-200 pl-4 w-20">
            <div className="w-8 h-8 rounded-full bg-[#939393] flex items-center justify-center text-sm font-medium text-white my-2">
              SJ
            </div>
            <img src={downIcon} alt="chevron down" className="w-3 h-3" />
          </div>
          <div className="flex items-center gap-2 ml-2">
            <img src={usersIcon} alt="users" className="w-4 h-4" />
            <span className="text-sm text-gray-600">Users & Partners</span>
            <span className="text-sm text-gray-600">&gt;</span>
            <span className="text-sm text-gray-600">Users</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNewUser}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            <img src={plusIcon} alt="users" className="w-3 h-3" />
            <span className="text-gray-700">New</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

