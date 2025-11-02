import React, { useState, useRef, useEffect } from 'react';
import { User, Country } from '../types/user';
import updownIcon from '../icons/updown.svg';
import threeDotIcon from '../icons/threeDots.svg';

interface UserListProps {
  users: User[];
  countries: Country[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, countries, onView, onEdit }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId && menuRefs.current[openMenuId]) {
        if (!menuRefs.current[openMenuId]?.contains(event.target as Node)) {
          setOpenMenuId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const getCountryName = (id: string) => {
    return countries.find(country => country.id === id)?.name || id;
  };

  const toggleMenu = (userId: string) => {
    setOpenMenuId(openMenuId === userId ? null : userId);
  };

  return (
    <div className="pb-8">
      <div className="bg-white border-b border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
              >
                <div className="flex items-center gap-1">
                  <span className='text-sm text-gray-400'>User Name</span>
                  <div className="flex flex-col">
                    <img src={updownIcon} alt="profile" className="w-3 h-3" />
                  </div>
                </div>
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                <div className="flex items-center gap-1">
                  <span className='text-sm text-gray-400'>User Code</span>
                  <div className="flex flex-col">
                    <img src={updownIcon} alt="profile" className="w-3 h-3" />
                  </div>
                </div>
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                <div className="flex items-center gap-1">
                  <span className='text-sm text-gray-400'>Countries</span>
                  <div className="flex flex-col">
                    <img src={updownIcon} alt="profile" className="w-3 h-3" />
                  </div>
                </div>
              </th>
              <th
                scope="col"
                className="relative py-3.5 pl-3 pr-6"
              >
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap py-2 pl-6 pr-3 text-sm text-gray-900">
                  {user.name}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-700">
                  {user.code || '-'}
                </td>
                <td className="px-3 py-2 text-sm text-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      const maxVisible = 5;
                      const displayed = user.countries.slice(0, maxVisible);
                      const more = user.countries.length - displayed.length;

                      return (
                        <>
                          {displayed.map(countryId => (
                            <span
                              key={countryId}
                              className="inline-flex items-center rounded px-3 py-1 text-sm text-gray-700 border border-gray-400"
                            >
                              {getCountryName(countryId)}
                            </span>
                          ))}
                          {more > 0 && (
                            <span className="inline-flex items-center rounded px-3 py-1 text-sm text-gray-700 border border-gray-400">
                              +{more} More
                            </span>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                  <div className="relative" ref={(el) => { menuRefs.current[user.id] = el; }}>
                    <button
                      onClick={() => toggleMenu(user.id)}
                      className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-100"
                    >
                      <img src={threeDotIcon} alt="three-dots" />
                    </button>
                    {openMenuId === user.id && (
                      <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              onView(user);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => {
                              onEdit(user);
                              setOpenMenuId(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <span>Edit</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;