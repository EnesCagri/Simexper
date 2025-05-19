import { NextRequest, NextResponse } from "next/server";
import { SimulationData } from "@/db/types";
import { simulationsList } from "@/db/utils";

// CATEGORY
export async function GET(
  req: NextRequest,
  context: { params: { category: string } }
) {
  try {
    const { category } = context.params;
    const filtered = simulationsList.filter((sim) => sim.category === category);

    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch simulations by category" },
      { status: 500 }
    );
  }
}
