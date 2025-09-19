"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import Card from "@/components/Card";
import logo from "../../public/assets/logo.png";
import Image from "next/image";
import { useFetch } from "@/hooks/useFetch";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function Home() {
  const { data: session, status } = useSession();

  const { data: users, loading: usersLoading, error: usersError } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");
  const { data: posts, loading: postsLoading, error: postsError } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts");
  const userCount = users ? users.length : 0;
  const postCount = posts ? posts.length : 0;
  const viewCount = Math.floor(Math.random() * 1000) + 500;

  if (status === "loading") 
    return <div className="text-center mt-40">
            <div
              className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto">
            </div>
            <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Your adventure is about to begin
            </p>
          </div>;
  if (!session) {
    return (
      <main
        className="min-h-screen p-6 flex justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative"
      >

        <motion.div
          initial={{ rotate: 0 }}
          animate={{
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={{
            position: 'absolute',
            left: '5rem',
            width: '3rem',
            height: '3rem',
          }}
          className="md:w-28 md:h-28"
        >
          <Image
            src={logo}
            alt="Zettabyte Logo"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </motion.div>
        <motion.div
          className="text-center max-w-6xl"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 py-16"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            ZettaByte Technology Incorporation ✔
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-700 mb-6 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Welcome to Zettabyte Technology Incorporation! <br />
            Innovating since, we empower businesses with cutting-edge IT solutions. <br />
            From Dhaka to the world, we drive digital transformation for startups to Fortune 500s. <br />
            Guided by integrity and excellence, unlock your potential with us. <br />
            Sign in to explore your personalized dashboard!
          </motion.p>
          <motion.button
            onClick={() => signIn("google")}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign in with Google
          </motion.button>
        </motion.div>
      </main>
    );
  }

  if (usersLoading || postsLoading) {
    return <div className="text-center mt-40">
            <div
              className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto">
            </div>
            <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Please wait a moment
            </p>
          </div>;
  }

  if (usersError || postsError) {
    return (
      <main className="p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen text-center">
        <div className="flex justify-between items-center mb-4 ">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="w-12 h-12 md:w-28 md:h-28"
          >
            <Image
              src={logo}
              alt="Zettabyte Logo"
              className="w-full h-full object-cover rounded-full shadow-lg"
            />
          </motion.div>
          <h1 className="text-3xl font-bold text-black">Zettabyte Dashboard</h1>
          <div className="flex space-x-2">
            
            <Link href="/profile">
              <button className="bg-teal-500 text-white shadow-md hover:bg-teal-600 hover:shadow-lg px-4 py-2 rounded-lg  transition-colors">
                User Profile
              </button>
            </Link>
            <Link href="/error-page">
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                Simulate Error
              </button>
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
        <p className="text-red-500 text-lg">Failed to load dashboard stats. Error: {usersError || postsError}</p>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
      <div className="flex justify-between items-center mb-4 ">
       
        <motion.div
          initial={{ rotate: 0 }}
          animate={{
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="w-12 h-12 md:w-28 md:h-28"
        >
          <Image
            src={logo}
            alt="Zettabyte Logo"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </motion.div>
        <h1 className="text-3xl font-bold text-black">Zettabyte Dashboard</h1>
        <div className="flex space-x-2">
          
          <Link href="/profile">
            <button className="bg-teal-500 text-white shadow-md hover:bg-teal-600 hover:shadow-lg px-4 py-2 rounded-lg  transition-colors">
              User Profile
            </button>
          </Link>
          <Link href="/error-page">
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors">
              Simulate Error
            </button>
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
      <motion.p
        className="mb-6 text-center text-lg md:text-xl text-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Zettabyte Dashboard, {session.user?.name}! <br />
        Your hub for top IT solutions. <br />
        Explore stats and manage your digital world with ease.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          `Users: ${userCount}`,
          `Posts: ${postCount}`,
          `Views: ${viewCount}`,
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <Card title={stat} id={index === 0 ? "/users" : index === 1 ? "/posts" : undefined} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}
