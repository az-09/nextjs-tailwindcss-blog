import Layout from "../components/Layout";
import Image from 'next/image'

export default function About() {
  return (
    <Layout pageTitle="About">
      <div className="flex flex-col items-center">
        <Image
            priority
            src="/images/profile.jpg"
            className="rounded-full"
            height={144}
            width={144}
        />
        <p className="mt-8">
          Welcome to my website. I am Tae Hee Choi who is passionate about developing applications and automation. 
        </p>
        <br/>
        <p>I joined the party of programming world a little bit late as a middle-aged man, 
          but I have a big hope that my passion in learning programming will bring me fortune and open a door to a world where I can communicate with you. 
        </p>
        <br/>
        <p>I will share my learnings as much as possible, as easy as possible and as concise as possible with you, so stay tuned.</p>
        <br/>
        <p>English writing is difficult than writing codes.</p>
      </div>
    </Layout>
  );
}