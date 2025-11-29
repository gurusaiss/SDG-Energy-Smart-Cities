import { motion } from 'framer-motion';

export type TimeRange = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

interface TimeRangeSelectorProps {
    selected: TimeRange;
    onChange: (range: TimeRange) => void;
}

export function TimeRangeSelector({ selected, onChange }: TimeRangeSelectorProps) {
    const ranges: TimeRange[] = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

    return (
        <div className="flex bg-slate-900/50 p-1 rounded-lg border border-white/5">
            {ranges.map((range) => (
                <button
                    key={range}
                    onClick={() => onChange(range)}
                    className={`relative px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${selected === range ? 'text-slate-950' : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    {selected === range && (
                        <motion.div
                            layoutId="range-selector"
                            className="absolute inset-0 bg-eco-primary rounded-md"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{range}</span>
                </button>
            ))}
        </div>
    );
}
