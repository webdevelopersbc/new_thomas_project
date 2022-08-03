import { HamburgerMenuProps as OriginType } from "react-hamburger-menu";

declare module "react-hamburger-menu" {
  interface HamburgerMenuProps extends OriginType {
    className: string;
  }
}
