import { NextRequest, NextResponse } from "next/server";
import { SimulationData } from "@/db/types";
import { simulationsList } from "@/db/utils";

// DIFFICULTY
export async function GET(
  req: NextRequest,
  context: { params: { difficulty: string } }
) {
  try {
    const { difficulty } = context.params;
    const filtered = simulationsList.filter(
      (sim) => sim.difficulty === difficulty
    );

    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch simulations by difficulty" },
      { status: 500 }
    );
  }
}
