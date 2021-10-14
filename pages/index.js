import Layout from "../components/layout";
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'


export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

const Index = ({ allPostsData }) => {
  return (
    <Layout pageTitle="My Blog">
      <h1 className="text-2xl font-semibold">Blog Posts</h1>
      <div className="w-full">
  
        <ul className="mt-4">

          {allPostsData.map(({ id, date, title, description }) => (
            <li className="px-8 py-2 m-0 mt-4 border-b border-card-border hover:bg-gray-100" key={id}>
              <Link href={`/posts/${id}`}>
                <a>
                <div className="text-xl font-medium">{title}</div>
                <p className="mt-2 mb-4 font-light">{description}</p>
                <p className="text-sm font-hairline">{date}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Index;