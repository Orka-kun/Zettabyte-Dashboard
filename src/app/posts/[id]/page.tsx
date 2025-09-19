"use client";

import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";
import { use } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostDetail({ params }: { params: Promise<{ id: string }> }) {

  const { id } = use(params);
  
  const { data: post, loading, error } = useFetch<Post>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  if (loading)
    return (
      <div className="text-center mt-40">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
        <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
        <p className="text-zinc-600 dark:text-zinc-400">Please wait for a moment</p>
      </div>
    );
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <main className="p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4 text-black mt-20">{post?.title}</h1>
        <Link href="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Home
          </button>
        </Link>
      </div>
      <p className="text-gray-600">{post?.body}</p>
    </main>
  );
}
