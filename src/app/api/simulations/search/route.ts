import { NextRequest, NextResponse } from "next/server";
import { SimulationData } from "@/db/types";
import { simulationsList } from "@/db/utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase() || "";

    const filteredSimulations = simulationsList.filter(
      (simulation) =>
        simulation.title.toLowerCase().includes(query) ||
        simulation.description.toLowerCase().includes(query) ||
        simulation.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query)
        )
    );

    return NextResponse.json(filteredSimulations);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to search simulations" },
      { status: 500 }
    );
  }
}
