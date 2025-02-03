// import React from 'react'

// const Diet = () => {
//    let loggedData = useContext(UserContext);
//     const [items, setItems] = useState([]);
//     const [date, setDate] = useState(new Date());
//     const [total, setTotal] = useState({
//       totalCalories: 0,
//       totalProtein: 0,
//       totalCarbs: 0,
//       totalFats: 0,
//       totalFiber: 0,
//     });
  
//     // Fetch data whenever the date changes
//     useEffect(() => {
//       fetch(
//         `http://localhost:8000/track/${loggedData.loggedUser.userid}/${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
//         {
//           method: "GET",
//           headers: {
//             "Authorization": `Bearer ${loggedData.loggedUser.token}`,
//           },
//         }
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Fetched Tracked Items: ", data);  // Log the fetched data to check the structure
//           setItems(data); // Set the fetched items in the state
//         })
//         .catch((err) => {
//           console.log("Error fetching tracked items:", err); // Catch any errors in fetching
//         });
//     }, [date]);
  
//     // Recalculate total whenever items change
//     useEffect(() => {
//       calculateTotal();
//     }, [items]);
  
//     // Calculate total values for calories, protein, carbs, fats, and fiber
//     function calculateTotal() {
//       let totalCopy = {
//         totalCalories: 0,
//         totalProtein: 0,
//         totalCarbs: 0,
//         totalFats: 0,
//         totalFiber: 0,
//       };
  
//       items.forEach((item) => {
//         totalCopy.totalCalories += item.details.calories;
//         totalCopy.totalProtein += item.details.protein;
//         totalCopy.totalCarbs += item.details.carbohydrates;
//         totalCopy.totalFats += item.details.fat;
//         totalCopy.totalFiber += item.details.fiber;
//       });
  
//       setTotal(totalCopy); // Update the total state
//     }
//   return (
//     <section className="container diet-container">
//           <Header />
//           <input
//             type="date"
//             onChange={(event) => setDate(new Date(event.target.value))}
//           />
//           {items.map((item) => (
//             <div className="item" key={item._id}>
//               <h3>{item.foodId.name} ({item.details.calories} Kcal for {item.quantity}g)</h3>
//               <p>
//                 Protein {item.details.protein}g, Carbs {item.details.carbohydrates}g, Fats {item.details.fat}g, Fiber {item.details.fiber}g
//               </p>
//             </div>
//           ))}
//           <div className="item">
//             <h3>{total.totalCalories} Kcal</h3>
//             <p>
//               Protein {total.totalProtein}g, Carbs {total.totalCarbs}g, Fats {total.totalFats}g, Fiber {total.totalFiber}g
//             </p>
//           </div>
//         </section>
//   )
// }

// export default Diet


import React from 'react'

const Diet = () => {
  return (
    <div>
      <h2>Diet page</h2>
    </div>
  )
}

export default Diet
