import {
  InstantSearch,
  connectHits,
  connectSearchBox,
  connectRefinementList,
  Stats
} from "react-instantsearch-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { getAllCategories } from '../lib/api'
import SearchBox from '../components/SearchBox'
import Hits from '../components/Hits'
import RefinementList from "../components/RefinementList";
const CustomSearchBox = connectSearchBox(SearchBox);
const CustomHits = connectHits(Hits);
const CustomRefinementList = connectRefinementList(RefinementList)

const searchClient = instantMeiliSearch(
  "http://localhost:7700"
);

export async function getStaticProps() {
  const categories = await getAllCategories()
  return { props: { categories } }
}


export default function Home({defaultRefinement}) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <InstantSearch indexName="articles" searchClient={searchClient}>
          <div className="my-24 grid place-items-center">  

            
            <CustomSearchBox />
            <Stats 
              translations={{
                stats(nbHits, processingTimeMS, nbSortedHits, areHitsSorted) {
                  return areHitsSorted && nbHits !== nbSortedHits
                    ? `${nbSortedHits.toLocaleString()} relevanta resultat sorterade av ${nbHits.toLocaleString()} hittade på ${processingTimeMS.toLocaleString()}ms`
                    : `${nbHits.toLocaleString()} resultat hittade på ${processingTimeMS.toLocaleString()}ms`
                  },
                }}
              />
              <CustomRefinementList attribute="categories" defaultRefinement={defaultRefinement}/>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <CustomHits />
          </div>
        </InstantSearch>
    </div>
  )
}
