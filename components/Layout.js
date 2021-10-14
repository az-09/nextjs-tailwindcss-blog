import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children, ...customMeta }) {
    const router = useRouter();

    const meta = {
        title: "Tae Hee Choi - Developer",
        description: `I'm a developer that loves building software applications and learning new technologies.`,
        image: "/avatar.png",
        type: "website",
        ...customMeta,
    };
    return (
        <div>
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index" />
                <meta content={meta.description} name="description" />
                <meta
                    property="og:url"
                    content={`https://yourwebsite.com${router.asPath}`}
                />
                <link
                    rel="canonical"
                    href={`https://yourwebsite.com${router.asPath}`}
                />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="Tae Hee Choi" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />
                {meta.date && (
                    <meta property="article:published_time" content={meta.date} />
                )}
            </Head>
            <div className="flex flex-col min-h-screen">
                <header className="w-full h-16 border-b border-purple-500 flex items-center justify-center">
                    <NavBar />
                </header>
                <main className="w-11/12 md:w-full max-w-2xl mx-auto my-8 flex-grow">
                    {children}
                </main>
                <footer className="flex flex-col items-center w-full h-24">
                    <Footer />
                </footer>
            </div>

        </div>
    )
}