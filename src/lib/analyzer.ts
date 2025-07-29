import { Frameworks } from "../data/frameworks";

export interface ProjectAnalysis {
  frameworks: { name: string,icon: string }[];
  repo: string | null;
}

export function analyzeProject(pkg: Record<string, any>): ProjectAnalysis {
  const deps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };

  const frameworks: ProjectAnalysis['frameworks'] = [];

  Object.keys(deps).forEach((dep) => {
    const frameworkData = Frameworks[dep];
    if (frameworkData) {
      frameworks.push(frameworkData);
    }
  })

  const repo = typeof pkg.repository === 'string'
    ? pkg.repository
    : pkg.repository?.url ?? null;

  return { frameworks, repo };
}
