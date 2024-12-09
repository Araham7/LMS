import { BsFacebook, BsInstagram, BsWhatsapp, BsYoutube, BsGeoAlt, BsLinkedin, BsTwitter } from 'react-icons/bs';

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (
    <div>
    {/* footer-section */}
      <footer className='relative left-0 bottom-0 h-[10vh] w-full py-1 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20'>

        {/* footer-text */}
        <section className=' font-bold text-2xl  text-red'>
        &copy; {year} | All rights reserved
        </section>

        {/* Icons */}
        <section className='flex items-center justify-center gap-5 text-2xl text-white'>
          <a href="https://www.facebook.com" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
            <BsFacebook /> {/* fb-icon */}
          </a>
          <a href="https://www.instagram.com" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
            <BsInstagram /> {/* insta-icon */}
          </a>
          <a href="https://wa.me" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
            <BsWhatsapp /> {/* whatsapp-icon */}
          </a>
          <a href="https://www.youtube.com" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
            <BsYoutube /> {/* youtube-icon */}
          </a>
          <a href="https://www.linkedin.com" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
            <BsLinkedin /> {/* linkIn-icon */}
          </a>
          <a href="https://twitter.com" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
            <BsTwitter /> {/* twitter-icon */}
          </a>
          <a href="https://www.google.com/maps" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
            <BsGeoAlt /> {/* map-icon */}
          </a>
        </section>
      </footer>
    </div>
  );
}

export default Footer;

