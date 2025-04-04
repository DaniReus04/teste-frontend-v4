import { Link } from 'react-router-dom';
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { IEquipmentTableValues } from '../interfaces/equipmentTableValues';

interface IEquipementTable {
  equipmentTableValues: IEquipmentTableValues[];
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-tertiary)',
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 700,
  },
}));

function EquipmentTable({ equipmentTableValues }: IEquipementTable) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Equipamento</StyledTableCell>
            <StyledTableCell align="center">Modelo</StyledTableCell>
            <StyledTableCell align="center">Estado</StyledTableCell>
            <StyledTableCell align="center">Última atualização</StyledTableCell>
            <StyledTableCell align="center">Mapa</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipmentTableValues.map((row: IEquipmentTableValues) => (
            <TableRow key={row.id}>
              <StyledTableCell align="center">
                {row.equipmentName}
              </StyledTableCell>
              <StyledTableCell align="center">{row.modelName}</StyledTableCell>
              <StyledTableCell align="center">
                {row.currentState}
              </StyledTableCell>
              <StyledTableCell align="center">
                {new Date(row.lastUpdate).toLocaleDateString('pt-BR')}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Link to={`./equipmentdetail/${row.id}`}>
                  <MapIcon className="text-secondary hover:text-quaternary" />
                </Link>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EquipmentTable;
