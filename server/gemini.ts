import { GoogleGenAI } from "@google/genai";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface FlutterProject {
  mainDart: string;
  pubspecYaml: string;
  pages: Record<string, string>;
  widgets: Record<string, string>;
  assets: string[];
}

export async function generateFlutterApp(
  prompt: string,
  theme: string = "modern",
  language: string = "en"
): Promise<FlutterProject> {
  try {
    const systemPrompt = `You are an expert Flutter developer. Generate a complete Flutter application based on the user's description.

Theme: ${theme}
Language: ${language}

Requirements:
1. Generate a complete main.dart file with proper Material app structure
2. Create a valid pubspec.yaml with all necessary dependencies
3. Generate individual page files for each screen
4. Create reusable widget components
5. Follow Flutter best practices and Material Design guidelines
6. Include proper navigation between screens
7. Use appropriate widgets for the requested functionality

The response must be a valid JSON object with the following structure:
{
  "mainDart": "complete main.dart content",
  "pubspecYaml": "complete pubspec.yaml content", 
  "pages": {"pageName": "page dart content"},
  "widgets": {"widgetName": "widget dart content"},
  "assets": ["list of asset filenames needed"]
}

Focus on creating production-ready, well-structured Flutter code.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            mainDart: { type: "string" },
            pubspecYaml: { type: "string" },
            pages: {
              type: "object",
              additionalProperties: { type: "string" }
            },
            widgets: {
              type: "object", 
              additionalProperties: { type: "string" }
            },
            assets: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["mainDart", "pubspecYaml", "pages", "widgets", "assets"]
        }
      },
      contents: prompt
    });

    const rawJson = response.text;
    
    if (rawJson) {
      const flutterProject: FlutterProject = JSON.parse(rawJson);
      return flutterProject;
    } else {
      throw new Error("Empty response from Gemini model");
    }
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw new Error(`Failed to generate Flutter app: ${error}`);
  }
}

export async function summarizeAppIdea(prompt: string): Promise<string> {
  try {
    const systemPrompt = `Summarize this app idea in 1-2 sentences, focusing on the core functionality and target audience.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt
      },
      contents: prompt
    });

    return response.text || "Unable to summarize app idea";
  } catch (error) {
    console.error("Summarization error:", error);
    throw new Error(`Failed to summarize app idea: ${error}`);
  }
}

export async function validateAppPrompt(prompt: string): Promise<{
  isValid: boolean;
  suggestions: string[];
  estimatedCredits: number;
}> {
  try {
    const systemPrompt = `Analyze this app idea prompt and provide validation feedback.

Respond with JSON in this format:
{
  "isValid": boolean,
  "suggestions": ["array of improvement suggestions"],
  "estimatedCredits": number (between 10-50 based on complexity)
}

Consider factors like:
- Clarity of requirements
- Technical feasibility
- Feature complexity
- Number of screens/components needed`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            isValid: { type: "boolean" },
            suggestions: {
              type: "array",
              items: { type: "string" }
            },
            estimatedCredits: { type: "number" }
          },
          required: ["isValid", "suggestions", "estimatedCredits"]
        }
      },
      contents: prompt
    });

    const rawJson = response.text;
    
    if (rawJson) {
      return JSON.parse(rawJson);
    } else {
      throw new Error("Empty response from validation");
    }
  } catch (error) {
    console.error("Validation error:", error);
    return {
      isValid: true,
      suggestions: [],
      estimatedCredits: 10
    };
  }
}
