export enum EtypeItem {
    file = "file",
    folder = "folder",
}

export interface BaseModel<T extends EtypeItem> {
    type: T;
    name: string;
    lastDateChange: Date;
}
export interface FileModel extends BaseModel<EtypeItem.file> {
    size: number;
}
export interface FolderModel extends BaseModel<EtypeItem.folder> {

}
export interface IFIle {
    path: string;
    file: string
}
export interface IFileTransfer {
    files: Array<IFIle>;
    destination: string;
    method?: string
}
