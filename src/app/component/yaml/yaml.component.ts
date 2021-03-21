import { Component, OnInit } from '@angular/core';
import { DumpOptions } from 'js-yaml';
import { SectionService } from 'src/app/service';
import * as hljs from 'highlight.js';
import { HIGHLIGHT_OPTIONS, HighlightOptions } from 'ngx-highlightjs';
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
      useValue: { lineNumbers: true, fullLibraryLoader: import('highlight.js') as any } as HighlightOptions
    }
  ],
})
export class YamlComponent implements OnInit {

  output = '';
  verbose = false;

  formatOptions: DumpOptions = { quotingType: '"' };

  constructor(private sectionService: SectionService) { }

  ngOnInit(): void {
    this.sectionService.getSections().subscribe(sections => {
      console.log('Updating YAML output');
      // reset the code element from
      // let elem = document.getElementById("yaml-box")
      // if (elem) {
      //   elem.innerHTML = `<code class="lang - yaml">{{output}}</code>`;
      // }
      this.output = '';
      for (const section of sections) {
        this.output += section.getYaml(this.verbose, this.formatOptions);
      }
      // hljs.highlightAll();
    });
  }

}
