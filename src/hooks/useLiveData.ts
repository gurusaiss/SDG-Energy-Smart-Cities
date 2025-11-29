import { useState, useEffect } from 'react';

export function useLiveMetric(baseValue: number, volatility: number = 5, interval: number = 2000) {
    const [value, setValue] = useState(baseValue);

    useEffect(() => {
        const timer = setInterval(() => {
            setValue(prev => {
                const change = (Math.random() - 0.5) * volatility;
                return Number((prev + change).toFixed(1));
            });
        }, interval);

        return () => clearInterval(timer);
    }, [baseValue, volatility, interval]);

    return value;
}

type TimeRange = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export function useLiveArray(baseValue: number, volatility: number, range: TimeRange) {
    const getLabels = (r: TimeRange) => {
        switch (r) {
            case 'Daily': return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            case 'Weekly': return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            case 'Monthly': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            case 'Yearly': return ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
            default: return [];
        }
    };

    const [data, setData] = useState(() => {
        const labels = getLabels(range);
        return labels.map(label => ({
            time: label,
            value: baseValue + (Math.random() - 0.5) * volatility * 5 // Initial spread
        }));
    });

    // Reset data when range changes
    useEffect(() => {
        const labels = getLabels(range);
        setData(labels.map(label => ({
            time: label,
            value: baseValue + (Math.random() - 0.5) * volatility * 5
        })));
    }, [range, baseValue, volatility]);

    // Animate values
    useEffect(() => {
        const timer = setInterval(() => {
            setData(prev => prev.map(item => ({
                ...item,
                value: Number((item.value + (Math.random() - 0.5) * volatility).toFixed(1))
            })));
        }, 2000); // Slower update for chart stability

        return () => clearInterval(timer);
    }, [volatility]);

    return data;
}
