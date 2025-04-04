import { useEffect, useState } from 'react';
import { IEquipmentModel } from '../interfaces/equipmentModel';
import fetchEquipmentModel from '../services/equipmentModel';

const useEquipmentModel = () => {
  const [equipmentModel, setEquipmentModel] = useState<IEquipmentModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string>('');

  const equipmentModelSync = async () => {
    setLoading(true);
    try {
      const data = await fetchEquipmentModel();
      setEquipmentModel(data);
    } catch (error) {
      console.error('Error while fetching the equipment model request:', error);
      setSyncError('Error while fetching the equipment model request');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    equipmentModelSync();
  }, []);

  return {
    equipmentModel,
    loading,
    syncError,
    refresh: equipmentModelSync,
  };
};

export default useEquipmentModel;
