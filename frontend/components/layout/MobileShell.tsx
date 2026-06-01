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
      <div className="relative w-full max-w-[430px] min-h-screen flex flex-col bg-[#08080F] overflow-hidden shadow-2xl">
        {/* Page Content */}
        <main
          className={`flex-1 overflow-y-auto overflow-x-hidden ${
            fullHeight ? "pb-0" : "pb-16"
          }`}
          style={{ scrollbarWidth: "none" }}
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