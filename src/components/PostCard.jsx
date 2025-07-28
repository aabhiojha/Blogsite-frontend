import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostCard() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/list_post/')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error("Failed to fetch posts:", err));
    }, []);

    return (
        <div className="space-y-6 max-w-5xl mx-auto px-4">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm"
                >

                    {/* Left: Text */}
                    <div className="flex-1 w-full">
                        <div className="flex items-center gap-3 mt-3">

                            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 leading-tight">
                                {post.title}
                            </h2>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                                    {post.category}
                                </span>
                            </div>

                        </div>
                        <p className="text-xs sm:text-sm text-blue-800 mt-2 leading-relaxed">
                            {post.content}
                        </p>

                        <button
                            onClick={() => navigate(`/article/${post.id}`)}
                            className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-xs sm:text-sm text-gray-700 font-medium transition-colors"
                        >
                            Read More
                        </button>
                    </div>

                    {/* Right: Image */}
                    <div className="flex-shrink-0 w-full lg:w-auto h-full">
                        <img
                            src={`http://localhost:8000${post.image}`}
                            alt={post.title}
                            className="w-full lg:w-70 h-48 sm:h-56 lg:h-45 object-cover rounded-xl"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
