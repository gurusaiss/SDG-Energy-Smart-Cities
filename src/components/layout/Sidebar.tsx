
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Bus, Zap, Leaf } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Energy Optimization', path: '/energy', icon: Building2 },
    { label: 'Smart Transport', path: '/transport', icon: Bus },
    { label: 'Renewable Grid', path: '/renewables', icon: Zap },
];

export function Sidebar() {
    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 h-screen fixed left-0 top-0 flex flex-col z-10">
            <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                <div className="p-2 bg-eco-primary/20 rounded-lg">
                    <Leaf className="w-6 h-6 text-eco-primary" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-eco-primary to-eco-secondary bg-clip-text text-transparent">
                    EcoCity AI
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-eco-primary/10 text-eco-primary shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                            )
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="text-xs text-slate-400 mb-2">System Status</div>
                    <div className="flex items-center gap-2 text-sm font-medium text-eco-success">
                        <div className="w-2 h-2 rounded-full bg-eco-success animate-pulse" />
                        Online & Optimized
                    </div>
                </div>
            </div>
        </aside>
    );
}
