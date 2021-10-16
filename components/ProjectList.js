import { userData } from "../constants/data";


const ProjectCard = ({ title, link, imgUrl, description, stack, number }) => {
    return (
        <div>
            <a href={link} className="w-full block shadow-2xl ">
                <div className="relative overflow-hidden">
                    <div className="h-72 object-cover">
                        <img
                            src={imgUrl}
                            alt="portfolio"
                            className="transform hover:scale-125 transition duration-2000 ease-out object-cover h-full w-full"
                        />
                    </div>
                    <h1 className="absolute top-10 left-10 text-gray-50 font-bold text-xl bg-blue-400 rounded-md px-2">
                        {title}
                    </h1>
                    <h1 className="absolute bottom-10 left-10 text-[#202971]font-bold text-xl">
                        {number.length === 1 ? "0" + number : number}
                    </h1>
                </div>
            </a>
            <div className="mt-1 flex flex-col items-center text-gray-700 mb-4 ">

                {description?.map((desc, idx) => (
                    <p
                        key={idx}
                    >
                        {desc}
                    </p>
                ))}
                <p>Built with: {stack}</p>
            </div>

        </div>


    )
}

export default function ProjectList() {
    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 pb-20">
            {userData.projects.map((project, idx) => (
                <ProjectCard
                    title={project.title}
                    link={project.link}
                    imgUrl={project.imgUrl}
                    description={project.description}
                    stack={project.stack}
                    number={`${idx + 1}`}
                />
            ))}
        </div>
    )
}

