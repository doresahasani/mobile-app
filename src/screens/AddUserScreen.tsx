import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";

export default function AddUserScreen({ navigation, route }: any) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");

    const handleSubmit = () => {
        if (!name.trim() || !email.trim()) {
            Alert.alert("Validation", "Name and Email are required!");
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            company: { name: company },
        };

        if (route.params?.onAdd) {
            route.params.onAdd(newUser);
        }

        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add New User</Text>

            <TextInput
                style={styles.input}
                placeholder="Name *"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email *"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Company"
                value={company}
                onChangeText={setCompany}
            />

            <Button title="Add User" onPress={handleSubmit} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexGrow: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 14,
    },
});
