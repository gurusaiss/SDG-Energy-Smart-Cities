import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Zap, Bus, Activity, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
    { name: 'Mon', energy: 4000, transport: 2400, renewable: 2400 },
    { name: 'Tue', energy: 3000, transport: 1398, renewable: 2210 },
    { name: 'Wed', energy: 2000, transport: 9800, renewable: 2290 },
    { name: 'Thu', energy: 2780, transport: 3908, renewable: 2000 },
    { name: 'Fri', energy: 1890, transport: 4800, renewable: 2181 },
    { name: 'Sat', energy: 2390, transport: 3800, renewable: 2500 },
    { name: 'Sun', energy: 3490, transport: 4300, renewable: 2100 },
];

const stats = [
    {
        title: 'Total Energy Usage',
        value: '452.8 MW',
        change: '+2.4%',
        trend: 'up',
        icon: Zap,
        subIcon: '⚡'
    },
    {
        title: 'Active Fleet',
        value: '124 Units',
        change: '-1.2%',
        trend: 'down',
        icon: Bus,
        subIcon: '🚌'
    },
    {
        title: 'Grid Efficiency',
        value: '94.2%',
        change: '+0.8%',
        trend: 'up',
        icon: Activity,
        subIcon: '📈'
    },
    {
        title: 'Carbon Offset',
        value: '1,240 Tons',
        change: '+12%',
        trend: 'up',
        icon: Leaf,
        subIcon: '🌱'
    },
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 rounded-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <stat.icon className="w-24 h-24" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/5 rounded-xl text-eco-primary">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.trend === 'up' ? 'bg-eco-success/20 text-eco-success' : 'bg-eco-danger/20 text-eco-danger'
                                    }`}>
                                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {stat.change}
                                    <span className="ml-1 text-base">{stat.subIcon}</span>
                                </div>
                            </div>

                            <div className="text-slate-400 text-sm font-medium">{stat.title}</div>
                            <div className="text-2xl font-bold text-white mt-1">{stat.value}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-6 rounded-2xl"
                >
                    <h3 className="text-lg font-semibold text-slate-200 mb-6">City-wide Energy Consumption</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                />
                                <Area type="monotone" dataKey="energy" stroke="#10b981" fillOpacity={1} fill="url(#colorEnergy)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel p-6 rounded-2xl"
                >
                    <h3 className="text-lg font-semibold text-slate-200 mb-6">Transport vs Renewable Load</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorTransport" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorRenewable" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                />
                                <Area type="monotone" dataKey="transport" stackId="1" stroke="#3b82f6" fill="url(#colorTransport)" />
                                <Area type="monotone" dataKey="renewable" stackId="1" stroke="#8b5cf6" fill="url(#colorRenewable)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
