import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import neaPhoto from "@/assets/nea-photo.webp";
import logo from "@/assets/logo.svg";
interface Video {
  id: string;
  title: string;
  duration: string;
  instructor: string;
  type: "lecture" | "interview" | "download";
  downloadUrl?: string;
  youtubeId?: string;
}
interface Module {
  id: string;
  title: string;
  description: string;
  videos: Video[];
  content?: React.ReactNode;
}
const modules: Module[] = [{
  id: "module-1",
  title: "ADHD alapok",
  description: "Az ADHD alapvető ismeretei és diagnosztikai alapok.",
  videos: [{
    id: "v1",
    title: "Etika, jogi alapok és az ADHD coaching felépítésének ismeretei",
    duration: "Video",
    instructor: "ADHD Mentor",
    type: "lecture"
  }, {
    id: "v2",
    title: "Mi az ADHD?",
    duration: "Video",
    instructor: "ADHD Mentor",
    type: "lecture",
    youtubeId: "rTbx_yl3fDY"
  }]
}, {
  id: "module-2",
  title: "Az ADHD coaching felépítése",
  description: "Az első ülés folyamata és az ADHD jelek felismerése a coaching során.",
  videos: [{
    id: "v3",
    title: "Az első ülés",
    duration: "Video",
    instructor: "ADHD Mentor",
    type: "lecture",
    youtubeId: "FYoMefN2Vhw"
  }, {
    id: "v4",
    title: "ADHD jelek az ülésen és a szerződéskötés folyamata",
    duration: "Video",
    instructor: "ADHD Mentor",
    type: "lecture"
  }, {
    id: "v16",
    title: "Érzékszervi szabályozás",
    duration: "2 videó",
    instructor: "ADHD Mentor",
    type: "lecture",
    youtubeId: "2EKx0QEtPmI,L2ym_SINpHU"
  }, {
    id: "v17",
    title: "Korlátozó hiedelmekkel való munka",
    duration: "Video",
    instructor: "ADHD Mentor",
    type: "lecture",
    youtubeId: "mAmJMvYEFCQ"
  }, {
    id: "v18",
    title: "Érzelmi intelligencia",
    duration: "Video",
    instructor: "ADHD Mentor",
    type: "lecture",
    youtubeId: "7rrEhrt2NGc"
  }, {
    id: "v9",
    title: "Érzelemszabályozás",
    duration: "2 videó",
    instructor: "ADHD Mentor",
    type: "lecture",
    youtubeId: "ZoerAiW6jBs,HpBGnXtGWI4"
  }, {
    id: "v10",
    title: "Energiaszabályozás",
    duration: "Video",
    instructor: "ADHD Mentor",
    type: "lecture",
    youtubeId: "rSIEpFeMlZ8"
  }, {
    id: "v11",
    title: "Halogatás",
    duration: "Video",
    instructor: "ADHD Mentor",
    type: "lecture",
    youtubeId: "Oavre_Qbf78"
  }, {
    id: "v12",
    title: "A motiváció típusai",
    duration: "Video",
    instructor: "ADHD Mentor",
    type: "lecture",
    youtubeId: "h2dv-MKUMjs"
  }, {
    id: "v13",
    title: "Szervezési nehézségek kezelése",
    duration: "Video",
    instructor: "ADHD Mentor",
    type: "lecture",
    youtubeId: "3PZb4WiGbh8"
  }, {
    id: "v14",
    title: "Rendszerezés",
    duration: "Video",
    instructor: "ADHD Mentor",
    type: "lecture",
    youtubeId: "kdKQ94iyP0w"
  }, {
    id: "v15",
    title: "Imposztor szindróma",
    duration: "Video",
    instructor: "ADHD Mentor",
    type: "lecture",
    youtubeId: "fxgDjbz0NVE"
  }]
}, {
  id: "module-3",
  title: "Kiegészítő tartalom",
  description: "Interjúk és beszélgetések szakértőkkel.",
  videos: [{
    id: "v6",
    title: "Podcast Nea Clark-kal",
    duration: "Video",
    instructor: "ADHD Mentor",
    type: "interview",
    youtubeId: "8iJ7gS9u820"
  }, {
    id: "v7",
    title: "Nea Clark könyvei",
    duration: "Külső link",
    instructor: "ADHD Mentor",
    type: "download",
    downloadUrl: "https://www.amazon.com/s?k=nea+clark&crid=1TVT03XTL41NR&sprefix=nea+clark%2Caps%2C218&ref=nb_sb_noss_1"
  }]
}, {
  id: "module-4",
  title: "Egyéni mentorálás és szupervízió",
  description: "Személyre szabott támogatás és szupervízió a gyakorlati alkalmazáshoz.",
  videos: [],
  content: (
    <>
      <p>Szeretném, ha tudnád: teljesen természetes, hogy a tanulás és a szakmai fejlődés során kihívásokat élünk meg. Időnként bizonytalannak érezhetjük magunkat, és ez rendben van. A fejlődési folyamat része, hogy néha elakadunk, máskor pedig vissza kell térnünk egy-egy témához. Mindez teljesen normális.</p>
      <p>Ha az eddig tanultakkal kapcsolatban kérdésed merül fel, vagy szeretnél tisztábban látni egy helyzetet, bátran vedd fel a kapcsolatot velünk. Szívesen segítünk.</p>
      <p>A tanultak gyakorlati alkalmazásához Nea egyéni szupervíziót biztosít az aktuális díjszabása alapján. Bármikor, amikor kihívást élsz meg a szakmai gyakorlatod során ADHD coach vagy terapeutaként, fordulj hozzá bizalommal.</p>
      <p>Vedd fel vele a kapcsolatot a <a href="mailto:nea@neaclark.com" className="text-primary hover:underline font-medium">nea@neaclark.com</a> címen az időpont egyeztetése céljából.</p>
    </>
  )
}];
const Courses = () => {
  return <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="h-20 w-auto" />
        </div>
        <div className="mb-12 bg-primary/10 dark:bg-primary/20 rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">ADHD coaching és terápia szakemberképzés</h1>
              <p className="text-lg text-foreground mb-4">
                Szia! Nea Clark vagyok, Angliában élő, magyar pszichoterapeuta, szupervízior, ADHD szakember.
              </p>
              <p className="text-muted-foreground mb-4">
                Az ADHD coaching és terápia elsajátítása a következőképpen történik:
              </p>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2 mb-4">
                <li>Elméleti ismeretek és gyakorlati stratégiák megtanulása</li>
                <li>Ezek kipróbálása a gyakorlatban az ügyfelekkel</li>
                <li>Visszatérés az anyagokhoz a gyakorlati alkalmazás közben</li>
                <li>Szupervízió igénybevétele a gyakorlati alkalmazás kompetens elősegítéséhez</li>
              </ol>
              <p className="text-muted-foreground mb-4">
                Ebben az anyagban megtalálsz mindent az 1. lépéshez.
              </p>
              <p className="text-lg text-muted-foreground">
                Fedezd fel részletes tananyagainkat és kezdd meg a szakmai fejlődésed az ADHD coaching és terápia területén!
              </p>
            </div>
            <img src={neaPhoto} alt="Nea Clark" className="w-64 h-auto rounded-lg shadow-lg object-cover flex-shrink-0" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Kurzusok és modulok</h2>
        <div className="space-y-8">
          {modules.map(module => <Card key={module.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <CardTitle className="text-2xl">{module.title}</CardTitle>
                <CardDescription className="text-base">{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {module.content ? (
                  <div className="text-muted-foreground space-y-4">
                    {module.content}
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    {module.videos.map(video => video.type === "download" ? (
                      video.downloadUrl?.startsWith('http') ? (
                        <a key={video.id} href={video.downloadUrl} target="_blank" rel="noopener noreferrer" className="block">
                          <Card className="hover:shadow-lg transition-shadow h-full">
                            <CardHeader>
                              <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                                <PlayCircle className="h-5 w-5 text-primary flex-shrink-0" />
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <User className="h-4 w-4 mr-2" />
                                {video.instructor}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-2" />
                                {video.duration}
                              </div>
                            </CardContent>
                          </Card>
                        </a>
                      ) : (
                        <Link key={video.id} to={video.downloadUrl || "/resources"} className="block">
                          <Card className="hover:shadow-lg transition-shadow h-full">
                            <CardHeader>
                              <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                                <PlayCircle className="h-5 w-5 text-primary flex-shrink-0" />
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <User className="h-4 w-4 mr-2" />
                                {video.instructor}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-2" />
                                {video.duration}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      )
                    ) : <Link key={video.id} to={`/video/${video.id}`} className="block">
                          <Card className="hover:shadow-lg transition-shadow h-full">
                            <CardHeader>
                              <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                                <PlayCircle className="h-5 w-5 text-primary flex-shrink-0" />
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <User className="h-4 w-4 mr-2" />
                                {video.instructor}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-2" />
                                {video.duration}
                              </div>
                              <div className="pt-2">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${video.type === "lecture" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                                  {video.type === "lecture" ? "Előadás" : "Interjú"}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>)}
                  </div>
                )}
              </CardContent>
            </Card>)}
        </div>

        <div className="mt-12 text-center">
          <Link to="/exam">
            <Button size="lg" className="text-lg px-8">
              Vizsga megkezdése
            </Button>
          </Link>
        </div>
      </div>
    </div>;
};
export default Courses;