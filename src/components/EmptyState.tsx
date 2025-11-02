import React from 'react';
import plusIcon from '../icons/plusWhite.svg';

interface EmptyStateProps {
  onNewUser: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onNewUser }) => {
  return (
    <div className="text-center h-[calc(100vh-6rem)] flex flex-col items-center justify-center">
      <div className="rounded-full bg-gradient-to-b from-gray-200 to-white p-8 mb-6 w-48 h-48 flex items-center justify-center">
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Create a new user</h2>
      <p className="text-sm text-gray-500 max-w-md mb-6">Add user details, set permissions, and assign roles to manage access within your system.</p>
      <button
        onClick={onNewUser}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
      >
        <img src={plusIcon} alt="plus-icon" className='mr-2'/>
        New User
      </button>
    </div>
  );
};

export default EmptyState;