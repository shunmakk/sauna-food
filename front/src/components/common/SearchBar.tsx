import React from "react";

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
        <input
          type="search"
          name="query"
          className="rounded py-2 px-4 text-left border border-blue-500"
          placeholder={placeholder}
        />
        <button className="ml-2 text-white bg-blue-500 rounded py-2.5 px-4 hover:opacity-75 border border-blue-500">
          検索する
        </button>
      </form>
    </>
  );
};

export default SearchBar;
