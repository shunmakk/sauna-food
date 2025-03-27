import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setSearchTerm,
  placeholder,
}) => {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchTerm(e.currentTarget.query.value);
        }}
        className="text-center"
      >
        <div className="relative inline-block">
          <input
            type="search"
            name="query"
            className="rounded py-2 pl-10 pr-4 text-left border border-blue-500 outline-none"
            placeholder={placeholder}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="ml-2 text-white bg-blue-500 rounded py-2.5 px-4 hover:opacity-75 border border-blue-500">
          検索する
        </button>
      </form>
    </>
  );
};

export default SearchBar;
