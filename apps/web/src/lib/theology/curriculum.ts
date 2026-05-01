export const curriculum = [
  {
    topic: "The Trinity",
    summary: "One God in three persons: Father, Son, Holy Spirit.",
    sources: [
      "Nicene Creed (325 AD)",
      "Athanasius - On the Incarnation",
      "Augustine - De Trinitate"
    ]
  },
  {
    topic: "Council of Nicaea",
    summary: "First ecumenical council defining Christ as consubstantial with the Father.",
    sources: [
      "Nicene Creed",
      "Eusebius - Church History"
    ]
  },
  {
    topic: "Christology",
    summary: "Study of the nature and person of Jesus Christ.",
    sources: [
      "Chalcedonian Definition (451 AD)",
      "Thomas Aquinas - Summa Theologica"
    ]
  }
];

export function getDailyTopic() {
  const day = new Date().getDate();
  return curriculum[day % curriculum.length];
}
