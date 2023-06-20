import {Box, Table, Typography} from "@mui/joy";
import React, {useEffect, useState} from "react";
import {IUser} from "../../../domain/models/user.model";
import {UserService} from "../../../infrastructure/communication/services/user.service";
import { decodeBase64 } from "../../../utils/decode";
import { useNavigate } from "react-router-dom";

export function UserListComponent() {
    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        const userService = new UserService();
        const getUsers = async () => {
            const users = await userService.getUsers();
            setUsers(users);
        }
        getUsers()
    }, [])

    return (
        <div>
            <Typography sx={{my: 2}} level="h2">List of users</Typography>
            <Box
                sx={{
                    mx: 'auto',
                    my: 10,
                    py: 10,
                    px: 10,
                }}
            >
                <Table sx={{'& tr > *:not(:first-child)': {textAlign: 'right'}}}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>username</th>
                        <th>password</th>
                        <th>Role</th>
                        <th>Create at</th>
                        <th>Update at</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (users.length > 0) && users.map((user: IUser) => (
                            <tr key={user.name}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>{user.role}</td>
                                <td>{new Date(user.createdAt).toDateString()}</td>
                                <td>{new Date(user.updatedAt).toDateString()}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Box>
        </div>
    )
}