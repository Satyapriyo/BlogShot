import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "../components/Footer/Footer";

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

const Landing = () => {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const { scrollY } = useScroll();
  const heroWordY = useTransform(scrollY, [0, 400], [0, -40]);
  const heroCardY = useTransform(scrollY, [0, 400], [0, 16]);

  const contents = [
    {
      n: "01",
      title: "An editor that disappears",
      body: "No toolbars fighting for attention. Markdown shortcuts, clean typography, and code blocks that read like a printed page.",
    },
    {
      n: "02",
      title: "Built to be read",
      body: "Every post renders in a measured column with proper line-height, so a 2,000-word essay feels as easy as a tweet.",
    },
    {
      n: "03",
      title: "Findable, not just postable",
      body: "Clean URLs, fast pages, and structured metadata mean your writing turns up where people are actually looking.",
    },
    {
      n: "04",
      title: "A real audience, not a feed",
      body: "Likes, comments, and saves are signal, not noise — see what resonates without a single autoplaying suggestion.",
    },
    {
      n: "05",
      title: "Know what's working",
      body: "Plain-language stats on views and read time, with none of the vanity-metric theater.",
    },
    {
      n: "06",
      title: "Your drafts stay yours",
      body: "Private by default until you hit publish. You decide who sees a piece before it's finished.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A18] [font-feature-settings:'liga','kern']">
      <Helmet>
        <title>BlogShot – Write, Publish, Be Read</title>
        <meta
          name="description"
          content="BlogShot is a quiet, well-made place to write and publish. A distraction-free editor, typography built for reading, and a real audience waiting."
        />
        <meta
          property="og:title"
          content="BlogShot – Write, Publish, Be Read"
        />
        <meta
          property="og:description"
          content="Start your blogging journey on a platform built for writers who want to be read, not scrolled past."
        />
        <link rel="canonical" href={origin ? `${origin}/` : undefined} />
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

      {/* Masthead
      <header className="border-b border-[#E3DDD0]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
          <span className="font-display text-2xl font-semibold tracking-tight">
            BlogShot
          </span>
          <nav className="hidden items-center gap-8 font-sans text-sm font-medium sm:flex">
            <Link
              to="/blogs"
              className="text-[#1A1A18]/70 hover:text-[#1A1A18] transition-colors"
            >
              Read
            </Link>
            <Link
              to="/newwrite"
              className="text-[#1A1A18]/70 hover:text-[#1A1A18] transition-colors"
            >
              Write
            </Link>
            <Link
              to="/newwrite"
              className="rounded-full bg-[#1A1A18] px-5 py-2 text-[#FFFFFF] transition-colors hover:bg-[#C75D3C]"
            >
              Start writing
            </Link>
          </nav>
        </div>
      </header> */}

      {/* Hero */}
      <main>
        <section className="relative mx-auto max-w-6xl overflow-hidden px-6 pt-16 pb-24 sm:px-8 sm:pt-24">
          <motion.span
            aria-hidden="true"
            style={{ y: heroWordY }}
            className="font-display pointer-events-none absolute -left-4 top-4 select-none text-[26vw] font-medium leading-none text-[#1A1A18]/[0.04] sm:text-[18vw]"
          >
            Write
          </motion.span>

          <div className="relative grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerParent}
              className="space-y-8"
            >
              <motion.p
                variants={fadeUp}
                className="font-mono text-xs uppercase tracking-[0.2em] text-[#7C8B6F]"
              >
                Issue No. 1 — Now in beta
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              >
                A page worth
                <br />
                <span className="italic text-[#C75D3C]">writing on.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="font-sans max-w-md text-lg leading-relaxed text-[#1A1A18]/70"
              >
                BlogShot strips away the noise so your words can do the work — a
                clean editor, considered typography, and readers who came to
                read.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-5 pt-2"
              >
                <Link
                  to="/newwrite"
                  className="font-sans inline-flex items-center gap-2 rounded-full bg-[#1A1A18] px-7 py-3.5 text-sm font-semibold text-[#FFFFFF] transition-all hover:bg-[#C75D3C] hover:gap-3"
                >
                  Start writing
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  to="/blogs"
                  className="font-sans inline-flex items-center text-sm font-semibold text-[#1A1A18] underline decoration-[#C75D3C] decoration-2 underline-offset-4 hover:decoration-4"
                >
                  Explore stories
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-4 border-t border-[#E3DDD0] pt-6"
              >
                <div className="flex -space-x-2.5">
                  {[
                    "photo-1525134479668-1bee5c7c6845",
                    "photo-1525130413817-d45c1d127c42",
                    "photo-1500648767791-00dcc994a43e",
                  ].map((id) => (
                    <img
                      key={id}
                      src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=80&q=80`}
                      alt=""
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-[#FFFFFF]"
                    />
                  ))}
                </div>
                <p className="font-sans text-sm text-[#1A1A18]/60">
                  <span className="font-semibold text-[#1A1A18]">
                    1,000+ writers
                  </span>{" "}
                  publishing this month
                </p>
              </motion.div>
            </motion.div>

            {/* Article preview clipping */}
            <motion.div
              style={{ y: heroCardY }}
              initial={{ opacity: 0, rotate: -1, y: 30 }}
              animate={{ opacity: 1, rotate: -1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ rotate: 0 }}
              className="relative mx-auto w-full max-w-md border border-[#1A1A18]/10 bg-white p-7 shadow-[0_30px_60px_-15px_rgba(26,26,24,0.15)]"
            >
              <div className="flex items-center justify-between border-b border-[#E3DDD0] pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                    alt="Sarah Johnson"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-sans text-sm font-semibold">
                      Sarah Johnson
                    </p>
                    <p className="font-mono text-[11px] text-[#1A1A18]/50">
                      Mar 15 · 5 min read
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wide text-[#C75D3C]">
                  Engineering
                </span>
              </div>

              <h2 className="font-display mt-5 text-2xl font-medium leading-snug">
                10 React optimizations nobody tells you about
              </h2>
              <p className="font-sans mt-3 text-sm leading-relaxed text-[#1A1A18]/65">
                Code splitting, memoization, and the lazy-loading tricks that
                actually move the needle.
              </p>

              <div className="mt-5 flex h-36 items-center justify-center bg-[#1A1A18] text-[#FFFFFF]">
                <span className="font-display text-3xl italic">
                  ⚡ Performance
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#E3DDD0] pt-4 font-mono text-xs text-[#1A1A18]/50">
                <span>234 likes</span>
                <span>42 comments</span>
                <span>156 saves</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-y border-[#E3DDD0] bg-[#1A1A18] text-[#FFFFFF]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/10 px-6 py-12 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
            {[
              { value: "1,000+", label: "Active writers" },
              { value: "50K+", label: "Monthly readers" },
              { value: "100K+", label: "Published articles" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="px-2 py-6 text-center sm:py-2"
              >
                <p className="font-display text-4xl font-medium">
                  {stat.value}
                </p>
                <p className="font-mono mt-1 text-xs uppercase tracking-[0.15em] text-[#FFFFFF]/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contents / features */}
        <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-14 flex flex-col gap-3 border-b border-[#E3DDD0] pb-8 sm:flex-row sm:items-end sm:justify-between"
          >
            <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Table of contents
            </h2>
            <p className="font-sans max-w-sm text-sm text-[#1A1A18]/60">
              Six reasons writers stay past their first post.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerParent}
            className="divide-y divide-[#E3DDD0]"
          >
            {contents.map((item) => (
              <motion.div
                key={item.n}
                variants={fadeUp}
                className="group grid grid-cols-[3.5rem_1fr] items-start gap-6 py-8 sm:grid-cols-[5rem_minmax(0,18rem)_1fr] sm:gap-10"
              >
                <span className="font-mono text-sm text-[#C75D3C]">
                  {item.n}
                </span>
                <h3 className="font-display text-xl font-medium leading-snug transition-colors group-hover:text-[#C75D3C] sm:text-2xl">
                  {item.title}
                </h3>
                <p className="font-sans text-[#1A1A18]/65 leading-relaxed sm:max-w-md">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-6 pb-24 sm:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-[#1A1A18] px-8 py-16 text-center text-[#FFFFFF] sm:px-16 sm:py-20"
          >
            <span
              aria-hidden="true"
              className="font-display pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none text-[12rem] italic leading-none text-white/[0.04] sm:text-[16rem]"
            >
              ¶
            </span>
            <h2 className="font-display relative text-4xl font-medium tracking-tight sm:text-5xl">
              Your first post is one
              <span className="italic text-[#C75D3C]"> sentence </span>
              away.
            </h2>
            <p className="font-sans relative mx-auto mt-5 max-w-xl text-[#FFFFFF]/65">
              No setup, no template to fight. Open the editor and start with the
              sentence you already have in your head.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-4">
              <Link
                to="/newwrite"
                className="font-sans inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] px-7 py-3.5 text-sm font-semibold text-[#1A1A18] transition-all hover:bg-[#C75D3C] hover:text-white hover:gap-3"
              >
                Start writing
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/blogs"
                className="font-sans inline-flex items-center rounded-full border border-[#FFFFFF]/30 px-7 py-3.5 text-sm font-semibold text-[#FFFFFF] transition-colors hover:border-[#FFFFFF]"
              >
                Browse stories
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
