import CircuitCanvas from "../circuit/CircuitCanvas";

import Toolbar from "../components/Toolbar";
import WaveformPanel from "../components/WaveformPanel";
import PropertiesPanel from "../components/PropertiesPanel";

import AnalysisPanel from "../components/AnalysisPanel";

import AIDebugPanel from "../components/AIDebugPanel";

import SimulationPanel from "../components/SimulationPanel";

import TopBar from "../components/TopBar";

import useCircuitValidation from "../hooks/useCircuitValidation";

import useKeyboardShortcuts from "../hooks/useKeyboardShortcuts";

export default function Workspace() {

  useCircuitValidation();

  useKeyboardShortcuts();

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      <header className="h-14 border-b border-slate-700 flex items-center justify-between px-4 shrink-0">

        <div className="text-lg font-semibold">
          Circuit Analyzer
        </div>

        <TopBar />

      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT TOOLBAR */}

        <aside className="w-64 border-r border-slate-700 p-4 overflow-y-auto shrink-0 bg-slate-950">

          <Toolbar />

        </aside>

        {/* CENTER CANVAS */}

        <main className="flex-1 bg-slate-900 overflow-hidden">

          <CircuitCanvas />

        </main>

        {/* RIGHT PANEL */}

        <aside className="w-95 border-l border-slate-700 bg-slate-950 overflow-y-auto shrink-0">

          <div className="p-4 space-y-6">

            <PropertiesPanel />

            <AnalysisPanel />

            <AIDebugPanel />

            <SimulationPanel />
            
            <WaveformPanel />
          </div>

        </aside>

      </div>

    </div>
  );
}