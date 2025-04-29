import { NextResponse } from "next/server";
import { SimulationData } from "@/db/types";
import { promises as fs } from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/db/simulations.json");

async function readSimulations(): Promise<SimulationData[]> {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading simulations:", error);
    return [];
  }
}

export async function GET(
  request: Request,
  { params }: { params: { difficulty: string } }
) {
  try {
    const difficulty = params.difficulty;
    const simulations = await readSimulations();
    const filteredSimulations = simulations.filter(
      (simulation) => simulation.difficulty === difficulty
    );

    return NextResponse.json(filteredSimulations);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch simulations by difficulty" },
      { status: 500 }
    );
  }
}
