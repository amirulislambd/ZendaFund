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
  role: 'admin' | 'creator' | 'supporter';
  credits: number;
  profilePic?: string;
}

export interface RegisterFormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'Supporter' | 'Creator';
  avatar?: FileList;
}
