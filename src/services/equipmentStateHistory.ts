import axios from 'axios';
import { IEquipmentStateHistory } from '../interfaces/equipmentStateHistory';

const fetchEquipmentStateHistory = async (): Promise<
  IEquipmentStateHistory[]
> => {
  const response = await axios.get<IEquipmentStateHistory[]>(
    '../data/equipmentStateHistory.json',
  );

  return new Promise((resolve) => {
    setTimeout(() => resolve(response.data), 1000);
  });
};

export default fetchEquipmentStateHistory;
