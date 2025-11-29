export interface AIResponse {
    recommendations: string[];
    impact: 'High' | 'Medium' | 'Low';
    savings: string;
}

const SPECIFIC_RESPONSES: Record<string, Record<string, AIResponse>> = {
    energy: {
        'Skyline Tower': {
            recommendations: [
                "Optimize HVAC setpoints for high-rise wind cooling effect.",
                "Implement smart dimming for lobby lighting during non-peak hours.",
                "Upgrade server room cooling with hot/cold aisle containment.",
                "Install regenerative braking on high-speed elevators."
            ],
            impact: "High",
            savings: "24%"
        },
        'Eco Plaza': {
            recommendations: [
                "Maximize solar self-consumption for retail units.",
                "Schedule residential heating pre-heating for off-peak rates.",
                "Implement greywater recycling pumps for landscaping irrigation.",
                "Optimize heat pump efficiency for mixed-use zones."
            ],
            impact: "Medium",
            savings: "18%"
        },
        'Tech Hub': {
            recommendations: [
                "Reduce workstation standby power during lunch hours.",
                "Optimize data center thermal management with AI cooling.",
                "Deploy smart blinds to reduce screen glare and cooling load.",
                "Schedule EV charging stations for solar peak alignment."
            ],
            impact: "High",
            savings: "30%"
        },
        'Green Valley Mall': {
            recommendations: [
                "Adjust food court HVAC dynamically based on real-time occupancy.",
                "Optimize parking lot lighting schedule with motion sensors.",
                "Pre-cool atrium mass before opening hours (thermal battery).",
                "Cycle refrigeration units to avoid peak demand charges."
            ],
            impact: "High",
            savings: "21%"
        }
    },
    transport: {
        'R101': {
            recommendations: [
                "Increase frequency during lunch rush (12pm-2pm) to reduce crowding.",
                "Deploy electric buses for zero-emission downtown zone compliance.",
                "Sync schedule with traffic lights at Main St intersection.",
                "Add temporary stop at City Hall for event traffic."
            ],
            impact: "High",
            savings: "12 min wait"
        },
        'R102': {
            recommendations: [
                "Add express service for morning commute (7am-9am).",
                "Upsize vehicles to double-decker for capacity management.",
                "Optimize stops for Tech Campus entry points.",
                "Implement dynamic routing based on highway congestion."
            ],
            impact: "High",
            savings: "15% faster"
        },
        'R103': {
            recommendations: [
                "Adjust timing to meet incoming commuter trains at Station A.",
                "Deploy smaller shuttles for off-peak efficiency.",
                "Route optimization for school drop-off zones.",
                "Reduce idle time at terminal by 5 minutes."
            ],
            impact: "Medium",
            savings: "8 min trip"
        },
        'R104': {
            recommendations: [
                "Ensure luggage racks are available on next dispatch.",
                "Coordinate departure with flight arrival blocks.",
                "Implement priority lane usage on highway access.",
                "Increase frequency during holiday travel peak."
            ],
            impact: "High",
            savings: "On-time"
        }
    }
};

const GENERIC_RESPONSES: Record<string, AIResponse[]> = {
    energy: [
        {
            recommendations: [
                "Install smart glass windows to dynamically adjust tint.",
                "Implement predictive HVAC scheduling.",
                "Upgrade to ultra-efficient LED lighting.",
                "Seal building envelope gaps."
            ],
            impact: "Medium",
            savings: "15%"
        }
    ],
    transport: [
        {
            recommendations: [
                "Optimize fleet distribution based on demand.",
                "Reduce idle times at terminal stops.",
                "Implement predictive maintenance scheduling."
            ],
            impact: "Medium",
            savings: "5%"
        }
    ],
    grid: [
        {
            recommendations: [
                "Discharge 500MW from battery reserves to stabilize frequency.",
                "Curtail wind farm output by 10% to prevent oversupply.",
                "Activate demand response protocols for industrial zones.",
                "Ramp up hydro generation to meet evening peak."
            ],
            impact: "High",
            savings: "Grid Stable"
        },
        {
            recommendations: [
                "Initiate voltage support from solar inverters.",
                "Reduce import from external interconnector.",
                "Schedule maintenance for Peaker Plant B.",
                "Optimize battery charging cycle."
            ],
            impact: "Medium",
            savings: "Balance OK"
        }
    ]
};

export class AIService {
    private static apiKey: string | null = localStorage.getItem('gemini_api_key');

    static setApiKey(key: string) {
        this.apiKey = key;
        localStorage.setItem('gemini_api_key', key);
    }

    static getApiKey() {
        return this.apiKey;
    }

    static async generateRecommendation(context: 'energy' | 'transport' | 'grid', prompt: string): Promise<AIResponse> {
        if (this.apiKey) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: `You are an expert AI for smart cities. Context: ${context}. Data: ${prompt}. Provide 3-5 specific, distinct recommendations as a JSON array of strings, impact (High/Medium/Low), and quantified savings. Format as JSON: { "recommendations": ["rec1", "rec2", ...], "impact": "...", "savings": "..." }` }] }]
                    })
                });

                const data = await response.json();
                const text = data.candidates[0].content.parts[0].text;
                const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
                return JSON.parse(jsonStr);
            } catch (error) {
                console.error("AI API Error, falling back to mock:", error);
            }
        }

        // Advanced Mock Logic
        if (context === 'energy') {
            if (prompt.includes('Skyline Tower')) return SPECIFIC_RESPONSES.energy['Skyline Tower'];
            if (prompt.includes('Eco Plaza')) return SPECIFIC_RESPONSES.energy['Eco Plaza'];
            if (prompt.includes('Tech Hub')) return SPECIFIC_RESPONSES.energy['Tech Hub'];
            if (prompt.includes('Green Valley Mall')) return SPECIFIC_RESPONSES.energy['Green Valley Mall'];
        }

        if (context === 'transport') {
            if (prompt.includes('R101')) return SPECIFIC_RESPONSES.transport['R101'];
            if (prompt.includes('R102')) return SPECIFIC_RESPONSES.transport['R102'];
            if (prompt.includes('R103')) return SPECIFIC_RESPONSES.transport['R103'];
            if (prompt.includes('R104')) return SPECIFIC_RESPONSES.transport['R104'];
        }

        // Fallback to generic random
        const responses = GENERIC_RESPONSES[context];
        return responses[Math.floor(Math.random() * responses.length)];
    }
}
