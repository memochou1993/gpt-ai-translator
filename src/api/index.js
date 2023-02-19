import axios from 'axios';

export const PARTICIPANT_AI = 'AI';
export const PARTICIPANT_HUMAN = 'Human';

export const FINISH_REASON_STOP = 'stop';
export const FINISH_REASON_LENGTH = 'length';

const newClient = (key) => axios.create({
  baseURL: 'https://api.openai.com',
  headers: {
    Authorization: `Bearer ${key}`,
  },
});

const createCompletion = (client) => ({
  model = 'text-davinci-003',
  prompt,
  temperature = 0.9,
  maxTokens = 160,
  frequencyPenalty = 0,
  presencePenalty = 0.6,
  stop = [
    ` ${PARTICIPANT_AI}:`,
    ` ${PARTICIPANT_HUMAN}:`,
  ],
}) => client.post('/v1/completions', {
  model,
  prompt,
  temperature: Number(temperature),
  max_tokens: Number(maxTokens),
  frequency_penalty: Number(frequencyPenalty),
  presence_penalty: Number(presencePenalty),
  stop,
});

export {
  newClient,
  createCompletion,
};
