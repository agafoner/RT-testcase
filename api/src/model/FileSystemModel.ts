enum EtypeItem {
    file = "file",
    folder = "folder",
}

interface BaseModel<T extends EtypeItem> {
    type: T;
    name: string;
    lastDateChange: Date;
}
export interface FileModel extends BaseModel<EtypeItem.file> {
    size: number;
}
export interface FolderModel extends BaseModel<EtypeItem.folder> {

}
