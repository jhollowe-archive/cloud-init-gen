import { ISection, Section } from "../section";

// get which distros are supported by ALL sections (intersection)
export function getTotalSupportedDistros(sections: ISection[] | ISection): Array<string> {
  if (Array.isArray(sections)) {
    let cumulativeDistros: Array<string> = ["all"];
    for (let section of sections) {
      let distros = section.supportedDistros
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
  } else {
    return sections.supportedDistros;

  }
}

// get which distros are supported by ANY sections (union)
export function getAllSupportedDistros(sections: ISection[] | ISection): Array<string> {
  if (Array.isArray(sections)) {
    let cumulativeDistros: Set<string> = new Set();
    for (let section of sections) {
      section.supportedDistros.forEach((v) => { cumulativeDistros.add(v) });
    }
    return Array.from(cumulativeDistros)
  } else {
    return sections.supportedDistros;
  }
}
