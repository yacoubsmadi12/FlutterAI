export interface FlutterProject {
  mainDart: string;
  pubspecYaml: string;
  pages: Record<string, string>;
  widgets: Record<string, string>;
  assets: string[];
}

export const generateFlutterApp = async (
  prompt: string,
  theme: string = "modern",
  language: string = "en"
): Promise<FlutterProject> => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        theme,
        language,
      }),
    });

    if (!response.ok) {
      throw new Error(`Generation failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.generatedCode as FlutterProject;
  } catch (error) {
    console.error("Flutter generation error:", error);
    throw error;
  }
};

export const downloadProjectZip = async (projectId: string): Promise<Blob> => {
  try {
    const response = await fetch(`/api/projects/${projectId}/download`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Download failed: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
};
