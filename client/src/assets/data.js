export const categories = [
  { name: "Web Development", slug: "web-development" },
  { name: "Data Science", slug: "data-science" },
  { name: "Business Management", slug: "business-management" },
  { name: "Graphic Design", slug: "graphic-design" },
  { name: "Digital Marketing", slug: "digital-marketing" },
  { name: "Cybersecurity", slug: "cybersecurity" },
  { name: "Artificial Intelligence", slug: "artificial-intelligence" },
  { name: "Finance & Accounting", slug: "finance-accounting" },
  { name: "Health & Wellness", slug: "health-wellness" },
  { name: "Photography", slug: "photography" },
  { name: "Personal Development", slug: "personal-development" },
  { name: "Language Learning", slug: "language-learning" },
];

export const languages = ["English", "Hindi", "Urdu"];

export const levels = ["Beginner", "Medium", "Advance"];

export const courses = [
  {
    title: "React for Beginners",
    category: "Web Development",
    level: "Beginner",
    language: "English",
    fees: "$50",
    description:
      "Learn React from scratch, including components, hooks, and state management.",
    imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    categoryIcon: "🌐", // Example icon for category
    languageIcon: "🇬🇧", // Example icon for language
  },
  {
    title: "Advanced Python Programming",
    category: "Programming",
    level: "Advanced",
    language: "English",
    fees: "$100",
    description:
      "Master Python with advanced topics like decorators, generators, and OOP.",
    imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    categoryIcon: "💻", // Example icon for category
    languageIcon: "🇬🇧", // Example icon for language
  },
  {
    title: "Data Science with Python",
    category: "Data Science",
    level: "Intermediate",
    language: "English",
    fees: "$80",
    description:
      "Learn data analysis, visualization, and machine learning using Python libraries.",
    imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    categoryIcon: "📊", // Example icon for category
    languageIcon: "🇬🇧", // Example icon for language
  },
];

export const courseCurriculumInitialFormData = [
  {
    title: "",
    freePreview: false,
    videoUrl: "",
    publicId: "",
  },
];
