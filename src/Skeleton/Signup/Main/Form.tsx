"use client";
import React, { useContext, useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { handlePasswordSpecs } from "../../functions/PasswordVerify";
import { useRouter } from "next/navigation";
import { MessageContext } from "@/src/context/message/MesageContex";
import { NotificationContext } from "@/src/context/Notification/Notification";

function Form() {
  const message = useContext(MessageContext)!;
  const notification = useContext(NotificationContext)!;
  const abort = new AbortController();
  const abortsignal = abort.signal;
  const router = useRouter();
  const [pwdShow, setPwdState] = useState(false);
  const [confPwdShow, setConfPwdState] = useState(false);
  let isValidToSubmit = false;
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);

  const passwordInputChanged = () => {
    if (passwordRef.current && passwordRef.current.value != "") {
      isValidToSubmit = handlePasswordSpecs(passwordRef, confirmPassRef);
    }
  };
  const pwdVisibility = (a: string) => {
    let selector = a;
    let option = pwdShow;
    let change = setPwdState;

    if (a === "conf") {
      option = confPwdShow;
      change = setConfPwdState;
    }
    if (option) {
      const pwdElement = document.getElementById(selector) as HTMLInputElement;
      pwdElement.type = "password";
      change(false);

      return;
    }

    const pwdElement = document.getElementById(selector) as HTMLInputElement;
    pwdElement.type = "text";
    change(true);
  };
  const submitForm = async (e: React.MouseEvent<HTMLInputElement>) => {
    notification.destroy()
    message.destroy();
    message.loading("Signing Up Please Wait", 10000);
    e.preventDefault();

    if (!isValidToSubmit) {
      message.destroy();
      return;
    }
    if (!emailRef.current || !passwordRef.current || !confirmPassRef.current) {
      message.destroy();
      notification.info({
        message: "Ensure All Fields Are Filled With The Appropraite Values",
      });
      return;
    }
    const body = {
      Email: emailRef.current.value,
      Password: passwordRef.current.value,
    };
    const data = await fetch(
      process.env.NODE_ENV != "production"
        ? "/api/signup"
        : window.location.origin + "/api/signup",
      {
        method: "POST",
        body: JSON.stringify(body),
        signal: abortsignal,
      }
    );
    const result = await data.json();

    if (data.status == 200 || data.status == 201) {
      message.destroy();
      notification.destroy();
      notification.success({ message: result.data });

      setTimeout(() => {
        router.push("/auth/verifyemail");
      }, 3000);
    }
    if (data.status == 500) {
      message.destroy();
      notification.destroy();
      notification.error({ message: result.data });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <form
      id="form"
      className="py-20 space-y-10 text-center flex flex-col items-center w-full sm:py-32"
    >
      <h1 className="text-lg font-semibold"> Sign Up</h1>
      <label htmlFor="email"></label>
      <input
        required
        id="email"
        ref={emailRef}
        type="email"
        placeholder="Email"
        className="h-12 w-full sm:w-2/4 outline-none border-b border-gray-400 bg-transparent text-white px-4"
      />
      <div className="h-12 border-b flex items-center w-full sm:w-2/4  border-gray-400 bg-transparent text-white px-4">
        <input
          required
          id="pass"
          onChange={passwordInputChanged}
          ref={passwordRef}
          type={pwdShow ? "text" : "password"}
          placeholder="Password"
          className="w-full h-full bg-transparent border-0 outline-none"
        />
        {pwdShow ? (
          <AiFillEyeInvisible
            className=" cursor-pointer"
            onClick={() => {
              pwdVisibility("pass");
            }}
            size={30}
          />
        ) : (
          <AiFillEye
            className=" cursor-pointer"
            onClick={() => {
              pwdVisibility("pass");
            }}
            size={30}
          />
        )}
        <label htmlFor="pass"></label>
      </div>
      <div className="h-12 border-b flex items-center w-full sm:w-2/4  border-gray-400 bg-transparent text-white px-4">
        {" "}
        <label htmlFor="conf"></label>
        <input
          required
          id="conf"
          ref={confirmPassRef}
          onChange={passwordInputChanged}
          type={confPwdShow ? "text" : "password"}
          placeholder="Confirm Password"
          className="w-full h-full bg-transparent border-0 outline-none"
        />
        {confPwdShow ? (
          <AiFillEyeInvisible
            className=" cursor-pointer"
            onClick={() => {
              pwdVisibility("conf");
            }}
            size={30}
          />
        ) : (
          <AiFillEye
            className=" cursor-pointer"
            onClick={() => {
              pwdVisibility("conf");
            }}
            size={30}
          />
        )}
      </div>
      <div className="w-fit" id="pwdSpecs">
        <ul className=" text-red-500">
          <li hidden>Password does not match</li>
          <li hidden>Password must include uppercase [A-Z]</li>
          <li hidden>Password must include number [0-9]</li>
          <li hidden>Password must be 8 characters or more</li>
          <li hidden>Password must include special characters ./*^=-$</li>
        </ul>
      </div>
      <input
        type="submit"
        value="Sign up"
        onClick={submitForm}
        className="bg-green-500 h-12 w-fit px-6 cursor-pointer"
      />
    </form>
  );
}

export default Form;
