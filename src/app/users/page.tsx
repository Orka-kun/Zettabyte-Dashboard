"use client";

import { useFetch } from "@/hooks/useFetch";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
};

const tableVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Users() {
  const { data: users, loading, error } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  if (loading)
    return (
      <div className="text-center mt-40">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
        <h2 className="text-zinc-900 dark:text-white mt-4">Loading users</h2>
        <p className="text-zinc-600 dark:text-zinc-400">Please wait a moment</p>
      </div>
    );
  if (error) return <div className="p-6 text-red-500">{error || "Unknown error"}</div>;

  return (
    <main className="p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4">Users Informations</h1>
        <div className="flex space-x-2">
          <Link href="/">
            <button className="bg-teal-500 text-white shadow-md hover:bg-teal-600 hover:shadow-lg px-4 py-2  transition-colors rounded-lg">
              Home
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-teal-100 to-cyan-100">
  <motion.div
    variants={tableVariants}
    initial="hidden"
    animate="visible"
  >
        <table className="w-full text-center border-collapse">
          <thead className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
            <tr>
              <th className="p-4 border-b-2 border-teal-300 font-semibold">Name</th>
              <th className="p-4 border-b-2 border-teal-300 font-semibold">Email</th>
              <th className="p-4 border-b-2 border-teal-300 font-semibold">Company</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user: User) => (
                <tr
                  key={user.id}
                  className="hover:bg-gradient-to-r from-teal-50 to-cyan-50 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="p-4 border-b border-teal-200 text-teal-800">{user.name}</td>
                  <td className="p-4 border-b border-teal-200 text-teal-800">{user.email}</td>
                  <td className="p-4 border-b border-teal-200 text-teal-800">{user.company.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </motion.div>
</div>
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ duration: 0.3 }}
          >
            <div
              className="fixed inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setSelectedUser(null)}
            >
              <div
                className="bg-teal-100 p-6 rounded-lg shadow-lg text-teal-900"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-2">{selectedUser.name}</h2>
                <p>Email: {selectedUser.email}</p>
                <p>Company: {selectedUser.company.name}</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="mt-4 bg-teal-900 text-white hover:text-teal-100 px-4 py-2 rounded font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
// "use client";

// import { useFetch } from "@/hooks/useFetch";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import Link from "next/link";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   company: { name: string };
// }

// const modalVariants = {
//   hidden: { opacity: 0, scale: 0.5 },
//   visible: { opacity: 1, scale: 1 },
//   exit: { opacity: 0, scale: 0.5 },
// };

// const tableVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const rowVariants = {
//   hidden: { opacity: 0, y: 20, scale: 0.95 },
//   visible: { opacity: 1, y: 0, scale: 1 },
// };

// export default function Users() {
//   const { data: users, loading, error } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);

//   if (loading) 
//     return  <div className="text-center mt-40">
//               <div
//                 className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto">
//               </div>
//               <h2 className="text-zinc-900 dark:text-white mt-4">Loading users</h2>
//               <p className="text-zinc-600 dark:text-zinc-400">
//                 Please wait a moment
//               </p>
//             </div>;
//   if (error) return <div className="p-6 text-red-500">{error || "Unknown error"}</div>;

//   return (
//     <main className="p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen text-black">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold mb-4">Users Informations</h1>
//         <div className="flex space-x-2">
//           <Link href="/">
//             <button className="bg-teal-500 text-white shadow-md hover:bg-teal-600 hover:shadow-lg px-4 py-2  transition-colors rounded-lg">
//               Home
//             </button>
//           </Link>
//         </div>
//       </div>
//       <motion.div
//         className="overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-teal-100 to-cyan-100"
//         variants={tableVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <table className="w-full text-center border-collapse">
//           <motion.thead
//             className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             <tr>
//               <th className="p-4 border-b-2 border-teal-300 font-semibold">Name</th>
//               <th className="p-4 border-b-2 border-teal-300 font-semibold">Email</th>
//               <th className="p-4 border-b-2 border-teal-300 font-semibold">Company</th>
//             </tr>
//           </motion.thead>
//           <motion.tbody>
//             {Array.isArray(users) && users.map((user: User) => (
//               <motion.tr
//                 key={user.id}
//                 className="hover:bg-gradient-to-r from-teal-50 to-cyan-50 transition-all duration-300 cursor-pointer"
//                 variants={rowVariants}
//                 whileHover={{ scale: 1.02, rotate: 0.5, transition: { duration: 0.3 } }}
//                 onClick={() => {
//                   console.log("Row clicked:", user.name); 
//                   setSelectedUser(user);
//                 }}
//               >
//                 <td className="p-4 border-b border-teal-200 text-teal-800">{user.name}</td>
//                 <td className="p-4 border-b border-teal-200 text-teal-800">{user.email}</td>
//                 <td className="p-4 border-b border-teal-200 text-teal-800">{user.company.name}</td>
//               </motion.tr>
//             ))}
//           </motion.tbody>
//         </table>
//       </motion.div>
//       <AnimatePresence>
//         {selectedUser && (
//           <motion.div
//             className="fixed inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 bg-opacity-50 flex items-center justify-center z-50"
//             onClick={() => setSelectedUser(null)}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             variants={modalVariants}
//             transition={{ duration: 0.3 }}
//           >
//             <motion.div
//               className="bg-teal-100 p-6 rounded-lg shadow-lg text-teal-900"
//               onClick={(e: React.MouseEvent) => e.stopPropagation()}
//             >
//               <h2 className="text-2xl font-bold mb-2">{selectedUser.name}</h2>
//               <p>Email: {selectedUser.email}</p>
//               <p>Company: {selectedUser.company.name}</p>
//               <button
//                 onClick={() => setSelectedUser(null)}
//                 className="mt-4 bg-teal-900 text-white hover:text-teal-100 px-4 py-2 rounded font-bold"
//               >
//                 Close
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </main>
//   );
// }