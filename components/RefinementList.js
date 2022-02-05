import { Highlight } from 'react-instantsearch-dom';

const RefinementList = ({
  items,
  isFromSearch,
  refine,
  searchForItems,
  createURL,
}) => (
  <ul className="flex flex-wrap max-w-lg justify-center">
    {items.map(item => (
      <li key={item.label} className="mt-2 mb-2 mr-5">
        <a
          href={createURL(item.value)}
          className={item.isRefined ? 'underline' : ''}
          style={{ fontWeight: item.isRefined ? 'bold' : '' }}
          onClick={event => {
            event.preventDefault();
            refine(item.value);
          }}
        >
          {isFromSearch ? (
            <Highlight attribute="label" hit={item} />
          ) : (
            item.label.toUpperCase()
          )}{' '}
          ({item.count})
        </a>
      </li>
    ))}
  </ul>
);

export default RefinementList
