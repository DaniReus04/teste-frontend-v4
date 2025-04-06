import { useEffect, useState } from 'react';
import useEquipment from '../../hooks/useEquipment';
import useEquipmentModel from '../../hooks/useEquipmentModel';
import useEquipmentState from '../../hooks/useEquipmentState';
import useEquipmentStateHistory from '../../hooks/useEquipmentStateHistory';
import { IEquipment } from '../../interfaces/equipment';
import { IEquipmentModel } from '../../interfaces/equipmentModel';
import { IEquipmentState } from '../../interfaces/equipmentState';
import { IEquipmentTableValues } from '../../interfaces/equipmentTableValues';
import { IEquipmentStateHistory } from '../../interfaces/equipmentStateHistory';
import EquipmentTable from '../../components/equipmentTable';

function Home() {
  const [equipment, setEquipment] = useState<IEquipment[]>([]);
  const [equipmentModel, setEquipmentModel] = useState<IEquipmentModel[]>([]);
  const [equipmentState, setEquipmentState] = useState<IEquipmentState[]>([]);
  const [equipmentStateHistory, setEquipmentStateHistory] = useState<
    IEquipmentStateHistory[]
  >([]);
  const [equipmentTableValues, setEquipmentTableValues] = useState<
    IEquipmentTableValues[]
  >([]);

  const { equipmentData, loading: equipmentLoading } = useEquipment();
  const { equipmentModelData, loading: equipmentModelLoading } =
    useEquipmentModel();
  const { equipmentStateData, loading: equipmentStateLoading } =
    useEquipmentState();
  const { equipmentStateHistoryData, loading: equipmentStateHistoryLoading } =
    useEquipmentStateHistory();

  useEffect(() => {
    setEquipment(equipmentData);
    setEquipmentModel(equipmentModelData);
    setEquipmentState(equipmentStateData);
    setEquipmentStateHistory(equipmentStateHistoryData);
  }, [
    equipmentData,
    equipmentModelData,
    equipmentStateData,
    equipmentStateHistoryData,
  ]);

  useEffect(() => {
    const mergeEquipmentData = () => {
      const mergedData = equipment.map((equip) => {
        const id = equipment.find((e) => e.id === equip.id);
        const model = equipmentModel.find(
          (m) => m.id === equip.equipmentModelId,
        );
        const history = equipmentStateHistory.find(
          (h) => h.equipmentId === equip.id,
        );
        const lastStateEntry = history?.states.reduce((latest, current) =>
          new Date(latest.date) > new Date(current.date) ? latest : current,
        );
        const currentState = equipmentState.find(
          (state) => state.id === lastStateEntry?.equipmentStateId,
        );

        return {
          id: id?.id || '',
          equipmentName: equip.name,
          modelName: model?.name || 'Modelo Desconhecido',
          currentState: currentState?.name || 'Estado Desconhecido',
          lastUpdate: lastStateEntry?.date || 'Sem histórico',
        };
      });

      setEquipmentTableValues(mergedData);
    };

    mergeEquipmentData();
  }, [equipment, equipmentModel, equipmentState, equipmentStateHistory]);

  if (
    equipmentLoading ||
    equipmentModelLoading ||
    equipmentStateLoading ||
    equipmentStateHistoryLoading
  )
    return <div>Loading...</div>;

  return (
    <div>
      {equipmentTableValues.find((e) => e.lastUpdate === 'Invalid Date') ? (
        ''
      ) : (
        <EquipmentTable equipmentTableValues={equipmentTableValues} />
      )}
    </div>
  );
}

export default Home;
