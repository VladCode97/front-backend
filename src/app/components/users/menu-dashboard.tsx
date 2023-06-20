import * as React from "react";
import Menu, { menuClasses } from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Sheet from "@mui/joy/Sheet";
import Apps from "@mui/icons-material/Apps";
import { ListItemButton, ListItemContent, ListItemDecorator, Typography } from "@mui/joy";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import Guard from "../auth/guard";
import { RoleEnum } from "../../../domain/enum/role.enum";

interface MenuButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  menu: React.ReactElement;
  open: boolean;
  onOpen: (
    event?:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  onLeaveMenu: (callback: () => boolean) => void;
  label: string;
}

const modifiers = [
  {
    name: "offset",
    options: {
      offset: ({ placement }: any) => {
        if (placement.includes("end")) {
          return [8, 20];
        }
        return [-8, 20];
      },
    },
  },
];

function MenuButton({
  children,
  menu,
  open,
  onOpen,
  onLeaveMenu,
  label,
  ...props
}: MenuButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const isOnButton = React.useRef(false);
  const menuActions = React.useRef<any>(null);
  const internalOpen = React.useRef(open);

  const handleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    internalOpen.current = open;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      onOpen(event);
      if (event.key === "ArrowUp") {
        menuActions.current?.highlightLastItem();
      }
    }
  };

  return (
    <React.Fragment>
      <IconButton
        {...props}
        ref={buttonRef}
        variant="plain"
        color="neutral"
        aria-haspopup="menu"
        aria-expanded={open ? "true" : undefined}
        aria-controls={open ? `nav-example-menu-${label}` : undefined}
        onMouseDown={() => {
          internalOpen.current = open;
        }}
        onClick={() => {
          if (!internalOpen.current) {
            onOpen();
          }
        }}
        onMouseEnter={() => {
          onOpen();
          isOnButton.current = true;
        }}
        onMouseLeave={() => {
          isOnButton.current = false;
        }}
        onKeyDown={handleButtonKeyDown}
        sx={{
          bgcolor: open ? "neutral.plainHoverBg" : undefined,
          "&.Joy-focusVisible": {
            bgcolor: "neutral.plainHoverBg",
          },
        }}
      >
        {children}
      </IconButton>
      {React.cloneElement(menu, {
        open,
        onClose: () => {
          menu.props.onClose?.();
          buttonRef.current?.focus();
        },
        onMouseLeave: () => {
          onLeaveMenu(() => isOnButton.current);
        },
        actions: menuActions,
        anchorEl: buttonRef.current,
        modifiers,
        slotProps: {
          listbox: {
            id: `nav-example-menu-${label}`,
            "aria-label": label,
          },
        },
        placement: "right-start",
        sx: {
          width: 288,
          [`& .${menuClasses.listbox}`]: {
            "--List-padding": "var(--ListDivider-gap)",
          },
        },
      })}
    </React.Fragment>
  );
}

export default function MenuDashboard() {
  const nav = useNavigate();
  const [menuIndex, setMenuIndex] = React.useState<null | number>(null);
  const itemProps = {
    onClick: () => setMenuIndex(null),
  };
  const createHandleLeaveMenu =
    (index: number) => (getIsOnButton: () => boolean) => {
      setTimeout(() => {
        const isOnButton = getIsOnButton();
        if (!isOnButton) {
          setMenuIndex((latestIndex: null | number) => {
            if (index === latestIndex) {
              return null;
            }
            return latestIndex;
          });
        }
      }, 200);
    };
  return (
    <Sheet
      sx={{ py: 1, mr: 20, bgcolor: "#EEE2DE", height: "100%", width: "100%" }}
    >
      <Typography
        sx={{ px: 2, textAlign: "center", fontWeight: "300", mt: 5 }}
        level="h2"
      >
        {" "}
        Waco test{" "}
      </Typography>
      <List sx={{ mt: 10 }}>
        <ListItem>
          <MenuButton
            label="Apps"
            open={menuIndex === 0}
            onOpen={() => setMenuIndex(0)}
            onLeaveMenu={createHandleLeaveMenu(0)}
            menu={
              <Menu onClose={() => setMenuIndex(null)}>
                <MenuItem {...itemProps}>
                  <Link to={"addPokemon"}>Add pokemon to favorites</Link>
                </MenuItem>
                <MenuItem {...itemProps}>
                  <Link to={"viewPokemon"}>View my list pokemon</Link>
                </MenuItem>
              </Menu>
            }
          >
            <ListItemDecorator>

            <Apps />{" "}
            </ListItemDecorator>
              Favorites pokemon
          </MenuButton>
        </ListItem>
        <Guard role={RoleEnum.ADMIN}>
          <ListItemButton onClick={() => nav('users')}>
            <ListItemDecorator>

            <PersonIcon />
            </ListItemDecorator>
            Users
          </ListItemButton>
        </Guard>

        <ListItemButton
          onClick={() => {
            localStorage.removeItem("token");
            nav("/signIn");
          }}
        >
          <ListItemDecorator>

          <LogoutIcon />{" "}
          </ListItemDecorator>
            Logout{" "}
        </ListItemButton>
      </List>
    </Sheet>
  );
}
