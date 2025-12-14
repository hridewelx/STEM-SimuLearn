import { SimulationConfig } from "../types/simulationTypes";
import { Dna } from "lucide-react";

export const biologySimulations: SimulationConfig[] = [
  // cellDivisionConfig,
  // dnaReplicationConfig,
];

export const cellDivisionPlaceholder: SimulationConfig = {
  id: "cell-division-1",
  name: "Cell Division (Mitosis)",
  description:
    "Watch the process of cell division and understand the stages of mitosis.",
  longDescription:
    "Explore the fascinating process of mitosis, where one cell divides into two identical daughter cells.",
  category: "biology",
  difficulty: "intermediate",
  duration: 25,
  objectives: [
    "Identify the phases of mitosis",
    "Understand chromosome behavior",
    "Learn about cell cycle regulation",
  ],
  tags: ["cell biology", "mitosis", "chromosomes", "cell cycle"],
  route: "/simulations/biology/cell-division",
  icon: Dna,
  simulationDetails: {
    howItWorks:
      "Cell division involves the replication of DNA and separation of chromosomes into two new nuclei.",
    keyConcepts: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
    controls: ["Start Division", "Pause", "Reset"],
    proTip: "Observe how chromosomes align during metaphase.",
  },
};
