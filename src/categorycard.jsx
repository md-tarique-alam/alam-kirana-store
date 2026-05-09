function Categorycard({ category }) {
  return (
    <div className="bg-blue-100 p-20 m-2 rounded">
      <img src="category.image" width="180"></img>
      <h3>{category.title}</h3>
    </div>
  );
}
export default Categorycard;
