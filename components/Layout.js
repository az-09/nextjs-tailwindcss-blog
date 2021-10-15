import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Link from "next/link"

export default function Layout({ children, pageTitle, blog }) {
    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta name="og:title" content={pageTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <title>{pageTitle}</title>
            </Head>
            <div className="flex flex-col min-h-screen">
                <NavBar />
                <main className="w-11/12 md:w-full max-w-2xl mx-auto my-8 flex-grow">
                    {children}
                    {blog && (
                        <div className="flex flex-col items-center">
                            <Link href="/blog">
                                <a className="my-5">← Back to Blog</a>
                            </Link>
                        </div>

                    )}
                </main>

                <Footer />

            </div>

        </div>
    )
}