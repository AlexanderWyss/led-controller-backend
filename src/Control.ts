type Operation = (query: any) => Promise<any>;

export interface Control {
  name: string;
  operation: Operation;
}
