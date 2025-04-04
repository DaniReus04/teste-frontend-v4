import { useEffect, useState } from 'react';
import { IEquipmentPositionHistory } from '../interfaces/equipmentPositionHistory';
import fetchEquipmentPositionHistory from '../services/equipmentPositionHistory';

const useEquipmentPositionHistory = () => {
  const [equipmentPositionHistoryData, setEquipmentPositionHistoryData] =
    useState<IEquipmentPositionHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string>('');

  const equipmentPositionHistorySync = async () => {
    setLoading(true);
    try {
      const data = await fetchEquipmentPositionHistory();
      setEquipmentPositionHistoryData(data);
    } catch (error) {
      console.error('Error while fetching the equipment model request:', error);
      setSyncError('Error while fetching the equipment model request');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    equipmentPositionHistorySync();
  }, []);

  return {
    equipmentPositionHistoryData,
    loading,
    syncError,
    refresh: equipmentPositionHistorySync,
  };
};

export default useEquipmentPositionHistory;
