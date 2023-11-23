import React, { createContext, useContext, useReducer, ReactNode } from "react";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  photo: any;
  gender: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string;
  city: string;
  professionalSkills: string[];
}
type Action =
  | { type: "ADD_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: { id: number; user: User } }
  | { type: "DELETE_USER"; payload: number };
interface UserContextProps {
  users: User[];
  dispatch: React.Dispatch<Action>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);
const userReducer = (state: User[], action: Action): User[] => {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.payload];
    case "UPDATE_USER":
      for(let i = 0; i < state.length ; i++){
        if(Number(state[i].id) === Number(action.payload.id)){
          state = state.splice(i,1)
          state.push(action.payload.user)
        }
      }
      return state;
    case "DELETE_USER":
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
};
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, dispatch] = useReducer(userReducer, []);
  return (
    <UserContext.Provider value={{ users, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
