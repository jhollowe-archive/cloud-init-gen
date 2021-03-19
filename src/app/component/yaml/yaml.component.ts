import { Component, OnInit } from '@angular/core';
import { DumpOptions } from 'js-yaml';
import { SectionService } from 'src/app/service';
import * as hljs from 'highlight.js';

@Component({
  selector: 'app-yaml',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.scss']
})
export class YamlComponent implements OnInit {

  output: string = "";
  verbose: boolean = false;

  formatOptions: DumpOptions = { forceQuotes: true, quotingType: '"' };

  constructor(private sectionService: SectionService) { }

  ngOnInit(): void {
    this.sectionService.getSections().subscribe(sections => {
      console.log("Updating YAML output");
      for (let section of sections) {
        this.output += section.getYaml(this.verbose, this.formatOptions);
      }
      hljs.highlightAll();
    });
  }

}
