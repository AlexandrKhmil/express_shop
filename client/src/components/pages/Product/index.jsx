import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { addToCart } from '../../../actions/modal'
import { loadComments, addComment } from '../../../actions/comment'
import styles from './styles.module.css'

class Product extends Component {
	state = {
		userComment: '',
		commentsLimit: 5,
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value })

	sendMessage = (e) => {
		e.preventDefault() 
		const message = this.state.userComment
		const { addComment } = this.props
		const { email } = this.props.user
		const { productId } = this.props.match.params
		addComment(email, message, productId) 
	}

	loadMore = () => {
		this.setState({
			...this.state,
			commentsLimit: this.state.commentsLimit + 5,
		})
	}

	componentDidMount = () => {
		const { loadComments } = this.props
		const { productId } = this.props.match.params
		loadComments(productId)
	}

	render() {
		const { onChange, sendMessage, loadMore } = this
		const { userComment, commentsLimit } = this.state
		const { products, user, allComments, addToCart } = this.props
		const { productId } = this.props.match.params
		const product = products.find(item => item.id === parseInt(productId))
		const comments = allComments[productId] !== undefined ? Object.values(allComments[productId]) : [] 
		return (
			<main> 
				<div className="container mt-5">
					{product !== undefined 
						? <>
								<div className="row">

									<div className="col-12 col-md-5 col-xl-4 mb-3">
										<div className="card card-body border-primary">
											<img
												className={`${styles.img}`}
												src={require(`../../../../static/product/${product.imgsrc}`)} 
												alt="Product"
											/>
											<div className="d-flex justify-content-center mt-3">
												Тут будет рейтинг
											</div>
										</div>
									</div> 

									<div className="col-12 col-md-7 col-xl-8 mb-3">
										<h2 className="mb-3">{product.title}</h2>
										<div className="card card-body border-primary mb-3">
											<ul className="list-group list-group-flush">
												<li className="list-group-item d-flex justify-content-between">
													<span>Автор:</span>
													<span></span>
												</li>
												<li className="list-group-item d-flex justify-content-between">
													<span>Дата публикации:</span>
													<span>{(() => {
														let date = product.publicationDate.split('T')[0].split('-')
														return `${date[2]}.${date[1]}.${date[0]}`	
													})()}</span>
												</li>
												<li className="list-group-item d-flex justify-content-between">
													<span>Язык:</span>
													<span>{product.language}</span>
												</li>
												<li className="list-group-item d-flex justify-content-between">
													<span>Кол-во страниц:</span>
													<span>{product.pages} ст.</span>
												</li>
												<li className="list-group-item d-flex justify-content-between">
													<span>Цена:</span>
													<span>{product.price.toFixed(2)} $</span>
												</li>
											</ul> 
											<button 
												className="btn btn-primary btn-lg btn-block mt-4" 
												onClick={() => addToCart(product)}
											>
												Добавить в корзину
											</button> 
										</div>
									</div>
									
									<div className="col-12 mb-3">
										<div className="card card-body border-primary">
											<h4 className="card-title">Описание:</h4>
											<p className="card-text">
												{product.description}
											</p>
										</div> 
									</div>
									
									<div className="col-12 mb-3">
										<h4 className="card-title">Отзывы:</h4>
										{
											user 
												? <div className="card card-body border-primary mb-3">
														<form onSubmit={sendMessage}>
															<div className="form-group">
																<label htmlFor="userComment">Написать комментарий:</label>
																<textarea 
																	className="form-control" 
																	name="userComment"
																	rows="1"
																	onChange={onChange}
																	value={userComment} 
																>
																</textarea>
															</div>
															<div className="form-group d-flex mb-0">
																<button type="submit" className="btn btn-primary ml-auto">
																	Отправить
																</button>
															</div>
														</form>
													</div>  
												: <p>Для возможности оставлять комментарии <NavLink to="/login">авторизируйтесь</NavLink>.</p>
										}
										
										{
											comments.slice(0, commentsLimit).map((comment, key) => 
												<div className="card card-body border-primary mb-3" key={key}>
													<span className={styles.commentIndx}>#{key + 1}</span>
													<h4 className="card-title mb-1">{comment.email}:</h4>
													<span className="small text-primary mb-2">{(() => {
														let date = product.publicationDate.split('T')[0].split('-')
														return `${date[2]}.${date[1]}.${date[0]}`	
													})()}</span>
													<p className="card-text">
														{comment.message}
													</p>
												</div>
											)
										}
										
										{
											commentsLimit < comments.length 
												?	<div className="d-flex justify-content-center">
														<button
															className="btn btn-primary"
															onClick={loadMore}
														>
															Загрузить еще
														</button>
													</div>
												: null
										} 
										
									</div>
								</div> 
							</>
						: null
					}  
				</div> 
			</main>
		)
	}
}

const mapStateToProps = state => ({
	products: state.product.products,
	user: state.auth.user,
	allComments: state.comment
})

export default connect(mapStateToProps, { addToCart, loadComments, addComment })(Product)