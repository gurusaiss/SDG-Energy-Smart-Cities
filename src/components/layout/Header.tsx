import { useState } from 'react';
import { Bell, Search, UserCircle, Shield, LogOut, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NOTIFICATIONS = [
    { id: 1, text: "Grid load spike detected in Sector 4", time: "2m ago", type: "warning" },
    { id: 2, text: "Bus R102 is running 5m late", time: "10m ago", type: "alert" },
    { id: 3, text: "Solar output exceeds forecast by 12%", time: "1h ago", type: "success" },
    { id: 4, text: "Battery storage fully charged", time: "2h ago", type: "info" },
    { id: 5, text: "New efficiency report available", time: "3h ago", type: "info" },
];

export function Header() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    return (
        <>
            <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-10">
                <div className="flex items-center gap-4 w-96">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search metrics, buildings, or routes..."
                            className="w-full bg-slate-800/50 border-none rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:ring-2 focus:ring-eco-primary/50 placeholder:text-slate-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg relative"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-eco-danger rounded-full border-2 border-slate-900"></span>
                        </button>

                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 top-full mt-2 w-80 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                                >
                                    <div className="p-3 border-b border-white/5 font-bold text-slate-200">Notifications</div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {NOTIFICATIONS.map(n => (
                                            <div key={n.id} className="p-3 hover:bg-white/5 border-b border-white/5 last:border-0 cursor-pointer">
                                                <p className="text-sm text-slate-300">{n.text}</p>
                                                <p className="text-xs text-slate-500 mt-1">{n.time}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-2 text-center text-xs text-eco-primary cursor-pointer hover:underline">
                                        Mark all as read
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Profile */}
                    <div
                        className="flex items-center gap-3 pl-4 border-l border-slate-800 cursor-pointer"
                        onClick={() => setShowProfile(true)}
                    >
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-medium text-slate-200">City Planner</div>
                            <div className="text-xs text-slate-400">Admin Access</div>
                        </div>
                        <UserCircle className="w-8 h-8 text-slate-400 hover:text-eco-primary transition-colors" />
                    </div>
                </div>
            </header>

            {/* Profile Modal */}
            <AnimatePresence>
                {showProfile && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass-panel w-full max-w-md p-0 rounded-2xl overflow-hidden relative"
                        >
                            <button
                                onClick={() => setShowProfile(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="h-32 bg-gradient-to-r from-eco-primary to-eco-secondary relative">
                                <div className="absolute -bottom-10 left-6 p-1 bg-slate-900 rounded-full">
                                    <UserCircle className="w-20 h-20 text-slate-200 bg-slate-900 rounded-full" />
                                </div>
                            </div>

                            <div className="pt-12 px-6 pb-6">
                                <h2 className="text-2xl font-bold text-white">Alex Sterling</h2>
                                <p className="text-eco-primary font-medium">Chief City Architect</p>

                                <div className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Shield className="w-5 h-5 text-eco-success" />
                                            <span className="text-slate-300">Clearance Level</span>
                                        </div>
                                        <span className="font-mono font-bold text-white">Lvl 5 (Root)</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <User className="w-5 h-5 text-eco-secondary" />
                                            <span className="text-slate-300">Employee ID</span>
                                        </div>
                                        <span className="font-mono font-bold text-white">SDG-11-007</span>
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <button className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-medium text-white transition-colors">
                                        Edit Profile
                                    </button>
                                    <button className="flex-1 py-2.5 bg-eco-danger/20 hover:bg-eco-danger/30 text-eco-danger rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
