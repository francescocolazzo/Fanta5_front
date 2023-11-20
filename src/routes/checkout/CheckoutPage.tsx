import { ServerError } from "@/shared";
import clsx from "clsx";
import { useCheckout } from "./hooks/useCheckout";

export function CheckoutPage() {
  const { validators, actions, totalCartCost, user, dirty, error } = useCheckout();
  return (
    <div className="max-w-sm mx-auto">
      <h1 className="title">CHECKOUT</h1>

      {error && <ServerError message={error} />}

      <div className="text-xl my-3 border-b">€ {totalCartCost}</div>

      <form className="flex flex-col gap-3" onSubmit={actions.sendOrder}>
        Your name:
        <input
          type="text"
          name="name"
          placeholder="your name"
          value={user.name}
          onChange={actions.changeHandler}
          className={clsx({ error: !validators.isNameValid && dirty })}
        />
        Your email
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={user.email}
          onChange={actions.changeHandler}
          className={clsx({ error: !validators.isEmailValid && dirty })}
        />
        <button
          type="submit"
          className={clsx("btn", { primary: !validators.isValid, success: validators.isValid })}
          disabled={!validators.isValid}
        >
          CONFIRM ORDER
        </button>
      </form>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
