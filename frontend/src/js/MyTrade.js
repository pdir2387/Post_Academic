import React from 'react'
import styleCss from '../css/trade.module.css'

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
			],
			toBeAcceptedDeals: [
				{id: 2, idD: 2, user: 'user5', ora: '14:00'},
				{id: 3, idD: 2, user: 'user3', ora: '8:00'},
				{id: 4, idD: 2, user: 'user9', ora: '10:00'}
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

	renderDealData(idK) {
		return this.state.toBeAcceptedDeals.map((deal, index) => {
			const { id, idD, user, ora} = deal
			return (
				idD == idK ? 
				<div id={ id } className={styleCss.dealMiniStyle}>
					<h2> {user} </h2>
					<h2> Ora: {ora} </h2>
					<button>Accepta</button>
				</div> : <div></div>
			)
		})
	}

	renderData() {
		return this.state.deals.map((deal, index) => {
			const { id, materie, user1, ora, saptamana, taken } = deal
			return (
				<div id={ id } className={taken == false ? (styleCss.dealLargeStyle) : (styleCss.dealStyle)}>
					<h1> {materie} </h1>
					<h2> {user1} </h2>
					<h2> Saptamana {saptamana} </h2>
					<h2> Ora: {ora} </h2>
					{
						taken == false ? (
							<div className={styleCss.scrollerTradeBigStyle}>
								<br></br>
								{ this.renderDealData(id) }
							</div>
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
		</div>
        );
    }
}

export default MyTrade;