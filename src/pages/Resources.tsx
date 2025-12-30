import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Resources = () => {
  const resources = [
    {
      id: 1,
      title: "Neurodivergens szemlélet a pszichológiában",
      url: "https://lovasszabolcs.hu/wp-content/uploads/2025/11/Neurodivergens_szemlelet_forditas_compressed.pdf"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Link to="/courses">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Vissza a kurzusokhoz
          </Button>
        </Link>

        <div className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Kapcsolódó anyagok a modulhoz</h1>
            <p className="text-lg text-muted-foreground">
              Hasznos dokumentumok és publikációk az ADHD témakörében
            </p>
          </div>
          <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full" variant="default">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Megnyitás
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
