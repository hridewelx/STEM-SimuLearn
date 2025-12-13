import { SimulationConfig } from "../../types/simulationTypes";
import { LeChatelierIcon } from "../../../assets/icons/LeChatelierIcon";
import { LeChatelierParams } from "./types";

export const LeChatelierConfig: SimulationConfig = {
  id: "le-chatelier-1",
  name: "Le Chatelier's Principle",
  description:
    "Explore how chemical equilibrium responds to changes in temperature, pressure, and concentration through interactive particle simulations.",
  longDescription:
    "This simulation demonstrates Le Chatelier's Principle - when a system at equilibrium is disturbed, it shifts to counteract the change and establish a new equilibrium. Watch particles react in real-time as you adjust temperature, pressure, and concentration. See the equilibrium shift visually and understand the underlying chemistry through animated particle collisions and transformations.",
  category: "chemistry",
  difficulty: "intermediate",
  duration: 25,
  objectives: [
    "Understand Le Chatelier's Principle and equilibrium dynamics",
    "Observe how temperature affects equilibrium position",
    "Analyze the effect of pressure changes on gaseous equilibria",
    "Explore concentration changes and equilibrium shifts",
    "Differentiate between endothermic and exothermic reactions",
  ],
  tags: [
    "equilibrium",
    "le chatelier",
    "thermodynamics",
    "reaction rates",
    "concentration",
    "pressure",
    "temperature",
  ],
  route: "/simulations/chemistry/le-chatelier",
  icon: LeChatelierIcon,
  simulationDetails: {
    howItWorks: `This simulation models a reversible chemical reaction at equilibrium. Particles represent reactants (blue) and products (orange). The forward and reverse reactions occur simultaneously at rates that depend on concentration, temperature, and pressure. When you change a condition, watch as the system shifts to counteract your change - this is Le Chatelier's Principle in action!`,
    keyConcepts: [
      "Equilibrium is dynamic - reactions continue in both directions",
      "Increasing temperature favors the endothermic direction",
      "Increasing pressure favors the side with fewer gas molecules",
      "Adding a substance shifts equilibrium away from that substance",
      "The equilibrium constant K changes only with temperature",
    ],
    controls: [
      "Choose reaction type (exothermic or endothermic forward reaction)",
      "Adjust temperature using the slider",
      "Change pressure/volume with the pressure control",
      "Add or remove reactants and products",
      "Observe the Q vs K relationship and shift direction",
      "Click Start to begin the simulation",
    ],
    proTip:
      "Try making a sudden large change (like doubling the temperature) to see a dramatic equilibrium shift, then watch as the system gradually reaches its new equilibrium position!",
  },
};

export const defaultLeChatelierParams: LeChatelierParams = {
  selectedReactionId: "haber",
  temperature: 300, // Kelvin
  pressure: 1, // atm
  reactantConcentration: 50,
  productConcentration: 50,
  volume: 100, // arbitrary units for visualization
};
