import { ChangeEvent } from "react";
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBugget"

export const FilterByCategory = () => {

  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'add-filter-category-id', payload: { id: e.target.value }})
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form action="">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category">Filtrar Gastos</label>
          <select
            id="category"
            className="bg-slate-100 p-3 flex-1 rounded"
            onChange={(e) => handleChange(e)}
          >
            <option value="">-- Todas las Categorías--</option>
            { categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            )) }
          </select>
        </div>
      </form>
    </div>
  )
}