
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container flex flex-col items-center justify-center py-20">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-brand-purple">404</h1>
        <p className="text-xl text-foreground">This page is currently under construction</p>
        <p className="text-muted-foreground">
          We're working hard to bring you an amazing experience. Please check back later!
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
