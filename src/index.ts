import { analyzeProject, ProjectAnalysis } from "./lib/analyzer";

export interface InitOptions {
  package: Record<string, any>;
  showMessage?: boolean;
  showPackages?: boolean;
  message?: string;
  repoLink?: string;
  buildWith?: ProjectAnalysis['frameworks'] 
}

export function initMyLib(options: InitOptions) {
  const data: InitOptions = {
    package: options.package,
    showMessage: options.showMessage ?? true,
    message:
      options.message ?? "🚀 We're open source and open to contributions!",
    showPackages: options.showPackages ?? true,
  };
  
  const analysis = analyzeProject(options.package);

  // Build the log string and styles array
  const logParts: string[] = [];
  const styles: string[] = [];

  if (data.showPackages) {
    ( data.buildWith ?? analysis.frameworks).forEach((framework) => {
      logParts.push(`%c${framework.name}`);
      const svgDataUrl = framework.icon;
      const style = `
        background-image: url("${svgDataUrl}"); 
        background-repeat: no-repeat; 
        background-size: 16px 16px; 
        padding-left: 20px; 
        line-height: 20px; 
        margin-right: 10px;
      `;
      styles.push(style);
    });
    console.log(`Build with : ${logParts.join(" ")}`, ...styles);
  }

  if (data.showMessage) {
    console.log(data.message);
  }
  const repoLink = options.repoLink ?? analysis.repo; 
  if(repoLink){
    console.log("🔗 Repo:", repoLink ?? "No repository found");
  }
}
