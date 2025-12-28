import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Award, Home, Camera } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ExamResult {
  questionId: string;
  question: string;
  options: string[];
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
}

interface StoredResults {
  results: ExamResult[];
  score: number;
  total: number;
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<StoredResults | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('examResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      navigate('/exam');
    }
  }, [navigate]);

  if (!results) {
    return null;
  }

  const percentage = (results.score / results.total) * 100;
  const passed = percentage >= 90;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-8">
          {/* Screenshot instruction for successful exam */}
          {passed && (
            <Alert className="border-2 border-success bg-success/10">
              <Camera className="h-5 w-5 text-success" />
              <AlertDescription className="text-base font-medium ml-2">
                Kérjük, készíts egy képernyőfotót a sikeres vizsgádról (telefonos fotó vagy screenshot is megfelelő), 
                és küldd el a következő címre:{" "}
                <a href="mailto:adhd@lovasszabolcs.hu" className="text-primary hover:underline font-semibold">
                  adhd@lovasszabolcs.hu
                </a>
                {" "}a tanúsítványért.
              </AlertDescription>
            </Alert>
          )}

          {/* Summary Card */}
          <Card className="border-2">
            <CardHeader className={`${passed ? 'bg-success/10' : 'bg-destructive/10'}`}>
              <div className="flex items-center gap-4">
                {passed ? (
                  <Award className="h-12 w-12 text-success" />
                ) : (
                  <XCircle className="h-12 w-12 text-destructive" />
                )}
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2">
                    {passed ? 'Gratulálunk!' : 'Sajnálom, próbáld újra'}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {passed 
                      ? 'Sikeresen teljesítette a vizsgát!' 
                      : 'A sikeres teljesítéshez legalább 90% szükséges.'}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-4xl font-bold text-primary mb-2">{percentage.toFixed(0)}%</p>
                  <p className="text-sm text-muted-foreground">Teljesítmény</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-4xl font-bold text-success mb-2">{results.score}</p>
                  <p className="text-sm text-muted-foreground">Helyes válaszok</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-4xl font-bold text-destructive mb-2">{results.total - results.score}</p>
                  <p className="text-sm text-muted-foreground">Hibás válaszok</p>
                </div>
              </div>
              <Progress value={percentage} className="h-4" />
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <Card>
            <CardHeader>
              <CardTitle>Részletes eredmények</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.results.map((result, index) => (
                <div 
                  key={result.questionId}
                  className={`p-4 rounded-lg border-2 ${
                    result.isCorrect 
                      ? 'border-success/20 bg-success/5' 
                      : 'border-destructive/20 bg-destructive/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {result.isCorrect ? (
                      <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">
                        {index + 1}. {result.question}
                      </p>
                      <div className="space-y-1 text-sm">
                        {!result.isCorrect && (
                          <p className="text-destructive">
                            <span className="font-medium">Az Ön válasza: </span>
                            {result.userAnswer >= 0 ? result.options[result.userAnswer] : 'Nem válaszolt'}
                          </p>
                        )}
                        <p className="text-success">
                          <span className="font-medium">Helyes válasz: </span>
                          {result.options[result.correctAnswer]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline" size="lg">
                <Home className="mr-2 h-4 w-4" />
                Főoldal
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline" size="lg">
                Vissza a kurzusokhoz
              </Button>
            </Link>
            {!passed && (
              <Link to="/exam">
                <Button size="lg">
                  Vizsga újrakezdése
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
