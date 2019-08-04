import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import lock from './lock.png';

const callApi = async (code) => {

  if (code.length > 3) {

    fetch('/check', {
      method: 'POST',
      body: JSON.stringify({"code": code}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((resp) => resp.json()).then(function(response) {

        if (response.message === 'CORRECT') {
          document.getElementById("lock-icon").style.backgroundColor = "#4CAF50";
        }
    });
  }
}

const inputTracker = (state = "", action) => {

  if (action.type === "ADD" && state.length <= 3) {
    return state + action.value
  } else if (action.type === "ZERO") {
    return ""
  } else {
    return state
  }
}

const store = createStore(inputTracker);

const PadButton = ({ value, type }) => {

  return ( <button class="pad" onClick={e => store.dispatch({ type:type , value:value })} >{value}</button> );

}

const Icon = () => {

  return ( <img id="lock-icon" src={lock}  width="50px" height="50px" /> );
}

const App = () => {
  callApi(store.getState());

  return (
      <div class="padWrapper">
        <div><input type="text" class="padDisplay" value={store.getState()} size="9"/> </div>
        <PadButton value="1" type="ADD"/>
        <PadButton value="2" type="ADD"/>
        <PadButton value="3" type="ADD"/>
        <br/>
        <PadButton value="4" type="ADD"/>
        <PadButton value="5" type="ADD"/>
        <PadButton value="6" type="ADD"/>
        <br/>
        <PadButton value="7" type="ADD"/>
        <PadButton value="8" type="ADD"/>
        <PadButton value="9" type="ADD"/>
        <br/>
        <PadButton value="C" type="ZERO"/>
        <PadButton value="0" type="ADD"/>
        <Icon />
      </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

export default App;