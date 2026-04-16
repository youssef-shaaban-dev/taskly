interface AuthWrapperProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

const AuthWrapper = ({ title, subtitle, children }: AuthWrapperProps) => {
    return (
        <div className="auth-container"> 
            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">{title}</h2>
                    <p className="text-slate-500 text-body-md">{subtitle}</p>
                </div>
                {children}
            </div>
        </div>
    );
};

export default AuthWrapper;