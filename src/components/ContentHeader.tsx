import React from 'react';
import searchIcon from '../icons/search.svg';
import columnsIcon from '../icons/columns.svg';
import filterIcon from '../icons/filter.svg';

const ContentHeader: React.FC = () => {
    return (
        <div>
            <div className="flex items-center justify-between gap-3 px-4 py-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Users & Partners</h1>
                <div className="flex items-center gap-3">
                    <button className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <img src={filterIcon} alt="filter-icon" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <img src={searchIcon} alt="search-icon" />
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm">
                        <img src={columnsIcon} alt="column-icon" />
                        <span className='font-bold'>Columns</span>
                    </button>
                </div>
            </div>

            <div className="flex gap-6 border-b border-gray-200 px-8">
                <button className="pb-3 px-1 border-b-2 border-gray-900 text-sm font-medium text-gray-900">
                    Users
                </button>
                <button className="pb-3 px-1 text-sm font-medium text-gray-400 hover:text-gray-900">
                    Profile
                </button>
            </div>

        </div>
    );
};

export default ContentHeader;

