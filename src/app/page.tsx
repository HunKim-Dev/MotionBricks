"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LANDING_PAGE_IMAGE_SIZE } from "config/ui-config";
import {
  LANDING_PAGE_TITLE,
  LANDING_PAGE_SUBTITLE,
  LANDING_PAGE_LOGIN_LABEL,
  LANDING_PAGE_FREE_TRIAL_LABEL,
} from "config/app-config";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AuthDialog from "@/components/auth/auth-dialog";

const LandingPage = () => {
  return (
    <main className="flex h-screen bg-gradient-to-r from-background to-muted text-foreground">
      <div className="relative flex-1 flex items-center justify-center">
        <Image
          src="/landing-page-image/motion-bricks.png"
          alt="AirBricks Preview"
          width={LANDING_PAGE_IMAGE_SIZE}
          height={LANDING_PAGE_IMAGE_SIZE}
          className="object-contain drop-shadow-xl/50"
          priority
        />
      </div>

      <div className="w-[40%] flex items-center justify-center pr-16">
        <div className="flex flex-col items-center gap-8 w-full">
          <div className="flex flex-col items-center gap-2 -translate-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-primary">
              {LANDING_PAGE_TITLE}
            </h1>
            <p className="text-sm text-muted-foreground">{LANDING_PAGE_SUBTITLE}</p>
          </div>

          <div className="mt-6 flex flex-col gap-7">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="w-48 h-12 text-lg font-semibold transition-colors duration-200 hover:bg-primary/70"
                  variant="default"
                >
                  {LANDING_PAGE_LOGIN_LABEL}
                </Button>
              </DialogTrigger>

              <AuthDialog />
            </Dialog>

            <Button
              asChild
              className="w-48 h-12 text-lg font-semibold transition-colors duration-200 hover:bg-[var(--border)] hover:text-[var(--foreground)]"
              variant="outline"
            >
              <Link href="/workshop">{LANDING_PAGE_FREE_TRIAL_LABEL}</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
