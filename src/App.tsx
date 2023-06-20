import "./App.css";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AddPokemon } from "./app/components/pokemons/add-pokemon";
import { HomeComponent } from "./app/components/users/index.component";
import { FormSignUp } from "./app/components/auth/forms/form-signUp.component";
import { FormSignIn } from "./app/components/auth/forms/form-signIn.component";
import { IndexAuthComponent } from "./app/components/auth/index-auth.component";
import { ViewPokemon } from "./app/components/pokemons/view-pokemon";
import { UserListComponent } from "./app/components/users/user-list.component";
import Guard from "./app/components/auth/guard";
import { RoleEnum } from "./domain/enum/role.enum";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<IndexAuthComponent />} />
        <Route
          path=""
          element={
            <Guard>
              <Outlet />
            </Guard>
          }
        >
          <Route path="home" element={<HomeComponent />}>
            <Route path="addPokemon" element={<AddPokemon />} />
            <Route path="viewPokemon" element={<ViewPokemon />} />
            <Route
              path="users"
              element={
                <Guard role={RoleEnum.ADMIN}>
                  <UserListComponent />
                </Guard>
              }
            />
            <Route path='' index={true} element={<Navigate to='viewPokemon' />} />
          </Route>
        </Route>
        <Route path={"/signUp"} element={<FormSignUp />} />
        <Route path={"/signIn"} element={<FormSignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
