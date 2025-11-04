import React, { useState } from "react";

const AssignTask = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    employee: "",
    title: "",
    description: "",
    dueDate: "",
  });

  const employees = [
    { id: 1, name: "John Doe", employee_id: "EMP0001" },
    { id: 2, name: "Jane Smith", employee_id: "EMP0002" },
    { id: 3, name: "Michael Brown", employee_id: "EMP0003" },
  ];

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.employee || !newTask.title || !newTask.dueDate) return alert("All fields required.");
    const task = {
      id: tasks.length + 1,
      ...newTask,
      status: "Pending",
      assignedAt: new Date().toLocaleDateString(),
    };
    setTasks([...tasks, task]);
    setNewTask({ employee: "", title: "", description: "", dueDate: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Assign Task to Employee</h2>
        
        {/* Task Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Employee</label>
            <select
              name="employee"
              value={newTask.employee}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Select Employee --</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.employee_id}>
                  {emp.name} ({emp.employee_id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleChange}
              rows={3}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter task details"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Assign Task
          </button>
        </form>

        {/* Task List */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Assigned Tasks</h3>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-sm">No tasks assigned yet.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-sm text-left">Employee</th>
                  <th className="border border-gray-200 px-4 py-2 text-sm text-left">Task Title</th>
                  <th className="border border-gray-200 px-4 py-2 text-sm text-left">Due Date</th>
                  <th className="border border-gray-200 px-4 py-2 text-sm text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-sm">{task.employee}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">{task.title}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">{task.dueDate}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-yellow-600">{task.status}</td>
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

export default AssignTask;
