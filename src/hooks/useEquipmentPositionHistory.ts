import { useEffect, useState } from 'react';
import { IEquipmentPositionHistory } from '../interfaces/equipmentPositionHistory';
import fetchEquipmentPositionHistory from '../services/equipmentPositionHistory';

const useEquipmentPositionHistory = () => {
  const [equipmentPositionHistory, setEquipmentPositionHistory] = useState<
    IEquipmentPositionHistory[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string>('');

  const equipmentPositionHistorySync = async () => {
    setLoading(true);
    try {
      const data = await fetchEquipmentPositionHistory();
      setEquipmentPositionHistory(data);
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
    equipmentPositionHistory,
    loading,
    syncError,
    refresh: equipmentPositionHistorySync,
  };
};

export default useEquipmentPositionHistory;
