import React from "react";
import { CheckCircle, Shield, Clock, HardDrive } from "lucide-react";

export default function PacketTable({ packets = [] }) {
  if (packets.length === 0) {
    return (
      <div className="bg-[#121824] border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-xs">
        <HardDrive className="w-8 h-8 text-slate-600 mx-auto mb-2 animate-bounce" />
        <p>No active packet stream generated yet.</p>
        <p className="text-slate-500 text-[11px] mt-1">Start a session in the Morphing Console to generate live transformed packets.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#121824] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <h4 className="font-bold text-xs text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real-Time Transformed Packet Stream</span>
        </h4>
        <span className="text-[10px] text-slate-400 font-mono">Showing last {packets.length} packets</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300 font-mono">
          <thead className="bg-slate-900/90 text-slate-400 text-[11px] uppercase border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-4">Time</th>
              <th className="py-2.5 px-4">Packet ID</th>
              <th className="py-2.5 px-4">Profile</th>
              <th className="py-2.5 px-4">Original Size</th>
              <th className="py-2.5 px-4">Morphed Size</th>
              <th className="py-2.5 px-4">Latency</th>
              <th className="py-2.5 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {packets.map((pkt, idx) => (
              <tr key={pkt.packetId || idx} className="hover:bg-slate-800/50 transition-colors">
                <td className="py-2.5 px-4 text-slate-400">
                  {pkt.timestamp ? new Date(pkt.timestamp).toLocaleTimeString() : "Just now"}
                </td>
                <td className="py-2.5 px-4 font-bold text-cyan-400">{pkt.packetId}</td>
                <td className="py-2.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40 text-[10px] uppercase">
                    {pkt.morphProfile}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-slate-300">{pkt.originalSize} B</td>
                <td className="py-2.5 px-4 font-semibold text-emerald-400">
                  {pkt.transformedSize} B <span className="text-[10px] text-amber-400 font-normal">(+{pkt.overheadPercent}%)</span>
                </td>
                <td className="py-2.5 px-4 text-slate-300">{pkt.latency} ms</td>
                <td className="py-2.5 px-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40 text-[10px]">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    {pkt.status || "DELIVERED"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
