import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useEquipment from '../../hooks/useEquipment';
import useEquipmentModel from '../../hooks/useEquipmentModel';
import useEquipmentState from '../../hooks/useEquipmentState';
import { IEquipment } from '../../interfaces/equipment';
import { IEquipmentModel } from '../../interfaces/equipmentModel';
import { IEquipmentState } from '../../interfaces/equipmentState';

function Home() {
  const [equipment, setEquipment] = useState<IEquipment[]>([]);
  const [equipmentModel, setEquipmentModel] = useState<IEquipmentModel[]>([]);
  const [equipmentState, setEquipmentState] = useState<IEquipmentState[]>([]);

  const { equipmentData, loading: equipmentLoading } = useEquipment();
  const { equipmentModelData, loading: equipmentModelLoading } =
    useEquipmentModel();
  const { equipmentStateData, loading: equipmentStateLoading } =
    useEquipmentState();

  useEffect(() => {
    setEquipment(equipmentData);
    setEquipmentModel(equipmentModelData);
    setEquipmentState(equipmentStateData);
  }, [equipmentData, equipmentModelData, equipmentStateData]);

  if (equipmentLoading || equipmentModelLoading || equipmentStateLoading)
    return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {equipment.map((e) => (
          <>
            <li key={e.id}>{e.name}</li>
            <Link to={`./equipmentdetail/${e.id}`}>{e.id}</Link>
          </>
        ))}
        {equipmentModel.map((e) => (
          <>
            <li key={e.id}>{e.name}</li>
            <Link to={`./equipmentdetail/${e.id}`}>{e.id}</Link>
          </>
        ))}
        {equipmentState.map((e) => (
          <>
            <li key={e.id}>{e.name}</li>
            <Link to={`./equipmentdetail/${e.id}`}>{e.id}</Link>
          </>
        ))}
      </ul>
    </div>
  );
}

export default Home;
