import React from "react";
import { NavLink } from "react-router-dom";
import { categories } from "@/assets/data";

const Categories = () => {
  return (
    <div>
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6">
          Course Categories
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <NavLink
              to={`/courses/${category.slug}`}
              key={category}
              className="bg-white p-4 rounded-lg shadow text-center hover:shadow-lg transition"
            >
              <h4 className="text-xl sm:text-1xl font-semibold text-blue-600">
                {category.name}
              </h4>
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Categories;
