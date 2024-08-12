import { ulid } from "ulid";
import { Category, DraftExpense, Expense } from "../types";

export type BudgetActions = 
  { type: 'add-budget', payload: { budget: number } } |
  { type: 'show-modal' } |
  { type: 'close-modal' } |
  { type: 'add-expense', payload: { expense: DraftExpense } } |
  { type: 'remove-expense', payload: { id: Expense['id'] }} |
  { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
  { type: 'update-expense', payload: { expense: Expense } } |
  { type: 'reset-app' } |
  { type: 'add-filter-category-id', payload: { id: Category['id'] }}

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[],
  editingId: Expense['id'],
  currentCategory: Category['id'],
}

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem('budget');
  return localStorageBudget ? +localStorageBudget : 0;
}

const initialExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem('expenses');
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : []; 
}
 
export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  editingId: '',
  currentCategory: ''
}

const createExpense = (draf: DraftExpense): Expense => {
  return {
    ...draf,
    id: ulid()
  }
}

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions): BudgetState => {

  if (action.type === 'add-budget') {
    return {
       ...state,
       budget: action.payload.budget
    }
  }

  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: true
    }
  }

  if (action.type === 'close-modal') {
    return {
      ...state,
      modal: false,
      editingId: ''
    }
  }

  if (action.type === 'add-expense') {
    return {
      ...state,
      expenses: [...state.expenses, createExpense(action.payload.expense)],
      modal: false
    }
  }

  if (action.type === 'remove-expense') {
    return {
      ...state,
      expenses: state.expenses.filter(ex => ex.id !== action.payload.id)
    }
  }

  if (action.type === 'get-expense-by-id') {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true
    }
  }

  if (action.type === 'update-expense') {
    return {
      ...state,
      expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
      modal: false,
      editingId: ''
    }
  }

  if (action.type === 'reset-app') {
    return {
      budget: 0,
      modal: false,
      expenses: [],
      editingId: '',
      currentCategory: ''
    }
  }

  if (action.type === 'add-filter-category-id') {
    return {
      ...state,
      currentCategory: action.payload.id
    }
  }


  return state;
}