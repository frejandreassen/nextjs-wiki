const StateResults = ({ searchState, children }) => {
  return (
    searchState && searchState.query ? (
      children
    ) : (
      ''
    )
  );
};

export default StateResults