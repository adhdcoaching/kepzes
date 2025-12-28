import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
const examQuestions: Question[] = [{
  id: "q1",
  question: "Mi az ADHD egyik alapvető jellemzője?",
  options: ["Tanulási képességek teljes hiánya", "Csak hiperaktivitás", "Figyelemzavar, impulzivitás és/vagy hiperaktivitás", "Olyan viselkedési tünet, amely csak gyermekkorban jelentkezik"],
  correctAnswer: 2
}, {
  id: "q2",
  question: "Melyik agyterület alulműködése járul hozzá a figyelemzavarhoz és impulzivitáshoz?",
  options: ["Kisagy", "Frontális kéreg", "Hipotalamusz", "Amigdala"],
  correctAnswer: 1
}, {
  id: "q3",
  question: "Melyik neurotranszmitter felelős leginkább a jutalmazásért és a motivációért?",
  options: ["Szerotonin", "Acetilkolin", "Dopamin", "GABA"],
  correctAnswer: 2
}, {
  id: "q4",
  question: "Melyik eszköz tartozik az ADHD-coach által használható fizikai segédeszközök közé?",
  options: ["Vérnyomásmérő", "Fidget eszközök (pl. stresszlabda)", "Otoszkóp", "EEG sapka"],
  correctAnswer: 1
}, {
  id: "q5",
  question: "Melyik megfigyelés jellemző lehet ADHD-s kliensre a terápiás térben?",
  options: ["Állandóan merev testtartás, mozdulatlanság", "Csak csendes, visszahúzódó viselkedés", "Gyakori témaugrások és asszociatív gondolkodás", "Következetesen stabil szemkontaktus"],
  correctAnswer: 2
}, {
  id: "q6",
  question: "Melyik állítás igaz az elkerülő (félelemalapú) halogatásra?",
  options: ["Túl sok elemzés miatt nem tud döntést hozni", "A feladat érzelmileg fenyegetőnek érződik", "A feladatot tökéletesen akarja megcsinálni", "A feladat túl unalmas és kevés újdonságot tartalmaz"],
  correctAnswer: 1
}, {
  id: "q7",
  question: "Mi a döntésképtelen halogatás egyik fő jellemzője?",
  options: ["Túl sok újdonságot keres, ezért nehezen kezd bele", "A rossz döntéstől való félelem miatt \"mentális dugó\" alakul ki", "A feladat kényszerítettnek érződik, és ellenállást vált ki", "Csak azonnali jutalmak motiválják"],
  correctAnswer: 1
}, {
  id: "q8",
  question: "Melyik technika segít a feladattal való kapcsolat újratervezésében halogatás esetén?",
  options: ["A feladat teljes ignorálása", "Kizárólag jutalmazás használata", "A gondolkodásmód átkeretezése és a feladattal való viszony vizsgálata", "Multitasking növelése"],
  correctAnswer: 2
}, {
  id: "q9",
  question: "Mi segíthet a döntési bénultság oldásában?",
  options: ["A feladat további halogatása", "Több idő eltöltése a hosszas elemzéssel", "A döntési pontok egyszerűsítése és a választási lehetőségek csökkentése", "A feladat tökéletes kidolgozásának erőltetése"],
  correctAnswer: 2
}, {
  id: "q10",
  question: "Mi tartozik a testápolási (PLEASE) készségekhez az érzelmi sérülékenység csökkentésében?",
  options: ["Gamifikálás és pontgyűjtés", "Környezetváltás és új ingerek keresése", "Alvás, étkezés és mozgás alapjainak rendezése", "Fókuszblokkok és 10-5-10 technika"],
  correctAnswer: 2
}, {
  id: "q11",
  question: "Melyik funkció tartozik a belső szervezéshez?",
  options: ["A fizikai terek rendben tartása", "Naptár és e-mailek kezelése", "Prioritások meghatározása és tervezés", "Tárgyak rendszerezése az irodában"],
  correctAnswer: 2
}, {
  id: "q12",
  question: "Hogyan jelenik meg az idővakság a neurodivergens személyeknél?",
  options: ["Állandó túlbecslés minden feladatnál", "Következetesen pontos időérzékelés", "Az idő alul- vagy túlbecslése, ami akadályozza a tervezést", "Kizárólag a gyors feladatoknál jelentkezik"],
  correctAnswer: 2
}, {
  id: "q13",
  question: "Melyik tartozik a maszkolás hatásai közé?",
  options: ["Kiszámítható rutin iránti erős igény", "A valódi igények és érzelmek elnyomása a beilleszkedés érdekében", "A feladatok módszeres, lassú feldolgozása", "Túlzott fókusz kizárólag az érdeklődési területekre"],
  correctAnswer: 1
}, {
  id: "q14",
  question: "Melyik tényező jellemzi az imposztor szindrómát?",
  options: ["Erős igény a strukturált, kiszámítható rutinra", "A pozitív visszajelzések elfogadásának nehézsége", "A hiperfókusz miatt jelentkező időtorzulás", "A környezet fizikai rendjének kényszere"],
  correctAnswer: 1
}, {
  id: "q15",
  question: "Melyik nehézség kapcsolódik az autista tempóhoz a pacing dián bemutatottak szerint?",
  options: ["Gyors és impulzív témaváltás", "Hirtelen feladatok közti ugrálás unalom miatt", "Több idő szükséges a feldolgozáshoz és a válaszadáshoz", "Állandó ingerkeresés a pörgés fenntartásához"],
  correctAnswer: 2
}];
const Exam = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{
    [key: string]: number;
  }>({});
  const [showStartDialog, setShowStartDialog] = useState(true);
  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [examQuestions[currentQuestion].id]: parseInt(value)
    });
  };
  const handleNext = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const handleSubmit = () => {
    // Calculate results - treat unanswered questions as incorrect
    const results = examQuestions.map(q => ({
      questionId: q.id,
      question: q.question,
      options: q.options,
      userAnswer: answers[q.id] !== undefined ? answers[q.id] : -1,
      correctAnswer: q.correctAnswer,
      isCorrect: answers[q.id] !== undefined && answers[q.id] === q.correctAnswer
    }));
    const score = results.filter(r => r.isCorrect).length;

    // Store results in sessionStorage
    sessionStorage.setItem('examResults', JSON.stringify({
      results,
      score,
      total: examQuestions.length
    }));
    navigate('/results');
  };
  const progress = (currentQuestion + 1) / examQuestions.length * 100;
  const answeredCount = Object.keys(answers).length;
  const currentQuestionData = examQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === examQuestions.length - 1;
  return <div className="min-h-screen bg-background py-12">
      <AlertDialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Most belekezdesz a vizsgába</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 text-base">
              <p>A tesztet bármennyiszer újrapróbálhatod. Időkorlát nincs.</p>
              <p>
                Sikeres vizsga esetén kérjük, készíts egy képernyőfotót (telefonos fotó vagy screenshot is megfelelő), 
                és küldd el a következő címre:{" "}
                <a href="mailto:adhd@lovasszabolcs.hu" className="font-medium text-primary hover:underline">
                  adhd@lovasszabolcs.hu
                </a>
                {" "}a tanúsítványért.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Vizsga indítása</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <div className="container mx-auto px-4 max-w-3xl">
        <Card>
          <CardHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">ADHD Coaching Vizsga</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {currentQuestion + 1} / {examQuestions.length}
                </span>
              </div>
              <Progress value={progress} />
              <p className="text-sm text-muted-foreground">
                Válaszolt kérdések: {answeredCount} / {examQuestions.length}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {currentQuestion + 1}. {currentQuestionData.question}
              </h3>
              
              <RadioGroup 
                value={answers[currentQuestionData.id] !== undefined ? answers[currentQuestionData.id].toString() : ""}
                onValueChange={handleAnswerChange}
              >
                {currentQuestionData.options.map((option, index) => <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>)}
              </RadioGroup>
            </div>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Előző
              </Button>

              {isLastQuestion ? <Button onClick={handleSubmit}>
                  Vizsga beküldése
                </Button> : <Button onClick={handleNext}>
                  Következő
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Exam;