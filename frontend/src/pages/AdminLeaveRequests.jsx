import React, { useState, useEffect } from "react";

const AdminLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Mock data (replace with API call)
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        employee_name: "John Doe",
        employee_id: "EMP0001",
        start_date: "2025-11-05",
        end_date: "2025-11-10",
        reason: "Medical leave",
        status: "Pending",
      },
      {
        id: 2,
        employee_name: "Jane Smith",
        employee_id: "EMP0002",
        start_date: "2025-11-12",
        end_date: "2025-11-15",
        reason: "Family event",
        status: "Approved",
      },
      {
        id: 3,
        employee_name: "David Johnson",
        employee_id: "EMP0003",
        start_date: "2025-11-20",
        end_date: "2025-11-22",
        reason: "Travel",
        status: "Rejected",
      },
    ];
    setLeaveRequests(mockData);
  }, []);

  // Approve or reject leave
  const handleStatusChange = (id, newStatus) => {
    setLeaveRequests((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status: newStatus } : leave
      )
    );

    // TODO: Call Django API to update leave status
    // await fetch(`/api/leaves/${id}/`, { method: "PATCH", body: JSON.stringify({ status: newStatus }) })
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Leave Requests Management
          </h1>
          <span className="text-sm text-gray-500">
            Total Requests: {leaveRequests.length}
          </span>
        </div>

        {leaveRequests.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No leave requests yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50 text-gray-700 text-sm">
                <tr>
                  <th className="border px-4 py-3 text-left">Employee</th>
                  <th className="border px-4 py-3 text-left">Employee ID</th>
                  <th className="border px-4 py-3 text-left">Start Date</th>
                  <th className="border px-4 py-3 text-left">End Date</th>
                  <th className="border px-4 py-3 text-left">Reason</th>
                  <th className="border px-4 py-3 text-center">Status</th>
                  <th className="border px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((leave) => (
                  <tr
                    key={leave.id}
                    className="text-sm text-gray-600 hover:bg-gray-50 transition"
                  >
                    <td className="border px-4 py-3">{leave.employee_name}</td>
                    <td className="border px-4 py-3">{leave.employee_id}</td>
                    <td className="border px-4 py-3">{leave.start_date}</td>
                    <td className="border px-4 py-3">{leave.end_date}</td>
                    <td className="border px-4 py-3">{leave.reason}</td>
                    <td
                      className={`border px-4 py-3 font-semibold text-center ${
                        leave.status === "Pending"
                          ? "text-yellow-600"
                          : leave.status === "Approved"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {leave.status}
                    </td>
                    <td className="border px-4 py-3 text-center">
                      {leave.status === "Pending" ? (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleStatusChange(leave.id, "Approved")}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(leave.id, "Rejected")}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs italic">No action</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeaveRequests;
