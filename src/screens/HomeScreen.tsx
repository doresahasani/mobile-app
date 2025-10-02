import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Alert } from "react-native";
import SearchBar from "../components/SearchBar";
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
        return (
            <View style={styles.center}>
                <Text>Loading users...</Text>
            </View>
        );
    }

    const handleDelete = (id: number) => {
        dispatch(deleteUser(id));
        Alert.alert("Deleted", `User u fshi me sukses!`);
    };

    return (
        <ScrollView style={styles.container}>
            <SearchBar
                value={search}
                onChangeText={setSearch}
                placeholder="Search by name or email..."
            />

            <Button
                title="➕ Add User"
                onPress={() =>
                    navigation.navigate("AddUser", {
                        onAdd: (newUser: any) => {
                            dispatch(addUser(newUser));
                        },
                    })
                }
            />

            {filteredUsers.map((user) => (
                <View key={user.id} style={styles.card}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text>{user.email}</Text>
                    <Text>{user.company?.name}</Text>

                    <Button
                        title="View Details"
                        onPress={() =>
                            navigation.navigate("Details", { userId: user.id })
                        }
                    />

                    <Button
                        title="✏️ Update"
                        onPress={() => navigation.navigate("UpdateUser", { user })}
                    />

                    <Button
                        title="🗑️ Delete"
                        color="red"
                        onPress={() => handleDelete(user.id)}
                    />
                </View>
            ))}

            {filteredUsers.length === 0 && (
                <View style={styles.center}>
                    <Text>No users found.</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    card: {
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
    },
    name: { fontWeight: "bold", marginBottom: 4 },
});
