import Posts from "./components/Posts"
import MyProfilePic from './components/MyProfilePic'


export const revalidate = 10


export default function Home() {
  return (
    <div>
      <MyProfilePic />
      <h1>Velkommen 👋&nbsp; til min blog!</h1>
      <Posts />
    </div>
  )
}
