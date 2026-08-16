import API from "./axios";

export const getAIInsights = async () => {
  try {
    const response = await API.get("/ai/insights");
    return response.data;
  } catch (error) {
    console.error("AI Insights Error:", error);
    throw error;
  }
};

export const chatWithAI = async (message) => {
  try {
    const response = await API.post("/ai/chat", { message });
    return response.data;
  } catch (error) {
    console.error("AI Chat Error:", error);
    throw error;
  }
};
