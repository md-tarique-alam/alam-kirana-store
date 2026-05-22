import { Link } from "react-router-dom";

function Categorycard({ category }) {
  return (
    <div className="bg-white p-3 m-2 w-52 flex-shrink-0 rounded-lg snap-start hover:shadow-md border border-transparent hover:border-gray-300 group ">
      <Link to={`/category/${category}`}>
        {/* <img className="w-full h-55 object-contain rounded " src={category.image}/> */}
        <h3 className="text-md font-medium text-center text-gray-800 group-hover:text-lime-700">
          {category}
        </h3>
      </Link>
    </div>
  );
}
export default Categorycard;
