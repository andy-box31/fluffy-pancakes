import React from 'react'
import Api from '../../services/api'

import Card from '../Card/Card'

class App extends React.Component {
  constructor (props) {
    super (props)

    this.getDatas()
    this.state= {transformers: []}
  }

  async getDatas() {
    const transformers = await Api.get('transformers')
    this.setState({transformers: transformers})
  }
  render () {
    const cardList = this.state.transformers.map((transformer) => <Card params={transformer} />)

    return (
    <React.Fragment>
      <h1>Yo, {this.props.name}</h1>
      {this.state.transformers.length > 0 && cardList}
    </React.Fragment>
    )
  }
}

export default App
