import React, { useState, useEffect, useRef } from 'react';
import { User, UserFormData, Country } from '../types/user';
import { toast } from 'react-toastify';
import dropSvg from '../icons/dropdown.svg';

interface UserFormProps {
  user?: User;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  isView?: boolean;
  onEdit?: () => void;
  onAddNew?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel, isView = false, onEdit, onAddNew }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    code: '',
    countries: []
  });
  const [errors, setErrors] = useState({
    name: '',
    countries: ''
  });
  const [openCountries, setOpenCountries] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchCountries();
    if (user) {
      setFormData({
        name: user.name,
        code: user.code || '',
        countries: user.countries
      });
    }
  }, [user]);

  const fetchCountries = async () => {
    try {
      const response = await fetch('http://localhost:3001/countries');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      toast.error('Error fetching countries');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };


  const handleCountryCheckboxChange = (countryId: string, checked: boolean) => {
    setFormData(prev => {
      const current = new Set(prev.countries);
      if (checked) current.add(countryId);
      else current.delete(countryId);
      return { ...prev, countries: Array.from(current) };
    });
    setErrors(prev => ({ ...prev, countries: '' }));
  };

  useEffect(() => {
    const onDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (openCountries && containerRef.current && !containerRef.current.contains(target)) {
        setOpenCountries(false);
      }
    };

    document.addEventListener('mousedown', onDocumentClick);
    return () => document.removeEventListener('mousedown', onDocumentClick);
  }, [openCountries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name.trim() ? '' : 'Name is required',
      countries: formData.countries.length ? '' : 'At least one country must be selected'
    };

    if (newErrors.name || newErrors.countries) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  if (isView) {
    return (
      <div className="h-[75vh] flex flex-col">
        <div className="flex-1 p-4">
        <h2 className='font-bold mb-3'>User Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500">User Name</p>
              <p className="mt-2 text-sm text-gray-900">{formData.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">User Code</p>
              <p className="mt-2 text-sm text-gray-900">{formData.code || '-'}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs text-gray-500">Countries</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {formData.countries.map((cid) => (
                <span key={cid} className="inline-flex items-center rounded border px-3 py-1 text-sm text-gray-700 border-gray-500">
                  {countries.find(c => c.id === cid)?.name || cid}
                </span>
              ))}
            </div>
          </div>
        </div>

  <div className="flex items-center justify-between border-t border-gray-300 p-4">
          <div>
            <button
              type="button"
              onClick={() => (typeof (onAddNew) === 'function' ? onAddNew() : null)}
              className="rounded-full border border-gray-900 bg-white px-4 py-2 text-sm text-gray-700 font-bold hover:bg-gray-50"
            >
              Add New User
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full bg-gray-200 font-bold px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => (typeof (onEdit) === 'function' ? onEdit() : null)}
              className="rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-black/90"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="h-[75vh] flex flex-col">
      <div className="flex-1 p-4">
        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm mb-1">
              User Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isView}
              className="block w-full px-3 py-2 rounded border border-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="code" className="block text-sm mb-1">
              Set Code <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              name="code"
              id="code"
              value={formData.code}
              onChange={handleChange}
              disabled={isView}
              className={`block w-full px-3 py-2 rounded border border-gray-400 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                isView ? 'bg-gray-50' : ''
              }`}
              placeholder="Short code for reference (e.g., NA, EU)"
            />
          </div>

          <div ref={containerRef} className="relative" role="combobox" aria-haspopup="listbox" aria-expanded={openCountries} aria-controls="countries-listbox">
            <label className="block text-sm mb-1">
              Select Countries
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                onClick={() => !isView && setOpenCountries(prev => !prev)}
                value={
                  formData.countries.length
                    ? formData.countries
                        .map(id => countries.find(c => c.id === id)?.name || id)
                        .join(', ')
                    : ''
                }
                placeholder="Assign one or more countries to include in this user."
                className={`block w-full px-3 py-2 pr-10 rounded border border-gray-400 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                  isView ? 'bg-gray-50' : 'cursor-pointer'
                }`}
              />
              {!isView && (
                <span className="absolute py-3 pl-3 right-3 top-1/2 -translate-y-1/2 border-l border-gray-200 text-gray-500 pointer-events-none"><img src={dropSvg} alt="" /></span>
              )}
            </div>

            {openCountries && (
              <div id="countries-listbox" role="listbox" className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg max-h-60 overflow-auto">
                <div className="p-2">
                  {countries.map(country => (
                    <label key={country.id} className="flex items-center space-x-2 py-1 px-2 hover:bg-gray-50 rounded">
                      <input
                        type="checkbox"
                        name="countries"
                        value={country.id}
                        checked={formData.countries.includes(country.id)}
                        onChange={(e) => handleCountryCheckboxChange(country.id, e.target.checked)}
                        disabled={isView}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{country.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {errors.countries && <p className="mt-1 text-sm text-red-600">{errors.countries}</p>}
          </div>
        </div>
      </div>

      {!isView && (
  <div className="flex items-center justify-end space-x-2 p-4 border-t border-gray-300">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-black/90"
          >
            {user ? 'Update' : 'Save'}
          </button>
        </div>
      )}
    </form>
  );
};

export default UserForm;