"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* Animated gradient / shapes background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-8 -translate-x-1/2 transform blur-3xl opacity-30 animate-rotate-slow">
          <div className="h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-300 via-fuchsia-300 to-rose-300 opacity-70" />
        </div>
        <div className="absolute right-10 bottom-10 blur-2xl opacity-20">
          <div className="h-56 w-56 rounded-full bg-gradient-to-br from-cyan-200 to-blue-300 animate-pulse-slow" />
        </div>
      </div>

      <main className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-12 rounded-2xl bg-white/90 p-12 shadow-2xl dark:bg-black/70 sm:items-start">
        {/* Top logo */}
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/next.svg"
              alt="Next.js logo"
              width={56}
              height={24}
              className="dark:invert"
              priority
            />
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
              deepakjangid.in
            </span>
          </div>

          {/* Mini animated rocket icon */}
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <svg
                viewBox="0 0 24 24"
                className="absolute -right-0 top-0 h-10 w-10 animate-rocket"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M14.5 9.5l6 6-1.5 1.5-6-6M14.5 9.5l-3-3-7 3 7-3 3 3z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-500"
                />
                <circle cx="6.5" cy="14.5" r="0.8" fill="orange" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex w-full flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
            We’re cooking something amazing 🍳
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Our website is currently in progress. We’re polishing the experience
            and will be live very soon. Meanwhile you can reach out or follow
            progress below.
          </p>

          {/* Progress / status */}
          <div className="w-full max-w-2xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Launch progress
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">45%</span>
            </div>

            {/* Animated progress bar */}
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-400 to-amber-400"
                style={{ width: "45%" }}
              />
              {/* moving stripes overlay */}
              <div className="absolute inset-0 h-full animate-stripes bg-[linear-gradient(90deg,rgba(255,255,255,0.06) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.06) 50%,rgba(255,255,255,0.06) 75%,transparent 75%,transparent)] bg-[length:40px_40px]" />
            </div>

            {/* small status badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-white/5 dark:text-zinc-300">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Alpha
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-white/5 dark:text-zinc-300">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-bounce-slow" />
                Working on design
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-white/5 dark:text-zinc-300">
                <span className="inline-block h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                Notifications
              </span>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[200px]"
            href="mailto:noreply@ralthr.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </a>

        </div>

        {/* footer small */}
        <div className="mt-2 w-full text-sm text-zinc-400">
          <span>Want updates? Subscribe or reach me at </span>
          <a className="font-medium text-zinc-700 dark:text-zinc-200" href="mailto:deepak@deepakjangid.in">
            deepak@deepakjangid.in
          </a>
        </div>
      </main>

      {/* Inline styles for animations (Tailwind + a few custom keyframes) */}
      <style jsx>{`
        /* slow rotation for big gradient blob */
        @keyframes rotate-slow {
          from {
            transform: translateX(-50%) rotate(0deg);
          }
          to {
            transform: translateX(-50%) rotate(360deg);
          }
        }
        .animate-rotate-slow {
          animation: rotate-slow 40s linear infinite;
        }

        /* slow pulsation */
        @keyframes pulse-slow {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.6;
          }
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        /* stripes moving across the progress bar */
        @keyframes stripes {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 40px 0;
          }
        }
        .animate-stripes {
          animation: stripes 1.2s linear infinite;
          mix-blend-mode: overlay;
        }

        /* rocket float effect */
        @keyframes rocket {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(-6deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        .animate-rocket {
          animation: rocket 2.6s ease-in-out infinite;
          color: #ffb020;
        }

        /* small slow bounce for badge indicator */
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
