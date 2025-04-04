import axios from 'axios';
import { IEquipmentState } from '../interfaces/equipmentState';

const fetchEquipmentState = async (): Promise<IEquipmentState[]> => {
  const response = await axios.get<IEquipmentState[]>(
    '/data/equipmentState.json',
  );

  return new Promise((resolve) => {
    setTimeout(() => resolve(response.data), 1000);
  });
};

export default fetchEquipmentState;
