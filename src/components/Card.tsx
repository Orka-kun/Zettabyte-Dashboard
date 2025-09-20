import { motion } from "framer-motion";
import Link from "next/link";

interface CardProps {
  title: string;
  body?: string;
  id?: string | number;
}

export default function Card({ title, body, id }: CardProps) {
  const content = (
    <>
      <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">{title}</h3>
      {body && <p className="text-gray-600 mt-2 truncate">{body}</p>}
    </>
  );

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        whileHover={{ scale: 1.05, rotate: 1, transition: { duration: 0.3 } }}
      >
        {id ? (
          <Link href={typeof id === "string" ? id : `/posts/${id}`}>
            <div>{content}</div>
          </Link>
        ) : (
          content
        )}
      </motion.div>
    </div>
  );
}
// import { motion } from "framer-motion";
// import Link from "next/link";

// interface CardProps {
//   title: string;
//   body?: string;
//   id?: string | number;
// }

// export default function Card({ title, body, id }: CardProps) {
//   return (
//     <div className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer overflow-hidden">
//     <motion.div
      
//       initial={{ opacity: 0, y: 20, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
//       whileHover={{ scale: 1.05, rotate: 1, transition: { duration: 0.3 } }}
//     >
//       {id ? (
//         <Link href={typeof id === "string" ? id : `/posts/${id}`}>
//           <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">{title}</h3>
//           <p className="text-gray-600 mt-2 truncate">{body}</p>
//         </Link>
//       ) : (
//         <>
//           <h3 className="text-xl font-bold text-gray-800">{title}</h3>
//           <p className="text-gray-600 mt-2">{body}</p>
//         </>
//       )}
//     </motion.div>
//     </div>
//   );
// }