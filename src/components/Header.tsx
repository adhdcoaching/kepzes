import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const Header = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold">
            <img src={logo} alt="ADHD Coaching HUB" className="h-8 w-8" />
            <span>ADHD Coaching HUB</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/courses" className="text-sm font-medium hover:text-primary transition-colors">
              Kurzusok
            </Link>
            <Link to="/exam" className="text-sm font-medium hover:text-primary transition-colors">
              Vizsga
            </Link>
            <Link to="/mentoring" className="text-sm font-medium hover:text-primary transition-colors">
              Mentoring
            </Link>
          </nav>

          <Link to="/courses">
            <Button>Kezdés</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
