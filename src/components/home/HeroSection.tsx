const HeroSection = () => {
  return (
    <div>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co.com/N1y8n02/humphrey-muleba-LOA2m-Tj1vhc-unsplash.jpg"
            className="w-full max-h-screen object-cover"
          />
          <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle btn-sm sm:btn-md">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle btn-sm sm:btn-md">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co.com/ZdTvTtq/ryan-hoffman-kk-VAh-FEZCWk-unsplash.jpg"
            className="w-full max-h-screen object-cover"
          />
          <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle btn-sm sm:btn-md">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle btn-sm sm:btn-md">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            className="w-full max-h-screen object-cover"
            src="https://i.ibb.co.com/qCJD31M/craig-lovelidge-c9wa9-EWN-fw-unsplash-1.jpg"
            alt="craig-lovelidge-c9wa9-EWN-fw-unsplash-1"
          ></img>
          <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle btn-sm sm:btn-md">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle btn-sm sm:btn-md">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://i.ibb.co.com/9cyK8zk/photo-genius-Xqxnqyq-DU0k-unsplash.jpg"
            alt="photo-genius-Xqxnqyq-DU0k-unsplash"
            className="w-full max-h-screen object-cover"
          />
          <div className="absolute left-2 right-2 sm:left-5 sm:right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle btn-sm sm:btn-md">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle btn-sm sm:btn-md">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
