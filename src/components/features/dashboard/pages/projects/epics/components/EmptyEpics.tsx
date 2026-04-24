import { RocketIcon, ArchitectureIcon, MonitoringIcon, PlusIcon, SearchIcon } from "@/components/icons";
import Link from "next/link";

interface EmptyEpicsProps {
  projectId: string;
}

export const EmptyEpics = ({ projectId }: EmptyEpicsProps) => {
  const infoCards = [
    {
      icon: <SearchIcon className="text-blue-500" size={20} />,
      title: "High-Level Goals",
      description: "Define the broad objectives that span across multiple cycles."
    },
    {
      icon: <ArchitectureIcon className="text-indigo-500" size={20} />,
      title: "Hierarchy Design",
      description: "Link individual tasks to parent epics for a consolidated view."
    },
    {
      icon: <MonitoringIcon className="text-emerald-500" size={20} />,
      title: "Track Velocity",
      description: "Visualize percentage completion at a macro project level."
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-20 animate-in fade-in zoom-in duration-500">
      {/* Illustration Placeholder */}
      <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-blue-50/50 rounded-3xl rotate-6" />
        <div className="absolute inset-0 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-blue-50/50 flex items-center justify-center p-8">
           <div className="grid grid-cols-2 gap-4 w-full h-full opacity-20">
             <div className="bg-blue-100 rounded-lg flex items-center justify-center"><RocketIcon size={24} /></div>
             <div className="bg-slate-100 rounded-lg flex items-center justify-center"><ArchitectureIcon size={24} /></div>
             <div className="bg-slate-100 rounded-lg flex items-center justify-center"><PlusIcon size={24} /></div>
             <div className="bg-blue-600 rounded-lg flex items-center justify-center text-white"><PlusIcon size={24} /></div>
           </div>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 text-center">
        No epics in this project yet.
      </h2>
      <p className="text-slate-500 text-sm md:text-[15px] max-w-md text-center leading-relaxed mb-10 font-medium">
        Break down your large project into manageable epics to track progress better and maintain architectural clarity.
      </p>

      <Link 
        href={`/project/${projectId}/epics/new`}
        className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] mb-16"
      >
        <RocketIcon size={18} />
        Create First Epic
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {infoCards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4">
              {card.icon}
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">{card.title}</h4>
            <p className="text-[11px] text-slate-500 leading-normal font-medium">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
