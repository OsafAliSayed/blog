"use client"

import { useEffect, useState } from 'react';
import { Code, Database, Globe, Cpu, Smartphone, Palette, Terminal, Layers } from 'lucide-react';



// Simple debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <div className="space-y-8">

          {/* Welcome Text */}
          <div className="space-y-4">
            <h2 className="text-lg text-muted-foreground font-medium">
              Welcome to
            </h2>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="text-primary">Osaf's</span>{' '}
              <span className="text-foreground">Blog.</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A platform where you'll find the right content to help you 
            improve your skills and grow your knowledge.
          </p>

        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50 pointer-events-none" />
    </section>
  );
}
