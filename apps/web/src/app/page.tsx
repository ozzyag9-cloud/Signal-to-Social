"use client";
import Card from "./components/bento/Card";
import YouTube from "./components/player/YouTube";

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <Card title="System OK">
        <p>All components loaded successfully</p>
      </Card>

      <Card title="Video Test">
        <YouTube id="dQw4w9WgXcQ" />
      </Card>
    </main>
  );
}
