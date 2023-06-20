import {Button, FormControl, FormLabel, Input, Sheet, Typography} from "@mui/joy";
import React, {useState} from "react";
import {AuthService} from "../../../../infrastructure/communication/services/auth.service";
import {RoleEnum} from "../../../../domain/enum/role.enum";
import {MessagesSystemEnum} from "../../../../domain/enum/messages.enum";
import {Link, useNavigate} from "react-router-dom";

export function FormSignUp() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();
    const authService = new AuthService();
    const handlerSignUp = async () => {
        const response = await authService.signUp({username, password, name, role: RoleEnum.USER});
        if (response === MessagesSystemEnum.USER_ALREADY_EXISTS) {
            setMessage(response);
        } else {
            return navigate('/signIn');
        }
    }
    return (
        <>
            <main>
                <Sheet
                    sx={{
                        width: 450,
                        mx: 'auto',
                        my: 10,
                        py: 10,
                        px: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                    variant="outlined"
                >
                    <div>
                        <Typography level="h1" component="h1">

                            <b>Sign Up</b>
                        </Typography>
                        <Typography level="body2">Sign Up to continue.</Typography>
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

                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            name="name"
                            type="text"
                            placeholder="Luis Torres"
                            onChange={(event) => setName(event.target.value)}
                        />
                    </FormControl>


                    <Button onClick={handlerSignUp} sx={{mt: 1 /* margin top */}}>Sign up</Button>
                    <Typography
                        endDecorator={<Link to="/signIn">Sign in</Link>}
                        fontSize="sm"
                        sx={{alignSelf: 'center'}}
                    >
                        Do you have an account?
                    </Typography>
                    <Typography
                        fontSize="sm"
                        fontWeight="600"
                        sx={{alignSelf: 'center'}}
                    >
                        {(message.length > 0) ? message : ""}
                    </Typography>
                </Sheet>
            </main>
        </>
    )
}