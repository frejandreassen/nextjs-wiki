const SearchBox = ({ currentRefinement, refine }) => (
    <div className="w-9/12 pt-6 pb-8 space-y-2 md:space-y-5">
        <input
        placeholder="Sök.."
        type="text"
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
        className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:text-gray-100"
        />
    </div>
  );

export default SearchBox