import { getArticles, getSpecialistsByDiagnose } from "../lib/api"
import Moment from 'react-moment';
import Link from '../components/Link'
import Tag from '../components/Tag'

const MAX_DISPLAY = 1000

export async function getStaticProps() {
  const diagnoses = await getSpecialistsByDiagnose()
  diagnoses.sort((a,b) => dateSortDesc(a.attributes.name, b.attributes.name))
  return { props: { diagnoses } }
}

export function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Artiklar({ diagnoses }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Logopeder
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Specialister inom diagnosen
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!diagnoses.length && 'Inga diagnoser'}
          {diagnoses.slice(0, MAX_DISPLAY).map((diagnose) => {
            const { name, slug, createdAt, specialists } = diagnose.attributes
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/kategorier/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {capitalizeFirstLetter(name)}
                            </Link>
                          </h2>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <ul>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                              {specialists.data.map((specialist) => (
                                <li>
                                  {specialist.attributes.name}
                                  , <a href={`mailto:${specialist.attributes.email}`}>{specialist.attributes.email}</a>
                                  , <a href={`tel:${specialist.attributes.phone}`}>{specialist.attributes.phone}</a>
                                </li>
                              ))}
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {diagnoses.length > MAX_DISPLAY && (
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
