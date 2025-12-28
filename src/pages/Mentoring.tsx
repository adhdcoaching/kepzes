import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Mail, MessageSquare, User } from "lucide-react";

const Mentoring = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferredDate: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate email sending
    setTimeout(() => {
      toast({
        title: "Mentoring igény elküldve!",
        description: "Hamarosan felvesszük Önnel a kapcsolatot az előre egyeztetett időponttal kapcsolatban.",
      });
      
      setFormData({
        name: "",
        email: "",
        preferredDate: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Élő Mentoring</h1>
          <p className="text-lg text-muted-foreground">
            Egyéni mentoring alkalmak szakértő coachokkal és terapeutákkal
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Személyre szabott támogatás
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Egyéni konzultációk során részletes visszajelzést és útmutatást kap szakértőinktől.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Rugalmas időpontok
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Válassza ki az Önnek megfelelő időpontot, és kollégánk felveszi Önnel a kapcsolatot.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Mentoring igénylése</CardTitle>
            <CardDescription>
              Töltse ki az alábbi űrlapot, és hamarosan felvesszük Önnel a kapcsolatot.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Név *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Teljes név"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  E-mail cím *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="pelda@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Preferált időpont
                </Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="datetime-local"
                  value={formData.preferredDate}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Üzenet *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Írja le, milyen témában szeretne mentorálást, milyen kérdései vannak..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Küldés..." : "Igény beküldése"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Mentoring;
