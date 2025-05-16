import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <FileQuestion className="h-24 w-24 text-primary" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            to="/student/papers"
            className="px-6 py-3 border border-primary text-primary font-medium rounded-md hover:bg-primary hover:bg-opacity-10 transition-colors"
          >
            Browse Papers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;