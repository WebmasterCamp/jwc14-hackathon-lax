"use client";

import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface Props {
  children: ReactNode;
  fullHeight?: boolean;
}

export default function MobileShell({ children, fullHeight = false }: Props) {
  return (
    <div className="min-h-screen bg-app flex items-start justify-center">
      {/* Constrain to mobile width on larger screens */}
      <div className="relative w-full max-w-[430px] h-screen flex flex-col bg-[#08080F] overflow-hidden shadow-2xl">
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

        {/* Bottom Nav — fixed at bottom of shell */}
        <div className="flex-shrink-0">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}