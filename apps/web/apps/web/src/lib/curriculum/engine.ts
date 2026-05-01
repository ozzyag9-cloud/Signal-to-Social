import { topics } from "../doctrine/topics";

type Topic = {
  id: string;
  title: string;
  description: string;
  sources: string[];
};

export function getDailyTeaching(): {
  date: string;
  topic: Topic;
  lesson: string;
} {
  const todayIndex = new Date().getDate() % topics.length;
  const topic = topics[todayIndex];

  return {
    date: new Date().toISOString(),
    topic,
    lesson: generateLesson(topic)
  };
}

function generateLesson(topic: Topic): string {
  return `
Topic: ${topic.title}

Summary:
${topic.description}

Study Sources:
${topic.sources.join("\n")}

Reflection:
Why does this doctrine matter in understanding God?
`;
}
