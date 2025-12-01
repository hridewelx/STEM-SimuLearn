import { useParams, Navigate } from 'react-router-dom';
import ExperimentDetailPage from './ExperimentDetailPage';
import { getSimulationByRoute } from '../simulations/registry';

const SimulationDetailPage = () => {
  const { category, simulationId } = useParams<{ category: string; simulationId: string }>();
  
  // Find the simulation config from registry
  const route = `/simulations/${category}/${simulationId}`;
  const config = getSimulationByRoute(route);

  // If simulation not found, redirect to category page
  if (!config) {
    return <Navigate to={`/simulations/${category}`} replace />;
  }

  return <ExperimentDetailPage config={config} />;
};

export default SimulationDetailPage;
