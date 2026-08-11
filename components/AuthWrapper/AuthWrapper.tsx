"use client";
import { useEffect, useState } from "react";
import ButtonLink from "../ButtonLink/ButtonLink";
import Input from "../FormComponents/Input/Input";
import FormRowItem from "../FormComponents/FormRowItem/FormRowItem";
import PageHeader from "../PageHeader/PageHeader";
import classes from "./authWrapper.module.css";
import FormControls from "../FormComponents/FormControls/FormControls";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("cat_auth") === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: inputPassword }),
      });
      if (res.ok) {
        sessionStorage.setItem("cat_auth", "true");
        setIsAuthenticated(true);
      } else {
        alert("Falsches Passwort");
      }
    } catch (error) {
      alert("Fehler bei der Anmeldung");
    }
  };
  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className={classes.authentication}>
        <PageHeader>
          <span>Dieser Bereich ist geschützt.</span>
        </PageHeader>
        <form onSubmit={handleLogin}>
          <FormRowItem>
            <Input
              label="Passwort eingeben:"
              name="password"
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </FormRowItem>
          <FormControls>
            <ButtonLink type="submit">Öffnen</ButtonLink>
          </FormControls>
        </form>
      </div>
    );
  }
  return <>{children}</>;
}
