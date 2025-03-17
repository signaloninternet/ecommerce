import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config"; // Import DATABASE_URL

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const { data } = await axios.post(
          `${config.DATABASE_URL}/user/get-user`,
          { token }
        );
        if (data.userRole === "admin" || data.userRole === "superAdmin") {
          setUser(data);
          fetchUsers();
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${config.DATABASE_URL}/user/users`);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserRoleChange = async (id, newRole) => {
    // Optimistically update the UI
    const updatedUsers = users.map((user) =>
      user._id === id ? { ...user, userRole: newRole } : user
    );
    setUsers(updatedUsers);

    try {
      console.log("Request jaa rahi");
      await axios.put(`${config.DATABASE_URL}/admin/change-user-role`, {
        token: localStorage.getItem("token"),
        userId: id,
        newRole,
      });
      // Reload users after successful role update
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
      // Revert the optimistic update if the request fails
      fetchUsers();
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>Suman Enterprises</h1>
        </div>
        <ul className="nav-links">
          <li>
            <Link to={"/admin"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"/admin/add-product"}>Add Product</Link>
          </li>
          <li>
            <Link to={"/admin/users"}>Users</Link>
          </li>
          <li>
            <Link to={"/admin/services"}>Services</Link>
          </li>
          <li>
            <Link to={"/admin/product-list"}>Product List</Link>
          </li>
        </ul>
      </nav>
      <div className="admin-panel bg-gray-50 min-h-screen p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Admin Panel
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Users"
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full max-w-md mx-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium">
                  Name
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium">
                  Email
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium">
                  Role
                </th>
                {user?.userRole === "superAdmin" && (
                  <th className="py-3 px-6 text-left text-sm font-medium">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-3 px-6 text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-500">
                    {user.userRole}
                  </td>
                  {user?.userRole === "superAdmin" ? (
                    <td className="py-3 px-6 text-sm font-medium">
                      <select
                        value=""
                        disabled
                        className="border rounded-lg shadow-sm bg-gray-200 cursor-not-allowed"
                      >
                        <option value="">Locked</option>
                      </select>
                    </td>
                  ) : (
                    <td className="py-3 px-6 text-sm font-medium">
                      <select
                        value={user.userRole}
                        onChange={(e) =>
                          handleUserRoleChange(user._id, e.target.value)
                        }
                        className="border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {user.userRole !== "superAdmin" && (
                          <>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </>
                        )}
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
