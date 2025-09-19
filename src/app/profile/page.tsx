"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Profile() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex justify-center items-center">
        <motion.button
          onClick={() => signIn("google")}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          Sign in with Google
        </motion.button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 relative flex justify-center items-center">
    
      <motion.div
        className="absolute top-6 right-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Link href="/">
          <motion.button
            className="bg-teal-500 text-white shadow-md hover:bg-teal-600 hover:shadow-lg px-4 py-2 rounded-lg  transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.button>
        </Link>
      </motion.div>
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-6 text-teal-600"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Profile
        </motion.h1>
        <motion.p
          className="text-lg mb-4 text-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Name: {session.user?.name}
        </motion.p>
        <motion.p
          className="text-lg mb-6 text-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Email: {session.user?.email}
        </motion.p>
        <motion.button
          onClick={() => signOut()}
          className="bg-teal-500 text-white shadow-md hover:bg-teal-600 hover:shadow-lg px-4 py-2 rounded-lg  transition-colors duration-300 "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Out
        </motion.button>
      </motion.div>
    </main>
  );
}