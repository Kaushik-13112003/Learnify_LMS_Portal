import Categories from "./Categories";
import FeaturedCourses from "./FeaturedCourses";
import Hero from "./Hero";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <Categories />

      {/* Featured Courses Section */}
      <FeaturedCourses />
    </div>
  );
};

export default Home;
