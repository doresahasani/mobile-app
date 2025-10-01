import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetailsScreen({ route }: any) {
    const { userId } = route.params;
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((res) => res.json())
            .then((data) => setUser(data));
    }, [userId]);

    if (!user) {
        return (
            <View style={styles.center}>
                <Text>Loading details...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Phone: {user.phone}</Text>
            <Text>Website: {user.website}</Text>
            <Text>Company: {user.company?.name}</Text>
            <Text>
                Address: {user.address?.street}, {user.address?.city}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
});
