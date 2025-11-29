import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Sun, Wind, Battery, Activity, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveArray, useLiveMetric } from '../hooks/useLiveData';
import { AIService, type AIResponse } from '../services/ai';
import { TimeRangeSelector, type TimeRange } from '../components/ui/TimeRangeSelector';

export default function GridBalancer() {
    const [timeRange, setTimeRange] = useState<TimeRange>('Monthly');
    const [balancing, setBalancing] = useState(false);
    const [recommendation, setRecommendation] = useState<AIResponse | null>(null);

    // Different base values (MW) and volatility for Grid
    const liveDemand = useLiveArray(850, 50, timeRange);
    const frequency = useLiveMetric(50.00, 0.05, 1000);
    const batteryLevel = useLiveMetric(78, 0.1, 5000);

    const handleBalance = async () => {
        setBalancing(true);
        setRecommendation(null);

        const result = await AIService.generateRecommendation(
            'grid',
            `Range: ${timeRange}, Frequency: ${frequency}Hz, Demand: ${liveDemand[liveDemand.length - 1].value}MW, Battery: ${batteryLevel}%`
        );

        setBalancing(false);
        setRecommendation(result);
    };

    return (
        <div className="space-y-6">
            {/* Grid Status Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-eco-primary/20 rounded-full text-eco-primary">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-sm text-slate-400">Grid Frequency</div>
                        <div className={`text-xl font-bold font-mono ${Math.abs(frequency - 50) > 0.1 ? 'text-eco-warning' : 'text-eco-success'
                            }`}>
                            {frequency.toFixed(3)} Hz
                        </div>
                    </div>
                </div>

                <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-eco-secondary/20 rounded-full text-eco-secondary">
                        <Battery className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-sm text-slate-400">Storage Level</div>
                        <div className="text-xl font-bold text-slate-200">{batteryLevel}%</div>
                    </div>
                </div>

                <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/20 rounded-full text-yellow-500">
                        <Sun className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-sm text-slate-400">Solar Output</div>
                        <div className="text-xl font-bold text-slate-200">420 MW</div>
                    </div>
                </div>

                <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/20 rounded-full text-cyan-500">
                        <Wind className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-sm text-slate-400">Wind Output</div>
                        <div className="text-xl font-bold text-slate-200">315 MW</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Zap className="w-5 h-5 text-eco-primary" />
                            Supply vs Demand Forecast
                        </h2>
                        <div className="flex items-center gap-4">
                            <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
                            <button
                                onClick={handleBalance}
                                disabled={balancing}
                                className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg ${balancing
                                    ? 'bg-slate-800 text-slate-400'
                                    : 'bg-eco-primary hover:bg-eco-primary/90 text-slate-900'
                                    }`}
                            >
                                {balancing ? <Sparkles className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                {balancing ? 'Balancing...' : 'Run AI Load Balancer'}
                            </button>
                        </div>
                    </div>

                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={liveDemand}>
                                <defs>
                                    <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 12 }} interval={0} />
                                <YAxis domain={['auto', 'auto']} stroke="#64748b" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#ef4444"
                                    fillOpacity={1}
                                    fill="url(#colorDemand)"
                                    name="Grid Demand"
                                    isAnimationActive={false}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <AnimatePresence>
                        {recommendation && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 border-t border-white/10 pt-6"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-eco-success/20 rounded-full text-eco-success mt-1">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white text-lg mb-2">Grid Stability Action Plan</h4>
                                        <ul className="space-y-2 mb-3">
                                            {recommendation.recommendations.map((rec, i) => (
                                                <li key={i} className="flex items-start gap-2 text-slate-300">
                                                    <ArrowRight className="w-4 h-4 text-eco-primary mt-1 shrink-0" />
                                                    <span>{rec}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex gap-4">
                                            <div className="text-xs font-mono text-eco-primary border border-eco-primary/30 px-2 py-1 rounded">
                                                Result: {recommendation.savings}
                                            </div>
                                            <div className="text-xs font-mono text-slate-400 border border-slate-700 px-2 py-1 rounded">
                                                Impact: {recommendation.impact}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Battery Storage */}
                <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-eco-secondary/10 to-transparent" />
                    <h3 className="text-lg font-bold text-white mb-8 relative z-10">Storage Capacity</h3>

                    <div className="relative w-32 h-64 bg-slate-900 rounded-2xl border-4 border-slate-700 overflow-hidden flex flex-col justify-end">
                        <motion.div
                            className="w-full bg-gradient-to-t from-eco-secondary to-cyan-400"
                            animate={{ height: `${batteryLevel}%` }}
                            transition={{ type: "spring", stiffness: 50 }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-2xl font-bold text-white drop-shadow-md">{batteryLevel}%</div>
                        </div>
                    </div>

                    <div className="mt-6 text-center relative z-10">
                        <div className="text-sm text-slate-400">Discharge Rate</div>
                        <div className="text-lg font-bold text-eco-warning">-12 MW/h</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
