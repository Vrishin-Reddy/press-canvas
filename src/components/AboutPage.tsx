import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { motion } from 'framer-motion'
import { Eye, Handshake } from 'lucide-react'
import { Link } from 'react-router-dom'

const team = [
  { name: 'M.V.G. Reddy', role: 'Owner', specialty: 'Operations & Quality' },
  { name: 'Anita Rao', role: 'Lead Designer', specialty: 'Brand & Layout' },
  { name: 'Rahul Verma', role: 'Print Specialist', specialty: 'Offset & Flex' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
}

const stagger = { show: { transition: { staggerChildren: 0.12 } } }

export default function AboutPage(): JSX.Element {
  return (
    <main>
      {/* 1) Hero / Title only */}
      <section className="relative bg-gradient-to-br from-[#588B8B] via-[#a87568] to-[#b4533b] text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 relative">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">About Sri Sharada Press – A Legacy That Speaks in Print</h1>
            <div className="mx-auto mt-3 h-1 w-28 md:w-36 rounded-full bg-gradient-to-r from-white/70 via-white/90 to-white/70" />
          </motion.div>
        </div>
      </section>

      {/* 2) Our Story split */}
      <section className="bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          >
            {/* Left column */}
            <motion.div variants={fadeUp}>
              <p className="text-lg md:text-xl tracking-widest font-semibold text-[#588B8B] uppercase mb-3">OUR STORY</p>
              <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                At Sri Sharada Press, printing is more than ink on paper—it is an art form, a heritage, and a responsibility. For over 113 years, we’ve been transforming ideas into prints that inspire pride. From being the first Telugu printing press in Hyderabad to offering today’s offset, digital, and flex printing solutions, our story is one of resilience, trust, and innovation.
              </p>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-foreground/90">
                Through three generations, one promise has remained constant: quality, trust, and innovation.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Vision card */}
                <div className="rounded-xl bg-white dark:bg-neutral-800 shadow-sm ring-1 ring-[#588B8B]/15 p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3" aria-hidden>
                    <Eye className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base">Our Vision</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    To blend our rich heritage with modern technology and remain Hyderabad’s most trusted printing partner.
                  </p>
                </div>
                {/* Values card */}
                <div className="rounded-xl bg-white dark:bg-neutral-800 shadow-sm ring-1 ring-[#588B8B]/15 p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3" aria-hidden>
                    <Handshake className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base">Our Values</h3>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {['Trust', 'Quality', 'Service', 'Innovation'].map((v) => (
                      <li key={v}>
                        <Badge className="rounded-full border border-muted/40 bg-secondary/40 text-foreground">{v}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Right column (reduced height and invisible) */}
            <motion.div variants={fadeUp} className="flex invisible">
              <div className="aspect-[4/3] md:aspect-[5/4] w-full rounded-2xl bg-neutral-200 dark:bg-neutral-700" aria-label="Image placeholder" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4) Mission Quote Block */}
      <section className="bg-[#ffddce] dark:bg-[#ffddce]">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative max-w-3xl mx-auto">
            <div className="hidden md:block absolute -left-6 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-[#588B8B] via-[#F28F3B] to-[#C8553D]" aria-hidden />
            <h3 className="text-2xl font-semibold tracking-tight mb-4">Our Mission</h3>
            <blockquote className="italic text-xl text-foreground/90">
              “To deliver high-quality, affordable, and timely printing solutions for businesses, families, and individuals.”
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* 3) Our Team (3 people) */}
      <section className="bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Our Team</h3>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Meet the skilled professionals behind Sri Sharada Press who make your printing projects come to life.
            </p>
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {team.map((member) => (
              <motion.div key={member.name} variants={fadeUp} className="rounded-2xl bg-background ring-1 ring-[#588B8B]/15 p-6 shadow-sm transition-all md:hover:-translate-y-1 md:hover:ring-[#588B8B]/25">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{member.specialty}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6) CTA Section */}
      <section className="bg-[#588B8B] text-white">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Ready to Work With Us?</h3>
            <p className="mt-3 text-base md:text-lg opacity-90 max-w-2xl mx-auto">
              Experience quality printing services from a team that cares about your success.
            </p>
            <Button
              asChild
              className="mt-6 rounded-full bg-[#F28F3B] text-white hover:bg-[#e2710e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <Link to="/booking">Book Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}


