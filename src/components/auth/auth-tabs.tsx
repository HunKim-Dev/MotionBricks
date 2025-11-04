"use client";

import { TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import GoogleLoginButton from "./google-login-button";
import Image from "next/image";
import { LANDING_PAGE_LOGIN_LABEL, LANDING_PAGE_SIGN_UP_LABAL } from "config/app-config";
import { LOGIN_PAGE_IMAGE_SIZE } from "config/ui-config";

const AuthTabs = () => {
  return (
    <div className="w-full flex flex-col items-center gap-5">
      <TabsList className="grid grid-cols-2 w-full mb-6">
        <TabsTrigger value="login">{LANDING_PAGE_LOGIN_LABEL}</TabsTrigger>
        <TabsTrigger value="signup">{LANDING_PAGE_SIGN_UP_LABAL}</TabsTrigger>
      </TabsList>

      <div className="w-full flex justify-center mb-4">
        <Image
          src="/landing-page-image/motion-bricks.png"
          alt="MotionBricks Logo"
          width={LOGIN_PAGE_IMAGE_SIZE}
          height={LOGIN_PAGE_IMAGE_SIZE}
          className="object-contain drop-shadow-xl/25"
          priority
        />
      </div>

      <TabsContent value="login" className="flex flex-col items-center w-full">
        <GoogleLoginButton text="Sign in with Google" />
      </TabsContent>

      <TabsContent value="signup" className="flex flex-col items-center w-full">
        <GoogleLoginButton text="Sign up with Google" />
      </TabsContent>
    </div>
  );
};

export default AuthTabs;
