import React from 'react'
import styleCss from '../css/trade.module.css'

class Popup extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			deals: [
				{id: 1, idD: 1, user: 'user1', ora: '18:00'},
				{id: 2, idD: 2, user: 'user5', ora: '14:00'},
				{id: 3, idD: 2, user: 'user3', ora: '8:00'},
				{id: 4, idD: 2, user: 'user9', ora: '10:00'}
			]
		}
	}

	accepta(id) {
		alert(id);
	}

	renderData() {
		return this.state.deals.map((deal, index) => {
			const { id, idD, user, ora} = deal
			return (
				idD == this.props.idx ? 
				<div id={ id } className={styleCss.dealMiniStyle}>
					<h2> {user} </h2>
					<h2> Ora: {ora} </h2>
					<button onClick={this.accepta.bind(this, id)}>Accepta</button>
				</div> : <div></div>
			)
		})
	}
	

	render() {
	  return (
		<div className={styleCss.popup}>
		  <div className={styleCss.popup_inner}>
	  	  <h1>{this.props.text}</h1>
		  <div className={styleCss.scrollerTradeMiniStyle}>
			{ this.renderData() }
		  </div>
		  <button onClick={this.props.closePopup}>Inchide</button>
		  </div>
		</div>
	  );
	}
  }

class MyTrade extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			showPopup: false,
			selectedID: -1,
			deals: [
				{id: 1, materie: 'Laborator - MAS', user1: 'user2', ora: '12:00', saptamana: '7', taken: true},
				{id: 2, materie: 'Laborator - TS', user1: 'user2', ora: '13:00', saptamana: '7', taken: false},
			],
			acceptedDeal: [
				{id: 1, idD: 1, user: 'user1', ora: '18:00'}
			]
		}
	}

	findNameByIDB(id) {
		var aux;
		this.state.acceptedDeal.map((deal) =>
			deal.idD == id ? aux = deal : aux = aux
		)
		return aux.user
	}

	findOraByIDB(id) {
		var aux;
		this.state.acceptedDeal.map((deal) =>
			deal.idD == id ? aux = deal : aux = aux
		)
		return aux.ora
	}

	togglePopup(id) {
		this.setState({
			selectedID: id,
		  	showPopup: !this.state.showPopup
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
							<button onClick={this.togglePopup.bind(this, id)}>Vizualizeaza</button>
						) : (
							<div>
								<h3>Deja ai acceptat un schimb.</h3>
								<h3>Schimbul este cu {this.findNameByIDB(id)} la ora {this.findOraByIDB(id)}.</h3>
							</div>
						)
					}
				</div>
			)
		})
	}

    render() {
        return (
		<div>
			<div className={styleCss.scrollerTradeStyle}>
				{ this.renderData() }
			</div>
			{this.state.showPopup ?  <Popup text='Vizualizeaza' idx={this.state.selectedID} closePopup={this.togglePopup.bind(this)}/> : null }
		</div>
        );
    }
}

export default MyTrade;