import Footer from "../../components/Footer/Footer";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const links = [
  { name: "Open roles", href: "#" },
  { name: "Internship program", href: "#" },
  { name: "Our values", href: "#" },
  { name: "Meet our leadership", href: "#" },
];

const stats = [
  { n: "01", value: "12", label: "Offices worldwide" },
  { n: "02", value: "300+", label: "Full-time colleagues" },
  { n: "03", value: "40", label: "Hours per week" },
  { n: "04", value: "Unlimited", label: "Paid time off" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-white text-[#1A1A18]">
      <Helmet>
        <title>About BlogShot – Learn more about our blogging platform</title>
        <meta
          name="description"
          content="Discover the story behind BlogShot, our mission, and how we help writers share their ideas with the world."
        />
        <meta
          property="og:title"
          content="About BlogShot – Learn more about our blogging platform"
        />
        <meta
          property="og:description"
          content="BlogShot is built to empower storytellers and bloggers with a beautiful, easy-to-use writing experience."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <style>{`
        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .font-sans { font-family: 'Inter', sans-serif; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1A1A18] py-24 text-white sm:py-32">
        <span
          aria-hidden="true"
          className="font-display pointer-events-none absolute -right-10 -top-10 select-none text-[26vw] font-medium leading-none text-white/[0.04] sm:text-[16vw]"
        >
          About
        </span>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerParent}
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-[0.2em] text-[#C75D3C]"
            >
              Who we are
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display mt-4 text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl"
            >
              Stories deserve a
              <br />
              <span className="italic text-[#C75D3C]">good home.</span>
            </motion.h1>
            <motion.div
              variants={fadeUp}
              className="font-sans mt-8 space-y-5 text-base leading-relaxed text-white/70 sm:text-lg"
            >
              <p>
                At BlogShot, we believe stories can inspire, connect, and
                transform. Whether you're a seasoned writer or just starting
                out, this is the place where your thoughts can take flight.
              </p>
              <p>
                Our platform is a community where ideas are shared, creativity
                flourishes, and every voice is valued — from personal essays to
                professional deep dives, from quick tips to long reads.
              </p>
              <p>
                Great ideas can come from anywhere, and here they find a home.
                With a simple interface and a network of fellow writers and
                readers, BlogShot helps you grow an idea into something that
                matters.
              </p>
            </motion.div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerParent}
            className="font-sans mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8 text-sm font-semibold"
          >
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                variants={fadeUp}
                className="inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-[#C75D3C]"
              >
                {link.name}
                <span aria-hidden="true">&rarr;</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerParent}
            className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="border-t border-white/10 pt-5"
              >
                <dt className="font-mono text-xs text-[#C75D3C]">{stat.n}</dt>
                <dd className="font-display mt-3 text-3xl font-medium tracking-tight">
                  {stat.value}
                </dd>
                <dt className="font-sans mt-1 text-sm text-white/60">
                  {stat.label}
                </dt>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <span
          aria-hidden="true"
          className="font-display pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 select-none text-[14rem] italic leading-none text-[#1A1A18]/[0.03] sm:text-[18rem]"
        >
          “
        </span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-3xl"
        >
          <p className="font-mono text-center text-xs uppercase tracking-[0.2em] text-[#C75D3C]">
            What writers say
          </p>
          <figure className="mt-10">
            <blockquote className="font-display text-center text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              expedita voluptas culpa sapiente alias molestiae. Numquam corrupti
              in laborum sed rerum et corporis."
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-3">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="h-11 w-11 rounded-full object-cover ring-1 ring-[#E3DDD0]"
              />
              <div className="font-sans text-left text-sm">
                <p className="font-semibold text-[#1A1A18]">Judith Black</p>
                <p className="text-[#1A1A18]/55">CEO of Workcation</p>
              </div>
            </figcaption>
          </figure>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
