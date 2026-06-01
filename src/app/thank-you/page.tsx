import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "Thank You – NYC GravityNet",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="flex justify-center mb-6">
          <span className="w-20 h-20 rounded-full bg-blue-600/10 flex items-center justify-center">
            <CheckCircle size={40} className="text-blue-600" />
          </span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
          Thank You!
        </h1>
        <p className="text-slate-500 text-lg mb-8">
          Your message has been received. We'll get back to you as soon as
          possible — typically within one business day.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 text-sm"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
