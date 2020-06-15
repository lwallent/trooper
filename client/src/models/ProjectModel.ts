export interface CreationProjectModel {
    name: string;
    modified?: number;
    created?: number;
    description?: string;
}

export interface ProjectModel extends CreationProjectModel {
    id: string;
}