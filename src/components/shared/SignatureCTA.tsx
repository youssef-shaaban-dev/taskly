const SignatureCTA = () => {
    return (
        <div className="bg-linear-[135deg,var(--color-primary),var(--color-primary-container)] p-8 rounded-xl text-white w-full max-w-[400px] flex flex-col gap-4 shadow-lg">
            <div className="flex gap-1">
                <span className="text-2xl">✨</span>
            </div>
            <div className="space-y-2">
                <h3 className="text-title-md font-bold text-white">Signature Gradient CTA</h3>
                <p className="text-[12px] leading-relaxed opacity-80">
                    Elevated depth with 135-degree primary-to-container flow.
                </p>
            </div>
        </div>
    );
};
export default SignatureCTA;