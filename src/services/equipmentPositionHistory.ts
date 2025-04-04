import axios from 'axios';
import { IEquipmentPositionHistory } from '../interfaces/equipmentPositionHistory';

const fetchIEquipmentPositionHistory = async (): Promise<
  IEquipmentPositionHistory[]
> => {
  const response = await axios.get<IEquipmentPositionHistory[]>(
    '../data/equipmentPositionHistory.json',
  );

  return new Promise((resolve) => {
    setTimeout(() => resolve(response.data), 1000);
  });
};

export default fetchIEquipmentPositionHistory;
