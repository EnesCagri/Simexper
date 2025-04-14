"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Rocket,
  Atom,
  Waves,
  Gauge,
  Microscope,
  TestTube,
  ArrowRight,
} from "lucide-react";

export default function SimulationsPage() {
  const simulations = [
    {
      title: "Unity WebGL Demo",
      description: "3D Interactive Unity WebGL Demo",
      icon: <Rocket className="h-8 w-8 text-blue-500" />,
      href: "/webgl",
      color: "from-blue-500 to-cyan-400",
      comingSoon: false,
    },
    {
      title: "Quantum Mechanics",
      description: "Explore quantum phenomena and wave functions",
      icon: <Atom className="h-8 w-8 text-purple-500" />,
      href: "#",
      color: "from-purple-500 to-pink-400",
      comingSoon: true,
    },
    {
      title: "Wave Physics",
      description: "Simulate wave behavior and interference",
      icon: <Waves className="h-8 w-8 text-cyan-500" />,
      href: "#",
      color: "from-cyan-500 to-blue-400",
      comingSoon: true,
    },
    {
      title: "Thermodynamics",
      description: "Study heat transfer and energy flow",
      icon: <Gauge className="h-8 w-8 text-orange-500" />,
      href: "#",
      color: "from-orange-500 to-red-400",
      comingSoon: true,
    },
    {
      title: "Optics",
      description: "Explore light behavior and optical systems",
      icon: <Microscope className="h-8 w-8 text-emerald-500" />,
      href: "#",
      color: "from-emerald-500 to-green-400",
      comingSoon: true,
    },
    {
      title: "Chemistry",
      description: "Visualize chemical reactions and bonding",
      icon: <TestTube className="h-8 w-8 text-rose-500" />,
      href: "#",
      color: "from-rose-500 to-pink-400",
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-500">
          Unity Fizik Simülasyonları
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore interactive physics simulations and experiments in your
          browser. Learn complex concepts through hands-on virtual experiences.
        </p>

        {/* Simulations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulations.map((sim, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm hover:border-border duration-300 transition-all hover:shadow-lg"
            >
              <Link href="/webgl">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-br ${sim.color} bg-opacity-10`}
                    >
                      {sim.icon}
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {sim.title}
                        {sim.comingSoon && (
                          <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            Coming Soon
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>{sim.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full group-hover:translate-x-1 transition-transform duration-300"
                    variant={sim.comingSoon ? "secondary" : "default"}
                  >
                    {sim.comingSoon ? "Coming Soon" : "Launch Simulation"}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Link>

              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${sim.color}`}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
