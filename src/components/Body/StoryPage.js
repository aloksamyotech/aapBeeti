import { useState, useEffect } from 'react'
import { getAllStory, addViews } from '../../api/story';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";



export default function StoryPage() {
    const [story, setStory] = useState();
    const [tags, setTags] = useState();


    const navigate = useNavigate()

    const navigateToViewFullStory = async (id) => {
        console.log(id)
        await addViews(id)
        navigate(`/view-full-story/${id}`);
    };


    const getStory = async () => {
        let data = await getAllStory();
        setStory(data.data);
    };

    useEffect(() => {
        getStory();
    }, []);

    return (
        <div className="bg-white">
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="max-w-screen-xl mx-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {story && story.map((featuredStory, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold">{featuredStory.title}</h2>
                                    <p className="text-gray-600 mt-2">
                                        {featuredStory.story.length > 20
                                            ? `${featuredStory.story.slice(0, 20)}...`
                                            : featuredStory.story}
                                    </p>
                                    <a className="text-blue-500 hover:underline mt-4 block cursor-pointer" onClick={() => { navigateToViewFullStory(featuredStory._id) }}>
                                        Read more
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

