export async function GET() {
  return Response.json({
    updated: true,
    data: {
      subjects: [
        {
          title: "The Trinity",
          summary: "One God in three persons: Father, Son, Holy Spirit."
        },
        {
          title: "Council of Nicaea",
          summary: "Defined Christ's divinity against Arianism (325 AD)."
        },
        {
          title: "Crucifixion & Resurrection",
          summary: "Central event of Christian salvation theology."
        }
      ]
    }
  });
}
