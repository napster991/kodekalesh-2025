import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className=''>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='flex my-10 flex-col sm:flex-row gap-12'>
         <img className='w-full md:max-w-[360px]' src={assets.about_image}/>
         <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita eaque animi illo sed dicta. Expedita, nihil velit eaque esse possimus nemo, ducimus tenetur, ullam voluptas libero sit deserunt exercitationem cumque iste quasi maiores.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eos quae maxime laudantium placeat perspiciatis necessitatibus cumque obcaecati modi, sunt dolorem, magni quo quidem debitis facilis est odio expedita? Cupiditate.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et beatae, totam iusto repellat quaerat quasi, cum ullam in non numquam unde vel quo alias, officiis sequi architecto tenetur quisquam perspiciatis velit dolor dolores iure. Odio laudantium facilis at ex asperiores.</p>
         </div>
      </div>
    </div>
  )
}

export default About