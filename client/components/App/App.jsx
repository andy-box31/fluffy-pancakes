import React from 'react'
import Api from '../../services/api'

class App extends React.Component {
  constructor (props) {
    super (props)

    this.getDatas()
  }

  async getDatas() {
    const transformers = await Api.get('transformers')
    console.log(transformers)
  }
  render () {
    return <h1>Yo, {this.props.name}</h1>
  }
}

export default App
