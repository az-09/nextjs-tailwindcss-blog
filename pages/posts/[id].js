import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";

export default function Post({ postData }) {
    return (
        <Layout>
            <section className="bg-white">
                <div className="max-w-6xl mx-auto">
                    <article class="prose max-w-none">
                        <h1 >{postData.title}</h1>
                        <div>
                            <Date dateString={postData.date} />
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

                    </article>

                </div>
            </section>

        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}