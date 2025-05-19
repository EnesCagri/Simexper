import { NextRequest, NextResponse } from "next/server";
import { SimulationData } from "@/db/types";
import { simulationsList } from "@/db/utils";
import { promises as fs } from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/db/simulations.json");

// Helper function to write simulations
async function writeSimulations(simulations: SimulationData[]): Promise<void> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(simulations, null, 2));
  } catch (error) {
    console.error("Error writing simulations:", error);
  }
}

// GET all simulations
export async function GET() {
  try {
    return NextResponse.json(simulationsList);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch simulations" },
      { status: 500 }
    );
  }
}

// POST new simulation
export async function POST(request: NextRequest) {
  try {
    const simulation = await request.json();
    const simulations = [...simulationsList];

    // Generate slug from title
    const slug = simulation.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newSimulation: SimulationData = {
      ...simulation,
      id: Date.now().toString(),
      slug,
      reviews: [],
      relatedMaterials: {
        blogPosts: [],
        examQuestions: [],
        examStats: {
          totalQuestions: 0,
          lastAskedYear: "",
          frequencyPercentage: 0,
          averageDifficulty: 0,
        },
      },
    };

    simulations.push(newSimulation);
    await writeSimulations(simulations);

    return NextResponse.json(newSimulation);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create simulation" },
      { status: 500 }
    );
  }
}

// PUT update simulation
export async function PUT(request: NextRequest) {
  try {
    const updatedSimulation = await request.json();
    const simulations = [...simulationsList];

    const index = simulations.findIndex((s) => s.id === updatedSimulation.id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Simulation not found" },
        { status: 404 }
      );
    }

    // Generate new slug if title changed
    if (simulations[index].title !== updatedSimulation.title) {
      updatedSimulation.slug = updatedSimulation.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    simulations[index] = {
      ...simulations[index],
      ...updatedSimulation,
    };

    await writeSimulations(simulations);
    return NextResponse.json(simulations[index]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update simulation" },
      { status: 500 }
    );
  }
}

// DELETE simulation
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const simulations = [...simulationsList];

    const index = simulations.findIndex((s) => s.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Simulation not found" },
        { status: 404 }
      );
    }

    simulations.splice(index, 1);
    await writeSimulations(simulations);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete simulation" },
      { status: 500 }
    );
  }
}
