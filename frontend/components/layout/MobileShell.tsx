"use client";

import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface Props {
  children: ReactNode;
  fullHeight?: boolean;
}

export default function MobileShell({ children, fullHeight = false }: Props) {
  return (
    <div className="h-dvh bg-[#08080F] sm:bg-app sm:flex sm:items-start sm:justify-center">
      {/* Full-width on mobile, max-430px centered on desktop */}
      <div className="relative w-full sm:max-w-[430px] h-dvh flex flex-col bg-[#08080F] overflow-hidden sm:shadow-2xl">
        {/* Page Content */}
        <main
          className={`flex-1 overflow-x-hidden ${
            fullHeight
              ? "overflow-hidden pb-0"
              : "overflow-y-auto pb-16"
          }`}
          style={{ scrollbarWidth: "none", minHeight: 0 }}
        >
          <style jsx>{`
            main::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {children}
        </main>

        {/* Bottom Nav */}
        <div className="flex-shrink-0">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}