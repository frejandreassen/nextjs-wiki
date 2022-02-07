import { useState, useEffect } from 'react'
import {
  InstantSearch,
  Configure,
  connectSearchBox,
  connectRefinementList,
  connectStateResults,
  connectInfiniteHits,
  Stats
} from "react-instantsearch-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import SearchBox from '../components/SearchBox'
import Hits from '../components/Hits'
import RefinementList from "../components/RefinementList"
import StateResults from "../components/StateResults"

const CustomSearchBox = connectSearchBox(SearchBox);
const CustomHits = connectInfiniteHits(Hits);
const CustomRefinementList = connectRefinementList(RefinementList)
const CustomResults = connectStateResults(StateResults)
const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST_URL,
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY
);



export default function Home() {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({key}) => {
    if (key) setKeyPressed(true)
  }
  
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <InstantSearch indexName="articles" searchClient={searchClient}>
          <div className="my-24 grid place-items-center">  
            <Configure
              hitsPerPage={20}
              analytics={false}
              enablePersonalization={true}
              distinct
            />
            <CustomSearchBox />
            <Stats 
              translations={{
                stats(nbHits) {
                  return `${nbHits.toLocaleString()} artiklar`
                  },
                }}
              />
            <CustomRefinementList attribute="categories" defaultRefinement={[]}/>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {keyPressed && <CustomHits />}
          </div>
        </InstantSearch>
    </div>
  )
}
