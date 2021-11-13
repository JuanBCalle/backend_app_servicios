import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Empresa, Servicio} from '../models';
import {EmpresaRepository} from './empresa.repository';
import {ServicioRepository} from './servicio.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof Empleado.prototype.id>;

  public readonly servicio: HasOneRepositoryFactory<Servicio, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Empleado, dataSource);
    this.servicio = this.createHasOneRepositoryFactoryFor('servicio', servicioRepositoryGetter);
    this.registerInclusionResolver('servicio', this.servicio.inclusionResolver);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }
}
