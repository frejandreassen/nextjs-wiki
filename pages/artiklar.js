import { getArticles } from "../lib/api"
import Moment from 'react-moment';
import Link from '../components/Link'
import Tag from '../components/Tag'

const MAX_DISPLAY = 1000

export async function getStaticProps() {
  const articles = await getArticles()
  articles.sort((a,b) => dateSortDesc(a.attributes.publishedAt, b.attributes.publishedAt))
  return { props: { articles } }
}

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export default function Artiklar({ articles }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Senaste
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Artiklar om logopedi
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!articles.length && 'No posts found.'}
          {articles.slice(0, MAX_DISPLAY).map((article) => {
            const { slug, createdAt, title, description, categories } = article.attributes
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <Moment locale="sv" format="DD MMMM YYYY">{article.attributes.createdAt}</Moment>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/artiklar/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {categories.data.map((category) => (
                              <Tag key={category.id} slug={category.attributes.slug} name={category.attributes.name} />
                            ))}
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {description}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/artiklar/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`L??s "${title}"`}
                        >
                          L??s mer &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {articles.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            S??k fler artiklar &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
