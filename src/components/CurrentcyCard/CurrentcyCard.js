import './CurrentcyCard.css';

const CurrentcyCard = ({currentcy, isVisible}) => {
	return (
		<section
			className={`currentcyCard ${isVisible ? 'currentcyCard_visible' : ''}`}
		>
			<img
				className='currentcyCard__image'
				src={`https://flagcdn.com/w320/${currentcy.country}.png`}
				alt={currentcy.country}
			/>
			<div className='currentcyCard__container'>
				<h1 className='currentcyCard_currentcy-name'>{`Название: ${currentcy.name}`}</h1>
				<h2 className='currentcyCard_currentcy-rate'>{`Курс к Евро: ${currentcy.rate}`}</h2>
			</div>
		</section>
	);
};

export default CurrentcyCard;
