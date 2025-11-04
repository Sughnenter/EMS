import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeDetail = () => {
  const { employeeId } = useParams(); // e.g., EMP0001
  const [employee, setEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Mock data (replace with real API fetch)
  useEffect(() => {
    const mockEmployee = {
      full_name: "John Doe",
      email: "john@example.com",
      employee_id: employeeId,
      dob: "1990-05-12",
      address: "123 Main Street, Lagos",
      gender: "Male",
      phone_number: "+2348012345678",
      position: "Software Engineer",
      date_joined: "2023-01-15",
    };

    const mockTasks = [
      { id: 1, title: "Fix API Bug", dueDate: "2025-11-10", status: "Pending" },
      { id: 2, title: "Update Docs", dueDate: "2025-11-15", status: "Completed" },
    ];

    setEmployee(mockEmployee);
    setTasks(mockTasks);
  }, [employeeId]);

  if (!employee)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading employee details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Employee Details
          </h1>
          <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg text-sm font-semibold">
            {employee.position}
          </span>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Personal Information
            </h2>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Full Name:</span> {employee.full_name}</p>
              <p><span className="font-medium">Employee ID:</span> {employee.employee_id}</p>
              <p><span className="font-medium">Email:</span> {employee.email}</p>
              <p><span className="font-medium">Phone:</span> {employee.phone_number}</p>
              <p><span className="font-medium">Gender:</span> {employee.gender}</p>
              <p><span className="font-medium">Date of Birth:</span> {employee.dob}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Work Information
            </h2>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Position:</span> {employee.position}</p>
              <p><span className="font-medium">Address:</span> {employee.address}</p>
              <p><span className="font-medium">Date Joined:</span> {employee.date_joined}</p>
            </div>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Attendance Summary</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-100 text-green-700 py-3 rounded-lg">
              <p className="text-xl font-bold">22</p>
              <p className="text-sm">Days Present</p>
            </div>
            <div className="bg-yellow-100 text-yellow-700 py-3 rounded-lg">
              <p className="text-xl font-bold">3</p>
              <p className="text-sm">Days Late</p>
            </div>
            <div className="bg-red-100 text-red-700 py-3 rounded-lg">
              <p className="text-xl font-bold">2</p>
              <p className="text-sm">Days Absent</p>
            </div>
          </div>
        </div>

        {/* Assigned Tasks */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Assigned Tasks
          </h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-sm">No tasks assigned.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm">Task</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm">Due Date</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-sm">{task.title}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">{task.dueDate}</td>
                    <td
                      className={`border border-gray-200 px-4 py-2 text-sm font-medium ${
                        task.status === "Completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {task.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
