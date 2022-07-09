import "./partyPalace.css"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft, faCircleArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import MailList from "../../components/mailList/MailList"
import Footer from "../../components/footer/Footer"
import { useContext, useState } from "react"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import useFetch from "../../hooks/useFetch.js"
import { useLocation, useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext"
import { parseWithOptions } from "date-fns/fp"
import { AuthContext } from "../../context/AuthContext"
import Reserve from "../../components/reserve/Reserve"

export const PartyPalace = () => {

  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const {data, loading, error } = useFetch(`/partyPalaces/find/${id}`)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days =(dayDifference(dates[0].endDate, dates[0].startDate))


  const handleOpen = (i)=>{
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
    newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;   
  } else {
    newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
  }

  setSlideNumber(newSlideNumber)
  };

  const handleClick = ()=> {
    if(user){
      setOpenModal(true)
    }else{
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      {loading ? (
      "loading"
      ) : (
      <div className="ppContainer">
        {open && <div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
          <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")}/>
        </div>}
        <div className="ppWrapper">
          <button className="bookNow">Reserve or Book Now!!!
          </button>
          <h1 className="ppTitle">{data.name}</h1>
          <div className="ppAddress">
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>{data.address}</span>
          </div>
          <span className="ppDistance">
            Excellent Location - {data.distance} from Center
          </span>
          <span className="ppPriceHighlight">
            Book and party over ${data.cheapestPrice} at this awesome venue and get a special offer
          </span>
          <div className="ppImages">
            {data.photos?.map((photo,i) => (
              <div className="ppImgWrapper">
                <img onClick={()=>handleOpen(i)} src={photo} alt="" className="ppImg" />
              </div>
            ))}
          </div>
          <div className="ppDetails">
            <div className="ppDetailsTexts">
              <h1 className="ppTitle">{data.title}</h1>
              <p className="ppDesc">
                {data.desc}
              </p>
            </div>
            <div className="ppDetailsPrice">
              <h1>Perfect Place to Celebrate</h1>
              <span>
                Located in th ereal heart of Kathmandu, 
                this venue has an excellent location score of 9.9!!!
              </span>
              <h2>
                <b>${days * data.cheapestPrice * options.guests}</b> ({days} Per Person)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!!!</button>
            </div>
          </div>
        </div>
        <MailList/>
        <Footer/>
      </div>)}
      {openModal && <Reserve setOpen={setOpenModal} partyPalaceId={id}/>}
    </div>
  )
}

export default PartyPalace