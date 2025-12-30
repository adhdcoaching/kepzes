import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/logo.svg";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [name, setName] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Hiba",
        description: "Kérjük, adja meg a nevét!",
        variant: "destructive",
      });
      return;
    }

    // Store name in sessionStorage
    sessionStorage.setItem('userName', name.trim());
    
    toast({
      title: "Sikeres bejelentkezés!",
      description: "Üdvözöljük az ADHD Coaching HUB platformon.",
    });
    
    // Navigate to courses page
    navigate('/courses');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center p-4">
              <img src={logo} alt="ADHD Coaching HUB" className="w-full h-full object-contain" />
            </div>
          </div>
          <CardTitle className="text-3xl">ADHD Coaching HUB</CardTitle>
          <CardDescription className="text-base">
            Professzionális képzési platform szakembereknek
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">
                Név
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Teljes név"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 text-base"
                autoFocus
              />
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full text-base"
            >
              Bejelentkezés
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
