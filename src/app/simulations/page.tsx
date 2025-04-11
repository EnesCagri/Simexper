"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Atom,
  Waves,
  Rocket,
  Globe,
  Lightbulb,
  Scale,
  TestTube2,
} from "lucide-react";
import Link from "next/link";

const simulations = [
  {
    title: "Test Simulation",
    description: "Test the WebGL integration with this sample simulation",
    icon: TestTube2,
    category: "Testing",
    level: "All Levels",
    duration: "15 min",
    buildPath: "/webgl-app/Basic",
  },
  {
    title: "Quantum Mechanics",
    description:
      "Explore the fascinating world of quantum particles and their behavior",
    icon: Atom,
    category: "Advanced Physics",
    level: "University",
    duration: "45 min",
    buildPath: "/webgl-app/quantum",
  },
  {
    title: "Wave Interference",
    description:
      "Visualize how waves interact and create interference patterns",
    icon: Waves,
    category: "Classical Physics",
    level: "High School",
    duration: "30 min",
    buildPath: "/webgl-app/waves",
  },
  {
    title: "Projectile Motion",
    description: "Study the motion of objects under the influence of gravity",
    icon: Rocket,
    category: "Mechanics",
    level: "High School",
    duration: "25 min",
    buildPath: "/webgl-app/projectile",
  },
  {
    title: "Electromagnetic Fields",
    description: "Understand the behavior of electric and magnetic fields",
    icon: Globe,
    category: "Electromagnetism",
    level: "University",
    duration: "40 min",
    buildPath: "/webgl-app/electromagnetic",
  },
  {
    title: "Optics Lab",
    description: "Experiment with light, lenses, and optical phenomena",
    icon: Lightbulb,
    category: "Optics",
    level: "High School",
    duration: "35 min",
    buildPath: "/webgl-app/optics",
  },
  {
    title: "Thermodynamics",
    description: "Explore heat transfer and thermodynamic processes",
    icon: Scale,
    category: "Thermodynamics",
    level: "University",
    duration: "50 min",
    buildPath: "/webgl-app/thermodynamics",
  },
];

export default function SimulationsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-16">
      {/* Header */}
      <div className="border-b border-[hsl(var(--border))] bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4">
              Physics Simulations
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              Interactive Physics Labs
            </h1>
            <p className="text-muted-foreground mb-8">
              Explore our collection of interactive physics simulations designed
              to enhance your learning experience
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search simulations..."
                className="pl-10 border-[hsl(var(--border))] bg-card/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" size="sm">
            All Categories
          </Button>
          <Button variant="outline" size="sm">
            Mechanics
          </Button>
          <Button variant="outline" size="sm">
            Electromagnetism
          </Button>
          <Button variant="outline" size="sm">
            Thermodynamics
          </Button>
          <Button variant="outline" size="sm">
            Optics
          </Button>
          <Button variant="outline" size="sm">
            Quantum Physics
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulations.map((simulation, index) => {
            const Icon = simulation.icon;
            return (
              <motion.div
                key={simulation.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-[hsl(var(--border))] hover:border-primary/50 transition-colors bg-card/50">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{simulation.title}</CardTitle>
                    <CardDescription>{simulation.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{simulation.category}</Badge>
                      <Badge variant="outline">{simulation.level}</Badge>
                      <Badge variant="outline">{simulation.duration}</Badge>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/webgl?build=${simulation.buildPath}`}>
                        Start Simulation
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
