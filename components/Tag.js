import Link from 'next/link'


const Tag = ({ name, slug }) => {
  return (
    <Link href={`/kategorier/${slug}`}>
      <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {name}
      </a>
    </Link>
  )
}

export default Tag
