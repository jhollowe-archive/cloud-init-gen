
import { Property } from './datatypes';
import { Section, SectionData } from './sections/section';

// Decorator for section properties
export function propertyData(default_value: any, description: string, optional: boolean = true, mut_exclusive: Array<string> = []) {
  return function (target: SectionData | any, propertyKey: string) {
    // console.log(target, propertyKey, (target)[propertyKey]); //DEBUG
    let newProp = new Property(typeof (target)[propertyKey], propertyKey, default_value, description, optional, mut_exclusive);
    target.addPropertyData(newProp);
  }
}

// get which distros are supported by ALL sections (intersection)
export function getTotalSupportedDistros(sections: Array<Section> | Section): Array<string> {
  if (sections instanceof Section) {
    return sections.supported_distros;
  } else {
    let cumulativeDistros: Array<string> = ["all"];
    for (let section of sections) {
      let distros = section.supported_distros
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
    return sections.supported_distros;
  } else {
    let cumulativeDistros: Set<string> = new Set();
    for (let section of sections) {
      section.supported_distros.forEach((v) => { cumulativeDistros.add(v) });
    }
    return Array.from(cumulativeDistros)
  }
}
