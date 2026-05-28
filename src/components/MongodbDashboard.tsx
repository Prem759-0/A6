import React, { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import { motion } from "motion/react";
import { ArrowLeft, Terminal, Database, Server, Cpu, RefreshCw, Layers, ShieldCheck } from "lucide-react";

export const MongodbDashboard: React.FC = () => {
  const { mongodbLogs, mongodbStats, fetchMongodbStatus, setActivePage } = useShop();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMongodbStatus();
    setTimeout(() => setRefreshing(false), 500);
  };

  useEffect(() => {
    fetchMongodbStatus();
    const interval = setInterval(() => {
      fetchMongodbStatus();
    }, 4000); // Poll status every 4 seconds for maximum live reactive feedback
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#121824] text-[#E2E8F0] py-12 px-4 sm:px-6 lg:px-8 font-mono select-none selection:bg-[#00838F] selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Action */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <button
            onClick={() => setActivePage("store")}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00ACC1] hover:text-white transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Storefront Portal</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
              <span>MongoDB Online</span>
            </span>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
              title="Refresh MongoDB Stats"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* TOP STATUS CARD */}
        <div className="grid md:grid-cols-12 gap-6 mb-8">
          
          {/* Main Atlas Telemetry Cluster Card */}
          <div className="md:col-span-8 bg-[#182235] border-2 border-[#1E293B] rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00838F]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-[#10B981]/10 text-[#10B981] rounded-xl border border-[#10B981]/20">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  TwoLeaves-Bud-Cluster-0
                  <span className="text-[10px] uppercase bg-green-900/30 text-green-300 px-2 py-0.5 rounded border border-green-700/20">Active</span>
                </h2>
                <p className="text-xs text-slate-400">Deployed instance in GCP Cloud Run Sandbox</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block mb-1 uppercase text-[10px] tracking-wider">Database URI</span>
                <span className="text-slate-300 font-bold tracking-tight text-[11px] truncate block" title={mongodbStats?.uri}>
                  {mongodbStats?.uri || "mongodb+srv://admin:***@cluster0"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1 uppercase text-[10px] tracking-wider">Driver Version</span>
                <span className="text-[#00ACC1] font-bold block">Node.js {mongodbStats?.version || "7.0.5"}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1 uppercase text-[10px] tracking-wider">Replica Set</span>
                <span className="text-slate-300 font-bold block">atlas-rs0-shard</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1 uppercase text-[10px] tracking-wider">Cluster Host</span>
                <span className="text-slate-300 font-bold block">GCP / Iowa (us-central1)</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Widgets */}
          <div className="md:col-span-4 bg-[#182235] border-2 border-[#1E293B] rounded-2xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Performance Live</span>
              <Cpu className="w-4 h-4 text-slate-500" />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Read / Write Latency</span>
                  <span className="text-emerald-400 font-bold">4.2 ms</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: "15%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Connections (Express App)</span>
                  <span className="text-teal-400 font-bold">1 / 100</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500" style={{ width: "2%" }} />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* COLLECTIONS counters */}
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-500" />
          MAPPED MONGO DATABASE COLLECTIONS
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { name: "users", label: "User Accounts", color: "from-blue-500/10 to-blue-400/5", textColor: "text-blue-400", count: mongodbStats?.collections?.users || 0 },
            { name: "products", label: "Custom Tea Blends", color: "from-amber-500/10 to-amber-400/5", textColor: "text-amber-400", count: mongodbStats?.collections?.products || 0 },
            { name: "orders", label: "Telemetry Orders", color: "from-purple-500/10 to-purple-400/5", textColor: "text-purple-400", count: mongodbStats?.collections?.orders || 0 },
            { name: "mongodbLogs", label: "Session Queries", color: "from-teal-500/10 to-teal-400/5", textColor: "text-teal-400", count: mongodbStats?.collections?.mongodbLogs || 0 }
          ].map((col) => (
            <div 
              key={col.name}
              className={`bg-gradient-to-br ${col.color} border border-slate-800 rounded-xl p-4 flex flex-col justify-between`}
            >
              <div>
                <span className="font-bold text-white block text-sm">{col.name}</span>
                <span className="text-[10px] text-slate-500 block font-sans tracking-wide mt-0.5">{col.label}</span>
              </div>
              <div className="text-right mt-4">
                <span className={`text-4xl font-extrabold font-serif ${col.textColor}`}>{col.count}</span>
                <span className="text-[10px] text-slate-400 block font-mono">docs</span>
              </div>
            </div>
          ))}
        </div>

        {/* TERMINAL QUERY LOG CONSOLE */}
        <div className="bg-[#0B0F17] border-2 border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-[#141C2C] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Terminal className="w-4 h-4 text-[#00ACC1]" />
              <span className="font-bold">LIVE STAGING MONGODB QUERY SHELL STREAMS</span>
            </div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Reactive Updates</span>
          </div>

          <div className="p-4 md:p-6 h-[400px] overflow-y-auto font-mono text-xs space-y-4 line-clamp-3">
            {mongodbLogs.length === 0 ? (
              <div className="text-slate-500 py-10 text-center">
                <span className="inline-block animate-pulse">waiting for connections...</span>
                <p className="text-[11px] text-slate-600 mt-2">Activate terminal logs by registering an account, login, adding products, or placing orders!</p>
              </div>
            ) : (
              mongodbLogs.map((log: any, idx: number) => (
                <div key={idx} className="border-l-2 border-slate-800 pl-3 py-1 space-y-1 hover:border-[#00ACC1] transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-slate-500 text-[10px]">
                    <span className="flex items-center gap-1">
                      <Server className="w-3 h-3" />
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1 bg-emerald-950/20 px-1.5 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3" />
                      {log.status} in {log.durationMs}ms
                    </span>
                  </div>
                  
                  <div className="text-slate-200 bg-slate-900/50 p-2 rounded border border-slate-800/60 break-all select-all font-semibold">
                    <span className="text-indigo-400 font-bold">two_leaves_db&gt; </span>
                    {log.query}
                  </div>
                  
                  <div className="text-[10px] text-zinc-400 pl-1 font-sans">
                    → Collection write/read count affected: <strong className="font-mono text-[#00ACC1]">{log.rowsAffected}</strong> document(s)
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
