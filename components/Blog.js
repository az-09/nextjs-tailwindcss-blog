import { userData } from '../constants/data'
import Link from 'next/link'
import Date from '../components/date'

export default function Blog({ allPostsData }) {
    return (
        <section>
            <div className="max-w-6xl mx-auto h-48">
                <ul className="mt-4">

                    {allPostsData.map(({ id, date, title, description }) => (
                        <li className="px-8 py-2 m-0 mt-4 border-b border-card-border hover:bg-gray-100" key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>
                                    <div className="text-xl font-medium">{title}</div>
                                    <p className="mt-2 mb-4 font-light">{description}</p>
                                    <p className="text-sm font-hairline"> <Date dateString={date} /></p>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}