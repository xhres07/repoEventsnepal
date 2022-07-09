import "./list.css"
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { format } from "date-fns"
import { DateRange } from "react-date-range"
import SearchItem from "../../components/searchItem/SearchItem"
import useFetch from "../../hooks/useFetch.js"

const List = () => {

  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination)
  const [event, setEvent] = useState(location.state.event)
  const [dates, setDates] = useState(location.state.dates)
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state.options)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)

  const { data, loading, error, reFetch } = useFetch(`/partyPalaces?city=${destination}&min=${min || 0}&max=${max || 999}`)

  const handleClick = ()=> {
    reFetch()
  }

  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Location</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Events</label>
              <input placeholder={event} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-In Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
              <div className="lsOptionItem">
                <span className="lsOptionText"> Min Price <small>Per Person</small>
                </span>
                <input type="number" onChange={e=>setMin(e.target.value)} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText"> Max Price <small>Per Person</small>
                </span>
                <input type="number" onChange={e=>setMax(e.target.value)} className="lsOptionInput" />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText"> Guests 
                </span>
                <input type="number" min={1} className="lsOptionInput" placeholder={options.guests}/>
              </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? "loading" : <>
            {data.map(item=>(
            <SearchItem item={item} key={item._id}/>
            ))}
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List
