import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold text-secondary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-secondary/85 mb-6">Page Not Found</h2>
      <p className="text-secondary/70 text-center max-w-md mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <div className="space-x-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
        >
          Go Home
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-base font-medium rounded-md text-secondary bg-white hover:bg-gray-50 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
