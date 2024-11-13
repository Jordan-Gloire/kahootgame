import { FaSpinner, FaExclamationCircle } from "react-icons/fa";

const LoadingAndError = ({ loading, error }) => {
  return (
    <div className="space-y-6">
      {/* Chargement */}
      {loading && (
        <div className="flex justify-center items-center space-x-2">
          <FaSpinner className="animate-spin text-blue-500 text-3xl" />
          <span className="text-lg text-gray-700">Chargement...</span>
        </div>
      )}

      {/* Erreur */}
      {error && (
        <div className="flex items-center justify-center bg-red-100 border border-red-300 rounded-lg p-4 mb-6 space-x-3">
          <FaExclamationCircle className="text-red-600 text-2xl" />
          <span className="text-red-600 text-lg">{error}</span>
        </div>
      )}
    </div>
  );
};

export default LoadingAndError;
