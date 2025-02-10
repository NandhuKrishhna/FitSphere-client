import { useState } from "react";
import { ListFilter, X } from "lucide-react"; // Using Lucide icons for menu & close

const FilterBar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

  return (
    <div className="relative h-full ">
      {/* Menu Button for Mobile */}
      <div className="sm:flex sm:">
      <button
        className="sm:hidden  flex items-center text-white bg-zinc-700 p-2 rounded-md"
        onClick={() => setIsOpen(true)} 
      >

      <ListFilter size={24} />

      </button>
        </div>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-zinc-800/30 bg-opacity-90 p-4 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:relative sm:translate-x-0 sm:flex sm:flex-col sm:w-48 lg:w-64`}
      >
        {/* Close Button (Mobile Only) */}
        <button
          className="absolute top-4 right-4 sm:hidden text-white hover:text-gray-300"
          onClick={() => setIsOpen(false)} // Close sidebar
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Filters</h2>

        {/* Specialty Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Specialty</h3>
          <select className="w-full bg-zinc-700 rounded-md p-2 text-sm">
            <option>All Specialties</option>
            <option>Cardiology</option>
            <option>Dermatology</option>
            <option>Neurology</option>
          </select>
        </div>

        {/* Gender Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Gender</h3>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500" />
              <span className="ml-2 text-sm">Male</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500" />
              <span className="ml-2 text-sm">Female</span>
            </label>
          </div>
        </div>

        {/* Language Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Language</h3>
          <select className="w-full bg-zinc-700 rounded-md p-2 text-sm">
            <option>All Languages</option>
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
