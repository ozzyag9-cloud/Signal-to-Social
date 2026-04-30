export default function YouTube({ id }: { id: string }) {
  return (
    <iframe
      width="100%"
      height="200"
      src={`https://www.youtube.com/embed/${id}?modestbranding=1`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ border: "none" }}
    />
  );
}
