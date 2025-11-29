import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bus, MapPin, Clock, Users, Navigation, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveArray } from '../hooks/useLiveData';
import { AIService, type AIResponse } from '../services/ai';
import { TimeRangeSelector, type TimeRange } from '../components/ui/TimeRangeSelector';

const routes = [
    { id: 'R101', name: 'Downtown Loop', status: 'On Time', load: 85, vehicles: 4 },
    { id: 'R102', name: 'Tech Park Express', status: 'Delayed', load: 92, vehicles: 3 },
    { id: 'R103', name: 'Suburb Connector', status: 'On Time', load: 45, vehicles: 6 },
    { id: 'R104', name: 'Airport Shuttle', status: 'On Time', load: 60, vehicles: 2 },
];

export default function TransportManager() {
    const [selectedRoute, setSelectedRoute] = useState(routes[0]);
    const [timeRange, setTimeRange] = useState<TimeRange>('Weekly');
    const [optimizing, setOptimizing] = useState(false);
    const [recommendation, setRecommendation] = useState<AIResponse | null>(null);

    // Different base values (Load %) and volatility for Transport
    const liveLoad = useLiveArray(selectedRoute.load, 15, timeRange);

    const handleOptimize = async () => {
        setOptimizing(true);
        setRecommendation(null);

        const result = await AIService.generateRecommendation(
            'transport',
            `Route: ${selectedRoute.id}, Range: ${timeRange}, Status: ${selectedRoute.status}, Load: ${selectedRoute.load}%`
        );

        setOptimizing(false);
        setRecommendation(result);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Route List */}
            <div className="lg:col-span-1 space-y-4">
                <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
                    <Bus className="w-6 h-6 text-eco-secondary" />
                    Active Fleet
                </h2>
                <div className="space-y-3">
                    {routes.map((route) => (
                        <div
                            key={route.id}
                            onClick={() => { setSelectedRoute(route); setRecommendation(null); }}
                            className={`glass-card p-4 rounded-xl cursor-pointer ${selectedRoute.id === route.id
                                ? 'bg-eco-secondary/10 border-eco-secondary shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                                : 'hover:bg-slate-800/50'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="font-bold text-slate-200">{route.id}</div>
                                <div className={`px-2 py-0.5 rounded text-xs font-bold ${route.status === 'On Time' ? 'bg-eco-success/20 text-eco-success' : 'bg-eco-danger/20 text-eco-danger'
                                    }`}>
                                    {route.status}
                                </div>
                            </div>
                            <div className="text-sm text-slate-400 mb-3">{route.name}</div>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3" /> {route.load}% Load
                                </div>
                                <div className="flex items-center gap-1">
                                    <Bus className="w-3 h-3" /> {route.vehicles} Units
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Dashboard */}
            <div className="lg:col-span-2 space-y-6">
                {/* Map Visualizer */}
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group min-h-[300px]">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2613&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                    <div className="relative z-10 flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white">{selectedRoute.name}</h2>
                            <p className="text-slate-300 flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-eco-secondary" /> Live Tracking & Predictive Scheduling
                            </p>
                        </div>
                        <button
                            onClick={handleOptimize}
                            disabled={optimizing}
                            className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${optimizing
                                ? 'bg-slate-800 text-slate-400'
                                : 'bg-eco-secondary hover:bg-eco-secondary/90 text-white'
                                }`}
                        >
                            {optimizing ? <Navigation className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                            {optimizing ? 'Optimizing...' : 'Optimize Schedule'}
                        </button>
                    </div>

                    {/* Animated Map Simulation */}
                    <div className="relative h-[200px] w-full border border-white/10 rounded-xl bg-slate-950/40 backdrop-blur-sm overflow-hidden">
                        {/* Road Lines */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-700/50" />
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-eco-secondary to-transparent opacity-50 animate-pulse" />

                        {/* Moving Buses */}
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ x: -50 }}
                                animate={{ x: '120%' }}
                                transition={{
                                    duration: 8 + i * 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: i * 3
                                }}
                                className="absolute top-1/2 -mt-3 flex flex-col items-center"
                            >
                                <div className="p-1.5 bg-eco-secondary rounded-lg shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                    <Bus className="w-4 h-4 text-white" />
                                </div>
                                <div className="text-[10px] font-mono text-eco-secondary mt-1 bg-slate-900/80 px-1 rounded">
                                    Bus-{100 + i}
                                </div>
                            </motion.div>
                        ))}

                        {/* Stops */}
                        {[20, 50, 80].map((pos) => (
                            <div key={pos} className="absolute top-1/2 -mt-1.5 w-3 h-3 rounded-full bg-slate-500 border-2 border-slate-900" style={{ left: `${pos}%` }} />
                        ))}
                    </div>

                    <AnimatePresence>
                        {recommendation && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="mt-4 p-4 bg-slate-800/80 backdrop-blur-md border border-eco-secondary/30 rounded-xl"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-eco-secondary/20 rounded-lg text-eco-secondary">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-white">AI Schedule Optimization</h4>
                                            <span className="text-xs font-mono text-eco-secondary border border-eco-secondary/30 px-1.5 rounded">
                                                Savings: {recommendation.savings}
                                            </span>
                                        </div>
                                        <ul className="space-y-2">
                                            {recommendation.recommendations.map((rec, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                                    <ArrowRight className="w-3 h-3 text-eco-secondary mt-1 shrink-0" />
                                                    {rec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Predictive Load Chart */}
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Clock className="w-5 h-5 text-slate-400" />
                            Passenger Load & Prediction
                        </h3>
                        <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
                    </div>

                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={liveLoad}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 12 }} interval={0} />
                                <YAxis stroke="#64748b" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                    itemStyle={{ color: '#3b82f6' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 6, fill: '#3b82f6' }}
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
