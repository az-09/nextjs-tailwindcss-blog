import Layout from "../components/Layout";
import { getSortedPostsData } from '../lib/posts'
import Blog from "../components/Blog";


export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <Blog allPostsData={allPostsData}/>
    </Layout>
  );
};
