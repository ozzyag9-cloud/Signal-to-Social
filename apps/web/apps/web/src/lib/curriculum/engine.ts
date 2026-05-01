import { topics } from "../doctrine/topics";

export function getDailyTeaching() {
  const todayIndex = new Date().getDate() % topics.length;
  const topic = topics[todayIndex];

  return {
    date: new Date().toISOString(),
    topic,
    lesson: generateLesson(topic)
  };
}

function generateLesson(topic: any) {
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
