import { createContext, useReducer, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from '../reducers/budget-reducer';

type BudgetContextProps = {
  state: BudgetState,
  dispatch: Dispatch<BudgetActions>,
  totalExpenses: number
  remaining: number
}

type BudgetProviderProps = {
  children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(() => state.expenses.reduce((total, current) => current.amount + total, 0), [state.expenses]);
  const remaining = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider value={{ state, dispatch, totalExpenses, remaining }}>
        {children}
    </BudgetContext.Provider>
  )
}