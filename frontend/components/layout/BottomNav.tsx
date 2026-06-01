"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Trophy, BarChart2, ShieldCheck, CircleUser } from "lucide-react";

const TABS = [
  { href: "/",            label: "Home",    Icon: Home        },
  { href: "/leaderboard", label: "Leaders", Icon: Trophy      },
  { href: "/history",     label: "History", Icon: BarChart2   },
  { href: "/focus",       label: "Focus",   Icon: ShieldCheck },
  { href: "/avatar",      label: "Avatar",  Icon: CircleUser  },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav flex items-center justify-around px-2
                    bg-bg-surface border-t border-bg-border"
         style={{ height: "calc(64px + env(safe-area-inset-bottom, 0px))", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      {TABS.map(({ href, label, Icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1 group">
            <motion.div
              animate={{ y: active ? -1 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative flex flex-col items-center gap-0.5"
            >
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute -inset-2 rounded-xl"
                  style={{ background: "rgba(255,138,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                className="relative z-10 transition-colors duration-200"
                style={{ color: active ? "#FF8A00" : "rgba(255,255,255,0.4)" }}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span
                className="relative z-10 text-[10px] font-medium tracking-wide transition-colors duration-200"
                style={{ color: active ? "#FF8A00" : "rgba(255,255,255,0.4)" }}
              >
                {label}
              </span>
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}