import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchInput = ({ handleChange }) => {
  return (
    <div className="mt-4 flex items-center w-full max-w-[90vw] sm:max-w-md mx-auto border border-gray-300 rounded-2xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition max-w-[90vw]">
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search images..."
        className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-400"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
