import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, FileDown, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

const Downloads = () => {
  const downloadCategories = [
    {
      id: 1,
      title: "Diasor",
      description: "Prezentációk és előadásanyagok",
      icon: FileText,
      action: () => {
        // TODO: Add slides download functionality
        console.log("Diasor download");
      }
    },
    {
      id: 2,
      title: "Handoutok",
      description: "Kézianyagok és segédletek",
      icon: BookOpen,
      action: () => {
        // TODO: Add handouts download functionality
        console.log("Handoutok download");
      }
    },
    {
      id: 3,
      title: "Publikáció",
      description: "Szakmai publikációk és tanulmányok",
      icon: FileDown,
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
            <h1 className="text-4xl font-bold mb-4">Letölthető anyagok</h1>
            <p className="text-lg text-muted-foreground">
              Hasznos tananyagok, prezentációk és publikációk
            </p>
          </div>
          <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {downloadCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {category.url ? (
                    <a 
                      href={category.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full" variant="default">
                        Megnyitás
                      </Button>
                    </a>
                  ) : (
                    <Button 
                      className="w-full" 
                      variant="default"
                      onClick={category.action}
                    >
                      Letöltés
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Downloads;
