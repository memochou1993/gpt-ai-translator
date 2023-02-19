<script setup>
import { reactive, computed } from 'vue';
import {
  createCompletion, newClient, PARTICIPANT_AI, PARTICIPANT_HUMAN,
} from '../api';

defineProps({
  title: {
    type: String,
    default: '',
  },
});

const data = reactive({
  key: '',
  question: '',
  answer: '',
});

const prompt = computed(() => `${PARTICIPANT_HUMAN}: 請將以下內容翻譯成英文：「${data.question}」。\n${PARTICIPANT_AI}:`);

const translate = async () => {
  const client = newClient(data.key);
  const res = await createCompletion(client)({
    prompt: prompt.value,
    maxTokens: data.key.length * 4,
  });
  const { choices } = res.data;
  const [choice] = choices;
  const { text } = choice;
  data.answer = text.trim();
};
</script>

<template>
  <v-card>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-item>
      <v-textarea
        v-model="data.question"
        variant="outlined"
      />
      <v-textarea
        v-model="data.answer"
        variant="outlined"
      />
      <v-text-field
        v-model="data.key"
        label="Key"
        type="password"
        variant="outlined"
      />
    </v-card-item>
    <v-card-actions class="text-center">
      <v-spacer />
      <v-btn
        @click="translate"
      >
        Translate
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
