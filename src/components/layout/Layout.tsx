
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-eco-primary/30">
            <Sidebar />
            <div className="pl-64">
                <Header />
                <main className="p-6 max-w-7xl mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
