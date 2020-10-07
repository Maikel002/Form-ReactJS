import React, { Component } from 'react';
import './App.css';

class App extends Component {

  dataToEdit = []

  constructor(props) {
    super(props);
    this.state = {
      act: 0,
      index: '',
      datas: []
    }
  }

  componentDidMount() {
    this.refs.name.focus();
  }

  // id checkbox
  checkboxId = (i) => {
    this.dataToEdit = [i]
    console.log(i)
  }

  remove = () => {
    let datas = this.state.datas;
    datas.splice(this.dataToEdit, 1);
    this.setState({
      datas: this.dataToEdit
    });
  }

  edit = () => {

    this.refs.name.value = this.dataToEdit.name;
    this.refs.address.value = this.dataToEdit.address;
    this.refs.age.value = this.dataToEdit.age;
    this.setState({
      act: 1,
      index: this.dataToEdit
    });

    this.refs.name.focus();
  }

  fSubmit = (e) => {
    e.preventDefault();
    // console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    let age = this.refs.age.value;

    if (this.state.act === 0) {   //new
      let data = {
        name, address, age
      }
      datas.push(data);
    } else {                      //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
      datas[index].age = age;
    }

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;
    this.refs.age.value = data.age;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
  }

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>Input Data</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Nama" className="formField" />
          <input type="text" ref="address" placeholder="Alamat" className="formField" />
          <input type="text" ref="age" placeholder="Usia" className="formField" />
          <button onClick={(e) => this.fSubmit(e)} className="myButton">submit </button>
          <button type="reset" className="myButton">reset </button>
        </form>
        <h2>Data</h2>
        <div className="myForm">
          <table className="myForm2">
            <tr>
              <td><b>Nama</b></td>
              <td><b>Alamat</b></td>
              <td><b>Usia</b></td>
            </tr>
            {datas.map((data, i) =>
              <tr>
                <td>{data.name}</td>
                <td>{data.address}</td>
                <td>{data.age} Tahun</td>
                <td ><input type="checkbox" onClick={() => this.checkboxId(data)} /></td>
                <button onClick={() => this.fRemove(i)} className="myButton">delete</button>
                <button onClick={() => this.fEdit(i)} className="myButton">edit</button>
              </tr>)}
          </table>
          <button className="myButton" onClick={() => this.edit()}>edit</button>
          <button className="myButton" onClick={() => this.remove()}>delete</button>
          {/* <button className="myButton" >edit</button>
          <button className="myButton" >delete</button> */}
        </div>
      </div>
    );
  }
}

export default App;