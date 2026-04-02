import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

// Real Oil Ratio Data
const OIL_RATIO_STANDARD = [
  { gravity: 1100, NP: 565, Waxol: 575, Cl2: 0.70, HCl: 1.05 },
  { gravity: 1170, NP: 525, Waxol: 535, Cl2: 0.85, HCl: 1.275 },
  { gravity: 1190, NP: 515, Waxol: 525, Cl2: 0.90, HCl: 1.35 },
  { gravity: 1200, NP: 510, Waxol: 520, Cl2: 0.950, HCl: 1.425 },
  { gravity: 1250, NP: 480, Waxol: 490, Cl2: 1.000, HCl: 1.500 },
  { gravity: 1280, NP: 452, Waxol: 462, Cl2: 1.020, HCl: 1.530 },
  { gravity: 1290, NP: 450, Waxol: 460, Cl2: 1.050, HCl: 1.575 },
  { gravity: 1300, NP: 448, Waxol: 458, Cl2: 1.100, HCl: 1.650 },
  { gravity: 1320, NP: 433, Waxol: 443, Cl2: 1.120, HCl: 1.680 },
  { gravity: 1330, NP: 428, Waxol: 438, Cl2: 1.150, HCl: 1.725 },
  { gravity: 1340, NP: 425, Waxol: 435, Cl2: 1.200, HCl: 1.800 },
  { gravity: 1350, NP: 420, Waxol: 430, Cl2: 1.220, HCl: 1.830 },
  { gravity: 1360, NP: 415, Waxol: 425, Cl2: 1.240, HCl: 1.860 },
  { gravity: 1370, NP: 405, Waxol: 415, Cl2: 1.260, HCl: 1.890 },
  { gravity: 1380, NP: 400, Waxol: 410, Cl2: 1.280, HCl: 1.920 },
  { gravity: 1390, NP: 395, Waxol: 405, Cl2: 1.290, HCl: 1.935 },
  { gravity: 1400, NP: 390, Waxol: 400, Cl2: 1.300, HCl: 1.950 },
  { gravity: 1410, NP: 388, Waxol: null, Cl2: 1.320, HCl: 1.980 },
  { gravity: 1420, NP: 383, Waxol: null, Cl2: 1.370, HCl: 2.055 },
  { gravity: 1430, NP: 375, Waxol: null, Cl2: 1.380, HCl: 2.070 },
  { gravity: 1440, NP: 370, Waxol: null, Cl2: 1.390, HCl: 2.085 },
  { gravity: 1450, NP: 365, Waxol: null, Cl2: 1.400, HCl: 2.100 },
  { gravity: 1460, NP: 360, Waxol: null, Cl2: 1.450, HCl: 2.175 },
  { gravity: 1480, NP: 345, Waxol: null, Cl2: 1.550, HCl: 2.325 },
  { gravity: 1490, NP: 340, Waxol: null, Cl2: 1.600, HCl: 2.400 },
  { gravity: 1500, NP: 335, Waxol: null, Cl2: 1.650, HCl: 2.475 },
];

const OIL_RATIO_MANAV_KG = [
  { gravity: 1100, NP: 571, Waxol: 581, Cl2: 0.680, HCl: 1.020 },
  { gravity: 1170, NP: 531, Waxol: 541, Cl2: 0.820, HCl: 1.230 },
  { gravity: 1190, NP: 521, Waxol: 531, Cl2: 0.870, HCl: 1.310 },
  { gravity: 1200, NP: 516, Waxol: 526, Cl2: 0.920, HCl: 1.380 },
  { gravity: 1250, NP: 485, Waxol: 495, Cl2: 0.970, HCl: 1.460 },
  { gravity: 1280, NP: 457, Waxol: 467, Cl2: 0.990, HCl: 1.490 },
  { gravity: 1300, NP: 453, Waxol: 463, Cl2: 1.080, HCl: 1.620 },
  { gravity: 1350, NP: 425, Waxol: 435, Cl2: 1.180, HCl: 1.770 },
  { gravity: 1400, NP: 394, Waxol: 404, Cl2: 1.250, HCl: 1.880 },
  { gravity: 1500, NP: 339, Waxol: null, Cl2: 1.600, HCl: 2.400 },
];

const MONTHLY_PRODUCTION = [
  { month: 'Jan', CPW: 7500, HCl: 15000, Epoxy: 1200, AlCl3: 900 },
  { month: 'Feb', CPW: 7800, HCl: 15600, Epoxy: 1250, AlCl3: 950 },
  { month: 'Mar', CPW: 8100, HCl: 16200, Epoxy: 1280, AlCl3: 1000 },
  { month: 'Apr', CPW: 7200, HCl: 14400, Epoxy: 1100, AlCl3: 850 },
  { month: 'May', CPW: 8400, HCl: 16800, Epoxy: 1350, AlCl3: 1050 },
  { month: 'Jun', CPW: 8200, HCl: 16400, Epoxy: 1300, AlCl3: 1020 },
  { month: 'Jul', CPW: 7900, HCl: 15800, Epoxy: 1270, AlCl3: 980 },
  { month: 'Aug', CPW: 7600, HCl: 15200, Epoxy: 1210, AlCl3: 920 },
  { month: 'Sep', CPW: 8300, HCl: 16600, Epoxy: 1320, AlCl3: 1030 },
  { month: 'Oct', CPW: 8500, HCl: 17000, Epoxy: 1380, AlCl3: 1080 },
  { month: 'Nov', CPW: 8200, HCl: 16400, Epoxy: 1300, AlCl3: 1020 },
  { month: 'Dec', CPW: 7800, HCl: 15600, Epoxy: 1250, AlCl3: 950 },
];

const SALES_FORECAST = [
  { month: 'Jan', actual: 7200, forecast: 7200 },
  { month: 'Feb', actual: 7800, forecast: 7800 },
  { month: 'Mar', actual: 8100, forecast: 8100 },
  { month: 'Apr', actual: 7500, forecast: 7600 },
  { month: 'May', actual: null, forecast: 8200 },
  { month: 'Jun', actual: null, forecast: 8400 },
  { month: 'Jul', actual: null, forecast: 8100 },
  { month: 'Aug', actual: null, forecast: 7900 },
  { month: 'Sep', actual: null, forecast: 8500 },
  { month: 'Oct', actual: null, forecast: 8700 },
  { month: 'Nov', actual: null, forecast: 8300 },
  { month: 'Dec', actual: null, forecast: 8000 },
];

const BATCH_YIELD_DATA = [
  { batchId: 'BTC-001', product: 'CPW-1200', expected: 510, actual: 515, variance: 1.0, status: 'within' },
  { batchId: 'BTC-002', product: 'CPW-1300', expected: 448, actual: 445, variance: -0.7, status: 'within' },
  { batchId: 'BTC-003', product: 'CPW-1350', expected: 420, actual: 412, variance: -1.9, status: 'outside' },
  { batchId: 'BTC-004', product: 'CPW-1400', expected: 390, actual: 392, variance: 0.5, status: 'within' },
  { batchId: 'BTC-005', product: 'CPW-1250', expected: 480, actual: 485, variance: 1.0, status: 'within' },
  { batchId: 'BTC-006', product: 'CPW-1280', expected: 452, actual: 440, variance: -2.7, status: 'outside' },
  { batchId: 'BTC-007', product: 'CPW-1190', expected: 515, actual: 520, variance: 1.0, status: 'within' },
  { batchId: 'BTC-008', product: 'CPW-1100', expected: 565, actual: 570, variance: 0.9, status: 'within' },
];

const CUSTOMERS = [
  { id: 1, name: 'Bokaro Steel Plant', outstanding: 2840000, collected: 1200000, days: 45, status: 'at-risk' },
  { id: 2, name: 'NALCO Limited', outstanding: 1650000, collected: 900000, days: 28, status: 'good' },
  { id: 3, name: 'Sigma Organics', outstanding: 1320000, collected: 750000, days: 35, status: 'good' },
  { id: 4, name: 'Jupiter Chemicals', outstanding: 980000, collected: 580000, days: 52, status: 'at-risk' },
  { id: 5, name: 'Hyco Industries', outstanding: 890000, collected: 450000, days: 18, status: 'good' },
];

const AGING_DATA = [
  { range: '0-30 days', amount: 3200000, count: 18 },
  { range: '31-60 days', amount: 2150000, count: 12 },
  { range: '61-90 days', amount: 1680000, count: 8 },
  { range: '90+ days', amount: 1050000, count: 5 },
];

const PRODUCT_BREAKDOWN = [
  { name: 'CPW', value: 8200, color: '#7B2FBE' },
  { name: 'HCl', value: 16400, color: '#C084FC' },
  { name: 'Epoxy', value: 1300, color: '#6D28D9' },
  { name: 'AlCl3', value: 1000, color: '#A78BFA' },
];

const StatCard = ({ label, value, subtext, trend, icon: Icon }) => (
  <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-700 rounded-lg p-4 hover:border-purple-500/50 transition-colors">
    <div className="flex justify-between items-start mb-2">
      <span className="text-slate-400 text-sm font-medium">{label}</span>
      {Icon && <Icon className="w-4 h-4 text-purple-400" />}
    </div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    {subtext && <div className="text-xs text-slate-500">{subtext}</div>}
    {trend && (
      <div className={`text-xs mt-2 flex items-center gap-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
        <TrendingUp className="w-3 h-3" />
        {trend > 0 ? '+' : ''}{trend}%
      </div>
    )}
  </div>
);

const TabButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
      active
        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
    }`}
  >
    {label}
  </button>
);

export default function SuntekDashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedGravity, setSelectedGravity] = useState(1200);
  const [compareMode, setCompareMode] = useState(false);

  const currentStandard = OIL_RATIO_STANDARD.find(d => d.gravity === selectedGravity);
  const currentManavKG = OIL_RATIO_MANAV_KG.find(d => d.gravity === selectedGravity);

  const tabs = [
    { label: 'Oil Ratio Intelligence', id: 0 },
    { label: 'Production Overview', id: 1 },
    { label: 'Payment & Collections', id: 2 },
    { label: 'Sales Forecasting', id: 3 },
    { label: 'Yield Control', id: 4 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-gradient-to-r from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-white mb-2">SUNTEK GROUP â Manufacturing Intelligence Platform</h1>
          <div className="flex gap-4 text-sm text-slate-400 flex-wrap">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              DEMO â Built with your actual data
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Powered by CaratSense
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-800 bg-slate-900/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              label={tab.label}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab 0: Oil Ratio Intelligence */}
        {activeTab === 0 && (
          <div className="space-y-6">
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                Gravity-Based Oil Ratio Analysis
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Select API Gravity: {selectedGravity}
                  </label>
                  <input
                    type="range"
                    min="1100"
                    max="1500"
                    step="10"
                    value={selectedGravity}
                    onChange={(e) => setSelectedGravity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>1100</span>
                    <span>1500</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="compare"
                    checked={compareMode}
                    onChange={(e) => setCompareMode(e.target.checked)}
                    className="w-4 h-4 bg-slate-700 border border-slate-600 rounded accent-purple-600 cursor-pointer"
                  />
                  <label htmlFor="compare" className="text-sm text-slate-300 cursor-pointer">
                    Compare with Manav & KG Plant (Feb actual data)
                  </label>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard
                label="Neutral Point (NP)"
                value={currentStandard?.NP || 0}
                subtext={compareMode ? `Manav&KG: ${currentManavKG?.NP || 'N/A'}` : 'Yield parameter'}
                trend={compareMode && currentManavKG ? ((currentManavKG.NP - currentStandard.NP) / currentStandard.NP * 100).toFixed(1) : null}
              />
              <StatCard
                label="Waxol Content"
                value={currentStandard?.Waxol || 'N/A'}
                subtext={compareMode && currentManavKG?.Waxol ? `Manav&KG: ${currentManavKG.Waxol}` : 'Optional parameter'}
                trend={compareMode && currentManavKG?.Waxol ? ((currentManavKG.Waxol - currentStandard.Waxol) / currentStandard.Waxol * 100).toFixed(1) : null}
              />
              <StatCard
                label="Cl2 Consumption"
                value={`${currentStandard?.Cl2 || 0} kg/cp`}
                subtext={compareMode ? `Manav&KG: ${currentManavKG?.Cl2 || 'N/A'} kg/cp` : 'Per kg chlorinated paraffin'}
                trend={compareMode && currentManavKG ? ((currentManavKG.Cl2 - currentStandard.Cl2) / currentStandard.Cl2 * 100).toFixed(1) : null}
              />
              <StatCard
                label="HCl Generation"
                value={`${currentStandard?.HCl || 0} kg/cp`}
                subtext={compareMode ? `Manav&KG: ${currentManavKG?.HCl || 'N/A'} kg/cp` : 'Per kg chlorinated paraffin'}
                trend={compareMode && currentManavKG ? ((currentManavKG.HCl - currentStandard.HCl) / currentStandard.HCl * 100).toFixed(1) : null}
              />
            </div>

            {/* Yield Curves Chart */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Yield Curves (NP & Waxol)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={compareMode ? OIL_RATIO_MANAV_KG : OIL_RATIO_STANDARD}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="gravity" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '8px' }}
                    labelStyle={{ color: '#E5E7EB' }}
                  />
                  <Legend wrapperStyle={{ color: '#D1D5DB' }} />
                  <Line
                    type="monotone"
                    dataKey="NP"
                    stroke="#7B2FBE"
                    dot={false}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="Waxol"
                    stroke="#C084FC"
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Chemical Consumption Chart */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Chemical Consumption Curve</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={compareMode ? OIL_RATIO_MANAV_KG : OIL_RATIO_STANDARD}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="gravity" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '8px' }}
                    labelStyle={{ color: '#E5E7EB' }}
                  />
                  <Legend wrapperStyle={{ color: '#D1D5DB' }} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="Cl2"
                    stroke="#7B2FBE"
                    dot={false}
                    strokeWidth={2}
                    name="Cl2 Consumption"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="HCl"
                    stroke="#C084FC"
                    dot={false}
                    strokeWidth={2}
                    name="HCl Generation"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Variance Table */}
            {compareMode && (
              <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-400" />
                  Variance Analysis: Standard vs Manav & KG
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-300">Gravity</th>
                        <th className="text-right py-3 px-4 text-slate-300">NP Variance</th>
                        <th className="text-right py-3 px-4 text-slate-300">Waxol Variance</th>
                        <th className="text-right py-3 px-4 text-slate-300">Cl2 Variance</th>
                        <th className="text-right py-3 px-4 text-slate-300">HCl Variance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {OIL_RATIO_STANDARD.slice(0, 8).map((std, idx) => {
                        const mgkg = OIL_RATIO_MANAV_KG.find(d => d.gravity === std.gravity);
                        return (
                          <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/20">
                            <td className="py-3 px-4 font-medium">{std.gravity}</td>
                            <td className="text-right py-3 px-4">
                              <span className={mgkg && mgkg.NP > std.NP ? 'text-green-400' : 'text-red-400'}>
                                {((mgkg.NP - std.NP) / std.NP * 100).toFixed(1)}%
                              </span>
                            </td>
                            <td className="text-right py-3 px-4">
                              <span className={mgkg?.Waxol && mgkg.Waxol > std.Waxol ? 'text-green-400' : 'text-red-400'}>
                                {mgkg?.Waxol ? `+$x((mgkg.Waxol - std.Waxol) / std.Waxol * 100).toFixed(1)}%` : 'N/A'}
                              </span>
                            </td>
                            <td className="text-right py-3 px-4">
                              <span className={mgkg && mgkg.Cl2 < std.Cl2 ? 'text-green-400' : 'text-red-400'}>
                                {((mgkg.Cl2 - std.Cl2) / std.Cl2 * 100).toFixed(1)}%
                              </span>
                            </td>
                            <td className="text-right py-3 px-4">
                              <span className={mgkg && mgkg.HCl < std.HCl ? 'text-green-400' : 'text-red-400'}>
                              {((mgkg.HCl - std.HCl) / std.HCl * 100).toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 1: Production Overview */}
        {activeTab === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard
                label="Annual CPW Capacity"
                value="90,000"
                subtext="MT/year"
                trend={8.5}
                icon={TrendingUp}
              />
              <StatCard
                label="Annual HCl Capacity"
                value="180,000"
                subtext="MT/year"
                trend={6.2}
                icon={TrendingUp}
              />
              <StatCard
                label="YTD Production (CPW)"
                value="31,800"
                subtext="MT (Apr)"
                trend={5.3}
                icon={TrendingUp}
              />
              <StatCard
                label="Capacity Utilization"
                value="94.1%"
                subtext="Current"
                trend={2.1}
                icon={TrendingUp}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Production */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Production (All Products)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={MONTHLY_PRODUCTION}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '8px' }}
                      labelStyle={{ color: '#E5E7EB' }}
                    />
                    <Bar dataKey="CPW" fill="#7B2FBE" name="CPW" />
                    <Bar dataKey="HCl" fill="#C084FC" name="HCl" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Plant Comparison */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Plant-wise Comparison (YTD)</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-300">Mirzapur (UP)</span>
                      <span className="text-sm font-bold text-purple-400">18,500 MT</span>
                    </div>
                    <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-600 to-purple-400" style={{ width: '58%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-300">Jharkhand</span>
                      <span className="text-sm font-bold text-purple-400">13,300 MT</span>
                    </div>
                    <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-purple-300" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-700">
                    <div className="text-xs text-slate-400">
                      Mirzapur is primary production hub with higher utilization. Jharkhand expanding capacity.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Mix */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Product Mix (YTD Average)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PRODUCT_BREAKDOWN.map((product, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: product.color }}></div>
                      <span className="text-sm font-medium text-slate-300">{product.name}</span>
                    </div>
                    <div className="text-xl font-bold text-white">{product.value}</div>
                    <div className="text-xs text-slate-500 mt-1">MT (avg/month)</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Payment & Collections */}
        {activeTab === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                label="Total Outstanding"
                value="73.8 Cr"
                subtext="Across all customers"
                trend={-2.1}
                icon={AlertCircle}
              />
              <StatCard
                label="Collected (This Month)"
                value="38.8 Cr"
                subtext="March collections"
                trend={12.5}
                icon={CheckCircle}
              />
              <StatCard
                label="Overdue (90+ days)"
                value="10.5 Cr"
                subtext="5 invoices pending"
                trend={-15.2}
                icon={Clock}
              />
            </div>

            {/* Aging Analysis */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Receivables Aging Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={AGING_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="range" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '8px' }}
                    labelStyle={{ color: '#E5E7EB' }}
                  />
                  <Bar yAxisId="left" dataKey="amount" fill="#7B2FBE" name="Amount" />
                  <Bar yAxisId="right" dataKey="count" fill="#C084FC" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Customers */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                Top 5 Customers
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300">Customer Name</th>
                      <th className="text-right py-3 px-4 text-slate-300">Outstanding</th>
                      <th className="text-right py-3 px-4 text-slate-300">Collected</th>
                      <th className="text-right py-3 px-4 text-slate-300">Days O/S</th>
                      <th className="text-center py-3 px-4 text-slate-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CUSTOMERS.map((cust, idx) => (
                      <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/20">
                        <td className="py-3 px-4 font-medium text-slate-200">{cust.name}</td>
                        <td className="text-right py-3 px-4 text-slate-300">{(cust.outstanding / 100000).toFixed(1)}L</td>
                        <td className="text-right py-3 px-4 text-slate-300">{(cust.collected / 100000).toFixed(1)}L</td>
                        <td className="text-right py-3 px-4 text-slate-300">{cust.days}</td>
                        <td className="text-center py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                            cust.status === 'good' ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'
                          }`}>
                            {cust.status === 'good' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                            {cust.status === 'good' ? 'Good' : 'At Risk'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Sales Forecasting */}
        {activeTab === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                label="YTD Actual Sales (CPW)"
                value="30.6K"
                subtext="MT through March"
                trend={8.2}
                icon={TrendingUp}
              />
              <StatCard
                label="Q2 Forecast"
                value="24.7K"
                subtext="MT (Apr-Jun)"
                trend={3.5}
                icon={TrendingUp}
              />
              <StatCard
                label="Annual Forecast"
                value="96.4K"
                subtext="MT (all products)"
                trend={6.8}
                icon={TrendingUp}
              />
            </div>

            {/* Sales Forecast Chart */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">CPW Sales: Actuals vs Forecast</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={SALES_FORECAST}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563', borderRadius: '8px' }}
                    labelStyle={{ color: '#E5E7EB' }}
                  />
                  <Legend wrapperStyle={{ color: '#D1D5DB' }} />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#7B2FBE"
                    strokeWidth={3}
                    dot={{ fill: '#7B2FBE', r: 4 }}
                    connectNulls={false}
                    name="Actual Sales"
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#C084FC"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#C084FC', r: 3 }}
                    name="Forecast"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Product-wise Forecast Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Product-wise Breakdown (Annual Forecast)</h3>
                <div className="space-y-4">
                  {PRODUCT_BREAKDOWN.map((product, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: product.color }}></span>
                          {product.name}
                        </span>
                        <span className="text-sm font-bold text-slate-200">{(product.value * 12).toLocaleString()} MT</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full" style={{ width: `${(product.value / 16400) * 100}%`, backgroundColor: product.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Growth Indicators</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                    <span className="text-sm text-slate-300">Q1 vs Q1 (Prior Year)</span>
                    <span className="text-sm font-bold text-green-400">+8.2%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                    <span className="text-sm text-slate-300">Monthly Average Growth</span>
                    <span className="text-sm font-bold text-green-400">+1.4%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                    <span className="text-sm text-slate-300">Seasonality Impact</span>
                    <span className="text-sm font-bold text-amber-400">Moderate</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                    <span className="text-sm text-slate-300">Market Confidence</span>
                    <span className="text-sm font-bold text-purple-400">Strong</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Yield Control */}
        {activeTab === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard
                label="Avg Batch Yield"
                value="97.2%"
                subtext="Current month"
                trend={2.1}
                icon={CheckCircle}
              />
              <StatCard
                label="Within Tolerance"
                value="6 of 8"
                subtext="Recent batches"
                trend={75}
                icon={CheckCircle}
              />
              <StatCard
                label="Outside Tolerance"
                value="2 of 8"
                subtext="Action required"
                trend={-25}
                icon={AlertCircle}
              />
              <StatCard
                label="Avg Variance"
                value="-0.27%"
                subtext="Slightly below target"
                trend={-0.15}
                icon={TrendingUp}
              />
            </div>

            {/* Batch Yield Table */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                Recent Batch Performance
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300">Batch ID</th>
                      <th className="text-left py-3 px-4 text-slate-300">Product</th>
                      <th className="text-right py-3 px-4 text-slate-300">Expected Yield</th>
                      <th className="text-right py-3 px-4 text-slate-300">Actual Yield</th>
                      <th className="text-right py-3 px-4 text-slate-300">Variance %</th>
                      <th className="text-center py-3 px-4 text-slate-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BATCH_YIELD_DATA.map((batch, idx) => (
                      <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/20">
                        <td className="py-3 px-4 font-mono text-slate-300">{batch.batchId}</td>
                        <td className="py-3 px-4 text-slate-300">{batch.product}</td>
                        <td className="text-right py-3 px-4 text-slate-300">{batch.expected}</td>
                        <td className="text-right py-3 px-4 text-slate-200 font-medium">{batch.actual}</td>
                        <td className={`text-right py-3 px-4 font-semibold ${batch.variance > 0 ? 'text-green-400' : batch.variance < -1.5 ? 'text-red-400' : 'text-yellow-400'}`}>
                          {batch.variance > 0 ? '+' : ''}{batch.variance.toFixed(2)}%
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                            batch.status === 'within' ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'
                          }`}>
                            {batch.status === 'within' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                            {batch.status === 'within' ? 'OK' : 'Alert'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tolerance Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Yield Distribution</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Within 2% (Good)</span>
                      <span className="text-green-400 font-bold">75%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">2-3% (Acceptable)</span>
                      <span className="text-yellow-400 font-bold">13%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: '13%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Beyond 3% (Alert)</span>
                      <span className="text-red-400 font-bold">12%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Critical Insights</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 bg-red-900/20 border border-red-800/30 rounded-lg">
                    <p className="text-red-300"><strong>Action Required:</strong> Batch BTC-006 (CPW-1280) shows -2.7% variance. Review raw material specs.</p>
                  </div>
                  <div className="p-3 bg-amber-900/20 border border-amber-800/30 rounded-lg">
                    <p className="text-amber-300"><strong>Monitor:</strong> Batch BTC-003 (CPW-1350) at -1.9%. May indicate gravity calibration drift.</p>
                  </div>
                  <div className="p-3 bg-green-900/20 border border-green-800/30 rounded-lg">
                    <p className="text-green-300"><strong>Performing Well:</strong> CPW-1100 and CPW-1190 show consistent +0.9 to +1.0% yield improvements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
