import {BodyParams, Controller, Delete, Get, PathParams, Post, Put, Required, Status} from "@tsed/common";
import {Description, Summary} from "@tsed/swagger";
import {NotFound} from "@tsed/exceptions";
import {Project} from "../../models/projects/Project";
import {ProjectsService} from "../../services/projects/ProjectsService";


@Controller("/projects")
export class ProjectsCtrl {
  constructor(private projectsService: ProjectsService) {

  }

  /**
   *
   * @param {string} id
   * @returns {Promise<Project>}
   */
  @Get("/:id")
  @Summary("Return a project from his ID")
  @Status(200, {description: "Success", type: Project})
  async get(@Required() @PathParams("id") id: string): Promise<Project> {

    const project = await this.projectsService.find(id);

    if (project) {
      return project;
    }

    throw new NotFound("Project not found");
  }

  /**
   *
   * @param {Project} project
   * @returns {Promise<Project>}
   */
  @Post("/")
  @Summary("Create a new Project")
  @Status(201, {description: "Created", type: Project})
  save(@Description("Project model")
       @BodyParams() @Required() project: Project) {
    return this.projectsService.save(project);
  }

  /**
   *
   * @param id
   * @param project
   * @returns {Promise<Project>}
   */
  @Put("/:id")
  @Summary("Update project information")
  @Status(200, {description: "Success", type: Project})
  async update(@PathParams("id") @Required() id: string,
               @BodyParams() @Required() project: Project): Promise<Project> {
    project._id = id;

    return this.projectsService.save(project);
  }

  /**
   *
   * @param id
   * @returns {{id: string, name: string}}
   */
  @Delete("/:id")
  @Summary("Remove a project.")
  @Status(204, {description: "No content"})
  async remove(@PathParams("id") id: string): Promise<void> {
    await this.projectsService.remove(id);
  }

  /**
   *
   * @returns {Promise<Project[]>}
   */
  @Get("/")
  @Summary("Return all projects")
  @Status(200, {description: "Success", type: Project, collectionType: Array})
  async getAllProjects(): Promise<Project[]> {
    return this.projectsService.query();
  }
}