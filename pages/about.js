import Layout from "../components/Layout";
import Image from 'next/image'
import { userData } from "../constants/data";

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
        <p
          className="leading-loose text-xl md:text-2xl font-semibold mx-4"
          style={{ lineHeight: "3rem" }}
        >
          {userData.about.title}

        </p>
        <div className="mt-8">

          {userData.about.description?.map((desc, idx) => (
            <p
              key={idx}
              className="text-xl text-gray-700 mb-4"
            >
              {desc}
            </p>
          ))}
        </div>

      </div>
    </Layout>
  );
}