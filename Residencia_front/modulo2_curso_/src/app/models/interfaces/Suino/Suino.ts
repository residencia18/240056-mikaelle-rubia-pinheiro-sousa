import { PesoSuino } from '../Peso/PesoSuino';

export interface Suino {
  id: string
  brinco: number;
  brincoPai: number;
  brincoMae: number;
  dataNascimento: string;
  dataSaida: string;
  status: 'Ativo' | 'Vendido' | 'Morto';
  sexo: 'M' | 'F';
  historicoPeso: PesoSuino[];
}
