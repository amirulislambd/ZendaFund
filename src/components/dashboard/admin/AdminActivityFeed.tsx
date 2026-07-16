"use client";

import { motion } from "framer-motion";
import { Activity, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivityItem {
  _id: string;
  action: string;
  userName: string;
  userRole: string;
  createdAt: string;
}

interface Props {
  activities: ActivityItem[];
}

export default function AdminActivityFeed({ activities }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-3xl border border-slate-700/50 bg-[#0f172a] p-6 shadow-xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
          <Activity size={20} />
        </div>
        <h3 className="text-xl font-bold text-white">Recent Activity</h3>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
        {(!activities || activities.length === 0) ? (
          <p className="text-slate-400 text-center py-8">No recent activities found.</p>
        ) : (
          activities.map((activity, index) => (
            <motion.div
              key={activity._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex gap-4 group"
            >
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2" />
                {index !== activities.length - 1 && (
                  <div className="w-0.5 h-full bg-slate-800 mt-2" />
                )}
              </div>
              <div className="flex-1 bg-slate-800/30 border border-slate-700/30 rounded-2xl p-4 transition-colors group-hover:bg-slate-800/60">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="font-semibold text-white">
                      {activity.userName}
                    </span>{" "}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 ml-1">
                      {activity.userRole}
                    </span>
                    <p className="text-slate-300 mt-1 text-sm">{activity.action}</p>
                  </div>
                  <div className="flex items-center text-xs text-slate-500 whitespace-nowrap">
                    <Clock size={12} className="mr-1" />
                    {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
