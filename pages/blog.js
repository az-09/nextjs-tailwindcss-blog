import Layout from "../components/Layout";
import BlogList from "../components/BlogList";
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

export default function Blog({ allPostsData }) {
    return (
        <Layout pageTitle="Blog">
            <BlogList allPostsData={allPostsData} />
        </Layout>
    );
}