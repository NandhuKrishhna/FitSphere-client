import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-500 to-black flex flex-col">
      {/* Back button */}
      <div className="p-4">
        <button
          onClick={goBack}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-200">401</h1>
          <h2 className="mt-4 text-3xl font-semibold text-red-400">Unauthorized Access</h2>
          <p className="mt-4 text-white max-w-lg mx-auto">
            Sorry, but you don't have permission to access this page. Please check your credentials and try again.
          </p>
          <button
            onClick={goBack}
            className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-300 hover:text-black transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
