import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useEquipment from '../../hooks/useEquipment';
import { IEquipment } from '../../interfaces/equipment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IEquipmentModel } from '../../interfaces/equipmentModel';
import {
  IEquipmentPositionHistory,
  IPositions,
} from '../../interfaces/equipmentPositionHistory';
import { IEquipmentState } from '../../interfaces/equipmentState';
import { IEquipmentStateHistory } from '../../interfaces/equipmentStateHistory';
import useEquipmentModel from '../../hooks/useEquipmentModel';
import useEquipmentPositionHistory from '../../hooks/useEquipmentPositionHistory';
import useEquipmentState from '../../hooks/useEquipmentState';
import useEquipmentStateHistory from '../../hooks/useEquipmentStateHistory';
import DateSelector from '../../components/dateSelector';
import MapView from '../../components/mapView';

function EquipmentDetail() {
  const [equipment, setEquipment] = useState<IEquipment | undefined>(
    {} as IEquipment,
  );
  const [equipmentModel, setEquipmentModel] = useState<
    IEquipmentModel | undefined
  >({} as IEquipmentModel);
  const [equipmentPositionHistory, setEquipmentPositionHistory] = useState<
    IEquipmentPositionHistory | undefined
  >({} as IEquipmentPositionHistory);
  const [equipmentState, setEquipmentState] = useState<
    IEquipmentState | undefined
  >({} as IEquipmentState);
  const [equipmentStateHistory, setEquipmentStateHistory] = useState<
    IEquipmentStateHistory | undefined
  >({} as IEquipmentStateHistory);
  const [equipmentPosition, setEquipmentPosition] = useState<IPositions>(
    {} as IPositions,
  );
  const { id: paramId } = useParams();

  const { equipmentData, loading: equipmentLoading } = useEquipment();
  const { equipmentModelData, loading: equipmentModelLoading } =
    useEquipmentModel();
  const {
    equipmentPositionHistoryData,
    loading: equipmentPositionHistoryLoading,
  } = useEquipmentPositionHistory();
  const { equipmentStateData, loading: equipmentStateLoading } =
    useEquipmentState();
  const { equipmentStateHistoryData, loading: equipmentStateHistoryLoading } =
    useEquipmentStateHistory();

  useEffect(() => {
    setEquipment(equipmentData.find((e) => e.id === paramId));
    setEquipmentModel(
      equipmentModelData.find((e) => e.id === equipment?.equipmentModelId),
    );
    setEquipmentPositionHistory(
      equipmentPositionHistoryData.find((e) => e.equipmentId === paramId),
    );
    setEquipmentStateHistory(
      equipmentStateHistoryData.find((e) => e.equipmentId === paramId),
    );
    setEquipmentState(
      equipmentStateData?.find(
        (e) =>
          e.id ===
          equipmentStateHistory?.states.reduce((latest, current) =>
            new Date(latest.date) > new Date(current.date) ? latest : current,
          ).equipmentStateId,
      ),
    );
  }, [
    equipment?.equipmentModelId,
    equipmentData,
    equipmentModelData,
    equipmentPositionHistoryData,
    equipmentStateData,
    equipmentStateHistory?.states,
    equipmentStateHistoryData,
    paramId,
  ]);

  useEffect(() => {
    if (
      equipmentPositionHistory &&
      equipmentPositionHistory.positions &&
      equipmentPositionHistory.positions.length > 0
    ) {
      const lastPosition =
        equipmentPositionHistory.positions[
          equipmentPositionHistory.positions.length - 1
        ];
      setEquipmentPosition(lastPosition);
    }
  }, [equipmentPositionHistory]);

  useEffect(() => {
    if (
      equipmentStateHistory?.states &&
      equipmentStateHistory.states.length > 0 &&
      equipmentPosition?.date
    ) {
      const positionDate = new Date(equipmentPosition.date);

      const pastStates = equipmentStateHistory.states.filter(
        (state) => new Date(state.date) <= positionDate,
      );

      const lastState = pastStates.reduce((latest, current) =>
        new Date(latest.date) > new Date(current.date) ? latest : current,
      );

      const currentState = equipmentStateData?.find(
        (s) => s.id === lastState.equipmentStateId,
      );

      setEquipmentState(currentState);
    }
  }, [equipmentPosition, equipmentStateData, equipmentStateHistory]);

  console.log(
    'equipment:',
    equipment,
    'equipmentModel:',
    equipmentModel,
    'equipmentPositionHistory:',
    equipmentPositionHistory,
    'equipmentState:',
    equipmentState,
    'equipmentStateHistory:',
    equipmentStateHistory,
    'equipmentPosition:',
    equipmentPosition,
  );

  if (
    equipmentLoading ||
    equipmentModelLoading ||
    equipmentPositionHistoryLoading ||
    equipmentStateLoading ||
    equipmentStateHistoryLoading
  )
    return <div>Loading...</div>;

  return (
    <section className="flex flex-col gap-5">
      <Link
        to="/"
        className="relative text-2xl inline-flex justify-start items-center gap-2 text-left w-fit pr-2 pb-2 box-border border-b-2 border-transparent after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
      >
        <ArrowBackIosNewIcon /> {equipment?.name}
      </Link>
      <div className="flex justify-between items-center">
        {equipmentPositionHistory!.positions?.length > 0 && (
          <DateSelector
            positions={equipmentPositionHistory!.positions!}
            onSelect={(pos) => setEquipmentPosition(pos)}
          />
        )}
      </div>
      <div className="flex gap-6 items-center">
        <div>Modelo: {equipmentModel?.name}</div>
        <div>Estado: {equipmentState?.name}</div>
        <div>
          Data e hora:{' '}
          {(() => {
            const date = new Date(equipmentPosition.date);
            const data = date.toLocaleDateString('pt-BR');
            const hora = date.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            });
            return `${data} às ${hora}`;
          })()}
        </div>
      </div>
      <MapView
        lat={equipmentPosition.lat}
        lon={equipmentPosition.lon}
        color={equipmentState?.color}
      />
    </section>
  );
}

export default EquipmentDetail;
