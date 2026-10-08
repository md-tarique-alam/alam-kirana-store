import { Link } from "react-router-dom";

function CategoryCard({ category }) {

  const categoryImages = {
    "Baby Care": "/images/Baby Care.png",
    "Chips & Snacks": "/images/Chips & Snacks.jpg",
    "Cleaning Essentials": "/images/Cleaning Essentials.jpg",
    "Daily Essentials": "/images/Daily essentials.png",
    "Detergents": "/images/Detergents.png",
    "Dry Fruits": "/images/Dry Fruits.jpg",
    "Oil & Ghee": "/images/oil-and-ghee.png",
    "Personal Care": "/images/Personal Care.png",
    "Spices & Masalas": "/images/Spices & Masalas.jpg",
    "Sugar & Salt": "/images/Sugar & salt.png",
    "Tea, Coffee & Beverages": "/images/Tea, Coffee & Beverages.jpg",
    "Wheat & Pulses": "/images/wheat-and-pulses.png"
  };


  return (
  <div className="w-full h-full">
  <Link to={`/category/${category}`}>
    <div className="h-full bg-white p-3 rounded-xl border border-gray-200
                    hover:border-lime-500 hover:shadow-lg
                    transition-all duration-300 group">

      <div className="w-full aspect-square overflow-hidden rounded-lg bg-slate-50">
        <img
          className="w-full h-full object-contain
                     group-hover:scale-105 transition-transform duration-300"
          src={categoryImages[category]}
          alt={category}
        />
      </div>

        <h3 className="text-sm sm:text-base font-semibold text-center 
               text-gray-800 mt-3 min-h-[40px] 
               group-hover:text-lime-700 transition-colors">   
        {category}
      </h3>

    </div>
  </Link>
</div>
  );
}

export default CategoryCard;