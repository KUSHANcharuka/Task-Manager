import React, { useState } from "react";

const SearchBar = ({ onSearch, isDark }) => {
  // isDark prop එකත් ගන්න
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  // Enter Key එක press කරාම search වෙන්න
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#00D4FF] ${
          isDark
            ? "bg-slate-800 border-slate-700 text-white"
            : "bg-white border-slate-300 text-black"
        }`}
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-[#00D4FF] text-white rounded-lg hover:bg-[#00bce3]"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
