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
            {mongodbStats?.connected ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                <span>Atlas Cloud Connected</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                <span>Simulated Local Mode</span>
              </span>
            )}
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

        {/* CONNECTION ADVISORY / ATLAS WHITE-LISTING GUIDE */}
        {mongodbStats?.lastError && (
          <div className="mb-8 bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-5 text-amber-200 text-xs">
            <h4 className="font-bold text-amber-300 mb-1.5 flex items-center gap-2 font-serif italic text-sm">
              ⚠️ MongoDB Atlas Network Connection Filter Restriction Detected
            </h4>
            <p className="leading-relaxed mb-3">
              Your custom <code className="bg-slate-900 px-1 py-0.5 rounded text-white font-mono text-[10px]">MONGODB_URI</code> environment key is detected, but connection was rejected by the database. In MongoDB Atlas, this usually triggers due to a SSL handshake check fail or dynamic IP access policies (TLSv1 alert 80).
            </p>
            <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 mb-4 overflow-x-auto select-all max-h-36">
              <span className="text-red-400 font-bold block mb-1">Atlas Response:</span>
              {mongodbStats.lastError}
            </div>
            <div className="bg-amber-950/20 px-4 py-3.5 rounded-xl border border-amber-500/15">
              <span className="font-bold text-amber-300 uppercase block tracking-wider text-[10px] mb-2 font-sans">💡 How to White-list and Resolve in 1 Minute:</span>
              <ol className="list-decimal pl-4 space-y-2 text-slate-300 font-sans">
                <li>Log into your <a href="https://cloud.mongodb.com" target="_blank" rel="noopener noreferrer" className="underline text-amber-400 hover:text-amber-300 font-bold">MongoDB Atlas Console</a>.</li>
                <li>Go to <strong>Security &gt; Network Access</strong> inside your cluster dashboard.</li>
                <li>Click <strong>Add IP Address</strong>.</li>
                <li>Set the Access List Entry to <code className="bg-[#2B352E] px-2 py-0.5 rounded text-[#9CCC65] font-bold font-mono">0.0.0.0/0</code> (this authorizes dynamic secure Cloud Run containers to sync data).</li>
                <li>Click <strong>Confirm</strong>. Wait 30 seconds for the Atlas cluster to propagate the routing firewall, then click the <strong className="underline text-teal-400 cursor-pointer hover:text-teal-300" onClick={handleRefresh}>Refresh button 🔄</strong> in the header!</li>
              </ol>
            </div>
          </div>
        )}

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
                <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 flex-wrap">
                  {mongodbStats?.connected ? "TwoLeaves-Bud-AtlasDB" : "Local Virtual MongoDB"}
                  <span className={`text-[9px] uppercase font-sans tracking-wide px-2 py-0.5 rounded border ${
                    mongodbStats?.connected 
                      ? "bg-green-950/40 text-green-300 border-green-500/25" 
                      : "bg-amber-950/40 text-amber-400 border-amber-500/25 animate-pulse"
                  }`}>
                    {mongodbStats?.connected ? "Genuine Atlas Cloud" : "Local Sandbox"}
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  {mongodbStats?.connected 
                    ? "Synchronized with genuine remote serverless Atlas Cluster Collections" 
                    : "Simulated secure local storage file database with MongoDB query console adapter"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs text-stone-200">
              <div>
                <span className="text-slate-500 block mb-1 uppercase text-[10px] tracking-wider font-sans font-bold">Database URI</span>
                <span className="text-slate-300 font-bold tracking-tight text-[11px] truncate block" title={mongodbStats?.uri}>
                  {mongodbStats?.uri || "mongodb+srv://admin:***@cluster0"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1 uppercase text-[10px] tracking-wider font-sans font-bold">Driver Version</span>
                <span className="text-[#00ACC1] font-bold block">Node. {mongodbStats?.version || "7.0.5"}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1 uppercase text-[10px] tracking-wider font-sans font-bold">Replica Set</span>
                <span className="text-slate-300 font-bold block">atlas-rs0-shard</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1 uppercase text-[10px] tracking-wider font-sans font-bold">Cluster Host</span>
                <span className="text-slate-300 font-bold block">{mongodbStats?.connected ? "Atlas Global Shared" : "Local-First VM"}</span>
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
                  <span className="text-emerald-400 font-bold">{mongodbStats?.connected ? "42 ms" : "3 ms"}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: mongodbStats?.connected ? "45%" : "10%" }} />
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
