import Post from "./components/Posts"



export const revalidate = 10


export default function Home() {
  return (
    <main>
      <h1>Velkommen 👋&nbsp; til min blog!</h1>
      <Post />
    </main>
  )
}
