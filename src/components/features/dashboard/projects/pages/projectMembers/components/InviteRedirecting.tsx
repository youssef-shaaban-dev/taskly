"use client";

export const InviteRedirecting = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50/50 px-4">
      <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full border border-slate-100 text-center">
        <h2 className="text-xl font-extrabold text-slate-900 mb-2">Redirecting to login...</h2>
        <p className="text-slate-500 text-sm">Please log in to accept this invitation.</p>
      </div>
    </div>
  );
};
export default InviteRedirecting;
