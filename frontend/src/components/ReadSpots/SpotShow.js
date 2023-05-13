import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotByIdThunk, fetchReviewsofSpotThunk } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import DeleteReviewModal from '../DeleteReviewModal';
import CreateReviewModal from '../CreateReviewModal';
import formatDate from './formatDate';
import './SpotShow.css'


const SpotShow = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId])
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchSpotByIdThunk(spotId));
        dispatch(fetchReviewsofSpotThunk(spotId))
    }, [dispatch, spotId])

    if (!spot || !spot.SpotImages || !spot.reviews) return null;

    const spotImages = spot.SpotImages; //this is an array with an id and url in each object
    const previewImage = spotImages.find(obj => obj.preview === true)
    if (!previewImage.url) return null;

    const previewImageUrl = previewImage.url
    const smallImageUrls = spotImages.filter(image => image.preview === false).map(image => image.url);
    const spotReviewsCopy = [...spot.reviews]
    const sortedReviews = spotReviewsCopy.reverse();
    const reviews = spot.numReviews === 0 ? 'New' : spot.numReviews > 1 ? ` · ${spot.numReviews} reviews` : ' · 1 review';

    return (
        <div className="main-container">
            <h3 className="spot-show-header">{spot.name}</h3>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <div className="spot-show-img-container">
                <div className="large-img-container">
                    <img className="large-img" src={previewImageUrl} />
                </div>
                <div className="small-img-container">
                    {smallImageUrls.slice(0, 4).map((url, index) => (
                        <div className="small-img-item" key={index}><img src={url} className="small-img" /></div>
                    ))}
                </div>
            </div>
            <div className="spot-details-container">
                <div>
                    <h3 className="spot-show-header">Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                    <p>{spot.description}</p>
                </div>
                <div className='spot-reservation-container'>
                    <div className='spot-reservation-details-container'>
                        <h3>${spot.price} night</h3>
                        <div>
                            <span><i className="fa-solid fa-star"></i>{spot.avgStarRating?.toFixed(2)}</span>
                            <span>{reviews}</span>
                        </div>
                    </div>
                    <button className='reserve-button' onClick={() => alert('Feature Coming Soon...')}>Reserve</button>
                </div>
            </div>
            <div>
                <h3>
                    <span><i className="fa-solid fa-star"></i>{spot.avgStarRating?.toFixed(2)}</span>
                    <span>{reviews}</span>
                </h3>
                {sessionUser && spot.Owner.id !== sessionUser.id && !spot.reviews.find(review => review.userId === sessionUser.id) && <OpenModalButton modalComponent={<CreateReviewModal spotId={spot.id} />} buttonText={'Post Your Review'} />}
                {!sortedReviews.length && sessionUser && spot.Owner.id !== sessionUser.id && <p>Be the first to post a review!</p>}
                {sortedReviews.map(review => (
                    <div className="review-container" key={review.id}>
                        <h4>{review.User?.firstName}</h4>
                        {sessionUser?.id === review.userId && <OpenModalButton modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spot.id} />} buttonText={'Delete'} />}
                        <p className='review-date'>{formatDate(review.createdAt)}</p>
                        <p>{review.review}</p>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default SpotShow
