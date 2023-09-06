"use client";
import { NotificationContext } from "@/src/context/Notification/Notification";
import { MessageContext } from "@/src/context/message/MesageContex";
import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Form() {
  const message = useContext(MessageContext)!;
  const notification = useContext(NotificationContext)!;
  const [pwdShow, setPwdState] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const PwdVisibility = (a: string) => {
    if (pwdShow) {
      const pwdElement = document.getElementById(a) as HTMLInputElement;
      pwdElement.type = "password";
      setPwdState(false);
      return;
    }
    const pwdElement = document.getElementById(a) as HTMLInputElement;
    pwdElement.type = "text";
    setPwdState(true);
  };

  const submiSignintForm = async (e: React.MouseEvent<HTMLInputElement>) => {
    message.destroy();
    notification.destroy();
    message.loading("Signing In Please Wait", 10000);
    e.preventDefault();
    if (!emailRef.current || !passwordRef.current) {
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
        ? "/api/signin"
        : window.location.origin + "/api/signin",
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );
    if (data.status == 200) {
      const result = await data.json();
      message.destroy();
      notification.destroy();
      notification.success({ message: result.message });

      setTimeout(() => {
        window.location.href = window.location.origin + "/";
      }, 3000);
      return;
    }
    if (data.status == 400 || data.status == 500) {
      const result = await data.json();
      message.destroy();
      notification.destroy();
      notification.error({ message: result.message });

      setTimeout(() => {
        window.location.reload();
      }, 3000);
      return;
    }
  };

  return (
    <form className="py-20 space-y-10 text-center flex flex-col items-center w-full sm:py-32">
      <h1 className="text-lg font-semibold"> Sign In</h1>
      <label htmlFor="email"></label>
      <input
        ref={emailRef}
        type="email"
        placeholder="Email"
        id="text"
        className="h-12 w-full sm:w-2/4 outline-none border-b border-gray-400 bg-transparent text-white px-4"
      />
      <div className="h-12 border-b flex items-center w-full sm:w-2/4  border-gray-400 bg-transparent text-white px-4">
        <label htmlFor="pass"></label>
        <input
          ref={passwordRef}
          id="pass"
          type={pwdShow ? "text" : "password"}
          placeholder="Password"
          className="w-full h-full bg-transparent border-0 outline-none"
        />
        {pwdShow ? (
          <AiFillEyeInvisible
            className=" cursor-pointer"
            onClick={() => {
              PwdVisibility("pass");
            }}
            size={30}
          />
        ) : (
          <AiFillEye
            className=" cursor-pointer"
            onClick={() => {
              PwdVisibility("pass");
            }}
            size={30}
          />
        )}
      </div>
      <Link href="/auth/passwordreset" className="underline text-blue-7006">
        Forgot Password?
      </Link>
      <input
        type="submit"
        value="Sign in"
        onClick={submiSignintForm}
        className="bg-green-500 h-12 w-fit px-6 cursor-pointer"
      />
    </form>
  );
}

export default Form;
