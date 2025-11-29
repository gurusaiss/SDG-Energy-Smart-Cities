# 🌿 EcoCity AI Nexus

> **A Next-Generation Smart City Operations Dashboard powered by AI.**

![EcoCity Dashboard Banner](https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2670&auto=format&fit=crop)

## 🌍 What is it?
**EcoCity AI Nexus** is a centralized command center designed for modern urban planners and sustainability officers. It aggregates real-time data from three critical city sectors—**Energy, Transportation, and Power Grid**—into a single, cohesive interface.

By leveraging Artificial Intelligence, it doesn't just display data; it **analyzes** it to provide actionable, context-aware recommendations that reduce carbon footprints, optimize costs, and improve the quality of urban life.

## 🚀 What It Does
The platform solves the problem of siloed city data by:
1.  **Monitoring** live metrics (kW usage, passenger loads, grid frequency) in real-time.
2.  **Visualizing** complex data trends across multiple timeframes (Daily, Weekly, Monthly, Yearly).
3.  **Optimizing** operations using an AI engine that suggests specific interventions for specific assets (e.g., a specific building or bus route).

---

## ✨ Key Features

### 1. ⚡ Energy Optimization Module
*   **Building Portfolio**: Manage distinct assets like *Skyline Tower* (Commercial), *Eco Plaza* (Mixed Use), and *Green Valley Mall* (Retail).
*   **Live Monitoring**: Real-time energy consumption graphs with dynamic time-range labels.
*   **Context-Aware AI**:
    *   *Skyline Tower*: Suggests high-rise specific fixes (e.g., wind cooling).
    *   *Green Valley Mall*: Suggests retail-specific fixes (e.g., food court HVAC).

### 2. 🚌 Smart Transport Manager
*   **Active Fleet Tracking**: Monitor specific bus routes (R101 Downtown, R102 Express, etc.).
*   **Live Map Simulation**: Visual representation of fleet movement and congestion.
*   **Predictive Scheduling**:
    *   *R101*: AI suggests lunch-rush frequency adjustments.
    *   *R104 (Airport)*: AI suggests luggage rack upgrades and flight coordination.

### 3. 🔋 Renewable Grid Balancer
*   **Grid Stability**: Monitor frequency (Hz) and battery storage levels in real-time.
*   **Supply vs. Demand**: Interactive area charts showing load forecasts.
*   **AI Load Balancing**: Automated protocols for peak shaving, battery discharge, and renewable curtailment to prevent blackouts.

### 4. 📊 Advanced Visualization
*   **Dynamic Time Ranges**:
    *   **Daily**: View data by specific dates (Mon, Tue, Wed...).
    *   **Weekly**: View trends by Week 1, Week 2, etc.
    *   **Monthly/Yearly**: Long-term trend analysis.
*   **Glassmorphism UI**: A modern, sleek interface designed for high-tech command centers.

---

## 🛠️ Tech Stack
*   **Frontend**: React 18 + Vite (Fast HMR)
*   **Language**: TypeScript (Type safety)
*   **Styling**: TailwindCSS v4 (Custom "Eco" theme + Glassmorphism)
*   **Charts**: Recharts (Responsive, animated visualizations)
*   **Animations**: Framer Motion (Smooth transitions and micro-interactions)
*   **AI Engine**: Google Gemini API (with robust context-aware fallback simulation)

---

## 🏁 Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/YOUR_USERNAME/EcoCity-AI-Nexus.git
    cd EcoCity-AI-Nexus
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open the dashboard**
    Navigate to `http://localhost:5173` in your browser.

---

## 🤖 AI Configuration
The project comes with a **Smart Mock Engine** enabled by default, which provides specific, logical recommendations for every building and route without needing an API key.

To use real **Google Gemini AI**:
1.  Click your profile icon in the top right.
2.  (Optional) Implement the API key input in the settings modal (currently hidden for demo safety).

---

*Built with 💚 for a sustainable future.*
