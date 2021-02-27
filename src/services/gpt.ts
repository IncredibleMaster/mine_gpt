import { Message } from "../components/MessageList";
import axios from "axios";
import _ from 'lodash';
const GPTService = {
    async getAIResponse(messages: Message[]): Promise<string> {
        const prompt = getPrompt(messages);
        const result = await getCompletion(prompt);
        return result;
    }
};

export function trimLinesHelper(additional: number, lines: string[], hardMax: number): string[] {
  let characterCount = additional;
  const trimmedLines = _.takeRightWhile(lines, (line) => {
    characterCount += line.length;
    return characterCount <= hardMax;
  });
  return trimmedLines;
}

function trimLines(additional: number, lines: string[]): string[] {
  // As the chat continues, there's a tradeoff:
  // More lines == higher cost + better result
  // 2048 - 300 is upper bound for tokens.
  // We will assume 1 token ~= 4 characters and keep a window of ~500 tokens.
  const maxPromptLength = 500 * 4;
  // Davinci costs 0.06 per 1k tokens, so this is roughly 3 cents per completion at the upper end.
  return trimLinesHelper(additional, lines, maxPromptLength);
}

function getPrompt(messages: Message[]): string {
  const start = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.

`;
const additionalPrompt = "AI:";

  const lines = messages.map((m) => `${m.author}: ${m.message}\n`);
  const trimmed = trimLines(start.length + additionalPrompt.length, lines);
  const combinedLines = trimmed.join("");
  
  return start + combinedLines + additionalPrompt;
}

const RESPONSE_TOKEN_MAXIMUM = 300;

// IMPORTANT: Please only use this for local testing. If you are deploying
// your app onto the internet, you should route requests through your own
// backend server to avoid exposing your OpenAI API key in your client
// side code.
async function getCompletion(prompt: string): Promise<string> {
  const data = {
    prompt,
    max_tokens: RESPONSE_TOKEN_MAXIMUM,
    temperature: 0.9,
    n: 1,
    stop: ['AI:', `Human:`],
  };
  const result = await axios({
    method: "post",
    url: "https://api.openai.com/v1/engines/davinci/completions",
    data,
    headers: {
      Authorization: "Bearer <your-token>",
    },
  });
  return result.data.choices[0].text;
}

export default GPTService;
