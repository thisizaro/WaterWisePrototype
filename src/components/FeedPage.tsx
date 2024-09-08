import { useState, useEffect, useRef } from "react";
import { Moon, Sun, Droplet, Bookmark, Plus, X, Image } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const initialPosts = [
  {
    id: 1,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/11/360370169/VE/LC/FV/25926422/rain-water-harvesting-installation-service-500x500.png",
    caption:
      "Installed a rainwater harvesting system in my backyard. Every drop counts!",
    likes: 156,
    username: "eco_enthusiast",
    saved: false,
  },
  {
    id: 2,
    image:
      "https://i0.wp.com/oceanblueproject.org/wp-content/uploads/2021/03/beach-cleanup-oregon-beach-cleanup-near-me.jpg.jpg?w=559&ssl=1",
    caption:
      "Organized a community event to clean up our local river. Protecting our water sources!",
    likes: 89,
    username: "river_guardian",
    saved: false,
  },
  {
    id: 3,
    image: "http://ucanr.edu/blogs/Green//blogfiles/77944_original.jpg",
    caption:
      "Planted drought-resistant plants in my garden. Saving water and looking beautiful!",
    likes: 204,
    username: "green_thumb",
    saved: false,
  },
  {
    id: 4,
    image:
      "https://citizenmatters.in/wp-content/uploads/2024/02/bengaluru-sundale-apartments-internal-water-metering-avinash-hegde-jul2021-edited-2.jpg",
    caption:
      "Installed smart water meters in our neighborhood. Tracking usage to promote conservation!",
    likes: 178,
    username: "tech_saver",
    saved: false,
  },
  {
    id: 5,
    image:
      "https://centeninspect.com/wp-content/uploads/2019/02/fixingfaucet-1080x675.jpg",
    caption:
      "Fixed all the leaky faucets in my house. Small changes, big impact!",
    likes: 132,
    username: "diy_hero",
    saved: false,
  },
];

export default function FeedPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [newPost, setNewPost] = useState({ image: null, caption: "" });
  const [highlightedPostId, setHighlightedPostId] = useState(null);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleSave = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, saved: !post.saved } : post
      )
    );
  };

  const handleScroll = () => {
    if (
      bottomRef.current &&
      bottomRef.current.getBoundingClientRect().top <= window.innerHeight
    ) {
      setVisiblePosts((prevVisible) => Math.min(prevVisible + 3, posts.length));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddPost = () => {
    if (newPost.image && newPost.caption) {
      const post = {
        id: Date.now(),
        ...newPost,
        likes: 0,
        username: "me",
        saved: false,
      };
      setPosts([post, ...posts]);
      setNewPost({ image: null, caption: "" });
      setIsAddingPost(false);
      setHighlightedPostId(post.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({ ...newPost, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 dark:bg-gray-900 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          WaterWise
        </h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </header>

      <main className="container mx-auto p-4 mt-16 mb-20 max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${
                post.id === highlightedPostId ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                  {post.username}
                </span>
              </div>
              <div className="p-4">
                <p className="text-gray-800 dark:text-gray-200 mb-2 text-sm">
                  {post.caption}
                </p>
                <div className="flex justify-between items-center">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
                  >
                    <Droplet
                      className={`h-5 w-5 ${
                        post.likes > 0 ? "text-blue-500 fill-current" : ""
                      }`}
                    />
                    <span className="text-sm">{post.likes}</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSave(post.id)}
                    className="text-gray-600 dark:text-gray-400"
                  >
                    <Bookmark
                      className={`h-5 w-5 ${
                        post.saved ? "text-blue-500 fill-current" : ""
                      }`}
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div ref={bottomRef} />
      </main>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsAddingPost(true)}
        className="fixed bottom-20 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isAddingPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add New Post</h2>
                <button onClick={() => setIsAddingPost(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div
                onClick={() => fileInputRef.current.click()}
                className="w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg mb-4 flex items-center justify-center cursor-pointer"
              >
                {newPost.image ? (
                  <img
                    src={newPost.image}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Image className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click to upload an image
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <textarea
                placeholder="Caption"
                value={newPost.caption}
                onChange={(e) =>
                  setNewPost({ ...newPost, caption: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600"
                rows={3}
              />
              <button
                onClick={handleAddPost}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
              >
                Post
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
