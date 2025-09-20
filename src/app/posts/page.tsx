"use client";

import Card from "@/components/Card";
import { useFetch } from "@/hooks/useFetch";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

const postVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Posts() {
  const { data: posts, loading, error } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts");

  if (loading) return <div className="p-6">Loading posts...</div>;
  if (error) return <div className="p-6 text-red-500">{error || "Unknown error"}</div>;

  return (
    <main className="p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4 text-black">Posts</h1>
        <div className="flex space-x-2">
          
          <Link href="/">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors">
              Home
            </button>
          </Link>
        </div>
      </div>
      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.isArray(posts) && posts.map((post: Post) => (
            <motion.div
              key={post.id}
              variants={postVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ delay: post.id * 0.1 }}
            >
              <Card title={post.title} body={post.body} id={post.id} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </main>
  );
}