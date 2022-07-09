import useFetch from "../../hooks/useFetch.js"
import "./featured.css"

const Featured = () => {

  const {data, loading, error} = useFetch("/partyPalaces/countByCity?cities=Kathmandu,Lalitpur,Pokhara")

  return (
    <div className="featured">
      {loading ? ( 
        "Loading Please Wait" 
      ) : ( 
      <>
      <div className="featuredItem">
        <img src="https://alicereceptions.com/uploads/topics/15725873198146.jpg" alt="" className="featuredImg"/>
        <div className="featuredTitles">
          <h1>Kathmandu</h1>
          <h2>{data[0]}</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="https://images.ctfassets.net/f03p2kuux1j7/1T30sg4QpzHuBtoPB0irev/f63167af81feec9c8f0b2196d3bf7cd7/4930.jpg?w=1022&h=682&q=50&fm=webp" alt="" className="featuredImg"/>
        <div className="featuredTitles">
          <h1>Lalitpur</h1>
          <h2>{data[1]}</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="https://ik.imgkit.net/3vlqs5axxjf/external/ik-seo/http://media.iceportal.com/114182/photos/68057329_XL/Radisson-Hotel-Kathmandu-Meeting.jpg?tr=w-780%2Ch-437%2Cfo-auto" alt="" className="featuredImg"/>
        <div className="featuredTitles">
          <h1>Pokhara</h1>
          <h2>{data[2]}</h2>
        </div>
      </div> 
      </>)}
    </div>
  )
}

export default Featured
