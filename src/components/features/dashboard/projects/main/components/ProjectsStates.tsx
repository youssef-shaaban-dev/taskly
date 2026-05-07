import Link from "next/link";
import { ROUTES } from "@/constant";
import { DashboardIcon } from "@/components/icons";

export const ProjectsError = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="h-[70vh] flex flex-col items-center justify-center text-center">
    <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mb-4">
      <span className="text-2xl font-bold">!</span>
    </div>
    <h2 className="text-xl font-bold text-slate-900 mb-2">Oops! Something went wrong</h2>
    <p className="text-sm text-slate-500 mb-6">{error}</p>
    <button onClick={onRetry} className="bg-primary text-white px-6 py-2 rounded-md text-sm font-bold hover:opacity-90 transition-opacity">
      Try Again
    </button>
  </div>
);

export const ProjectsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((skeleton) => (
      <div key={skeleton} className="bg-white p-6 rounded-lg border border-slate-100 h-48 animate-pulse flex flex-col">
        <div className="h-5 bg-slate-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-2 grow">
          <div className="h-3 bg-slate-100 rounded w-full"></div>
          <div className="h-3 bg-slate-100 rounded w-5/6"></div>
        </div>
        <div className="h-3 bg-slate-100 rounded w-1/4 mt-auto"></div>
      </div>
    ))}
  </div>
);

export const ProjectsEmpty = () => (
  <div className="grow flex flex-col items-center justify-center text-center bg-white rounded-lg border border-slate-100 p-12">
    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
      <DashboardIcon />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">You don&lsquo;t have any projects yet.</h3>
    <p className="text-sm text-slate-500 max-w-md mb-6">
      Get started by creating your first project to manage tasks and collaborate with your team.
    </p>
    <Link href={ROUTES.ADD_PROJECT} className="bg-primary text-white px-6 py-2 rounded-md text-sm font-bold hover:opacity-90 transition-opacity">
      Create New Project
    </Link>
  </div>
);