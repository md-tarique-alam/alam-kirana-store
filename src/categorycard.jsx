function Categorycard({ category }) {
  return (
    <div className="bg-white p-3 m-2 w-52 flex-shrink-0 rounded-lg snap-start hover:shadow-md">
      <img className="w-full h-55 object-contain rounded" src={category.image} />
      <h3 className="text-md font-medium text-center">{category.title}</h3>
    </div>
  );
}
export default Categorycard;
  