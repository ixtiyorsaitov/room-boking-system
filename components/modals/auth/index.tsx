"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import * as z from "zod";
import { Chrome } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { Separator } from "@/components/ui/separator";
import { loginSchema, registerSchema } from "@/lib/validations";
import Login from "./login";
import Register from "./register";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export const AuthModal = () => {
  const authModal = useAuthModal();
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register

  const loginMutation = useMutation({
    mutationFn: async (values: z.infer<typeof loginSchema>) => {
      const { data: response } = await api.post("/auth/login", values);

      return { response, values };
    },
    onSuccess: async ({ response, values }) => {
      if (!response.success) {
        return toast.error("Error", { description: response.error });
      }

      const signInRes = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (signInRes?.ok) {
        authModal.setOpen(false);
      } else {
        toast.error("Error", { description: "Login failed" });
        console.error("Login failed:", signInRes?.error);
      }
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (values: z.infer<typeof registerSchema>) => {
      const { data: res } = await api.post("/auth/register", values);

      return { res, values };
    },
    onSuccess: async ({ res, values }) => {
      if (!res.success) {
        console.error("Registration error:", res.error);
        return;
      }
      await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      authModal.setOpen(false);
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    registerMutation.mutate(values);
  };
  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(values);
  };

  const handleGoogleAuth = async () => {
    await signIn("google");
  };

  return (
    <AlertDialog open={authModal.open} onOpenChange={authModal.setOpen}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{isLogin ? "Login" : "Register"}</AlertDialogTitle>
          <AlertDialogDescription>
            {isLogin
              ? "Enter your credentials to access your account."
              : "Create a new account to get started."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={handleGoogleAuth}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
        <div className="relative flex items-center justify-center text-xs uppercase">
          <Separator className="absolute inset-x-0 h-px bg-border" />
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            OR
          </span>
        </div>

        {isLogin ? (
          <Login onLogin={onLoginSubmit} />
        ) : (
          <Register onRegister={onRegisterSubmit} />
        )}

        <AlertDialogFooter className="flex-col sm:flex-col sm:space-x-0 sm:space-y-2">
          <Button variant="ghost" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </Button>
          <Button variant={"ghost"} onClick={() => authModal.setOpen(false)}>
            Cancel
          </Button>
          <AlertDialogAction asChild></AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
