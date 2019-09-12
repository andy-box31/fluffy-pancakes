import debounce from './debounce'

let notCalled = true

export default function veiwportHeightSetter () {
  if (notCalled) {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.addEventListener('resize', debounce(() => {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }, 200))
    notCalled = false
  }
}
