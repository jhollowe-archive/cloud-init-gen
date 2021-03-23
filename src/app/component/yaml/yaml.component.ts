import { Component, OnInit } from '@angular/core';
import { DumpOptions } from 'js-yaml';
import { SectionService } from 'src/app/service';
import { HIGHLIGHT_OPTIONS, HighlightOptions } from "ngx-highlightjs";
import { getAllSupportedDistros, getTotalSupportedDistros } from 'src/app/util';
import * as hljs from 'highlight.js';
// import yamlLang from 'highlight.js/lib/languages/yaml';

@Component({
  selector: 'app-yaml',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.scss'],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      // TODO only import and use the yaml language (see https://www.npmjs.com/package/ngx-highlightjs)
      // useValue: <HighlightOptions>{ lineNumbers: true, languages: { yaml: yamlLang } }
      useValue: <HighlightOptions>{ lineNumbers: true, fullLibraryLoader: import('highlight.js') as any }
    }
  ],
})
export class YamlComponent implements OnInit {

  output: string = "";
  verbose: boolean = false;

  allDistros!: string[];
  totalDistros!: string[];

  formatOptions: DumpOptions = { quotingType: '"' };

  constructor(private sectionService: SectionService) { }

  ngOnInit(): void {
    this.sectionService.getSections().subscribe(sections => {
      // DEBUG
      console.log("Updating YAML output");

      this.allDistros = getAllSupportedDistros(sections);
      this.totalDistros = getTotalSupportedDistros(sections);

      this.output = "";
      for (let section of sections) {
        this.output += section.getYaml(this.verbose, this.formatOptions);
      }
    });
  }

}
