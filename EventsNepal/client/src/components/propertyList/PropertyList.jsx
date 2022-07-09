import useFetch from "../../hooks/useFetch.js"
import "./propertyList.css"

const PropertyList = () => {

    const {data, loading, error} = useFetch("/partyPalaces/countByType");

    const images = [
        "https://amrapalibanquet.com/wp-content/uploads/2021/02/amrapali_reception.jpg",
        "https://lh3.googleusercontent.com/p/AF1QipMIrVYOPV98_0myAPsYR7rZriBN2DHt4wn9ovDY=w1080-h608-p-no-v0",
        "https://anmolbanquet.com/wp-content/uploads/2020/04/Anmol_Banquet_Catering_Kathmandu3.jpg",
        "https://alicereceptions.com/uploads/topics/15725873198146.jpg",
      ];

      return (
        <div className="pList">
          {loading ? (
            "loading"
          ) : (
            <>
              {data &&
                images.map((img,i) => (
                  <div className="pListItem" key={i} >
                    <img
                      src={img}
                      alt=""
                      className="pListImg"
                    />
                    <div className="pListTitles">
                    <h1>{data[i]?.type}</h1>
                    <h2>{data[i]?.count} {data[i]?.type}</h2>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      );
    };
    
    export default PropertyList;