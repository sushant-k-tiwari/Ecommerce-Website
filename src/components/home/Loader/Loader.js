import React from 'react'
import "./Loader.css"




const Loader = () => {

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

        // <div className="cover-spin"></div>
    )
}

export default Loader