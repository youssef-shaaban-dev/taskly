import { DashboardIcon } from "@/components/icons";

interface ProjectCardHeaderProps {
    title: string;
    description: string;
}

export const ProjectCardHeader = ({ title, description }: ProjectCardHeaderProps) => {
    return (
        <div className="flex items-start gap-4 mb-8">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                <DashboardIcon />
            </div>
            <div>
                <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                <p className="text-sm text-slate-500">
                    {description}
                </p>
            </div>
        </div>
    );
};
