import React, {useState} from 'react';
import './App.css';
import {Editor} from "./editor/Editor";

function SearchField(props: {setSearchString: (val: string) => void}) {
  return <input type="text" onChange={(e) => {
    e.preventDefault();
    e.stopPropagation();
    props.setSearchString(e.target.value)
  }}/>;
}

function App() {
  const [searchString, setSearchString] = useState('');

  return (
    <div className="App">
      <div>
        <SearchField setSearchString={setSearchString}/>
      </div>
      <div>
        <Editor txt="Hello from the editor" searchString={searchString}/>
      </div>
    </div>
  );
}

export default App;
