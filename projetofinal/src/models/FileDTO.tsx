export interface FileDTO {
    lastModified?: number;
    lastModifiedDate?: Date;
    name: string;
    size: number;
    type: string;
    webkitRelativePath?: string;
}