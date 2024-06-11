import { ReactNode } from "react";

interface FlexWrapperProps {
  children: ReactNode;
}

export default function FlexWrapper({ children }: FlexWrapperProps) {
  return <div className="flex w-screen justify-center">{children}</div>;
}
