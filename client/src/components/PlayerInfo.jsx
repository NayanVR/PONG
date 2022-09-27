import React, { useState } from 'react'

export default function PlayerInfo({ leftSide, clientNumber, gameInfo, socket }) {

  const sideIndex = leftSide ? 0 : 1;

  function handleCheckBox() {
    if (leftSide && clientNumber === 1) {
      gameInfo.ready[0] = true;
    }
    if (!leftSide && clientNumber === 2) {
      gameInfo.ready[1] = true;
    }
    socket.emit('setGameInfo', gameInfo);
  }

  return (
    <div className={`player-info-container ${leftSide ? "p-info-left" : "p-info-right"}`}>
      <div style={{ flexDirection: `${!leftSide ? "row-reverse" : ""}` }} className="player-name-container">
        <h2>{leftSide ? gameInfo.usernames[0] : gameInfo.usernames[1]}</h2>
        <div className="custom-checkbox">
          <input onChange={handleCheckBox} checked={gameInfo.ready[sideIndex]} id={`${leftSide ? "left-ready" : "right-ready"}`} type="checkbox" />
          <label htmlFor={`${leftSide ? "left-ready" : "right-ready"}`}></label>
        </div>
      </div>
      <h3>{`Wins : ${gameInfo.wins[sideIndex]}`}</h3>
    </div>
  )
}