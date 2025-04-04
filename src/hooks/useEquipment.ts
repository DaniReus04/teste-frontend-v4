import { useEffect, useState } from 'react';
import { IEquipment } from '../interfaces/equipment';
import fetchEquipment from '../services/equipment';

const useEquipment = () => {
  const [equipment, setEquipment] = useState<IEquipment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string>('');

  const equipmentSync = async () => {
    setLoading(true);
    try {
      const data = await fetchEquipment();
      setEquipment(data);
    } catch (error) {
      console.error('Error while fetching the equipment request:', error);
      setSyncError('Error while fetching the equipment request');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    equipmentSync();
  }, []);

  return {
    equipment,
    loading,
    syncError,
    refresh: equipmentSync,
  };
};

export default useEquipment;
