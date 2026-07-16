"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Users, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

import { User } from "@/types";
import DynamicConfirmModal from "@/components/shared/DynamicConfirmModal";
import { DeleteUser, UpdateUserRole } from "@/lib/api/admin";

interface Props {
  users: User[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
}

type Role = "admin" | "creator" | "supporter";

interface ModalState {
  open: boolean;
  type: "delete" | "role";
  userId: string | null;
  userName: string;
  pendingRole?: Role;
}

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "creator", label: "Creator" },
  { value: "supporter", label: "Supporter" },
];

const roleBadge = (role: string) => {
  if (role === "admin")
    return "bg-purple-500/10 text-purple-400 border border-purple-500/20";
  if (role === "creator")
    return "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";
  return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
};

export default function ManageUsersTable({
  users,
  currentPage,
  totalPages,
  totalUsers,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<ModalState>({
    open: false,
    type: "delete",
    userId: null,
    userName: "",
  });

  /* ─── debounced search ─────────────────────────────────────────────────── */
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search.trim()) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      router.push(`/dashboard/admin/manage-users?${params.toString()}`);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  /* ─── pagination ───────────────────────────────────────────────────────── */
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/dashboard/admin/manage-users?${params.toString()}`);
  };

  /* ─── open modals ──────────────────────────────────────────────────────── */
  const openDeleteModal = (user: User) => {
    setModal({ open: true, type: "delete", userId: user.id, userName: user.name });
  };

  const openRoleModal = (user: User, newRole: Role) => {
    setModal({
      open: true,
      type: "role",
      userId: user.id,
      userName: user.name,
      pendingRole: newRole,
    });
  };

  const closeModal = () =>
    setModal({ open: false, type: "delete", userId: null, userName: "" });

  /* ─── confirm actions ──────────────────────────────────────────────────── */
  const handleConfirm = async () => {
    if (!modal.userId) return;
    setIsLoading(true);
    try {
      if (modal.type === "delete") {
        const res = await DeleteUser(modal.userId);
        if (res.success === false) throw new Error(res.message);
        toast.success("User removed successfully");
      } else {
        const res = await UpdateUserRole(modal.userId, modal.pendingRole!);
        if (res.success === false) throw new Error(res.message);
        toast.success(`Role updated to ${modal.pendingRole}`);
      }
      closeModal();
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  /* ─── JSX ──────────────────────────────────────────────────────────────── */
  return (
    <>
      <div className="space-y-6">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="rounded-3xl border border-white/10 bg-[#071425] p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                <Users className="h-3.5 w-3.5" />
                User Management
              </div>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Manage Users
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Manage roles, permissions and users
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email…"
                className="w-full rounded-2xl border border-white/10 bg-[#020817] py-3 pl-11 pr-4 text-white outline-none transition focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* ── Stat card ──────────────────────────────────────────────────── */}
        <div className="rounded-3xl border border-white/10 bg-[#071425] p-5">
          <p className="text-sm text-slate-400">Total Registered Users</p>
          <h3 className="mt-2 text-3xl font-bold text-white">
            {totalUsers.toLocaleString()}
          </h3>
        </div>

        {/* ── Desktop Table ───────────────────────────────────────────────── */}
        <div className="hidden overflow-hidden rounded-3xl border border-white/10 bg-[#071425] lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Credits
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-16 text-center text-slate-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/5 transition hover:bg-white/[0.03]"
                  >
                    {/* User */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            user.image || "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt={user.name}
                          width={44}
                          height={44}
                          className="rounded-full border border-white/10 object-cover"
                        />
                        <p className="font-semibold text-white">
                          {user.name || "Unknown User"}
                        </p>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-5 text-sm text-slate-300">
                      {user.email}
                    </td>

                    {/* Role badge */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${roleBadge(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Credits */}
                    <td className="px-6 py-5 font-semibold text-white">
                      {(user.credits || 0).toLocaleString()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-3">
                        {/* Role dropdown */}
                        <div className="relative">
                          <select
                            defaultValue={user.role}
                            onChange={(e) =>
                              openRoleModal(user, e.target.value as Role)
                            }
                            className="
                              appearance-none
                              cursor-pointer
                              rounded-xl
                              border
                              border-white/10
                              bg-[#0d1f35]
                              py-2
                              pl-3
                              pr-8
                              text-sm
                              text-white
                              outline-none
                              transition
                              hover:border-cyan-500/40
                              focus:border-cyan-500
                            "
                          >
                            {ROLE_OPTIONS.map((opt) => (
                              <option
                                key={opt.value}
                                value={opt.value}
                                className="bg-[#0d1f35]"
                              >
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => openDeleteModal(user)}
                          className="rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-2 text-sm font-medium text-rose-400 transition hover:bg-rose-500/20 hover:text-rose-300"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Mobile Cards ────────────────────────────────────────────────── */}
        <div className="space-y-4 lg:hidden">
          {users.length === 0 && (
            <p className="py-10 text-center text-slate-500">No users found.</p>
          )}
          {users.map((user) => (
            <div
              key={user.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-[#071425] p-5"
            >
              {/* Top */}
              <div className="flex items-center gap-3">
                <Image
                  src={user.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt={user.name}
                  width={52}
                  height={52}
                  className="rounded-full border border-white/10 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-white">
                    {user.name || "Unknown User"}
                  </h3>
                  <p className="truncate text-sm text-slate-400">{user.email}</p>
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/5 bg-[#020817] p-3">
                  <p className="text-xs text-slate-500">Role</p>
                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${roleBadge(user.role)}`}
                  >
                    {user.role}
                  </span>
                </div>
                <div className="rounded-2xl border border-white/5 bg-[#020817] p-3">
                  <p className="text-xs text-slate-500">Credits</p>
                  <h4 className="mt-2 font-bold text-white">
                    {(user.credits || 0).toLocaleString()}
                  </h4>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex flex-col gap-3">
                {/* Role dropdown */}
                <div className="relative">
                  <select
                    defaultValue={user.role}
                    onChange={(e) =>
                      openRoleModal(user, e.target.value as Role)
                    }
                    className="
                      w-full
                      appearance-none
                      cursor-pointer
                      rounded-xl
                      border
                      border-white/10
                      bg-[#0d1f35]
                      py-2.5
                      pl-3
                      pr-8
                      text-sm
                      text-white
                      outline-none
                      transition
                      hover:border-cyan-500/40
                    "
                  >
                    {ROLE_OPTIONS.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-[#0d1f35]"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>

                <button
                  onClick={() => openDeleteModal(user)}
                  className="w-full rounded-xl bg-rose-500/10 border border-rose-500/20 py-2.5 text-sm font-medium text-rose-400 transition hover:bg-rose-500/20"
                >
                  Remove User
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Pagination ─────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-slate-400">
            Page{" "}
            <span className="font-semibold text-white">{currentPage}</span> of{" "}
            <span className="font-semibold text-white">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="rounded-xl border border-white/10 bg-[#071425] px-4 py-2 text-sm text-white transition hover:border-cyan-500/30 hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
              {currentPage}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="rounded-xl border border-white/10 bg-[#071425] px-4 py-2 text-sm text-white transition hover:border-cyan-500/30 hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ── Confirm Modal ────────────────────────────────────────────────── */}
      <DynamicConfirmModal
        isOpen={modal.open}
        isLoading={isLoading}
        onClose={closeModal}
        onConfirm={handleConfirm}
        variant={modal.type === "delete" ? "danger" : "warning"}
        title={
          modal.type === "delete"
            ? "Remove User"
            : `Change Role to ${modal.pendingRole}`
        }
        description={
          modal.type === "delete"
            ? `Are you sure you want to permanently remove "${modal.userName}"? This action cannot be undone.`
            : `Are you sure you want to change "${modal.userName}"'s role to "${modal.pendingRole}"?`
        }
        confirmText={modal.type === "delete" ? "Remove" : "Change Role"}
        cancelText="Cancel"
      />
    </>
  );
}