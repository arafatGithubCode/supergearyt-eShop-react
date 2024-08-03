import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-700 mb-4">
          Your payment was not completed. If you have any questions, please
          contact support.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
