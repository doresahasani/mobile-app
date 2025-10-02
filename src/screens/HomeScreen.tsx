import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Button, TextInput } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setUsers, addUser, deleteUser } from "../store/usersSlice";

export default function HomeScreen({ navigation, route }: any) {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.users);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => {
                dispatch(setUsers(data));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [dispatch]);

    useEffect(() => {
        if (route.params?.newUser) {
            dispatch(addUser(route.params.newUser));
            navigation.setParams({ newUser: undefined });
        }
    }, [route.params?.newUser, dispatch, navigation]);

    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <Paragraph style={{ textAlign: "center", marginTop: 30 }}>Loading...</Paragraph>;
    }

    return (
        <ScrollView style={styles.container}>
            <TextInput
                label="Search"
                value={search}
                onChangeText={setSearch}
                style={styles.search}
                mode="outlined"
            />

            <Button
                mode="contained"
                style={styles.addButton}
                onPress={() =>
                    navigation.navigate("AddUser", {
                        onAdd: (newUser: any) => {
                            dispatch(addUser(newUser));
                        },
                    })
                }
            >
                ➕ Add User
            </Button>

            {filteredUsers.map((user) => (
                <Card style={styles.card} key={user.id}>
                    <Card.Content>
                        <Title>{user.name}</Title>
                        <Paragraph>{user.email}</Paragraph>
                        <Paragraph>{user.company?.name}</Paragraph>
                    </Card.Content>
                    <Card.Actions style={styles.actions}>
                        <Button onPress={() => navigation.navigate("Details", { userId: user.id })}>
                            Details
                        </Button>
                        <Button onPress={() => navigation.navigate("UpdateUser", { user })}>
                            Update
                        </Button>
                        <Button color="red" onPress={() => dispatch(deleteUser(user.id))}>
                            Delete
                        </Button>
                    </Card.Actions>
                </Card>
            ))}

            {filteredUsers.length === 0 && (
                <Paragraph style={{ textAlign: "center", marginTop: 20 }}>
                    No users found.
                </Paragraph>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    search: { marginBottom: 16 },
    addButton: { marginBottom: 16 },
    card: { marginBottom: 16 },
    actions: { justifyContent: "space-between" },
});
