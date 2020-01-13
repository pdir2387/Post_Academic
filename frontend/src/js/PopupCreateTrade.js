import React from 'react'
import styleCss from '../css/trade.module.css'

class PopupCreate extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: '',
			ora: '',
			mateire: '',
			saptamana: ''
		}

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeOra = this.handleChangeOra.bind(this);
		this.handleChangeMaterie = this.handleChangeMaterie.bind(this);
		this.handleChangeSapt = this.handleChangeSapt.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeName(event) {
		this.setState({name: event.target.value});
	}

	handleChangeOra(event) {
		this.setState({ora: event.target.value});
	}

	handleChangeMaterie(event) {
		this.setState({mateire: event.target.value});
	}

	handleChangeSapt(event) {
		this.setState({saptamana: event.target.value});
	}
	
	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.name + '|' + this.state.ora);
		event.preventDefault();
		this.props.closePopup()
	}
	

	render() {
	  return (
		<div className={styleCss.popup}>
		  <div className={styleCss.popup_inner}>
	  	  <h1>{this.props.text}: {this.props.idx}</h1>
		  <form onSubmit={this.handleSubmit}>
          <label> Name:
          <input type="text" value={this.state.name} onChange={this.handleChangeName} />
          </label><br></br>
		  <label> Ora:
          <input type="text" value={this.state.ora} onChange={this.handleChangeOra} />
          </label><br></br>
		  <label> Materie:
          <input type="text" value={this.state.mateire} onChange={this.handleChangeMaterie} />
          </label><br></br>
		  <label> Saptamana:
          <input type="text" value={this.state.saptamana} onChange={this.handleChangeSapt} />
          </label>
          <input type="submit" value="Submit" />
      	  </form>
		  <button onClick={this.props.closePopup}>Inchide</button>
		  </div>
		</div>
	  );
	}
  }

  export default PopupCreate;