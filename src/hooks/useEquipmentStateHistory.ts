import { useEffect, useState } from 'react';
import { IEquipmentStateHistory } from '../interfaces/equipmentStateHistory';
import fetchEquipmentStateHistory from '../services/equipmentStateHistory';

const useEquipmentStateHistory = () => {
  const [equipmentStateHistoryData, setEquipmentStateHistoryData] = useState<
    IEquipmentStateHistory[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string>('');

  const equipmentStateHistorySync = async () => {
    setLoading(true);
    try {
      const data = await fetchEquipmentStateHistory();
      setEquipmentStateHistoryData(data);
    } catch (error) {
      console.error('Error while fetching the equipment model request:', error);
      setSyncError('Error while fetching the equipment model request');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    equipmentStateHistorySync();
  }, []);

  return {
    equipmentStateHistoryData,
    loading,
    syncError,
    refresh: equipmentStateHistorySync,
  };
};

export default useEquipmentStateHistory;
