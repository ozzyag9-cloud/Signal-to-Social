export async function GET() {
  return Response.json({
    updated: true,
    data: {
      subjects: [
        {
          title: "The Trinity",
          summary: "One God in three persons: Father, Son, and Holy Spirit."
        },
        {
          title: "Council of Nicaea",
          summary: "Affirmed Christ’s divinity in 325 AD."
        },
        {
          title: "The Resurrection",
          summary: "Central proof of Christ’s divine authority."
        }
      ]
    }
  });
}
