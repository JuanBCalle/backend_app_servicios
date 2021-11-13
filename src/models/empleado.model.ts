import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {Servicio} from './servicio.model';

@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaDeNacimiento: string;

  @property({
    type: 'number',
    required: true,
  })
  salario: number;

  @property({
    type: 'boolean',
    required: true,
  })
  esDirectivo: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  esCliente: boolean;

  @property({
    type: 'string',
    required: true,
  })
  servicioId: string;

  @belongsTo(() => Empresa)
  empresaId: string;

  @hasOne(() => Servicio)
  servicio: Servicio;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
