import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import { Home, Cart } from './pages'
import { setPizzas } from './redux/actions/pizzas'
import store from './redux/store'
// function App() {

// 	React.useEffect(() => {
// 		axios.get('http://localhost:3000/db.json')
// 			.then(({ data }) => { setPizzas(data.pizzas) })
// 	}, [])

// 	return
// }
class App extends React.Component {
	componentDidMount() {
		axios.get('http://localhost:3000/db.json').then(({ data }) => {
			this.props.setPizzas(data.pizzas)
			console.log('Получил ПИЦЦЫ!')
		})
	}
	render() {
		console.log(this.props)
		return (
			<div className="App">
				<div className="wrapper">
					<Header />
					<div className="content">
						<Routes>
							<Route path='/cart' element={<Cart />} />
							<Route path='/' element={<Home items={this.props.items} exact />} />
						</Routes>
					</div>
				</div>
			</div >
		)
	}
}

const mapStateToProps = (state) => {
	return {
		items: state.pizzas.items,
		filters: state.filters
	}
}
const mapDispatchToProps = { setPizzas }
export default connect(mapStateToProps, mapDispatchToProps)(App)
