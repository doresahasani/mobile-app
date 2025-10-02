import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type User = {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
    company?: { name?: string };
    address?: { street?: string; city?: string };
};

export default function DetailsScreen({ route }: any) {
    const { userId } = route.params;
    const storeUsers = useSelector((state: RootState) => state.users.users) as User[];
    const [remoteUser, setRemoteUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const localUser = storeUsers.find((u) => u.id === userId);

    useEffect(() => {
        if (!localUser) {
            setLoading(true);
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
                .then((res) => res.json())
                .then((data) => setRemoteUser(data))
                .catch(() => setRemoteUser(null))
                .finally(() => setLoading(false));
        }
    }, [userId, localUser]);

    const user = localUser ?? remoteUser;

    if (!user) {
        if (loading) {
            return (
                <View style={styles.center}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.center}>
                <Text>User not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{user.name ?? "No name"}</Text>
            <Text style={styles.row}>Email: {user.email ?? "N/A"}</Text>
            <Text style={styles.row}>Phone: {user.phone ?? "N/A"}</Text>
            <Text style={styles.row}>Website: {user.website ?? "N/A"}</Text>
            <Text style={styles.row}>Company: {user.company?.name ?? "N/A"}</Text>
            <Text style={styles.row}>
                Address: {user.address?.street ?? "N/A"}
                {user.address?.city ? `, ${user.address.city}` : ""}
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
    title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
    row: { fontSize: 16, marginBottom: 8 },
});
