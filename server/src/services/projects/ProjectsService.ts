import {Inject, Service} from '@tsed/common';
import {MongooseModel} from '@tsed/mongoose';
import {$log} from '@tsed/logger';
import { Project } from '../../models/projects/Project';


@Service()
export class ProjectsService {
  @Inject(Project)
  private Project: MongooseModel<Project>;

//   $onInit() {
//     // INIT HOOK..
//   }

  /**
   * Find a project by his ID.
   * @param id
   * @returns {undefined|Project}
   */
  async find(id: string): Promise<Project> {
    $log.debug('Search a project from ID', id);
    const project = await this.Project.findById(id).exec();

    $log.debug('Found', project);

    return project;
  }

  /**
   *
   * @param project
   * @returns {Project}
   */
  async save(project: Project): Promise<Project> {
    $log.debug({message: 'Validate project', project});

    const model = new this.Project(project);
    $log.debug({message: 'Save project', project});
    await model.updateOne(project, {upsert: true});

    $log.debug({message: 'Project saved', model});

    return model;
  }

  /**
   *
   * @returns {Project[]}
   */
  async query(options = {}): Promise<Project[]> {
    return this.Project.find(options).exec();
  }

  /**
   *
   * @param id
   * @returns {Promise<Project>}
   */
  async remove(id: string): Promise<Project> {
    return await this.Project.findById(id).remove().exec();
  }
}