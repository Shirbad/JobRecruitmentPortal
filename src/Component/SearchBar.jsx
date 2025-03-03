import React from "react";

const SearchBar = () => {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-6">
        <input type="text" placeholder="Job Role" className="p-2 border rounded w-full md:w-1/3" />
        <input type="text" placeholder="Location" className="p-2 border rounded w-full md:w-1/3" />
        <button className="bg-blue-600 text-white px-6 py-2 rounded">Search</button>
      </div>
    );
  };
  
  export default SearchBar;
