import React from 'react'
import { assets, testimonials } from '../assets/assets'
import Title from './Title'

const Testimonial = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30'>
        <Title title='What Our Guests Say' subTitle='Discover why discerning travelers consistently choose our company for their
         exclusive and luxurious accomdations around the world'/>

         {/* <div className="flex flex-wrap items-center gap-6 mt-20 mb-10"> */}
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow mt-15">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                
                                <img key={index} 
                                src={testimonial.rating > index? assets.starIconFilled:assets.starIconOutlined}/>
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Testimonial
