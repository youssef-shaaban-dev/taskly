import Link from "next/link";
import { ROUTES } from "@/constant";

export const ProjectsHeader = () => {
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage and curate your projects</p>
                </div>
                <Link
                    href={ROUTES.ADD_PROJECT}
                    className="hidden md:flex bg-primary text-white px-5 py-2.5 rounded-md text-sm font-bold hover:opacity-90 transition-opacity items-center gap-2"
                >
                    <span>+</span> Create New Project
                </Link>
            </div>

            {/* Add Project Btn */}
            <Link
                href={ROUTES.ADD_PROJECT}
                className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-40"
            >
                <span className="text-2xl font-light">+</span>
            </Link>
        </>
    );
};