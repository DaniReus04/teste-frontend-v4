import { useEffect, useState } from 'react';
import { IEquipmentState } from '../interfaces/equipmentState';
import fetchEquipmentState from '../services/equipmentState';

const useEquipmentState = () => {
  const [equipmentStateData, setEquipmentStateData] = useState<
    IEquipmentState[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string>('');

  const equipmentStateSync = async () => {
    setLoading(true);
    try {
      const data = await fetchEquipmentState();
      setEquipmentStateData(data);
    } catch (error) {
      console.error('Error while fetching the equipment model request:', error);
      setSyncError('Error while fetching the equipment model request');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    equipmentStateSync();
  }, []);

  return {
    equipmentStateData,
    loading,
    syncError,
    refresh: equipmentStateSync,
  };
};

export default useEquipmentState;
