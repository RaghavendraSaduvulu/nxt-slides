import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class NxtSlides extends Component {
  state = {
    slidesList: initialSlidesList,
    activeSlideId: initialSlidesList[0].id,
    headingText: initialSlidesList[0].heading,
    descriptionText: initialSlidesList[0].description,
    isHeadingActive: false,
    isDescriptionActive: false,
  }

  onChangeHeading = event => {
    const {slidesList, activeSlideId} = this.state
    this.setState({
      headingText: event.target.value,
      slidesList: slidesList.map(eachItem => {
        if (eachItem.id === activeSlideId) {
          return {...eachItem, heading: event.target.value}
        }
        return eachItem
      }),
    })
  }

  onChangeDescription = event => {
    const {slidesList, activeSlideId} = this.state
    this.setState({
      descriptionText: event.target.value,
      slidesList: slidesList.map(eachItem => {
        if (eachItem.id === activeSlideId) {
          return {...eachItem, description: event.target.value}
        }
        return eachItem
      }),
    })
  }

  getSlideNumber = id => {
    const {slidesList} = this.state
    let count = 0
    let i = 0
    while (i < slidesList.length) {
      if (slidesList[i].id === id) {
        count += 1
        break
      } else {
        count += 1
      }
      i += 1
    }

    return count
  }

  onClickSlideItem = id => {
    const {slidesList} = this.state

    const slideDetails = slidesList.find(each => each.id === id)

    this.setState({
      activeSlideId: slideDetails.id,
      headingText: slideDetails.heading,
      descriptionText: slideDetails.description,
    })
  }

  onClickHeading = () => {
    this.setState(prevState => ({isHeadingActive: !prevState.isHeadingActive}))
  }

  onFocusOutHeading = () => {
    const {slidesList, activeSlideId, headingText} = this.state
    this.setState(prevState => ({isHeadingActive: !prevState.isHeadingActive}))
    this.setState({
      slidesList: slidesList.map(eachItem => {
        if (eachItem.id === activeSlideId) {
          if (headingText === '') {
            this.setState({headingText: 'Heading'})
            return {...eachItem, heading: 'Heading'}
          }
          return eachItem
        }
        return eachItem
      }),
    })
  }

  onClickDescription = () => {
    this.setState(prevState => ({
      isDescriptionActive: !prevState.isDescriptionActive,
    }))
  }

  onFocusOutDescription = () => {
    const {slidesList, activeSlideId, descriptionText} = this.state
    this.setState(prevState => ({
      isDescriptionActive: !prevState.isDescriptionActive,
    }))
    this.setState({
      slidesList: slidesList.map(eachItem => {
        if (eachItem.id === activeSlideId) {
          if (descriptionText === '') {
            this.setState({descriptionText: 'Description'})
            return {...eachItem, description: 'Description'}
          }
          return eachItem
        }
        return eachItem
      }),
    })
  }

  addSlide = () => {
    const {slidesList, activeSlideId} = this.state
    const newList = slidesList.copyWithin((0: slidesList.length))
    const activeSlide = slidesList.find(each => each.id === activeSlideId)
    const index = slidesList.indexOf(activeSlide)
    const newSlide = {id: v4(), heading: 'Heading', description: 'Description'}
    newList.splice(index + 1, 0, newSlide)
    this.setState(
      {
        activeSlideId: newSlide.id,
        slidesList: newList,
      },
      this.onClickSlideItem(newSlide.id),
    )
  }

  render() {
    const {
      slidesList,
      activeSlideId,
      isHeadingActive,
      isDescriptionActive,
      headingText,
      descriptionText,
    } = this.state

    return (
      <div className="app-container">
        <div className="header">
          <img
            className="nxt-slides-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-logo.png"
            alt="nxt slides logo"
          />
          <h1 className="header-heading">Nxt Slides</h1>
        </div>
        <button onClick={this.addSlide} className="new-btn" type="button">
          <img
            className="plus-icon"
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
            alt="new plus icon"
          />
          New
        </button>
        <div className="slides-list-view-container">
          <div className="list-container">
            <ol className="list">
              {slidesList.map(eachItem => {
                const {heading, id, description} = eachItem
                const activeItem = id === activeSlideId && 'active-item-bg'
                const onClickSlide = () => {
                  this.onClickSlideItem(id)
                }
                return (
                  <li
                    testid={`slideTab${this.getSlideNumber(id)}`}
                    onClick={onClickSlide}
                    key={id}
                    className={`list-item ${activeItem}`}
                  >
                    <p>{this.getSlideNumber(id)}</p>
                    <div className="slide">
                      <h1>{heading}</h1>
                      <p>{description}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
          <div className="view-container">
            {isHeadingActive ? (
              <input
                type="text"
                className="heading-input"
                onBlur={this.onFocusOutHeading}
                onChange={this.onChangeHeading}
                value={headingText}
              />
            ) : (
              <h1 className="active-heading" onClick={this.onClickHeading}>
                {headingText}
              </h1>
            )}
            {isDescriptionActive ? (
              <input
                type="text"
                onBlur={this.onFocusOutDescription}
                onChange={this.onChangeDescription}
                value={descriptionText}
                className="description-input"
              />
            ) : (
              <p
                onClick={this.onClickDescription}
                className="active-description"
              >
                {descriptionText}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default NxtSlides
