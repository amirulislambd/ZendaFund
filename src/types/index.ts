export interface Campaign {
  id: string;
  title: string;
  story: string;
  category: string;
  fundingGoal: number;
  minimumContribution: number;
  raisedAmount: number;
  deadline: string;
  rewardInfo: string;
  imageUrl: string;
  creatorEmail: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'creator' | 'supporter' | 'Admin' | 'Creator' | 'Supporter';
  credits: number;
  profilePic?: string;
}

export interface AuthSessionUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  credits?: number;
  profilePic?: string;
}

export function getDashboardPath(role?: string) {
  const normalized = (role ?? "").toLowerCase();
  if (normalized === "admin") return "/dashboard/admin";
  if (normalized === "creator") return "/dashboard/creator";
  return "/dashboard/supporter";
}

export interface RegisterFormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'Supporter' | 'Creator';
  avatar?: FileList;
}
