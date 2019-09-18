import React from 'react'
import PropTypes from 'prop-types'
import BackgroundCardStack from '../BackgroundCardStack/BackgroundCardStack'
import Card from '../Card/Card'
import './CardStack.css'

const CardStack = ({params, onSubmit, readOnly, stackSize, showCard}) => {
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

CardStack.defaultProps = {
  readOnly: true,
  stackSize: 0,
  showCard: false
}

CardStack.propTypes = {
  params: PropTypes.object,
  onSubmit: PropTypes.func,
  readOnly: PropTypes.bool,
  stackSize: PropTypes.number,
  showCard: PropTypes.bool.isRequired
}

export default CardStack
