// function that passes props as its argument
const GameCard = (props) => {
  return (
    // onClick event handler with GameCard props as it's value.
    <div className="card game-card" onClick={props.onClick}>
      <div className="img-wrapper">
        <img src={props.image} alt="Game" />
      </div>
      <div className="info-wrapper flex-col">
        <h3>{props.name}</h3>
        <p>{props.rating}</p>
      </div>
    </div>
  )
}

export default GameCard
