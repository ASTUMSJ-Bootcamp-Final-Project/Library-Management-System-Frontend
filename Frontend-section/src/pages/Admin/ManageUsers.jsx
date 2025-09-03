import AdminSidebar from "@/components/AdminSidebar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect, useMemo, useState } from "react";
import { usersAPI } from "@/services/api";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUser = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);

  const isSuperAdmin = currentUser.role === "super_admin";

  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = isSuperAdmin
          ? await usersAPI.getAllUsersSuperAdmin()
          : await usersAPI.getAllUsersAdminView();
        if (isMounted) setUsers(data || []);
      } catch (err) {
        if (isMounted) setError(err?.response?.data?.message || "Failed to load users");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchUsers();
    return () => {
      isMounted = false;
    };
  }, [isSuperAdmin]);

  const handlePromote = async (userId) => {
    try {
      await usersAPI.promoteToAdmin(userId);
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role: "admin" } : u)));
      toast.success("User promoted to admin");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to promote user";
      setError(msg);
      toast.error(msg);
    }
  };

  const handleDemote = async (userId) => {
    try {
      await usersAPI.demoteAdmin(userId);
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role: "user" } : u)));
      toast.success("Admin demoted to user");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to demote admin";
      setError(msg);
      toast.error(msg);
    }
  };

  const handleDelete = async (userId, isRegular) => {
    try {
      if (isSuperAdmin) {
        await usersAPI.deleteAnyUser(userId);
      } else if (isRegular) {
        await usersAPI.deleteRegularUser(userId);
      }
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success("User deleted");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to delete user";
      setError(msg);
      toast.error(msg);
    }
  };

  const adminUsers = users.filter((u) => u.role === "admin");
  const regularUsers = users.filter((u) => u.role === "user");

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      <main className="flex-1 px-6 py-3">
        <Navbar />
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">Manage Users</h1>

        {error && (
          <div className="mb-4 p-3 rounded border border-red-200 bg-red-50 text-red-700">{error}</div>
        )}

        {loading ? (
          <div className="p-6 rounded border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">Loading users...</div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Admins</h2>
              <div className="overflow-x-auto rounded border bg-white dark:bg-gray-800 dark:border-gray-700">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900/40">
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Username</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Email</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Role</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map((u) => {
                      const isSelf = currentUser?.id === u._id || currentUser?._id === u._id;
                      const canDelete = isSuperAdmin && !isSelf; // super admin cannot delete self
                      const canDemote = isSuperAdmin && u.role === "admin" && !isSelf;
                      return (
                        <tr key={u._id} className="border-t dark:border-gray-700">
                          <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{u.username}</td>
                          <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{u.email}</td>
                          <td className="px-4 py-2 capitalize text-gray-900 dark:text-gray-100">{u.role?.replace("_", " ")}</td>
                          <td className="px-4 py-2 space-x-2">
                            {canDemote && (
                              <button
                                onClick={() => handleDemote(u._id)}
                                className="px-3 py-1 text-sm rounded bg-yellow-600 hover:bg-yellow-700 text-white"
                              >
                                Demote to User
                              </button>
                            )}
                            {canDelete && (
                              <button
                                onClick={() =>
                                  toast((t) => (
                                    <div>
                                      <p className="mb-2">Are you sure you want to delete {u.username}?</p>
                                      <div className="flex gap-2">
                                        <button
                                          className="px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
                                          onClick={() => {
                                            toast.dismiss(t.id);
                                            handleDelete(u._id, false);
                                          }}
                                        >
                                          Yes, Delete
                                        </button>
                                        <button
                                          className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                                          onClick={() => toast.dismiss(t.id)}
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ))
                                }
                                className="px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Users</h2>
              <div className="overflow-x-auto rounded border bg-white dark:bg-gray-800 dark:border-gray-700">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900/40">
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Username</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Email</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Role</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regularUsers.map((u) => {
                      const canDelete = isSuperAdmin || u.role === "user"; // admin can delete only regular users
                      const canPromote = isSuperAdmin && u.role === "user";
                      return (
                        <tr key={u._id} className="border-t dark:border-gray-700">
                          <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{u.username}</td>
                          <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{u.email}</td>
                          <td className="px-4 py-2 capitalize text-gray-900 dark:text-gray-100">{u.role?.replace("_", " ")}</td>
                          <td className="px-4 py-2 space-x-2">
                            {canPromote && (
                              <button
                                onClick={() => handlePromote(u._id)}
                                className="px-3 py-1 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                Promote to Admin
                              </button>
                            )}
                            {canDelete && (
                              <button
                                onClick={() =>
                                  toast((t) => (
                                    <div>
                                      <p className="mb-2">Are you sure you want to delete {u.username}?</p>
                                      <div className="flex gap-2">
                                        <button
                                          className="px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
                                          onClick={() => {
                                            toast.dismiss(t.id);
                                            handleDelete(u._id, true);
                                          }}
                                        >
                                          Yes, Delete
                                        </button>
                                        <button
                                          className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                                          onClick={() => toast.dismiss(t.id)}
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ))
                                }
                                className="px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
        </div>
          </>
        )}

        <Footer />
      </main>
    </div>
  );
};

export default ManageUsers;
