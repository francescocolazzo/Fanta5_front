import { selectAuthError, selectAuthIsLogged, useAuth } from "@/services/auth";
import { ServerError } from "@/shared";
import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./hooks/useCheckout";

export function LoginPage() {
  const error = useAuth(selectAuthError);
  const isLogged = useAuth(selectAuthIsLogged);
  const login = useAuth((state) => state.login);
  const navigate = useNavigate();

  const { validators, formData, actions } = useLogin();

  useEffect(() => {
    if (isLogged) {
      navigate("/cms");
    }
 
  }, [isLogged, navigate]);

  async function doLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
    login(formData.username, formData.password);
  }

  return (
    <div className="page-sm">
      <h1 className="title">LOGIN</h1>

      {error && <ServerError message="Authentication failed" />}

      <form onSubmit={doLogin} className=" flex flex-col gap-3 ">
        <input
          type="text"
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={actions.changeHandler}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={actions.changeHandler}
        />
        <button
          className="btn primary"
          type="submit"
          disabled={!validators.isValid}
        >
          SIGN IN
        </button>
      </form>

      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}
