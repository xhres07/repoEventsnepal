import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import './reserve.css'
import {SearchContext} from "../../context/SearchContext"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Reserve = ({setOpen, partyPalaceId}) => {

    const [selectedMenues, setSelectedMenues] = useState([])
    const { data, laoding, error } = useFetch(`/partyPalaces/venue/${partyPalaceId}`)
    const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (Menue) => {
        const isFound = Menue.unavailableDates.some(date=>
            alldates.includes(new Date(date).getTime())
            )
            return !isFound
    }

    const handleSelect = (e)=>{
        const checked = e.target.checked
        const value = e.target.value
        setSelectedMenues(checked ? 
            [...selectedMenues, value]
             : selectedMenues.filter((item) =>item != value)
        )
    }

    const navigate = useNavigate()

    const handleClick = async ()=>{
        try{
            await Promise.all(selectedMenues.map((menueId)=>{
                const res = axios.put(`/venues/availability/${menueId}`, {
                    dates:alldates
                })
                return res.data
            })
          )
          setOpen(false)
          navigate("/")
        }catch(err){}
    }
  return (
    <div className='reserve'>
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} 
            className="rClose" 
            onClick={()=> setOpen(false)}
            />
            <span>Select your Venue:</span>
            {data.map((item)=>(
                <div className="rItem">
                    <div className="rItemInfo">
                        <div className="rTitle">{item.title}</div>
                        <div className="rDesc">{item.desc}</div>
                        <div className="rMax">
                            Max People: <b>{item.maxPeople}</b>
                        </div>
                        <div className="rPrice">{item.price}</div>
                    </div>
                    <div className="rSelectMenues">
                    {item.menue.map(Menue=>(
                    <div className="room">
                        <label>{Menue.menue}</label>
                        <input type="checkbox" value={Menue._id} onChange={handleSelect}
                        disabled={!isAvailable(Menue)}/>
                    </div> 
                    ))} 
                    </div>            
                </div>
            ))}
            <button onClick={handleClick} className="rButton"> Reserve Now! </button>
        </div>
    </div>
  )
}

export default Reserve