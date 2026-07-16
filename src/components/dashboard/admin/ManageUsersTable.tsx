"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "@/types";

interface Props {
  users: User[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
}

export default function ManageUsersTable({
  users,
  currentPage,
  totalPages,
  totalUsers,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("search", e.target.value);
    params.set("page", "1");

    router.push(
      `/dashboard/admin/manage-users?${params.toString()}`
    );
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    params.set("page", page.toString());

    router.push(
      `/dashboard/admin/manage-users?${params.toString()}`
    );
  };  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-white">
          Manage Users
        </h2>

        <input
          type="text"
          placeholder="Search by name or email..."
          defaultValue={searchParams.get("search") || ""}
          onChange={handleSearch}
          className="
            w-full
            md:w-80
            rounded-xl
            border
            border-white/10
            bg-[#071425]
            px-4
            py-3
            text-white
            outline-none
          "
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#071425] p-4">
        <p className="text-slate-400">
          Total Users:
          <span className="ml-2 font-semibold text-white">
            {totalUsers}
          </span>
        </p>
      </div>      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#071425]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Credits</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-white/5"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        user.image ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />

                    <span className="font-medium text-white">
                      {user.name}
                    </span>
                  </div>
                </td>

                <td className="p-4 text-slate-300">
                  {user.email}
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
                    {user.role}
                  </span>
                </td>

                <td className="p-4 text-white">
                  {user.credits}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      className="
                        rounded-lg
                        bg-red-500
                        px-3
                        py-2
                        text-sm
                        text-white
                      "
                    >
                      Remove
                    </button>

                    <select
                      defaultValue={user.role}
                      className="
                        rounded-lg
                        border
                        border-white/10
                        bg-[#0d1d31]
                        px-3
                        py-2
                        text-sm
                        text-white
                      "
                    >
                      <option value="admin">
                        Admin
                      </option>

                      <option value="creator">
                        Creator
                      </option>

                      <option value="supporter">
                        Supporter
                      </option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}          </tbody>
            </table>
          </div>
    
          <div className="flex items-center justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                handlePageChange(currentPage - 1)
              }
              className="rounded-lg border border-white/10 px-4 py-2 text-white disabled:opacity-50"
            >
              Prev
            </button>
    
            <span className="text-white">
              {currentPage} / {totalPages}
            </span>
    
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                handlePageChange(currentPage + 1)
              }
              className="rounded-lg border border-white/10 px-4 py-2 text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      );
    }