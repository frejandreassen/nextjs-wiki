import { getArticles, getOneArticle } from "../../lib/api"
import Moment from 'react-moment';
import { Remark } from 'react-remark'
import rehypeRaw from 'rehype-raw'
import SectionContainer from "../../components/SectionContainer"
import Link from '../../components/Link'


export default function ArticlePage( { article }) {
    return (
        <SectionContainer>
            <div className="lg:w-3/4 m-auto">
                <article>
                    <header>
                        <div className="pb-10 space-y-1 border-b border-gray-200 dark:border-gray-700">
                            <dl>
                                <div>
                                <dt className="sr-only">Publicerad </dt>
                                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                    <Moment locale="sv" format="DD MMMM YYYY">{article.createdAt}</Moment>
                                </dd>
                                </div>
                            </dl>
                            <div>
                                <h1 className="text-3xl font-bold underline"> {article.title} </h1>
                            </div>
                            <div>
                                <dd className="text-gray-900 dark:text-gray-100"> {article.author?.data?.attributes.name || ''}</dd>
                            </div>
                            
                            <div>
                                {(article.categories.data) && article.categories.data.map((category) => (
                                    <Link
                                    key={category.id}
                                    href={`/kategorier/${category.attributes.slug}`}
                                    className="mr-5 text-sm font-medium uppercase text-primary-500 hover:text-grey-600 dark:hover:text-primary-400"
                                    >
                                        {category.attributes.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </header>
                    <div>
                        {(article.media.data) && article.media.data.map((mediaFile) => (
                            <Link
                            key={mediaFile.id}
                            href={mediaFile.attributes.url}
                            className="mr-5 text-sm font-medium uppercase text-stone-500 hover:text-grey-600 dark:hover:text-primary-400"
                            >
                                {mediaFile.attributes.name}
                            </Link>
                        ))}
                    </div>
                    <div
                        className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 "
                        style={{ gridTemplateRows: 'auto 1fr' }}
                    >
                        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
                            <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">
                                <Remark
                                    remarkToRehypeOptions= {{allowDangerousHtml: true}}
                                    rehypePlugins= {[rehypeRaw]}
                                    rehypeReactOptions={{
                                        components: {
                                          iframe: (props) => {return <div class="aspect-w-16 aspect-h-9">
                                                                <iframe {...props} />
                                                            </div>},
                                        },
                                    }} 
                                >
                                    {article.content}
                                </Remark>
                            </div>
                        </div>
                        <footer>
                        <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                            {false && (
                            <div className="pt-4 xl:pt-8">
                                <Link
                                href={`/blog/`}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                >
                                &larr; 'prev title'
                                </Link>
                            </div>
                            )}
                            {false && (
                            <div className="pt-4 xl:pt-8">
                                <Link
                                href={`/blog/`}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                >
                                'next title' &rarr;
                                </Link>
                            </div>
                            )}
                        </div>
                        </footer>
                    </div>
                </article>
            </div>
        </SectionContainer>
    )
}

export async function getStaticPaths() {
    const articles = await getArticles()
    const paths = articles.map((article) => ({
        params: { slug: article.attributes.slug}
    }))
    return { paths, fallback: false}
}
export async function getStaticProps({ params }) {
    const article = await getOneArticle(params.slug)
    return {
        props: {
            article: article.attributes
        }
    }
}