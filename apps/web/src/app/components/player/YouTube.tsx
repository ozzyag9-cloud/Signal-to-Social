export default function YouTube({ id }: { id: string }) {
  return (
    <iframe
      width="100%"
      height="200"
      src={`https://www.youtube.com/embed/${id}`}
      allowFullScreen
    />
  );
}
