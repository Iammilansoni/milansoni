import { useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from "@/components/ui/button";
import { Bot, Database, Globe, Server, Play, Cpu, Layers } from "lucide-react";
import { Reveal } from "@/components/reveal";

const CustomNode = ({ data }: any) => {
  const Icon = data.icon;
  return (
    <div className={`px-4 py-3 shadow-md rounded-xl bg-background/80 backdrop-blur-md border border-aurora-1/20 flex items-center gap-3 w-56 ${data.isActive ? 'ring-2 ring-aurora-1 shadow-[0_0_30px_--theme(--color-aurora-1/40)]' : ''} transition-all duration-300`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-aurora-1! border-0" />
      <div className={`p-2 rounded-lg ${data.isActive ? 'bg-aurora-1 text-white' : 'bg-aurora-1/10 text-aurora-1'} transition-colors duration-300`}>
        {Icon && <Icon className="w-5 h-5" />}
      </div>
      <div>
        <div className="text-xs font-bold text-foreground">{data.label}</div>
        <div className="text-[10px] text-muted-foreground font-mono leading-tight">{data.subLabel}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-aurora-1! border-0" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  { id: 'frontend', type: 'custom', position: { x: 350, y: 20 }, data: { label: 'Frontend', subLabel: 'Next.js 15 + shadcn', icon: Globe, isActive: false } },
  { id: 'gateway', type: 'custom', position: { x: 350, y: 120 }, data: { label: 'API Gateway', subLabel: 'FastAPI + JWT Auth', icon: Server, isActive: false } },
  { id: 'orchestrator', type: 'custom', position: { x: 350, y: 220 }, data: { label: 'AI Agent Layer', subLabel: '4 Parallel Domain Agents', icon: Cpu, isActive: false } },
  { id: 'db', type: 'custom', position: { x: 50, y: 340 }, data: { label: 'Vector Store', subLabel: 'PostgreSQL + pgvector', icon: Database, isActive: false } },
  { id: 'redis', type: 'custom', position: { x: 350, y: 340 }, data: { label: 'Task Queue', subLabel: 'Redis + Celery', icon: Layers, isActive: false } },
  { id: 'gemini', type: 'custom', position: { x: 650, y: 340 }, data: { label: 'LLM Engine', subLabel: 'Gemini 2.0 Flash', icon: Bot, isActive: false } },
];

const edgeStyle = { stroke: '#ffffff', strokeWidth: 2, opacity: 0.2 };
const activeEdgeStyle = { stroke: '#a855f7', strokeWidth: 3, opacity: 1 };

const initialEdges = [
  { id: 'e-front-gate', source: 'frontend', target: 'gateway', type: 'smoothstep', animated: false, style: edgeStyle },
  { id: 'e-gate-orch', source: 'gateway', target: 'orchestrator', type: 'smoothstep', animated: false, style: edgeStyle },
  { id: 'e-orch-db', source: 'orchestrator', target: 'db', type: 'smoothstep', animated: false, style: edgeStyle },
  { id: 'e-orch-redis', source: 'orchestrator', target: 'redis', type: 'smoothstep', animated: false, style: edgeStyle },
  { id: 'e-orch-gemini', source: 'orchestrator', target: 'gemini', type: 'smoothstep', animated: false, style: edgeStyle },
];

export function ArchitectureGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSimulating, setIsSimulating] = useState(false);
  const [stepText, setStepText] = useState("System idle. Ready for request.");

  const simulate = async () => {
    if (isSimulating) return;
    setIsSimulating(true);

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    const setNodeActive = (id: string, active: boolean) => {
      setNodes(nds => nds.map(n => n.id === id ? { ...n, data: { ...n.data, isActive: active } } : n));
    };
    const setEdgeActive = (id: string, active: boolean) => {
      setEdges(eds => eds.map(e => e.id === id ? { ...e, animated: active, style: active ? activeEdgeStyle : edgeStyle } : e));
    };

    // Reset
    setNodes(initialNodes);
    setEdges(initialEdges);
    
    // Step 1: Frontend sends request
    setStepText("1. Client uploads document via Next.js frontend...");
    setNodeActive('frontend', true);
    await sleep(600);
    setEdgeActive('e-front-gate', true);
    await sleep(600);
    setNodeActive('frontend', false);

    // Step 2: Gateway
    setStepText("2. FastAPI Gateway authenticates JWT & routes to Orchestrator...");
    setNodeActive('gateway', true);
    setEdgeActive('e-front-gate', false);
    await sleep(800);
    setEdgeActive('e-gate-orch', true);
    await sleep(600);
    setNodeActive('gateway', false);

    // Step 3: Orchestrator
    setStepText("3. Orchestrator initializes Classifier, Safety, Entity, & Summarizer agents...");
    setNodeActive('orchestrator', true);
    setEdgeActive('e-gate-orch', false);
    await sleep(1000);

    // Step 4: Parallel Processing
    setStepText("4. Agents execute concurrently against Redis, pgvector & Gemini...");
    setEdgeActive('e-orch-db', true);
    setEdgeActive('e-orch-redis', true);
    setEdgeActive('e-orch-gemini', true);
    await sleep(600);
    
    setNodeActive('db', true);
    setNodeActive('redis', true);
    setNodeActive('gemini', true);
    await sleep(1800);

    // Step 5: Compilation
    setStepText("5. Results compiled and aggregated by Orchestrator...");
    setNodeActive('db', false);
    setNodeActive('redis', false);
    setNodeActive('gemini', false);
    setEdgeActive('e-orch-db', false);
    setEdgeActive('e-orch-redis', false);
    setEdgeActive('e-orch-gemini', false);
    await sleep(1000);
    
    // Step 6: Return
    setStepText("6. Response streamed back through Gateway to Client.");
    setNodeActive('orchestrator', false);
    setNodeActive('gateway', true);
    setEdgeActive('e-gate-orch', true);
    await sleep(600);
    setNodeActive('gateway', false);
    setEdgeActive('e-gate-orch', false);
    setNodeActive('frontend', true);
    setEdgeActive('e-front-gate', true);
    await sleep(1000);

    // End
    setStepText("Pipeline execution completed successfully.");
    setNodeActive('frontend', false);
    setEdgeActive('e-front-gate', false);
    setIsSimulating(false);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-hairline bg-background/50 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-aurora-1/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-aurora-1 mb-2">Interactive Node Graph</p>
              <h2 className="font-display text-2xl md:text-3xl text-foreground">
                MiningNiti Multi-Agent Pipeline.
              </h2>
            </div>
            <div className="flex items-center gap-4 bg-secondary/50 backdrop-blur border border-hairline rounded-full pl-6 pr-2 py-2 w-full md:w-auto">
              <span className="font-mono text-xs text-muted-foreground mr-4 truncate max-w-[200px] md:max-w-xs">
                {stepText}
              </span>
              <Button 
                onClick={simulate} 
                disabled={isSimulating}
                className="rounded-full gap-2 shrink-0 h-9 px-4 text-xs"
              >
                {isSimulating ? (
                  <span className="w-3 h-3 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
                {isSimulating ? "Simulating..." : "Simulate"}
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="w-full h-[500px] bg-black/40 border border-hairline rounded-2xl overflow-hidden backdrop-blur-sm relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            proOptions={{ hideAttribution: true }}
            className="react-flow-glass"
          >
            <Background color="#ffffff" gap={16} size={1} opacity={0.05} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
