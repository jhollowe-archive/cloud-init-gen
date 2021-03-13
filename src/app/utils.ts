
import { Property } from './datatype/property';
import { Section, SectionData } from './datatype/section';

// Decorator for section properties
export function propertyData(default_value: any, description: string, optional: boolean = true) {
  console.log("here")
  return function (target: SectionData, propertyKey: string) {
    let newProp = new Property(propertyKey, default_value, description, optional);
    target.addPropertyData(newProp);
  }
}

// get which distros are supported by ALL sections (intersection)
export function getTotalSupportedDistros(sections: Array<Section> | Section): Array<string> {
  if (sections instanceof Section) {
    return sections.getSupportedDistros();
  } else {
    let cumulativeDistros: Array<string> = ["all"];
    for (let section of sections) {
      let distros = section.getSupportedDistros()
      // if this section supports all distros, continue
      if (distros.length === 1 && distros[0] === "all") {
        continue;
      }
      else {
        // intersection of all the supported distros ("all" matches every distro)
        cumulativeDistros = distros.filter(v => cumulativeDistros.includes(v) || cumulativeDistros.includes("all"));
      }
    }
    return cumulativeDistros;
  }
}

// get which distros are supported by ANY sections (union)
export function getAllSupportedDistros(sections: Array<Section> | Section): Array<string> {
  if (sections instanceof Section) {
    return sections.getSupportedDistros();
  } else {
    let cumulativeDistros: Set<string> = new Set();
    for (let section of sections) {
      section.getSupportedDistros().forEach((v) => { cumulativeDistros.add(v) });
    }
    return Array.from(cumulativeDistros)
  }
}
