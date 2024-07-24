import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeals } from "../store/features/mealSlice";
import { addMealToWeek, removeMealFromWeek } from "../store/features/weekSlice";
import clsx from "clsx";

const AllMeals = () => {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.meals);
  const weeks = useSelector((state) => state.weeks);
  const [activeTab, setActiveTab] = useState("All meals");
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [showWeekSelection, setShowWeekSelection] = useState(false);

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  useEffect(() => {
    const savedWeeks = JSON.parse(localStorage.getItem("weeks"));
    if (savedWeeks) {
      Object.keys(savedWeeks).forEach((week) => {
        savedWeeks[week].forEach((meal) => {
          dispatch(addMealToWeek({ week, meal }));
        });
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("weeks", JSON.stringify(weeks));
  }, [weeks]);

  const handleAddMeal = () => {
   
  
    if (!selectedWeek) {
      alert("Please select a week before saving.");
      return;
    }
  
    let hasDuplicates = false;
  
    selectedMeals.forEach((selectedMeal) => {
      const weekMeals = weeks[selectedWeek] || [];
      const alreadyAdded = weekMeals.some(
        (meal) => meal.id === selectedMeal.id
      );
  
      if (alreadyAdded) {
        hasDuplicates = true;
      } else {
        dispatch(addMealToWeek({ week: selectedWeek, meal: selectedMeal }));
      }
    });
  
    if (hasDuplicates) {
      alert("Some of the selected meals are already added to this week.");
    }
  
    setSelectedMeals([]);
    setSelectedWeek("");
    setShowWeekSelection(false);
  };
  

  const handleRemoveMeal = (mealId, week) => {
    dispatch(removeMealFromWeek({ week, mealId }));
  };

  const handleMealSelection = (meal) => {
    setSelectedMeals((prevSelectedMeals) =>
      prevSelectedMeals.includes(meal)
        ? prevSelectedMeals.filter((m) => m.id !== meal.id)
        : [...prevSelectedMeals, meal]
    );
  };


const handleSelection = () =>{
    if (selectedMeals.length === 0) {
        alert("Please select at least one meal before adding to a week.");
        return;
      }

    setShowWeekSelection(true)
}

  const renderMeals = (mealsList) =>
    mealsList.map((meal) => (
      <div
        key={meal.id}
        className="p-4 border rounded-lg shadow flex flex-col items-center"
      >
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-32 object-cover rounded-lg mb-4"
        />
        <h3 className="font-bold mb-2 text-lg">{meal.name}</h3>
        <p className="text-sm mb-2">{meal.instructions}</p>
        <p className="text-sm mb-1">Cuisine: {meal.cuisine}</p>
        <p className="text-sm mb-1">Rating: {meal.rating}</p>
        <input
          type="checkbox"
          onChange={() => handleMealSelection(meal)}
          checked={selectedMeals.includes(meal)}
        />
      </div>
    ));

  return (
    <section>
      <div className="flex flex-wrap justify-center items-center  lg:justify-around  lg:space-x-4 py-4 px-3 text-xs font-bold">
        <div>
          <button onClick={() => setActiveTab("All meals")}>All Meals</button>
        </div>
        <div>
          {["Week 1", "Week 2", "Week 3", "Week 4"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "py-2 px-4 rounded mr-4",
                activeTab === tab && "bg-blue-500"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div>
          <button
            className={clsx("py-2 px-10 rounded bg-gray-200",showWeekSelection && selectedMeals.length > 0 && "hidden")}
            onClick={handleSelection}
          >
            Add to Week
          </button>
          {showWeekSelection && selectedMeals.length > 0 && (
            <div className="flex gap-x-2 p-2">
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
              >
                <option value="">Select Week</option>
                <option value="week1">Week 1</option>
                <option value="week2">Week 2</option>
                <option value="week3">Week 3</option>
                <option value="week4">Week 4</option>
              </select>

              <button onClick={handleAddMeal}>Save</button>
              <button onClick={() => setShowWeekSelection(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      {activeTab === "All meals" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-32 gap-4">
          {renderMeals(meals)}
        </div>
      )}

      {["week1", "week2", "week3", "week4"].map((week, index) =>
        activeTab === `Week ${index + 1}` ? (
          <div
            key={week}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-32 gap-4"
          >
            {weeks[week].length > 0 ? (
              weeks[week].map((meal) => (
                <div
                  key={meal.id}
                  className="p-4 border rounded-lg shadow flex flex-col items-center"
                >
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-bold mb-2 text-lg">{meal.name}</h3>
                  <p className="text-sm mb-2">{meal.instructions}</p>
                  <p className="text-sm mb-1">Cuisine: {meal.cuisine}</p>
                  <p className="text-sm mb-1">Rating: {meal.rating}</p>
                  <button
                    className="py-2 px-10 rounded bg-red-200 text-sm"
                    onClick={() => handleRemoveMeal(meal.id, week)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-red-500">There are no meals in this week.</p>
            )}
          </div>
        ) : null
      )}
    </section>
  );
};

export default AllMeals;
