import Moment from 'react-moment';
import Link from '../../components/Link'
import Tag from '../../components/Tag'
import { getAllCategories, getArticlesByCategory } from "../../lib/api";

const MAX_DISPLAY = 1000

export async function getStaticPaths() {
  const categories = await getAllCategories()
  const paths = categories.map((category) => ({
      params: { slug: category.attributes.slug}
  }))
  return { paths, fallback: false}
}

export async function getStaticProps({ params }) {
  const data = await getArticlesByCategory(params.slug)
  const categoryName = data[0].attributes.name
  const articles = data[0].attributes.articles.data
  articles.sort((a,b) => dateSortDesc(a.attributes.publishedAt, b.attributes.publishedAt))
  return { 
    props: { 
      articles, 
      categoryName 
    },
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
   }
}

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function CategoryPage({ articles, categoryName }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {capitalizeFirstLetter(categoryName)}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Artiklar inom {categoryName}
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
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {description}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/artiklar/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Läs "${title}"`}
                        >
                          Läs mer &rarr;
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
            Sök fler artiklar &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
