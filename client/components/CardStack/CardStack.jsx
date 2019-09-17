import React from 'react'
import BackgroundCardStack from '../BackgroundCardStack/BackgroundCardStack'
import Card from '../Card/Card'
import './CardStack.css'

class CardStack extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    const { params, onSubmit, readOnly, stackSize, showCard } = this.props
    return (
        <div>
          {showCard &&
            <div className="glbFullAbsolute cardStackOuter">
              <Card
                params={params}
                onSubmit={onSubmit}
                readOnly={readOnly}
              />
              <BackgroundCardStack count={stackSize} />
            </div>
          }
          {!showCard &&
            <div className="glbFullAbsolute">
              <div className="opponentCard" />
              <BackgroundCardStack count={stackSize} back={true} />
            </div>
          }
        </div>
    )
  }
}

export default CardStack
