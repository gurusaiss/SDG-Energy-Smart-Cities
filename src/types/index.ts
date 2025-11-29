export interface NavItem {
    label: string;
    path: string;
    icon: React.ElementType;
}

export interface MetricCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon: React.ElementType;
    color?: string;
}
