"use client";

import React, { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

import { createSession } from "@/app/_actions/auth.action";
import useIsAuthenticated from "@/hooks/use_is_authenticated";

import { DotLoader } from "react-spinners";

const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [state, formAction] = useFormState(createSession, null);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: state.error,
        action: <ToastAction altText="Try again">أعد المحاولة</ToastAction>,
      });
    }

    if (state?.success) router.push("/dashboard");
  }, [state, toast, router]);

  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated === null) {
    return (
      <div className="h-svh w-svw flex justify-center items-center">
        <DotLoader color="#000000" loading />;
      </div>
    );
  }

  if (isAuthenticated) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form action={formAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" name="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/3417764.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default LoginPage;
