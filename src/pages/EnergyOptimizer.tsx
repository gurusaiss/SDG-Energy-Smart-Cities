import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveArray, useLiveMetric } from '../hooks/useLiveData';
import { AIService, type AIResponse } from '../services/ai';
import { TimeRangeSelector, type TimeRange } from '../components/ui/TimeRangeSelector';

const buildings = [
    { id: 1, name: 'Skyline Tower', type: 'Commercial', baseLoad: 4500, efficiency: 72 },
    { id: 2, name: 'Eco Plaza', type: 'Mixed Use', baseLoad: 2800, efficiency: 88 },
    { id: 3, name: 'Tech Hub', type: 'Office', baseLoad: 3200, efficiency: 65 },
    { id: 4, name: 'Green Valley Mall', type: 'Retail', baseLoad: 5100, efficiency: 58 },
];

export default function EnergyOptimizer() {
    const [selectedBuilding, setSelectedBuilding] = useState(buildings[0]);
    const [timeRange, setTimeRange] = useState<TimeRange>('Daily');
    const [analyzing, setAnalyzing] = useState(false);
    const [recommendation, setRecommendation] = useState<AIResponse | null>(null);

    // Different base values and volatility for Energy
    const liveUsage = useLiveArray(selectedBuilding.baseLoad, 200, timeRange);
    const currentLoad = useLiveMetric(selectedBuilding.baseLoad, 100);

    const handleAnalyze = async () => {
        setAnalyzing(true);
        setRecommendation(null);

        const result = await AIService.generateRecommendation(
            'energy',
            `Building: ${selectedBuilding.name}, Range: ${timeRange}, Load: ${currentLoad}kW`
        );

        setAnalyzing(false);
        setRecommendation(result);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Building List */}
            <div className="lg:col-span-1 space-y-4">
                <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-eco-primary" />
                    Building Portfolio
                </h2>
                <div className="space-y-3">
                    {buildings.map((building) => (
                        <div
                            key={building.id}
                            onClick={() => { setSelectedBuilding(building); setRecommendation(null); }}
                            className={`glass-card p-4 rounded-xl cursor-pointer ${selectedBuilding.id === building.id
                                ? 'bg-eco-primary/10 border-eco-primary shadow-[0_0_15px_rgba(251,191,36,0.1)]'
                                : 'hover:bg-slate-800/50'
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-semibold text-slate-200">{building.name}</div>
                                    <div className="text-sm text-slate-400">{building.type}</div>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-bold ${building.efficiency > 80 ? 'bg-eco-success/20 text-eco-success' :
                                    building.efficiency > 60 ? 'bg-eco-warning/20 text-eco-warning' :
                                        'bg-eco-danger/20 text-eco-danger'
                                    }`}>
                                    Score: {building.efficiency}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Analysis Area */}
            <div className="lg:col-span-2 space-y-6">
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                {selectedBuilding.name}
                                <span className="text-sm font-normal px-2 py-1 bg-slate-800 rounded-lg text-slate-400 border border-slate-700">
                                    Live Monitor
                                </span>
                            </h2>
                        </div>
                        <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
                    </div>

                    <div className="h-[300px] mb-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={liveUsage}>
                                <defs>
                                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 12 }} interval={0} />
                                <YAxis domain={['auto', 'auto']} stroke="#64748b" tickFormatter={(val) => `${val}kW`} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                    itemStyle={{ color: '#fbbf24' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#fbbf24"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorLoad)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-1">AI Optimization Engine</h3>
                            <p className="text-sm text-slate-400">Analyze {timeRange.toLowerCase()} patterns for efficiency</p>
                        </div>
                        <button
                            onClick={handleAnalyze}
                            disabled={analyzing}
                            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${analyzing
                                ? 'bg-slate-800 text-slate-400 cursor-wait'
                                : 'bg-gradient-to-r from-eco-primary to-eco-secondary text-slate-950 hover:opacity-90 hover:scale-105'
                                }`}
                        >
                            {analyzing ? (
                                <>
                                    <Sparkles className="w-5 h-5 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Run AI Audit
                                </>
                            )}
                        </button>
                    </div>

                    <AnimatePresence>
                        {recommendation && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mt-6 bg-slate-800/50 p-6 rounded-xl border border-eco-primary/30 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-eco-primary"></div>
                                <div className="flex items-start gap-4 relative z-10">
                                    <div className={`p-3 rounded-lg ${recommendation.impact === 'High' ? 'bg-eco-success/20 text-eco-success' :
                                        recommendation.impact === 'Medium' ? 'bg-eco-warning/20 text-eco-warning' :
                                            'bg-slate-700 text-slate-400'
                                        }`}>
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-lg font-bold text-white">Efficiency Recommendations</h4>
                                            <span className="text-eco-primary font-bold font-mono text-lg">
                                                -{recommendation.savings}
                                            </span>
                                        </div>

                                        <ul className="space-y-3">
                                            {recommendation.recommendations.map((rec, i) => (
                                                <li key={i} className="flex items-start gap-2 text-slate-300">
                                                    <ArrowRight className="w-4 h-4 text-eco-primary mt-1 shrink-0" />
                                                    <span>{rec}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-4 flex gap-3">
                                            <span className="text-xs font-bold px-2 py-1 rounded bg-slate-900 text-slate-400 border border-slate-700">
                                                Impact: {recommendation.impact}
                                            </span>
                                            <span className="text-xs font-bold px-2 py-1 rounded bg-slate-900 text-slate-400 border border-slate-700">
                                                Source: Gemini AI
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
