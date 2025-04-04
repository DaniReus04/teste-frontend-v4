import axios from 'axios';
import { IEquipmentModel } from '../interfaces/equipmentModel';

const fetchEquipmentModel = async (): Promise<IEquipmentModel[]> => {
  const response = await axios.get<IEquipmentModel[]>(
    '/data/equipmentModel.json',
  );

  return new Promise((resolve) => {
    setTimeout(() => resolve(response.data), 1000);
  });
};

export default fetchEquipmentModel;
