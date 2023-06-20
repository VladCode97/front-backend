import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Sheet,
  Typography,
} from "@mui/joy";
import { useMemo, useState } from "react";
import { AuthService } from "../../../../infrastructure/communication/services/auth.service";
import { MessagesSystemEnum } from "../../../../domain/enum/messages.enum";
import { Link, useNavigate } from "react-router-dom";

export function FormSignIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const authService = useMemo(() => new AuthService(), []);
  const navigate = useNavigate();

  const handlerSignIn = async () => {
    const response = await authService.signIn({ username, password });
    if (response.token) {
      localStorage.setItem("token", JSON.stringify(response));
      return navigate("/home");
    } else {
      setMessage(MessagesSystemEnum.USER_NOT_FOUND);
    }
  };

  return (
    <main>
      <Sheet
        sx={{
          width: 450,
          mx: "auto",
          my: 10,
          py: 10,
          px: 10,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h1" component="h1">
            <b>Welcome to test WACO!</b>
          </Typography>
          <Typography level="body1">Sign in to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            type="text"
            placeholder="luis"
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>

        <Button onClick={handlerSignIn} sx={{ mt: 1 /* margin top */ }}>
          Log in
        </Button>
        <Typography
          endDecorator={<Link to="/signUp">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: "center" }}
        >
          Don&apos;t have an account?
        </Typography>
        <Typography fontSize="sm" fontWeight="600" sx={{ alignSelf: "center" }}>
          {message.length > 0 ? message : ""}
        </Typography>
      </Sheet>
    </main>
  );
}
