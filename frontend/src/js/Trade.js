import React from 'react'
import styleCss from '../css/trade.module.css'
import PopupCreate from '../js/PopupCreateTrade.js'

class Popup extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: '',
			ora: ''
		}

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeOra = this.handleChangeOra.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeName(event) {
		this.setState({name: event.target.value});
	}

	handleChangeOra(event) {
		this.setState({ora: event.target.value});
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
          </label>
		  <label> Ora:
          <input type="text" value={this.state.ora} onChange={this.handleChangeOra} />
          </label>
          <input type="submit" value="Submit" />
      	  </form>
		  <button onClick={this.props.closePopup}>Inchide</button>
		  </div>
		</div>
	  );
	}
  }

class Trade extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			showPopup: false,
			showPopupCreate: false,
			selectedID: -1,
			deals: [
				{id: 1, materie: 'Laborator - MAS', user1: 'user1', ora: '12:00', saptamana: '7', taken: true},
				{id: 2, materie: 'Laborator - TES', user1: 'user2', ora: '13:00', saptamana: '7', taken: false},
				{id: 3, materie: 'Seminar - PPS', user1: 'user3', ora: '14:00', saptamana: '7', taken: false},
				{id: 4, materie: 'Seminar - HCI', user1: 'user4', ora: '15:00', saptamana: '7', taken: false}
			]
		}
	}

	togglePopup(id) {
		this.setState({
			selectedID: id,
		  	showPopup: !this.state.showPopup
		});
	}

	togglePopupCreate() {
		this.setState({
		  	showPopupCreate: !this.state.showPopupCreate
		});
	}

	renderData() {
		return this.state.deals.map((deal, index) => {
			const { id, materie, user1, ora, saptamana, taken } = deal
			return (
				<div id={ id } className={styleCss.dealStyle}>
					<h1> {materie} </h1>
					<h2> {user1} </h2>
					<h2> Saptamana {saptamana} </h2>
					<h2> Ora: {ora} </h2>
					{
						taken == false ? (
							<button onClick={this.togglePopup.bind(this, id)}>Propune</button>
						) : (
							<h3>Utilizatorul deja a acceptat o propunere.</h3>
						)
					}
				</div>
			)
		})
	}

    render() {
        return (
		<div>
			<div>
				<button onClick={this.togglePopupCreate.bind(this)}>Adauga un schimb</button>
			</div>
			<div className={styleCss.scrollerTradeStyle}>
				{ this.renderData() }
			</div>
			{this.state.showPopupCreate ?  <PopupCreate text='Creaza' closePopup={this.togglePopupCreate.bind(this)}/> : null }
			{this.state.showPopup ?  <Popup text='Propune' idx={this.state.selectedID} closePopup={this.togglePopup.bind(this)}/> : null }
		</div>
        );
    }
}

export default Trade;