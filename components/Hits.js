import Moment from "react-moment";
import Link from "./Link";
import Tag from "./Tag";
export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}
const Hits = ({ hits }) => {
  // hits.sort((a, b) => dateSortDesc(a.id, b.id))
  return (
    <ol>
        {hits.map(hit => (
        <li key={hit.id} className="py-5">
            <article>
              <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <Moment locale="sv" format="DD MMMM YYYY">{hit.createdAt}</Moment>
                  </dd>
                </dl>
                <div className="space-y-5 xl:col-span-3">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/artiklar/${hit.slug}`}
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {hit.title}
                        </Link>
                      </h2>
                      <div className="flex flex-wrap">
                        {hit.categories.map((category) => (
                          <Tag key={category} slug={category} name={category} />
                        ))}
                        {hit.media.map((media) => (
                          <a key={media} href={`/artiklar/${hit.slug}`} className="mr-3 text-sm font-medium uppercase text-stone-500">
                            {media}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                      {hit.description}
                    </div>
                  </div>
                  <div className="text-base font-medium leading-6">
                    <Link
                      href={`/artiklar/${hit.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Läs "${hit.title}"`}
                    >
                      Läs mer &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
    </ol>
)};

export default Hits