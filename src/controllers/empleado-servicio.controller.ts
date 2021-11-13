import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Empleado,
  Servicio,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoServicioController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/servicio', {
    responses: {
      '200': {
        description: 'Empleado has one Servicio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Servicio),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio> {
    return this.empleadoRepository.servicio(id).get(filter);
  }

  @post('/empleados/{id}/servicio', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInEmpleado',
            exclude: ['id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'id'>,
  ): Promise<Servicio> {
    return this.empleadoRepository.servicio(id).create(servicio);
  }

  @patch('/empleados/{id}/servicio', {
    responses: {
      '200': {
        description: 'Empleado.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.empleadoRepository.servicio(id).patch(servicio, where);
  }

  @del('/empleados/{id}/servicio', {
    responses: {
      '200': {
        description: 'Empleado.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.empleadoRepository.servicio(id).delete(where);
  }
}
