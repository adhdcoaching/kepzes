import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-heading text-lg font-bold mb-4">
              <Brain className="h-5 w-5 text-primary" />
              <span>ADHD Coaching HUB</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professzionális képzés ADHD coaching és terápia szakemberek számára.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navigáció</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                  Kurzusok
                </Link>
              </li>
              <li>
                <Link to="/exam" className="text-muted-foreground hover:text-primary transition-colors">
                  Vizsga
                </Link>
              </li>
              <li>
                <Link to="/mentoring" className="text-muted-foreground hover:text-primary transition-colors">
                  Mentoring
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kapcsolat</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: info@adhdcoachinghub.hu</li>
              <li>Telefon: +36 1 234 5678</li>
              <li className="pt-2">
                <Link to="#" className="hover:text-primary transition-colors">
                  Adatvédelmi szabályzat
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary transition-colors">
                  Általános szerződési feltételek
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ADHD Coaching HUB - Nea Clark Psychotherapy. Minden jog fenntartva.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
