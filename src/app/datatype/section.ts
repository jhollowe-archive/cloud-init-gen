import { dump, DumpOptions } from 'js-yaml';

export class Section {
  private type: string;
  protected data: any;
  protected supported_distros: Array<string> = ["none"];

  constructor(type: string, data?: any) {
    this.type = type;
    this.data = data || {};
  }

  public getType(): string {
    return this.type;
  }

  public getSupportedDistros(): Array<string> {
    return this.supported_distros;
  }

  public getData(): any {
    return this.data;
  }

  public getYaml(opts?: DumpOptions): string {
    return dump({ [this.type]: this.getData() }, opts);
  }
}
