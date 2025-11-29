import { useState } from 'react';
import { X, Key, Check, ShieldCheck } from 'lucide-react';
import { AIService } from '../../services/ai';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [apiKey, setApiKey] = useState(AIService.getApiKey() || '');
    const [saved, setSaved] = useState(false);

    if (!isOpen) return null;

    const handleSave = () => {
        AIService.setApiKey(apiKey);
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
            onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="glass-panel w-full max-w-md p-6 rounded-2xl relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-eco-primary/20 rounded-xl">
                        <ShieldCheck className="w-6 h-6 text-eco-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">AI Configuration</h2>
                        <p className="text-sm text-slate-400">Power your city with Google Gemini</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Google Gemini API Key
                        </label>
                        <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="Enter your API key..."
                                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-slate-200 focus:ring-2 focus:ring-eco-primary/50 focus:border-eco-primary outline-none transition-all"
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            Leave empty to use the built-in advanced simulation engine.
                        </p>
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full py-3 bg-gradient-to-r from-eco-primary to-eco-secondary rounded-xl font-bold text-slate-950 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        {saved ? <Check className="w-5 h-5" /> : null}
                        {saved ? 'Saved!' : 'Save Configuration'}
                    </button>
                </div>
            </div>
        </div>
    );
}
