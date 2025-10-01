import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }: any) {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Loading users...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Button
                title="➕ Add User"
                onPress={() =>
                    navigation.navigate("AddUser", {
                        onAdd: (newUser: any) => {
                            setUsers((prev) => [newUser, ...prev]);
                        },
                    })
                }
            />

            {users.map((user) => (
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
                </View>
            ))}
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
