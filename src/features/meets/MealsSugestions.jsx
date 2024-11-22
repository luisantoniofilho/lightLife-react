import { useSelector } from "react-redux";

function MealsSuggestions() {
  // Obtém os macros do estado do Redux para dias de treino e descanso
  const trainingDayMacros = useSelector(
    (state) => state.user.macros.trainingDayMacros
  );
  const restDayMacros = useSelector((state) => state.user.macros.restDayMacros);

  // Divide os macros em 4 refeições
  const divideMacros = (macros) => ({
    carbs: macros.carbs / 4,
    protein: macros.protein / 4,
    fat: macros.fat / 4,
  });

  const trainingMeal = divideMacros(trainingDayMacros);
  const restMeal = divideMacros(restDayMacros);

  // Função para calcular calorias de uma refeição
  const calculateCalories = (meal) =>
    (meal.carbs * 4 + meal.protein * 4 + meal.fat * 9).toFixed(0);

  // Função para alternar alimentos entre refeições com pão e arroz
  const suggestFoods = (meal, isBreadMeal) => {
    return isBreadMeal
      ? [
          {
            name: "Pão Integral",
            quantity: (meal.carbs * 0.6).toFixed(0) + "g",
          },
          {
            name: "Queijo Cottage",
            quantity: (meal.protein * 0.4).toFixed(0) + "g",
          },
          { name: "Ovos", quantity: (meal.protein * 0.5).toFixed(0) + "g" },
          { name: "Abacate", quantity: (meal.fat * 0.5).toFixed(0) + "g" },
        ]
      : [
          {
            name: "Arroz Integral",
            quantity: (meal.carbs * 0.5).toFixed(0) + "g",
          },
          { name: "Feijão", quantity: (meal.carbs * 0.3).toFixed(0) + "g" },
          { name: "Frango", quantity: (meal.protein * 1.1).toFixed(0) + "g" },
          { name: "Brócolis", quantity: "50g" },
        ];
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Sugestões de Refeições
      </h2>

      <div className="grid gap-8">
        {/* Sessão para o Dia de Treino */}
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            Dia de Treino
          </h3>
          <div className="space-y-6">
            {[...Array(4)].map((_, index) => {
              const isBreadMeal = index % 2 === 0;
              const foods = suggestFoods(trainingMeal, isBreadMeal);
              const calories = calculateCalories(trainingMeal);

              return (
                <div
                  key={index}
                  className="p-5 bg-white rounded-lg shadow-md border border-gray-200"
                >
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">
                    Refeição {index + 1}
                  </h4>
                  <p className="text-gray-600 mb-2 font-medium">
                    Calorias: {calories} kcal
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    {foods.map((food, idx) => (
                      <li key={idx} className="text-gray-700">
                        <span className="font-semibold">{food.name}:</span>{" "}
                        {food.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sessão para o Dia de Descanso */}
        <div>
          <h3 className="text-xl font-semibold text-green-600 mb-4">
            Dia de Descanso
          </h3>
          <div className="space-y-6">
            {[...Array(4)].map((_, index) => {
              const isBreadMeal = index % 2 === 0;
              const foods = suggestFoods(restMeal, isBreadMeal);
              const calories = calculateCalories(restMeal);

              return (
                <div
                  key={index}
                  className="p-5 bg-white rounded-lg shadow-md border border-gray-200"
                >
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">
                    Refeição {index + 1}
                  </h4>
                  <p className="text-gray-600 mb-2 font-medium">
                    Calorias: {calories} kcal
                  </p>
                  <ul className="text-gray-600 list-disc list-inside space-y-1">
                    {foods.map((food, idx) => (
                      <li key={idx} className="text-gray-700">
                        <span className="font-semibold">{food.name}:</span>{" "}
                        {food.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealsSuggestions;