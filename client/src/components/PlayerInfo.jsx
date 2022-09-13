import React from 'react'

export default function PlayerInfo({ leftSide, playerName, wins }) {
  return (
    <div className={`player-info-container ${leftSide ? "p-info-left" : "p-info-right"}`}>
      <div style={{ flexDirection: `${!leftSide ? "row-reverse" : ""}` }} className="player-name-container">
        <h2>{playerName}</h2>
        <div className="custom-checkbox">
          <input id={`${leftSide ? "left-player-ready" : "right-player-ready"}`} type="checkbox" />
          <label htmlFor={`${leftSide ? "left-player-ready" : "right-player-ready"}`}></label>
        </div>
      </div>
      <h3>{wins}</h3>
    </div>
  )
}