import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, PlayCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

// Mock data - ugyanaz mint a Courses oldalon
const allVideos = [
  { id: "v1", title: "Etika, jogi alapok és az ADHD coaching felépítésének ismeretei", duration: "Video", instructor: "ADHD Mentor", moduleId: "module-1", type: "lecture", youtubeId: "bVXpLnvWBUQ" },
  { id: "v2", title: "Mi az ADHD?", duration: "Video", instructor: "ADHD Mentor", moduleId: "module-1", type: "lecture", youtubeId: "rTbx_yl3fDY" },
  { id: "v3", title: "Az első ülés", duration: "Video", instructor: "ADHD Mentor", moduleId: "module-2", type: "lecture", youtubeId: "FYoMefN2Vhw" },
  { id: "v4", title: "ADHD jelek az ülésen és a szerződéskötés folyamata", duration: "Video", instructor: "ADHD Mentor", moduleId: "module-2", type: "lecture", youtubeId: "cgKruke1nbg" },
  { id: "v16", title: "Érzékszervi szabályozás", duration: "2 videó", instructor: "ADHD Mentor", moduleId: "module-2", type: "lecture", youtubeId: "2EKx0QEtPmI,L2ym_SINpHU" },
  { id: "v17", title: "Korlátozó hiedelmekkel való munka", duration: "Video", instructor: "ADHD Mentor", moduleId: "module-2", type: "lecture", youtubeId: "mAmJMvYEFCQ" },
  { id: "v18", title: "Érzelmi intelligencia", duration: "Video", instructor: "ADHD Mentor", moduleId: "module-2", type: "lecture", youtubeId: "7rrEhrt2NGc" },
  { id: "v9", title: "Érzelemszabályozás", duration: "2 videó", instructor: "ADHD Mentor", moduleId: "module-2", type: "lecture", youtubeId: "ZoerAiW6jBs,HpBGnXtGWI4" },
  { id: "v10", title: "Energiaszabályozás", duration: "Video", instructor: "ADHD Mentor", moduleId: "module-2", type: "lecture", youtubeId: "rSIEpFeMlZ8" },
  { id: "v11", title: "Halogatás", duration: "Video", instructor: "ADHD Mentor", moduleId: "module-2", type: "lecture", youtubeId: "Oavre_Qbf78" },
  { id: "v12", title: "A motiváció típusai", duration: "Video", instructor: "ADHD Mentor", moduleId: "module-2", type: "lecture", youtubeId: "h2dv-MKUMjs" },
  { id: "v13", title: "Szervezési nehézségek kezelése", duration: "Video", instructor: "ADHD Mentor", moduleId: "module-2", type: "lecture", youtubeId: "3PZb4WiGbh8" },
  { id: "v14", title: "Rendszerezés", duration: "Video", instructor: "ADHD Mentor", moduleId: "module-2", type: "lecture", youtubeId: "kdKQ94iyP0w" },
  { id: "v15", title: "Imposztor szindróma", duration: "Video", instructor: "ADHD Mentor", moduleId: "module-2", type: "lecture", youtubeId: "fxgDjbz0NVE" },
  { id: "v6", title: "Podcast Nea Clark-kal", duration: "Video", instructor: "ADHD Mentor", moduleId: "module-3", type: "interview", youtubeId: "8iJ7gS9u820" },
];

const Video = () => {
  const { videoId } = useParams();
  const [watched, setWatched] = useState<string[]>(["v1"]);
  
  const currentVideo = allVideos.find(v => v.id === videoId);
  const moduleVideos = allVideos.filter(v => v.moduleId === currentVideo?.moduleId);
  const progressPercent = (watched.length / moduleVideos.length) * 100;

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Videó nem található</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/courses">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Vissza a kurzusokhoz
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main video area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                {/* YouTube video player(s) */}
                {(currentVideo as any).youtubeId?.split(',').map((ytId: string, index: number) => (
                  <div key={ytId} className={`relative aspect-video bg-black overflow-hidden ${index === 0 ? 'rounded-t-lg' : ''}`}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${ytId.trim()}?rel=0&modestbranding=1`}
                      title={`${currentVideo.title} ${(currentVideo as any).youtubeId.split(',').length > 1 ? `- ${index + 1}. videó` : ''}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ))}
                <div className="p-6">
                  <h1 className="text-3xl font-bold mb-2">{currentVideo.title}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground mb-4">
                    <span>{currentVideo.instructor}</span>
                    <span>•</span>
                    <span>{currentVideo.duration}</span>
                    <span>•</span>
                    <span className="capitalize">{currentVideo.type === "lecture" ? "Előadás" : "Interjú"}</span>
                  </div>
                  <p className="text-muted-foreground">
                    Ez a videó streaming formátumban érhető el. A tartalmat csak online megtekintésre biztosítjuk, 
                    a letöltés és képernyőfelvétel nem lehetséges a szerzői jogok védelme érdekében.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with module progress */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Modul előrehaladás</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Megtekintett videók</span>
                    <span className="font-medium">{watched.length} / {moduleVideos.length}</span>
                  </div>
                  <Progress value={progressPercent} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
