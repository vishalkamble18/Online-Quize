import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/quiz/categories").then(res => setCategories(res.data));
  }, []);

  if (categories.length === 0) {
    return (
      
      <div className="min-h-screen flex items-center justify-center
                      bg-gradient-to-br from-purple-50 via-white to-purple-100
                      dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <p className="text-gray-500 dark:text-gray-400">
          No categories found
        </p>
      </div>
    );
  }

  return (
    /* 🔥 PAGE BACKGROUND */
    <div className="min-h-screen
                    bg-gradient-to-br from-purple-50 via-white to-purple-100
                    dark:from-gray-900 dark:via-gray-900 dark:to-gray-800
                    px-6 py-10">

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-10">
          Choose a Category
        </h1>

        {/* CATEGORY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map(c => (
            <Link
              key={c}
              to={`/quiz/category/${c}`}
              className="bg-white dark:bg-gray-800
                         rounded-2xl shadow-lg
                         p-8 text-center
                         text-xl font-semibold
                         text-purple-700 dark:text-purple-400
                         transition transform
                         hover:-translate-y-1 hover:shadow-xl"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
