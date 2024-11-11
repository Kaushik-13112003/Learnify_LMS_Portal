import React from "react";

const Dashboard = () => {
  // Temporary data
  const dashboardData = {
    totalCourses: 8,
    totalEarnings: 2500,
    totalStudentsEnrolled: 120,
    studentList: [
      {
        courseName: "JavaScript Essentials",
        studentName: "Alice Johnson",
        email: "alice@example.com",
        amount: 50,
        purchaseDate: "2024-11-10T14:00:00Z",
      },
      {
        courseName: "React for Beginners",
        studentName: "Bob Smith",
        email: "bob@example.com",
        amount: 75,
        purchaseDate: "2024-11-09T10:30:00Z",
      },
      // Add more students as needed
    ],
  };

  const { totalCourses, totalEarnings, totalStudentsEnrolled, studentList } =
    dashboardData;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Instructor Dashboard
      </h1>

      {/* Summary Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-blue-100 rounded-lg text-center shadow-md">
          <h2 className="text-xl font-medium text-blue-800">
            Total Courses Created
          </h2>
          <p className="text-2xl font-bold text-blue-900 mt-2">
            {totalCourses}
          </p>
        </div>
        <div className="p-6 bg-purple-100 rounded-lg text-center shadow-md">
          <h2 className="text-xl font-medium text-purple-800">
            Students Enrolled
          </h2>
          <p className="text-2xl font-bold text-purple-900 mt-2">
            {totalStudentsEnrolled}
          </p>
        </div>
        <div className="p-6 bg-green-100 rounded-lg text-center shadow-md">
          <h2 className="text-xl font-medium text-green-800">Total Earnings</h2>
          <p className="text-2xl font-bold text-green-900 mt-2">
            ${totalEarnings.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Student List Table */}
      <h2 className="text-2xl mt-[50px] font-semibold text-center mb-4">Student List</h2>
      <div className="overflow-x-auto mt-8 mb-10">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-gray-600 font-medium">
                Course Name
              </th>
              <th className="py-2 px-4 border-b text-gray-600 font-medium">
                Student Name
              </th>
              <th className="py-2 px-4 border-b text-gray-600 font-medium">
                Email
              </th>
              <th className="py-2 px-4 border-b text-gray-600 font-medium">
                Amount
              </th>
              <th className="py-2 px-4 border-b text-gray-600 font-medium">
                Date & Time
              </th>
            </tr>
          </thead>
          <tbody>
            {studentList.length > 0 ? (
              studentList.map((student, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-center">
                    {student.courseName}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {student.studentName}
                  </td>
                  <td className="py-2 px-4 text-center">{student.email}</td>
                  <td className="py-2 px-4 text-center">
                    ${student.amount.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {new Date(student.purchaseDate).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No students enrolled yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
