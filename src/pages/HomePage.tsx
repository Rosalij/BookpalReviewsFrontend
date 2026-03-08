
import LatestReviews from '../components/LatestReviews'
//home page with latest reviews component
function HomePage() {
  return (
    <>
    <div style={{margin: "auto", display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "2em"
    }}>
      <h1 style={{fontSize:"1.8em"}}>Create your personal book collection</h1>
      <br />
      <h2 style={{fontWeight: "300", fontSize:"1.5em"}}>Review your favorite books <br />and share them with your friends!</h2>
    </div>
    <LatestReviews />
    </>
  )
}

export default HomePage
