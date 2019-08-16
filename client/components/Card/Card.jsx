import React from 'react'
import './Card.css'

class Card extends React.Component {
  constructor (props) {
    super (props)
    this.state = {pick: null, score: 0}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit({
      pick: this.state.pick, 
      score: this.state.score
    })
  }

  handleChange (e) {
    const pick = e.target.value
    this.setState({
      pick,
      score: this.props.params[pick]
    })
  }

    render () {
      const {params} = this.props
      const details = Object.keys(params).map((key, i) =>
        <label key={key} className="cardRadio">
          <input
            type="radio"
            name="selection"
            value={key}
            onChange={this.handleChange}
          /> {key}: {params[key]}
        </label>
      )
      return (
        <div className="card">
          <header className="cardHeader">
            {params.Image && <img className="cardImage" src={params.Image} alt={`image of ${params.Name}`} /> }
            <h1 className="cardTitle">
              {params.Name ? params.Name : 'Card info'}
            </h1>
          </header>
          <div className="cardContent"></div>
          <form onSubmit={this.handleSubmit}>{details}
              <input type='submit' value='Submit' />
          </form>
        </div>
      )
    }
}

export default Card
