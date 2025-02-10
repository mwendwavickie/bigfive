import React from 'react';
import { Card, Carousel} from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import './Testimonials.css';

const reviews = [
    { id: 1, name: 'Jane Wangechi', rating: 4.8, comment: 'Amazing products! My skin has never felt better.' },
    { id: 2, name: 'John Juma', rating: 4, comment: 'Great quality, but the scent was a bit strong for me.' },
    { id: 3, name: 'Emily Moraa', rating: 5, comment: 'Super moisturizing! Highly recommend.' },
    { id: 4, name: 'Makena Joy', rating: 5, comment: 'The coffee was great! The aroma was to die for.' }
  ];

  const Testimonials = () => {
    return (
      <div className="ReviewContainer mt-5">
      <h2 className="text-center mb-4">What Our Customers Say</h2>
      <Carousel interval={3000} indicators={false} controls={true}>
        {Array.from({ length: Math.ceil(reviews.length / 2) }, (_, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center">
              {[reviews[index * 2], reviews[index * 2 + 1]].map(
                (review, i) =>
                  review && (
                    <Card key={review.id} className="testimonial-card m-2 p-3" style={{ width: '45%' }}>
                      <Card.Body>
                        <Card.Title>{review.name}</Card.Title>
                        <div>
                          {[...Array(5)].map((_, j) => (
                            <FaStar key={j} color={j < Math.round(review.rating) ? 'gold' : 'gray'} />
                          ))}
                        </div>
                        <Card.Text className="mt-2">"{review.comment}"</Card.Text>
                      </Card.Body>
                    </Card>
                  )
              )}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
    );
  };
  
  export default Testimonials;