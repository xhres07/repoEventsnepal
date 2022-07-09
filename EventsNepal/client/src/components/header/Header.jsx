import { faCalendarDays, faUser } from "@fortawesome/free-regular-svg-icons"
import { faBirthdayCake, faLandmark, faLocation, faPerson, faPhone, faTicketSimple } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./header.css"
import { DateRange } from 'react-date-range';
import { useContext, useState } from "react";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {format} from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

function Header({type}) {
  const [destination, setDestination] = useState("");
  const [event, setEvent] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options,setOptions] = useState({
    guests: 100,
  });

  const navigate = useNavigate()
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] -1,
    };
   });
  };

  const { dispatch } = useContext(SearchContext);
  
  const handleSearch = ()=>{
    dispatch({ type: "NEW_SEARCH", payload: { destination, event, dates, options }})
    navigate("/partyPalaces", {state:{destination, event, dates, options}})
  }

  return (
    <div className="header">
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
            <div className="headerListItem active">
            <FontAwesomeIcon icon={faLandmark} />
            <span>PartyPalace</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faBirthdayCake} />
            <span>Events</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faTicketSimple} />
            <span>Booking</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faPhone} />
            <span>About Us</span>
            </div>
        </div>
        { type !== "list" &&
          <>
        <h1 className="headerTittle"> Let's Celebrate !!! </h1>
        <p className="headerDesc"> Get rewarded for your booking - unlock instance savings of 10% 
        or more with a free EventsNepal acount. 
        </p>
        {!user && <button className="headerBtn"> Sign In / Register </button>}
        <div className="headerSearch">
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faLocation} className="headerIcon"/>
          <input 
          type="text" 
          placeholder="In which location are you searching for?" 
          className="headerSearchInput" 
          onChange={(e) => setDestination(e.target.value)} 
          />
          </div>
          <div className="headerSearchItem">
          <FontAwesomeIcon icon={faLandmark} className="headerIcon"/>
          <input 
          type="text" 
          placeholder="Choose your Events" 
          className="headerSearchInput" 
          onChange={(e) => setEvent(e.target.value)} 
          />
          </div>
          <div className="headerSearchItem">
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
          <span onClick={()=>setOpenDate(!openDate)}
          className="headerSearchText">{`${format(dates[0].startDate, "MM/dd/yyyy")} 
          to 
          ${format(dates[0].endDate, "MM/dd/yyyy")}`}
          </span>
          {openDate && ( <DateRange editableDateInputs={true}
          onChange={item => setDates([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dates}
          className="date"
          minDate={new Date()}
          />)}
          </div>
          <div className="headerSearchItem">
          <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
          <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText"> {`${options.guests} + guests `}</span>
          {openOptions && <div className="options">
            <div className="optionItem">
              <span className="optionText">Guests</span>
              <div className="optionCounter">
              <button disabled={options.guests <= 1} className="optionCounterButton" onClick={()=>handleOption("guests", "d")}>-</button>
              <span className="optionCounterNumber">{options.guests}</span>
              <button className="optionCounterButton" onClick={()=>handleOption("guests", "i")}>+</button>
              </div>
            </div>
          </div>
          }
          </div>
          <div className="headerSearchItem">
          <button className="headerBtn" onClick={handleSearch}>Search</button>
          </div>
        </div> 
        </>}
        </div>
    </div>
  )
}

export default Header