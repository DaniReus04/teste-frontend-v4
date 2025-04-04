import axios from 'axios';
import { IEquipment } from '../interfaces/equipment';

const fetchEquipment = async (): Promise<IEquipment[]> => {
  const response = await axios.get<IEquipment[]>('/data/equipment.json');

  return new Promise((resolve) => {
    setTimeout(() => resolve(response.data), 1000);
  });
};

export default fetchEquipment;
