import React from 'react'

export default function PlayerInfo({ leftSide, playerName, wins }) {

  function handleCheckBox(e) {
    e.preventDefault();
  }

  return (
    <div className={`player-info-container ${leftSide ? "p-info-left" : "p-info-right"}`}>
      <div style={{ flexDirection: `${!leftSide ? "row-reverse" : ""}` }} className="player-name-container">
        <h2>{playerName}</h2>
        <div className="custom-checkbox">
          <input onChange={handleCheckBox} id="player-ready" type="checkbox" />
          <label htmlFor="player-ready"></label>
        </div>
      </div>
      <h3>{wins}</h3>
    </div>
  )
}