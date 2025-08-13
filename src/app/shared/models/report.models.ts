
/**
 * author nav
 */

export enum ReportType {
  MASCOTAS_POR_MUNICIPALIDAD = 'MASCOTAS_POR_MUNICIPALIDAD',
  ANIMALES_CALLEJEROS = 'ANIMALES_CALLEJEROS',
  ANIMALES_CON_HOGAR = 'ANIMALES_CON_HOGAR',
  ESTERILIZACION_MUNICIPIO = 'ESTERILIZACION_MUNICIPIO',
  INDICADORES_ABANDONO = 'INDICADORES_ABANDONO',
}

export interface MascotasPorDistritoDto {
  districtCode: string;
  districtName: string;
  totalPets: number;
}

export interface AnimalesCallejerosDto {
  month: string; 
  area: string;
  totalStreetAnimals: number;
}

export interface AnimalesConHogarDto {
  district: string;
  withHome: number;
  medicalAttention: number;
  sterilized: number;
}

export interface IndicadoresMaltratoDto {
  category: string;
  district?: string;
  count: number;
}

export type ReportDto =
  | MascotasPorDistritoDto[]
  | AnimalesCallejerosDto[]
  | AnimalesConHogarDto[]
  | IndicadoresMaltratoDto[];
