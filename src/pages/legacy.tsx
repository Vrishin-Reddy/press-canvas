import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";

import {
  Sparkles,
  History,
  Stamp,
  ArrowRight,
  CornerDownRight,
  Medal,
  Clock,
  BookOpen,
  Link as LinkIcon,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

type TocItem = {
  id: string;
  label: string;
  icon?: JSX.Element;
};

const tocItems: TocItem[] = [
  { id: "intro", label: "Intro", icon: <History className="h-4 w-4" /> },
  { id: "y1912", label: "1912" },
  { id: "y1967", label: "1967" },
  { id: "y1993", label: "1993" },
  { id: "y2002", label: "2002" },
  { id: "y2005", label: "2005" },
  { id: "y2012", label: "2012" },
  { id: "values", label: "Values" },
  { id: "today", label: "Today" },
  { id: "craft", label: "Craft" },
  { id: "future", label: "Future" },
];

const sectionIds = tocItems.map((t) => t.id);

const Legacy = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>("intro");
  const observersRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as Element[];

    if (observersRef.current) observersRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    elements.forEach((el) => observer.observe(el));
    observersRef.current = observer;
    return () => observer.disconnect();
  }, []);

  const MotionDiv = prefersReducedMotion ? ("div" as any) : motion.div;

  const kpis = useMemo(
    () => [
      { label: "113+ Years" },
      { label: "3 Generations" },
      { label: "Offset · Digital · Flex" },
    ],
    []
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        aria-labelledby="legacy-hero"
        className="relative overflow-hidden bg-gradient-to-r from-brand-dark-cyan-500 to-brand-jasper-500 text-primary-foreground"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.brand.dark-cyan.DEFAULT)/25,transparent_60%)]" />
        <MotionDiv
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center"
        >
          <h1 id="legacy-hero" className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Our Legacy – Printing History Since 1912
          </h1>
          <div className="mx-auto mt-4 mb-6 w-28 md:w-36 h-[4px] rounded-full bg-gradient-to-r from-brand-tangerine-500 to-brand-jasper-500" />
          <p className="text-base md:text-lg opacity-90">
            A Century of Excellence – From the Nizam’s Hyderabad to Today’s Digital World
          </p>
        </MotionDiv>
      </section>

      {/* Meta bar */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 md:py-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage aria-current="page">Legacy</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-2">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Badge variant="secondary" className="rounded-full">Since 1912</Badge>
                </HoverCardTrigger>
                <HoverCardContent align="end" className="max-w-sm">
                  The press traces its roots to 1912 in Hyderabad, serving families, institutions, and businesses across generations.
                </HoverCardContent>
              </HoverCard>

              <div className="flex flex-wrap gap-2">
                {kpis.map((k) => (
                  <Badge key={k.label} className="rounded-full bg-background border border-muted/50 text-foreground">{k.label}</Badge>
                ))}
              </div>
            </div>
          </div>
          <Separator className="mt-4" />
        </div>
      </section>

      {/* Content + TOC */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] gap-8 md:gap-10">
          {/* TOC - Mobile Accordion */}
          <div className="md:hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value="toc">
                <AccordionTrigger className="text-sm">On this page</AccordionTrigger>
                <AccordionContent>
                  <nav aria-label="Table of contents" className="space-y-2">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
                          activeId === item.id ? "bg-brand-tangerine-500/10 text-foreground border border-brand-tangerine-500/30" : "hover:bg-muted/50"
                        }`}
                      >
                        <CornerDownRight className="h-4 w-4 opacity-70" />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </nav>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* TOC - Desktop Sticky */}
          <aside className="hidden md:block">
            <Card className="sticky top-24 rounded-2xl border-muted/30 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium tracking-wide">On this page</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-14rem)] pr-2">
                  <nav aria-label="Table of contents" className="space-y-1.5">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`group relative flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                          activeId === item.id ? "bg-brand-tangerine-500/10 border border-brand-tangerine-500/30" : "hover:bg-muted/50"
                        }`}
                      >
                        <span className={`absolute left-0 h-full w-[3px] rounded-full ${activeId === item.id ? "bg-brand-tangerine-500" : "bg-transparent"}`} />
                        <CornerDownRight className="h-4 w-4 opacity-70" />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </nav>
                </ScrollArea>
              </CardContent>
            </Card>
          </aside>

          {/* Main content */}
          <div className="space-y-12 md:space-y-16">
            {/* Intro */}
            <section id="intro" aria-labelledby="intro-title" className="scroll-mt-24">
              <div className="mb-4">
                <Badge variant="secondary" className="rounded-full text-sm md:text-base px-3.5 py-1">
                  Our Legacy – The Story of Sri Sharada Press
                </Badge>
              </div>
              <p id="intro-title" className="text-base md:text-lg leading-relaxed">
                The journey of Sri Sharada Press is not merely the tale of a printing business — it is the chronicle of a family’s unwavering commitment to innovation, quality, and service. For over a century, through changing times and generations, our press has stood as a testament to how vision and perseverance can build a legacy that endures.
              </p>
            </section>

            <Separator />

            {/* Timeline */}
            <section aria-label="Timeline" className="relative pl-10 md:pl-16">
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

              {/* 1912 */}
              <div id="y1912" className="relative scroll-mt-24">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute -left-[7px] md:-left-[5px] mt-2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-brand-dark-cyan-500 to-brand-jasper-500 ring-4 ring-background" />
                  </TooltipTrigger>
                  <TooltipContent>1912 – The Beginning</TooltipContent>
                </Tooltip>
                <MotionDiv whileHover={prefersReducedMotion ? undefined : { y: -2 }} className="mb-8">
                  <Card className="rounded-2xl border border-muted/30 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-full">1912</Badge>
                        <CardTitle className="text-xl flex items-center gap-2"><History className="h-5 w-5" />The Beginning – A Pioneer’s Dream</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 text-base leading-relaxed">
                      <p>Our story began in 1912, when Late Sri. Sri Sai Reddy, a man of courage and foresight, laid the foundation of what would become one of Hyderabad’s most enduring printing institutions. At a time when printing was still considered a rare craft, he envisioned a future where high-quality print would become central to communication, culture, and commerce.</p>
                      <p>It is believed that Sri Sharada Press was the first Telugu printing press in Hyderabad—a pioneering contribution to the literary and cultural fabric of the city. While records have faded with time, the impact of his vision remains alive in every chapter of our history. His mission was simple yet profound: to make printing accessible, meaningful, and lasting.</p>
                    </CardContent>
                  </Card>
                </MotionDiv>
              </div>

              {/* 1967 */}
              <div id="y1967" className="relative scroll-mt-24">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute -left-[7px] md:-left-[5px] mt-2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-brand-dark-cyan-500 to-brand-jasper-500 ring-4 ring-background" />
                  </TooltipTrigger>
                  <TooltipContent>1967 – The Second Chapter</TooltipContent>
                </Tooltip>
                <MotionDiv whileHover={prefersReducedMotion ? undefined : { y: -2 }} className="mb-8">
                  <Card className="rounded-2xl border border-muted/30 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-full">1967</Badge>
                        <CardTitle className="text-xl flex items-center gap-2"><Stamp className="h-5 w-5" />The Second Chapter – Building Strength</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 text-base leading-relaxed">
                      <p>In 1967, the legacy was entrusted to his son-in-law, Late Sri. Minkuri Venkat Reddy, whose discipline and dedication shaped the next great era of our growth. What began as a modest letterpress under his stewardship blossomed into a modernized printing establishment.</p>
                      <p>From the Wharfedale Printing Press to automatic printing machines, every technological leap was embraced with open arms. It was during his leadership that screen printing was added, expanding the possibilities for creativity. For Venkat Reddy, printing was not only a business—it was a responsibility to preserve tradition while preparing for the future. He worked tirelessly, building trust with clients who soon came to see Sri Sharada Press as a name synonymous with quality.</p>
                    </CardContent>
                  </Card>
                </MotionDiv>
              </div>

              {/* 1993 */}
              <div id="y1993" className="relative scroll-mt-24">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute -left-[7px] md:-left-[5px] mt-2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-brand-dark-cyan-500 to-brand-jasper-500 ring-4 ring-background" />
                  </TooltipTrigger>
                  <TooltipContent>1993 – A Bold New Era</TooltipContent>
                </Tooltip>
                <MotionDiv whileHover={prefersReducedMotion ? undefined : { y: -2 }} className="mb-8">
                  <Card className="rounded-2xl border border-muted/30 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-full">1993</Badge>
                        <CardTitle className="text-xl flex items-center gap-2"><Sparkles className="h-5 w-5" />The Third Chapter – A Bold New Era</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 text-base leading-relaxed">
                      <p>The seeds of tradition took root in the next generation when his son, Minkuri Venugopal Reddy, joined the family business. Armed with fresh ideas, modern vision, and a deep respect for the values of his forefathers, he began writing a bold new chapter.</p>
                      <p>In 1993, he introduced offset printing, revolutionizing the scope of services. What once centered around pamphlets and wedding cards soon expanded into brochures, corporate material, and high-volume commercial work. The press had evolved into a one-stop destination for individuals, families, and businesses alike.</p>
                    </CardContent>
                  </Card>
                </MotionDiv>
              </div>

              {/* 2002 */}
              <div id="y2002" className="relative scroll-mt-24">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute -left-[7px] md:-left-[5px] mt-2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-brand-dark-cyan-500 to-brand-jasper-500 ring-4 ring-background" />
                  </TooltipTrigger>
                  <TooltipContent>2002 – Digital Leap</TooltipContent>
                </Tooltip>
                <MotionDiv whileHover={prefersReducedMotion ? undefined : { y: -2 }} className="mb-8">
                  <Card className="rounded-2xl border border-muted/30 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-full">2002</Badge>
                        <CardTitle className="text-xl flex items-center gap-2"><Clock className="h-5 w-5" />Digital Leap</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="text-base leading-relaxed">
                      <p>2002 marked our leap into digital printing, bringing speed, precision, and versatility to our customers.</p>
                    </CardContent>
                  </Card>
                </MotionDiv>
              </div>

              {/* 2005 */}
              <div id="y2005" className="relative scroll-mt-24">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute -left-[7px] md:-left-[5px] mt-2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-brand-dark-cyan-500 to-brand-jasper-500 ring-4 ring-background" />
                  </TooltipTrigger>
                  <TooltipContent>2005 – Flex Arrives</TooltipContent>
                </Tooltip>
                <MotionDiv whileHover={prefersReducedMotion ? undefined : { y: -2 }} className="mb-8">
                  <Card className="rounded-2xl border border-muted/30 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-full">2005</Badge>
                        <CardTitle className="text-xl flex items-center gap-2"><Medal className="h-5 w-5" />Flex Arrives</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="text-base leading-relaxed">
                      <p>2005 saw the arrival of our first flex machine with jarheads, transforming outdoor and advertising printing with vivid, larger-than-life designs.</p>
                    </CardContent>
                  </Card>
                </MotionDiv>
              </div>

              {/* 2012 */}
              <div id="y2012" className="relative scroll-mt-24">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute -left-[7px] md:-left-[5px] mt-2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-brand-dark-cyan-500 to-brand-jasper-500 ring-4 ring-background" />
                  </TooltipTrigger>
                  <TooltipContent>2012 – Staying Ahead</TooltipContent>
                </Tooltip>
                <MotionDiv whileHover={prefersReducedMotion ? undefined : { y: -2 }} className="mb-8">
                  <Card className="rounded-2xl border border-muted/30 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="rounded-full">2012</Badge>
                        <CardTitle className="text-xl flex items-center gap-2"><BookOpen className="h-5 w-5" />Staying Ahead</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="text-base leading-relaxed">
                      <p>By 2012, we had embraced the Allwin Konica flex machine with 512 heads, a testament to our philosophy of always staying one step ahead of market demands.</p>
                    </CardContent>
                  </Card>
                </MotionDiv>
              </div>
            </section>

            <Separator />

            {/* Values */}
            <section id="values" aria-labelledby="values-title" className="scroll-mt-24 space-y-4">
              <h2 id="values-title" className="font-heading text-2xl md:text-3xl tracking-tight">Values – The Constant</h2>
              <p className="text-base md:text-lg leading-relaxed">
                Through every generation and every machine upgrade, one constant has guided Sri Sharada Press: our belief in trust, quality, and service.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Our customers have never been just clients; they have been our partners. From families who entrusted us with printing their wedding cards to businesses who relied on us for campaigns and branding, every project has been treated with the same care and dedication. Each print that leaves our press carries not just ink on paper but the weight of our promise.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "Trust",
                  "Quality",
                  "Service",
                  "Innovation",
                ].map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-2 rounded-full border border-brand-tangerine-500/30 bg-background/80 supports-[backdrop-filter]:bg-background/60 px-4 py-1.5 text-sm font-semibold text-brand-dark-cyan-500 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-brand-dark-cyan-500 to-brand-jasper-500" aria-hidden />
                    {pill}
                  </span>
                ))}
              </div>
            </section>

            <Separator />

            {/* Today */}
            <section id="today" aria-labelledby="today-title" className="scroll-mt-24">
              <Card className="rounded-2xl border-muted/30 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5" />Today – A Bridge Between Tradition and Tomorrow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-base leading-relaxed">
                  <p>Now, under the leadership of Minkuri Venugopal Reddy, Sri Sharada Press continues to balance heritage with modernity. We are not only custodians of a century-old tradition but also innovators adapting to new technologies and trends.</p>
                  <blockquote className="border-l-4 border-brand-jasper-500/60 pl-4 italic text-sm md:text-base">
                    Our story is not just about machines and methods—it is about the people behind the press, the family that has carried this vision forward, and the generations of customers who made us a part of their stories.
                  </blockquote>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Craft */}
            <section id="craft" aria-labelledby="craft-title" className="scroll-mt-24">
              <div className="space-y-4">
                <h2 id="craft-title" className="font-heading text-2xl md:text-3xl tracking-tight">Craft Statement</h2>
                <blockquote className="relative rounded-2xl border border-brand-jasper-500/30 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6 md:p-8">
                  <span aria-hidden className="absolute -top-4 left-6 text-6xl text-brand-jasper-500/30 select-none">“</span>
                  <p className="text-lg md:text-xl leading-relaxed italic font-medium">
                    At Sri Sharada Press, we believe printing is more than production. It is a living craft, a way of preserving memories, celebrating milestones, and shaping ideas into reality. From the ink that touched the first Telugu prints in Hyderabad to today’s vibrant digital flex prints, our essence has remained unchanged: to deliver work that inspires pride, connection, and trust.
                  </p>
                </blockquote>
              </div>
            </section>

            <Separator />

            {/* Future */}
            <section id="future" aria-labelledby="future-title" className="scroll-mt-24 space-y-4">
              <h2 id="future-title" className="font-heading text-2xl md:text-3xl tracking-tight">Future – Looking Ahead – The Promise Continues</h2>
              <p className="text-base md:text-lg leading-relaxed">
                As we step into the future, the legacy of Late Sri. Sri Sai Reddy and Late Sri. Minkuri Venkat Reddy lives on in every project we undertake. The promise remains the same as it was in 1912: to blend heritage with innovation, to honor the trust of our customers, and to keep advancing so that Sri Sharada Press will continue to thrive for the next hundred years and beyond.
              </p>
              <div className="pt-2">
                <Progress value={66} className="h-2" />
              </div>
            </section>

            {/* Footer CTA */}
            <section aria-label="Call to action" className="rounded-2xl bg-primary text-primary-foreground p-6 md:p-8">
              <p className="text-sm opacity-80 mb-2">From Letterpress to Digital – A Journey of Innovation.</p>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-heading text-xl md:text-2xl tracking-tight">Ready to print your next chapter?</h3>
                  <p className="text-sm opacity-90">Book a consultation or head back to explore more.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-brand-tangerine-500 hover:bg-brand-tangerine-400 text-brand-white">
                    <Link to="/booking">Book Now</Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link to="/" className="inline-flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Legacy;


